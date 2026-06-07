"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles,
  Search,
  BookOpen,
  Clock,
  ArrowLeft,
  Check,
  Loader2,
  X,
  RefreshCw,
  Edit2,
  FileText,
  AlertTriangle,
  ChevronRight,
  Trash2,
  TrendingUp,
  Layers,
  Anchor,
  Activity,
  PenSquare
} from "lucide-react";

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

const PREDEFINED_ASSETS = [
  { symbol: "AAPL", name: "Apple Inc.", type: "Stock" },
  { symbol: "TSLA", name: "Tesla, Inc.", type: "Stock" },
  { symbol: "MSFT", name: "Microsoft Corp.", type: "Stock" },
  { symbol: "NVDA", name: "NVIDIA Corp.", type: "Stock" },
  { symbol: "BTC-USD", name: "Bitcoin USD", type: "Crypto" },
  { symbol: "ETH-USD", name: "Ethereum USD", type: "Crypto" },
  { symbol: "^NSEI", name: "NIFTY 50", type: "Index" },
  { symbol: "^BSESN", name: "SENSEX", type: "Index" },
  { symbol: "GC=F", name: "Gold Futures", type: "Commodity" },
  { symbol: "SI=F", name: "Silver Futures", type: "Commodity" },
];

const INITIAL_BLOGS: Blog[] = [
  // NEWS TAB
  {
    id: "news-1",
    title: "Nifty 50 Rallies 2.3% on Strong FII Inflows and Global Risk-On Sentiment",
    summary: "Indian equity markets extended their winning streak as foreign institutional investors poured ₹8,450 crore into domestic stocks this week.",
    content: "## Nifty 50 Market Performance\n\nIndian equity markets extended their winning streak as foreign institutional investors poured ₹8,450 crore into domestic stocks this week. The Nifty 50 benchmark index registered robust gains driven by strong capital inflows, global risk-on sentiments, and encouraging domestic macro data.\n\n## FII Activity and Liquidity\n\nForeign Portfolio Investors (FPIs) turned net buyers in major large-cap segments. This structural liquidity support helped lift banking, IT, and auto stocks. Technical indicators show the Nifty trading above its key 50-day moving average, signaling potential continuation of the bullish momentum in the short term.",
    symbol: "^NSEI",
    name: "NIFTY 50",
    price: 22475.85,
    changePercent: 2.3,
    currency: "INR",
    tone: "bullish",
    persona: "Priya Sharma (Senior Strategist)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    },
    category: "news",
    tag: "MARKET UPDATE",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "news-2",
    title: "RBI Maintains Status Quo on Rates: What Investors Need to Know",
    summary: "The Monetary Policy Committee voted unanimously to keep the repo rate unchanged at 6.50%, signaling continued vigilance on inflation.",
    content: "## Repo Rate Resolution\n\nThe Monetary Policy Committee (MPC) of the Reserve Bank of India (RBI) voted unanimously to keep the policy repo rate unchanged at 6.50% in its latest review. The stance remains focused on withdrawal of accommodation to ensure inflation progressively aligns with the target while supporting growth.\n\n## Implications for Borrowers and Depositors\n\nHome loan interest rates are likely to remain stable in the immediate future. Fixed deposit rates have peaked, offering investors a final window to lock in high yields. Wealth strategists advise a neutral duration strategy for bond portfolios under this policy regime.",
    symbol: "^NSEI",
    name: "Reserve Bank of India",
    price: 6.50,
    changePercent: 0.0,
    currency: "Percent",
    tone: "neutral",
    persona: "Aditya Kumar (Policy Lead)",
    length: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    author: {
      name: "Aditya Kumar",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    category: "news",
    tag: "POLICY",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "news-3",
    title: "Fed Signals Potential Rate Cut in Q3 Amid Cooling Inflation Data",
    summary: "US Federal Reserve officials hint at monetary easing as core PCE inflation trends downward for the third consecutive month.",
    content: "## Fed Policy Easing\n\nMacroeconomic indicators suggest the Federal Reserve is preparing to adjust its monetary policy stance. The core Personal Consumption Expenditures (PCE) price index, the Fed's preferred inflation metric, rose at a slower pace, strengthening the case for a rate reduction in the third quarter.\n\n## Global Market Consequences\n\nA rate cut by the Federal Reserve is expected to weaken the US dollar, potentially triggering a strong capital reallocation towards high-growth emerging market equities. Sectors like technology, metals, and real estate are expected to lead the breakout.",
    symbol: "MSFT",
    name: "US Federal Reserve",
    price: 415.22,
    changePercent: 0.95,
    currency: "USD",
    tone: "bullish",
    persona: "Michael Roberts (Macro Analyst)",
    length: "4 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    author: {
      name: "Michael Roberts",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    },
    category: "news",
    tag: "GLOBAL",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "news-4",
    title: "IT Sector Q4 Results: TCS, Infosys Beat Estimates on AI Deal Momentum",
    summary: "India's leading IT services providers reported strong earnings growth driven by enterprise AI transformation projects.",
    content: "## Q4 Enterprise Revenue\n\nIndia's top-tier IT services exporters delivered solid fourth-quarter results, surpassing consensus estimates. The growth was spearheaded by large-scale enterprise transformation projects and cloud infrastructure migration deals, highlighting robust IT spending globally.\n\n## Artificial Intelligence Integration\n\nBoth TCS and Infosys reported significant pipeline expansion in active AI deals. Enterprises are prioritizing generative AI integrations and automation platforms to optimize operations. This trend provides a positive growth outlook for domestic IT stocks heading into FY27.",
    symbol: "NVDA",
    name: "TCS & Infosys",
    price: 894.6,
    changePercent: 4.02,
    currency: "INR",
    tone: "bullish",
    persona: "Sneha Desai (Equity Researcher)",
    length: "7 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    author: {
      name: "Sneha Desai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    category: "news",
    tag: "EARNINGS",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "news-5",
    title: "HDFC Bank, ICICI Bank Report Robust Loan Growth Despite Regulatory Scrutiny",
    summary: "Private sector lenders maintain strong credit expansion with improved asset quality metrics across corporate and retail segments.",
    content: "## Banking Credit Performance\n\nLeading private sector commercial banks continue to record double-digit loan growth despite strict regulatory oversight on unsecured retail lending. Asset quality remains strong, with non-performing asset (NPA) ratios maintaining multi-year low levels.\n\n## Margin Outlook\n\nWhile net interest margins (NIMs) experienced minor compression due to rising deposit acquisition costs, banks compensated through robust fee income and operating efficiencies. Wealth managers remain constructive on large private banking stocks.",
    symbol: "^NSEI",
    name: "HDFC & ICICI",
    price: 22475.85,
    changePercent: -0.42,
    currency: "INR",
    tone: "neutral",
    persona: "Rajesh Menon (Banking Editor)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    author: {
      name: "Rajesh Menon",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    category: "news",
    tag: "BANKING",
    image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=1200&auto=format&fit=crop"
  },

  // MUTUAL FUNDS TAB
  {
    id: "fund-1",
    title: "ICICI Pru Bluechip Fund Delivers Consistent Alpha Over 10-Year Horizon",
    summary: "Analysis of India's top large-cap mutual fund shows disciplined portfolio construction and superior risk-adjusted returns.",
    content: "## ICICI Prudential Bluechip Analysis\n\nThis scheme has delivered superior risk-adjusted returns and consistent alpha over a 10-year period. The fund focuses on market-leading enterprises with strong balance sheets, high operating margins, and resilient competitive moats.\n\n## Portfolio Strategy\n\nThe fund manager maintains a diversified exposure across financial services, technology, auto, and healthcare sectors. It is an ideal wealth-building asset for investors seeking moderate risk and long-term equity growth.",
    symbol: "^NSEI",
    name: "ICICI Pru Bluechip",
    price: 22475.85,
    changePercent: 1.25,
    currency: "INR",
    tone: "bullish",
    persona: "Kavita Iyer (Wealth Coach)",
    length: "8 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    author: {
      name: "Kavita Iyer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    category: "funds",
    tag: "LARGE CAP",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fund-2",
    title: "Mid-Cap Funds See Record Inflows: Is It Time to Book Profits?",
    summary: "Mid-cap schemes attracted ₹12,000 crore in May 2026. We examine valuation metrics and concentration risks.",
    content: "## Mid-Cap Valuation Warning\n\nValuations in the mid-cap space are trading significantly above historic averages. Retail inflows into mid-cap mutual funds hit record heights, sparking concerns of overvaluation in multiple non-earning thematic segments.\n\n## Defensive Recommendations\n\nWhile corporate earnings remain solid, we recommend investors review their asset allocations. Consider booking partial gains and shifting capital to large-cap equity index funds or balanced advantage schemes to manage volatility risk.",
    symbol: "^NSEI",
    name: "Mid-Cap Segment",
    price: 22475.85,
    changePercent: -0.65,
    currency: "INR",
    tone: "bearish",
    persona: "Arjun Nair (Fund Manager)",
    length: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    author: {
      name: "Arjun Nair",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    category: "funds",
    tag: "MID CAP",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fund-3",
    title: "Balanced Advantage Funds: The All-Weather Portfolio Solution for 2026",
    summary: "How dynamic asset allocation funds are protecting downside while capturing equity upside in volatile markets.",
    content: "## Balanced Advantage Allocation\n\nBalanced Advantage Funds (BAFs) dynamically manage equity and debt allocations based on market valuation metrics like P/E and P/B ratios. In a highly volatile equity landscape, BAFs serve as an all-weather portfolio solution.\n\n## Automated Risk Management\n\nBy systematically buying equities during market corrections and selling them during valuations surges, these funds protect downside capital while ensuring participation in primary market upswings.",
    symbol: "^NSEI",
    name: "BAF Segment",
    price: 22475.85,
    changePercent: 0.85,
    currency: "INR",
    tone: "bullish",
    persona: "Pooja Reddy (Asset Allocator)",
    length: "7 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
    author: {
      name: "Pooja Reddy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    category: "funds",
    tag: "HYBRID",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fund-4",
    title: "Corporate Bond Funds vs Banking PSU Debt: Which Is Right for You?",
    summary: "Comparative analysis of credit risk, yield profiles, and tax efficiency across debt mutual fund categories.",
    content: "## Debt Yield Optimization\n\nCorporate bond funds and banking & PSU debt schemes represent reliable fixed-income avenues. Under high interest rates, corporate credit portfolios offer attractive yield-to-maturity (YTM) spreads.\n\n## Asset Selection Guidelines\n\nBanking and PSU funds prioritize high credit quality by investing in public sector undertakings. Corporate bond funds carry slightly higher spreads, but provide higher returns for investors with medium-term horizons.",
    symbol: "^NSEI",
    name: "Debt Markets",
    price: 7.25,
    changePercent: 0.05,
    currency: "Percent",
    tone: "neutral",
    persona: "Vikram Singh (Debt Analyst)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 73).toISOString(),
    author: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    category: "funds",
    tag: "DEBT",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "fund-5",
    title: "Nifty 50 vs Nifty Next 50 Index Funds: A Performance Deep Dive",
    summary: "Passive investing strategies compared: should you bet on India's largest companies or the next generation of leaders?",
    content: "## Passive Index Comparison\n\nIndex funds represent an efficient route to capture Indian corporate growth. While Nifty 50 trackers expose capital to established heavyweights, Nifty Next 50 funds invest in the next tier of potential blue chips.\n\n## Return Characteristics\n\nThe Next 50 index displays higher volatility but has historically outperformed during structural market rallies. Portfolio managers recommend blending both strategies to match risk-reward profiles.",
    symbol: "^NSEI",
    name: "Index Funds",
    price: 22475.85,
    changePercent: 0.71,
    currency: "INR",
    tone: "neutral",
    persona: "Meera Joshi (Passive Investor)",
    length: "8 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 97).toISOString(),
    author: {
      name: "Meera Joshi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    category: "funds",
    tag: "INDEX",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
  },

  // COMMODITIES TAB
  {
    id: "commodities-1",
    title: "Gold Hits ₹78,500/10g: Central Bank Buying Drives Historic Rally",
    summary: "Unprecedented demand from emerging market central banks pushes gold to all-time highs in rupee terms despite dollar strength.",
    content: "## Gold Safe Haven Rally\n\nPhysical gold prices surged to record-breaking highs, crossing key resistance benchmarks. The primary driver is persistent central bank accumulation globally as institutions hedge foreign exchange assets.\n\n## Structural Inflation Hedge\n\nWith geopolitical risks remaining elevated, wealth managers continue to advise maintaining a gold allocation of 5-10% in long-term portfolios to preserve purchasing power.",
    symbol: "GC=F",
    name: "Gold MCX",
    price: 78240,
    changePercent: 0.36,
    currency: "INR",
    tone: "bullish",
    persona: "Sanjay Gupta (Commodity Specialist)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    author: {
      name: "Sanjay Gupta",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop"
    },
    category: "commodities",
    tag: "GOLD",
    image: "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "commodities-2",
    title: "Silver's Industrial Demand Surge: The Green Energy Connection",
    summary: "Solar panel manufacturing and EV adoption create structural headwinds for silver, with India easing consumption growth.",
    content: "## Silver Industrial Utility\n\nSilver is increasingly functioning as an industrial metal due to solar energy and electric vehicle manufacturing requirements. Photovoltaic solar installations demand massive silver paste quantities.\n\n## Price Outlook\n\nWith global inventories declining, silver displays significant upside potential. It remains highly sensitive to economic activity and industrial capex, making it a higher-beta play than gold.",
    symbol: "SI=F",
    name: "Silver MCX",
    price: 94150,
    changePercent: 1.17,
    currency: "INR",
    tone: "bullish",
    persona: "Neha Patil (Renewables Editor)",
    length: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    author: {
      name: "Neha Patil",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    category: "commodities",
    tag: "SILVER",
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "commodities-3",
    title: "Brent Crude Stabilizes at $82 as OPEC+ Extends Production Cuts",
    summary: "Energy markets find equilibrium as major producers maintain supply discipline amid uncertain global demand outlook.",
    content: "## Brent Crude Outlook\n\nGlobal oil benchmarks consolidated near $82 per barrel. OPEC+ members extended their voluntary crude output cuts, offset by rising shale supply from non-OPEC producers.\n\n## Inflationary Impacts\n\nStabilizing energy rates helps domestic policy makers control wholesale inflation. This consolidation is positive for major oil-importing economies like India, lowering foreign exchange pressures.",
    symbol: "GC=F",
    name: "Brent Crude",
    price: 82.40,
    changePercent: -0.15,
    currency: "USD",
    tone: "neutral",
    persona: "Ram Prasad (Energy Strategist)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    author: {
      name: "Ram Prasad",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
    },
    category: "commodities",
    tag: "CRUDE OIL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "commodities-4",
    title: "Copper at Multi-Year Highs: Infrastructure Boom Meets Supply Constraints",
    summary: "India's capex cycle and global electrification trends drive copper prices higher as new mine supply remains limited.",
    content: "## Copper Supply Deficit\n\nCopper has broken out to multi-year highs. The green energy transition—specifically EV motors, battery wiring, and grid infrastructure upgrades—requires immense copper volumes.\n\n## Mine Closures\n\nSupply restrictions at major Latin American mines have deepened global metal deficits. For commodity portfolios, industrial base metals provide robust cyclical growth exposure.",
    symbol: "SI=F",
    name: "Copper Futures",
    price: 4.54,
    changePercent: 1.85,
    currency: "USD",
    tone: "bullish",
    persona: "Deepak Mishra (Metal Analyst)",
    length: "7 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString(),
    author: {
      name: "Deepak Mishra",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop"
    },
    category: "commodities",
    tag: "BASE METALS",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "commodities-5",
    title: "Monsoon Forecast Update: Implications for Agri Commodity Prices",
    summary: "IMD predicts normal to above-normal rainfall. What it means for wheat, rice, and sugar futures traders.",
    content: "## Agricultural Monsoon Impact\n\nThe India Meteorological Department (IMD) reiterated expectations for a normal to above-normal monsoon season. This weather outlook is crucial for kharif sowing cycles.\n\n## Inflation Control\n\nStrong rainfall will enhance agricultural output, softening food inflation pressures. Trading desks expect structural corrections in sugar, wheat, and edible oil prices over the next quarter.",
    symbol: "GC=F",
    name: "Agri Commodities",
    price: 180.50,
    changePercent: -1.45,
    currency: "INR",
    tone: "bearish",
    persona: "Anita Sharma (Agriculturalist)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 98).toISOString(),
    author: {
      name: "Anita Sharma",
      avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd107fd?q=80&w=200&auto=format&fit=crop"
    },
    category: "commodities",
    tag: "AGRICULTURE",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
  },

  // NRI & NAVAL TAB
  {
    id: "nri-1",
    title: "Navigating NRI Taxation: Top Financial Planning Strategies for FY27",
    summary: "Essential tax-saving avenues, NRE/NRO account distributions, and double taxation avoidance agreement (DTAA) benefits for Indian expats.",
    content: "## NRI Tax Planning Guidance\n\nNon-Resident Indians (NRIs) face a distinct tax framework in India. Correctly routing capital between NRE (Non-Resident External) and NRO (Non-Resident Ordinary) accounts is vital to optimize tax liabilities.\n\n## DTAA Benefits\n\nExpats can leverage the Double Taxation Avoidance Agreement (DTAA) between India and their country of residence. This avoids double taxation on global income source assets like interest earnings, rental yields, and equity capital gains.",
    symbol: "^NSEI",
    name: "NRI Wealth",
    price: 22475.85,
    changePercent: 0.85,
    currency: "INR",
    tone: "neutral",
    persona: "Amit Verma (NRI Tax Consultant)",
    length: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: {
      name: "Amit Verma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    category: "nri_naval",
    tag: "NRI TAX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "nri-2",
    title: "FEMA Rules for NRIs: NRE vs NRO Accounts Demystified",
    summary: "Understanding the crucial differences in repatriability, taxability, and deposit regulations under Foreign Exchange Management Act guidelines.",
    content: "## FEMA Regulatory Requirements\n\nUnder the Foreign Exchange Management Act (FEMA), NRIs must follow strict account rules. NRE accounts are repatriable (funds can be moved abroad freely) and interest earned is fully tax-free in India.\n\n## NRO Specifications\n\nNRO accounts manage income earned inside India. They are subject to local withholding tax, and repatriations are capped at $1 million USD per financial year, requiring certified tax compliance documents.",
    symbol: "^NSEI",
    name: "FEMA Regulations",
    price: 22475.85,
    changePercent: 0.0,
    currency: "INR",
    tone: "educational",
    persona: "Sandeep Mehta (Advisory Lead)",
    length: "5 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(),
    author: {
      name: "Sandeep Mehta",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    },
    category: "nri_naval",
    tag: "COMPLIANCE",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "nri-3",
    title: "Global Real Estate Investments: Best Regions for Indian Expats",
    summary: "High-yield real estate corridors in Dubai, Singapore, and London compared for rental yields and capital appreciation.",
    content: "## Overseas Property Markets\n\nGlobal real estate remains a favored asset class for NRI wealth. Top corridors like Dubai, Singapore, and London offer distinct advantages in rental yield stability and long-term capital appreciation.\n\n## Comparative Yields\n\nDubai yields average 6-8%, supported by tax-friendly laws. London provides strong currency diversification and capital preservation, while Singapore offers a highly regulated, high-security property landscape.",
    symbol: "^NSEI",
    name: "Global Property",
    price: 22475.85,
    changePercent: 1.45,
    currency: "INR",
    tone: "bullish",
    persona: "Sarah Jenkins (Real Estate Desk)",
    length: "8 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 51).toISOString(),
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    category: "nri_naval",
    tag: "REAL ESTATE",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "nri-4",
    title: "Naval Personnel Pension & Investment Schemes: Safe Wealth Growth Channels",
    summary: "Tailored wealth advisory for navy and maritime defense officers to maximize benefits from defense provident funds and secure portfolios.",
    content: "## Navy Pension Investment Planning\n\nIndian naval officers and maritime defense personnel receive specific pension allowances. Utilizing these distributions requires customized risk management to protect post-retirement capital.\n\n## Recommended Channels\n\nWe advise naval officers to blend safe avenues like the Defense Services Officers Provident Fund (DSOP) with debt mutual funds and diversified corporate equities to beat long-term inflation.",
    symbol: "^NSEI",
    name: "Naval Advisory",
    price: 22475.85,
    changePercent: 0.35,
    currency: "INR",
    tone: "educational",
    persona: "Cdr. R. K. Singh (Retd. Advisor)",
    length: "6 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 75).toISOString(),
    author: {
      name: "Cdr. R. K. Singh",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
    },
    category: "nri_naval",
    tag: "NAVAL DEPT",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "nri-5",
    title: "Investing in Indian Equities: Mutual Funds vs Direct PMS for NRIs",
    summary: "Comparing passive mutual fund paths with high-ticket Portfolio Management Services (PMS) in terms of costs, compliance, and returns.",
    content: "## PMS vs Mutual Funds\n\nNRIs looking to invest in India's equity expansion can choose between mutual funds and Portfolio Management Services (PMS).\n\n## Comparison Metrics\n\nMutual funds offer low entry minimums (₹500+) and streamlined transaction routing. PMS requires higher tickets (₹50 Lakhs+) but offers active customized concentration to target high-alpha returns under professional management desks.",
    symbol: "^NSEI",
    name: "Direct Equities",
    price: 22475.85,
    changePercent: 0.92,
    currency: "INR",
    tone: "neutral",
    persona: "Rohan Shah (PMS Desk)",
    length: "7 min read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 99).toISOString(),
    author: {
      name: "Rohan Shah",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    },
    category: "nri_naval",
    tag: "EQUITIES",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop"
  }
];

const getSeededBlogDateOffset = (id: string): number => {
  const match = id.match(/-(\d+)$/);
  if (!match) return 0;
  const num = parseInt(match[1], 10);

  if (id.startsWith("news-")) {
    if (num === 1) return 2;  // 2 hours ago
    return num * 24;          // num days ago
  }
  if (id.startsWith("fund-")) {
    if (num === 1) return 3;  // 3 hours ago
    return num * 24;
  }
  if (id.startsWith("commodities-")) {
    if (num === 1) return 4;  // 4 hours ago
    return num * 24;
  }
  if (id.startsWith("nri-")) {
    if (num === 1) return 5;  // 5 hours ago
    return num * 24;
  }
  return 0;
};

export default function BlogPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<Blog["category"]>("news");

  // Live chart details view
  const [viewingAssetChart, setViewingAssetChart] = useState<string | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<"1H" | "1D" | "1W" | "1M">("1H");
  const [liveGoldPrice, setLiveGoldPrice] = useState(78240);
  const [liveSilverPrice, setLiveSilverPrice] = useState(94150);
  const [liveGoldChange, setLiveGoldChange] = useState(0.36);
  const [liveSilverChange, setLiveSilverChange] = useState(1.17);

  // Modals state
  const [activeBlogDetail, setActiveBlogDetail] = useState<Blog | null>(null);

  // Initialize and load from localstorage (with version validation to avoid empty categories for returning users)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem("solid_wealth_ai_blogs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Blog[];
          const categories = new Set(parsed.map(b => b.category));
          const hasAllCategories =
            categories.has("news") &&
            categories.has("funds") &&
            categories.has("commodities") &&
            categories.has("nri_naval");

          let wasPatched = false;
          const patchedList = parsed.map(blog => {
            if (blog.image.includes("photo-1601597111158-2fceff270190")) {
              blog.image = blog.id === "news-3"
                ? "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop";
              wasPatched = true;
            }
            if (blog.image.includes("photo-1507682531662-421b17d4718b")) {
              blog.image = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop";
              wasPatched = true;
            }

            // Daily auto-update: recalculate creation date for seeded blogs so they are relative to "today"
            const isSeeded = blog.id.startsWith("news-") ||
              blog.id.startsWith("fund-") ||
              blog.id.startsWith("commodities-") ||
              blog.id.startsWith("nri-");
            if (isSeeded) {
              const offsetHours = getSeededBlogDateOffset(blog.id);
              const calculatedDate = new Date(Date.now() - offsetHours * 60 * 60 * 1000).toISOString();

              const cachedHour = blog.createdAt.substring(0, 13);
              const calculatedHour = calculatedDate.substring(0, 13);
              if (cachedHour !== calculatedHour) {
                blog.createdAt = calculatedDate;
                wasPatched = true;
              }
            }

            return blog;
          });

          if (!hasAllCategories || parsed.length < INITIAL_BLOGS.length) {
            localStorage.setItem("solid_wealth_ai_blogs", JSON.stringify(INITIAL_BLOGS));
            setBlogs(INITIAL_BLOGS);
          } else if (wasPatched) {
            localStorage.setItem("solid_wealth_ai_blogs", JSON.stringify(patchedList));
            setBlogs(patchedList);
          } else {
            setBlogs(parsed);
          }
        } catch {
          setBlogs(INITIAL_BLOGS);
        }
      } else {
        localStorage.setItem("solid_wealth_ai_blogs", JSON.stringify(INITIAL_BLOGS));
        setBlogs(INITIAL_BLOGS);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Fetch real market quotes daily/live on mount to update blog cards
  useEffect(() => {
    if (!mounted || blogs.length === 0) return;

    const fetchDailyQuotes = async () => {
      // Fetch Live Gold Price
      try {
        const goldRes = await fetch("/api/finance?symbol=GC=F");
        if (goldRes.ok) {
          const goldData = await goldRes.json();
          if (goldData && typeof goldData.price === "number") {
            setLiveGoldPrice(goldData.price);
            setLiveGoldChange(goldData.changePercent ?? 0.36);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live gold quote:", err);
      }

      // Fetch Live Silver Price
      try {
        const silverRes = await fetch("/api/finance?symbol=SI=F");
        if (silverRes.ok) {
          const silverData = await silverRes.json();
          if (silverData && typeof silverData.price === "number") {
            setLiveSilverPrice(silverData.price);
            setLiveSilverChange(silverData.changePercent ?? 1.17);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live silver quote:", err);
      }

      // Fetch other symbols to update existing blogs
      const symbolsToUpdate = ["^NSEI", "MSFT", "NVDA", "AAPL", "TSLA"];
      const updatedBlogs = [...blogs];
      let hasUpdates = false;

      await Promise.all(
        symbolsToUpdate.map(async (symbol) => {
          try {
            const res = await fetch(`/api/finance?symbol=${encodeURIComponent(symbol)}`);
            if (res.ok) {
              const data = await res.json();
              if (data && typeof data.price === "number") {
                updatedBlogs.forEach((blog, idx) => {
                  // Don't update interest rates (Percent values)
                  if (blog.symbol === symbol && blog.currency !== "Percent") {
                    updatedBlogs[idx] = {
                      ...blog,
                      price: data.price,
                      changePercent: data.changePercent ?? blog.changePercent
                    };
                    hasUpdates = true;
                  }
                });
              }
            }
          } catch (e) {
            console.error("Failed to update daily quote for symbol:", symbol, e);
          }
        })
      );

      if (hasUpdates) {
        setBlogs(updatedBlogs);
        localStorage.setItem("solid_wealth_ai_blogs", JSON.stringify(updatedBlogs));
      }
    };

    fetchDailyQuotes();
  }, [mounted]);

  // Live gold & silver price tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveGoldPrice(prev => {
        const tick = (Math.random() - 0.5) * 12;
        const next = Math.max(78150, Math.min(78450, prev + tick));
        const changeVal = ((next - 78240) / 78240) * 100;
        setLiveGoldChange(changeVal);
        return next;
      });

      setLiveSilverPrice(prev => {
        const tick = (Math.random() - 0.5) * 20;
        const next = Math.max(94000, Math.min(94600, prev + tick));
        const changeVal = ((next - 94150) / 94150) * 100;
        setLiveSilverChange(changeVal);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const saveBlogs = (updated: Blog[]) => {
    setBlogs(updated);
    localStorage.setItem("solid_wealth_ai_blogs", JSON.stringify(updated));
  };



  const handleResetFilters = () => {
    setSearchQuery("");
  };

  const handleDeleteBlog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updated = blogs.filter(b => b.id !== id);
      saveBlogs(updated);
      if (activeBlogDetail?.id === id) {
        setActiveBlogDetail(null);
      }
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
        return `<p class="my-4 text-wealth-secondary leading-relaxed">${p}</p>`;
      })
      .join('\n');
    return html;
  };

  // SVG Chart data generator helpers
  const goldChartDataMap = {
    "1H": [78200, 78215, 78185, 78205, 78195, 78225, 78210, 78235, 78220, 78230, 78240],
    "1D": [78140, 78190, 78160, 78220, 78215, 78250, 78220, 78270, 78255, 78230, 78240],
    "1W": [77850, 77950, 77910, 78080, 78150, 78100, 78260, 78180, 78220, 78240],
    "1M": [76400, 76850, 77100, 76900, 77450, 77600, 77300, 77900, 78150, 78240]
  };

  const getChartCoordinates = (data: number[], width: number, height: number) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = idx * (width / (data.length - 1));
      const y = height - ((val - min) / range) * (height - 40) - 20;
      return { x, y };
    });

    if (points.length === 0) return { line: "", area: "" };

    const line = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

    return { line, area };
  };

  const activeChartCoords = getChartCoordinates(goldChartDataMap[chartTimeframe], 600, 200);

  // Filtered blogs for current active tab
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = blog.category === activeTab;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tag.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs[0];
  const gridBlogs = filteredBlogs.slice(1);

  if (!mounted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-wealth-bg font-sans">
        <Loader2 className="h-10 w-10 animate-spin text-wealth-accent" />
      </div>
    );
  }

  return (
    <div className="w-full bg-wealth-bg font-sans text-wealth-primary min-h-screen pb-20">

      {/* Detail Page: Gold Price MCX Sub-view */}
      {viewingAssetChart === "gold" ? (
        <div className="max-w-6xl mx-auto px-4 pt-8 animate-fade-up">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setViewingAssetChart(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-wealth-border bg-white rounded-xl text-xs font-bold hover:bg-wealth-surface-dim transition-all text-wealth-secondary cursor-pointer shadow-wealth-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Discover
            </button>
            <span className="text-[10px] font-bold text-wealth-muted tracking-wider uppercase">
              Last updated: {new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          {/* Stats Box */}
          <div className="p-6 md:p-8 bg-white border border-wealth-border rounded-3xl shadow-wealth-md mb-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#d97706] font-bold text-base shadow-inner">
                    ₹
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display leading-tight text-wealth-primary">Gold Price - MCX</h2>
                    <span className="text-[10px] text-wealth-muted font-bold tracking-wide uppercase">
                      Gold per 10 grams • Indian Rupees
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-3 pt-4">
                  <span className="text-4xl md:text-5xl font-black font-display text-wealth-primary tracking-tight">
                    ₹{liveGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className={`inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${liveGoldChange >= 0 ? "bg-[#e6fcf5] text-[#0ca678]" : "bg-[#fff5f5] text-[#fa5252]"}`}>
                    {liveGoldChange >= 0 ? "+" : ""}{liveGoldChange.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-start md:items-end gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-inner">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" />
                  Live
                </span>

                {/* Stats metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 border-t border-wealth-border pt-4 md:border-t-0 md:pt-0">
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">OPEN</span>
                    <span className="font-mono text-xs font-bold text-wealth-primary">₹78,194.78</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">HIGH</span>
                    <span className="font-mono text-xs font-bold text-wealth-primary">₹78,455.55</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">LOW</span>
                    <span className="font-mono text-xs font-bold text-wealth-primary">₹78,184.95</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-wealth-muted font-bold block uppercase tracking-wider">VOLUME</span>
                    <span className="font-mono text-xs font-bold text-wealth-primary">12.4K lots</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Card */}
          <div className="bg-white border border-wealth-border rounded-3xl shadow-wealth-md p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between border-b border-wealth-border pb-4 mb-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-wealth-primary flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-wealth-accent" /> Real-Time Price Chart
              </h3>

              <div className="flex items-center gap-1 bg-wealth-surface-dim p-0.5 rounded-xl border border-wealth-border">
                {(["1H", "1D", "1W", "1M"] as const).map(time => (
                  <button
                    key={time}
                    onClick={() => setChartTimeframe(time)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${chartTimeframe === time
                      ? "bg-[#fe9800] text-white shadow-sm"
                      : "text-wealth-secondary hover:text-wealth-primary"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="w-full h-64 relative">
              <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fe9800" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#fe9800" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                {/* Shaded Area Under Line */}
                {activeChartCoords.area && (
                  <path d={activeChartCoords.area} fill="url(#chartFillGradient)" />
                )}

                {/* Trend Line */}
                {activeChartCoords.line && (
                  <path
                    d={activeChartCoords.line}
                    fill="none"
                    stroke="#fe9800"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Pulsing endpoint dot */}
                {goldChartDataMap[chartTimeframe].length > 0 && (
                  <circle
                    cx="600"
                    cy={getChartCoordinates(goldChartDataMap[chartTimeframe], 600, 200).line.split(" ").pop()?.split(",")[1]}
                    r="4"
                    fill="#fe9800"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* Bottom timestamps */}
              <div className="flex justify-between text-[9px] font-bold text-wealth-muted tracking-wide uppercase pt-4 border-t border-slate-100">
                <span>{chartTimeframe === "1H" ? "01:41 AM" : (chartTimeframe === "1D" ? "Yesterday" : (chartTimeframe === "1W" ? "7 Days Ago" : "30 Days Ago"))}</span>
                <span>{chartTimeframe === "1H" ? "01:53 AM" : "Midway"}</span>
                <span>{chartTimeframe === "1H" ? "02:10 AM" : "Today"}</span>
              </div>
            </div>
          </div>

          {/* Sub-panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-wealth-border p-6 rounded-3xl shadow-wealth-md space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-wealth-primary border-b border-wealth-border pb-2">
                Market Analysis
              </h4>
              <p className="text-xs text-wealth-secondary leading-relaxed">
                Gold prices continue to show immense technical strength and price momentum amid ongoing global macroeconomic uncertainties. Central bank buying remains structurally robust, with emerging market central banking desks aggressively adding physical reserves to hedge sovereignty exposure. Solid local domestic demand across India has picked up significantly ahead of the peak festive and wedding seasons, providing a reliable bottom-cushion for local spot benchmarks.
              </p>
            </div>

            <div className="bg-white border border-wealth-border p-6 rounded-3xl shadow-wealth-md space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-wealth-primary border-b border-wealth-border pb-2">
                Key Factors
              </h4>
              <ul className="space-y-2 text-xs text-wealth-secondary font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-wealth-accent rounded-full flex-shrink-0" />
                  RBI's continued structural gold reserves acquisition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-wealth-accent rounded-full flex-shrink-0" />
                  Rupee valuation changes relative to the USD index
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-wealth-accent rounded-full flex-shrink-0" />
                  Global central bank interest rate easing pivots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-wealth-accent rounded-full flex-shrink-0" />
                  Peak domestic wedding season consumer demand surge
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 pt-10">

          {/* Title Header */}
          <div className="text-center space-y-1.5 mb-10">
            <h1 className="text-5xl font-black font-display tracking-tight text-wealth-primary">Discover</h1>
          </div>

          {/* Category Tabs Pill Bar */}
          <div className="flex justify-center gap-2.5 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border cursor-pointer transition-all duration-300 shadow-wealth-sm ${activeTab === "news"
                ? "bg-[#fe9800] text-white border-[#fe9800]"
                : "bg-white text-wealth-secondary border-wealth-border hover:bg-wealth-surface-dim hover:text-wealth-primary"
                }`}
            >
              <FileText className="w-4 h-4" /> News
            </button>

            <button
              onClick={() => setActiveTab("funds")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border cursor-pointer transition-all duration-300 shadow-wealth-sm ${activeTab === "funds"
                ? "bg-[#fe9800] text-white border-[#fe9800]"
                : "bg-white text-wealth-secondary border-wealth-border hover:bg-wealth-surface-dim hover:text-wealth-primary"
                }`}
            >
              <Layers className="w-4 h-4" /> Mutual Funds
            </button>

            <button
              onClick={() => setActiveTab("commodities")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border cursor-pointer transition-all duration-300 shadow-wealth-sm ${activeTab === "commodities"
                ? "bg-[#fe9800] text-white border-[#fe9800]"
                : "bg-white text-wealth-secondary border-wealth-border hover:bg-wealth-surface-dim hover:text-wealth-primary"
                }`}
            >
              <TrendingUp className="w-4 h-4" /> Commodities
            </button>

            <button
              onClick={() => setActiveTab("nri_naval")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border cursor-pointer transition-all duration-300 shadow-wealth-sm ${activeTab === "nri_naval"
                ? "bg-[#fe9800] text-white border-[#fe9800]"
                : "bg-white text-wealth-secondary border-wealth-border hover:bg-wealth-surface-dim hover:text-wealth-primary"
                }`}
            >
              <Anchor className="w-4 h-4" /> NRI and NAVAL fairmen
            </button>
          </div>

          {/* Live Commodities Pricing Row */}
          {activeTab === "commodities" && (
            <div className="space-y-4 mb-10 animate-fade-up">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-wealth-primary">
                Precious Metals - Live Prices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gold Card */}
                <div className="bg-white border border-wealth-border rounded-3xl p-6 shadow-wealth-sm hover:shadow-wealth-md transition-all flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#b45309] font-bold text-sm shadow-inner">
                        ₹
                      </div>
                      <div>
                        <h4 className="font-bold text-wealth-primary text-sm">Gold</h4>
                        <span className="text-[10px] text-wealth-muted font-bold tracking-wider uppercase">
                          per 10 grams - MCX
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-extrabold ${liveGoldChange >= 0 ? "bg-[#e6fcf5] text-[#0ca678]" : "bg-[#fff5f5] text-[#fa5252]"}`}>
                      {liveGoldChange >= 0 ? "+" : ""}{liveGoldChange.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-3xl font-black font-display text-wealth-primary">
                      ₹{liveGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <button
                      onClick={() => setViewingAssetChart("gold")}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      View Live Chart <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Silver Card */}
                <div className="bg-white border border-wealth-border rounded-3xl p-6 shadow-wealth-sm hover:shadow-wealth-md transition-all flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shadow-inner">
                        ₹
                      </div>
                      <div>
                        <h4 className="font-bold text-wealth-primary text-sm">Silver</h4>
                        <span className="text-[10px] text-wealth-muted font-bold tracking-wider uppercase">
                          per kilogram - MCX
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-extrabold ${liveSilverChange >= 0 ? "bg-[#e6fcf5] text-[#0ca678]" : "bg-[#fff5f5] text-[#fa5252]"}`}>
                      {liveSilverChange >= 0 ? "+" : ""}{liveSilverChange.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-3xl font-black font-display text-wealth-primary">
                      ₹{liveSilverPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-200 text-slate-400 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-not-allowed flex items-center gap-1"
                    >
                      View Live Chart <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-extrabold uppercase tracking-wider text-wealth-primary pt-6">
                Commodities News & Analysis
              </h3>
            </div>
          )}

          {/* Action Row: Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-wealth-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search report titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-wealth-border rounded-xl text-xs outline-none focus:border-wealth-accent transition-all text-wealth-primary font-medium shadow-wealth-sm"
              />
            </div>

            <button
              onClick={() => setIsWriting(true)}
              className="px-5 py-2.5 bg-[#fe9800] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-orange-600 transition-all cursor-pointer flex items-center gap-1.5 shadow-md self-start md:self-auto"
            >
              <PenSquare className="w-4 h-4" /> Write a Story
            </button>
          </div>

          {/* Empty state check */}
          {filteredBlogs.length === 0 ? (
            <div className="bg-white border border-wealth-border rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-wealth-sm animate-fade-up">
              <div className="w-12 h-12 bg-wealth-surface-dim rounded-full flex items-center justify-center mx-auto text-wealth-muted">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-display text-wealth-primary">No Financial Reports Found</h4>
              <p className="text-xs text-wealth-secondary leading-relaxed">
                We couldn't find any reports matching "{searchQuery}" under the {activeTab.replace("_", " & ")} category.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 border border-wealth-border rounded-xl text-xs font-bold hover:bg-wealth-surface-dim transition-all text-wealth-secondary cursor-pointer"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-up">
              {/* 1. Feature Hero Banner */}
              {featuredBlog && (
                <div
                  onClick={() => router.push(`/blog/${featuredBlog.id}`)}
                  className="bg-white border border-wealth-border rounded-3xl overflow-hidden shadow-wealth-md hover:shadow-wealth-lg transition-all duration-300 flex flex-col lg:flex-row group cursor-pointer"
                >
                  <div className="relative lg:w-1/2 h-64 lg:h-auto min-h-[280px] overflow-hidden">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-sm border border-yellow-300">
                      {featuredBlog.tag}
                    </div>
                  </div>

                  <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center gap-1 text-[10px] font-bold text-wealth-muted uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-wealth-accent" />
                        <span>{featuredBlog.length}</span>
                        <span>•</span>
                        <span>{featuredBlog.author.name}</span>
                        <span>•</span>
                        <span>{new Date(featuredBlog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h2 className="text-2xl md:text-3.5xl font-black font-display text-wealth-primary leading-tight tracking-tight group-hover:text-[#fe9800] transition-colors">
                        {featuredBlog.title}
                      </h2>

                      <p className="text-xs md:text-sm text-wealth-secondary leading-relaxed line-clamp-3">
                        {featuredBlog.summary}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#fe9800] hover:bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm">
                        Read Full Story <ChevronRight className="w-3.5 h-3.5" />
                      </span>

                      {/* Delete option for non-default entries */}
                      {!featuredBlog.id.startsWith("news-") && !featuredBlog.id.startsWith("fund-") && !featuredBlog.id.startsWith("commodities-") && !featuredBlog.id.startsWith("nri-") && (
                        <button
                          onClick={(e) => handleDeleteBlog(featuredBlog.id, e)}
                          className="p-2 text-wealth-muted hover:text-red-500 rounded-xl hover:bg-red-50 transition-all cursor-pointer"
                          title="Delete generated report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Secondary Cards Grid */}
              {gridBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gridBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      onClick={() => router.push(`/blog/${blog.id}`)}
                      className="bg-white border border-wealth-border rounded-3xl overflow-hidden shadow-wealth-sm hover:shadow-wealth-md transition-all duration-300 flex flex-col group cursor-pointer"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-[#fef3c7] text-[#b45309] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider border border-[#fde68a]">
                          {blog.tag}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-1 text-[9px] font-bold text-wealth-muted uppercase tracking-wider">
                            <Clock className="w-3 h-3 text-wealth-accent" />
                            <span>{blog.length}</span>
                            <span>•</span>
                            <span>{blog.author.name}</span>
                            <span>•</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>

                          <h3 className="text-base font-bold font-display text-wealth-primary leading-snug group-hover:text-[#fe9800] transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-xs text-wealth-secondary leading-relaxed line-clamp-2">
                            {blog.summary}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] font-bold text-wealth-accent uppercase tracking-wider flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                            Continue reading <ChevronRight className="w-3.5 h-3.5" />
                          </span>

                          {!blog.id.startsWith("news-") && !blog.id.startsWith("fund-") && !blog.id.startsWith("commodities-") && !blog.id.startsWith("nri-") && (
                            <button
                              onClick={(e) => handleDeleteBlog(blog.id, e)}
                              className="p-1.5 text-wealth-muted hover:text-red-500 rounded-xl hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete generated report"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. MODAL: Blog Report Detail View */}
      {activeBlogDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080f1a]/70 backdrop-blur-md overflow-y-auto">
          <div className="bg-wealth-surface border border-wealth-border w-full max-w-3xl rounded-3xl shadow-wealth-xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-up">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#080f1a] text-white border-b border-wealth-dark-border font-display">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-wealth-accent" />
                <h3 className="text-base font-bold uppercase tracking-wider">Financial Report</h3>
              </div>
              <button
                onClick={() => setActiveBlogDetail(null)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Asset Performance Summary Box */}
              {activeBlogDetail.symbol && activeBlogDetail.price && (
                <div className="p-4 bg-gradient-to-br from-[#0f172a] to-[#122138] border border-wealth-dark-border rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-wealth-accent font-bold uppercase tracking-widest block mb-1">
                      Market Feed Snapshot
                    </span>
                    <h4 className="text-lg font-bold font-display">{activeBlogDetail.name} ({activeBlogDetail.symbol})</h4>
                    <span className="text-xs text-gray-400">Captured at generation</span>
                  </div>

                  <div className="flex items-center gap-4 sm:text-right">
                    <div className="font-mono">
                      <span className="text-xl font-bold block">
                        {activeBlogDetail.currency === "USD" ? "$" : (activeBlogDetail.currency === "Percent" ? "" : "₹")}
                        {activeBlogDetail.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        {activeBlogDetail.currency === "Percent" ? "%" : ""}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${activeBlogDetail.changePercent >= 0 ? "text-[#0ca678]" : "text-[#fa5252]"}`}>
                        {activeBlogDetail.changePercent >= 0 ? "+" : ""}{activeBlogDetail.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Title & Metadata */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-wealth-secondary uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-wealth-accent" /> {new Date(activeBlogDetail.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  <span>•</span>
                  <span>{activeBlogDetail.length}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                    {activeBlogDetail.tag}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3.5xl font-black text-wealth-primary font-display leading-tight tracking-tight">
                  {activeBlogDetail.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-3 border-y border-wealth-border py-4">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden border border-wealth-border bg-wealth-surface-dim flex items-center justify-center">
                    {activeBlogDetail.author.avatar.startsWith("http") ? (
                      <Image
                        src={activeBlogDetail.author.avatar}
                        alt="Author"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Sparkles className="w-5 h-5 text-wealth-accent" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-sm block text-wealth-primary">{activeBlogDetail.author.name}</span>
                    <span className="text-xs text-wealth-secondary block">Solid Wealth Contributor</span>
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <div className="p-4 bg-wealth-surface-dim rounded-2xl border border-wealth-border text-wealth-secondary italic text-sm leading-relaxed">
                <strong>Executive Summary:</strong> {activeBlogDetail.summary}
              </div>

              {/* Report Body */}
              <div
                className="text-sm leading-relaxed text-wealth-secondary prose max-w-none prose-headings:font-display"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(activeBlogDetail.content) }}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-wealth-border bg-wealth-surface-dim flex justify-between items-center gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${activeBlogDetail.title}\n\n${activeBlogDetail.summary}\n\n${activeBlogDetail.content}`);
                  alert("Report content copied to clipboard!");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-wealth-border rounded-xl text-xs font-bold hover:bg-white transition-all text-wealth-secondary cursor-pointer shadow-wealth-sm"
              >
                <FileText className="w-4 h-4 text-wealth-accent" /> Copy Full Text
              </button>

              <button
                onClick={() => setActiveBlogDetail(null)}
                className="px-6 py-2.5 bg-wealth-primary hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
