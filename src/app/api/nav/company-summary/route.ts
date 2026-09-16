import { NextResponse } from "next/server";
import { fetchNavCompanySummaryText, secondsUntilIstMidnight } from "@/lib/nav-company-summary";

// GET /api/nav/company-summary
// Cached proxy for the backend's AMFI summary. The payload is large and changes
// once a day, so it is served from the data cache and browsers are told to hold
// it until the next midnight IST rather than re-download it on every visit.
export async function GET() {
    try {
        const body = await fetchNavCompanySummaryText();
        return new Response(body, {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": `public, max-age=${secondsUntilIstMidnight()}, stale-while-revalidate=${24 * 60 * 60}`,
            },
        });
    }
    catch (error) {
        console.error("Company NAV summary failed:", error);
        return NextResponse.json({ error: "Could not load mutual fund NAVs right now" }, { status: 502 });
    }
}
