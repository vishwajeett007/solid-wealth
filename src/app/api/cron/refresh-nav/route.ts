import { NextRequest, NextResponse } from "next/server";
import { fetchNavCompanySummaryText } from "@/lib/nav-company-summary";

// GET /api/cron/refresh-nav
// Point a scheduler at this for midnight IST (crontab runs in UTC: `30 18 * * *`).
// The cached summary expires at midnight on its own, so this just pulls the new
// one into the cache and the first visitor of the day doesn't wait on upstream.
// Requires CRON_SECRET, sent as `Authorization: Bearer <secret>`.
//
// It deliberately does not call revalidateTag: invalidating and refilling inside
// one request writes an entry that is already considered stale, so the next
// reader pays for the upstream fetch anyway.
export async function GET(request: NextRequest) {
    const secret = process.env.CRON_SECRET;
    if (!secret) {
        return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 503 });
    }
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await fetchNavCompanySummaryText();
        return NextResponse.json({ refreshedAt: new Date().toISOString(), bytes: body.length });
    }
    catch (error) {
        console.error("Company NAV refresh failed:", error);
        return NextResponse.json({ error: "Could not refresh mutual fund NAVs" }, { status: 502 });
    }
}
