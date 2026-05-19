"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run immediate check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-out",
        isScrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0",
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-500 ease-out flex flex-col justify-center",
          isScrolled
            ? "max-w-7xl rounded-[20px] bg-white/80 border border-wealth-border shadow-wealth-md py-2.5 px-6 backdrop-blur-xl"
            : "max-w-full rounded-none bg-white/10 border-wealth-border/40 py-4 px-6 sm:px-12 lg:px-20 backdrop-blur-md shadow-none",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="flex w-full items-center justify-between"
        >
          {/* Logo */}
          <Link
            className="bg-gradient-to-r from-wealth-accent to-wealth-teal bg-clip-text font-display text-xl font-extrabold tracking-normal text-transparent hover:opacity-90 transition-opacity duration-200"
            href="/"
          >
            LuxeFinance
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                className={cn(
                  "relative px-4 py-2 rounded-full text-[14px] font-semibold text-wealth-secondary transition-all duration-300 hover:text-wealth-accent hover:bg-wealth-accent/5",
                  link.active && "text-wealth-accent bg-wealth-accent-light/50",
                )}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Burger Toggle */}
          <div className="flex items-center gap-3">
            <Button
              aria-label="Get started with LuxeFinance"
              className="hidden sm:inline-flex group"
              icon={
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              }
              size="sm"
            >
              Get Started
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-wealth-border/40 bg-white/50 text-wealth-primary transition hover:border-wealth-accent hover:text-wealth-accent md:hidden focus:visible:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="size-5 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="size-5 transition-transform duration-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "absolute top-full left-0 right-0 mt-3 p-6 backdrop-blur-xl border border-wealth-border/90 shadow-wealth-lg flex flex-col gap-4 animate-fade-in md:hidden",
              isScrolled
                ? "rounded-[20px] bg-white/95"
                : "rounded-none bg-white/100 border-x-0 border-b",
            )}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    "flex w-full items-center px-4 py-3 rounded-xl text-base font-semibold text-wealth-secondary transition-all duration-200 hover:text-wealth-accent hover:bg-wealth-accent/5",
                    link.active &&
                      "text-wealth-accent bg-wealth-accent-light/50",
                  )}
                  href={link.href}
                  key={link.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="h-px bg-wealth-border/60 w-full my-1" />
            <Button
              aria-label="Get started with LuxeFinance"
              className="w-full justify-center py-3 text-base"
              icon={<ArrowRight aria-hidden="true" className="size-5" />}
              onClick={() => setIsMobileMenuOpen(false)}
              size="md"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
