import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { sectionIcons } from "@/lib/content";

export function AnalyticsSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20" id="analytics" width="wide">
      <div className="relative grid overflow-hidden rounded-wealth-xl border border-wealth-dark-border bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16)_0%,rgba(37,99,235,0)_42%),#080f1a] p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
        <div className="relative z-10">
          <SectionLabel icon={sectionIcons.trending} tone="dark">
            80% Performance Increase
          </SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-normal text-[#f0f7ff] sm:text-4xl">
            Next-Gen Wealth Dashboard
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#879bb8]">
            Our predictive algorithms help you stay ahead of market shifts by
            analyzing millions of data points every second - before you even
            ask.
          </p>
          <Button
            className="mt-8"
            icon={<ArrowRight aria-hidden="true" className="size-4" />}
            size="lg"
            variant="accent"
          >
            Explore Analytics
          </Button>
        </div>

        <div className="relative z-10 mt-10 rounded-wealth-lg border border-wealth-dark-border bg-white/[0.03] p-5 sm:p-7 lg:mt-0">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-wealth-muted">
              Portfolio Growth - 6M
            </span>
            <div className="flex gap-3">
              <LegendItem color="blue" label="Equity" />
              <LegendItem color="teal" label="Fixed Income" />
            </div>
          </div>

          <div className="h-[180px]">
            <svg
              aria-hidden="true"
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 400 160"
            >
              <defs>
                <linearGradient
                  id="portfolio-gradient"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#3b82f6"
                    stopOpacity="0.25"
                  />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,140 Q50,120 100,125 T200,75 T300,85 T400,18"
                fill="url(#portfolio-gradient)"
              />
              <path
                className="animate-draw-line"
                d="M0,140 Q50,120 100,125 T200,75 T300,85 T400,18"
                fill="none"
                stroke="#3b82f6"
                strokeDasharray="800"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                className="animate-draw-line [animation-delay:200ms]"
                d="M0,155 Q50,140 100,130 T200,115 T300,80 T400,55"
                fill="none"
                opacity="0.6"
                stroke="#06b6d4"
                strokeDasharray="800"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="mt-4 flex justify-between font-mono text-[10px] text-wealth-secondary">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

type LegendItemProps = {
  color: "blue" | "teal";
  label: string;
};

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#879bb8]">
      <span
        className={
          color === "blue"
            ? "size-2 rounded-full bg-wealth-accent"
            : "size-2 rounded-full bg-wealth-teal"
        }
      />
      {label}
    </span>
  );
}
