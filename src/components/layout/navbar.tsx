"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  courseCurriculum,
  getCourseLevelForModule,
  type CourseModule,
} from "@/lib/course-curriculum";

const researchTracks: Array<{
  level: CourseModule["level"];
  label: string;
  description: string;
  accentClass: string;
}> = [
  {
    level: "Beginner",
    label: "Build your foundation",
    description: "Markets, mutual funds, and the language of investing.",
    accentClass: "bg-amber-100 text-amber-700",
  },
  {
    level: "Intermediate",
    label: "Analyse with confidence",
    description: "Risk, returns, selection, and investing strategies.",
    accentClass: "bg-sky-100 text-sky-700",
  },
  {
    level: "Advanced",
    label: "Plan for real goals",
    description: "Tax, retirement, behaviour, and advanced strategies.",
    accentClass: "bg-violet-100 text-violet-700",
  },
  {
    level: "Mastery & Practical",
    label: "Put it into practice",
    description: "Hands-on analysis, portfolios, cases, and tools.",
    accentClass: "bg-emerald-100 text-emerald-700",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileResearchOpen, setIsMobileResearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const researchCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelResearchClose = () => {
    if (researchCloseTimer.current) {
      clearTimeout(researchCloseTimer.current);
      researchCloseTimer.current = null;
    }
  };

  const openResearchMenu = () => {
    cancelResearchClose();
    setIsResearchOpen(true);
  };

  const closeResearchMenu = () => {
    cancelResearchClose();
    researchCloseTimer.current = setTimeout(() => {
      setIsResearchOpen(false);
    }, 140);
  };

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

  useEffect(() => {
    return () => cancelResearchClose();
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    const sections = ["features", "about", "mutual-funds", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(2);
      return pathname === "/" && activeSection === hash;
    }
    if (href.startsWith("/")) {
      const baseHref = href.split("?")[0].split("#")[0];
      if (baseHref === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(baseHref);
    }
    return false;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-out ",
        isScrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0 bg-transparent",
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-500 ease-out flex flex-col justify-center",
          isScrolled
            ? "max-w-[1000px] lg:max-w-[1200px] rounded-[15px] shadow-lg py-3 px-6 lg:px-8 bg-white/90 backdrop-blur-xl border border-gray-200"
            : "max-w-full rounded-none py-6 px-4 sm:px-8 lg:px-16 shadow-none bg-transparent border-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="flex w-full items-center justify-between"
        >
          {/* Logo */}
          <Link
            className={cn(
              "bg-[#fe9800] bg-clip-text font-display font-extrabold tracking-normal text-transparent hover:opacity-90 transition-all duration-500 flex items-center",
              isScrolled ? "text-xl" : "text-[28px]"
            )}
            style={{ fontFamily: "var(--font-righteous)" }}
            href="/"
          >
            <Image
              src="/logo1.png"
              alt="Logo"
              width={32}
              height={32}
              className={cn("inline-flex mr-2 transition-all duration-500", isScrolled ? "w-6 h-6" : "w-8 h-8")}
            />
            Solid Wealth
          </Link>
          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-2 xl:flex">
            {navLinks.map((link) => {
              const isResearchLink = link.label === "Research";
              const isDarkHeroPage = pathname.startsWith("/research/") && pathname !== "/research";

              return (
                <div
                  className="py-2"
                  key={link.label}
                  onBlur={isResearchLink ? closeResearchMenu : undefined}
                  onFocus={isResearchLink ? openResearchMenu : undefined}
                  onMouseEnter={isResearchLink ? openResearchMenu : undefined}
                  onMouseLeave={isResearchLink ? closeResearchMenu : undefined}
                >
                  <Link
                    aria-controls={isResearchLink ? "research-mega-menu" : undefined}
                    aria-expanded={isResearchLink ? isResearchOpen : undefined}
                    aria-haspopup={isResearchLink ? "true" : undefined}
                    className={cn(
                      "nav-link-underline relative mx-3 inline-flex items-center gap-1.5 whitespace-nowrap font-semibold transition-all duration-500 hover:text-wealth-accent",
                      isDarkHeroPage && !isScrolled
                        ? "text-white drop-shadow-sm"
                        : "text-wealth-secondary",
                      isLinkActive(link.href) && "active text-wealth-accent",
                      isScrolled ? "py-1 text-[15px]" : "py-2 text-[18px]",
                      isResearchLink && isResearchOpen && "text-wealth-accent",
                    )}
                    href={link.href}
                    onKeyDown={(event) => {
                      if (isResearchLink && event.key === "Escape") {
                        setIsResearchOpen(false);
                        event.currentTarget.blur();
                      }
                    }}
                  >
                    <span>{link.label}</span>
                    {isResearchLink && (
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-200",
                          isDarkHeroPage && !isScrolled && !isResearchOpen && "text-white/80",
                          isResearchOpen && "rotate-180",
                        )}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/*Mobile Burger Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <Button
                aria-label="Get started with Solid Wealth"
                variant={pathname.startsWith("/research/") && pathname !== "/research" && !isScrolled ? "light-orange" : "black"}
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 inline-flex",
                  isScrolled ? "h-9 px-4 text-sm" : "h-12 px-7 text-base"
                )}
                icon={
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1 relative z-10"
                  />
                }
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-44 pointer-events-none z-0" />
                <span className="relative z-10">Get Started</span>
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border transition hover:border-wealth-accent hover:text-wealth-accent focus:visible:outline-none xl:hidden",
                pathname.startsWith("/research/") && pathname !== "/research" && !isScrolled
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-wealth-border/40 bg-white/50 text-wealth-primary",
              )}
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => {
                  if (isOpen) setIsMobileResearchOpen(false);
                  return !isOpen;
                });
              }}
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

        {/* Research Mega Menu */}
        <div
          aria-hidden={!isResearchOpen}
          aria-label="Research curriculum"
          className={cn(
            "absolute left-1/2 top-[calc(100%+0.5rem)] hidden max-h-[calc(100svh-8rem)] w-[calc(100vw-3rem)] max-w-[1180px] -translate-x-1/2 overscroll-contain overflow-y-auto rounded-[24px] border border-wealth-border/80 bg-[#fffdf8] shadow-[0_24px_70px_rgba(15,26,44,0.18)] transition-[opacity,transform,visibility] duration-200 xl:block",
            isResearchOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0",
          )}
          id="research-mega-menu"
          onFocus={openResearchMenu}
          onMouseEnter={openResearchMenu}
          onMouseLeave={closeResearchMenu}
          role="region"
        >
          <div className="flex items-start justify-between gap-8 border-b border-wealth-border/70 bg-white/60 px-8 py-6">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-wealth-accent">
                Solid Wealth Research
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-wealth-primary">
                Mutual Fund Investment Mastery
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-wealth-secondary">
                A complete learning path from investing fundamentals to
                building and reviewing real-world portfolios.
              </p>
            </div>
            <span className="mt-1 shrink-0 rounded-full border border-wealth-border bg-white px-3 py-1.5 text-xs font-bold text-wealth-secondary">
              {courseCurriculum.length} modules
            </span>
          </div>

          <div className="grid grid-cols-4 divide-x divide-wealth-border/70 px-3 py-5">
            {researchTracks.map((track) => {
              const modules = courseCurriculum.filter(
                (module) => module.level === track.level,
              );

              return (
                <section className="px-5" key={track.level}>
                  <div className="mb-4 min-h-24">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]",
                        track.accentClass,
                      )}
                    >
                      {track.level}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-wealth-primary">
                      {track.label}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-wealth-muted">
                      {track.description}
                    </p>
                  </div>

                  <ol className="space-y-0.5">
                    {modules.map((module) => {
                      const courseLevel = getCourseLevelForModule(
                        module.moduleNumber,
                      );

                      return (
                        <li key={module.id}>
                          <Link
                            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-wealth-accent-light/60 focus-visible:bg-wealth-accent-light/60 focus-visible:outline-none"
                            href={`/research/${courseLevel?.id ?? "foundation"}#${module.id}`}
                            onClick={() => setIsResearchOpen(false)}
                          >
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-wealth-surface-dim text-[10px] font-bold tabular-nums text-wealth-muted transition-colors group-hover:bg-wealth-accent group-hover:text-white">
                              {module.moduleNumber}
                            </span>
                            <span className="text-[13px] font-medium leading-5 text-wealth-secondary transition-colors group-hover:text-wealth-primary">
                              {module.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-wealth-border/70 bg-wealth-surface-dim/45 px-8 py-3.5 text-xs">
            <p className="text-wealth-muted">
              Theory, analysis, strategy, taxation, and portfolio management
              in one structured curriculum.
            </p>
            <p className="font-bold text-wealth-secondary">
              Beginner to practical mastery
            </p>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-3 flex max-h-[calc(100svh-7rem)] animate-fade-in flex-col gap-4 overflow-y-auto overscroll-contain border border-wealth-border/90 p-4 shadow-wealth-lg backdrop-blur-xl sm:p-6 xl:hidden",
              isScrolled
                ? "rounded-[20px] bg-white/95"
                : "rounded-none bg-white/100 border-x-0 border-b",
            )}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                if (link.label === "Research") {
                  return (
                    <div key={link.label}>
                      <button
                        aria-controls="mobile-research-menu"
                        aria-expanded={isMobileResearchOpen}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-wealth-secondary transition-all duration-200 hover:bg-wealth-accent/5 hover:text-wealth-accent",
                          isMobileResearchOpen &&
                          "bg-wealth-accent-light/50 text-wealth-accent",
                        )}
                        onClick={() =>
                          setIsMobileResearchOpen((isOpen) => !isOpen)
                        }
                        type="button"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isMobileResearchOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isMobileResearchOpen && (
                        <div
                          className="mt-2 rounded-2xl border border-wealth-border/70 bg-[#fffdf8] p-3 sm:p-4"
                          id="mobile-research-menu"
                        >
                          <div className="mb-4 flex items-start justify-between gap-3 border-b border-wealth-border/60 pb-3">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-wealth-accent">
                                Research curriculum
                              </p>
                              <p className="mt-1 text-sm font-bold text-wealth-primary">
                                Mutual Fund Investment Mastery
                              </p>
                            </div>
                            <span className="shrink-0 rounded-full bg-wealth-surface-dim px-2 py-1 text-[10px] font-bold text-wealth-secondary">
                              {courseCurriculum.length} modules
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {researchTracks.map((track) => {
                              const modules = courseCurriculum.filter(
                                (module) => module.level === track.level,
                              );

                              return (
                                <section
                                  className="rounded-xl border border-wealth-border/60 bg-white/60 p-3"
                                  key={track.level}
                                >
                                  <span
                                    className={cn(
                                      "inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]",
                                      track.accentClass,
                                    )}
                                  >
                                    {track.level}
                                  </span>
                                  <h3 className="mt-2 text-sm font-bold text-wealth-primary">
                                    {track.label}
                                  </h3>
                                  <ol className="mt-2 space-y-1.5">
                                    {modules.map((module) => {
                                      const courseLevel = getCourseLevelForModule(
                                        module.moduleNumber,
                                      );

                                      return (
                                        <li key={module.id}>
                                          <Link
                                            className="flex items-start gap-2 rounded-md text-xs leading-4 text-wealth-secondary transition hover:text-wealth-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wealth-accent/40"
                                            href={`/research/${courseLevel?.id ?? "foundation"}#${module.id}`}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setIsMobileResearchOpen(false);
                                            }}
                                          >
                                            <span className="flex size-4 shrink-0 items-center justify-center rounded bg-wealth-surface-dim text-[8px] font-bold tabular-nums text-wealth-muted">
                                              {module.moduleNumber}
                                            </span>
                                            <span>{module.title}</span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ol>
                                </section>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    className={cn(
                      "flex w-full items-center rounded-xl px-4 py-3 text-base font-semibold text-wealth-secondary transition-all duration-200 hover:bg-wealth-accent/5 hover:text-wealth-accent",
                      isLinkActive(link.href) &&
                      "active bg-wealth-accent-light/50 text-wealth-accent",
                    )}
                    href={link.href}
                    key={link.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileResearchOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="h-px bg-wealth-border/60 w-full my-1" />
            <Button
              aria-label="Get started with Solid Wealth"
              variant="black"
              className="w-full justify-center py-3 text-base group relative overflow-hidden"
              icon={
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 relative z-10"
                />
              }
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMobileResearchOpen(false);
              }}
              size="md"
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-[450px] pointer-events-none z-0" />
              <span className="relative z-10">Get Started</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
