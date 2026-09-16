// The nightly blog batch: one fresh set of AI-written posts per IST day.
//
// Posts are written against real quotes only. If a quote cannot be fetched the
// asset is skipped rather than backfilled from the mock prices in the finance
// route — a post that cites an invented price as live market data is worse than
// no post. The seeded set in app/blog/page.tsx stays as the floor, so the page
// is never empty even if a whole batch fails.

import { promises as fs } from "node:fs";
import path from "node:path";

import { BlogTone, generateBlog, generateBlogFromNews } from "@/lib/blog-generator";
import { NewsItem, fetchNewsItems } from "@/lib/news-feed";
import { istDateKey } from "@/lib/ist-day";
import { MarketQuote, fetchMarketQuote } from "@/lib/market-quote";

export interface DailyBlog {
    id: string;
    title: string;
    summary: string;
    content: string;
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    currency: string;
    tone: BlogTone;
    persona: string;
    length: string;
    createdAt: string;
    author: { name: string; avatar: string };
    category: "news" | "funds" | "commodities" | "nri_naval";
    tag: string;
    image: string;
    generated: true;
    // Set when the post is commentary on a real story, so the page can credit it.
    sourceName?: string;
    sourceUrl?: string;
}

interface AssetSpec {
    symbol: string;
    category: DailyBlog["category"];
    tag: string;
    image: string;
    author: { name: string; avatar: string };
    persona: string;
}

// One post per category, each led by a real story from that category's feeds.
const CATEGORY_STYLES: Record<DailyBlog["category"], { tag: string; image: string; author: { name: string; avatar: string }; persona: string; contextSymbol?: string }> = {
    news: {
        tag: "MARKET UPDATE",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
        persona: "Priya Sharma (Senior Strategist)",
        contextSymbol: "^NSEI",
    },
    funds: {
        tag: "LARGE CAP",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Arjun Nair", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        persona: "Arjun Nair (Fund Manager)",
        contextSymbol: "^NSEI",
    },
    commodities: {
        tag: "GOLD",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Sanjay Gupta", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop" },
        persona: "Sanjay Gupta (Commodity Specialist)",
        contextSymbol: "GC=F",
    },
    nri_naval: {
        tag: "NRI TAX",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Amit Verma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
        persona: "Amit Verma (NRI Tax Consultant)",
    },
};

const CATEGORIES = Object.keys(CATEGORY_STYLES) as DailyBlog["category"][];

const POSTS_PER_DAY = 4;
// Yahoo throttles bursts, so quotes are gathered one at a time with a gap. The
// batch runs once a day off a cron — spending a few extra seconds here is free.
const QUOTE_GAP_MS = 1500;
const LENGTHS = ["4 min read", "5 min read", "6 min read"];
const TONES: BlogTone[] = ["bullish", "bearish", "neutral", "educational", "breaking"];

// Authors, tags and imagery are reused from the seeded posts so generated ones
// sit in the grid without looking foreign.
const ASSETS: AssetSpec[] = [
    {
        symbol: "^NSEI", category: "news", tag: "MARKET UPDATE",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
        persona: "Priya Sharma (Senior Strategist)",
    },
    {
        symbol: "^BSESN", category: "news", tag: "GLOBAL",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Michael Roberts", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
        persona: "Michael Roberts (Macro Analyst)",
    },
    {
        symbol: "^NSEBANK", category: "news", tag: "BANKING",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Rajesh Menon", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
        persona: "Rajesh Menon (Banking Editor)",
    },
    {
        symbol: "GC=F", category: "commodities", tag: "GOLD",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Sanjay Gupta", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop" },
        persona: "Sanjay Gupta (Commodity Specialist)",
    },
    {
        symbol: "SI=F", category: "commodities", tag: "SILVER",
        image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Deepak Mishra", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop" },
        persona: "Deepak Mishra (Metal Analyst)",
    },
    {
        symbol: "CL=F", category: "commodities", tag: "CRUDE OIL",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Ram Prasad", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
        persona: "Ram Prasad (Energy Strategist)",
    },
    {
        symbol: "AAPL", category: "nri_naval", tag: "EQUITIES",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Amit Verma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
        persona: "Amit Verma (NRI Tax Consultant)",
    },
    {
        symbol: "MSFT", category: "nri_naval", tag: "EQUITIES",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
        persona: "Sarah Jenkins (Real Estate Desk)",
    },
    {
        symbol: "NVDA", category: "funds", tag: "LARGE CAP",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Arjun Nair", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        persona: "Arjun Nair (Fund Manager)",
    },
    {
        symbol: "BTC-USD", category: "funds", tag: "INDEX",
        image: "https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1200&auto=format&fit=crop",
        author: { name: "Meera Joshi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
        persona: "Meera Joshi (Passive Investor)",
    },
];

// Deterministic per-day picks: everyone sees the same batch on a given date, and
// re-running the generator after a restart reproduces it instead of drifting.
function seedFrom(text: string): number {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function pickForDay(dateKey: string): AssetSpec[] {
    const ordered = [...ASSETS]
        .map((asset) => ({ asset, rank: seedFrom(`${dateKey}:${asset.symbol}`) }))
        .sort((a, b) => a.rank - b.rank)
        .map((entry) => entry.asset);
    // Spread the batch across categories before falling back to whatever is left.
    const picked: AssetSpec[] = [];
    const seenCategories = new Set<string>();
    for (const asset of ordered) {
        if (picked.length >= POSTS_PER_DAY) break;
        if (seenCategories.has(asset.category)) continue;
        seenCategories.add(asset.category);
        picked.push(asset);
    }
    for (const asset of ordered) {
        if (picked.length >= POSTS_PER_DAY) break;
        if (!picked.includes(asset)) picked.push(asset);
    }
    return picked;
}

// A post built on a real story. The quote, when there is one, is passed to the
// model as verified context so the commentary can cite today's level without
// the model guessing at it.
async function writeFromNews(item: NewsItem, quote: MarketQuote | null, dateKey: string): Promise<DailyBlog | null> {
    const style = CATEGORY_STYLES[item.category];
    const seed = seedFrom(`${dateKey}:${item.link}`);
    const length = LENGTHS[seed % LENGTHS.length];
    const marketContext = quote
        ? `- ${quote.name} (${quote.symbol}): ${quote.currency === "USD" ? "$" : "₹"}${quote.price.toLocaleString()} (${quote.changePercent >= 0 ? "+" : ""}${quote.changePercent.toFixed(2)}% today)`
        : undefined;
    try {
        const generated = await generateBlogFromNews({
            headline: item.title,
            standfirst: item.summary,
            source: item.source,
            persona: style.persona,
            length,
            marketContext,
        });
        if (!generated.content.trim()) {
            console.error(`Skipping "${item.title.slice(0, 60)}": generator returned an empty body`);
            return null;
        }
        return {
            id: `auto-${dateKey}-${item.category}`,
            title: generated.title,
            summary: generated.summary,
            content: generated.content,
            symbol: quote?.symbol ?? "^NSEI",
            name: quote?.name ?? "Indian markets",
            price: quote?.price ?? 0,
            changePercent: quote?.changePercent ?? 0,
            currency: quote?.currency ?? "INR",
            tone: "neutral",
            persona: style.persona,
            length,
            createdAt: item.publishedAt ?? new Date().toISOString(),
            author: style.author,
            category: item.category,
            tag: item.tag,
            image: style.image,
            generated: true,
            sourceName: item.source,
            sourceUrl: item.link,
        };
    }
    catch (error) {
        console.error(`Skipping "${item.title.slice(0, 60)}": generation failed:`, error);
        return null;
    }
}

// Fallback for a category whose feeds came back empty: a market-data post, which
// still only runs when there is a real quote behind it.
async function writeFromMarket(asset: AssetSpec, quote: MarketQuote, dateKey: string): Promise<DailyBlog | null> {
    const seed = seedFrom(`${dateKey}:${asset.symbol}:tone`);
    const tone = TONES[seed % TONES.length];
    const length = LENGTHS[seed % LENGTHS.length];
    try {
        const generated = await generateBlog({
            symbol: asset.symbol,
            name: quote.name,
            price: quote.price,
            changePercent: quote.changePercent,
            currency: quote.currency,
            tone,
            persona: asset.persona,
            length,
        });
        if (!generated.content.trim()) {
            console.error(`Skipping ${asset.symbol}: generator returned an empty body`);
            return null;
        }
        return {
            id: `auto-${dateKey}-${asset.symbol.replace(/[^A-Za-z0-9]/g, "")}`,
            title: generated.title,
            summary: generated.summary,
            content: generated.content,
            symbol: asset.symbol,
            name: quote.name,
            price: quote.price,
            changePercent: quote.changePercent,
            currency: quote.currency,
            tone,
            persona: asset.persona,
            length,
            createdAt: new Date().toISOString(),
            author: asset.author,
            category: asset.category,
            tag: asset.tag,
            image: asset.image,
            generated: true,
        };
    }
    catch (error) {
        console.error(`Skipping ${asset.symbol}: generation failed:`, error);
        return null;
    }
}

// Survives restarts so a redeploy does not spend another round of chatbot calls
// rewriting the same day. A read-only filesystem (serverless) just means the
// in-memory copy is all there is, which is why both layers exist.
const DATA_DIR = process.env.BLOG_DATA_DIR || path.join(process.cwd(), ".data", "blogs");

async function readFromDisk(dateKey: string): Promise<DailyBlog[] | null> {
    try {
        const raw = await fs.readFile(path.join(DATA_DIR, `${dateKey}.json`), "utf8");
        const posts = JSON.parse(raw) as DailyBlog[];
        return Array.isArray(posts) && posts.length > 0 ? posts : null;
    }
    catch {
        return null;
    }
}

// Two server instances booting together must not both pay for a batch. The lock
// is advisory: if the holder dies mid-run it goes stale and the next caller
// takes over rather than the day's posts never being written.
const LOCK_STALE_MS = 5 * 60 * 1000;
const LOCK_POLL_MS = 3000;

async function acquireLock(dateKey: string): Promise<boolean> {
    const lockPath = path.join(DATA_DIR, `${dateKey}.lock`);
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(lockPath, String(process.pid), { flag: "wx" });
        return true;
    }
    catch {
        try {
            const { mtimeMs } = await fs.stat(lockPath);
            if (Date.now() - mtimeMs > LOCK_STALE_MS) {
                await fs.rm(lockPath, { force: true });
                return acquireLock(dateKey);
            }
        }
        catch {
            // The lock vanished between the failed write and the stat.
            return acquireLock(dateKey);
        }
        return false;
    }
}

async function releaseLock(dateKey: string): Promise<void> {
    await fs.rm(path.join(DATA_DIR, `${dateKey}.lock`), { force: true }).catch(() => {});
}

async function writeToDisk(dateKey: string, posts: DailyBlog[]): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(path.join(DATA_DIR, `${dateKey}.json`), JSON.stringify(posts), "utf8");
    }
    catch (error) {
        console.error("Could not persist the daily blog batch, keeping it in memory only:", error);
    }
}

let cached: { key: string; posts: DailyBlog[] } | null = null;
// Two requests arriving on a cold cache must not both pay for a batch.
let inFlight: { key: string; promise: Promise<DailyBlog[]> } | null = null;

// Today's story for each category, chosen deterministically so the batch can be
// rebuilt identically after a restart.
function pickStories(items: NewsItem[], dateKey: string): NewsItem[] {
    const picked: NewsItem[] = [];
    for (const category of CATEGORIES) {
        const candidates = items
            .filter((item) => item.category === category)
            .map((item) => ({ item, rank: seedFrom(`${dateKey}:${item.link}`) }))
            .sort((a, b) => a.rank - b.rank);
        if (candidates.length > 0) picked.push(candidates[0].item);
    }
    return picked.slice(0, POSTS_PER_DAY);
}

async function buildForDay(dateKey: string): Promise<DailyBlog[]> {
    const fromDisk = await readFromDisk(dateKey);
    if (fromDisk) {
        cached = { key: dateKey, posts: fromDisk };
        return fromDisk;
    }

    const stories = pickStories(await fetchNewsItems(), dateKey);
    console.log(`[daily-blogs] ${stories.length} stories picked for ${dateKey}`);

    // Each distinct context symbol is fetched once for the whole batch. Two
    // categories share ^NSEI, and a throttled provider should not be asked twice
    // for the same number. Background context, so one attempt and move on.
    const contextQuotes = new Map<string, MarketQuote | null>();
    for (const symbol of new Set(stories.map((story) => CATEGORY_STYLES[story.category].contextSymbol).filter((s): s is string => !!s))) {
        contextQuotes.set(symbol, await fetchMarketQuote(symbol, 1));
        await new Promise((resolve) => setTimeout(resolve, QUOTE_GAP_MS));
    }

    const fromNews: DailyBlog[] = [];
    for (const story of stories) {
        const symbol = CATEGORY_STYLES[story.category].contextSymbol;
        const post = await writeFromNews(story, symbol ? contextQuotes.get(symbol) ?? null : null, dateKey);
        if (post) fromNews.push(post);
    }

    // Any category the feeds did not cover falls back to a market-data post, and
    // only when a real quote backs it.
    const covered = new Set(fromNews.map((post) => post.category));
    const fallbacks: DailyBlog[] = [];
    for (const asset of pickForDay(dateKey)) {
        if (fromNews.length + fallbacks.length >= POSTS_PER_DAY) break;
        if (covered.has(asset.category)) continue;
        const quote = await fetchMarketQuote(asset.symbol);
        if (!quote) {
            console.error(`Skipping ${asset.symbol}: no live quote, refusing to write against a placeholder price`);
            continue;
        }
        const post = await writeFromMarket(asset, quote, dateKey);
        if (post) {
            fallbacks.push(post);
            covered.add(asset.category);
        }
        await new Promise((resolve) => setTimeout(resolve, QUOTE_GAP_MS));
    }

    const posts = [...fromNews, ...fallbacks];
    if (posts.length > 0) {
        cached = { key: dateKey, posts };
        await writeToDisk(dateKey, posts);
    }
    return posts;
}

async function buildForDayLocked(dateKey: string): Promise<DailyBlog[]> {
    const fromDisk = await readFromDisk(dateKey);
    if (fromDisk) {
        cached = { key: dateKey, posts: fromDisk };
        return fromDisk;
    }
    if (!(await acquireLock(dateKey))) {
        // Someone else is writing today's batch. Wait for their file rather than
        // spending a second round of chatbot calls on the same posts.
        for (let waited = 0; waited < LOCK_STALE_MS; waited += LOCK_POLL_MS) {
            await new Promise((resolve) => setTimeout(resolve, LOCK_POLL_MS));
            const written = await readFromDisk(dateKey);
            if (written) {
                cached = { key: dateKey, posts: written };
                return written;
            }
        }
        return [];
    }
    try {
        return await buildForDay(dateKey);
    }
    finally {
        await releaseLock(dateKey);
    }
}

export async function getDailyBlogs(): Promise<{ date: string; posts: DailyBlog[] }> {
    const dateKey = istDateKey();
    if (cached?.key === dateKey) return { date: dateKey, posts: cached.posts };
    if (inFlight?.key !== dateKey) {
        inFlight = { key: dateKey, promise: buildForDayLocked(dateKey).finally(() => { inFlight = null; }) };
    }
    return { date: dateKey, posts: await inFlight.promise };
}
