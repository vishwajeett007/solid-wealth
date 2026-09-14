import { NextRequest, NextResponse } from "next/server";
import { getFundAnalytics } from "@/lib/fund-analytics";

// GET /api/fund-analytics?category=Childrens%20Fund&scheme=...&nav=21.26&uploadedOn=2026-08-22
// `scheme`, `nav` and `uploadedOn` come from the uploaded performance row and are
// used to find the matching AMFI scheme.
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category")?.trim() ?? "";
    const scheme = searchParams.get("scheme")?.trim() ?? "";
    const nav = Number(searchParams.get("nav"));
    const uploadedOn = searchParams.get("uploadedOn") ?? "";
    if (!category || !scheme || !Number.isFinite(nav) || nav <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(uploadedOn)) {
        return NextResponse.json({ error: "category, scheme, nav and uploadedOn (YYYY-MM-DD) are required" }, { status: 400 });
    }
    try {
        return NextResponse.json(await getFundAnalytics({ category, scheme, nav, uploadedOn }));
    }
    catch (error) {
        console.error("Fund analytics failed:", error);
        return NextResponse.json({ error: "Could not compute fund analytics right now" }, { status: 502 });
    }
}
