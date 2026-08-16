import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
type SectionLabelProps = {
    children: string;
    className?: string;
    icon?: LucideIcon;
    tone?: "light" | "dark" | "muted";
};
const toneClasses = {
    light: "bg-wealth-accent-light text-wealth-accent-dark",
    dark: "border border-wealth-accent/25 bg-wealth-accent/15 text-wealth-accent-mid",
    muted: "text-wealth-muted",
};
export function SectionLabel({ children, className, icon: Icon, tone = "light", }: SectionLabelProps) {
    return (<div className={cn("inline-flex w-fit items-center gap-2 rounded-wealth-pill px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-normal", toneClasses[tone], className)}>
      {Icon ? <Icon aria-hidden="true" className="size-4" strokeWidth={2.2}/> : null}
      <span>{children}</span>
    </div>);
}
