"use client";

import React, { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  endValue,
  duration = 2000,
  suffix = "",
}: {
  endValue: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 },
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, endValue, duration]);

  return (
    <div
      ref={nodeRef}
      className="text-[48px] md:text-[64px] font-normal tracking-tighter text-black mt-3 leading-none"
    >
      {count}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="about" className="w-full bg-[#FFFDF4] py-20 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto bg-white p-10 md:p-20 md:pr-0 shadow-sm border border-gray-100 rounded-3xl">
        {/* Top Half: Heading and Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-10">
          <div>
            <h2 className="text-4xl md:text-[56px] leading-[1.1] font-medium tracking-tight text-black">
              WE TURN IDEAS
              <br />
              INTO VISUAL
              <br />
              MASTERPIECES
            </h2>
          </div>
          <div className="flex flex-col justify-center items-start">
            <p className="text-[#64748b] text-[15px] leading-relaxed mb-8 max-w-[500px]">
              Whether it's an engaging explainer video, a vibrant social media
              campaign, or captivating motion graphics, we bring creativity and
              expertise to every project.
            </p>
            <button className="px-8 py-3.5 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors rounded-md">
              Know More About us
            </button>
          </div>
        </div>

        {/* Bottom Half: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-100 pt-16">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-wider text-[#64748b] uppercase">
              PROJECTS DELIVERED
            </p>
            <AnimatedCounter endValue={200} suffix="+" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-wider text-[#64748b] uppercase">
              HAPPY CLIENTS
            </p>
            <AnimatedCounter endValue={100} suffix="+" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-wider text-[#64748b] uppercase">
              YEARS OF EXPERIENCE
            </p>
            <AnimatedCounter endValue={15} suffix="" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-wider text-[#64748b] uppercase">
              CLIENTS SATISFACTION
            </p>
            <AnimatedCounter endValue={95} suffix="%" />
          </div>
        </div>
      </div>
    </section>
  );
}
