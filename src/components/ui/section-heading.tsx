import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-display text-3xl font-bold leading-tight tracking-normal text-wealth-primary sm:text-4xl lg:text-[42px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
