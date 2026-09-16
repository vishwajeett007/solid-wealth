import { NextRequest, NextResponse } from "next/server";
import { secondsUntilIstMidnight } from "@/lib/ist-day";
import { fetchNavCompanySummary } from "@/lib/nav-company-summary";

// GET /api/nav/company-summary
// Cached proxy for the backend's AMFI summary. The payload is large and changes
// once a day, so it is served from the data cache and a CDN may hold it until
// the next midnight IST.
//
// Browsers revalidate on every load instead of holding it for the day: a plain
// max-age meant a change to the payload (a new field, say) stayed invisible for
// hours behind an already-cached copy. The ETag makes that check cost a 304
// with no body, so the 1.4MB still only crosses the wire when it really changed.
export async function GET(request: NextRequest) {
    try {
        const { body, etag } = await fetchNavCompanySummary();
        const headers = {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=0, must-revalidate, s-maxage=${secondsUntilIstMidnight()}, stale-while-revalidate=${24 * 60 * 60}`,
            ETag: etag,
        };
        // Browsers send back what they hold, weak-validator prefix and all.
        if (request.headers.get("if-none-match")?.replace(/^W\//, "") === etag) {
            return new Response(null, { status: 304, headers });
        }
        return new Response(body, { headers });
    }
    catch (error) {
        console.error("Company NAV summary failed:", error);
        return NextResponse.json({ error: "Could not load mutual fund NAVs right now" }, { status: 502 });
    }
}
