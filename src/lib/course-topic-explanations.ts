import type { CourseModule } from "@/lib/course-curriculum";
const topicExplanations: Record<string, string> = {
    "What is investing?": "Investing means committing money to productive assets with the expectation that they will generate income, appreciate in value, or help preserve purchasing power over time.",
    "Why investing is important": "Investing helps savings grow faster than inflation and gives long-term goals such as education, a home, and retirement a realistic funding plan.",
    "Inflation and purchasing power": "Inflation raises the cost of goods and services, so the same amount of money buys less over time. Investment returns should therefore be judged after considering inflation.",
    "Saving vs Investing": "Saving prioritises safety and near-term access to money, while investing accepts measured risk in pursuit of higher long-term growth. A sound plan uses both for different goals.",
    "Risk vs Reward": "Potential return generally rises with uncertainty and possible loss. The objective is not to avoid all risk, but to take only the risks a goal, time horizon, and investor can support.",
    "Time value of money": "Money available today can earn a return and is therefore worth more than the same nominal amount received later. Present value and future value make this trade-off measurable.",
    "Compounding (The 8th Wonder)": "Compounding occurs when returns begin earning further returns. Time, regular contributions, return, and uninterrupted participation all influence the final outcome.",
    "Financial goals and planning": "Financial planning converts ambitions into named goals with a target amount, deadline, priority, and suitable investment strategy.",
    "Emergency fund": "An emergency fund is a liquid reserve for unexpected expenses or income disruption. It prevents short-term shocks from forcing the sale of long-term investments.",
    "Wealth creation mindset": "A wealth-creation mindset favours patience, consistency, realistic expectations, controlled spending, and repeatable decisions over shortcuts or speculative promises.",
    "Money Market": "The money market enables short-term borrowing and lending through instruments such as treasury bills, commercial paper, and certificates of deposit.",
    "Capital Market": "The capital market channels longer-term finance through equity and debt securities, helping issuers raise capital and investors participate in economic activity.",
    "Primary Market": "The primary market is where securities are issued to investors for the first time, allowing governments or companies to raise fresh capital.",
    "Secondary Market": "The secondary market lets investors trade previously issued securities. Its liquidity and price discovery make entry and exit more practical.",
    "Retail Investors": "Retail investors are individuals investing their own money. Their goals, knowledge, time horizon, and capacity for loss should guide product selection.",
    "Institutional Investors": "Institutional investors manage large pools of money for organisations or beneficiaries and often influence liquidity, pricing, and governance in financial markets.",
    "Foreign Investors": "Foreign investors allocate capital across countries. Their flows can affect market liquidity, prices, and currency demand, while remaining sensitive to global risk and policy.",
    Regulators: "Regulators establish conduct, disclosure, prudential, and investor-protection rules so financial markets can operate with greater transparency and accountability.",
    Stocks: "A stock represents ownership in a company. Returns can come from price appreciation and distributions, while risks include business failure and market volatility.",
    Bonds: "A bond is a debt instrument through which an issuer borrows money and promises specified payments. Credit quality, interest rates, and maturity influence its value and risk.",
    Gold: "Gold is a scarce asset often used for diversification and perceived protection during uncertainty, but it produces no operating cash flow and can be volatile.",
    "Real Estate": "Real estate can provide use, rental income, and appreciation, but usually involves high transaction costs, concentration, maintenance, and limited liquidity.",
    "Fixed Deposits": "A fixed deposit places money with a bank for a stated period and interest rate. It prioritises predictability, although inflation, tax, and reinvestment risk still matter.",
    "Mutual Funds": "Mutual funds pool money from many investors into a professionally managed portfolio operated according to a documented investment mandate.",
    ETFs: "Exchange-traded funds are pooled portfolios whose units trade on an exchange. Their market price, liquidity, costs, and tracking quality all matter to investors.",
    REITs: "Real Estate Investment Trusts provide market-traded exposure to income-producing real estate without requiring direct ownership of individual properties.",
    INVITs: "Infrastructure Investment Trusts pool investor capital into eligible infrastructure assets and can distribute cash generated by those assets, subject to business and market risks.",
    "What is a Mutual Fund?": "A mutual fund pools investor money, issues units, and invests the combined corpus under a stated objective. Each investor participates proportionately through the units held.",
    "History of Mutual Funds": "The history of mutual funds shows how collective investing evolved from early trusts into regulated products offering professional management and broad public access.",
    "Mutual Fund Industry in India": "India's mutual-fund industry developed from the UTI era into a regulated ecosystem of AMCs, trustees, custodians, RTAs, distributors, and digital platforms.",
    "How Mutual Funds Work": "Investor money enters a scheme, units are allotted, and the fund manager deploys the corpus according to the mandate. Portfolio values then determine the scheme's NAV.",
    "Pooling of Money": "Pooling combines many smaller investments into one portfolio, improving diversification, access, scale, and operational efficiency.",
    "Net Asset Value (NAV)": "NAV is the per-unit value of a scheme after valuing its assets, subtracting liabilities and expenses, and dividing by units outstanding.",
    NAV: "Net Asset Value is the per-unit value of a mutual-fund scheme. A low NAV does not by itself make one fund cheaper or more attractive than another.",
    Units: "Units represent an investor's proportional ownership in a mutual-fund scheme. Their value changes with NAV and transactions add or remove units.",
    "Fund Corpus": "The fund corpus is the pool of investor capital available within a scheme, adjusted for subscriptions, redemptions, gains, losses, income, and expenses.",
    "AUM (Assets Under Management)": "AUM is the market value of assets managed by a fund or AMC. Size can affect costs and liquidity, but does not prove quality or future performance.",
    AUM: "Assets Under Management measures the value managed by a scheme or AMC. It should be interpreted alongside the category, strategy, liquidity, and portfolio quality.",
    "Fund House (AMC)": "An Asset Management Company operates mutual-fund schemes, employs investment teams, manages operations, and works within trustee and regulatory oversight.",
    Trustee: "The trustee oversees the mutual fund on behalf of unitholders and monitors whether the AMC acts within regulations and the scheme mandate.",
    Custodian: "The custodian safeguards portfolio securities, supports settlement, and maintains independent asset records instead of making investment decisions.",
    "Registrar (RTA)": "A Registrar and Transfer Agent maintains investor records and processes transactions, statements, service requests, and other folio-related operations.",
    Sponsor: "The sponsor establishes the mutual fund subject to eligibility and regulatory requirements, broadly resembling the promoter of the fund structure.",
    "SEBI regulations": "SEBI's mutual-fund framework governs scheme structure, disclosures, investment limits, valuation, conduct, and investor protection. Requirements can change, so current circulars matter.",
    AMFI: "AMFI is the Indian mutual-fund industry association. It supports standards, distributor registration, data publication, and investor education, while SEBI remains the regulator.",
    "Asset Management Company": "The AMC manages investments, research, risk, compliance, operations, and investor servicing for schemes under trustee and regulatory oversight.",
    "Fund Manager": "A fund manager makes portfolio decisions within the scheme mandate. Evaluation should consider process, team support, tenure, risk discipline, and repeatability—not reputation alone.",
    Auditors: "Auditors independently examine financial statements and controls, helping identify whether records and reporting fairly reflect the scheme's affairs.",
    Distributors: "Mutual-fund distributors help investors access and understand products and may receive commissions under regular plans. Distribution is distinct from fiduciary investment advice.",
    RTA: "The RTA maintains folio and transaction records, processes service requests, and provides operational infrastructure to mutual funds and investors.",
    Investor: "The investor owns units and is responsible for aligning each investment with personal goals, time horizon, liquidity needs, risk capacity, and product understanding.",
    "Large Cap": "Large-cap funds predominantly invest in the largest listed companies under SEBI's market-cap classification. They still carry equity risk despite generally mature underlying businesses.",
    "Mid Cap": "Mid-cap funds focus on companies between the large- and small-cap bands. They may offer stronger growth potential with higher volatility and business risk.",
    "Small Cap": "Small-cap funds invest mainly beyond the large- and mid-cap universe. Liquidity, governance, valuation, and drawdown risks can be materially higher.",
    "Multi Cap": "Multi-cap funds maintain prescribed exposure across large-, mid-, and small-cap stocks, providing structural diversification across company sizes.",
    "Flexi Cap": "Flexi-cap funds allow the manager to shift among market-cap segments without fixed minimum allocations to each segment, subject to the scheme mandate.",
    ELSS: "An Equity Linked Savings Scheme is an equity-oriented mutual fund with tax-related eligibility and a statutory lock-in. Suitability depends on both the equity risk and current tax rules.",
    "Focused Fund": "A focused fund holds a limited number of stocks, producing a more concentrated portfolio where individual security choices have greater impact.",
    "Sector Funds": "Sector funds invest in one industry or economic segment. Their concentration makes performance highly dependent on that sector's cycle and valuations.",
    "Thematic Funds": "Thematic funds invest across businesses connected to an idea or trend. Theme definitions can be broad, so investors should inspect holdings and overlap carefully.",
    "Value Fund": "A value fund seeks securities considered inexpensive relative to fundamentals. Returns depend on the analysis being correct and the market eventually recognising that value.",
    "Contra Fund": "A contra fund deliberately takes positions that differ from prevailing market preference, requiring patience while an unpopular thesis develops.",
    "Dividend Yield Fund": "A dividend-yield fund emphasises companies with meaningful dividend yields, but dividends are neither fixed nor a substitute for analysing business quality.",
    "Liquid Fund": "A liquid fund invests in very short-maturity debt and money-market instruments. It aims for liquidity and low interest-rate risk, but is not risk-free.",
    "Overnight Fund": "An overnight fund invests in securities maturing in one day, minimising duration risk while still remaining a market-linked mutual-fund product.",
    "Ultra Short Duration": "Ultra-short-duration funds hold short-duration debt portfolios. Credit quality, liquidity, and small NAV fluctuations still need evaluation.",
    "Low Duration": "Low-duration funds target a limited portfolio duration and sit between liquid/ultra-short funds and longer-duration debt categories.",
    "Short Duration": "Short-duration funds invest within a prescribed duration band. Their values respond to both interest-rate changes and issuer credit conditions.",
    "Medium Duration": "Medium-duration funds carry greater interest-rate sensitivity than short-duration categories and may use portfolio adjustments to maintain their mandated duration range.",
    "Long Duration": "Long-duration funds hold high interest-rate sensitivity, so NAVs can rise or fall substantially when market yields change.",
    "Corporate Bond Fund": "Corporate-bond funds maintain substantial exposure to higher-rated corporate debt. Credit spreads, issuer concentration, and duration remain important.",
    "Banking & PSU Fund": "Banking and PSU funds invest mainly in debt issued by banks, public-sector undertakings, and specified institutions, combining sector concentration with credit and rate risk.",
    "Credit Risk Fund": "Credit-risk funds take meaningful exposure below the highest credit-quality tiers in pursuit of additional yield, increasing downgrade, default, and liquidity risk.",
    "Dynamic Bond Fund": "Dynamic-bond funds allow the manager to change duration based on the interest-rate outlook. Results depend heavily on rate-cycle decisions and execution.",
    "Gilt Fund": "Gilt funds invest mainly in government securities, reducing corporate default risk but retaining potentially significant interest-rate and duration risk.",
    "Aggressive Hybrid": "Aggressive-hybrid funds combine a larger equity allocation with debt. They can reduce but do not remove equity-market volatility.",
    "Conservative Hybrid": "Conservative-hybrid funds hold mainly debt with a smaller equity allocation, introducing some growth potential alongside credit and rate risks.",
    "Balanced Advantage": "Balanced-advantage funds vary equity and debt exposure using a stated allocation process, often linked to valuations or market conditions.",
    "Dynamic Asset Allocation": "Dynamic asset allocation changes the mix of asset classes as valuations, risk, or market conditions evolve rather than maintaining one fixed mix.",
    "Multi Asset": "Multi-asset funds combine multiple asset classes such as equity, debt, and commodities to diversify return drivers within one scheme.",
    "Arbitrage Fund": "Arbitrage funds seek price differences between related cash and derivative positions. Returns depend on available spreads, costs, and execution rather than directional equity calls.",
    "Equity Savings": "Equity-savings funds combine unhedged equity, arbitrage positions, and debt. Investors should look through the label to understand effective market exposure.",
    "Life Cycle Fund": "A Life Cycle Fund follows a dated path that generally reduces growth-asset exposure as maturity approaches. Current SEBI rules define its asset-allocation ranges and naming framework.",
    "Retirement Fund": "A retirement fund is goal-oriented and may include lock-in or age-linked conditions. The portfolio still needs to match the investor's retirement horizon and withdrawal plan.",
    "Children's Fund": "A children's fund is designed around long-dated child-related goals and may include lock-in conditions. The label does not replace goal-corpus and risk analysis.",
    "Index Fund": "An index fund seeks to replicate a stated index through a mutual-fund structure. Tracking difference, expenses, portfolio replication, and index design drive results.",
    ETF: "An ETF tracks a basket or strategy while trading on an exchange. Investors should evaluate the index, tracking difference, bid-ask spread, liquidity, and total costs.",
    "International Funds": "International funds provide exposure outside India, adding geographic and currency diversification along with country, market, tax, and regulatory risks.",
    "Expense Ratio": "The expense ratio is the recurring cost charged to the scheme's assets. Even small annual differences can compound into meaningful long-term outcome differences.",
    "Exit Load": "An exit load is a scheme-defined charge on certain redemptions within a specified period. It is separate from taxation and should be checked before investing or redeeming.",
    "Entry Load": "Entry load was a charge applied when investing. Mutual funds in India do not currently levy entry load, but investors should still understand transaction and distribution costs.",
    "Tracking Error": "Tracking error measures the variability of a passive fund's return difference versus its benchmark; tracking difference measures the actual return gap over a period.",
    Alpha: "Alpha estimates return beyond what a chosen risk model or benchmark would imply. It depends on the measurement period and benchmark and is not proof of repeatable skill.",
    Beta: "Beta estimates how sensitively a fund has moved relative to a benchmark. It describes historical co-movement, not maximum loss or future behaviour.",
    "Standard Deviation": "Standard deviation summarises how widely periodic returns have varied around their average. It measures volatility in both directions, not every form of risk.",
    "Sharpe Ratio": "The Sharpe ratio compares excess return with total volatility. It is most useful when comparing similar strategies over consistent periods and assumptions.",
    "Sortino Ratio": "The Sortino ratio compares excess return with downside deviation, focusing the risk measure on returns below a chosen threshold.",
    "Treynor Ratio": "The Treynor ratio relates excess return to beta, making it more relevant when evaluating a diversified portfolio's systematic risk.",
    "Jensen Alpha": "Jensen alpha estimates performance above or below the return predicted by a market-risk model. Its usefulness depends on model and benchmark quality.",
    "Portfolio Turnover": "Portfolio turnover indicates how actively holdings are bought and sold. High turnover may reflect the strategy but can also affect costs and tax efficiency.",
    Benchmark: "A benchmark is the reference index used to evaluate a scheme's mandate, risk, and performance. It should represent the fund's actual investment universe and style.",
    SIP: "A Systematic Investment Plan schedules recurring mutual-fund purchases. It creates contribution discipline but does not guarantee profit or remove market risk.",
    STP: "A Systematic Transfer Plan moves specified amounts between schemes of the same fund house on a schedule. Each transfer may involve redemption, loads, and tax consequences.",
    SWP: "A Systematic Withdrawal Plan redeems units periodically to create cash flow. Sustainability depends on returns, withdrawal rate, sequence risk, tax, and portfolio mix.",
    CAGR: "Compound Annual Growth Rate converts a start and end value into a smoothed annual rate. It ignores interim cash flows and the path taken between those dates.",
    XIRR: "XIRR estimates an annualised return when cash flows occur on irregular dates, making it useful for SIPs, withdrawals, and portfolios with multiple transactions.",
    "Rolling Returns": "Rolling returns calculate many overlapping holding periods, revealing consistency and the range of investor experiences better than one selected start and end date.",
    "Market Risk": "Market risk is the possibility that broad price movements reduce portfolio value. Diversification can reduce security-specific risk but cannot eliminate market-wide declines.",
    "Credit Risk": "Credit risk is the possibility that an issuer is downgraded, delays payment, or defaults, potentially reducing a debt security's value and liquidity.",
    "Interest Rate Risk": "Interest-rate risk is the sensitivity of bond prices to changing yields. Longer duration generally produces larger price changes for a similar movement in rates.",
    "Liquidity Risk": "Liquidity risk arises when a security cannot be sold quickly near its assessed value, which can amplify losses or complicate redemptions during stressed markets.",
    "Concentration Risk": "Concentration risk occurs when a portfolio depends heavily on a few securities, sectors, issuers, styles, or themes.",
    "Currency Risk": "Currency risk is the effect of exchange-rate movements on foreign assets and liabilities. It can add to or offset the underlying investment return.",
    "Inflation Risk": "Inflation risk is the chance that investment growth fails to preserve purchasing power, even when the nominal value of the investment rises.",
    Volatility: "Volatility describes the frequency and magnitude of price or return fluctuations. It affects the investor experience but is not identical to permanent capital loss.",
    Drawdown: "Drawdown measures the decline from a previous portfolio peak to a subsequent low, helping investors understand the depth of historical losses.",
    "Risk Profiling": "Risk profiling combines willingness to take risk, financial capacity for loss, investment knowledge, goal importance, and time horizon.",
    "Absolute Return": "Absolute return is the percentage gain or loss over the full measurement period without adjusting for how long the investment was held.",
    "Annualized Return": "Annualised return expresses performance as an equivalent yearly rate, making periods of different lengths easier to compare.",
    "Point to Point Return": "Point-to-point return measures performance between one chosen start date and end date. It can be highly sensitive to those dates.",
    "Rolling Return": "Rolling return repeats the same holding-period calculation across many start dates, showing consistency, dispersion, and difficult investor windows.",
    "Calendar Return": "Calendar return measures performance during a fixed calendar year, which helps year-by-year comparison but may not match an investor's holding period.",
    "Risk Adjusted Return": "Risk-adjusted return evaluates performance relative to the risk taken, helping distinguish a smoother process from one that achieved similar returns with larger fluctuations.",
    "Scheme Information Document (SID)": "The SID describes a scheme's objective, asset allocation, strategy, risks, fees, benchmark, and operating rules. It is a primary source for understanding what a scheme may do.",
    "Key Information Memorandum (KIM)": "The KIM is a concise scheme summary covering essential features, risks, costs, and application information, but it should be read with the full scheme documents.",
    "Statement of Additional Information (SAI)": "The SAI contains fund-house-level legal, governance, operational, and service information that applies across schemes.",
    Factsheet: "A fund factsheet provides a periodic snapshot of performance, holdings, allocation, risk statistics, and portfolio characteristics. It should be read across multiple periods.",
    "Portfolio Disclosure": "Portfolio disclosure lists scheme holdings and weights, allowing investors to examine concentration, sector exposure, credit quality, maturity, and overlap.",
    "Annual Report": "The annual report provides audited financial and operational information, including statements, notes, expenses, and material disclosures for the scheme or fund.",
    "AMC Reputation": "AMC reputation is a starting point for due diligence, not a selection rule. Governance, investment process, risk controls, communication, and treatment of investors matter more.",
    Consistency: "Consistency evaluates how reliably a fund follows its mandate and performs across different market environments rather than in one exceptional period.",
    Performance: "Performance should be assessed across suitable horizons, rolling periods, market cycles, benchmarks, peers, risk, and costs—not just the highest trailing return.",
    "Risk Metrics": "Risk metrics quantify selected dimensions such as volatility, beta, drawdown, downside deviation, duration, and credit exposure. No single metric captures all risk.",
    "Portfolio Quality": "Portfolio quality examines the durability, finances, valuation, governance, creditworthiness, and liquidity of the securities actually held by a fund.",
    "Portfolio Concentration": "Portfolio concentration measures how much outcomes depend on the largest holdings, sectors, issuers, or themes.",
    "Benchmark Comparison": "Benchmark comparison asks whether a fund delivered an appropriate outcome relative to a relevant index after considering risk, style, cost, and consistency.",
    "Peer Comparison": "Peer comparison evaluates funds with genuinely similar mandates. Comparing unlike categories can produce misleading conclusions.",
    "Downside Protection": "Downside protection describes how a fund behaved during weak markets. Smaller declines can help compounding, but past protection may not repeat.",
    "Asset Allocation": "Asset allocation divides capital among asset classes according to goals, horizon, liquidity, and risk. It is often a larger driver of portfolio behaviour than individual fund selection.",
    Diversification: "Diversification spreads exposure across different return drivers so one adverse event has less influence. Adding many similar funds does not create meaningful diversification.",
    Correlation: "Correlation measures how two return series have moved together. It can help portfolio construction but may change during stressed markets.",
    Rebalancing: "Rebalancing restores a portfolio toward its target allocation by buying or selling assets, imposing discipline while considering tax, loads, costs, and tolerance bands.",
    "Portfolio Overlap": "Portfolio overlap measures repeated holdings across funds. High overlap can create hidden concentration despite owning several schemes.",
    "Portfolio Risk": "Portfolio risk combines the risk of individual holdings with their weights and relationships, including concentration, correlation, liquidity, credit, and market exposure.",
    "Portfolio Return": "Portfolio return reflects the weighted performance of holdings and cash flows after costs. XIRR may be appropriate when investor transactions occur on different dates.",
    "Concentration Analysis": "Concentration analysis identifies dependence on top securities, issuers, sectors, market caps, styles, countries, and fund managers.",
    "What is SIP?": "A SIP is an instruction to invest a fixed or defined amount at recurring intervals. It automates contributions but does not assure a return.",
    "How SIP Works": "Each SIP instalment purchases units at the applicable NAV, so the number of units varies with market prices while contributions continue on schedule.",
    "Power of SIP": "The practical power of a SIP comes from regular saving, long participation, and compounding—not from any guarantee that every instalment will be profitable.",
    "SIP vs Lump Sum": "SIP staggers deployment while lump sum invests available capital immediately. The choice depends on cash availability, asset allocation, risk tolerance, and implementation discipline.",
    "Step-up SIP": "A step-up SIP increases the contribution periodically, helping investment growth keep pace with rising income, inflation, and larger future goals.",
    "Goal-based SIP": "A goal-based SIP derives the contribution from a target amount, time horizon, existing corpus, and prudent return assumption, then reviews progress periodically.",
    "SIP during Market Crash": "Continuing a suitable long-term SIP through a crash buys more units at lower NAVs, but only investors with adequate emergency reserves and risk capacity should rely on this discipline.",
    "SIP Myths": "Common myths include believing SIPs cannot lose money, always outperform lump sum, or remove the need for fund and goal review.",
    "When to invest": "Investment timing should begin with goal readiness, emergency reserves, asset allocation, and product suitability rather than a short-term market forecast.",
    "Valuation-based investing": "Valuation-based investing adjusts deployment based on how expensive assets appear relative to fundamentals or history, while accepting that valuation is not a precise timing tool.",
    "Market timing myths": "Consistently predicting market peaks and bottoms requires multiple correct decisions. A strategic allocation and staged process are generally more repeatable.",
    "STP strategy": "An STP can gradually move a lump sum from one scheme to another, reducing entry-timing concentration while creating redemption, load, and tax events.",
    "Asset allocation before lump sum": "Before deploying a lump sum, determine how much belongs in each asset class so a large cash balance does not unintentionally create excessive risk.",
    "Core-Satellite Portfolio": "A core-satellite portfolio combines a diversified, lower-maintenance core with smaller active or specialised allocations intended to add a distinct return source.",
    "Factor Investing": "Factor investing targets systematic characteristics such as value, quality, momentum, size, or low volatility using transparent selection and weighting rules.",
    "Smart Beta": "Smart-beta strategies follow rules other than traditional market-cap weighting. Their factor exposure, construction method, turnover, and cycles require careful analysis.",
    "Tactical Asset Allocation": "Tactical allocation temporarily deviates from long-term targets based on valuations or conditions. It introduces timing and governance risk and needs preset limits.",
    "Value Averaging": "Value averaging changes contributions to keep a portfolio on a target value path, often requiring larger investments after declines and smaller ones after gains.",
    "Goal-Based Investing": "Goal-based investing gives each pool of money a purpose, deadline, target corpus, and suitable risk path instead of managing all wealth as one undifferentiated portfolio.",
    "Bucket Strategy": "A bucket strategy separates near-term spending from medium- and long-term growth assets, reducing the need to sell volatile holdings for immediate cash flow.",
    "Glide Path": "A glide path gradually changes asset allocation as a goal approaches, usually reducing dependence on volatile growth assets near the spending date.",
    "Equity Fund Taxation": "Equity-fund tax treatment depends on whether a scheme meets the legal equity-oriented definition, the holding period, transaction date, and applicable law at redemption.",
    "Debt-Oriented Fund Taxation (current rules)": "Debt-fund tax treatment depends on asset composition, acquisition date, and current provisions such as Section 50AA for specified mutual funds. It must be checked at the time of action.",
    "Hybrid Fund Taxation": "A hybrid fund's tax classification follows its qualifying asset composition rather than the word hybrid alone, so investors must verify the scheme's current classification.",
    "Capital Gains": "Capital gain is broadly the taxable difference arising when units are transferred or redeemed after adjusting for permitted acquisition and transfer costs under applicable law.",
    "Short-Term Capital Gains (STCG)": "STCG is a tax classification based on the asset and applicable holding-period rules. The rate and treatment depend on current law and the scheme's classification.",
    "Long-Term Capital Gains (LTCG)": "LTCG applies when the relevant statutory holding-period condition is met. Exemptions, thresholds, rates, and indexation treatment can change with tax law.",
    "Dividend Taxation": "IDCW distributions can create taxable income for the investor under applicable rules and also reduce the scheme's NAV by the distribution and associated effects.",
    "Tax Harvesting": "Tax harvesting realises selected gains or losses to use available tax provisions while preserving portfolio intent and respecting costs, rules, and reinvestment risk.",
    "ELSS Tax Benefits": "ELSS may qualify under the prevailing tax regime and statutory conditions, but the tax deduction, lock-in, equity risk, and investor's chosen regime must all be checked.",
    "TDS Rules (where applicable)": "Tax may be deducted at source for specified mutual-fund payments or investor categories. Applicability can differ for residents and non-residents and is not the final tax liability.",
    "Resident vs NRI tax considerations": "NRI investing can involve different withholding, remittance, account, treaty, and documentation rules. Residency and transaction-specific professional advice are important.",
    "Retirement Corpus Calculation": "Retirement-corpus calculation estimates future expenses after inflation, retirement length, expected returns, other income, and a safety margin.",
    "SWP Strategy": "An SWP strategy coordinates periodic unit redemptions with asset allocation, cash buckets, tax, and rebalancing to support retirement income.",
    "Safe Withdrawal Rate": "A safe withdrawal rate is a planning estimate, not a guarantee. It depends on horizon, asset mix, inflation, fees, taxes, and the sequence of returns.",
    "Inflation Impact": "Inflation raises future spending and erodes the real value of fixed income, making inflation assumptions central to retirement and goal planning.",
    "Asset Allocation by Age": "Age can inform allocation, but goals, income stability, liabilities, liquidity, and capacity for loss are more useful than a one-size-fits-all age formula.",
    "Child Education": "Education planning estimates the future inflation-adjusted cost, separates fixed deadlines from flexible choices, and reduces portfolio risk as payment dates approach.",
    Marriage: "A marriage goal should have a defined budget, date, priority, and inflation assumption so it does not unintentionally compromise essential goals.",
    "House Purchase": "House-purchase planning separates the down payment and transaction costs from the loan decision and uses lower-risk assets as the purchase date nears.",
    "Car Purchase": "A car goal balances the purchase amount, timing, depreciation, financing cost, and impact on other financial priorities.",
    Vacation: "A vacation is usually a short- or medium-term discretionary goal, so liquidity and capital stability can matter more than pursuing high returns.",
    Retirement: "Retirement planning coordinates living costs, inflation, longevity, health needs, asset allocation, income sources, and an adaptive withdrawal process.",
    "Wealth Creation": "Wealth creation is the long-term result of earning, saving, owning productive assets, controlling costs and taxes, and avoiding unrecoverable risks.",
    "Fear & Greed": "Fear can drive panic selling while greed can encourage excessive risk. Written allocation and rebalancing rules reduce dependence on either emotion.",
    "Loss Aversion": "Loss aversion causes losses to feel more powerful than equivalent gains, sometimes leading investors to avoid suitable risk or hold poor investments to escape admitting a loss.",
    "Confirmation Bias": "Confirmation bias makes investors favour evidence supporting an existing belief and dismiss contradictory information. A structured review should actively test the opposite case.",
    "Herd Mentality": "Herd mentality means following popular behaviour without independent suitability analysis, often increasing exposure after prices and narratives have already become crowded.",
    "Recency Bias": "Recency bias gives recent returns too much weight, encouraging investors to extrapolate a short period into the future.",
    Overconfidence: "Overconfidence leads investors to overestimate knowledge, forecasting ability, or control, often resulting in concentration, excessive trading, or weak diversification.",
    "Emotional Investing": "Emotional investing lets temporary excitement or anxiety override a long-term plan. Checklists, automation, and scheduled reviews can improve discipline.",
    "Direct vs Regular Plans": "Direct and regular plans share the same scheme portfolio and manager but have different expense structures because regular plans include distribution costs.",
    "Growth vs IDCW (Income Distribution cum Capital Withdrawal)": "Growth retains distributable value within the scheme, while IDCW may distribute amounts subject to availability and approval. IDCW is not assured interest and reduces NAV when paid.",
    "Online Investment Platforms": "Online platforms provide transaction and reporting infrastructure. Investors should understand whether the platform offers direct or regular plans, how it is regulated, and how data is handled.",
    "Demat vs Non-Demat Holding": "Mutual-fund units may be held through a demat account or directly in AMC/RTA folios. Costs, nomination, transmission, statements, and service workflows differ.",
    Nomination: "Nomination records who may claim assets after the holder's death, simplifying transmission but not necessarily overriding all succession law.",
    "KYC Process": "Know Your Customer procedures verify identity, address, and related information before financial transactions, supporting regulatory and anti-money-laundering controls.",
    "e-KYC": "Electronic KYC completes eligible identity verification digitally, subject to the permitted method, validation status, and transaction conditions.",
    "PAN Linking": "PAN links tax identity to financial records and must have the required status and matching information for compliant investing and reporting.",
    "FATCA/CRS Compliance": "FATCA and CRS declarations help identify tax residency and reportable accounts under international information-sharing frameworks.",
    "Reading a factsheet": "This exercise reads the mandate, benchmark, returns, risk statistics, portfolio, costs, and commentary together instead of treating the return table as the whole analysis.",
    "Comparing two funds": "A fair comparison first confirms that both funds share a comparable category and mandate, then evaluates process, holdings, risk, consistency, costs, and portfolio fit.",
    "Analyzing portfolio holdings": "Holdings analysis examines what the fund actually owns, including top positions, valuation, quality, liquidity, turnover, and changes over time.",
    "Evaluating sector allocation": "Sector analysis compares weights with the benchmark and peer group to identify deliberate bets, hidden concentration, and sensitivity to economic cycles.",
    "Checking rolling returns": "This exercise calculates repeated holding-period returns to assess consistency, downside windows, median outcomes, and dependence on one start date.",
    "Assessing risk metrics": "Risk assessment combines volatility, drawdown, downside measures, beta, concentration, and category-specific risks instead of relying on one ratio.",
    "Benchmark comparison": "This practical comparison uses a relevant benchmark and consistent periods to assess return, risk, style, and tracking after costs.",
    "Evaluating fund manager performance": "Manager evaluation examines process, decisions, attribution, mandate adherence, team support, tenure, and behaviour across full market cycles.",
    "Beginner Portfolio": "A beginner model prioritises simplicity, broad diversification, understandable funds, adequate liquidity, and a review process the investor can follow.",
    "Conservative Portfolio": "A conservative model emphasises capital stability and liquidity while accepting that low volatility does not eliminate credit, rate, or inflation risk.",
    "Moderate Portfolio": "A moderate model balances growth and stability through diversified equity and high-quality debt aligned with a medium-to-long horizon.",
    "Aggressive Portfolio": "An aggressive model carries substantial growth-asset exposure and requires a long horizon, strong capacity for loss, and tolerance for deep drawdowns.",
    "Retirement Portfolio": "A retirement model combines near-term spending reserves with income and growth assets to manage inflation, longevity, and sequence-of-returns risk.",
    "Child Education Portfolio": "An education model aligns investments to fixed payment dates and progressively reduces risk as each tuition requirement approaches.",
    "Passive Portfolio": "A passive model uses index-tracking funds as core holdings, focusing on asset allocation, index choice, tracking quality, costs, and disciplined rebalancing.",
    "₹10 lakh Portfolio": "This blueprint demonstrates how to allocate a ₹10 lakh corpus by goal and risk without letting the number of available funds create unnecessary complexity.",
    "₹50 lakh Portfolio": "This blueprint shows how a larger corpus can be separated into goal buckets while controlling overlap, tax, liquidity, and concentration.",
    "₹1 crore Portfolio": "This blueprint treats ₹1 crore as a collection of goal liabilities rather than a status number, with explicit allocation, implementation, and review rules.",
    "Chasing past returns": "Buying recent winners assumes a temporary period will repeat and often leads to entering after valuations, style exposure, or risk have already changed.",
    "Too many funds": "Owning many funds can duplicate the same holdings, dilute conviction, increase monitoring, and create index-like exposure at higher complexity.",
    "Ignoring asset allocation": "Fund selection cannot compensate for an unsuitable equity, debt, and cash mix. Allocation should be decided before choosing individual schemes.",
    "Panic selling": "Panic selling converts a temporary decline into a realised outcome and can derail long-term goals. Emergency reserves and preset review rules help prevent it.",
    "Timing the market": "Market timing requires correctly deciding when to exit and when to return. Missing a small number of strong recovery days can materially affect outcomes.",
    "Ignoring costs": "Expense ratios, spreads, loads, tax, and turnover reduce what the investor keeps, and their effect compounds over long holding periods.",
    "Frequent switching": "Frequent switching can turn normal underperformance into repeated costs and poor timing. A fund should be replaced for a documented process or portfolio reason.",
    "Investing without goals": "Without goals, there is no objective way to choose risk, horizon, allocation, contribution, or when the investment has succeeded.",
    "Passive vs Active Funds": "Passive funds seek index-like returns before costs, while active funds make security or allocation decisions to differ from a benchmark. The right comparison includes process, risk, fees, and consistency.",
    "International Diversification": "International diversification adds exposure to economies, currencies, sectors, and businesses not fully represented in India, while introducing additional tax and regulatory complexity.",
    "ESG Funds": "ESG funds apply environmental, social, and governance criteria, but definitions, exclusions, data quality, portfolio concentration, and style exposure vary widely.",
    "Smart Beta ETFs": "Smart-beta ETFs track rules-based non-market-cap indices. Investors should understand the targeted factor, weighting, rebalancing, turnover, and expected periods of underperformance.",
    "Fund-of-Funds": "A fund of funds invests in other funds, offering packaged diversification or access while potentially adding another layer of expenses and tax considerations.",
    "Fund Mergers": "A scheme merger can change the mandate, benchmark, costs, holdings, or tax position. Investors should read the communication and reassess suitability.",
    "Scheme Categorization (SEBI)": "SEBI scheme categorisation standardises broad labels and characteristics so investors can compare similar mandates. The framework can be revised, so current circulars govern.",
    "Portfolio Rebalancing Techniques": "Rebalancing can use calendar dates, tolerance bands, new cash flows, or risk triggers. The chosen method should balance discipline with tax and transaction costs.",
    "Macro-economic Impact on Funds": "Growth, inflation, liquidity, policy, rates, currency, and credit conditions affect different assets and sectors in different ways; macro views should inform, not dominate, portfolio design.",
    "Interest Rate Cycles and Debt Funds": "Debt-fund returns respond to starting yield, duration, curve changes, credit spreads, and defaults. Different categories behave differently through a rate cycle.",
    "Using AMFI data": "AMFI publishes industry information such as NAVs, scheme and category data, and investor resources that can support verification and analysis.",
    "Understanding SEBI disclosures": "SEBI-mandated disclosures provide standardised information about scheme risk, holdings, costs, performance, and operations; current circulars define what must be reported.",
    "Fund Factsheets": "Factsheets are recurring source documents for portfolio and performance review. A useful workflow archives several periods and checks changes rather than one snapshot.",
    "Financial calculators": "Financial calculators translate assumptions into estimates, but their output is only as reliable as the cash flows, inflation, return, tax, and timing assumptions entered.",
    "SIP calculators": "SIP calculators estimate future value from recurring contributions and an assumed return. They illustrate scenarios rather than guarantee results.",
    "XIRR calculators": "XIRR calculators estimate annualised performance from dated cash flows, making complete and correctly signed transaction data essential.",
    "Goal planners": "Goal planners connect a future target with inflation, time, existing assets, and expected return to estimate the required contribution and review path.",
    "Portfolio trackers": "Portfolio trackers consolidate holdings, transactions, allocation, returns, and goals, but users should verify calculations, privacy, and data completeness.",
    "Rebalancing spreadsheets": "A rebalancing sheet compares current and target weights, calculates required trades or cash flows, and records the decision for consistent future reviews.",
};
const caseStudyExplanations: Record<string, string> = {
    "SIP over 20 years": "This case follows contributions, difficult markets, compounding, inflation, and investor behaviour across a full 20-year SIP journey.",
    "Market crash recovery (e.g., 2008, 2020)": "This case examines drawdown, recovery time, allocation, rebalancing, and the consequences of staying invested versus panic selling during major crashes.",
    "ELSS investment journey": "This case connects ELSS contributions, lock-in, market risk, tax eligibility, redemption choices, and long-term goal suitability.",
    "Retirement planning case study": "This case builds a retirement plan from expenses and inflation through corpus, allocation, withdrawal, tax, and annual review.",
    "Wealth creation examples": "These examples compare how savings rate, time, asset mix, cost, tax, and behaviour influence long-term wealth outcomes.",
    "Portfolio review examples": "These examples show how to diagnose drift, overlap, unsuitable funds, goal gaps, and risk before deciding whether any change is necessary.",
};
export const courseReferenceSources = [
    {
        title: "SEBI Investor — Understanding Mutual Funds",
        href: "https://investor.sebi.gov.in/understanding_mf.html",
        description: "Official investor-education guide to mutual-fund structure, benefits, and disclosures",
    },
    {
        title: "AMFI — Investor Knowledge Centre",
        href: "https://www.amfiindia.com/investor",
        description: "Fund types, costs, risks, disclosures, and investor services",
    },
    {
        title: "SEBI Master Circular for Mutual Funds — March 2026",
        href: "https://www.sebi.gov.in/sebi_data/attachdocs/mar-2026/1774024028162.pdf",
        description: "Current scheme, disclosure, and operating framework",
    },
    {
        title: "Income Tax Department — Capital Gains",
        href: "https://www.incometaxindia.gov.in/w/capital-gain",
        description: "Official capital-gains guidance and Section 50AA context",
    },
    {
        title: "AMFI — Direct and Regular Plans",
        href: "https://www.amfiindia.com/investor/knowledge-center-info?zoneName=DirectPlan",
        description: "Official investor explanation of plan structures and costs",
    },
] as const;
function buildModuleSpecificExplanation(courseModule: CourseModule, topic: string) {
    switch (courseModule.moduleNumber) {
        case 23:
            return (caseStudyExplanations[topic] ??
                `This case study uses ${topic.toLowerCase()} to connect investment decisions with measurable outcomes, trade-offs, and investor behaviour.`);
        case 26:
            return `${topic} is a required capstone step. The learner must document assumptions, show the supporting analysis, explain trade-offs, and connect the decision to the investor's goals and risk profile.`;
        case 21:
            return `${topic} is a model-portfolio exercise that translates a stated investor profile or goal into asset allocation, fund roles, implementation limits, and review rules.`;
        case 20:
            return `${topic} is a hands-on research exercise. The learner collects the relevant source data, performs the comparison, records observations, and explains what the result means for portfolio suitability.`;
        default:
            return `${topic} is studied within ${courseModule.title.toLowerCase()} to understand what it means, how it works, which risks or assumptions matter, and how it affects a practical mutual-fund decision.`;
    }
}
export function getTopicExplanation(courseModule: CourseModule, topic: string) {
    return (topicExplanations[topic] ??
        caseStudyExplanations[topic] ??
        buildModuleSpecificExplanation(courseModule, topic));
}
export type CourseTopicLesson = {
    explanation: string;
    detailedExplanation: string[];
    conceptBreakdown: Array<{
        title: string;
        description: string;
    }>;
    whyItMatters: string;
    practicalApplication: string;
    watchOutFor: string;
    learningObjectives: string[];
    evaluationSteps: string[];
    reviewTable: Array<{
        dimension: string;
        question: string;
        evidence: string;
    }>;
    commonMistakes: string[];
    workedExample: string;
    keyTakeaways: string[];
};
const practicalApplications: Record<number, string> = {
    1: "Connect this concept to one personal goal. Write the goal amount, deadline, current savings, and the role this concept plays in the plan.",
    2: "Place this concept on a simple market map showing the issuer, investor, intermediary, regulator, source of return, liquidity, and main risk.",
    3: "Trace how this concept appears from the moment an investor submits money through unit allotment, portfolio valuation, NAV movement, and eventual redemption.",
    4: "Add this participant or rule to a mutual-fund ecosystem diagram and record who appoints it, what it controls, and how it protects investors.",
    5: "Compare this category's mandate, eligible assets, risk drivers, ideal horizon, liquidity, and role against one neighbouring fund category before considering a product.",
    6: "Find this term in a current factsheet or scheme document, record its value or definition, and explain what it does—and does not—tell an investor.",
    7: "Identify where this risk enters a sample portfolio, estimate its likely effect, and list the controls that can reduce exposure without assuming it disappears.",
    8: "Calculate or locate this return measure for consistent periods, then compare it with the benchmark and another fund in the same category.",
    9: "Open the relevant source document, find this disclosure, note its reporting date, and record the decision it helps an investor make.",
    10: "Use this criterion in a written fund-selection scorecard, define the evidence required, and prevent one attractive number from deciding the outcome.",
    11: "Measure this feature across the complete portfolio rather than one fund, then compare the result with the investor's target allocation and risk limits.",
    12: "Model this SIP concept using a goal amount, contribution, horizon, and conservative return assumption; then stress-test a weaker outcome.",
    13: "Apply this idea to a hypothetical lump sum and document the target allocation, deployment schedule, tax effects, and conditions that would change the plan.",
    14: "Write a rule for when this strategy may be used, its maximum allocation, benchmark, review date, and the evidence required before changing course.",
    15: "Test this topic against a sample transaction using the scheme classification, purchase date, redemption date, investor residency, and current official tax provisions.",
    16: "Insert this concept into a retirement worksheet covering expenses, inflation, corpus, asset allocation, cash-flow needs, and review assumptions.",
    17: "Create a goal card with the future cost, deadline, existing assets, required contribution, allocation path, and the role this topic plays.",
    18: "Write a pre-commitment rule that would reduce this behavioural error during a sharp gain, loss, or period of popular market excitement.",
    19: "Compare how this operational choice changes cost, ownership records, service, tax documentation, nomination, and the steps required to transact.",
    20: "Complete the analysis with actual source documents, show the calculation or comparison, and write a conclusion that separates evidence from opinion.",
    21: "Build the relevant model allocation, assign a clear role to every holding, set concentration limits, and define when the model must be rebalanced.",
    22: "Audit a sample portfolio for this mistake, quantify its cost or risk where possible, and replace it with a repeatable decision rule.",
    23: "Work through the case chronologically, identify each decision point, compare the available alternatives, and record the lesson without hindsight bias.",
    24: "Evaluate this advanced concept through its methodology, expected return driver, failure conditions, cost, benchmark, and interaction with the existing portfolio.",
    25: "Use this resource or tool with a sample portfolio, verify one output independently, and document its data source, assumptions, and limitations.",
    26: "Include this step in the final written plan with supporting calculations, explicit assumptions, implementation instructions, and a scheduled review trigger.",
};
const categoryLessons: Record<CourseModule["category"], {
    why: string;
    caution: string;
    action: string;
}> = {
    Theory: {
        why: "A correct foundation prevents later decisions from being built on misleading shortcuts. This concept supplies vocabulary and reasoning used throughout the remaining course.",
        caution: "Do not treat a simplified definition as the whole decision. Real products and investor circumstances add costs, constraints, uncertainty, and regulation.",
        action: "Be able to define the concept in your own words and illustrate it with a simple numerical or real-life example.",
    },
    Analysis: {
        why: "This concept helps convert raw fund data into evidence about mandate, return, risk, cost, consistency, or portfolio fit.",
        caution: "Do not use this item alone or compare it across unlike categories, dates, benchmarks, or calculation methods.",
        action: "Use consistent source data and evaluate the result beside at least one complementary measure before drawing a conclusion.",
    },
    Strategy: {
        why: "This concept turns investment knowledge into a repeatable rule for contribution, allocation, behaviour, or goal execution.",
        caution: "A strategy is not automatically suitable because it worked historically. Its assumptions, costs, risks, and failure conditions must match the investor.",
        action: "Write the strategy as an if-then rule with a target, limit, review date, and condition for stopping or changing it.",
    },
    "Taxation & Compliance": {
        why: "This concept can change the amount an investor keeps, the documents required, and whether a transaction is implemented correctly.",
        caution: "Tax and regulatory treatment can change and may depend on dates, residency, scheme classification, and personal facts. Verify current official rules before acting.",
        action: "Record the applicable date, investor status, scheme classification, and official source used for the conclusion.",
    },
    "Portfolio Management": {
        why: "This concept affects how separate funds work together to fund goals while controlling concentration, liquidity, drawdown, and behavioural risk.",
        caution: "Optimising one portfolio statistic can weaken another. Review the total portfolio and the investor's liabilities instead of one holding in isolation.",
        action: "Measure the concept at total-portfolio level and compare it with a documented target, tolerance range, and review process.",
    },
};
const categoryDeepDives: Record<CourseModule["category"], string[]> = {
    Theory: [
        "A strong understanding separates the name of the concept from its mechanics. Trace the participants, assets, cash flows, source of return, and source of risk before deciding what the idea means in practice.",
        "The simplified textbook version is a starting point. Real outcomes can also be affected by inflation, time, fees, liquidity, tax, regulation, investor behaviour, and changing market conditions.",
    ],
    Analysis: [
        "The value of an analytical concept comes from the question it helps answer, the quality of the input data, and the consistency of the comparison—not from whether the final number looks high or low.",
        "Interpretation requires context. Use the same category, benchmark, dates, periods, and calculation method, then combine the result with a complementary return, risk, cost, or portfolio measure.",
    ],
    Strategy: [
        "A strategy becomes useful only when it is converted into a repeatable implementation rule. The rule should identify its purpose, allocation or contribution limit, review date, and conditions for making a change.",
        "Expected outcomes should be tested under more than one scenario. A weaker return, a market decline, an income interruption, higher costs, or an early liquidity need can expose assumptions that a base-case projection hides.",
    ],
    "Taxation & Compliance": [
        "Tax and compliance conclusions are controlled by specific facts: the investor's status, scheme classification, transaction type, acquisition date, transaction date, and the rule effective on that date.",
        "Keep the legal rule, calculation, withholding, reporting requirement, and final liability separate. A current official source and a dated working paper are essential whenever the result affects a real transaction.",
    ],
    "Portfolio Management": [
        "Portfolio concepts must be measured across all holdings and goals together. A fund that looks reasonable on its own may duplicate another holding, increase concentration, weaken liquidity, or conflict with a near-term liability.",
        "A complete review compares current exposures with written targets, tests the portfolio under adverse conditions, and converts observations into prioritised actions with measurable review or rebalancing triggers.",
    ],
};
const categoryStudyGuides: Record<CourseModule["category"], {
    objectives: string[];
    steps: string[];
    reviewTable: CourseTopicLesson["reviewTable"];
    mistakes: string[];
    workedExample: string;
}> = {
    Theory: {
        objectives: [
            "Explain the idea in plain language without relying on a memorised definition.",
            "Identify the people, assets, cash flows, rules, and risks involved.",
            "Connect the concept to a real investor goal or mutual-fund decision.",
        ],
        steps: [
            "Start with the definition and underline every term that needs a separate explanation.",
            "Draw the mechanism as a simple flow: who contributes, who manages, what changes value, and who receives the outcome.",
            "Create one small numerical or everyday example and state the assumptions used.",
            "Compare the concept with its closest alternative so the boundary between them is clear.",
            "Finish by recording one benefit, one risk, and one situation where the concept may be unsuitable.",
        ],
        reviewTable: [
            { dimension: "Meaning", question: "Can the concept be explained in one sentence?", evidence: "Definition in the lesson or official investor material" },
            { dimension: "Mechanics", question: "Who or what creates the outcome?", evidence: "Cash-flow, ownership, or market-process map" },
            { dimension: "Investor use", question: "Which goal or decision could it support?", evidence: "Goal, horizon, liquidity, and risk notes" },
            { dimension: "Limit", question: "When can the simple explanation break down?", evidence: "Costs, regulation, uncertainty, and product documents" },
        ],
        mistakes: [
            "Memorising a definition without understanding the mechanism behind it.",
            "Assuming a benefit applies to every investor or every market environment.",
            "Ignoring costs, liquidity, tax, inflation, and the possibility of loss.",
        ],
        workedExample: "A learner first writes a one-sentence definition, then draws the movement of money and ownership through the relevant participants. They attach the idea to a sample goal, compare it with the nearest alternative, and finish with the conditions that would make the conclusion change.",
    },
    Analysis: {
        objectives: [
            "Understand what the measure or research item is designed to reveal.",
            "Use comparable data, periods, categories, and benchmarks.",
            "Combine the result with complementary evidence before reaching a conclusion.",
        ],
        steps: [
            "Write the decision question before collecting data so the analysis has a clear purpose.",
            "Confirm the source, reporting date, formula, benchmark, category, and measurement period.",
            "Calculate or record the result consistently for the fund, benchmark, and a suitable peer set.",
            "Stress-test the conclusion across more than one period or market condition.",
            "Translate the result into portfolio relevance and document what the metric cannot prove.",
        ],
        reviewTable: [
            { dimension: "Source", question: "Is the data current and traceable?", evidence: "SID, factsheet, portfolio disclosure, or official database" },
            { dimension: "Comparison", question: "Are category, benchmark, and period consistent?", evidence: "Like-for-like comparison sheet" },
            { dimension: "Interpretation", question: "What does the result explain—and not explain?", evidence: "Written conclusion with a stated limitation" },
            { dimension: "Portfolio fit", question: "Does the evidence improve the total portfolio?", evidence: "Allocation, overlap, risk, and goal review" },
        ],
        mistakes: [
            "Selecting a fund from one attractive number or one favourable period.",
            "Comparing unlike fund categories, benchmarks, or calculation methods.",
            "Treating historical data as a forecast or guarantee of future performance.",
        ],
        workedExample: "A learner gathers the same dated source data for a scheme, its stated benchmark, and genuinely comparable peers. They calculate or record the measure across consistent periods, add a second risk or portfolio measure, and write a conclusion that separates observed evidence from expectations.",
    },
    Strategy: {
        objectives: [
            "Translate the strategy into a rule that can be followed consistently.",
            "Identify the assumptions, costs, risks, and failure conditions.",
            "Define how the strategy will be monitored and when it may be changed.",
        ],
        steps: [
            "State the investor goal, horizon, liquidity need, and capacity for loss.",
            "Write the strategy as an if-then rule with a target and maximum limit.",
            "Model a base case, a weaker-return case, and an adverse market case.",
            "Include implementation costs, tax effects, exit loads, and operational constraints.",
            "Set a review date and objective triggers for rebalancing, pausing, or replacing the strategy.",
        ],
        reviewTable: [
            { dimension: "Purpose", question: "Which goal is the strategy intended to serve?", evidence: "Goal amount, deadline, and priority" },
            { dimension: "Rule", question: "Can another person implement it consistently?", evidence: "Written target, limit, trigger, and review date" },
            { dimension: "Stress test", question: "What happens when returns disappoint?", evidence: "Base, weak, and adverse scenarios" },
            { dimension: "Suitability", question: "Can the investor stay with the plan?", evidence: "Liquidity, loss capacity, behaviour, cost, and tax review" },
        ],
        mistakes: [
            "Using a strategy because it recently performed well rather than because it fits the goal.",
            "Leaving entry, exit, allocation, and review decisions undefined.",
            "Changing course in response to emotion without checking the written rules.",
        ],
        workedExample: "A learner converts the strategy into a written implementation rule for a hypothetical goal. They set an allocation limit, model multiple outcomes, include costs and taxes, and specify the evidence that would justify continuing, rebalancing, or stopping it.",
    },
    "Taxation & Compliance": {
        objectives: [
            "Identify the investor, product, transaction, and date-specific facts that control the treatment.",
            "Locate the current official rule rather than relying on an old summary.",
            "Document the calculation, records, and professional input needed before implementation.",
        ],
        steps: [
            "Record investor residency, scheme classification, purchase date, transaction date, and transaction type.",
            "Check the current provision and effective date on an official government or regulatory source.",
            "Separate tax rate, holding-period classification, withholding, reporting, and cash-flow effects.",
            "Calculate a sample outcome and retain the source, assumptions, and supporting documents.",
            "Escalate ambiguous or personally material cases to a qualified tax or legal professional.",
        ],
        reviewTable: [
            { dimension: "Facts", question: "Which dates and classifications apply?", evidence: "Transaction statement and scheme classification" },
            { dimension: "Rule", question: "Is the provision current for that date?", evidence: "Official circular, law, or department guidance" },
            { dimension: "Calculation", question: "Are cost, gain, withholding, and reporting separated?", evidence: "Dated working paper with assumptions" },
            { dimension: "Verification", question: "Does the case require professional review?", evidence: "Residency, materiality, ambiguity, and filing impact" },
        ],
        mistakes: [
            "Applying an outdated tax summary to a transaction governed by newer rules.",
            "Assuming a scheme's marketing name determines its legal or tax classification.",
            "Confusing tax deducted at source with the investor's final tax liability.",
        ],
        workedExample: "A learner builds a dated transaction sheet containing the investor status, scheme classification, purchase and redemption dates, cost, proceeds, and current official source. They show the calculation separately from withholding and flag any assumption that needs professional confirmation.",
    },
    "Portfolio Management": {
        objectives: [
            "Evaluate the topic at total-portfolio level rather than fund by fund.",
            "Connect holdings and allocation to goals, liabilities, liquidity, and risk capacity.",
            "Define measurable limits and a repeatable review process.",
        ],
        steps: [
            "List every holding, account, goal, cash flow, and near-term liability in one view.",
            "Measure allocation, concentration, overlap, liquidity, costs, and the relevant risk exposure.",
            "Compare the current portfolio with documented targets and tolerance ranges.",
            "Test the portfolio under a market decline, income interruption, and unexpected liquidity need.",
            "Write prioritised actions and set objective rebalancing and review triggers.",
        ],
        reviewTable: [
            { dimension: "Role", question: "Does every holding have a defined job?", evidence: "Goal and portfolio-role map" },
            { dimension: "Exposure", question: "Where is risk concentrated or duplicated?", evidence: "Allocation, overlap, sector, issuer, and style analysis" },
            { dimension: "Resilience", question: "Can the portfolio fund needs during stress?", evidence: "Drawdown and liquidity stress test" },
            { dimension: "Control", question: "When will the portfolio be reviewed or rebalanced?", evidence: "Tolerance bands, triggers, and review calendar" },
        ],
        mistakes: [
            "Reviewing each fund independently while missing portfolio-level overlap or concentration.",
            "Optimising expected return without protecting liquidity and essential goals.",
            "Making frequent changes without a target allocation or measurable trigger.",
        ],
        workedExample: "A learner combines all holdings and goals in one worksheet, assigns a role to each position, and compares current exposures with target ranges. They stress-test liquidity and drawdown, then record only the changes supported by a documented portfolio rule.",
    },
};
export function getCourseTopicLesson(courseModule: CourseModule, topic: string): CourseTopicLesson {
    const explanation = getTopicExplanation(courseModule, topic);
    const categoryLesson = categoryLessons[courseModule.category];
    const studyGuide = categoryStudyGuides[courseModule.category];
    return {
        explanation,
        detailedExplanation: [
            `This topic belongs to ${courseModule.title.toLowerCase()}. The wider module context is: ${courseModule.description}`,
            ...categoryDeepDives[courseModule.category],
            "For an investor, this concept becomes actionable only after it is connected to a named goal, suitable time horizon, liquidity requirement, capacity for loss, existing portfolio, and current source documents.",
        ],
        conceptBreakdown: [
            {
                title: "Core meaning",
                description: explanation,
            },
            {
                title: "Where it fits",
                description: `This topic is part of Module ${courseModule.moduleNumber}, ${courseModule.title}, and should be studied alongside the other concepts that shape the same decision.`,
            },
            {
                title: "Decision use",
                description: categoryLesson.action,
            },
            {
                title: "Important limitation",
                description: categoryLesson.caution,
            },
        ],
        whyItMatters: categoryLesson.why,
        practicalApplication: practicalApplications[courseModule.moduleNumber] ??
            `Apply ${topic} to a realistic investor example and document the assumptions, calculation, decision, and limitation.`,
        watchOutFor: categoryLesson.caution,
        learningObjectives: studyGuide.objectives,
        evaluationSteps: studyGuide.steps,
        reviewTable: studyGuide.reviewTable,
        commonMistakes: studyGuide.mistakes,
        workedExample: studyGuide.workedExample,
        keyTakeaways: [
            explanation,
            categoryLesson.action,
            "Connect this concept to the goal, time horizon, liquidity need, and risk capacity before using it in an investment decision.",
        ],
    };
}
