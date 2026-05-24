"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Calculator, ChevronRight, TrendingUp, Wallet, ArrowRight, ShieldCheck, Target, CalendarClock, Info } from "lucide-react";

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
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <label className="text-[15px] font-medium text-gray-700">{label}</label>
        <div className="bg-[#fff4e6] px-3 py-1.5 rounded flex items-center min-w-[120px] justify-end">
          {prefix && <span className="text-[#fe9800] font-bold text-[15px] mr-1">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="bg-transparent border-none outline-none font-bold text-[#fe9800] text-[15px] w-full text-right p-0 m-0 focus:ring-0"
            style={{ appearance: "textfield", MozAppearance: "textfield" }}
          />
          {suffix && <span className="text-[#fe9800] font-bold text-[15px] ml-1">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#fe9800] hover:accent-orange-600 transition-all"
      />
    </div>
  );
};

const TwoSegmentChart = ({ val1, val2, label1, label2, color1 = "#ffedd5", color2 = "#fe9800" }: any) => {
  const total = val1 + val2;
  const p2 = total === 0 ? 50 : (val2 / total) * 100;
  const radius = 15.91549430918954;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex justify-center gap-6 mb-6 w-full text-[13px] font-medium text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color1 }}></div>
          {label1}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color2 }}></div>
          {label2}
        </div>
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 42 42" className="-rotate-90 drop-shadow-sm">
          <circle cx="21" cy="21" r={radius} fill="transparent" stroke={color1} strokeWidth="7" />
          <circle
            cx="21" cy="21" r={radius}
            fill="transparent"
            stroke={color2}
            strokeWidth="7"
            strokeDasharray={`${p2} ${100 - p2}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
      </div>
    </div>
  );
};

const CalculatorLayout = ({ children, results, onInvestClick = true }: any) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {children}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-[15px]">
            {results.map((r: any, i: number) => (
              <div key={i}>
                <p className="text-gray-500 mb-1">{r.label}</p>
                <p className="font-semibold text-gray-900">
                  {r.isCurrency !== false ? "₹" : ""}
                  {Number(r.value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  {r.suffix ? r.suffix : ""}
                </p>
              </div>
            ))}
          </div>
          {onInvestClick && (
            <Link href="/invest" className="w-full md:w-auto px-8 py-3 bg-[#fe9800] text-white font-bold rounded-lg hover:bg-orange-500 transition-colors text-center whitespace-nowrap">
              INVEST NOW
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// INDIVIDUAL CALCULATORS
// -------------------------------------------------------------

const SIPCalculator = () => {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const i = rate / 100 / 12;
  const n = years * 12;
  const futureValue = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  const wealthGained = futureValue - invested;

  return (
    <CalculatorLayout results={[
      { label: "Invested amount", value: invested },
      { label: "Est. returns", value: wealthGained },
      { label: "Total value", value: futureValue }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Monthly investment" value={monthly} min={500} max={1000000} step={500} prefix="₹" onChange={setMonthly} />
        <InputSlider label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={invested} val2={wealthGained} label1="Invested amount" label2="Est. returns" />
      </div>
    </CalculatorLayout>
  );
};

const LumpsumCalculator = () => {
  const [lumpsum, setLumpsum] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const futureValue = lumpsum * Math.pow(1 + rate / 100, years);
  const wealthGained = futureValue - lumpsum;

  return (
    <CalculatorLayout results={[
      { label: "Invested amount", value: lumpsum },
      { label: "Est. returns", value: wealthGained },
      { label: "Total value", value: futureValue }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Total investment" value={lumpsum} min={10000} max={10000000} step={10000} prefix="₹" onChange={setLumpsum} />
        <InputSlider label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={lumpsum} val2={wealthGained} label1="Invested amount" label2="Est. returns" />
      </div>
    </CalculatorLayout>
  );
};

const SWPCalculator = () => {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(25000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const i = rate / 100 / 12;
  const n = years * 12;
  const finalCorpus = corpus * Math.pow(1 + i, n) - withdrawal * ((Math.pow(1 + i, n) - 1) / i);
  const totalWithdrawn = withdrawal * n;

  return (
    <CalculatorLayout results={[
      { label: "Total investment", value: corpus },
      { label: "Total withdrawal", value: totalWithdrawn },
      { label: "Final value", value: finalCorpus > 0 ? finalCorpus : 0 }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Total investment" value={corpus} min={100000} max={50000000} step={100000} prefix="₹" onChange={setCorpus} />
        <InputSlider label="Withdrawal per month" value={withdrawal} min={1000} max={500000} step={1000} prefix="₹" onChange={setWithdrawal} />
        <InputSlider label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={finalCorpus > 0 ? finalCorpus : 0} val2={totalWithdrawn} label1="Final value" label2="Total withdrawal" />
      </div>
    </CalculatorLayout>
  );
};

const StepUpSIPCalculator = () => {
  const [initialSip, setInitialSip] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  let fv = 0;
  let currentSip = initialSip;
  let invested = 0;
  for (let m = 1; m <= years * 12; m++) {
    invested += currentSip;
    fv = (fv + currentSip) * (1 + rate / 100 / 12);
    if (m % 12 === 0) {
      currentSip = currentSip * (1 + stepUp / 100);
    }
  }

  return (
    <CalculatorLayout results={[
      { label: "Invested amount", value: invested },
      { label: "Est. returns", value: fv - invested },
      { label: "Total value", value: fv }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Monthly investment" value={initialSip} min={500} max={100000} step={500} prefix="₹" onChange={setInitialSip} />
        <InputSlider label="Annual step-up" value={stepUp} min={1} max={50} step={1} suffix="%" onChange={setStepUp} />
        <InputSlider label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={invested} val2={fv - invested} label1="Invested amount" label2="Est. returns" />
      </div>
    </CalculatorLayout>
  );
};

const GoalBasedCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(5000000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const i = rate / 100 / 12;
  const n = years * 12;
  const sipRequired = goalAmount / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const totalInvested = sipRequired * n;

  return (
    <CalculatorLayout results={[
      { label: "Target Goal", value: goalAmount },
      { label: "Est. Returns", value: goalAmount - totalInvested },
      { label: "Monthly SIP Required", value: sipRequired }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Target goal amount" value={goalAmount} min={100000} max={100000000} step={100000} prefix="₹" onChange={setGoalAmount} />
        <InputSlider label="Expected return rate (p.a)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Time horizon" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={totalInvested} val2={goalAmount - totalInvested} label1="Total invested" label2="Est. returns" />
      </div>
    </CalculatorLayout>
  );
};

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [expenses, setExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [postRetireReturn, setPostRetireReturn] = useState(8);

  const yearsToRetire = retireAge > currentAge ? retireAge - currentAge : 0;
  const futureExpenses = expenses * Math.pow(1 + inflation / 100, yearsToRetire);
  const realReturn = ((1 + postRetireReturn / 100) / (1 + inflation / 100)) - 1;
  const retirementCorpus = realReturn > 0 ? (futureExpenses * 12) / realReturn : 0;

  return (
    <CalculatorLayout results={[
      { label: "Years to retirement", value: yearsToRetire, isCurrency: false },
      { label: "Future monthly expense", value: futureExpenses },
      { label: "Retirement corpus needed", value: retirementCorpus }
    ]}>
      <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <div className="space-y-2">
          <InputSlider label="Current age" value={currentAge} min={18} max={70} step={1} suffix="Yr" onChange={setCurrentAge} />
          <InputSlider label="Retirement age" value={retireAge} min={40} max={80} step={1} suffix="Yr" onChange={setRetireAge} />
          <InputSlider label="Current monthly expenses" value={expenses} min={10000} max={500000} step={5000} prefix="₹" onChange={setExpenses} />
        </div>
        <div className="space-y-2">
          <InputSlider label="Expected inflation rate" value={inflation} min={1} max={15} step={0.5} suffix="%" onChange={setInflation} />
          <InputSlider label="Post-retirement return" value={postRetireReturn} min={4} max={15} step={0.5} suffix="%" onChange={setPostRetireReturn} />
        </div>
      </div>
    </CalculatorLayout>
  );
};

const InflationCalculator = () => {
  const [currentExpense, setCurrentExpense] = useState(100000);
  const [inflation, setInflation] = useState(6);
  const [years, setYears] = useState(10);

  const futureExpense = currentExpense * Math.pow(1 + inflation / 100, years);

  return (
    <CalculatorLayout results={[
      { label: "Current Value", value: currentExpense },
      { label: "Inflation Rate", value: inflation, isCurrency: false, suffix: "%" },
      { label: "Future Value", value: futureExpense }
    ]} onInvestClick={false}>
      <div className="lg:col-span-12">
        <InputSlider label="Current value / expense" value={currentExpense} min={1000} max={10000000} step={1000} prefix="₹" onChange={setCurrentExpense} />
        <InputSlider label="Inflation rate (p.a)" value={inflation} min={1} max={15} step={0.5} suffix="%" onChange={setInflation} />
        <InputSlider label="Time period" value={years} min={1} max={50} step={1} suffix="Yr" onChange={setYears} />
      </div>
    </CalculatorLayout>
  );
};

const CAGRCalculator = () => {
  const [initial, setInitial] = useState(100000);
  const [finalValue, setFinalValue] = useState(200000);
  const [years, setYears] = useState(5);

  const cagr = (Math.pow(finalValue / initial, 1 / years) - 1) * 100;
  const absReturn = ((finalValue - initial) / initial) * 100;

  return (
    <CalculatorLayout results={[
      { label: "Absolute Return", value: absReturn, isCurrency: false, suffix: "%" },
      { label: "Wealth Gained", value: finalValue - initial },
      { label: "CAGR", value: cagr, isCurrency: false, suffix: "%" }
    ]} onInvestClick={false}>
      <div className="lg:col-span-12">
        <InputSlider label="Initial investment" value={initial} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInitial} />
        <InputSlider label="Final value" value={finalValue} min={1000} max={50000000} step={1000} prefix="₹" onChange={setFinalValue} />
        <InputSlider label="Time period" value={years} min={1} max={50} step={1} suffix="Yr" onChange={setYears} />
      </div>
    </CalculatorLayout>
  );
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;

  return (
    <CalculatorLayout results={[
      { label: "Principal amount", value: loanAmount },
      { label: "Total interest", value: totalInterest },
      { label: "Monthly EMI", value: emi }
    ]} onInvestClick={false}>
      <div className="lg:col-span-7">
        <InputSlider label="Loan amount" value={loanAmount} min={100000} max={50000000} step={100000} prefix="₹" onChange={setLoanAmount} />
        <InputSlider label="Interest rate (p.a)" value={rate} min={1} max={25} step={0.1} suffix="%" onChange={setRate} />
        <InputSlider label="Loan tenure" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={loanAmount} val2={totalInterest} label1="Principal" label2="Interest" />
      </div>
    </CalculatorLayout>
  );
};

const FDvsSIPCalculator = () => {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [fdRate, setFdRate] = useState(7);
  const [sipRate, setSipRate] = useState(12);

  const n = years * 12;
  const iSip = sipRate / 100 / 12;
  const sipReturns = monthly * ((Math.pow(1 + iSip, n) - 1) / iSip) * (1 + iSip);

  const iFd = fdRate / 100 / 12;
  const fdReturns = monthly * ((Math.pow(1 + iFd, n) - 1) / iFd) * (1 + iFd);

  return (
    <CalculatorLayout results={[
      { label: "Value in FD", value: fdReturns },
      { label: "Value in SIP", value: sipReturns },
      { label: "Extra Wealth", value: sipReturns - fdReturns }
    ]}>
      <div className="lg:col-span-7">
        <InputSlider label="Monthly investment" value={monthly} min={500} max={100000} step={500} prefix="₹" onChange={setMonthly} />
        <InputSlider label="Time period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
        <InputSlider label="FD interest rate" value={fdRate} min={4} max={12} step={0.5} suffix="%" onChange={setFdRate} />
        <InputSlider label="SIP expected return" value={sipRate} min={8} max={20} step={0.5} suffix="%" onChange={setSipRate} />
      </div>
      <div className="lg:col-span-5 flex items-center justify-center">
        <TwoSegmentChart val1={fdReturns} val2={sipReturns - fdReturns} label1="FD Returns" label2="Extra SIP Wealth" />
      </div>
    </CalculatorLayout>
  );
};


// -------------------------------------------------------------
// MAIN PAGE COMPONENT
// -------------------------------------------------------------

const calculatorsList = [
  { id: "sip", label: "SIP Calculator", icon: TrendingUp, Component: SIPCalculator },
  { id: "lumpsum", label: "Lumpsum Calculator", icon: Wallet, Component: LumpsumCalculator },
  { id: "swp", label: "SWP Calculator", icon: ArrowRight, Component: SWPCalculator },
  { id: "step_up_sip", label: "Step-Up SIP", icon: TrendingUp, Component: StepUpSIPCalculator },
  { id: "goal_based", label: "Goal-Based", icon: Target, Component: GoalBasedCalculator },
  { id: "retirement", label: "Retirement", icon: CalendarClock, Component: RetirementCalculator },
  { id: "inflation", label: "Inflation", icon: TrendingUp, Component: InflationCalculator },
  { id: "cagr", label: "CAGR Calculator", icon: Calculator, Component: CAGRCalculator },
  { id: "emi", label: "EMI Calculator", icon: Wallet, Component: EMICalculator },
  { id: "fd_vs_sip", label: "FD vs SIP", icon: ShieldCheck, Component: FDvsSIPCalculator },
];

export default function CalculatorsPage() {
  const [activeCalcId, setActiveCalcId] = useState("sip");

  const activeCalc = calculatorsList.find(c => c.id === activeCalcId) || calculatorsList[0];
  const isSIPOrLumpsum = activeCalcId === "sip" || activeCalcId === "lumpsum";
  const ActiveComponent = activeCalc.Component;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 items-start">

        {/* Main Left Content Area */}
        <div className="flex-1 w-full flex flex-col gap-8">
          <h1 className="text-[28px] font-bold text-[#1a2332]">
            {activeCalc.label}
          </h1>

          {/* Calculator Card Container */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {isSIPOrLumpsum && (
              <div className="p-6 pb-0 md:p-8 md:pb-0">
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setActiveCalcId("sip")}
                    className={cn("px-6 py-2 rounded-full text-sm font-semibold transition-colors", activeCalcId === "sip" ? "bg-orange-50 text-[#fe9800]" : "text-gray-500 hover:bg-gray-50")}
                  >
                    SIP
                  </button>
                  <button
                    onClick={() => setActiveCalcId("lumpsum")}
                    className={cn("px-6 py-2 rounded-full text-sm font-semibold transition-colors", activeCalcId === "lumpsum" ? "bg-orange-50 text-[#fe9800]" : "text-gray-500 hover:bg-gray-50")}
                  >
                    Lumpsum
                  </button>
                </div>
              </div>
            )}

            {/* The individual calculator body */}
            <div className={cn(!isSIPOrLumpsum && "mt-0")}>
              <ActiveComponent />
            </div>
          </div>

          {/* SEO / Article Section applicable to all calculators */}
          <div className="bg-transparent mt-8 text-[#44475b] text-[15px] leading-relaxed space-y-6">
            <h2 className="text-xl font-bold text-[#1a2332]">About {activeCalc.label}s</h2>
            <p>
              Calculators like the {activeCalc.label} are essential financial planning tools. They help you project and estimate the returns or outcomes of your investment strategies. By adjusting parameters such as the rate of return, time horizon, and investment amount, you can clearly see how your wealth could grow over time.
            </p>

            <h3 className="text-lg font-bold text-[#1a2332] mt-8">Why use this calculator?</h3>
            <p>
              It provides a simple, interactive way to visualize the magic of compounding. Most mutual fund and investment choices are affected by variables like market conditions and exit loads, but a calculator provides a mathematically sound baseline estimate.
            </p>
            <p>
              This calculator will help you determine the wealth gain and expected returns for your planning. It offers a rough estimate of the maturity amount based on a projected annual return rate, empowering you to make disciplined financial decisions.
            </p>

            <h3 className="text-lg font-bold text-[#1a2332] mt-8">How it helps you</h3>
            <p>
              Using a calculator allows you to plan your long-term goals—be it retirement, buying a house, or saving for education.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Assists you in determining the exact amount you need to invest.</li>
              <li>Tracks the total principal you will accumulate over the tenure.</li>
              <li>Gives a visually clear estimated value of your expected returns.</li>
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">

          {/* Promo Card matching Image style */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 mb-4 relative">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#f0fdf4" />
                <path d="M50 25L70 45H30L50 25Z" fill="#16a34a" />
                <rect x="40" y="45" width="20" height="30" fill="#16a34a" />
                <circle cx="50" cy="50" r="15" fill="#fe9800" />
                <path d="M45 50L55 45V55L45 50Z" fill="white" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1a2332] text-lg mb-1">Invest with Solid Wealth</h3>
            <p className="text-gray-500 text-sm mb-6">Zero account opening charges</p>
            <Link href="/invest" className="w-full py-3 bg-[#fe9800] text-white font-bold rounded-lg hover:bg-orange-500 transition-colors text-center text-sm">
              INVEST NOW
            </Link>
          </div>

          {/* Popular Calculators List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#1a2332]">Popular Calculators</h3>
            </div>
            <div className="flex flex-col">
              {calculatorsList.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalcId(calc.id)}
                  className={cn(
                    "px-6 py-3.5 text-left text-sm font-medium transition-colors border-b border-gray-50 last:border-none hover:text-[#fe9800]",
                    activeCalcId === calc.id ? "text-[#fe9800] bg-orange-50/30" : "text-gray-600"
                  )}
                >
                  {calc.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
