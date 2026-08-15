export type SubSection = {
  title?: string;
  topics: string[];
};

export type CourseModule = {
  id: string;
  moduleNumber: number;
  title: string;
  fullTitle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Mastery & Practical";
  category: "Theory" | "Analysis" | "Strategy" | "Taxation & Compliance" | "Portfolio Management";
  description: string;
  subsections?: SubSection[];
  topics: string[];
};

export type CourseLevel = {
  id: string;
  levelNumber: number;
  title: string;
  shortTitle: string;
  moduleRange: readonly [number, number];
  focus: string;
};

export type CourseDeepDive = {
  title: string;
  description: string;
  topics: string[];
};

export type CourseTopicEntry = {
  level: CourseLevel;
  courseModule: CourseModule;
  topic: string;
  topicIndex: number;
};

export const courseCurriculum: CourseModule[] = [
  {
    id: "module-1",
    moduleNumber: 1,
    title: "Introduction to Investing",
    fullTitle: "Module 1: Introduction to Investing",
    level: "Beginner",
    category: "Theory",
    description: "Master foundational concepts of wealth creation, the impact of inflation, compounding, and establishing an emergency fund mindset.",
    topics: [
      "What is investing?",
      "Why investing is important",
      "Inflation and purchasing power",
      "Saving vs Investing",
      "Risk vs Reward",
      "Time value of money",
      "Compounding (The 8th Wonder)",
      "Financial goals and planning",
      "Emergency fund",
      "Wealth creation mindset"
    ]
  },
  {
    id: "module-2",
    moduleNumber: 2,
    title: "Financial Markets Basics",
    fullTitle: "Module 2: Financial Markets Basics",
    level: "Beginner",
    category: "Theory",
    description: "Understand capital market segments, participant roles, regulatory bodies, and asset classes from stocks and bonds to mutual funds and REITs.",
    subsections: [
      {
        title: "Capital Markets",
        topics: ["Money Market", "Capital Market", "Primary Market", "Secondary Market"]
      },
      {
        title: "Market Participants",
        topics: ["Retail Investors", "Institutional Investors", "Foreign Investors", "Regulators"]
      },
      {
        title: "Types of Investments",
        topics: ["Stocks", "Bonds", "Gold", "Real Estate", "Fixed Deposits", "Mutual Funds", "ETFs", "REITs", "INVITs"]
      }
    ],
    topics: [
      "Money Market",
      "Capital Market",
      "Primary Market",
      "Secondary Market",
      "Retail Investors",
      "Institutional Investors",
      "Foreign Investors",
      "Regulators",
      "Stocks",
      "Bonds",
      "Gold",
      "Real Estate",
      "Fixed Deposits",
      "Mutual Funds",
      "ETFs",
      "REITs",
      "INVITs"
    ]
  },
  {
    id: "module-3",
    moduleNumber: 3,
    title: "Understanding Mutual Funds",
    fullTitle: "Module 3: Understanding Mutual Funds",
    level: "Beginner",
    category: "Theory",
    description: "Learn how mutual funds function, the history of funds in India, money pooling, NAV calculations, AUM, and ecosystem entities.",
    topics: [
      "What is a Mutual Fund?",
      "History of Mutual Funds",
      "Mutual Fund Industry in India",
      "How Mutual Funds Work",
      "Pooling of Money",
      "Net Asset Value (NAV)",
      "Units",
      "Fund Corpus",
      "AUM (Assets Under Management)",
      "Fund House (AMC)",
      "Trustee",
      "Custodian",
      "Registrar (RTA)",
      "Sponsor"
    ]
  },
  {
    id: "module-4",
    moduleNumber: 4,
    title: "Mutual Fund Structure",
    fullTitle: "Module 4: Mutual Fund Structure",
    level: "Beginner",
    category: "Theory",
    description: "Explore the governance and regulatory ecosystem including SEBI regulations, AMFI roles, AMCs, Fund Managers, Trustees, and RTAs.",
    topics: [
      "SEBI regulations",
      "AMFI",
      "Asset Management Company",
      "Fund Manager",
      "Trustee",
      "Custodian",
      "Auditors",
      "Distributors",
      "RTA",
      "Investor"
    ]
  },
  {
    id: "module-5",
    moduleNumber: 5,
    title: "Types of Mutual Funds",
    fullTitle: "Module 5: Types of Mutual Funds",
    level: "Beginner",
    category: "Analysis",
    description: "Comprehensive categorization across Equity, Debt, Hybrid, Solution-Oriented, Index, ETF, and International funds.",
    subsections: [
      {
        title: "Equity Funds",
        topics: ["Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "Flexi Cap", "ELSS", "Focused Fund", "Sector Funds", "Thematic Funds", "Value Fund", "Contra Fund", "Dividend Yield Fund"]
      },
      {
        title: "Debt Funds",
        topics: ["Liquid Fund", "Overnight Fund", "Ultra Short Duration", "Low Duration", "Money Market", "Short Duration", "Medium Duration", "Long Duration", "Corporate Bond Fund", "Banking & PSU Fund", "Credit Risk Fund", "Dynamic Bond Fund", "Gilt Fund"]
      },
      {
        title: "Hybrid Funds",
        topics: ["Aggressive Hybrid", "Conservative Hybrid", "Balanced Advantage", "Dynamic Asset Allocation", "Multi Asset", "Arbitrage Fund", "Equity Savings"]
      },
      {
        title: "Life Cycle & Legacy Goal Funds",
        topics: ["Life Cycle Fund", "Retirement Fund", "Children's Fund"]
      },
      {
        title: "Index & International",
        topics: ["Index Fund", "ETF", "International Funds"]
      }
    ],
    topics: [
      "Large Cap", "Mid Cap", "Small Cap", "Multi Cap", "Flexi Cap", "ELSS", "Focused Fund", "Sector Funds", "Thematic Funds", "Value Fund", "Contra Fund", "Dividend Yield Fund",
      "Liquid Fund", "Overnight Fund", "Ultra Short Duration", "Low Duration", "Money Market", "Short Duration", "Medium Duration", "Long Duration", "Corporate Bond Fund", "Banking & PSU Fund", "Credit Risk Fund", "Dynamic Bond Fund", "Gilt Fund",
      "Aggressive Hybrid", "Conservative Hybrid", "Balanced Advantage", "Dynamic Asset Allocation", "Multi Asset", "Arbitrage Fund", "Equity Savings",
      "Life Cycle Fund", "Retirement Fund", "Children's Fund",
      "Index Fund", "ETF", "International Funds"
    ]
  },
  {
    id: "module-6",
    moduleNumber: 6,
    title: "Mutual Fund Terminology",
    fullTitle: "Module 6: Mutual Fund Terminology",
    level: "Intermediate",
    category: "Analysis",
    description: "Demystify key financial metrics: Expense Ratio, Alpha, Beta, Sharpe, Sortino, Treynor ratios, Tracking Error, CAGR, and XIRR.",
    topics: [
      "NAV",
      "Expense Ratio",
      "Exit Load",
      "Entry Load",
      "Tracking Error",
      "Alpha",
      "Beta",
      "Standard Deviation",
      "Sharpe Ratio",
      "Sortino Ratio",
      "Treynor Ratio",
      "Jensen Alpha",
      "Portfolio Turnover",
      "Benchmark",
      "SIP",
      "STP",
      "SWP",
      "CAGR",
      "XIRR",
      "Rolling Returns"
    ]
  },
  {
    id: "module-7",
    moduleNumber: 7,
    title: "Risk in Mutual Funds",
    fullTitle: "Module 7: Risk in Mutual Funds",
    level: "Intermediate",
    category: "Analysis",
    description: "Identify and mitigate market, credit, interest rate, liquidity, and concentration risks while performing investor risk profiling.",
    topics: [
      "Market Risk",
      "Credit Risk",
      "Interest Rate Risk",
      "Liquidity Risk",
      "Concentration Risk",
      "Currency Risk",
      "Inflation Risk",
      "Volatility",
      "Drawdown",
      "Risk Profiling"
    ]
  },
  {
    id: "module-8",
    moduleNumber: 8,
    title: "Return Measurement",
    fullTitle: "Module 8: Return Measurement",
    level: "Intermediate",
    category: "Analysis",
    description: "Evaluate investment performance using Absolute Return, CAGR, XIRR, Point-to-Point, Rolling Returns, and Risk-Adjusted Returns.",
    topics: [
      "Absolute Return",
      "Annualized Return",
      "CAGR",
      "XIRR",
      "Point to Point Return",
      "Rolling Return",
      "Calendar Return",
      "Risk Adjusted Return"
    ]
  },
  {
    id: "module-9",
    moduleNumber: 9,
    title: "Reading Mutual Fund Documents",
    fullTitle: "Module 9: Reading Mutual Fund Documents",
    level: "Intermediate",
    category: "Analysis",
    description: "Learn to read SIDs, KIMs, SAIs, Monthly Factsheets, Portfolio Disclosures, and Annual Reports like a professional analyst.",
    topics: [
      "Scheme Information Document (SID)",
      "Key Information Memorandum (KIM)",
      "Statement of Additional Information (SAI)",
      "Factsheet",
      "Portfolio Disclosure",
      "Annual Report"
    ]
  },
  {
    id: "module-10",
    moduleNumber: 10,
    title: "Selecting Mutual Funds",
    fullTitle: "Module 10: Selecting Mutual Funds",
    level: "Intermediate",
    category: "Analysis",
    description: "Master fund evaluation criteria including track record, fund manager credibility, consistency, peer comparison, and downside capture.",
    subsections: [
      {
        title: "Selection Criteria",
        topics: [
          "Fund Manager",
          "AMC Reputation",
          "Consistency",
          "Performance",
          "Risk Metrics",
          "Expense Ratio",
          "AUM",
          "Portfolio Quality",
          "Portfolio Concentration",
          "Benchmark Comparison",
          "Peer Comparison",
          "Downside Protection"
        ]
      }
    ],
    topics: [
      "Fund Manager",
      "AMC Reputation",
      "Consistency",
      "Performance",
      "Risk Metrics",
      "Expense Ratio",
      "AUM",
      "Portfolio Quality",
      "Portfolio Concentration",
      "Benchmark Comparison",
      "Peer Comparison",
      "Downside Protection"
    ]
  },
  {
    id: "module-11",
    moduleNumber: 11,
    title: "Portfolio Analysis",
    fullTitle: "Module 11: Portfolio Analysis",
    level: "Intermediate",
    category: "Portfolio Management",
    description: "Understand asset allocation, portfolio overlap detection, correlation matrices, risk aggregation, and systematic rebalancing.",
    topics: [
      "Asset Allocation",
      "Diversification",
      "Correlation",
      "Rebalancing",
      "Portfolio Overlap",
      "Portfolio Risk",
      "Portfolio Return",
      "Concentration Analysis"
    ]
  },
  {
    id: "module-12",
    moduleNumber: 12,
    title: "SIP Investing",
    fullTitle: "Module 12: SIP Investing",
    level: "Intermediate",
    category: "Strategy",
    description: "Unpack Dollar/Rupee Cost Averaging, Step-up SIPs, Goal-linked SIPs, market crash execution, and debunk common SIP myths.",
    topics: [
      "What is SIP?",
      "How SIP Works",
      "Power of SIP",
      "SIP vs Lump Sum",
      "Step-up SIP",
      "Goal-based SIP",
      "SIP during Market Crash",
      "SIP Myths"
    ]
  },
  {
    id: "module-13",
    moduleNumber: 13,
    title: "Lump Sum Investing",
    fullTitle: "Module 13: Lump Sum Investing",
    level: "Intermediate",
    category: "Strategy",
    description: "Strategies for deploying lump sum capital, valuation metrics (P/E, P/B), Systemic Transfer Plans (STP), and timing pitfalls.",
    topics: [
      "When to invest",
      "Valuation-based investing",
      "Market timing myths",
      "STP strategy",
      "Asset allocation before lump sum"
    ]
  },
  {
    id: "module-14",
    moduleNumber: 14,
    title: "Advanced Mutual Fund Strategies",
    fullTitle: "Module 14: Advanced Mutual Fund Strategies",
    level: "Advanced",
    category: "Strategy",
    description: "Implement Core-Satellite portfolios, Factor Investing, Smart Beta, Tactical Asset Allocation, Value Averaging, and Glide Paths.",
    topics: [
      "Core-Satellite Portfolio",
      "Factor Investing",
      "Smart Beta",
      "Tactical Asset Allocation",
      "Dynamic Asset Allocation",
      "Value Averaging",
      "Goal-Based Investing",
      "Bucket Strategy",
      "Glide Path"
    ]
  },
  {
    id: "module-15",
    moduleNumber: 15,
    title: "Taxation",
    fullTitle: "Module 15: Taxation",
    level: "Advanced",
    category: "Taxation & Compliance",
    description: "Comprehensive guide to Equity and Debt capital gains taxes (STCG, LTCG), dividend tax, tax harvesting, ELSS 80C benefits, and TDS rules.",
    topics: [
      "Equity Fund Taxation",
      "Debt-Oriented Fund Taxation (current rules)",
      "Hybrid Fund Taxation",
      "Capital Gains",
      "Short-Term Capital Gains (STCG)",
      "Long-Term Capital Gains (LTCG)",
      "Dividend Taxation",
      "Tax Harvesting",
      "ELSS Tax Benefits",
      "TDS Rules (where applicable)",
      "Resident vs NRI tax considerations"
    ]
  },
  {
    id: "module-16",
    moduleNumber: 16,
    title: "Retirement Planning",
    fullTitle: "Module 16: Retirement Planning",
    level: "Advanced",
    category: "Portfolio Management",
    description: "Calculate inflation-adjusted retirement corpus, design Systematic Withdrawal Plans (SWP), and apply safe withdrawal rates.",
    topics: [
      "Retirement Corpus Calculation",
      "SWP Strategy",
      "Safe Withdrawal Rate",
      "Inflation Impact",
      "Asset Allocation by Age"
    ]
  },
  {
    id: "module-17",
    moduleNumber: 17,
    title: "Goal-Based Investing",
    fullTitle: "Module 17: Goal-Based Investing",
    level: "Advanced",
    category: "Strategy",
    description: "Map mutual fund portfolios to specific life goals: higher education, home purchase, weddings, vacation, and legacy wealth.",
    topics: [
      "Child Education",
      "Marriage",
      "House Purchase",
      "Car Purchase",
      "Vacation",
      "Retirement",
      "Wealth Creation"
    ]
  },
  {
    id: "module-18",
    moduleNumber: 18,
    title: "Behavioral Finance",
    fullTitle: "Module 18: Behavioral Finance",
    level: "Advanced",
    category: "Strategy",
    description: "Overcome cognitive biases: fear & greed cycles, loss aversion, confirmation bias, recency bias, overconfidence, and panic selling.",
    topics: [
      "Fear & Greed",
      "Loss Aversion",
      "Confirmation Bias",
      "Herd Mentality",
      "Recency Bias",
      "Overconfidence",
      "Emotional Investing"
    ]
  },
  {
    id: "module-19",
    moduleNumber: 19,
    title: "Mutual Fund Platforms",
    fullTitle: "Module 19: Mutual Fund Platforms",
    level: "Mastery & Practical",
    category: "Taxation & Compliance",
    description: "Navigate Direct vs. Regular plans, Growth vs. IDCW options, Demat vs. non-Demat holding, e-KYC, PAN linking, and FATCA/CRS.",
    topics: [
      "Direct vs Regular Plans",
      "Growth vs IDCW (Income Distribution cum Capital Withdrawal)",
      "Online Investment Platforms",
      "Demat vs Non-Demat Holding",
      "Nomination",
      "KYC Process",
      "e-KYC",
      "PAN Linking",
      "FATCA/CRS Compliance"
    ]
  },
  {
    id: "module-20",
    moduleNumber: 20,
    title: "Practical Mutual Fund Analysis",
    fullTitle: "Module 20: Practical Mutual Fund Analysis",
    level: "Mastery & Practical",
    category: "Analysis",
    description: "Hands-on exercises: analyze fund factsheets, perform side-by-side fund comparisons, evaluate sector weights, and test rolling returns.",
    subsections: [
      {
        title: "Hands-on Exercises",
        topics: [
          "Reading a factsheet",
          "Comparing two funds",
          "Analyzing portfolio holdings",
          "Evaluating sector allocation",
          "Checking rolling returns",
          "Assessing risk metrics",
          "Benchmark comparison",
          "Evaluating fund manager performance"
        ]
      }
    ],
    topics: [
      "Reading a factsheet",
      "Comparing two funds",
      "Analyzing portfolio holdings",
      "Evaluating sector allocation",
      "Checking rolling returns",
      "Assessing risk metrics",
      "Benchmark comparison",
      "Evaluating fund manager performance"
    ]
  },
  {
    id: "module-21",
    moduleNumber: 21,
    title: "Building Model Portfolios",
    fullTitle: "Module 21: Building Model Portfolios",
    level: "Mastery & Practical",
    category: "Portfolio Management",
    description: "Construct tailored model portfolios for Conservative, Moderate, Aggressive profiles, and milestone targets (₹10L, ₹50L, ₹1 Cr).",
    subsections: [
      {
        title: "Portfolio Blueprints",
        topics: [
          "Beginner Portfolio",
          "Conservative Portfolio",
          "Moderate Portfolio",
          "Aggressive Portfolio",
          "Retirement Portfolio",
          "Child Education Portfolio",
          "Passive Portfolio",
          "₹10 lakh Portfolio",
          "₹50 lakh Portfolio",
          "₹1 crore Portfolio"
        ]
      }
    ],
    topics: [
      "Beginner Portfolio",
      "Conservative Portfolio",
      "Moderate Portfolio",
      "Aggressive Portfolio",
      "Retirement Portfolio",
      "Child Education Portfolio",
      "Passive Portfolio",
      "₹10 lakh Portfolio",
      "₹50 lakh Portfolio",
      "₹1 crore Portfolio"
    ]
  },
  {
    id: "module-22",
    moduleNumber: 22,
    title: "Common Mistakes",
    fullTitle: "Module 22: Common Mistakes",
    level: "Mastery & Practical",
    category: "Strategy",
    description: "Avoid cost-prohibitive pitfalls: past-return chasing, over-diversification, panic selling, excessive switching, and unaligned goals.",
    topics: [
      "Chasing past returns",
      "Too many funds",
      "Ignoring asset allocation",
      "Panic selling",
      "Timing the market",
      "Ignoring costs",
      "Frequent switching",
      "Investing without goals"
    ]
  },
  {
    id: "module-23",
    moduleNumber: 23,
    title: "Real-Life Case Studies",
    fullTitle: "Module 23: Real-Life Case Studies",
    level: "Mastery & Practical",
    category: "Portfolio Management",
    description: "Analyze historical 20-year SIP trajectories, 2008 & 2020 market crash recoveries, real ELSS tax journeys, and portfolio reviews.",
    topics: [
      "SIP over 20 years",
      "Market crash recovery (e.g., 2008, 2020)",
      "ELSS investment journey",
      "Retirement planning case study",
      "Wealth creation examples",
      "Portfolio review examples"
    ]
  },
  {
    id: "module-24",
    moduleNumber: 24,
    title: "Advanced Topics",
    fullTitle: "Module 24: Advanced Topics",
    level: "Mastery & Practical",
    category: "Strategy",
    description: "Deep dive into Passive vs. Active dynamics, International diversification, ESG funds, Smart Beta, Scheme Categorization, and yield curves.",
    topics: [
      "Passive vs Active Funds",
      "International Diversification",
      "ESG Funds",
      "Smart Beta ETFs",
      "Fund-of-Funds",
      "Fund Mergers",
      "Scheme Categorization (SEBI)",
      "Portfolio Rebalancing Techniques",
      "Macro-economic Impact on Funds",
      "Interest Rate Cycles and Debt Funds"
    ]
  },
  {
    id: "module-25",
    moduleNumber: 25,
    title: "Tools & Resources",
    fullTitle: "Module 25: Tools & Resources",
    level: "Mastery & Practical",
    category: "Analysis",
    description: "Leverage AMFI disclosures, SEBI filings, financial/XIRR/SIP calculators, goal planners, and custom portfolio rebalancing sheets.",
    topics: [
      "Using AMFI data",
      "Understanding SEBI disclosures",
      "Fund Factsheets",
      "Financial calculators",
      "SIP calculators",
      "XIRR calculators",
      "Goal planners",
      "Portfolio trackers",
      "Rebalancing spreadsheets"
    ]
  },
  {
    id: "module-26",
    moduleNumber: 26,
    title: "Capstone Project",
    fullTitle: "Module 26: Capstone Project",
    level: "Mastery & Practical",
    category: "Portfolio Management",
    description: "Formulate a comprehensive investor financial plan: risk assessment, asset allocation, fund selection, SIP/SWP plan, tax rationale, and review strategy.",
    topics: [
      "Assess an investor's risk profile",
      "Define financial goals",
      "Recommend an asset allocation",
      "Select suitable mutual funds",
      "Build a diversified portfolio",
      "Justify each fund selection",
      "Create SIP/STP/SWP plans",
      "Explain taxation implications",
      "Present a periodic review and rebalancing strategy"
    ]
  }
];

export const courseLevels: CourseLevel[] = [
  {
    id: "foundation",
    levelNumber: 1,
    title: "Investment Foundations",
    shortTitle: "Foundation",
    moduleRange: [1, 4],
    focus: "Money, markets, and the mutual-fund ecosystem",
  },
  {
    id: "product-knowledge",
    levelNumber: 2,
    title: "Mutual Fund Product Mastery",
    shortTitle: "Product Knowledge",
    moduleRange: [5, 9],
    focus: "Fund categories, terminology, risk, and returns",
  },
  {
    id: "investment-selection",
    levelNumber: 3,
    title: "Fund Selection & Investment Execution",
    shortTitle: "Investment Selection",
    moduleRange: [10, 13],
    focus: "Fund selection, portfolio analysis, SIP, and lump sum",
  },
  {
    id: "portfolio-management",
    levelNumber: 4,
    title: "Advanced Investment Strategies",
    shortTitle: "Portfolio Management",
    moduleRange: [14, 17],
    focus: "Advanced strategies, taxation, retirement, and goals",
  },
  {
    id: "investor-psychology",
    levelNumber: 5,
    title: "Behavioural & Operational Mastery",
    shortTitle: "Investor Psychology",
    moduleRange: [18, 19],
    focus: "Investor behaviour, platforms, and operational processes",
  },
  {
    id: "practical-application",
    levelNumber: 6,
    title: "Practical Masterclass",
    shortTitle: "Practical Application",
    moduleRange: [20, 23],
    focus: "Analysis, model portfolios, mistakes, and case studies",
  },
  {
    id: "advanced-mastery",
    levelNumber: 7,
    title: "Advanced Mastery",
    shortTitle: "Advanced Mastery",
    moduleRange: [24, 25],
    focus: "Advanced concepts, macro context, and professional tools",
  },
  {
    id: "capstone",
    levelNumber: 8,
    title: "Capstone Project",
    shortTitle: "Capstone",
    moduleRange: [26, 26],
    focus: "A complete, end-to-end investment-planning exercise",
  },
];

export const professionalDeepDives: CourseDeepDive[] = [
  {
    title: "Mutual Fund Mathematics",
    description:
      "Build the quantitative foundation needed to calculate goals, cash flows, and real investor outcomes.",
    topics: [
      "Future and present value",
      "CAGR and XIRR",
      "SIP and SWP mathematics",
      "Inflation-adjusted returns",
      "Goal corpus calculation",
      "Sequence of returns",
    ],
  },
  {
    title: "Equity Analysis for Fund Investors",
    description:
      "Understand the underlying businesses held by a fund without turning the course into stock-picking training.",
    topics: [
      "Revenue, EBITDA, PAT, and EPS",
      "P/E and P/B valuation",
      "ROE and ROCE",
      "Debt-to-equity",
      "Free cash flow",
      "Portfolio quality",
    ],
  },
  {
    title: "Debt-Fund Analysis",
    description:
      "Learn how credit quality, duration, spreads, and rate cycles change the behaviour of debt portfolios.",
    topics: [
      "YTM and credit spread",
      "Macaulay and modified duration",
      "Credit ratings",
      "Yield curves",
      "Default and downgrade risk",
      "Interest-rate sensitivity",
    ],
  },
  {
    title: "Portfolio Construction Theory",
    description:
      "Bridge the gap between choosing individual funds and building a resilient, goal-aligned portfolio.",
    topics: [
      "Strategic and tactical allocation",
      "Modern Portfolio Theory",
      "Efficient frontier",
      "Correlation and diversification",
      "Risk budgeting",
      "Rebalancing bands",
    ],
  },
];

export const courseDeliveryFormat = [
  "Concept",
  "Simple example",
  "Visual explanation",
  "Real-world application",
  "Calculation",
  "Case study",
  "Exercise",
  "Quiz",
  "Assignment",
  "Key takeaway",
] as const;

export function getModulesForLevel(level: CourseLevel) {
  const [start, end] = level.moduleRange;
  return courseCurriculum.filter(
    (courseModule) =>
      courseModule.moduleNumber >= start && courseModule.moduleNumber <= end,
  );
}

export function getCourseLevelForModule(moduleNumber: number) {
  return courseLevels.find(
    (level) =>
      moduleNumber >= level.moduleRange[0] &&
      moduleNumber <= level.moduleRange[1],
  );
}

export function createTopicSlug(topic: string) {
  return topic
    .normalize("NFKD")
    .toLowerCase()
    .replace(/₹/g, "rupees-")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTopicHref(courseModule: CourseModule, topic: string) {
  const level = getCourseLevelForModule(courseModule.moduleNumber);

  return `/research/${level?.id ?? "foundation"}/${courseModule.id}/${createTopicSlug(topic)}`;
}

export function getCourseTopicEntries(): CourseTopicEntry[] {
  return courseCurriculum.flatMap((courseModule) => {
    const level = getCourseLevelForModule(courseModule.moduleNumber);
    if (!level) return [];

    return courseModule.topics.map((topic, topicIndex) => ({
      level,
      courseModule,
      topic,
      topicIndex,
    }));
  });
}
