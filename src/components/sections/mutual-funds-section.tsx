"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon, X } from "lucide-react";
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

export function MutualFundsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pagesData, setPagesData] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://solidwealthindia.com/api/nav/company-summary/");
        const data: ApiResponse = await response.json();

        const formattedPages = [];
        let currentPage: any[] = [];

        data.results.forEach((company) => {
          if (company.nav && company.nav.length > 0) {
            currentPage.push({
              title: company.company_name,
              funds: company.nav.slice(0, 4).map((fund) => ({
                name: fund.scheme_name,
                nav: fund.net_asset_value,
                company: company.company_name,
                nav_date: company.nav_date,
                scheme_code: fund.scheme_code,
                isin_div_payout_growth: fund.isin_div_payout_growth,
                isin_div_reinvestment: fund.isin_div_reinvestment,
                raw_line: fund.raw_line,
              })),
            });

            if (currentPage.length === 3) {
              formattedPages.push(currentPage);
              currentPage = [];
            }
          }
        });

        // Push the last page if it has items
        if (currentPage.length > 0) {
          formattedPages.push(currentPage);
        }

        setPagesData(formattedPages);
      } catch (error) {
        console.error("Failed to fetch mutual funds:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Auto-sliding logic
  useEffect(() => {
    if (isHovered || pagesData.length === 0 || selectedFund !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % pagesData.length);
    }, 3500); // Change slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, pagesData.length, selectedFund]);

  return (
    <section id="mutual-funds" className="w-full bg-white py-20 md:py-28 px-4 md:px-8 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1a2332] text-center mb-8">
          Create wealth by investing in mutual funds.
        </h2>

        <Link
          href="/invest"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm md:text-base font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors mb-16"
        >
          Start Investing <ArrowRightIcon className="ml-2 size-4" />
        </Link>

        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center mb-12">
            <div className="w-8 h-8 border-4 border-[#fe9800] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pagesData.length > 0 ? (
          <>
            {/* Carousel Container */}
            <div
              className="w-full overflow-hidden mb-12 py-4 -my-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {pagesData.map((page, pageIdx) => (
                  <div key={pageIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                    {page.map((category, idx) => (
                      <div
                        key={`${pageIdx}-${idx}`}
                        className="bg-white border border-[#f0f0f0] rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-[#1a2332] truncate pr-2">
                            {category.title}
                          </h3>
                          {/* <Link href="/see-all" className="text-sm font-semibold text-[#fe9800] hover:underline whitespace-nowrap">
                            See All
                          </Link> */}
                        </div>

                        <div className="space-y-2">
                          {category.funds.map((fund: any, fundIdx: number) => (
                            <div
                              key={fundIdx}
                              className="flex items-center justify-between gap-4 p-3 -mx-3 rounded-xl cursor-pointer hover:bg-slate-50 hover:shadow-sm transition-all duration-200 border border-transparent hover:border-slate-100 group"
                              onClick={() => setSelectedFund(fund)}
                            >
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                {/* Placeholder for fund icon */}
                                <div className="w-10 h-10 mt-0.5 bg-[#f8f9fa] border border-[#e5e7eb] rounded overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:border-slate-200 transition-colors">
                                  <div className="w-6 h-3 bg-[#374151] rounded-sm group-hover:bg-[#fe9800] transition-colors"></div>
                                </div>
                                <p className="text-sm font-medium text-[#1a2332] leading-snug line-clamp-2" title={fund.name}>
                                  {fund.name}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0 pl-2">
                                <p className="text-[11px] font-semibold text-[#8792a2] uppercase tracking-wider mb-0.5">
                                  NAV
                                </p>
                                <p className="text-sm font-bold text-[#00b368]">
                                  ₹{parseFloat(fund.nav).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setActiveIndex((activeIndex - 1 + pagesData.length) % pagesData.length)}
                className="flex size-10 items-center justify-center rounded-full transition-all duration-300 bg-gray-200 text-[#1a2332] hover:bg-gray-300"
              >
                <ArrowLeft className="size-5" />
              </button>
              <span className="text-base font-bold text-[#1a2332]">
                {String(activeIndex + 1).padStart(2, '0')}/{String(pagesData.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % pagesData.length)}
                className="flex size-10 items-center justify-center rounded-full transition-all duration-300 bg-black text-white hover:bg-gray-800"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-500 py-12">
            No mutual funds data available.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFund && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
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
                <h3 className="text-2xl font-bold text-[#1a2332] leading-tight">
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
                    ₹{parseFloat(selectedFund.nav).toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-[#00b368]">
                  <ArrowRightIcon className="size-6 -rotate-45" />
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Fund House</span>
                <span className="text-gray-900 font-semibold text-right">{selectedFund.company}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">NAV Date</span>
                <span className="text-gray-900 font-semibold text-right">{selectedFund.nav_date}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Scheme Code</span>
                <span className="text-gray-900 font-semibold text-right">{selectedFund.scheme_code}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">ISIN (Payout/Growth)</span>
                <span className="text-gray-900 font-semibold text-right">{selectedFund.isin_div_payout_growth}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">ISIN (Reinvestment)</span>
                <span className="text-gray-900 font-semibold text-right">{selectedFund.isin_div_reinvestment}</span>
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
                Invest Now <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
