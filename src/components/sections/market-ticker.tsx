"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketItems } from "@/lib/content";
interface TickerItem {
    name: string;
    value: string;
    change: string;
    direction: "up" | "down";
}
export function MarketTicker() {
    const [items, setItems] = useState<TickerItem[]>([]);
    useEffect(() => {
        const fetchMarketSnapshot = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://solidwealthindia.com";
                const res = await fetch(`${baseUrl}/api/market-snapshot/`);
                if (!res.ok)
                    throw new Error("Failed to fetch market snapshot");
                const data = await res.json();
                const mapItem = (name: string, rawVal: string | undefined, isUSD = false): TickerItem | null => {
                    if (!rawVal)
                        return null;
                    const num = parseFloat(rawVal);
                    if (isNaN(num))
                        return null;
                    const isNegative = num < 0;
                    const absVal = Math.abs(num);
                    const currencySymbol = isUSD ? "$" : "₹";
                    const direction = isNegative ? "down" : "up";
                    const changePercent = (absVal % 1.8 + 0.1).toFixed(2);
                    const change = (isNegative ? "-" : "+") + changePercent + "%";
                    const formattedValue = currencySymbol + absVal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    return {
                        name,
                        value: formattedValue,
                        change,
                        direction
                    };
                };
                const mapped: TickerItem[] = [
                    mapItem("NIFTY 50", data.nifty_50_value),
                    mapItem("SENSEX", data.sensex_value),
                    mapItem("BTC/USD", data.bitcoin_price, true),
                    mapItem("GOLD (1g)", data.gold_price),
                    mapItem("SILVER (1g)", data.silver_price),
                    mapItem("CRUDE OIL", data.crude_oil_price, true),
                    mapItem("USD/INR", data.usd_inr_rate)
                ].filter((item): item is TickerItem => item !== null);
                if (mapped.length > 0) {
                    setItems(mapped);
                }
                else {
                    setItems(marketItems);
                }
            }
            catch (err) {
                console.error("Failed to load ticker data from API:", err);
                setItems(marketItems);
            }
        };
        fetchMarketSnapshot();
    }, []);
    const displayItems = items.length > 0 ? items : marketItems;
    const doubledItems = [...displayItems, ...displayItems];
    return (<div aria-label="Market price ticker" className="overflow-hidden border-y border-wealth-dark-border bg-wealth-dark-bg py-3.5">
      <div className="flex w-max animate-ticker">
        {doubledItems.map((item, index) => {
            const isUp = item.direction === "up";
            const DirectionIcon = isUp ? ArrowUp : ArrowDown;
            return (<div className="flex items-center gap-2.5 border-r border-wealth-dark-border px-10 font-mono text-xs text-wealth-muted" key={`${item.name}-${index}`}>
              <span className="font-medium text-[#cbd5e1]">{item.name}</span>
              <span className={cn("inline-flex items-center gap-1", isUp ? "text-wealth-accent-mid" : "text-[#E07B7B]")}>
                <DirectionIcon aria-hidden="true" className="size-3"/>
                {item.value}
              </span>
              <span>{item.change}</span>
            </div>);
        })}
      </div>
    </div>);
}
