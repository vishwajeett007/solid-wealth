// Runs once per server instance, before requests are served.
export async function register() {
    // The daily jobs read AMFI and write files, neither of which the edge
    // runtime can do.
    if (process.env.NEXT_RUNTIME !== "nodejs") return;
    if (process.env.DISABLE_DAILY_JOBS === "1") {
        console.log("[daily-jobs] disabled by DISABLE_DAILY_JOBS");
        return;
    }
    const { startDailyJobs } = await import("@/lib/daily-jobs");
    startDailyJobs();
}
