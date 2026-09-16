import { NextRequest, NextResponse } from "next/server";
import { BlogTone, generateBlog } from "@/lib/blog-generator";

// POST /api/generate-blog — the "Write" button on the blog page. The prompt and
// parsing live in lib/blog-generator so the nightly batch writes the same way.
export async function POST(request: NextRequest) {
    try {
        const { symbol, name, price, changePercent, currency, tone, persona, length } = await request.json();
        if (!symbol || price === undefined) {
            return NextResponse.json({ error: "Missing required stock data" }, { status: 400 });
        }
        const generated = await generateBlog({
            symbol,
            name,
            price,
            changePercent,
            currency,
            tone: tone as BlogTone,
            persona,
            length,
        });
        return NextResponse.json(generated);
    }
    catch (error) {
        console.error("Error generating blog:", error);
        return NextResponse.json({ error: "Failed to generate blog post. Please try again." }, { status: 500 });
    }
}
