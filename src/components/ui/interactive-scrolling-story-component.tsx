"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const slidesData = [
  {
    title: "01. Portfolio Dashboard",
    description:
      "The portfolio dashboard serves as the centerpiece of the app, offering users a real-time overview of their mutual fund investments. It consolidates key information, including total portfolio value, recent transactions, and performance trends, all in one place.",
    subtitle: "To simplify decision-making, the dashboard features:",
    bullets: ["Clear Visuals", "Quick Insights", "Customizable Views"],
    image: "/feature.png",
    bgColor: "#FFFDF4",
    textColor: "#0f1a2c",
  },
  {
    title: "02. Seamless CAN Registration",
    description:
      "One of the most significant barriers for mutual fund investors is the tedious onboarding process, particularly the CAN (Common Account Number) registration. The app addresses this with a streamlined, integrated approach.",
    subtitle: "Core benefits include:",
    bullets: ["Direct Integration", "Simplified Steps", "Faster Approvals"],
    image: "/feature1.png",
    bgColor: "#FFFDF4",
    textColor: "#0f1a2c",
  },
  {
    title: "03. Risk Analyzer",
    description:
      "One of the most significant barriers for mutual fund investors is the tedious onboarding process, particularly the CAN (Common Account Number) registration. The app addresses this with a streamlined, integrated approach.",
    subtitle: "Core benefits include:",
    bullets: ["Direct Integration", "Simplified Steps", "Faster Approvals"],
    image: "/feature2.png",
    bgColor: "#FFFDF4",
    textColor: "#0f1a2c",
  },
];

export function ScrollingFeatureShowcase() {
  return (
    <div className="w-full bg-[#FFFDF4] pt-8 pb-0 md:pt-12 md:pb-0 relative">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(254, 152, 0, 0.08) 2px, transparent 2px), linear-gradient(to bottom, rgba(254, 152, 0, 0.08) 2px, transparent 2px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 120px, transparent 0%, transparent 350px, black 700px, black 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 120px, transparent 0%, transparent 350px, black 700px, black 70%, transparent 100%)'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 mb-6 md:mb-10 text-center relative z-20">
        <span className="inline-flex items-center px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full bg-wealth-accent/10 text-wealth-accent mb-4">
          Features
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-[#0f1a2c] tracking-tight drop-shadow-sm">
          Powerful Tools for <span className="text-[#fe9800]">Modern</span> Investors
        </h2>
      </div>

      <div className="relative z-10">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={280}
          itemStackDistance={60}
          stackPosition="25%"
          scaleEndPosition="10%"
          baseScale={0.85}
          blurAmount={4}
        >
          {slidesData.map((slide, index) => (
            <ScrollStackItem key={index}>
              <div className="flex flex-col md:flex-row h-full w-full bg-white rounded-[40px] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
                {/* Left Content */}
                <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center relative">
                  <h3 className="text-3xl md:text-5xl font-black text-[#0f1a2c] mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                    {slide.description}
                  </p>
                  {slide.subtitle && (
                    <p className="text-lg text-gray-700 font-medium mb-4">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.bullets && slide.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {slide.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center text-lg text-gray-600 font-medium">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#fe9800] mr-4 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
  
                {/* Right Image */}
                <div className="hidden md:flex flex-1 relative min-h-full bg-gray-50 items-center justify-center p-8">
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[500px]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
}
