import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "ghost"
  | "accent"
  | "white"
  | "outline-white"
  | "black";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-wealth-primary text-white shadow-[0_4px_16px_rgba(15,26,44,0.18)] hover:bg-wealth-accent hover:shadow-[0_8px_24px_rgba(37,99,235,0.30)]",
  ghost:
    "border border-wealth-border bg-transparent text-wealth-primary hover:border-wealth-accent hover:text-wealth-accent",
  accent:
    "bg-wealth-accent text-white shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:bg-wealth-accent-dark hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]",
  white:
    "bg-white text-wealth-primary shadow-[0_4px_20px_rgba(0,0,0,0.20)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
  "outline-white":
    "border border-white/30 bg-transparent text-white hover:border-white",
  black:
    "bg-black text-white hover:bg-black/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex w-fit items-center justify-center gap-2 rounded-wealth-pill font-semibold transition duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wealth-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-wealth-bg",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {icon && iconPosition === "left" ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? icon : null}
    </button>
  );
}
