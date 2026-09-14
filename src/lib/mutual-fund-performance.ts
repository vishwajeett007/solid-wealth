// Shared types and formatting for /api/mutual-fund-performance/ data, used by
// the trailing returns table and the scheme detail page.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://solidwealthindia.com";

export type ReturnKey =
  | "return_1w"
  | "return_1m"
  | "return_3m"
  | "return_6m"
  | "ytd_return"
  | "return_1yr"
  | "return_2yr"
  | "return_3yr"
  | "return_5yr"
  | "return_10yr";

export type RankKey = "rank_1yr" | "rank_2yr" | "rank_3yr" | "rank_5yr" | "rank_10yr";

// A row from /api/mutual-fund-performance/. DRF serialises decimals as strings.
export type FundPerformance = {
  id: number;
  category: string;
  period: string;
  scheme_name: string;
  nav: string | null;
  launch_date: string | null;
  aum_crore: string | null;
  ber_percent: string | null;
  ter_percent: string | null;
  fund_manager: string | null;
  created_at: string;
} & Record<ReturnKey, string | null> &
  Record<RankKey, string | null>;

export interface CategoryOption {
  category: string;
  periods: string[];
}

export interface ReturnColumn {
  label: string;
  returnKey: ReturnKey;
  rankKey?: RankKey;
}

export const SHORT_TERM_COLUMNS: ReturnColumn[] = [
  { label: "1 Week", returnKey: "return_1w" },
  { label: "1 Month", returnKey: "return_1m" },
  { label: "3 Months", returnKey: "return_3m" },
  { label: "6 Months", returnKey: "return_6m" },
  { label: "YTD", returnKey: "ytd_return" },
];

export const LONG_TERM_COLUMNS: ReturnColumn[] = [
  { label: "1 Year", returnKey: "return_1yr", rankKey: "rank_1yr" },
  { label: "2 Years", returnKey: "return_2yr", rankKey: "rank_2yr" },
  { label: "3 Years", returnKey: "return_3yr", rankKey: "rank_3yr" },
  { label: "5 Years", returnKey: "return_5yr", rankKey: "rank_5yr" },
  { label: "10 Years", returnKey: "return_10yr", rankKey: "rank_10yr" },
];

export function toNumber(value: string | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function formatFixed(value: string | null) {
  const n = toNumber(value);
  return n === null ? "-" : n.toFixed(2);
}

export function formatAum(value: string | null) {
  const n = toNumber(value);
  return n === null ? "-" : n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function returnTone(value: number | null) {
  if (value === null) return "text-gray-400";
  return value >= 0 ? "text-emerald-600" : "text-rose-600";
}
