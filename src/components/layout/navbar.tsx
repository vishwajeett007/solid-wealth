import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wealth-border bg-wealth-bg/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-20"
      >
        <Link
          className="bg-gradient-to-r from-wealth-accent to-[#0AB5A8] bg-clip-text font-display text-xl font-extrabold tracking-normal text-transparent"
          href="/"
        >
          LuxeFinance
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "text-sm font-medium text-wealth-secondary transition hover:text-wealth-accent",
                link.active && "font-semibold text-wealth-primary",
              )}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          aria-label="Get started with LuxeFinance"
          icon={<ArrowRight aria-hidden="true" className="size-4" />}
          size="sm"
        >
          Get Started
        </Button>
      </nav>
    </header>
  );
}
