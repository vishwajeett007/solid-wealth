// The site's data all turns over on the Indian trading calendar: AMFI publishes
// NAVs overnight and the daily blog batch is written against that day's closes.
// Shared so every cache in the app expires on the same boundary.

const ONE_DAY_SECONDS = 24 * 60 * 60;
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Seconds until the next 00:00 IST, so an entry written mid-afternoon still
// expires when the day's data lands instead of 24h after whoever warmed it.
// Always in (0, 86400], so a cache never outlives a day.
export function secondsUntilIstMidnight(now: Date = new Date()): number {
    const secondsIntoIstDay = Math.floor(((now.getTime() + IST_OFFSET_MS) % (ONE_DAY_SECONDS * 1000)) / 1000);
    return ONE_DAY_SECONDS - secondsIntoIstDay;
}

// YYYY-MM-DD in IST. Doubles as the cache key for anything rebuilt once a day.
export function istDateKey(now: Date = new Date()): string {
    return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}
