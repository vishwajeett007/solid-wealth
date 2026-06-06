"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Activity,
  FileText,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  BarChart4,
  PieChart as PieIcon,
  GitCommit,
  LayoutGrid
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  currency: string;
  tone: "bullish" | "bearish" | "neutral" | "educational" | "breaking";
  persona: string;
  length: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: "news" | "funds" | "commodities" | "nri_naval";
  tag: string;
  image: string;
}

interface FinanceData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  high?: number;
  low?: number;
  volume?: number;
  marketCap?: number;
  timestamp: number;
  isMock?: boolean;
}

// Minimal fallback blogs for server loading/hydration
const FALLBACK_BLOGS: Record<string, Partial<Blog>> = {
  "news-1": {
    title: "Nifty 50 Rallies 2.3% on Strong FII Inflows",
    category: "news",
    tag: "MARKET UPDATE"
  }
};

// Returns asset-specific analytics details dynamically for charts/diagrams
const getAssetAnalyticsData = (symbol: string) => {
  // Default values
  let sectors = [
    { name: "Technology & AI", value: 35, color: "#3b82f6" },
    { name: "Financial Services", value: 25, color: "#10b981" },
    { name: "Healthcare & Biotech", value: 15, color: "#f59e0b" },
    { name: "Consumer Growth", value: 15, color: "#8b5cf6" },
    { name: "Cash Reserves", value: 10, color: "#6b7280" }
  ];

  let returns = [
    { year: "2022", value: -12.4 },
    { year: "2023", value: 24.8 },
    { year: "2024", value: 18.2 },
    { year: "2025", value: 11.5 },
    { year: "2026 (Est.)", value: 15.3 }
  ];

  let metrics = [
    { label: "P/E Ratio", value: "24.5x", desc: "Equity valuation multiplier" },
    { label: "Dividend Yield", value: "1.42%", desc: "Annual cash return rate" },
    { label: "Expense Ratio", value: "0.15%", desc: "Asset management fee scale" },
    { label: "Beta (vs Nifty)", value: "1.08", desc: "Systemic risk indicator" },
    { label: "5-Year CAGR", value: "14.2%", desc: "Compound annual growth rate" }
  ];

  let diagram = {
    title: "Asset Flow & Capital Allocation",
    nodes: [
      { id: "1", label: "Inflow / Investment", desc: "Capital entered by Expats & Mutual Fund Retailers" },
      { id: "2", label: "Sector Indexing", desc: "Automated distribution across top weighted holdings" },
      { id: "3", label: "Smart Rebalancing", desc: "Quarterly alignment based on market capitalization" },
      { id: "4", label: "Dividends / Returns", desc: "Payouts routed back directly to NRE/NRO accounts" }
    ]
  };

  if (symbol === "GC=F" || symbol === "SI=F") {
    // Commodities
    sectors = [
      { name: "Central Bank Reserves", value: 45, color: "#f59e0b" },
      { name: "Jewelry Industry", value: 30, color: "#ec4899" },
      { name: "Exchange Traded Funds", value: 15, color: "#3b82f6" },
      { name: "Industrial Tech", value: 10, color: "#6b7280" }
    ];
    returns = [
      { year: "2022", value: 6.2 },
      { year: "2023", value: 14.5 },
      { year: "2024", value: 21.3 },
      { year: "2025", value: 8.8 },
      { year: "2026 (Est.)", value: 12.1 }
    ];
    metrics = [
      { label: "Beta (vs Equities)", value: "-0.15", desc: "Safe-haven inverse volatility metric" },
      { label: "Standard Deviation", value: "12.4%", desc: "Historical asset volatility spread" },
      { label: "Annual Inflation Hedge", value: "9.2%", desc: "Purchasing power compounding multiplier" },
      { label: "Liquidity Index", value: "High (A+)", desc: "Global asset redemption speed ranking" },
      { label: "5-Year CAGR", value: "11.6%", desc: "Precious metals compound return speed" }
    ];
    diagram = {
      title: "Safe Haven Liquidity Flow",
      nodes: [
        { id: "1", label: "Central Bank Reserves", desc: "Global reserves shift from fiat cash to gold assets" },
        { id: "2", label: "MCX Spot Rate Clearing", desc: "Institutional spot rate setting & contract settlement" },
        { id: "3", label: "Secured Vaulting", desc: "Physical safety deposits and allocated gold trusts" },
        { id: "4", label: "Geopolitical Hedge", desc: "Portfolio value protection during equity drops" }
      ]
    };
  } else if (symbol === "^NSEI" || symbol === "^BSESN") {
    // Indian Indices
    sectors = [
      { name: "Financial Services", value: 33.5, color: "#3b82f6" },
      { name: "Information Tech", value: 14.2, color: "#10b981" },
      { name: "Oil & Gas", value: 12.1, color: "#f59e0b" },
      { name: "Automobile & FMCG", value: 20.2, color: "#8b5cf6" },
      { name: "Infrastructure & Power", value: 20.0, color: "#6b7280" }
    ];
    returns = [
      { year: "2022", value: 4.3 },
      { year: "2023", value: 19.4 },
      { year: "2024", value: 22.8 },
      { year: "2025", value: 9.2 },
      { year: "2026 (Est.)", value: 14.1 }
    ];
    metrics = [
      { label: "P/E Ratio", value: "22.8x", desc: "Index valuation multiplier" },
      { label: "Dividend Yield", value: "1.21%", desc: "Index constituent average payout" },
      { label: "P/B Ratio", value: "3.95x", desc: "Price to Book Value index multiple" },
      { label: "India VIX", value: "13.4", desc: "National stock volatility index level" },
      { label: "5-Year CAGR", value: "13.8%", desc: "Nifty 50 compound returns over 5 years" }
    ];
    diagram = {
      title: "Index Fund Operations Flow",
      nodes: [
        { id: "1", label: "FII / DII Inflows", desc: "Foreign & Domestic institutional capital pooling" },
        { id: "2", label: "Index Weighting", desc: "Proportionate distribution to the top 50 shares" },
        { id: "3", label: "Corporate Earnings Boost", desc: "Gross domestic product growth driving stock yields" },
        { id: "4", label: "NAV Compounding", desc: "Wealth compounding via automatic dividend re-investment" }
      ]
    };
  }

  return { sectors, returns, metrics, diagram };
};

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [mounted, setMounted] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [copied, setCopied] = useState(false);

  // Tab selections
  const [activeSubTab, setActiveSubTab] = useState<"article" | "report">("article");

  // Market live state
  const [liveData, setLiveData] = useState<FinanceData | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState<"1H" | "1D" | "1W" | "1M">("1D");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load blog from localStorage
  useEffect(() => {
    if (!mounted) return;

    const stored = localStorage.getItem("solid_wealth_ai_blogs");
    if (stored) {
      try {
        const blogsList = JSON.parse(stored) as Blog[];
        const found = blogsList.find((b) => b.id === id);
        if (found) {
          if (found.image.includes("photo-1601597111158-2fceff270190")) {
            found.image = found.id === "news-3"
              ? "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop";
          }
          if (found.image.includes("photo-1507682531662-421b17d4718b")) {
            found.image = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop";
          }
          setBlog(found);
          return;
        }
      } catch (e) {
        console.error("Failed to parse blogs from localStorage", e);
      }
    }

    // Attempt to find in mock list or redirect
    if (FALLBACK_BLOGS[id]) {
      // Create partial fallback
      setBlog({
        id,
        title: FALLBACK_BLOGS[id].title || "Financial Report",
        summary: "Loading report details...",
        content: "Please wait while we retrieve this financial article.",
        symbol: "^NSEI",
        name: "NIFTY 50",
        price: 22475.85,
        changePercent: 0.71,
        currency: "INR",
        tone: "neutral",
        persona: "Advisor",
        length: "5 min read",
        createdAt: new Date().toISOString(),
        author: {
          name: "Solid Wealth Team",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
        },
        category: FALLBACK_BLOGS[id].category || "news",
        tag: FALLBACK_BLOGS[id].tag || "REPORT",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
      });
    }
  }, [mounted, id]);

  // Fetch real market quote for the associated asset on mount & on symbol load
  useEffect(() => {
    if (!blog?.symbol) return;

    const fetchQuote = async () => {
      setIsFetchingData(true);
      try {
        const res = await fetch(`/api/finance?symbol=${encodeURIComponent(blog.symbol)}`);
        if (res.ok) {
          const data = await res.json();
          setLiveData(data);
        }
      } catch (e) {
        console.error("Failed to fetch live asset data for detail page", e);
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchQuote();
  }, [blog?.symbol]);

  // Generate deterministic mock price points for the SVG chart
  const getChartDataPoints = () => {
    const currentPrice = liveData?.price ?? blog?.price ?? 100;
    const pointsCount = 15;
    const data: number[] = [];
    
    // Seed using characters of the symbol
    let seed = 0;
    const symbolStr = blog?.symbol || "AAPL";
    for (let i = 0; i < symbolStr.length; i++) {
      seed += symbolStr.charCodeAt(i);
    }

    let temp = currentPrice;
    const pctMap = {
      "1H": 0.0008,
      "1D": 0.004,
      "1W": 0.015,
      "1M": 0.05
    };
    const pct = pctMap[chartTimeframe];

    for (let i = pointsCount - 1; i >= 0; i--) {
      data.unshift(temp);
      const rand = (Math.sin(seed + i) * 0.5 + Math.cos(seed * i * 2) * 0.5);
      temp -= rand * pct * currentPrice;
    }
    return data;
  };

  const getChartCoordinates = (data: number[], width: number, height: number) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((val, idx) => {
      const x = idx * (width / (data.length - 1));
      const y = height - ((val - min) / range) * (height - 50) - 25;
      return { x, y };
    });

    if (points.length === 0) return { line: "", area: "", points: [] };

    const line = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;
    
    return { line, area, points };
  };

  const chartPoints = getChartDataPoints();
  const { line, area, points } = getChartCoordinates(chartPoints, 600, 200);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatMarkdown = (text: string) => {
    if (!text) return "";
    const html = text
      .replace(/Title:\s*(.*?)(?:\n|$)/gi, "")
      .replace(/Summary:\s*(.*?)(?:\n|$)/gi, "")
      .replace(/Content:\s*/gi, "")
      .replace(/^###\s+(.*?)$/gm, '<h3 class="text-base font-bold text-wealth-primary mt-6 mb-2 font-display">$1</h3>')
      .replace(/^##\s+(.*?)$/gm, '<h2 class="text-lg font-bold text-wealth-primary mt-8 mb-3 border-b border-wealth-border pb-1 font-display">$1</h2>')
      .replace(/^#\s+(.*?)$/gm, '<h1 class="text-xl font-extrabold text-wealth-primary mt-10 mb-4 font-display">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-wealth-primary">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-wealth-secondary">$1</em>')
      .replace(/^\s*[-*]\s+(.*?)$/gm, '<li class="ml-4 list-disc my-1 text-wealth-secondary">$1</li>')
      .split('\n\n')
      .map(p => {
        p = p.trim();
        if (!p) return "";
        if (p.startsWith('<h') || p.startsWith('<li')) return p;
        return `<p class="my-4 text-wealth-secondary leading-relaxed text-sm md:text-base">${p}</p>`;
      })
      .join('\n');
    return html;
  };

  if (!mounted || !blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wealth-bg font-sans">
        <div className="text-center space-y-4">
          <Clock className="h-10 w-10 animate-spin text-wealth-accent mx-auto" />
          <p className="text-xs text-wealth-secondary font-bold uppercase tracking-wider">Loading Financial Report...</p>
        </div>
      </div>
    );
  }

  const activePrice = liveData?.price ?? blog.price;
  const activeChangePct = liveData?.changePercent ?? blog.changePercent;
  const activeName = liveData?.name ?? blog.name;
  const isPositive = activeChangePct >= 0;

  // Retrieve matching analytics details
  const analytics = getAssetAnalyticsData(blog.symbol);

  // Offset accumulator for donut slices
  let cumulativeOffset = 0;
  const sectorsWithOffsets = analytics.sectors.map(s => {
    const offset = cumulativeOffset;
    cumulativeOffset += s.value;
    return { ...s, offset };
  });

  return (
    <div className="min-h-screen bg-wealth-bg font-sans text-wealth-primary pb-24">
      {/* Dynamic Back-link Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
        
        {/* Navigation row */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-wealth-border bg-white rounded-xl text-xs font-bold hover:bg-wealth-surface-dim transition-all text-wealth-secondary cursor-pointer shadow-wealth-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Discover Hub
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-2 border border-wealth-border bg-white rounded-xl text-xs font-bold hover:bg-wealth-surface-dim transition-all text-wealth-secondary cursor-pointer shadow-wealth-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" /> Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content column (Left/2 spans) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-md text-[10px] font-black uppercase tracking-wider">
                  {blog.tag}
                </span>
                <span className="text-[10px] text-wealth-muted font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {blog.length}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black font-display text-wealth-primary leading-tight tracking-tight">
                {blog.title}
              </h1>

              {/* Author & date card */}
              <div className="flex items-center gap-3 border-y border-wealth-border py-4 mt-2">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-wealth-border bg-wealth-surface-dim flex items-center justify-center flex-shrink-0">
                  {blog.author.avatar.startsWith("http") ? (
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Sparkles className="w-5 h-5 text-wealth-accent" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-sm block text-wealth-primary">{blog.author.name}</span>
                  <span className="text-[10px] text-wealth-muted uppercase font-bold tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Published on {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-[400px] w-full rounded-3xl overflow-hidden border border-wealth-border shadow-wealth-md">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex items-center gap-1 border-b border-wealth-border pb-px">
              <button
                onClick={() => setActiveSubTab("article")}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
                  activeSubTab === "article"
                    ? "border-[#fe9800] text-wealth-primary"
                    : "border-transparent text-wealth-secondary hover:text-wealth-primary"
                }`}
              >
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Article Content</span>
              </button>
              
              <button
                onClick={() => setActiveSubTab("report")}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
                  activeSubTab === "report"
                    ? "border-[#fe9800] text-wealth-primary"
                    : "border-transparent text-wealth-secondary hover:text-wealth-primary"
                }`}
              >
                <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-wealth-accent" /> AI Analytics Report</span>
              </button>
            </div>

            {activeSubTab === "article" ? (
              <div className="space-y-8 animate-fade-up">
                {/* Executive Summary */}
                <div className="p-5 bg-white rounded-2xl border border-wealth-border text-wealth-secondary italic text-sm md:text-base leading-relaxed shadow-wealth-sm">
                  <strong>Executive Summary:</strong> {blog.summary}
                </div>

                {/* Content Body */}
                <div
                  className="text-wealth-secondary leading-relaxed prose max-w-none prose-headings:font-display mt-8"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(blog.content) }}
                />
              </div>
            ) : (
              <div className="space-y-8 animate-fade-up">
                
                {/* 1. System Connected Flow Diagram */}
                <div className="p-6 bg-white border border-wealth-border rounded-3xl shadow-wealth-sm space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-wealth-primary flex items-center gap-1.5">
                    <GitCommit className="w-4 h-4 text-wealth-accent" /> {analytics.diagram.title}
                  </h3>
                  
                  <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 py-2">
                    {analytics.diagram.nodes.map((node, idx) => (
                      <div key={idx} className="flex-1 flex flex-col md:flex-row items-center w-full">
                        <div className="p-4 bg-wealth-surface-dim border border-wealth-border rounded-2xl text-center md:text-left space-y-1.5 flex-1 relative shadow-wealth-sm hover:border-[#fe9800] transition-all duration-300">
                          <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#fe9800] text-white text-[8px] font-black rounded-md">
                            STEP 0{idx + 1}
                          </span>
                          <h5 className="text-xs font-black text-wealth-primary mt-1">{node.label}</h5>
                          <p className="text-[10px] text-wealth-secondary leading-relaxed">{node.desc}</p>
                        </div>
                        {idx < analytics.diagram.nodes.length - 1 && (
                          <div className="my-1.5 md:my-0 md:mx-1 text-wealth-muted transform rotate-90 md:rotate-0 flex-shrink-0">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Visualizations Grid (Pie & Bar Charts) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Donut Pie Chart Card */}
                  <div className="p-6 bg-white border border-wealth-border rounded-3xl shadow-wealth-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-wealth-primary flex items-center gap-1.5 mb-2">
                        <PieIcon className="w-4 h-4 text-wealth-accent" /> Asset Holdings Allocation
                      </h4>
                      <p className="text-[10px] text-wealth-secondary leading-relaxed mb-6">Percentage weight distribution of investment assets.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                      <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0">
                        <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="50" fill="none" stroke="#f1f5f9" strokeWidth="20" />
                          {sectorsWithOffsets.map((s, idx) => {
                            const circumference = 2 * Math.PI * 50;
                            const strokeOffset = circumference - (s.offset / 100) * circumference;
                            return (
                              <circle
                                key={idx}
                                cx="80"
                                cy="80"
                                r="50"
                                fill="none"
                                stroke={s.color}
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeOffset}
                                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                style={{ strokeDasharray: `${(s.value / 100) * circumference} ${circumference}` }}
                              />
                            );
                          })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-black text-wealth-primary leading-none">100%</span>
                          <span className="text-[8px] font-bold text-wealth-secondary uppercase tracking-wider">Allocated</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        {analytics.sectors.map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1.5 text-wealth-secondary">
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                              {s.name}
                            </span>
                            <span className="font-mono text-wealth-primary">{s.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Bar Graph */}
                  <div className="p-6 bg-white border border-wealth-border rounded-3xl shadow-wealth-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-wealth-primary flex items-center gap-1.5 mb-2">
                        <BarChart4 className="w-4 h-4 text-wealth-accent" /> Annual Returns Performance
                      </h4>
                      <p className="text-[10px] text-wealth-secondary leading-relaxed mb-6">Historical year-on-year compound rate of growth.</p>
                    </div>

                    <div className="w-full flex justify-center items-end h-40">
                      <svg viewBox="0 0 300 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        {/* Horizontal base axis line at y=100 */}
                        <line x1="10" y1="100" x2="290" y2="100" stroke="#e2e8f0" strokeDasharray="3 3" />
                        
                        {analytics.returns.map((ret, idx) => {
                          const x = idx * 56 + 24;
                          // Scale return height (max value in returns is ~25, so divide by 30 and scale to 70px)
                          const heightVal = (ret.value / 30) * 70;
                          const y = heightVal >= 0 ? 100 - heightVal : 100;
                          const barHeight = Math.abs(heightVal) || 2;
                          const isPos = ret.value >= 0;

                          return (
                            <g key={idx}>
                              <rect
                                x={x}
                                y={y}
                                width="28"
                                height={barHeight}
                                fill={isPos ? "#10b981" : "#ef4444"}
                                rx="4"
                                className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                              />
                              <text
                                x={x + 14}
                                y={isPos ? y - 6 : y + barHeight + 12}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="bold"
                                className="font-sans fill-slate-700"
                              >
                                {isPos ? "+" : ""}{ret.value}%
                              </text>
                              <text
                                x={x + 14}
                                y="152"
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="bold"
                                className="font-sans fill-slate-400"
                              >
                                {ret.year}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3. Detailed Indicators Table */}
                <div className="p-6 bg-white border border-wealth-border rounded-3xl shadow-wealth-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-wealth-primary flex items-center gap-1.5">
                      <LayoutGrid className="w-4 h-4 text-wealth-accent" /> Financial Indicators Breakdown
                    </h4>
                    <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                      Verified Metrics
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-wealth-surface-dim text-wealth-muted text-[10px] uppercase font-black tracking-wider border-b border-wealth-border">
                          <th className="px-6 py-3">Metric Key</th>
                          <th className="px-6 py-3">Asset Value</th>
                          <th className="px-6 py-3">Technical Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {analytics.metrics.map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-wealth-primary">{m.label}</td>
                            <td className="px-6 py-4 font-mono text-[#fe9800] font-black text-sm">{m.value}</td>
                            <td className="px-6 py-4 text-wealth-secondary leading-relaxed">{m.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar column: Stock market widgets & Charts */}
          <div className="space-y-6">
            
            {/* Live rate card */}
            <div className="p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-wealth-dark-border rounded-3xl text-white shadow-wealth-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wealth-accent/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest block mb-1">
                    Live Feed
                  </span>
                  <h3 className="text-lg font-black font-display leading-tight">{activeName}</h3>
                  <span className="font-mono text-xs text-gray-400">{blog.symbol}</span>
                </div>
                
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-extrabold tracking-wider uppercase border border-white/5`}>
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                  Active
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black font-display font-mono">
                  {blog.currency === "USD" ? "$" : (blog.currency === "Percent" ? "" : "₹")}
                  {activePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {blog.currency === "Percent" ? "%" : ""}
                </span>
                <span className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${isPositive ? "bg-[#e6fcf5] text-[#0ca678]" : "bg-[#fff5f5] text-[#fa5252]"}`}>
                  {isPositive ? "+" : ""}{activeChangePct.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Chart Widget Card */}
            {blog.symbol && (
              <div className="bg-white border border-wealth-border rounded-3xl shadow-wealth-md p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h4 className="text-xs font-black uppercase tracking-wider text-wealth-primary flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-wealth-accent" /> Asset Trend Chart
                  </h4>
                  
                  <div className="flex items-center gap-0.5 bg-wealth-surface-dim p-0.5 rounded-lg border border-slate-200">
                    {(["1H", "1D", "1W", "1M"] as const).map(time => (
                      <button
                        key={time}
                        onClick={() => setChartTimeframe(time)}
                        className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                          chartTimeframe === time
                            ? "bg-[#fe9800] text-white shadow-sm"
                            : "text-wealth-secondary hover:text-wealth-primary"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Live Line Chart */}
                <div className="w-full h-44 relative">
                  <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sidebarChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fe9800" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#fe9800" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grids */}
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#f8fafc" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#f8fafc" strokeWidth="1" />
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#f8fafc" strokeWidth="1" />

                    {/* Path area */}
                    {area && (
                      <path d={area} fill="url(#sidebarChartFill)" />
                    )}

                    {/* Path line */}
                    {line && (
                      <path
                        d={line}
                        fill="none"
                        stroke="#fe9800"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Endpoint dot */}
                    {points.length > 0 && (
                      <circle
                        cx={points[points.length - 1].x}
                        cy={points[points.length - 1].y}
                        r="4.5"
                        fill="#fe9800"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                    )}
                  </svg>
                </div>
                
                <div className="flex justify-between text-[8px] font-bold text-wealth-muted tracking-wider uppercase pt-3 border-t border-slate-100 mt-2">
                  <span>{chartTimeframe === "1H" ? "60 Min Ago" : (chartTimeframe === "1D" ? "Opening" : (chartTimeframe === "1W" ? "7d Ago" : "30d Ago"))}</span>
                  <span>{chartTimeframe === "1H" ? "Current Rate" : "Today"}</span>
                </div>
              </div>
            )}

            {/* Extra Stats Grid */}
            {blog.symbol && (
              <div className="bg-white border border-wealth-border rounded-3xl shadow-wealth-md p-6 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-wealth-primary border-b border-slate-100 pb-2">
                  Market Details
                </h4>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">Session High</span>
                    <span className="font-mono font-bold text-wealth-primary">
                      {blog.currency === "USD" ? "$" : (blog.currency === "Percent" ? "" : "₹")}
                      {(activePrice * 1.012).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">Session Low</span>
                    <span className="font-mono font-bold text-wealth-primary">
                      {blog.currency === "USD" ? "$" : (blog.currency === "Percent" ? "" : "₹")}
                      {(activePrice * 0.988).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">Volume (Est.)</span>
                    <span className="font-mono font-bold text-[#0c85e6]">
                      {blog.symbol === "GC=F" || blog.symbol === "SI=F" ? "12,400 lots" : "4.82M shares"}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">Market Standing</span>
                    <span className="font-bold text-[#0ca678] uppercase text-[10px]">
                      {activeChangePct >= 0 ? "Strong Buy" : "Neutral Hold"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
