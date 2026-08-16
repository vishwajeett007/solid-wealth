"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

const column1Links = [
  {
    title: "Mutual Fund Research",
    description: "Understand fund categories, performance and selection.",
    href: "/research/product-knowledge#module-5",
  },
  {
    title: "Fund Screener",
    description: "Compare mutual funds using returns, risk and ratios.",
    href: "/research/investment-selection#module-10",
  },
  {
    title: "Investment Strategies",
    description: "SIP, lump sum, asset allocation and portfolio strategies.",
    href: "/research/investment-selection#module-12",
  },
  {
    title: "Market Research",
    description: "Learn how markets, sectors and economic cycles work.",
    href: "/research/foundation#module-2",
  },
];

const column2Links = [
  {
    title: "Portfolio Analysis",
    description: "Review allocation, diversification and portfolio risk.",
    href: "/research/investment-selection#module-11",
  },
  {
    title: "Risk & Returns",
    description: "Learn volatility, alpha, beta and risk-adjusted returns.",
    href: "/research/product-knowledge#module-7",
  },
  {
    title: "Tax & Retirement",
    description: "Taxation, retirement planning and long-term financial goals.",
    href: "/research/portfolio-management#module-15",
  },
  {
    title: "Research Library",
    description: "Read guides, case studies and investing resources.",
    href: "/research/practical-application#module-23",
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
  const researchItemRef = useRef<HTMLLIElement>(null);

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
    }, 180);
  };

  const toggleResearchMenu = () => {
    cancelResearchClose();
    setIsResearchOpen((prev) => !prev);
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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        researchItemRef.current &&
        !researchItemRef.current.contains(event.target as Node)
      ) {
        setIsResearchOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsResearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
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
        "fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-out",
        isScrolled ? "top-4 px-4 sm:px-6" : "top-0 px-0 bg-transparent",
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-500 ease-out flex flex-col justify-center relative",
          isScrolled
            ? "max-w-[1000px] lg:max-w-[1200px] rounded-[15px] shadow-lg py-3 px-6 lg:px-8 bg-white/95 backdrop-blur-xl border border-gray-200"
            : "max-w-full rounded-none py-4 px-4 sm:px-8 lg:px-16 shadow-none bg-white border-b border-[#eeeeee]",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="flex w-full items-center justify-between h-[50px] sm:h-[58px]"
        >
          {/* Logo */}
          <Link
            className={cn(
              "font-display font-extrabold tracking-normal text-[#ff8500] hover:opacity-90 transition-all duration-500 flex items-center gap-[9px] no-underline",
              isScrolled ? "text-xl" : "text-[24px]"
            )}
            style={{ fontFamily: "var(--font-righteous)" }}
            href="/"
          >
            <svg
              className={cn("shrink-0 transition-all duration-500", isScrolled ? "w-6 h-6" : "w-[31px] h-[31px]")}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 11L20 3L35 11L20 19L5 11Z" fill="#FF8A00" />
              <path d="M5 17L20 25L35 17V24L20 32L5 24V17Z" fill="#FF8A00" />
              <path d="M5 28L20 36L35 28" stroke="#FF8A00" strokeWidth="5" strokeLinejoin="round" />
            </svg>
            Solid Wealth
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-[34px] xl:flex list-none m-0 p-0">
            {navLinks.map((link) => {
              const isResearchLink = link.label === "Research";
              const isDarkHeroPage = pathname.startsWith("/research/") && pathname !== "/research";

              if (isResearchLink) {
                return (
                  <li
                    className={cn("nav-item research-item relative", isResearchOpen && "active")}
                    key={link.label}
                    ref={researchItemRef}
                    onMouseEnter={openResearchMenu}
                    onMouseLeave={closeResearchMenu}
                  >
                    <button
                      aria-controls="megaMenu"
                      aria-expanded={isResearchOpen}
                      aria-haspopup="true"
                      className={cn(
                        "nav-link flex items-center gap-[7px] bg-none border-0 cursor-pointer font-semibold transition-colors duration-200 text-[15px]",
                        isDarkHeroPage && !isScrolled
                          ? "text-white hover:text-[#ff8500]"
                          : isResearchOpen
                          ? "text-[#ff8500]"
                          : "text-[#475467] hover:text-[#ff8500]",
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleResearchMenu();
                      }}
                      type="button"
                    >
                      <span>Research</span>
                      <span
                        className={cn(
                          "chevron inline-block w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px] border-current transition-transform duration-250 ease-in-out",
                          isResearchOpen
                            ? "rotate-[225deg] mt-[4px]"
                            : "rotate-45 -mt-[4px]",
                        )}
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <Link
                    className={cn(
                      "nav-link flex items-center gap-[7px] font-semibold transition-colors duration-200 text-[15px] no-underline",
                      isDarkHeroPage && !isScrolled
                        ? "text-white hover:text-[#ff8500]"
                        : isLinkActive(link.href)
                        ? "text-[#ff8500]"
                        : "text-[#475467] hover:text-[#ff8500]",
                    )}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA / Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <Button
                aria-label="Get started with Solid Wealth"
                variant={pathname.startsWith("/research/") && pathname !== "/research" && !isScrolled ? "light-orange" : "black"}
                className={cn(
                  "get-started rounded-full bg-[#050505] text-white font-semibold cursor-pointer border-0 transition-all duration-300 inline-flex items-center justify-center gap-2",
                  isScrolled ? "h-10 px-5 text-sm" : "py-[13px] px-[24px] text-[14px]"
                )}
              >
                <span>Get Started →</span>
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle main menu"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full border transition hover:border-[#ff8500] hover:text-[#ff8500] focus-visible:outline-none xl:hidden",
                pathname.startsWith("/research/") && pathname !== "/research" && !isScrolled
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-gray-200 bg-white/80 text-[#101828]",
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

        {/* MEGA DROPDOWN (DESKTOP) */}
        <div
          id="megaMenu"
          className={cn(
            "mega-menu absolute left-0 w-full bg-white border-t border-[#eeeeee] border-b border-[#e6e6e6] shadow-[0_14px_28px_rgba(16,24,40,0.08)] transition-all duration-200 ease-in-out z-50",
            isScrolled ? "top-[calc(100%+0.5rem)] rounded-2xl" : "top-full",
            isResearchOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-2 pointer-events-none",
          )}
          onMouseEnter={openResearchMenu}
          onMouseLeave={closeResearchMenu}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mega-inner w-[min(1100px,calc(100%-60px))] mx-auto grid grid-cols-1 md:grid-cols-[330px_1px_1fr_1px_1fr] gap-[28px] py-[30px]">
            {/* LEFT FEATURE */}
            <div className="feature-panel pr-0 md:pr-[10px] pb-6 md:pb-0 border-b md:border-b-0 border-[#eeeeee]">
              <svg
                className="illustration w-[180px] h-[150px] mx-auto mb-[18px] block"
                viewBox="0 0 220 180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                {/* ground */}
                <ellipse cx="110" cy="151" rx="78" ry="18" fill="#FFF1DE" />

                {/* left building */}
                <rect x="44" y="76" width="52" height="67" rx="4" fill="#FFE3BD" stroke="#FF9B24" strokeWidth="2" />
                <rect x="52" y="86" width="9" height="10" fill="#ffffff" />
                <rect x="66" y="86" width="9" height="10" fill="#ffffff" />
                <rect x="80" y="86" width="9" height="10" fill="#ffffff" />
                <rect x="52" y="103" width="9" height="10" fill="#ffffff" />
                <rect x="66" y="103" width="9" height="10" fill="#ffffff" />
                <rect x="80" y="103" width="9" height="10" fill="#ffffff" />
                <rect x="64" y="121" width="13" height="22" fill="#FF9B24" />

                {/* right building */}
                <rect x="112" y="91" width="62" height="52" rx="4" fill="#FFF5E8" stroke="#FF9B24" strokeWidth="2" />
                <rect x="121" y="102" width="12" height="11" fill="#FFD08B" />
                <rect x="140" y="102" width="12" height="11" fill="#FFD08B" />
                <rect x="159" y="102" width="8" height="11" fill="#FFD08B" />
                <rect x="135" y="122" width="17" height="21" fill="#FF9B24" />

                {/* research tower */}
                <rect x="88" y="36" width="34" height="74" rx="12" fill="#FFF8EE" stroke="#FF8A00" strokeWidth="2" />
                <ellipse cx="105" cy="38" rx="18" ry="6" fill="#FFD28F" stroke="#FF8A00" strokeWidth="2" />
                <rect x="93" y="47" width="24" height="25" rx="5" fill="#FFB64D" />
                <line x1="97" y1="79" x2="113" y2="79" stroke="#FF8A00" strokeWidth="2" />
                <line x1="97" y1="86" x2="113" y2="86" stroke="#FF8A00" strokeWidth="2" />

                {/* antenna */}
                <line x1="105" y1="31" x2="105" y2="16" stroke="#FF8A00" strokeWidth="2" />
                <circle cx="105" cy="12" r="5" fill="#FF8A00" />

                {/* decorative chart */}
                <path d="M28 124L37 114L46 118" stroke="#FF8A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M172 72L183 61L193 67L205 50" stroke="#FF8A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="183" cy="61" r="3" fill="#FF8A00" />
                <circle cx="205" cy="50" r="3" fill="#FF8A00" />
              </svg>

              <Link
                href="/research"
                className="feature-link inline-flex items-center gap-[8px] mb-[8px] text-[#101828] text-[14px] font-bold no-underline hover:text-[#ff8500] transition-colors duration-200"
                onClick={() => setIsResearchOpen(false)}
              >
                Explore Investment Research
                <span>→</span>
              </Link>

              <p className="feature-description text-[#667085] text-[13px] leading-[1.6] m-0">
                Learn mutual funds, markets, portfolio construction, risk and long-term investing with structured research.
              </p>
            </div>

            {/* DIVIDER 1 */}
            <div className="divider hidden md:block w-[1px] bg-[#e8e8e8]" />

            {/* COLUMN 1 */}
            <div className="menu-column flex flex-col gap-[24px]">
              {column1Links.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="menu-link group block no-underline"
                  onClick={() => setIsResearchOpen(false)}
                >
                  <h3 className="mb-[6px] text-[#182230] text-[14px] font-[650] transition-colors duration-200 group-hover:text-[#ff8500] m-0">
                    {item.title}
                  </h3>
                  <p className="text-[#98a2b3] text-[12.5px] leading-[1.5] m-0">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

            {/* DIVIDER 2 */}
            <div className="divider hidden md:block w-[1px] bg-[#e8e8e8]" />

            {/* COLUMN 2 */}
            <div className="menu-column flex flex-col gap-[24px]">
              {column2Links.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="menu-link group block no-underline"
                  onClick={() => setIsResearchOpen(false)}
                >
                  <h3 className="mb-[6px] text-[#182230] text-[14px] font-[650] transition-colors duration-200 group-hover:text-[#ff8500] m-0">
                    {item.title}
                  </h3>
                  <p className="text-[#98a2b3] text-[12.5px] leading-[1.5] m-0">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN PANEL */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-2 flex max-h-[calc(100svh-7rem)] flex-col gap-4 overflow-y-auto overscroll-contain border border-[#eeeeee] bg-white p-5 shadow-xl xl:hidden z-50 rounded-b-2xl",
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
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold text-[#475467] transition-all duration-200 hover:bg-[#fff7ed] hover:text-[#ff8500]",
                          isMobileResearchOpen && "bg-[#fff7ed] text-[#ff8500]",
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
                          className="mt-2 rounded-xl border border-[#eeeeee] bg-[#fffdf7] p-4 flex flex-col gap-5"
                          id="mobile-research-menu"
                        >
                          {/* Feature link */}
                          <div className="pb-3 border-b border-[#eeeeee]">
                            <Link
                              href="/research"
                              className="inline-flex items-center gap-2 text-sm font-bold text-[#101828] hover:text-[#ff8500]"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileResearchOpen(false);
                              }}
                            >
                              Explore Investment Research →
                            </Link>
                            <p className="mt-1 text-xs text-[#667085] leading-relaxed m-0">
                              Learn mutual funds, markets, portfolio construction, risk and long-term investing with structured research.
                            </p>
                          </div>

                          {/* Column 1 */}
                          <div className="flex flex-col gap-3">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff8500] m-0">
                              Research Categories
                            </p>
                            {column1Links.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="block no-underline"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileResearchOpen(false);
                                }}
                              >
                                <p className="text-xs font-bold text-[#182230] hover:text-[#ff8500] m-0">
                                  {item.title}
                                </p>
                                <p className="text-[11px] text-[#98a2b3] m-0">
                                  {item.description}
                                </p>
                              </Link>
                            ))}
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col gap-3 pt-2 border-t border-[#eeeeee]">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff8500] m-0">
                              Analysis & Strategy
                            </p>
                            {column2Links.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="block no-underline"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileResearchOpen(false);
                                }}
                              >
                                <p className="text-xs font-bold text-[#182230] hover:text-[#ff8500] m-0">
                                  {item.title}
                                </p>
                                <p className="text-[11px] text-[#98a2b3] m-0">
                                  {item.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    className={cn(
                      "flex w-full items-center rounded-xl px-4 py-3 text-base font-semibold text-[#475467] transition-all duration-200 hover:bg-[#fff7ed] hover:text-[#ff8500]",
                      isLinkActive(link.href) && "bg-[#fff7ed] text-[#ff8500]",
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

            <div className="h-px bg-[#eeeeee] w-full my-1" />
            <Button
              aria-label="Get started with Solid Wealth"
              variant="black"
              className="w-full justify-center py-3 text-base rounded-full bg-[#050505] text-white font-semibold"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMobileResearchOpen(false);
              }}
            >
              Get Started →
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
