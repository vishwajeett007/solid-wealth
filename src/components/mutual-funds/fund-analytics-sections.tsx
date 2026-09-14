"use client";

import React from "react";
import type { FundAnalytics } from "@/lib/fund-analytics";
import { cn } from "@/lib/utils";
import { formatDate, returnTone } from "@/lib/mutual-fund-performance";
import { NavGrowthChart } from "./nav-growth-chart";

type MatchedAnalytics = Extract<FundAnalytics, { matched: true }>;

function pct(value: number | null) {
  return value === null ? "-" : value.toFixed(2);
}

function rupees(value: number | null) {
  return value === null ? "-" : `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-[#1a2332]">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

const HEAD_CELL = "px-3 py-2.5 text-right font-bold whitespace-nowrap";
const BODY_CELL = "px-3 py-2.5 text-right whitespace-nowrap";

export function FundAnalyticsSections({ analytics }: { analytics: MatchedAnalytics }) {
  const asOf = formatDate(analytics.nav.date);

  return (
    <div className="space-y-6">
      <Card
        title="Returns (%)"
        subtitle={`As of ${asOf}. Under 1 year absolute; 1 year and above annualised.`}
      >
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[760px] text-sm text-gray-700 border-collapse tabular-nums">
            <thead>
              <tr className="bg-[#FFF8EA] text-[#8a5b15] text-xs uppercase tracking-wider">
                <th className="px-3 py-2.5 text-left font-bold whitespace-nowrap" />
                {analytics.returns.map((row) => (
                  <th key={row.key} className={HEAD_CELL}>
                    {row.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2.5 font-bold text-gray-900 whitespace-nowrap">Fund</td>
                {analytics.returns.map((row) => (
                  <td key={row.key} className={cn(BODY_CELL, "font-bold", returnTone(row.fund))}>
                    {pct(row.fund)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Category average</td>
                {analytics.returns.map((row) => (
                  <td key={row.key} className={BODY_CELL}>
                    {pct(row.categoryAverage)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Funds in category</td>
                {analytics.returns.map((row) => (
                  <td key={row.key} className={BODY_CELL}>
                    {row.fundsInCategory || "-"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">Rank in category</td>
                {analytics.returns.map((row) => (
                  <td key={row.key} className={BODY_CELL}>
                    {row.rank ?? "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="NAV growth over the last year (%)" subtitle={`Change in NAV from the first trading day in the window, up to ${asOf}.`}>
        <NavGrowthChart data={analytics.chart} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Growth of ₹10,000" subtitle="Lump sum invested at the start of each period.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-[#8a5b15]">
                  <th className="px-2 py-2 text-left font-bold">Period</th>
                  <th className="px-2 py-2 text-right font-bold">Invested on</th>
                  <th className="px-2 py-2 text-right font-bold">Return (%)</th>
                  <th className="px-2 py-2 text-right font-bold">Value now</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.growthOf10k.map((row) => (
                  <tr key={row.label}>
                    <td className="px-2 py-2.5 font-semibold text-gray-900 whitespace-nowrap">{row.label}</td>
                    <td className="px-2 py-2.5 text-right whitespace-nowrap">{formatDate(row.startDate)}</td>
                    <td className={cn("px-2 py-2.5 text-right font-bold", returnTone(row.returnPct))}>{pct(row.returnPct)}</td>
                    <td className="px-2 py-2.5 text-right font-semibold text-gray-900">{rupees(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="SIP returns" subtitle="₹10,000 invested every month for each period.">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-[#8a5b15]">
                  <th className="px-2 py-2 text-left font-bold">Period</th>
                  <th className="px-2 py-2 text-right font-bold">Invested</th>
                  <th className="px-2 py-2 text-right font-bold">Value now</th>
                  <th className="px-2 py-2 text-right font-bold">XIRR (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.sip.map((row) => (
                  <tr key={row.label}>
                    <td className="px-2 py-2.5 font-semibold text-gray-900 whitespace-nowrap">{row.label}</td>
                    <td className="px-2 py-2.5 text-right">{rupees(row.invested)}</td>
                    <td className="px-2 py-2.5 text-right font-semibold text-gray-900">{rupees(row.value)}</td>
                    <td className={cn("px-2 py-2.5 text-right font-bold", returnTone(row.xirr))}>{pct(row.xirr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">&quot;-&quot; means the fund&apos;s NAV history is shorter than the period.</p>
        </Card>
      </div>
    </div>
  );
}
