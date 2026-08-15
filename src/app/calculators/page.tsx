"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Calculator, ChevronRight, TrendingUp, Wallet, ArrowRight, ShieldCheck, Target, CalendarClock, Info, PieChart, BarChart2, LineChart, Eye, Download } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// -------------------------------------------------------------
// REUSABLE COMPONENTS
// -------------------------------------------------------------

const InputSlider = ({ label, value, min, max, step = 1, onChange, prefix = "", suffix = "" }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    onChange(val);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (isNaN(val)) val = min;
    if (val < min) val = min;
    if (val > max) val = max;
    onChange(val);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="bg-[#fff9eb] px-3 py-1.5 rounded-lg flex items-center justify-between sm:justify-end border border-orange-100 sm:min-w-[120px]">
          {prefix && <span className="text-[#fe9800] font-bold text-sm mr-1">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="bg-transparent border-none outline-none font-bold text-[#fe9800] text-sm w-full text-right sm:text-right p-0 m-0 focus:ring-0"
            style={{ appearance: "textfield", MozAppearance: "textfield" }}
          />
          {suffix && <span className="text-[#fe9800] font-bold text-sm ml-1">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#fe9800] hover:accent-[#e58900] transition-all"
      />
      <div className="flex justify-between mt-1.5 text-[11px] font-medium text-gray-400">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  );
};

const ChartRenderer = ({ type, val1, val2, label1, label2, totalLabel, totalValue, subtext }: any) => {
  // Common Data Generation for Recharts
  const steps = 15;
  const chartData = Array.from({ length: steps }).map((_, i) => {
    const progress = (i + 1) / steps;
    const v1 = val1 * progress;
    const v2 = val2 * Math.pow(progress, 1.2);
    return {
      year: `Y${i + 1}`,
      [label1]: Math.round(v1),
      [label2]: Math.round(v2),
      total: Math.round(v1 + v2)
    };
  });

  const formatYAxis = (tickItem: any) => {
    if (tickItem === 0) return "0";
    if (tickItem >= 10000000) return `₹${(tickItem / 10000000).toFixed(1)}Cr`;
    if (tickItem >= 100000) return `₹${(tickItem / 100000).toFixed(1)}L`;
    if (tickItem >= 1000) return `₹${(tickItem / 1000).toFixed(1)}K`;
    return `₹${tickItem}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 text-sm min-w-[200px]">
          <p className="font-bold text-[#1a2332] mb-3 border-b border-gray-100 pb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-6 mb-2">
              <span style={{ color: entry.color }} className="font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}
              </span>
              <span className="font-bold text-[#1a2332]">₹{entry.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'bar') {
    return (
      <div className="w-full h-full flex flex-col">
        <h4 className="font-bold text-[#1a2332] mb-1">Year-wise Breakdown</h4>
        <p className="text-xs text-gray-500 mb-6">{label1} and {label2} over time</p>
        <div className="w-full h-[250px] min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Bar dataKey={label1} stackId="a" fill="#fde68a" radius={[0, 0, 4, 4]} />
              <Bar dataKey={label2} stackId="a" fill="#fe9800" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="w-full h-full flex flex-col">
        <h4 className="font-bold text-[#1a2332] mb-1">Growth Trend</h4>
        <p className="text-xs text-gray-500 mb-6">Track your wealth accumulation</p>
        <div className="w-full h-[250px] min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fe9800" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#fe9800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Area type="monotone" dataKey="total" name="Total Value" stroke="#fe9800" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // default: pie
  const total = val1 + val2;
  const p1 = total === 0 ? 50 : (val1 / total) * 100;
  const p2 = total === 0 ? 50 : (val2 / total) * 100;

  return (
    <div className="w-full flex flex-col">
      <h4 className="font-bold text-[#1a2332] mb-1">Principal vs Interest</h4>
      <p className="text-xs text-gray-500 mb-8">Breakdown of your {totalLabel.toLowerCase()}</p>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
        <div className="relative w-56 h-56 flex-shrink-0">
          <svg width="100%" height="100%" viewBox="0 0 42 42" className="-rotate-90 drop-shadow-md">
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fde68a" strokeWidth="6" strokeDasharray={`${p1} ${100 - p1}`} className="transition-all hover:opacity-80 cursor-pointer">
              <title>{`${label1}: ${p1.toFixed(1)}%`}</title>
            </circle>
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fe9800" strokeWidth="6" strokeDasharray={`${p2} ${100 - p2}`} strokeDashoffset={`-${p1}`} className="transition-all hover:opacity-80 cursor-pointer">
              <title>{`${label2}: ${p2.toFixed(1)}%`}</title>
            </circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-3xl font-black text-[#1a2332] leading-none mb-1">{p2 > p1 ? p2.toFixed(0) : p1.toFixed(0)}%</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none max-w-[80px]">{p2 > p1 ? label2 : label1}</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-600"><div className="w-2.5 h-2.5 rounded-full bg-[#fde68a]"></div>{label1}</div>
              <div className="font-bold">₹{Number(val1).toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-xs text-gray-400 font-normal ml-1">{p1.toFixed(0)}%</span></div>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#fde68a]" style={{ width: `${p1}%` }}></div>
            </div>

            <div className="flex justify-between items-center text-sm mt-4">
              <div className="flex items-center gap-2 text-gray-600"><div className="w-2.5 h-2.5 rounded-full bg-[#fe9800]"></div>{label2}</div>
              <div className="font-bold">₹{Number(val2).toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-xs text-gray-400 font-normal ml-1">{p2.toFixed(0)}%</span></div>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#fe9800]" style={{ width: `${p2}%` }}></div>
            </div>
          </div>

          <div className="bg-[#fff9eb] p-5 rounded-xl border border-orange-100 mt-6">
            <p className="text-xs text-gray-500 mb-1">{totalLabel}</p>
            <p className="text-2xl font-bold text-[#fe9800]">₹{Number(totalValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            {subtext && <p className="text-[11px] text-gray-400 mt-1">{subtext}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalculatorLayout = ({
  inputs,
  reportInputs,
  val1, val2, label1, label2, totalLabel, totalValue, subtext,
  results,
  activeCalc,
  calculatorsList,
  setActiveCalcId
}: any) => {
  const [chartType, setChartType] = useState("pie");
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const wasPreviewOpen = showPreview;
    if (!wasPreviewOpen) setShowPreview(true);

    setTimeout(() => {
      const element = document.getElementById("pdf-report-content");
      if (!element) {
        setIsDownloading(false);
        return;
      }

      const generatePdf = () => {
        if (!(window as any).htmlToImage || !(window as any).jspdf) {
          console.error("Libraries not loaded");
          setIsDownloading(false);
          return;
        }

        (window as any).htmlToImage.toPng(element, { pixelRatio: 2 })
          .then((dataUrl: string) => {
            const { jsPDF } = (window as any).jspdf;
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [794, 1123]
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, 794, 1123);
            pdf.save(`solid_wealth_calculator_report.pdf`);

            setIsDownloading(false);
            setShowPreview(false);
          })
          .catch((err: any) => {
            console.error('Error generating PDF', err);
            setIsDownloading(false);
          });
      };

      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            const isLoaded = (src.includes('html-to-image') && (window as any).htmlToImage) ||
              (src.includes('jspdf') && (window as any).jspdf);
            if (isLoaded) {
              return resolve(true);
            }
            existingScript.addEventListener('load', resolve);
            existingScript.addEventListener('error', reject);
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      Promise.all([
        !(window as any).htmlToImage ? loadScript('https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js') : Promise.resolve(),
        !(window as any).jspdf ? loadScript('https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js') : Promise.resolve()
      ]).then(() => {
        generatePdf();
      }).catch(err => {
        console.error("Failed to load PDF libraries", err);
        setIsDownloading(false);
      });

    }, 500);
  };

  const pieTotal = val1 + val2;
  const p1 = pieTotal === 0 ? 50 : (val1 / pieTotal) * 100;
  const p2 = pieTotal === 0 ? 50 : (val2 / pieTotal) * 100;

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Top Main Two Columns */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-6 print:hidden">

          {/* Calculation Details Card */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-[#1a2332] text-lg mb-8">Calculation Details</h3>

            {/* Inputs */}
            <div className="space-y-6">
              {inputs}
            </div>

            {/* Results */}
            <div className="mt-8 space-y-3">
              {results.map((r: any, i: number) => (
                <div key={i} className={cn("flex justify-between items-center rounded-xl px-4 py-3 border border-gray-100", r.highlight ? "bg-[#fff9eb] border-orange-100" : "bg-gray-50/50")}>
                  <span className={cn("text-sm font-medium", r.highlight ? "text-gray-700" : "text-gray-500")}>{r.label}</span>
                  <span className={cn("font-bold", r.highlight ? "text-[#fe9800] text-lg" : "text-[#1a2332]")}>
                    {r.isCurrency !== false ? "₹" : ""}
                    {Number(r.value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    {r.suffix ? r.suffix : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Reports Card */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-[#1a2332] text-lg mb-6">Download Reports</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowPreview(true)} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">
                <Eye size={18} /> Preview Report
              </button>
              <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#fe9800] text-white font-bold hover:bg-[#e58900] transition-colors text-sm shadow-md shadow-orange-500/20 disabled:opacity-70">
                <Download size={18} /> {isDownloading ? "Generating..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 w-full flex flex-col gap-6 print:hidden">

          {/* Chart Card */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col min-h-[450px]">
            {/* Chart Header Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex bg-gray-100/80 p-1 rounded-full overflow-x-auto w-full sm:w-auto hide-scrollbar">
                <button onClick={() => setChartType('pie')} className={cn("flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all whitespace-nowrap", chartType === 'pie' ? "bg-[#fe9800] text-white shadow" : "text-gray-500 hover:text-gray-700")}>
                  <PieChart size={16} /> <span className="hidden sm:inline">Pie Chart</span><span className="sm:hidden">Pie</span>
                </button>
                <button onClick={() => setChartType('bar')} className={cn("flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all whitespace-nowrap", chartType === 'bar' ? "bg-[#fe9800] text-white shadow" : "text-gray-500 hover:text-gray-700")}>
                  <BarChart2 size={16} /> <span className="hidden sm:inline">Bar Chart</span><span className="sm:hidden">Bar</span>
                </button>
                <button onClick={() => setChartType('line')} className={cn("flex-1 sm:flex-none justify-center px-4 sm:px-5 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-all whitespace-nowrap", chartType === 'line' ? "bg-[#fe9800] text-white shadow" : "text-gray-500 hover:text-gray-700")}>
                  <LineChart size={16} /> <span className="hidden sm:inline">Line Chart</span><span className="sm:hidden">Line</span>
                </button>
              </div>
              <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center justify-center gap-2 px-6 py-2.5 w-full sm:w-auto rounded-full bg-[#fe9800] text-white text-sm font-bold hover:bg-[#e58900] transition-colors shadow-md shadow-orange-500/20 disabled:opacity-70">
                <Download size={16} /> {isDownloading ? "Generating..." : "Download PDF"}
              </button>
            </div>

            {/* Chart Content */}
            <div className="flex-1 flex flex-col justify-center">
              <ChartRenderer
                type={chartType}
                val1={val1} val2={val2}
                label1={label1} label2={label2}
                totalLabel={totalLabel} totalValue={totalValue} subtext={subtext}
              />
            </div>
          </div>

          {/* Other Calculators Card */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm">
            <h3 className="font-bold text-[#1a2332] text-lg mb-6">Other Calculators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {calculatorsList.filter((c: any) => c.id !== activeCalc.id).map((calc: any) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalcId(calc.id)}
                  className="flex items-center justify-between px-5 py-4 rounded-xl border border-gray-100 hover:border-[#fe9800]/30 hover:bg-orange-50/30 transition-colors text-left group bg-gray-50/50"
                >
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">{calc.label}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-[#fe9800]" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-8 md:p-10 shadow-sm text-[#44475b] text-[16px] leading-relaxed mt-2 print:hidden">
        <h2 className="text-2xl font-bold text-[#1a2332] mb-6">About {activeCalc.label}s</h2>
        <p className="mb-4">
          EMI Calculators are essential financial planning tools. They help you project and estimate the returns on your home loan, car loan, or personal loan. Use the sliders to adjust loan amount, interest rate, and tenure — the charts update instantly to show your full amortization picture, year-wise breakdown, and the principal-to-interest ratio of your total repayment.
        </p>
      </div>

      {/* Preview & Print Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 print:p-0 print:bg-white print:relative print:block print:inset-auto" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[95vh] sm:h-[85vh] overflow-hidden flex flex-col print:h-auto print:overflow-visible print:w-full print:max-w-none print:shadow-none print:rounded-none" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 border-b print:hidden">
              <h3 className="font-bold text-xl">Report Preview</h3>
              <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-[#fe9800] text-white text-sm font-bold hover:bg-[#e58900] transition-colors shadow-md shadow-orange-500/20 disabled:opacity-70">
                  <Download size={16} /> {isDownloading ? "Generating..." : "Save PDF"}
                </button>
                <button onClick={() => setShowPreview(false)} className="w-10 sm:w-9 h-10 sm:h-9 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-500 font-bold border border-gray-200 sm:border-transparent">✕</button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-gray-50 print:bg-white print:overflow-visible flex justify-center">
              <div id="pdf-report-content" className="w-[794px] min-w-[794px] h-[1123px] bg-white shadow-lg print:shadow-none relative overflow-hidden flex-shrink-0">
                {/* Top Template Artwork */}
                <img src="/Printable.svg" alt="Template Header" className="w-full h-auto object-cover opacity-80" />

                {/* Overlay Data on the Template */}
                <div className="absolute top-0 left-0 w-full h-full pt-[260px] px-16 flex flex-col pb-16">
                  <h1 className="text-4xl font-black text-[#1a2332] mb-12 border-b-2 border-gray-100 pb-6">{activeCalc.label} Report</h1>

                  <div className="flex flex-col sm:flex-row gap-16 w-full">
                    {/* Left: Input Parameters */}
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Input Parameters</h3>
                      <div className="space-y-4">
                        {reportInputs && reportInputs.map((r: any, i: number) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50">
                            <span className="text-gray-600 font-medium">{r.label}</span>
                            <span className="font-bold text-[#1a2332] text-lg">
                              {r.isCurrency !== false ? "₹" : ""}
                              {Number(r.value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              {r.suffix ? ` ${r.suffix}` : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Calculation Results */}
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Calculation Results</h3>
                      <div className="space-y-4">
                        {results.map((r: any, i: number) => (
                          <div key={i} className={cn("flex justify-between items-center py-2 border-b", r.highlight ? "border-orange-200 bg-orange-50/50 -mx-3 px-3 rounded-lg" : "border-gray-50")}>
                            <span className={cn("font-medium", r.highlight ? "text-[#fe9800]" : "text-gray-600")}>{r.label}</span>
                            <span className={cn("font-bold text-lg", r.highlight ? "text-[#fe9800]" : "text-[#1a2332]")}>
                              {r.isCurrency !== false ? "₹" : ""}
                              {Number(r.value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                              {r.suffix ? ` ${r.suffix}` : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Report Summary & Visualization */}
                  <div className="mt-8 flex gap-8">
                    {/* Summary Card */}
                    <div className="flex-1 bg-[#fff9eb] rounded-2xl p-8 border border-orange-100 flex flex-col justify-center shadow-sm">
                      <p className="text-gray-500 font-medium mb-2 uppercase tracking-widest text-xs">{totalLabel}</p>
                      <p className="text-4xl font-black text-[#fe9800] mb-8">
                        ₹{Number(totalValue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </p>

                      <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center border-b border-orange-100 pb-3 gap-4">
                          <div className="flex items-center gap-2 flex-shrink-0"><div className="w-3 h-3 rounded-full bg-[#fde68a]"></div><span className="text-gray-600 font-medium whitespace-nowrap">{label1}</span></div>
                          <div className="font-bold text-lg text-[#1a2332] text-right truncate">₹{Number(val1).toLocaleString("en-IN", { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-400 ml-1">({p1.toFixed(0)}%)</span></div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-2 flex-shrink-0"><div className="w-3 h-3 rounded-full bg-[#fe9800]"></div><span className="text-gray-600 font-medium whitespace-nowrap">{label2}</span></div>
                          <div className="font-bold text-lg text-[#1a2332] text-right truncate">₹{Number(val2).toLocaleString("en-IN", { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-gray-400 ml-1">({p2.toFixed(0)}%)</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="w-[300px] bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm">
                      <div className="relative w-40 h-40">
                        <svg width="100%" height="100%" viewBox="0 0 42 42" className="-rotate-90 drop-shadow-md">
                          <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fde68a" strokeWidth="6" strokeDasharray={`${p1} ${100 - p1}`} />
                          <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fe9800" strokeWidth="6" strokeDasharray={`${p2} ${100 - p2}`} strokeDashoffset={`-${p1}`} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
                          <span className="text-2xl font-black text-[#1a2332] leading-none mb-1">{p2 > p1 ? p2.toFixed(0) : p1.toFixed(0)}%</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none max-w-[80px]">{p2 > p1 ? label2 : label1}</span>
                        </div>
                      </div>
                      <p className="text-center text-xs font-bold text-gray-400 mt-6 uppercase tracking-widest">Visual Breakdown</p>
                    </div>
                  </div>

                  <div className="mt-auto text-center text-sm text-gray-400 pt-8 border-t border-gray-100 mb-8">
                    Generated by Solid Wealth Financial Calculators. This is an estimated projection.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// INDIVIDUAL CALCULATORS
// -------------------------------------------------------------

const EMICalculator = (props: any) => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <CalculatorLayout
      {...props}
      inputs={
        <>
          <InputSlider label="Loan Amount" value={loanAmount} min={100000} max={10000000} step={10000} prefix="₹" onChange={setLoanAmount} />
          <InputSlider label="Interest Rate (p.a.)" value={rate} min={1} max={20} step={0.1} suffix="%" onChange={setRate} />
          <InputSlider label="Loan Tenure" value={years} min={1} max={30} step={1} suffix="Yr" onChange={setYears} />
        </>
      }
      reportInputs={[
        { label: "Loan Amount", value: loanAmount },
        { label: "Interest Rate (p.a.)", value: rate, suffix: "%", isCurrency: false },
        { label: "Loan Tenure", value: years, suffix: "Years", isCurrency: false }
      ]}
      results={[
        { label: "Monthly EMI", value: emi, highlight: true },
        { label: "Principal Amount", value: loanAmount },
        { label: "Total Interest", value: totalInterest },
        { label: "Total Amount", value: totalPayment }
      ]}
      val1={loanAmount} val2={totalInterest} label1="Principal" label2="Total Interest"
      totalLabel="Total Payment" totalValue={totalPayment} subtext={`over ${years} years (${n} EMIs)`}
    />
  );
};

const SIPCalculator = (props: any) => {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const i = rate / 100 / 12;
  const n = years * 12;
  const futureValue = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  const wealthGained = futureValue - invested;

  return (
    <CalculatorLayout
      {...props}
      inputs={
        <>
          <InputSlider label="Monthly Investment" value={monthly} min={500} max={1000000} step={500} prefix="₹" onChange={setMonthly} />
          <InputSlider label="Expected Return (p.a.)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
          <InputSlider label="Time Period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
        </>
      }
      reportInputs={[
        { label: "Monthly Investment", value: monthly },
        { label: "Expected Return (p.a.)", value: rate, suffix: "%", isCurrency: false },
        { label: "Time Period", value: years, suffix: "Years", isCurrency: false }
      ]}
      results={[
        { label: "Invested Amount", value: invested },
        { label: "Est. Returns", value: wealthGained },
        { label: "Total Value", value: futureValue, highlight: true }
      ]}
      val1={invested} val2={wealthGained} label1="Invested Amount" label2="Est. Returns"
      totalLabel="Total Value" totalValue={futureValue} subtext={`over ${years} years`}
    />
  );
};

const LumpsumCalculator = (props: any) => {
  const [lumpsum, setLumpsum] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const futureValue = lumpsum * Math.pow(1 + rate / 100, years);
  return (
    <CalculatorLayout {...props}
      inputs={<><InputSlider label="Total investment" value={lumpsum} min={10000} max={10000000} step={10000} prefix="₹" onChange={setLumpsum} /><InputSlider label="Expected return (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} /><InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} /></>}
      reportInputs={[
        { label: "Total Investment", value: lumpsum },
        { label: "Expected Return (p.a.)", value: rate, suffix: "%", isCurrency: false },
        { label: "Time Period", value: years, suffix: "Years", isCurrency: false }
      ]}
      results={[{ label: "Invested Amount", value: lumpsum }, { label: "Est. Returns", value: futureValue - lumpsum }, { label: "Total Value", value: futureValue, highlight: true }]}
      val1={lumpsum} val2={futureValue - lumpsum} label1="Invested" label2="Returns" totalLabel="Total Value" totalValue={futureValue} subtext={`over ${years} years`}
    />
  );
};

const SWPCalculator = (props: any) => {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(25000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const i = rate / 100 / 12; const n = years * 12;
  const finalCorpus = corpus * Math.pow(1 + i, n) - withdrawal * ((Math.pow(1 + i, n) - 1) / i);
  const totalWithdrawn = withdrawal * n;
  return (
    <CalculatorLayout {...props}
      inputs={<><InputSlider label="Total investment" value={corpus} min={100000} max={50000000} step={100000} prefix="₹" onChange={setCorpus} /><InputSlider label="Withdrawal per month" value={withdrawal} min={1000} max={500000} step={1000} prefix="₹" onChange={setWithdrawal} /><InputSlider label="Expected return (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} /><InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} /></>}
      reportInputs={[
        { label: "Total Investment", value: corpus },
        { label: "Withdrawal per month", value: withdrawal },
        { label: "Expected Return (p.a.)", value: rate, suffix: "%", isCurrency: false },
        { label: "Time Period", value: years, suffix: "Years", isCurrency: false }
      ]}
      results={[{ label: "Total Investment", value: corpus }, { label: "Total Withdrawal", value: totalWithdrawn }, { label: "Final Value", value: finalCorpus > 0 ? finalCorpus : 0, highlight: true }]}
      val1={finalCorpus > 0 ? finalCorpus : 0} val2={totalWithdrawn} label1="Final Value" label2="Total Withdrawn" totalLabel="Initial Corpus" totalValue={corpus}
    />
  );
};

const StepUpSIPCalculator = (props: any) => {
  const [initialSip, setInitialSip] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  let fv = 0; let currentSip = initialSip; let invested = 0;
  for (let m = 1; m <= years * 12; m++) { invested += currentSip; fv = (fv + currentSip) * (1 + rate / 100 / 12); if (m % 12 === 0) currentSip = currentSip * (1 + stepUp / 100); }
  return (
    <CalculatorLayout {...props}
      inputs={<><InputSlider label="Monthly investment" value={initialSip} min={500} max={100000} step={500} prefix="₹" onChange={setInitialSip} /><InputSlider label="Annual step-up" value={stepUp} min={1} max={50} step={1} suffix="%" onChange={setStepUp} /><InputSlider label="Expected return (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} /><InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} /></>}
      reportInputs={[
        { label: "Monthly Investment", value: initialSip },
        { label: "Annual Step-up", value: stepUp, suffix: "%", isCurrency: false },
        { label: "Expected Return (p.a.)", value: rate, suffix: "%", isCurrency: false },
        { label: "Time Period", value: years, suffix: "Years", isCurrency: false }
      ]}
      results={[{ label: "Invested amount", value: invested }, { label: "Est. returns", value: fv - invested }, { label: "Total value", value: fv, highlight: true }]}
      val1={invested} val2={fv - invested} label1="Invested" label2="Returns" totalLabel="Total Value" totalValue={fv}
    />
  );
};

// Generic fallback calculator
const GenericCalculator = (props: any) => {
  return <SIPCalculator {...props} />;
};


// -------------------------------------------------------------
// MAIN PAGE COMPONENT
// -------------------------------------------------------------

const calculatorsList = [
  { id: "emi", label: "EMI Calculator", icon: Wallet, Component: EMICalculator },
  { id: "sip", label: "SIP Calculator", icon: TrendingUp, Component: SIPCalculator },
  { id: "lumpsum", label: "Lumpsum Calculator", icon: Wallet, Component: LumpsumCalculator },
  { id: "swp", label: "SWP Calculator", icon: ArrowRight, Component: SWPCalculator },
  { id: "step_up_sip", label: "Step-Up SIP", icon: TrendingUp, Component: StepUpSIPCalculator },
  { id: "gratuity", label: "Gratuity", icon: Target, Component: GenericCalculator },
  { id: "inflation", label: "Inflation", icon: TrendingUp, Component: GenericCalculator },
  { id: "cagr", label: "CAGR Calculator", icon: Calculator, Component: GenericCalculator },
];

export default function CalculatorsPage() {
  const [activeCalcId, setActiveCalcId] = useState("emi");

  const activeCalc = calculatorsList.find(c => c.id === activeCalcId) || calculatorsList[0];
  const ActiveComponent = activeCalc.Component;

  return (
    <div className="min-h-screen bg-[#FFFDF4] pt-24 sm:pt-28 pb-20 print:pt-0 print:pb-0 print:bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 print:hidden">
        <h1 className="text-2xl font-bold text-[#1a2332] mb-8">
          Financial Calculators
        </h1>
        <ActiveComponent
          activeCalc={activeCalc}
          calculatorsList={calculatorsList}
          setActiveCalcId={setActiveCalcId}
        />
      </div>
    </div>
  );
}
