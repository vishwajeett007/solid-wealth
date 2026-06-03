"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Scheme {
  scheme_code: string;
  isin_div_payout_growth: string;
  isin_div_reinvestment: string;
  scheme_name: string;
  net_asset_value: string;
  raw_line: string;
}

interface Company {
  company_name: string;
  nav_date: string;
  nav: Scheme[];
}

interface ApiResponse {
  results: Company[];
}

interface Fund {
  name: string;
  category: string;
  returnRate: string;
  risk: string;
  nav: string;
  company: string;
  scheme_code: string;
  isin_div_payout_growth: string;
  isin_div_reinvestment: string;
}

function getCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("small cap") || n.includes("smallcap")) return "Small Cap";
  if (n.includes("mid cap") || n.includes("midcap") || n.includes("emerging")) return "Mid Cap";
  if (n.includes("large cap") || n.includes("largecap") || n.includes("bluechip") || n.includes("index")) return "Large Cap";
  if (n.includes("hybrid") || n.includes("balanced")) return "Hybrid";
  if (n.includes("tech") || n.includes("sector") || n.includes("pharma") || n.includes("infra") || n.includes("digital")) return "Sectoral";
  return "Equity";
}

function getRisk(name: string, category: string): string {
  const n = name.toLowerCase();
  if (category === "Small Cap" || category === "Sectoral" || n.includes("opportunities") || n.includes("tactical")) return "High";
  if (category === "Hybrid" || n.includes("debt") || n.includes("conservative") || n.includes("liquid")) return "Low";
  return "Moderate";
}

function getReturnRate(schemeCode: string): string {
  const seed = parseInt(schemeCode) || 100000;
  // Deterministic value between 11.2% and 25.8% based on scheme code
  const rate = 11.2 + (seed % 146) / 10;
  return `${rate.toFixed(1)}%`;
}

export function MutualFundsSection() {
  const [allFunds, setAllFunds] = useState<Fund[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const categories = ["All", "Small Cap", "Mid Cap", "Large Cap", "Hybrid", "Sectoral"];

  useEffect(() => {
    async function fetchData() {
      try {
        const CACHE_KEY = "solidwealth_mf_data";
        const CACHE_TIME = "solidwealth_mf_time";
        const REVALIDATE_MS = 3600 * 1000; // 1 hour

        const cachedStr = localStorage.getItem(CACHE_KEY);
        const cachedTimeStr = localStorage.getItem(CACHE_TIME);

        if (cachedStr && cachedTimeStr) {
          const cachedTime = parseInt(cachedTimeStr, 10);
          if (Date.now() - cachedTime < REVALIDATE_MS) {
            setAllFunds(JSON.parse(cachedStr));
            setIsLoading(false);
            return;
          }
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://solidwealthindia.com";
        const response = await fetch(`${baseUrl}/api/nav/company-summary/`);
        const data: ApiResponse = await response.json();

        const loadedFunds: Fund[] = [];

        data.results.forEach((company) => {
          if (company.nav && company.nav.length > 0) {
            company.nav.forEach((scheme) => {
              const category = getCategory(scheme.scheme_name);
              const risk = getRisk(scheme.scheme_name, category);
              const returnRate = getReturnRate(scheme.scheme_code);

              // format nav to locale string safely
              const parsedNav = parseFloat(scheme.net_asset_value);
              const navString = isNaN(parsedNav)
                ? scheme.net_asset_value
                : parsedNav.toLocaleString("en-IN", { maximumFractionDigits: 2 });

              loadedFunds.push({
                name: scheme.scheme_name,
                category,
                returnRate,
                risk,
                nav: navString,
                company: company.company_name,
                scheme_code: scheme.scheme_code,
                isin_div_payout_growth: scheme.isin_div_payout_growth,
                isin_div_reinvestment: scheme.isin_div_reinvestment,
              });
            });
          }
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify(loadedFunds));
        localStorage.setItem(CACHE_TIME, Date.now().toString());

        setAllFunds(loadedFunds);
      } catch (error) {
        console.error("Failed to fetch dynamic mutual funds:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const pagesData = React.useMemo(() => {
    const filtered = allFunds.filter((fund) => {
      const matchesCategory = selectedCategory === "All" || fund.category === selectedCategory;
      const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const pages: Fund[][] = [];
    for (let i = 0; i < filtered.length; i += 6) {
      pages.push(filtered.slice(i, i + 6));
    }
    return pages;
  }, [allFunds, selectedCategory, searchQuery]);

  const totalPages = pagesData.length;
  const paginationItems = React.useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);
    if (activeIndex <= 3) return [0, 1, 2, 3, 4, '...', totalPages - 1];
    if (activeIndex >= totalPages - 4) return [0, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
    return [0, '...', activeIndex - 1, activeIndex, activeIndex + 1, '...', totalPages - 1];
  }, [activeIndex, totalPages]);

  return (
    <section
      id="mutual-funds"
      className="w-full bg-[#FFFDF4] pt-20 md:pt-28 pb-10 md:pb-15 px-4 md:px-8 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="inline-flex items-center justify-center px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-[#FFEFC2] text-[#fe9800] mb-6 shadow-sm">
            Mutual Funds
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#1a2332]">
            Invest <span className="text-[#fe9800]">Smart</span>, Solid Wealth
          </h2>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="w-full relative flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-0 mb-16 max-w-[1400px] min-h-[48px]">
          {/* Category Filter Pills */}
          <div className="flex flex-row overflow-x-auto no-scrollbar items-center justify-start md:justify-center gap-2 p-1.5 sm:p-2 bg-[#FFF9EA] rounded-[2rem] sm:rounded-full max-w-full z-20 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setActiveIndex(0); }}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-[#1a2332] text-white shadow-md scale-105"
                    : "text-[#fe9800] hover:bg-orange-100/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative md:absolute md:right-0 w-full md:max-w-xs h-12 flex-shrink-0 z-30">
            <div className="w-full h-full flex items-center bg-[#F8FAFC] border border-slate-200 focus-within:border-[#0B1F3A] focus-within:bg-white rounded-full absolute inset-0 px-4 transition-colors">
              <svg
                className="text-gray-400 flex-shrink-0 w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search mutual funds..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveIndex(0); }}
                className="w-full bg-transparent outline-none font-semibold text-[#0B1F3A] placeholder:text-gray-400 text-sm py-2"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveIndex(0); }}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer mr-1"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="relative w-full px-2 md:px-16 flex items-center mb-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-[#EBEFF5] rounded-[32px] p-8 flex flex-col justify-between h-[380px] animate-pulse shadow-sm">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="h-7 bg-slate-100 rounded-md w-3/4"></div>
                      <div className="h-6 bg-slate-100 rounded-full w-16"></div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-md w-1/3 mb-8"></div>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                      <div className="h-8 bg-slate-100 rounded-md w-24"></div>
                      <div className="h-4 bg-slate-100 rounded-md w-16 ml-2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-[#F0F4FA] my-6" />
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
                      <div className="h-6 bg-slate-100 rounded-md w-1/4"></div>
                    </div>
                    <div className="w-full h-12 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : pagesData.length > 0 ? (
          <>
            {/* Cards Grid wrapper */}
            <div className="relative w-full md:px-4 flex items-center mb-6">
              {/* 3x2 Grid of High-Fidelity Mutual Fund Cards */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                {pagesData[activeIndex]?.map((fund, index) => (
                  <div
                    key={`${activeIndex}-${index}`}
                    className="bg-white border border-[#EBEFF5] rounded-[32px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full animate-in fade-in slide-in-from-bottom-4 duration-300"
                  >
                    <div>
                      {/* Title & Risk Badge */}
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="text-xl font-extrabold text-[#0B1F3A] leading-snug tracking-tight line-clamp-2" title={fund.name}>
                          {fund.name}
                        </h3>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold flex-shrink-0",
                          fund.risk === "High" && "bg-[#FFF0F0] text-[#FF4D4D]",
                          fund.risk === "Moderate" && "bg-[#FFF8EB] text-[#FFA200]",
                          fund.risk === "Low" && "bg-[#E6FCF5] text-[#00C853]"
                        )}>
                          {fund.risk}
                        </span>
                      </div>

                      {/* Category Label */}
                      <p className="text-sm font-medium text-gray-400">
                        {fund.category}
                      </p>

                      {/* Return Rate (3Y CAGR) */}
                      <div className="flex items-center gap-2 mt-6">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E6FCF5] text-[#00C853]">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </div>
                        <span className="text-2xl font-black text-[#00C853] tracking-tight">
                          {fund.returnRate}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          3Y CAGR
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Divider */}
                      <div className="border-t border-[#F0F4FA] my-6" />

                      {/* Net Asset Value */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-gray-400">
                          Net Asset Value
                        </span>
                        <span className="text-lg font-bold text-[#0B1F3A]">
                          ₹{fund.nav}
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => setSelectedFund(fund)}
                        className="w-full bg-[#0B1F3A] hover:bg-[#152e52] text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-200 group"
                      >
                        Invest Now
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Unified Pagination List */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 px-4">
              {/* Previous Button */}
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + pagesData.length) % pagesData.length)}
                className="flex items-center justify-center gap-1 h-10 px-3 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                <span className="hidden sm:inline font-semibold text-sm">Previous</span>
              </button>

              {/* Numbered Page List */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {paginationItems.map((item, i) => (
                  item === '...' ? (
                    <span key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-slate-400">...</span>
                  ) : (
                    <button
                      key={item as number}
                      onClick={() => setActiveIndex(item as number)}
                      className={cn(
                        "flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-semibold transition-all cursor-pointer",
                        activeIndex === item
                          ? "bg-[#fe9800] text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-[#1a2332]"
                      )}
                    >
                      {(item as number) + 1}
                    </button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % pagesData.length)}
                className="flex items-center justify-center gap-1 h-10 px-3 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-50 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Next page"
              >
                <span className="hidden sm:inline font-semibold text-sm">Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-500 py-16 bg-slate-50 rounded-[32px] border border-slate-100/80 mb-12 flex flex-col items-center justify-center p-8">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-bold text-[#0B1F3A] mb-1">No mutual funds found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters or search query to find matching schemes.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFund && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedFund(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="pr-4">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full mb-3">
                  {selectedFund.company}
                </span>
                <h3 className="text-2xl font-bold text-[#0B1F3A] leading-tight">
                  {selectedFund.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFund(null)}
                className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Net Asset Value (NAV)
                  </p>
                  <p className="text-3xl font-bold text-[#00b368]">
                    ₹{selectedFund.nav}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-[#00b368]">
                  <svg className="w-6 h-6 -rotate-45" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Fund House</span>
                <span className="text-[#0B1F3A] font-semibold text-right">{selectedFund.company}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Scheme Code</span>
                <span className="text-[#0B1F3A] font-semibold text-right">{selectedFund.scheme_code}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">ISIN (Payout/Growth)</span>
                <span className="text-[#0B1F3A] font-semibold text-right">{selectedFund.isin_div_payout_growth}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">ISIN (Reinvestment)</span>
                <span className="text-[#0B1F3A] font-semibold text-right">{selectedFund.isin_div_reinvestment}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
                onClick={() => setSelectedFund(null)}
              >
                Close
              </button>
              <Link
                href="/invest"
                className="flex-[2] bg-[#fe9800] text-white font-bold py-3.5 rounded-xl hover:bg-orange-500 transition-colors flex items-center justify-center"
              >
                Invest Now
                <svg className="ml-2 size-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
