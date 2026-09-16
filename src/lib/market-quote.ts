// Live quotes from Yahoo's chart endpoint.
//
// The v7 /finance/quote API this project used to call now answers 401 for
// unauthenticated callers, which is why every quote was silently falling back to
// the hardcoded mock prices in the finance route. v8 /finance/chart still serves
// the same numbers without a crumb, so it is the source of truth here and the
// mock is left to the caller as an explicit, labelled last resort.

const CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
// Yahoo rejects the default fetch agent.
const BROWSER_UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
// Quotes back a post that is written once a day; minutes of staleness are fine.
const QUOTE_REVALIDATE_SECONDS = 15 * 60;
// Yahoo answers 429 to a burst of lookups and stays cross for a while, so a
// batch backs off properly rather than treating a throttle as "this symbol has
// no price". Worst case is ~30s for one symbol, which a nightly batch can wear.
const MAX_ATTEMPTS = 4;
const RETRY_BASE_MS = 4000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface MarketQuote {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    currency: string;
    high?: number;
    low?: number;
    volume?: number;
    marketCap?: number;
}

interface ChartMeta {
    symbol?: string;
    shortName?: string;
    longName?: string;
    regularMarketPrice?: number;
    chartPreviousClose?: number;
    previousClose?: number;
    currency?: string;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
}

// Returns null rather than throwing: callers decide whether a missing quote means
// "fall back to mock" (the interactive route) or "skip this asset" (the daily
// blog batch, which must not publish invented prices).
// `attempts` lets a caller choose how hard to try: a post that is *about* the
// price waits out a throttle, while a quote used only as background context
// fails fast and the post simply goes without it.
export async function fetchMarketQuote(symbol: string, attempts: number = MAX_ATTEMPTS): Promise<MarketQuote | null> {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        const quote = await requestQuote(symbol, attempt);
        if (quote !== RETRY) return quote;
        if (attempt < attempts) await sleep(RETRY_BASE_MS * 2 ** (attempt - 1));
    }
    console.error(`Quote lookup for ${symbol} gave up after ${attempts} throttled attempt(s)`);
    return null;
}

// Distinguishes "throttled, try again" from "no price for this symbol".
const RETRY = Symbol("retry");

async function requestQuote(symbol: string, attempt: number): Promise<MarketQuote | null | typeof RETRY> {
    try {
        const res = await fetch(`${CHART_URL}/${encodeURIComponent(symbol)}?interval=1d&range=5d`, {
            headers: { "User-Agent": BROWSER_UA },
            next: { revalidate: QUOTE_REVALIDATE_SECONDS },
        });
        if (res.status === 429 || res.status >= 500) {
            console.error(`Quote lookup for ${symbol} throttled with ${res.status} (attempt ${attempt})`);
            return RETRY;
        }
        if (!res.ok) return null;
        const body = await res.json();
        const meta: ChartMeta | undefined = body?.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        const previous = meta?.chartPreviousClose ?? meta?.previousClose;
        if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;

        const change = typeof previous === "number" && previous > 0 ? price - previous : 0;
        return {
            symbol: meta?.symbol ?? symbol,
            name: meta?.longName || meta?.shortName || meta?.symbol || symbol,
            price,
            change,
            changePercent: typeof previous === "number" && previous > 0 ? (change / previous) * 100 : 0,
            currency: meta?.currency ?? "USD",
            high: meta?.regularMarketDayHigh,
            low: meta?.regularMarketDayLow,
            volume: meta?.regularMarketVolume,
        };
    }
    catch (error) {
        console.error(`Quote lookup failed for ${symbol}:`, error);
        return RETRY;
    }
}
