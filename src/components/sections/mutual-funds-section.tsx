"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Demo data sets
const fundsData1 = [
  { name: "Parag Parikh Flexi Cap Fund Direct (G)", cagr: "25.1%", icon: "/fund-icon.png" },
  { name: "BHARAT Bond FOF - April 2031 Direct (G)", cagr: "9.0%", icon: "/fund-icon.png" },
  { name: "ICICI Prudential Liquid Fund Direct", cagr: "7.1%", icon: "/fund-icon.png" },
  { name: "SBI ELSS Tax Saver Fund Direct (G)", cagr: "30.7%", icon: "/fund-icon.png" },
];

const fundsData2 = [
  { name: "Nippon India Small Cap Fund Direct (G)", cagr: "34.2%", icon: "/fund-icon.png" },
  { name: "Quant Small Cap Fund Direct (G)", cagr: "41.5%", icon: "/fund-icon.png" },
  { name: "HDFC Mid-Cap Opportunities Fund", cagr: "28.3%", icon: "/fund-icon.png" },
  { name: "Axis Bluechip Fund Direct (G)", cagr: "15.4%", icon: "/fund-icon.png" },
];

const fundsData3 = [
  { name: "Kotak Emerging Equity Fund Direct (G)", cagr: "27.8%", icon: "/fund-icon.png" },
  { name: "Mirae Asset Large Cap Fund Direct (G)", cagr: "16.9%", icon: "/fund-icon.png" },
  { name: "DSP Midcap Fund Direct (G)", cagr: "22.1%", icon: "/fund-icon.png" },
  { name: "Canara Robeco Bluechip Equity", cagr: "18.2%", icon: "/fund-icon.png" },
];

const pagesData = [
  [
    { title: "Best Mutual Funds", funds: fundsData1 },
    { title: "Best Equity Funds", funds: fundsData2 },
    { title: "Best Hybrid Funds", funds: fundsData3 },
  ],
  [
    { title: "Best Debt Funds", funds: fundsData3 },
    { title: "Best Index Funds", funds: fundsData1 },
    { title: "Best Tax Saver Funds", funds: fundsData2 },
  ],
  [
    { title: "Top Performers (1Y)", funds: fundsData2 },
    { title: "Low Risk Funds", funds: fundsData3 },
    { title: "High Return Funds", funds: fundsData1 },
  ],
];

export function MutualFundsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-sliding logic
  React.useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % pagesData.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="mutual-funds" className="w-full bg-white py-20 md:py-28 px-4 md:px-8 overflow-hidden">
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
                      <h3 className="text-lg font-bold text-[#1a2332]">
                        {category.title}
                      </h3>
                      <Link href="/see-all" className="text-sm font-semibold text-[#0066ff] hover:underline">
                        See All
                      </Link>
                    </div>

                    <div className="space-y-6">
                      {category.funds.map((fund, fundIdx) => (
                        <div key={fundIdx} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Placeholder for fund icon */}
                            <div className="w-10 h-10 bg-[#f8f9fa] border border-[#e5e7eb] rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                              <div className="w-6 h-3 bg-[#374151] rounded-sm"></div>
                            </div>
                            <p className="text-sm font-medium text-[#1a2332] max-w-[180px] leading-snug">
                              {fund.name}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[11px] font-semibold text-[#8792a2] uppercase tracking-wider mb-0.5">
                              3Y CAGR
                            </p>
                            <p className="text-sm font-bold text-[#00b368]">
                              {fund.cagr}
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
            0{activeIndex + 1}/03
          </span>
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % pagesData.length)}
            className="flex size-10 items-center justify-center rounded-full transition-all duration-300 bg-black text-white hover:bg-gray-800"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
