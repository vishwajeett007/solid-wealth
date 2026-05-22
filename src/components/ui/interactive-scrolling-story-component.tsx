"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slidesData = [
  {
    title: "01. Portfolio Dashboard",
    description:
      "The portfolio dashboard serves as the centerpiece of the app, offering users a real-time overview of their mutual fund investments. It consolidates key information, including total portfolio value, recent transactions, and performance trends, all in one place.",
    subtitle: "To simplify decision-making, the dashboard features:",
    bullets: ["Clear Visuals", "Quick Insights", "Customizable Views"],
    image: "/feature.png",
    bgColor: "#ffffff",
    textColor: "#0f1a2c",
  },
  {
    title: "02. Seamless CAN Registration",
    description:
      "One of the most significant barriers for mutual fund investors is the tedious onboarding process, particularly the CAN (Common Account Number) registration. The app addresses this with a streamlined, integrated approach.",
    subtitle: "Core benefits include:",
    bullets: ["Direct Integration", "Simplified Steps", "Faster Approvals"],
    image: "/feature1.png",
    bgColor: "#ffffff",
    textColor: "#0f1a2c",
  },
  {
    title: "03. Risk Analyzer",
    description:
      "One of the most significant barriers for mutual fund investors is the tedious onboarding process, particularly the CAN (Common Account Number) registration. The app addresses this with a streamlined, integrated approach.",
    subtitle: "Core benefits include:",
    bullets: ["Direct Integration", "Simplified Steps", "Faster Approvals"],
    image: "/feature2.png",
    bgColor: "#ffffff",
    textColor: "#0f1a2c",
  },
];

export function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // Calculate how far the user has scrolled through this specific container
      // 0 means just entered the top of the viewport, 1 means reached the end of its sticky duration
      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      }

      // Map progress to an index
      const newActiveIndex = Math.min(
        slidesData.length - 1,
        Math.max(0, Math.floor(progress * slidesData.length)),
      );

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // We calculate the absolute page Y position for the target slide
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const stepHeight = scrollableHeight / slidesData.length;

    // The exact position on the page where this slide starts
    const targetY =
      window.scrollY +
      container.getBoundingClientRect().top +
      stepHeight * index;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const dynamicStyles = {
    backgroundColor: slidesData[activeIndex].bgColor,
    color: slidesData[activeIndex].textColor,
    transition: "background-color 0.7s ease, color 0.7s ease",
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative z-20 w-full bg-white"
      style={{ height: `${slidesData.length * 120}vh` }}
    >
      <div
        ref={stickyPanelRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={dynamicStyles}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-[1400px] mx-auto px-6 md:px-16">
          {/* Left Column: Text Content & Pagination */}
          <div className="relative flex flex-col justify-center h-full py-16 md:pr-12">
            {/* Badge */}
            <div className="absolute top-[20%] left-0">
              <span className="inline-flex items-center px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-md bg-wealth-accent text-white shadow-sm">
                Features
              </span>
            </div>

            <div className="relative h-[400px] w-full flex flex-col justify-center mt-12">
              {slidesData.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-10 pointer-events-none"
                  }`}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-[54px] font-display font-bold tracking-tight text-wealth-primary mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-[19px] leading-relaxed text-wealth-secondary mb-6 max-w-[540px]">
                    {slide.description}
                  </p>
                  {slide.subtitle && (
                    <p className="text-lg md:text-[19px] leading-relaxed text-wealth-secondary mb-5 max-w-[540px]">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.bullets && slide.bullets.length > 0 && (
                    <ul className="space-y-4">
                      {slide.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-center text-lg md:text-[19px] text-wealth-secondary font-medium"
                        >
                          <span className="w-2 h-2 rounded-full bg-wealth-primary mr-4 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="absolute bottom-[10%] left-0 flex items-center gap-6">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-all duration-300",
                  activeIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-gray-200 text-wealth-primary hover:bg-gray-300 hover:scale-105 shadow-sm",
                )}
                disabled={activeIndex === 0}
              >
                <ArrowLeft className="size-5" />
              </button>
              <span className="text-xl font-bold text-wealth-primary tracking-widest">
                0{activeIndex + 1}/0{slidesData.length}
              </span>
              <button
                onClick={() =>
                  scrollToSlide(
                    Math.min(slidesData.length - 1, activeIndex + 1),
                  )
                }
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-all duration-300",
                  activeIndex === slidesData.length - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-wealth-primary text-white hover:bg-wealth-primary/90 hover:scale-105 shadow-md",
                )}
                disabled={activeIndex === slidesData.length - 1}
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Image Content */}
          <div className="hidden md:flex items-center justify-center relative h-full w-full">
            <div className="relative w-full max-w-[600px] h-[600px]">
              {slidesData.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === activeIndex
                      ? "opacity-100 scale-100"
                      : index < activeIndex
                        ? "opacity-0 scale-95 -translate-y-8"
                        : "opacity-0 scale-105 translate-y-8"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
