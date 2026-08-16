import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { symbol, name, price, changePercent, currency, tone, persona, length } = await request.json();
        if (!symbol || price === undefined) {
            return NextResponse.json({ error: "Missing required stock data" }, { status: 400 });
        }
        const toneInstruction = {
            bullish: "Write with a strong bullish tone, highlighting the positive growth catalysts, technical breakouts, and long-term upside potential. Emphasize why investors should buy or hold.",
            bearish: "Write with a bearish tone, highlighting the risks, valuation concerns, macro headwinds, and potential downsides. Emphasize caution and why investors should prune their exposure.",
            neutral: "Write with a balanced, neutral tone, examining both the bull and bear cases objectively. Provide a structured risk-reward overview.",
            educational: "Write with a focus on education. Explain how this asset works, its role in a diversified portfolio, and what key metrics investors should track for it.",
            breaking: "Write a concise, high-impact breaking news flash. Emphasize the immediate catalyst, the volume spike, and what it means for short-term traders."
        }[tone as 'bullish' | 'bearish' | 'neutral' | 'educational' | 'breaking'] || "Write a professional financial analysis.";
        const prompt = `Write a professional, SEO-optimized, engaging financial blog post for Solid Wealth.
The post must analyze the asset ${name} (${symbol}).
Here is the real-time market data fetched for ${symbol}:
- Current Price: ${currency === 'USD' ? '$' : '₹'}${price.toLocaleString()}
- Price Change: ${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%
- Currency: ${currency}

The analysis should be written from the perspective of "${persona}".
The length of the post should be suitable for a "${length}".
Tone & Directive: ${toneInstruction}

IMPORTANT: Write the response using a structured template. Do not include any JSON wrapping or markdown outside this template. The template must look exactly like this:

Title: [Write a catchy, compelling financial headline here, e.g. "Is Apple's New AI Strategy Enough to Push AAPL to $200?"]

Summary: [Write a 2-sentence SEO summary/meta description summarizing the main takeaway here]

Content:
[Write the full article body here. Use markdown for structure like subheadings (## or ###), bullet points, and bold text. Break it down into at least 3-4 paragraphs. Make it highly engaging, detailed, and data-driven, referencing the price of ${currency === 'USD' ? '$' : '₹'}${price} and the change of ${changePercent.toFixed(2)}%. Add actionable insights for wealth management.]`;
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://solidwealthindia.com";
        const res = await fetch(`${baseUrl}/api/chatbot/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: prompt }),
        });
        if (!res.ok) {
            throw new Error(`Chatbot API returned status ${res.status}`);
        }
        const data = await res.json();
        let text = data.answer || "";
        text = text.replace(/^(\*\*Answer\s*:\*\*|Answer\s*:)\s*/i, "");
        const titleMatch = text.match(/Title:\s*(.*?)(?:\n|$)/i);
        const summaryMatch = text.match(/Summary:\s*(.*?)(?:\n|$)/i);
        let title = titleMatch ? titleMatch[1].trim() : `${name} (${symbol}) Market Analysis`;
        let summary = summaryMatch ? summaryMatch[1].trim() : `Real-time market analysis for ${name} based on latest price feeds.`;
        let content = text;
        const contentIndex = text.toLowerCase().indexOf("content:");
        if (contentIndex !== -1) {
            content = text.slice(contentIndex + 8).trim();
        }
        else {
            content = text
                .replace(/Title:\s*(.*?)(?:\n|$)/gi, "")
                .replace(/Summary:\s*(.*?)(?:\n|$)/gi, "")
                .trim();
        }
        title = title.replace(/^["']|["']$/g, "");
        summary = summary.replace(/^["']|["']$/g, "");
        return NextResponse.json({
            title,
            summary,
            content,
            rawText: text
        });
    }
    catch (error) {
        console.error("Error generating blog:", error);
        return NextResponse.json({ error: "Failed to generate blog post. Please try again." }, { status: 500 });
    }
}
