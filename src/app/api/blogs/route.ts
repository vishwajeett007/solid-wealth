import { NextRequest, NextResponse } from "next/server";
import { getDailyBlogs } from "@/lib/daily-blogs";
import { secondsUntilIstMidnight } from "@/lib/ist-day";

// GET /api/blogs — today's AI-written batch, one set per IST day.
// Same caching shape as the NAV summary: browsers revalidate and get a 304 while
// the batch is unchanged, a CDN may hold it until the next midnight IST.
export async function GET(request: NextRequest) {
    try {
        const { date, posts } = await getDailyBlogs();
        const body = JSON.stringify({ date, posts });
        const etag = `"blogs-${date}-${posts.length}"`;
        const headers = {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=0, must-revalidate, s-maxage=${secondsUntilIstMidnight()}, stale-while-revalidate=${24 * 60 * 60}`,
            ETag: etag,
        };
        if (request.headers.get("if-none-match")?.replace(/^W\//, "") === etag) {
            return new Response(null, { status: 304, headers });
        }
        return new Response(body, { headers });
    }
    catch (error) {
        console.error("Daily blogs failed:", error);
        // The page falls back to its seeded posts, so an empty list beats a 500.
        return NextResponse.json({ date: null, posts: [] });
    }
}
