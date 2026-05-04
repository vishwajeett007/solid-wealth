import { ArrowDown, ArrowUp } from "lucide-react";

import { marketItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const tickerItems = [...marketItems, ...marketItems];

export function MarketTicker() {
  return (
    <div
      aria-label="Market price ticker"
      className="overflow-hidden border-y border-wealth-dark-border bg-wealth-dark-bg py-3.5"
    >
      <div className="flex w-max animate-ticker">
        {tickerItems.map((item, index) => {
          const isUp = item.direction === "up";
          const DirectionIcon = isUp ? ArrowUp : ArrowDown;

          return (
            <div
              className="flex items-center gap-2.5 border-r border-wealth-dark-border px-10 font-mono text-xs text-wealth-muted"
              key={`${item.name}-${index}`}
            >
              <span className="font-medium text-[#C5E0D8]">{item.name}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  isUp ? "text-wealth-accent-mid" : "text-[#E07B7B]",
                )}
              >
                <DirectionIcon aria-hidden="true" className="size-3" />
                {item.value}
              </span>
              <span>{item.change}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
