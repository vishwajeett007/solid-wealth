import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type CardProps = HTMLAttributes<HTMLElement> & {
    as?: "article" | "div" | "section";
};
export function Card({ as: Component = "div", className, children, ...props }: CardProps) {
    return (<Component className={cn("rounded-wealth-lg border border-wealth-border bg-wealth-surface shadow-wealth-sm", className)} {...props}>
      {children}
    </Component>);
}
