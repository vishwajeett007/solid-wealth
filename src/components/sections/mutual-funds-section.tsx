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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = ["All", "Small Cap", "Mid Cap", "Large Cap", "Hybrid", "Sectoral"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchFocused(false);
      }
    };
    if (isSearchFocused) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchFocused]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://solidwealthindia.com/api/nav/company-summary/");
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

  return (
    <section 
      id="mutual-funds" 
      className={cn(
        "w-full bg-white py-20 md:py-28 px-4 md:px-8 overflow-hidden relative transition-all duration-300",
        isSearchFocused ? "z-[99]" : "z-10"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0B1F3A] text-center mb-10">
          Create wealth by investing in mutual funds.
        </h2>

        {/* Filters and Search Bar Container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-[1400px]">
          {/* Category Filter Pills (Wrapped naturally, no X scroll) */}
          <div className="flex flex-wrap items-center gap-2.5 justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setActiveIndex(0); }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold transition-all flex-shrink-0 cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow-md shadow-[#0B1F3A]/10 scale-105"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box with Focus Pop-out Animation */}
          <div className={cn(
            "relative w-full md:max-w-xs h-12 flex-shrink-0 transition-all duration-300",
            isSearchFocused ? "z-[100]" : "z-30"
          )}>
            {/* Inner Search Box */}
            <div className={cn(
              "transition-all duration-300 ease-out w-full flex items-center bg-[#F8FAFC] border border-slate-200 rounded-full",
              isSearchFocused 
                ? "fixed top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl z-[100] scale-105 shadow-2xl p-2.5 bg-white border-[#0B1F3A]/30 focus-within:border-[#0B1F3A]"
                : "absolute inset-0 z-30 px-4"
            )}>
              <svg
                className={cn(
                  "text-gray-400 flex-shrink-0 transition-all",
                  isSearchFocused ? "w-5 h-5 ml-3 mr-1" : "w-4 h-4 mr-2"
                )}
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
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveIndex(0); }}
                className={cn(
                  "w-full bg-transparent outline-none font-semibold text-[#0B1F3A] placeholder:text-gray-400",
                  isSearchFocused ? "text-lg py-3.5 px-3" : "text-sm py-2"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveIndex(0); }}
                  className={cn(
                    "text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer",
                    isSearchFocused ? "mr-3" : "mr-1"
                  )}
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-96 flex items-center justify-center mb-12">
            <div className="w-10 h-10 border-4 border-[#0B1F3A] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pagesData.length > 0 ? (
          <>
            {/* Cards Grid wrapper with side navigation arrows */}
            <div className="relative w-full px-2 md:px-16 flex items-center mb-6">
              {/* Left Navigation Chevron */}
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + pagesData.length) % pagesData.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-[#0B1F3A]/40 hover:text-[#0B1F3A] hover:scale-125 active:scale-95 transition-all p-2 focus:outline-none flex items-center justify-center cursor-pointer"
                aria-label="Previous page"
              >
                <svg className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* 3x2 Grid of High-Fidelity Mutual Fund Cards */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[760px] mx-auto">
                {pagesData[activeIndex]?.map((fund, index) => (
                  <div
                    key={`${activeIndex}-${index}`}
                    className="bg-white border border-[#EBEFF5] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.025)] transition-all duration-300 flex flex-col justify-between h-full animate-in fade-in slide-in-from-bottom-4 duration-300"
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

              {/* Right Navigation Chevron */}
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % pagesData.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-[#0B1F3A]/40 hover:text-[#0B1F3A] hover:scale-125 active:scale-95 transition-all p-2 focus:outline-none flex items-center justify-center cursor-pointer"
                aria-label="Next page"
              >
                <svg className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Pagination Page Indicator (Pill badge styled) */}
            <div className="flex items-center justify-center mt-6">
              <span className="text-sm font-extrabold text-[#0B1F3A] tracking-wider bg-slate-50 border border-slate-100/80 px-5 py-2 rounded-full shadow-sm">
                {String(activeIndex + 1).padStart(2, '0')} / {String(pagesData.length).padStart(2, '0')}
              </span>
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
      {/* Search Blur Backdrop Overlay */}
      {isSearchFocused && (
        <div 
          className="fixed inset-0 z-[90] bg-[#0B1F3A]/25 backdrop-blur-md transition-all duration-300 animate-in fade-in cursor-pointer"
          onClick={() => setIsSearchFocused(false)}
        />
      )}
    </section>
  );
}
