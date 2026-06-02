"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { HeroPhone } from "@/components/sections/hero-phone";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/ui/split-text";
import { avatarImages } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  // =========================================================================
  // ⚙️ MANUAL SCROLL & VISUAL SPEED CONFIGURATION
  // =========================================================================

  // 1. SCROLL_TRACK_HEIGHT: Controls how long the user scrolls in the hero section.
  //    INCREASE this value to make the scroll speed slower and more relaxed!
  const SCROLL_TRACK_HEIGHT = "260vh";

  // 2. ACTIVE_ANIMATION_RATIO: Controls when the animations reach 100% complete (value: 0.1 to 1.0).
  //    E.g. 0.5 means the animation completes halfway through the scroll container track.
  const ACTIVE_ANIMATION_RATIO = 0.5;

  // =========================================================================

  const containerRef = useRef<HTMLDivElement>(null);
  const hemisphereRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const moneyTextRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const isMobileRef = useRef(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const isRevealedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Directly updates DOM nodes on every frame (bypasses React render loop for 120 FPS performance)
  const updateElements = (progress: number) => {
    // Define precise scroll timeline ranges:
    // 0% - 30%: Partial Phone Reveal (only 50-60% becomes visible below title area)
    // 30% - 45%: Stable Hold State
    // 45% - 100%: Layout Transition + Full Reveal (phone shifts right, expands fully visible)
    const tReveal = Math.min(Math.max(progress / 0.3, 0), 1);
    const tLayout = Math.min(Math.max((progress - 0.45) / 0.55, 0), 1);

    // 1. Background dome and concentric orbital ring (Only expands in Phase 3 Layout Transition!)
    // Use a premium cubic ease-in-out curve to make the massive expansion feel incredibly smooth and organic
    const easeLayout =
      tLayout < 0.5
        ? 4 * tLayout * tLayout * tLayout
        : 1 - Math.pow(-2 * tLayout + 2, 3) / 2;

    // Small vertical offset to nudge the main heading slightly higher
    const textYOffset = isMobile ? -8 : -8; // in vh

    if (hemisphereRef.current) {
      const translateY = 70 - easeLayout * 48;
      const scale = 1.15 + easeLayout * 4.5;
      hemisphereRef.current.style.transform = `translate3d(-50%, ${translateY}%, 0) scale(${scale})`;
    }

    if (ringRef.current) {
      const ringTranslateY = 70 - easeLayout * 56;
      const ringScale = 1.15 + easeLayout * 5.6;
      ringRef.current.style.transform = `translate3d(-50%, ${ringTranslateY}%, 0) scale(${ringScale})`;
    }

    // Calculate base Y translation (in vh) from the scroll animation
    const tyBase = isMobileRef.current
      ? (1 - progress) * -5 - 4 + textYOffset * (1 - tLayout)
      : (1 - tLayout) * (tReveal * -5) + tLayout * -4 + textYOffset * (1 - tLayout);

    // Dynamic shift calculation:
    // Calculate if the heading overlaps the hemisphere, and if so, calculate correctionY to shift the text upwards.
    let correctionY = 0;
    if (h1Ref.current && containerRef.current) {
      const h = window.innerHeight;
      const naturalH1Bottom = h / 2 + (isMobile ? -20 : -10);
      const tyBasePx = h * (tyBase / 100);
      
      const currentTranslateY = 70 - easeLayout * 48;
      const currentScale = 1.15 + easeLayout * 4.5;
      const translateYPx = 1350 * (currentTranslateY / 100);
      const hemisphereTop = (h - 675 + translateYPx) - (675 * currentScale);
      
      const margin = 24; // safety margin in pixels
      const requiredCorrection = Math.min(0, hemisphereTop - (naturalH1Bottom + tyBasePx) - margin);
      // Fade the correction out completely by progress = 0.3 (before the left-shifting layout transition starts at 0.45)
      const fadeFactor = Math.max(0, 1 - progress / 0.3);
      correctionY = requiredCorrection * fadeFactor;
    }

    // 2. Column 1: Main Text Container
    if (textRef.current) {
      if (isMobileRef.current) {
        // Mobile layout centering
        textRef.current.style.transform = `translate3d(0, calc(${tyBase}vh + ${correctionY}px), 0)`;
        if (textRef.current.style.textAlign !== "center") {
          textRef.current.style.textAlign = "center";
          textRef.current.style.alignItems = "center";
        }
      } else {
        // Desktop centering-to-split parallax transition
        // Calculate the exact pixel offset to perfectly center the text relative to the browser window.
        const screenWidth = window.innerWidth;
        const screenCenter = screenWidth / 2;

        // Match the layout parameters to calculate natural grid position
        const containerPadding = screenWidth >= 1280 ? 72 : 60; // px-18 vs px-15
        const gap = screenWidth >= 1280 ? 64 : 32;
        const leftFr = screenWidth >= 1280 ? 1.15 : 1.2;
        const rightFr = screenWidth >= 1280 ? 0.85 : 0.8;

        const maxContainer = 1800;
        const availableWidth = Math.min(screenWidth, maxContainer);
        const margin = Math.max(0, (screenWidth - maxContainer) / 2);

        const gridWidth = availableWidth - (containerPadding * 2);
        const freeSpace = gridWidth - gap;
        const leftColWidth = freeSpace * (leftFr / (leftFr + rightFr));

        const leftColCenter = margin + containerPadding + (leftColWidth / 2);
        const shiftPx = screenCenter - leftColCenter;

        const txDesktop = (1 - tLayout) * shiftPx;
        const textScale = 0.96 + tLayout * 0.04;
        textRef.current.style.transform = `translate3d(${txDesktop}px, calc(${tyBase}vh + ${correctionY}px), 0) scale(${textScale})`;

        // Transition text alignment from center -> left as layout animation progresses
        if (tLayout > 0.95) {
          if (textRef.current.style.textAlign !== "left") {
            textRef.current.style.textAlign = "left";
            textRef.current.style.alignItems = "flex-start";
            if (h1Ref.current) h1Ref.current.style.textAlign = "left";
          }
        } else {
          if (textRef.current.style.textAlign !== "center") {
            textRef.current.style.textAlign = "center";
            textRef.current.style.alignItems = "center";
            if (h1Ref.current) h1Ref.current.style.textAlign = "center";
          }
        }
      }
    }

    if (moneyTextRef.current) {
      if (progress > 0.6) {
        if (!moneyTextRef.current.classList.contains("text-white")) {
          moneyTextRef.current.classList.remove("text-[#fe9800]");
          moneyTextRef.current.classList.add("text-white");
        }
      } else {
        if (!moneyTextRef.current.classList.contains("text-[#fe9800]")) {
          moneyTextRef.current.classList.remove("text-white");
          moneyTextRef.current.classList.add("text-[#fe9800]");
        }
      }
    }

    // 3. Section Label badge: Hidden initially, reveals in Phase 3 Layout Transition
    if (labelRef.current) {
      labelRef.current.style.opacity = `${tLayout}`;
      labelRef.current.style.transform = `translate3d(0, ${(1 - tLayout) * -10}px, 0)`;
    }

    // 4. Column 1 Sub-Content: Subtitle, Buttons, and Active Investors
    //    These start fully hidden (opacity 0) and reveal gracefully in Phase 3 Layout Transition
    if (subContentRef.current) {
      const subOpacity = tLayout;
      const subTranslateY = (1 - tLayout) * 20; // 20px slide-up reveal

      subContentRef.current.style.opacity = `${subOpacity}`;
      subContentRef.current.style.transform = `translate3d(0, ${subTranslateY}px, 0)`;
    }

    // 5. Column 2: Phone Mockup illustration
    if (phoneRef.current) {
      let phoneOpacity: number;
      if (isMobileRef.current) {
        // On mobile keep phone visible by default and use a smaller initial offset
        phoneOpacity = 1;
      } else {
        phoneOpacity = tReveal; // Reaches exactly 1.0 (100% opacity) at the end of Phase 2 Phone Reveal and remains 100%
      }

      if (isMobileRef.current) {
        // Mobile slide-up (reduced initial vertical offset so phone is visible)
        const phoneTyMobile = (1 - progress) * 20; // was 50
        const phoneScaleMobile = 0.8 + progress * 0.2;
        phoneRef.current.style.transform = `translate3d(0, ${phoneTyMobile}vh, 0) scale(${phoneScaleMobile})`;
      } else {
        // Desktop curve transition
        // In Phase 2 (Partial Phone Reveal): phoneTxDesktop is locked centered at -55%, rises from bottom (ty: 86vh -> 26vh)
        // In Phase 3 (Hold State): stays stable and locked: tx is -55%, ty is 26vh, scale is 0.95, rotate is -2deg
        // In Phase 4 (Layout Transition + Full Reveal): phoneTxDesktop shifts to right (from -55% to 0%), ty rises up to layout position (from 26vh to 6vh)
        const phoneTxDesktop = (1 - tLayout) * -55;
        const phoneTyDesktop =
          (1 - tReveal) * 60 + (1 - tLayout) * 26 + tLayout * 6;
        const phoneScaleDesktop = 0.8 + tReveal * 0.15 + tLayout * 0.1;
        const phoneRotateDesktop = (1 - tReveal) * -3 + (1 - tLayout) * -2;

        phoneRef.current.style.transform = `translate3d(${phoneTxDesktop}%, ${phoneTyDesktop}vh, 0) scale(${phoneScaleDesktop}) rotate(${phoneRotateDesktop}deg)`;


      }
      phoneRef.current.style.opacity = `${phoneOpacity}`;
    }

    // 6. Bouncing scroll-down arrow helper (Keep user's layout intact)
    if (scrollArrowRef.current) {
      const arrowOpacity = Math.max(0, 1 - progress * 4.5);
      scrollArrowRef.current.style.opacity = `${arrowOpacity}`;
      if (arrowOpacity <= 0) {
        if (scrollArrowRef.current.style.display !== "none") {
          scrollArrowRef.current.style.display = "none";
        }
      } else {
        if (scrollArrowRef.current.style.display !== "flex") {
          scrollArrowRef.current.style.display = "flex";
        }
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

      // Trigger or reset the subtitle split-text stagger based on 60% animation progress
      const shouldReveal = currentProgress.current > 0.6;
      if (shouldReveal !== isRevealedRef.current) {
        isRevealedRef.current = shouldReveal;
        setIsRevealed(shouldReveal);
      }

      animFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Start continuous paint loop
    animFrameId = requestAnimationFrame(tick);

    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      if (isMobileRef.current !== mobile) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
      }
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
      className="relative w-full bg-white/80 z-10"
      style={{ height: isMobile ? "150vh" : SCROLL_TRACK_HEIGHT }}
    >
      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Expanding bottom hemisphere */}
        <div
          ref={hemisphereRef}
          className="absolute bottom-0 left-1/2 rounded-full bg-[#fe9800] pointer-events-none z-0"
          style={{
            width: "1350px",
            height: "1350px",
            transform: "translate3d(-50%, 70%, 0) scale(1.15)",
            transformOrigin: "center center",
            opacity: 0.9,
            willChange: "transform",
          }}
        />

        {/* Cinematic Concentric Orbital Halo Ring */}
        <div
          ref={ringRef}
          className="absolute bottom-0 left-1/2 rounded-full border-4 border-[#fe9800] bg-transparent pointer-events-none z-0 shadow-[0_0_50px_rgba(254,152,0,0.18),inset_0_0_50px_rgba(254,152,0,0.1)]"
          style={{
            width: "1400px",
            height: "1400px",
            transform: "translate3d(-50%, 70%, 0) scale(1.15)",
            transformOrigin: "center center",
            opacity: 0.9,
            willChange: "transform",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 1%, black 32%)",
            maskImage: "linear-gradient(to bottom, transparent 1%, black 32%)",
          }}
        />

        {/* Content Layout wrapper */}
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-15 xl:px-18 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.15fr_0.85fr] lg:gap-8 xl:gap-16 z-10 relative h-full pt-16">
          {/* Column 1: Text Content */}
          <div
            ref={textRef}
            className="flex flex-col gap-6 relative z-20 min-w-0"
            style={{
              textAlign: "center",
              alignItems: "center",
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
              ref={h1Ref}
              className={cn(
                "w-full animate-fade-up font-black text-[#0f1a2c] [animation-delay:100ms]",
                "text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] 2xl:text-[90px] leading-[1.1] tracking-tight",
              )}
            >
              <span className="block whitespace-normal sm:whitespace-nowrap">
                Reimagine{" "}
                <span
                  ref={moneyTextRef}
                  className="drop-shadow-md transition-colors duration-500 text-[#fe9800]"
                >
                  money,
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap">Simple solutions</span>
            </h1>

            {/* Sub-Content container: Hidden initially, fades and slides up at the end of the scroll */}
            <div
              ref={subContentRef}
              className="flex flex-col gap-6 w-full"
              style={{ opacity: 0, transform: "translate3d(0, 20px, 0)" }}
            >
              <SplitText
                text="Experience next-generation wealth management. Transparent, secure, and designed for the modern investor who values clarity over complexity."
                className="max-w-[460px] text-[17px] leading-relaxed text-[#3F3820]"
                delay={20}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign={isMobile ? "center" : "left"}
                trigger={isRevealed}
              />

              <div
                className={cn(
                  "flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]",
                  isMobile && "justify-center",
                )}
              >
                <Button
                  variant="black"
                  className="group relative overflow-hidden"
                  icon={
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1 relative z-10"
                    />
                  }
                  size="lg"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-56 pointer-events-none z-0" />
                  <span className="relative z-10">Get Started</span>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-white text-black border-black"
                >
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
                <p className="hidden sm:block text-[13px] font-medium text-wealth-secondary">
                  <strong className="font-bold text-wealth-primary">
                    50,000+
                  </strong>{" "}
                  active investors
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Mobile UI Mockup */}
          <div className="absolute lg:relative bottom-[-260px] xs:bottom-[-280px] md:bottom-[-320px] lg:bottom-auto left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 w-full max-w-[240px] xs:max-w-[280px] md:max-w-[340px] lg:max-w-none z-30 lg:z-10">
            <div ref={phoneRef} style={{ opacity: 0 }}>
              <HeroPhone />
            </div>
          </div>
        </div>

        {/* Cinematic Bouncing Scroll down Arrow */}
        <div
          ref={scrollArrowRef}
          className="absolute bottom-8 left-[50%] -translate-x-1/2 top-[64%] sm:top-[80%] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300 z-20"
        >
          <span className="text-[11px] pb-2 font-bold tracking-widest uppercase text-wealth-secondary/80 font-mono animate-pulse">
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
