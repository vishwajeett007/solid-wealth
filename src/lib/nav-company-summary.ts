// Server-side loader for the AMFI company NAV summary. The upstream response is
// a few MB of every scheme's NAV and only changes once a day, so it is held in
// the Next data cache and refreshed at midnight IST, after AMFI publishes.
// Read through app/api/nav/company-summary/route.ts, never from the browser.

import { API_BASE_URL } from "@/lib/mutual-fund-performance";

export const NAV_SUMMARY_TAG = "nav-company-summary";

const ONE_DAY_SECONDS = 24 * 60 * 60;
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Seconds until the next 00:00 IST, so an entry written mid-afternoon still
// expires when the day's NAVs land instead of 24h after whoever warmed it.
// Always in (0, 86400], so the cache never outlives a day.
export function secondsUntilIstMidnight(now: Date = new Date()): number {
    const secondsIntoIstDay = Math.floor(((now.getTime() + IST_OFFSET_MS) % (ONE_DAY_SECONDS * 1000)) / 1000);
    return ONE_DAY_SECONDS - secondsIntoIstDay;
}

// Returns the raw JSON text: the proxy route passes it straight through, so
// parsing and re-serialising a multi-MB payload on every request is wasted work.
export async function fetchNavCompanySummaryText(): Promise<string> {
    const res = await fetch(`${API_BASE_URL}/api/nav/company-summary/`, {
        cache: "force-cache",
        next: { revalidate: secondsUntilIstMidnight(), tags: [NAV_SUMMARY_TAG] },
    });
    if (!res.ok) {
        throw new Error(`Company NAV summary request failed with ${res.status}`);
    }
    return res.text();
}
