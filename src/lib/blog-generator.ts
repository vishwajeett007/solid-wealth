// Prompt and response parsing for AI-written posts, shared by the on-demand
// "Write" button (app/api/generate-blog) and the nightly batch (lib/daily-blogs).
// Generation runs against the backend's chatbot endpoint.

import { API_BASE_URL } from "@/lib/mutual-fund-performance";

export type BlogTone = "bullish" | "bearish" | "neutral" | "educational" | "breaking";

export interface GenerateBlogInput {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    currency: string;
    tone: BlogTone;
    persona: string;
    length: string;
}

export interface GeneratedBlog {
    title: string;
    summary: string;
    content: string;
    rawText: string;
}

const TONE_INSTRUCTIONS: Record<BlogTone, string> = {
    bullish: "Write with a strong bullish tone, highlighting the positive growth catalysts, technical breakouts, and long-term upside potential. Emphasize why investors should buy or hold.",
    bearish: "Write with a bearish tone, highlighting the risks, valuation concerns, macro headwinds, and potential downsides. Emphasize caution and why investors should prune their exposure.",
    neutral: "Write with a balanced, neutral tone, examining both the bull and bear cases objectively. Provide a structured risk-reward overview.",
    educational: "Write with a focus on education. Explain how this asset works, its role in a diversified portfolio, and what key metrics investors should track for it.",
    breaking: "Write a concise, high-impact breaking news flash. Emphasize the immediate catalyst, the volume spike, and what it means for short-term traders.",
};

function buildPrompt(input: GenerateBlogInput): string {
    const { symbol, name, price, changePercent, currency, tone, persona, length } = input;
    const unit = currency === "USD" ? "$" : "₹";
    const toneInstruction = TONE_INSTRUCTIONS[tone] || "Write a professional financial analysis.";
    return `Write a professional, SEO-optimized, engaging financial blog post for Solid Wealth.
The post must analyze the asset ${name} (${symbol}).
Here is the real-time market data fetched for ${symbol}:
- Current Price: ${unit}${price.toLocaleString()}
- Price Change: ${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%
- Currency: ${currency}

The analysis should be written from the perspective of "${persona}".
The length of the post should be suitable for a "${length}".
Tone & Directive: ${toneInstruction}

IMPORTANT: Write the response using a structured template. Do not include any JSON wrapping or markdown outside this template. The template must look exactly like this:

Title: [Write a catchy, compelling financial headline here, e.g. "Is Apple's New AI Strategy Enough to Push AAPL to $200?"]

Summary: [Write a 2-sentence SEO summary/meta description summarizing the main takeaway here]

Content:
[Write the full article body here. Use markdown for structure like subheadings (## or ###), bullet points, and bold text. Break it down into at least 3-4 paragraphs. Make it highly engaging, detailed, and data-driven, referencing the price of ${unit}${price} and the change of ${changePercent.toFixed(2)}%. Add actionable insights for wealth management.]`;
}

interface Fallbacks {
    fallbackTitle: string;
    fallbackSummary: string;
}

// Pulls Title/Summary/Content back out of the template above. The model does not
// always honour it, so every field has a fallback supplied by the caller.
function parseGenerated(text: string, fallbacks: Fallbacks): GeneratedBlog {
    const cleaned = text.replace(/^(\*\*Answer\s*:\*\*|Answer\s*:)\s*/i, "");
    const titleMatch = cleaned.match(/Title:\s*(.*?)(?:\n|$)/i);
    const summaryMatch = cleaned.match(/Summary:\s*(.*?)(?:\n|$)/i);
    const title = (titleMatch ? titleMatch[1].trim() : fallbacks.fallbackTitle).replace(/^["']|["']$/g, "");
    const summary = (summaryMatch ? summaryMatch[1].trim() : fallbacks.fallbackSummary).replace(/^["']|["']$/g, "");

    const contentIndex = cleaned.toLowerCase().indexOf("content:");
    const content = contentIndex !== -1
        ? cleaned.slice(contentIndex + 8).trim()
        : cleaned
            .replace(/Title:\s*(.*?)(?:\n|$)/gi, "")
            .replace(/Summary:\s*(.*?)(?:\n|$)/gi, "")
            .trim();

    return { title, summary, content, rawText: cleaned };
}

export interface GenerateFromNewsInput {
    headline: string;
    standfirst: string;
    source: string;
    persona: string;
    length: string;
    // Included when the day's market data is relevant to the story.
    marketContext?: string;
}

// The news variant: the model analyses a story it is given rather than recalling
// one. Everything factual in the prompt comes from the feed or from a live quote,
// and the post is told not to invent figures beyond them.
function buildNewsPrompt(input: GenerateFromNewsInput): string {
    return `Write a professional, SEO-optimized commentary piece for Solid Wealth, an Indian wealth management firm.

You are commenting on this real news story, published today by ${input.source}:

Headline: ${input.headline}
Summary: ${input.standfirst}
${input.marketContext ? `\nVerified market data as of today:\n${input.marketContext}\n` : ""}
Write from the perspective of "${input.persona}". Length: suitable for a "${input.length}".

STRICT RULES:
- Base every factual claim on the story summary and the market data above. Do NOT invent prices, percentages, dates, fund names or quotes that are not given to you.
- Where you reason beyond the given facts, frame it explicitly as interpretation ("this suggests", "investors may want to consider").
- Explain what the story means for an Indian retail investor's portfolio.
- Do not claim Solid Wealth has independently verified the reporting.

IMPORTANT: Use this exact template, with no JSON or markdown outside it:

Title: [A specific, compelling headline for your commentary. Do not copy the source headline verbatim.]

Summary: [A 2-sentence SEO summary of your take]

Content:
[The full commentary. Use markdown subheadings (## or ###), bullet points and bold text. At least 3-4 paragraphs. Open by summarising what happened, then what it means, then what an investor might do.]`;
}

export async function generateBlogFromNews(input: GenerateFromNewsInput): Promise<GeneratedBlog> {
    return requestGeneration(buildNewsPrompt(input), {
        fallbackTitle: input.headline,
        fallbackSummary: input.standfirst.slice(0, 200),
    });
}

export async function generateBlog(input: GenerateBlogInput): Promise<GeneratedBlog> {
    return requestGeneration(buildPrompt(input), {
        fallbackTitle: `${input.name} (${input.symbol}) Market Analysis`,
        fallbackSummary: `Real-time market analysis for ${input.name} based on latest price feeds.`,
    });
}

async function requestGeneration(prompt: string, fallbacks: Fallbacks): Promise<GeneratedBlog> {
    const res = await fetch(`${API_BASE_URL}/api/chatbot/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Chatbot API returned status ${res.status}`);
    }
    const data = await res.json();
    return parseGenerated(data.answer || "", fallbacks);
}
