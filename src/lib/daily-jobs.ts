// Self-scheduling daily work, started from instrumentation.ts when the server
// boots. The HTTP cron endpoints still exist for an external scheduler, but the
// app does not need one: it catches up on boot and re-arms itself for the next
// midnight IST.

import { fetchNavCompanySummary } from "@/lib/nav-company-summary";
import { getDailyBlogs } from "@/lib/daily-blogs";
import { secondsUntilIstMidnight } from "@/lib/ist-day";

// A few minutes past midnight IST: AMFI needs a moment to publish, and it keeps
// the job off the exact hour boundary every other scheduler fires on.
const RUN_AFTER_MIDNIGHT_MS = 5 * 60 * 1000;

let started = false;

async function runDailyJobs(reason: string): Promise<void> {
    console.log(`[daily-jobs] running (${reason})`);
    // Independent of each other: a failing blog batch must not skip the NAV warm.
    const results = await Promise.allSettled([
        getDailyBlogs().then(({ date, posts }) => `blogs: ${posts.length} for ${date}`),
        fetchNavCompanySummary().then(({ body }) => `navs: ${body.length} bytes`),
    ]);
    for (const result of results) {
        if (result.status === "fulfilled") console.log(`[daily-jobs] ${result.value}`);
        else console.error("[daily-jobs] failed:", result.reason);
    }
}

function scheduleNext(): void {
    const delay = secondsUntilIstMidnight() * 1000 + RUN_AFTER_MIDNIGHT_MS;
    const timer = setTimeout(() => {
        // Re-arm first: a throwing job must not stop tomorrow's run.
        scheduleNext();
        void runDailyJobs("midnight IST");
    }, delay);
    // Never hold the process open just because the next run is pending.
    timer.unref?.();
    console.log(`[daily-jobs] next run in ${Math.round(delay / 60000)} min`);
}

export function startDailyJobs(): void {
    if (started) return;
    started = true;
    // Boot catch-up is a no-op once the day's work is cached, so restarts are
    // cheap. Not awaited: register() blocks the server until it returns.
    void runDailyJobs("startup");
    scheduleNext();
}
