import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  innerClassName?: string;
  as?: "section" | "div";
  width?: "default" | "wide" | "full";
};

const widthClasses = {
  default: "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20",
  wide: "mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-20",
  full: "w-full",
};

export function SectionWrapper({
  as: Component = "section",
  children,
  className,
  id,
  innerClassName,
  width = "default",
}: SectionWrapperProps) {
  return (
    <Component className={className} id={id}>
      <div className={cn(widthClasses[width], innerClassName)}>{children}</div>
    </Component>
  );
}
