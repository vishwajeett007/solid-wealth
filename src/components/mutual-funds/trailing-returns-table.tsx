"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, FileSpreadsheet, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  API_BASE_URL,
  LONG_TERM_COLUMNS,
  SHORT_TERM_COLUMNS,
  formatAum,
  formatDate,
  formatFixed,
  returnTone,
  toNumber,
  type CategoryOption,
  type FundPerformance,
  type ReturnKey,
} from "@/lib/mutual-fund-performance";

type SortKey = "scheme_name" | "nav" | "aum_crore" | "ber_percent" | "ter_percent" | ReturnKey;

type LoadStatus = "loading" | "ready" | "error";

// Used only while the backend lacks /api/mutual-fund-performance/categories/
// (it answers 404). Lists categories confirmed to have uploaded data on
// production; remove once that endpoint is deployed.
const FALLBACK_CATEGORIES: CategoryOption[] = [
  { category: "Childrens Fund", periods: ["Greater than 1 Year", "Less than 1 Year"] },
];

// The upload admin offers "Less than 1 Year" and "Greater than 1 Year".
function columnsForPeriod(period: string) {
  return period.toLowerCase().startsWith("greater") ? LONG_TERM_COLUMNS : SHORT_TERM_COLUMNS;
}

function SortableHeader({
  label,
  column,
  onSort,
  className,
}: {
  label: string;
  column: SortKey;
  onSort: (column: SortKey) => void;
  className?: string;
}) {
  return (
    <th
      onClick={() => onSort(column)}
      className={cn(
        "px-2 py-3 text-right cursor-pointer hover:bg-orange-50/50 whitespace-nowrap",
        className
      )}
    >
      <div className="flex items-center justify-end gap-1">
        <span>{label}</span>
        <ArrowUpDown className="size-3 opacity-60" />
      </div>
    </th>
  );
}

export function TrailingReturnsTable() {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [categoriesStatus, setCategoriesStatus] = useState<LoadStatus>("loading");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [active, setActive] = useState<{ category: string; period: string } | null>(null);
  const [funds, setFunds] = useState<FundPerformance[]>([]);
  const [fundsStatus, setFundsStatus] = useState<LoadStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState<number | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("scheme_name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedSchemes, setSelectedSchemes] = useState<Record<number, boolean>>({});

  // Load the categories that have uploaded data, then show the first one.
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/mutual-fund-performance/categories/`, {
          signal: controller.signal,
        });
        let payload: CategoryOption[];
        if (res.status === 404) {
          payload = FALLBACK_CATEGORIES;
        } else {
          if (!res.ok) throw new Error(`Categories request failed with ${res.status}`);
          payload = await res.json();
        }
        if (controller.signal.aborted) return;
        setCategories(payload);
        setCategoriesStatus("ready");

        const first = payload[0];
        if (!first) {
          setFundsStatus("ready");
          return;
        }
        const period = first.periods[0] ?? "";
        setSelectedCategory(first.category);
        setSelectedPeriod(period);
        setActive({ category: first.category, period });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Failed to load mutual fund categories:", err);
        setCategoriesStatus("error");
      }
    };
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    const load = async () => {
      const params = new URLSearchParams({ category: active.category, period: active.period });
      try {
        const res = await fetch(`${API_BASE_URL}/api/mutual-fund-performance/?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Fund performance request failed with ${res.status}`);
        const payload: FundPerformance[] = await res.json();
        if (controller.signal.aborted) return;
        setFunds(payload);
        setFundsStatus("ready");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Failed to load mutual fund performance:", err);
        setFundsStatus("error");
      }
    };
    load();
    return () => controller.abort();
  }, [active, reloadKey]);

  const periodOptions = categories.find((c) => c.category === selectedCategory)?.periods ?? [];
  const columns = columnsForPeriod(active?.period ?? "");
  const totalColumns =
    6 + columns.reduce((count, col) => count + (col.rankKey ? 2 : 1), 0) + 1;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const periods = categories.find((c) => c.category === category)?.periods ?? [];
    if (!periods.includes(selectedPeriod)) {
      setSelectedPeriod(periods[0] ?? "");
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedPeriod) return;
    if (active?.category === selectedCategory && active.period === selectedPeriod) return;
    setFundsStatus("loading");
    setSelectedSchemes({});
    setActive({ category: selectedCategory, period: selectedPeriod });
  };

  const retry = () => {
    setFundsStatus("loading");
    setReloadKey((key) => key + 1);
  };

  const visibleFunds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = funds.filter(
      (fund) =>
        query === "" ||
        fund.scheme_name.toLowerCase().includes(query) ||
        (fund.fund_manager ?? "").toLowerCase().includes(query)
    );

    list.sort((a, b) => {
      if (sortKey === "scheme_name") {
        const cmp = a.scheme_name.localeCompare(b.scheme_name);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const valA = toNumber(a[sortKey]);
      const valB = toNumber(b[sortKey]);
      // Missing values stay at the bottom in both directions.
      if (valA === null) return valB === null ? 0 : 1;
      if (valB === null) return -1;
      return sortDir === "asc" ? valA - valB : valB - valA;
    });

    return pageSize === "All" ? list : list.slice(0, pageSize);
  }, [funds, searchQuery, sortKey, sortDir, pageSize]);

  // Mean of the schemes returned for this category. The vendor export's own
  // "Category Average" row is skipped by the Excel import, so this is not that figure.
  const listedAverage = useMemo(() => {
    const averages: Partial<Record<ReturnKey, number | null>> = {};
    for (const { returnKey } of [...SHORT_TERM_COLUMNS, ...LONG_TERM_COLUMNS]) {
      const values = funds
        .map((fund) => toNumber(fund[returnKey]))
        .filter((value): value is number => value !== null);
      averages[returnKey] = values.length
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : null;
    }
    return averages;
  }, [funds]);

  const uploadedAt = funds.reduce<string | null>(
    (latest, fund) => (!latest || fund.created_at > latest ? fund.created_at : latest),
    null
  );

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleSchemeSelect = (id: number) => {
    setSelectedSchemes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const exportToExcel = () => {
    if (!active) return;
    const headers = ["Scheme Name", "NAV", "Launch Date", "AUM (Crore)", "BER (%)", "TER (%)"];
    for (const col of columns) {
      headers.push(`${col.label} Return (%)`);
      if (col.rankKey) headers.push(`${col.label} Rank`);
    }

    const csvCell = (value: string | null) => `"${(value ?? "").replace(/"/g, '""')}"`;
    const rows = visibleFunds.map((fund) => {
      const cells = [
        fund.scheme_name,
        fund.nav,
        fund.launch_date,
        fund.aum_crore,
        fund.ber_percent,
        fund.ter_percent,
      ];
      for (const col of columns) {
        cells.push(fund[col.returnKey]);
        if (col.rankKey) cells.push(fund[col.rankKey]);
      }
      return cells.map(csvCell).join(",");
    });

    const csv = [headers.map(csvCell).join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    link.setAttribute(
      "download",
      `Mutual_Fund_Trailing_Returns_${`${active.category}_${active.period}`.replace(/[^a-z0-9]/gi, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  let tableMessage: React.ReactNode = null;
  if (categoriesStatus === "error") {
    tableMessage = "Couldn't load fund categories. Please try again later.";
  } else if (categoriesStatus === "ready" && categories.length === 0) {
    tableMessage = "No mutual fund performance data has been uploaded yet.";
  } else if (fundsStatus === "loading") {
    tableMessage = "Loading schemes...";
  } else if (fundsStatus === "error") {
    tableMessage = (
      <span>
        Couldn&apos;t load schemes for this category.{" "}
        <button
          type="button"
          onClick={retry}
          className="font-bold text-[#0B63E5] hover:underline cursor-pointer"
        >
          Retry
        </button>
      </span>
    );
  } else if (visibleFunds.length === 0) {
    tableMessage = funds.length === 0 ? "No schemes in this category." : "No schemes match your search.";
  }

  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-xs">
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={categoriesStatus !== "ready" || categories.length === 0}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] disabled:opacity-60"
              >
                {categoriesStatus === "loading" && <option value="">Loading categories...</option>}
                {categories.map((option) => (
                  <option key={option.category} value={option.category}>
                    {option.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Select Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                disabled={periodOptions.length === 0}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 outline-none focus:border-[#0B63E5] focus:ring-1 focus:ring-[#0B63E5] disabled:opacity-60"
              >
                {periodOptions.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="submit"
              disabled={!selectedCategory || !selectedPeriod}
              className="px-6 py-2.5 rounded-lg bg-[#0B63E5] hover:bg-[#0952be] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search scheme name, fund manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#0B63E5]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          {fundsStatus === "ready" && uploadedAt && (
            <span className="text-xs font-medium text-gray-500">
              Data as of {formatDate(uploadedAt)}
            </span>
          )}

          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) =>
                setPageSize(e.target.value === "All" ? "All" : Number(e.target.value))
              }
              className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-800 outline-none"
            >
              <option value="All">All</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <button
            onClick={exportToExcel}
            disabled={visibleFunds.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="size-3.5 text-emerald-600" />
            <span>Excel</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-xs">
        <table className="w-full text-left text-xs text-gray-700 border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#FFF8EA] text-[#8a5b15] font-bold text-[11px] uppercase tracking-wider">
              <th colSpan={6} className="px-4 py-2 border-r border-[#edd9b7]" />
              {columns.map((col) => (
                <th
                  key={col.returnKey}
                  colSpan={col.rankKey ? 2 : 1}
                  className="px-2 py-2 text-center border-r border-[#edd9b7]"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-2 py-2 text-center">Action</th>
            </tr>

            <tr className="border-b border-[#e5e7eb] bg-[#FFFDF7] text-[#925f18] font-bold text-[11px]">
              <th
                onClick={() => toggleSort("scheme_name")}
                className="px-4 py-3 cursor-pointer hover:bg-orange-50/50 transition-colors whitespace-nowrap min-w-[220px]"
              >
                <div className="flex items-center gap-1">
                  <span>Scheme Name</span>
                  <ArrowUpDown className="size-3 opacity-60" />
                </div>
              </th>
              <SortableHeader label="NAV" column="nav" onSort={toggleSort} className="px-3" />
              <th className="px-3 py-3 text-center whitespace-nowrap">Launch Date</th>
              <SortableHeader label="AUM (Crore)" column="aum_crore" onSort={toggleSort} className="px-3" />
              <SortableHeader label="BER (%)" column="ber_percent" onSort={toggleSort} />
              <SortableHeader
                label="TER (%)"
                column="ter_percent"
                onSort={toggleSort}
                className="border-r border-[#f1dfc5]"
              />
              {columns.map((col) => (
                <React.Fragment key={col.returnKey}>
                  <SortableHeader
                    label="Rtn (%)"
                    column={col.returnKey}
                    onSort={toggleSort}
                    className={col.rankKey ? undefined : "border-r border-[#f1dfc5]"}
                  />
                  {col.rankKey && (
                    <th className="px-2 py-3 text-center border-r border-[#f1dfc5] whitespace-nowrap">
                      Rank
                    </th>
                  )}
                </React.Fragment>
              ))}
              <th className="px-3 py-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tableMessage ? (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-4 py-10 text-center text-sm font-medium text-gray-500"
                >
                  {tableMessage}
                </td>
              </tr>
            ) : (
              visibleFunds.map((fund, idx) => (
                <tr
                  key={fund.id}
                  className={cn(
                    "transition-colors hover:bg-orange-50/40",
                    idx % 2 === 1 ? "bg-[#fcfdfd]" : "bg-white"
                  )}
                >
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">
                    <Link
                      href={`/mutual-funds/fund-card?${new URLSearchParams({
                        category: fund.category,
                        period: fund.period,
                        scheme: fund.scheme_name,
                      })}`}
                      className="text-[#0B63E5] hover:text-[#0952be] hover:underline"
                    >
                      {fund.scheme_name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                    {formatFixed(fund.nav)}
                  </td>
                  <td className="px-3 py-3 text-center text-gray-600 whitespace-nowrap">
                    {formatDate(fund.launch_date)}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                    {formatAum(fund.aum_crore)}
                  </td>
                  <td className="px-2 py-3 text-right text-gray-700 whitespace-nowrap">
                    {formatFixed(fund.ber_percent)}
                  </td>
                  <td className="px-2 py-3 text-right text-gray-700 border-r border-gray-100 whitespace-nowrap">
                    {formatFixed(fund.ter_percent)}
                  </td>
                  {columns.map((col) => (
                    <React.Fragment key={col.returnKey}>
                      <td
                        className={cn(
                          "px-2 py-3 text-right font-semibold whitespace-nowrap",
                          returnTone(toNumber(fund[col.returnKey])),
                          !col.rankKey && "border-r border-gray-100"
                        )}
                      >
                        {formatFixed(fund[col.returnKey])}
                      </td>
                      {col.rankKey && (
                        <td className="px-2 py-3 text-center text-gray-500 border-r border-gray-100 whitespace-nowrap">
                          {fund[col.rankKey] || "-"}
                        </td>
                      )}
                    </React.Fragment>
                  ))}
                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={Boolean(selectedSchemes[fund.id])}
                      onChange={() => toggleSchemeSelect(fund.id)}
                      aria-label={`Select ${fund.scheme_name}`}
                      className="size-4 rounded border-gray-300 text-[#0B63E5] focus:ring-[#0B63E5] cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {!tableMessage && (
            <tfoot>
              <tr className="bg-[#0B63E5] text-white font-bold text-xs">
                <td className="px-4 py-3 whitespace-nowrap font-bold">Average (listed schemes)</td>
                <td className="px-3 py-3 text-right">-</td>
                <td className="px-3 py-3 text-center">-</td>
                <td className="px-3 py-3 text-right">-</td>
                <td className="px-2 py-3 text-right">-</td>
                <td className="px-2 py-3 text-right border-r border-blue-400/30">-</td>
                {columns.map((col) => {
                  const average = listedAverage[col.returnKey];
                  return (
                    <React.Fragment key={col.returnKey}>
                      <td
                        className={cn(
                          "px-2 py-3 text-right whitespace-nowrap",
                          !col.rankKey && "border-r border-blue-400/30"
                        )}
                      >
                        {average === null || average === undefined ? "-" : average.toFixed(2)}
                      </td>
                      {col.rankKey && (
                        <td className="px-2 py-3 text-center border-r border-blue-400/30">-</td>
                      )}
                    </React.Fragment>
                  );
                })}
                <td className="px-3 py-3 text-center">-</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
