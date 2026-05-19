"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { HeroPhone } from "@/components/sections/hero-phone";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { avatarImages } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  // =========================================================================
  // ⚙️ MANUAL SCROLL & VISUAL SPEED CONFIGURATION
  // =========================================================================

  // 1. SCROLL_TRACK_HEIGHT: Controls how long the user scrolls in the hero section.
  //    INCREASE this value to make the scroll speed slower and more relaxed!
  const SCROLL_TRACK_HEIGHT = "310vh";

  // 2. ACTIVE_ANIMATION_RATIO: Controls when the animations reach 100% complete (value: 0.1 to 1.0).
  //    E.g. 0.5 means the animation completes halfway through the scroll container track.
  const ACTIVE_ANIMATION_RATIO = 0.5;

  // =========================================================================

  const containerRef = useRef<HTMLDivElement>(null);
  const hemisphereRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Directly updates DOM nodes on every frame (bypasses React render loop for 120 FPS performance)
  const updateElements = (progress: number) => {
    // 1. Expanding hemisphere dome background
    if (hemisphereRef.current) {
      const translateY = 70 - progress * 48;
      const scale = 1 + progress * 4.5;
      hemisphereRef.current.style.transform = `translate(-50%, ${translateY}%) scale(${scale})`;
    }

    // 2. Column 1: Main Text Container
    if (textRef.current) {
      if (window.innerWidth < 1024) {
        // Mobile layout centering
        const tyMobile = (1 - progress) * -5;
        textRef.current.style.transform = `translate3d(0, ${tyMobile}vh, 0)`;
      } else {
        // Desktop centering-to-split parallax transition
        const txDesktop = (1 - progress) * 23;
        const tyDesktop = (1 - progress) * -7;
        const textScale = 0.96 + progress * 0.04;
        textRef.current.style.transform = `translate3d(${txDesktop}vw, ${tyDesktop}vh, 0) scale(${textScale})`;
      }
    }

    // 3. Section Label badge: Hidden initially, reveals at the end of the scroll (60% to 100% progress)
    if (labelRef.current) {
      const labelProgress = Math.max(0, (progress - 0.6) / 0.4);
      labelRef.current.style.opacity = `${labelProgress}`;
      labelRef.current.style.transform = `translate3d(0, ${(1 - labelProgress) * -10}px, 0)`;
    }

    // 4. Column 1 Sub-Content: Subtitle, Buttons, and Active Investors
    //    These start fully hidden (opacity 0) and reveal gracefully at the end of the scroll (60% to 100% progress)
    if (subContentRef.current) {
      const subProgress = Math.max(0, (progress - 0.6) / 0.4);
      const subOpacity = subProgress;
      const subTranslateY = (1 - subProgress) * 20; // 20px slide-up reveal

      subContentRef.current.style.opacity = `${subOpacity}`;
      subContentRef.current.style.transform = `translate3d(0, ${subTranslateY}px, 0)`;
    }

    // 5. Column 2: Phone Mockup illustration
    if (phoneRef.current) {
      const phoneOpacity =
        window.innerWidth < 1024
          ? Math.max(0, (progress - 0.05) / 0.95)
          : Math.max(0, (progress - 0.15) / 0.85);

      if (window.innerWidth < 1024) {
        // Mobile slide-up
        const phoneTyMobile = (1 - progress) * 25;
        const phoneScaleMobile = 0.8 + progress * 0.2;
        phoneRef.current.style.transform = `translate3d(0, ${phoneTyMobile}vh, 0) scale(${phoneScaleMobile})`;
      } else {
        // Desktop curve transition
        const phoneTxDesktop = (1 - progress) * -23;
        const phoneTyDesktop = (1 - progress) * 25;
        const phoneScaleDesktop = 0.7 + progress * 0.3;
        phoneRef.current.style.transform = `translate3d(${phoneTxDesktop}vw, ${phoneTyDesktop}vh, 0) scale(${phoneScaleDesktop})`;
      }
      phoneRef.current.style.opacity = `${phoneOpacity}`;
    }

    // 6. Bouncing scroll-down arrow helper (Keep user's layout intact)
    if (scrollArrowRef.current) {
      const arrowOpacity = Math.max(0, 1 - progress * 4.5);
      scrollArrowRef.current.style.opacity = `${arrowOpacity}`;
      if (arrowOpacity <= 0) {
        scrollArrowRef.current.style.display = "none";
      } else {
        scrollArrowRef.current.style.display = "flex";
      }
    }
  };

  useEffect(() => {
    let animFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight =
        containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      // Target active animation progress
      const progress = Math.min(
        Math.max(scrolled / (totalHeight * ACTIVE_ANIMATION_RATIO), 0),
        1,
      );
      targetProgress.current = progress;
    };

    // 60FPS / 120FPS LERP inertia damping loop
    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;
      // 0.16 easing constant delivers a tighter, more responsive scroll track following
      currentProgress.current += diff * 0.16;

      updateElements(currentProgress.current);

      animFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Start continuous paint loop
    animFrameId = requestAnimationFrame(tick);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      updateElements(currentProgress.current);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-wealth-bg z-10"
      style={{ height: SCROLL_TRACK_HEIGHT }}
    >
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Expanding bottom hemisphere */}
        <div
          ref={hemisphereRef}
          className="absolute bottom-0 left-1/2 -translate-y-[15%] sm:translate-y-[0%] rounded-full bg-gradient-to-b from-blue-300/60 via-blue-200/50 to-wealth-bg pointer-events-none z-0"
          style={{
            width: "1200px",
            height: "1200px",
            transform: "translate(-50%, 70%) scale(1)",
            transformOrigin: "center center",
            opacity: 0.9,
          }}
        />

        {/* Content Layout wrapper */}
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 z-10 relative h-full pt-16">
          {/* Column 1: Text Content */}
          <div
            ref={textRef}
            className="flex flex-col gap-6 relative z-20"
            style={{
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "flex-start",
            }}
          >
            {/* Section label badge: Hidden initially, slides down and fades in at the end of the scroll */}
            {/* <div
              ref={labelRef}
              style={{ opacity: 0, transform: "translate3d(0, -10px, 0)" }}
            >
              <SectionLabel className="animate-fade-up">
                Next-Gen Wealth Platform
              </SectionLabel>
            </div> */}

            <h1
              className={cn(
                "animate-fade-up font-display font-extrabold leading-tight tracking-normal text-wealth-primary [animation-delay:100ms] text-4xl sm:text-5xl lg:text-6xl mr-4 mt-10 sm:mt-0",
                isMobile && "text-center",
              )}
            >
              Reimagine{" "}
              <span className="bg-gradient-to-r from-wealth-accent to-wealth-teal bg-clip-text text-transparent">
                money,
              </span>
              <br className="hidden sm:block" />
              Simple solutions
            </h1>

            {/* Sub-Content container: Hidden initially, fades and slides up at the end of the scroll */}
            <div
              ref={subContentRef}
              className="flex flex-col gap-6 w-full"
              style={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
            >
              <p
                className={cn(
                  "max-w-[460px] animate-fade-up text-[17px] leading-relaxed text-wealth-secondary [animation-delay:200ms]",
                  isMobile && "text-center",
                )}
              >
                Experience next-generation wealth management. Transparent,
                secure, and designed for the modern investor who values clarity
                over complexity.
              </p>

              <div
                className={cn(
                  "flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]",
                  isMobile && "justify-center",
                )}
              >
                <Button
                  icon={<ArrowRight aria-hidden="true" className="size-4" />}
                  size="lg"
                >
                  Get Started
                </Button>
                <Button size="lg" variant="ghost">
                  Learn More
                </Button>
              </div>

              <div className="flex animate-fade-up items-center gap-3.5 [animation-delay:450ms]">
                <div className="flex">
                  {avatarImages.map((avatar, index) => (
                    <Image
                      alt={avatar.alt}
                      className={cn(
                        "size-[38px] rounded-full border-[2.5px] border-wealth-surface object-cover",
                        index > 0 && "-ml-2.5",
                      )}
                      height={38}
                      key={avatar.src}
                      src={avatar.src}
                      width={38}
                    />
                  ))}
                </div>
                <p className="text-[13px] font-medium text-wealth-secondary">
                  <strong className="font-bold text-wealth-primary">
                    50,000+
                  </strong>{" "}
                  active investors
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Mobile UI Mockup */}
          <div ref={phoneRef} style={{ opacity: 0 }}>
            <HeroPhone />
          </div>
        </div>

        {/* Cinematic Bouncing Scroll down Arrow */}
        <div
          ref={scrollArrowRef}
          className="absolute bottom-8 left-[50%] -translate-x-1/2 top-[64%] sm:top-[80%] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300 z-20"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase text-wealth-secondary/80 font-mono animate-pulse">
            Scroll to explore
          </span>
          <div className="flex size-10 items-center justify-center rounded-full bg-white border border-wealth-border shadow-wealth-sm text-wealth-accent animate-bounce">
            <ChevronDown className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
