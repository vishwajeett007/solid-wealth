import { BarChart3, ShoppingBag, TrendingUp, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

const performanceBars = [
  { className: "h-[40%]", active: false },
  { className: "h-[60%]", active: false },
  { className: "h-[80%]", active: true },
  { className: "h-[55%]", active: false },
  { className: "h-full", active: true },
  { className: "h-[70%]", active: false },
  { className: "h-[90%]", active: true },
];

const analyticsBars = [
  { className: "h-[40%]", active: true },
  { className: "h-[65%]", active: false },
  { className: "h-[85%]", active: true },
  { className: "h-[55%]", active: false },
  { className: "h-full", active: true },
];

export function HeroPhone() {
  return (
    <div className="relative mx-auto flex justify-center py-8 lg:py-10">
      <div className="relative z-20 w-[250px] animate-float-a drop-shadow-[0_40px_80px_rgba(12,31,26,0.18)] sm:w-[290px]">
        <div className="overflow-hidden rounded-[52px] bg-wealth-primary p-3.5">
          <div className="flex min-h-[520px] flex-col gap-3.5 overflow-hidden rounded-[40px] bg-wealth-surface px-5 py-6 sm:min-h-[560px]">
            <div className="mx-auto mb-2 h-6 w-20 rounded-xl bg-wealth-primary" />

            <div className="rounded-wealth-md bg-[linear-gradient(135deg,#0C1F1A_0%,#1A3530_100%)] p-5 text-white">
              <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-normal text-wealth-accent-mid">
                Total Portfolio
              </span>
              <p className="font-display text-3xl font-extrabold tracking-normal">
                $142,850
              </p>
              <p className="mt-1 text-xs font-semibold text-wealth-accent-mid">
                +12.4% this month
              </p>
            </div>

            <PhoneRow
              amount="+$824"
              icon={TrendingUp}
              iconTone="green"
              subtitle="Today 09:41 AM"
              title="S&P 500 Index"
              trend="positive"
            />
            <PhoneRow
              amount="-$1,240"
              icon={ShoppingBag}
              iconTone="slate"
              subtitle="Last updated now"
              title="Monthly Spend"
              trend="negative"
            />

            <div className="rounded-[14px] bg-wealth-surface-dim p-3.5">
              <p className="mb-2.5 text-xs font-semibold text-wealth-secondary">
                Weekly Performance
              </p>
              <div className="flex h-[50px] items-end gap-1">
                {performanceBars.map((bar, index) => (
                  <div
                    className={cn(
                      "flex-1 rounded-t bg-wealth-accent-light",
                      bar.active && "bg-wealth-accent",
                      bar.className,
                    )}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-16 z-30 hidden w-[200px] animate-float-b rounded-wealth-md border border-white/60 bg-white/90 p-4 shadow-wealth-lg backdrop-blur-xl lg:-left-12 lg:block xl:-left-20">
        <div className="mb-2.5 flex size-9 items-center justify-center rounded-[10px] bg-wealth-accent-light text-wealth-accent-dark">
          <Wallet aria-hidden="true" className="size-5" />
        </div>
        <p className="mb-1 text-xs font-semibold text-wealth-muted">
          Portfolio Gain
        </p>
        <p className="font-display text-[22px] font-extrabold text-wealth-primary">
          +$4,250
        </p>
        <p className="mt-0.5 text-xs font-semibold text-wealth-accent">
          +12% this month
        </p>
      </div>

      <div className="absolute bottom-20 right-0 z-30 hidden w-[200px] animate-float-a rounded-wealth-md border border-white/60 bg-white/90 p-4 shadow-wealth-lg backdrop-blur-xl [animation-delay:800ms] lg:-right-10 lg:block xl:-right-16">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-wealth-muted">
          <BarChart3 aria-hidden="true" className="size-4 text-wealth-accent" />
          Analytics Overview
        </div>
        <div className="flex h-12 items-end gap-1">
          {analyticsBars.map((bar, index) => (
            <span
              className={cn(
                "flex-1 rounded-t bg-wealth-accent-light",
                bar.active && "bg-wealth-accent",
                bar.className,
              )}
              key={index}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] font-semibold text-wealth-accent">
          24.3% YTD
        </p>
      </div>
    </div>
  );
}

type PhoneRowProps = {
  amount: string;
  icon: typeof TrendingUp;
  iconTone: "green" | "slate";
  subtitle: string;
  title: string;
  trend: "positive" | "negative";
};

function PhoneRow({
  amount,
  icon: Icon,
  iconTone,
  subtitle,
  title,
  trend,
}: PhoneRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-wealth-surface-dim px-3.5 py-3">
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
          iconTone === "green"
            ? "bg-wealth-accent-light text-wealth-accent-dark"
            : "bg-[#EEF2F0] text-wealth-secondary",
        )}
      >
        <Icon aria-hidden="true" className="size-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-wealth-primary">
          {title}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-wealth-muted">
          {subtitle}
        </p>
      </div>
      <p
        className={cn(
          "text-[13px] font-bold",
          trend === "positive" ? "text-wealth-accent" : "text-wealth-danger",
        )}
      >
        {amount}
      </p>
    </div>
  );
}
