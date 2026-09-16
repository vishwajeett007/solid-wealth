import { NextRequest, NextResponse } from "next/server";
import { getDailyBlogs } from "@/lib/daily-blogs";

// GET /api/cron/generate-blogs
// Point a scheduler at this just after midnight IST (crontab is UTC, so
// `35 18 * * *`) to write the day's batch before anyone asks for it — otherwise
// the first visitor of the day waits on the generator.
// Requires CRON_SECRET, sent as `Authorization: Bearer <secret>`.
export async function GET(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 503 });
    }
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { date, posts } = await getDailyBlogs();
        return NextResponse.json({
            date,
            generated: posts.length,
            posts: posts.map((post) => ({ id: post.id, symbol: post.symbol, title: post.title })),
        });
    }
    catch (error) {
        console.error("Blog batch failed:", error);
        return NextResponse.json({ error: "Could not generate the daily blog batch" }, { status: 502 });
    }
}
