import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";
import posterImg from "../../../public/poster.png";

interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  role: string;
  avatarColor: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    title: "Fantastic Platform",
    text: "Solid Wealth provided clear, strategic financial guidance that helped me make confident investment decisions. Their professionalism and personalized approach truly set them apart.",
    author: "Rajesh Mehta",
    role: "Business Owner",
    avatarColor: "bg-[#ff0000]", // Solid red avatar from the mockup
  },
  {
    id: 2,
    title: "Fantastic Platform",
    text: "Solid Wealth provided clear, strategic financial guidance that helped me make confident investment decisions. Their professionalism and personalized approach truly set them apart.",
    author: "Rajesh Mehta",
    role: "Business Owner",
    avatarColor: "bg-[#ff0000]",
  },
  {
    id: 3,
    title: "Fantastic Platform",
    text: "Solid Wealth provided clear, strategic financial guidance that helped me make confident investment decisions. Their professionalism and personalized approach truly set them apart.",
    author: "Rajesh Mehta",
    role: "Business Owner",
    avatarColor: "bg-[#ff0000]",
  },
];

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative w-full bg-[#FFFDF4] pt-20 pb-0 overflow-hidden flex flex-col items-center"
    >
      {/* Radial Glow behind the poster */}
      <div className="absolute bottom-[-600px] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-[#fe9800]/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Background Grid Pattern - exact styling from Get started section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9ca3af 2px, transparent 2px), linear-gradient(to bottom, #9ca3af 2px, transparent 2px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at bottom center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at bottom center, black 30%, transparent 75%)",
        }}
      />

      {/* Header Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mb-14 max-w-[800px]">
        {/* Section Label Badge */}
        <SectionLabel className="mb-5 shadow-sm bg-[#FCE7C4] text-[#C99026] hover:scale-105 transition-transform duration-300">
          Review Section
        </SectionLabel>

        {/* Heading */}
        <h2 className="text-4xl md:text-[54px] font-black tracking-tight text-[#0f1a2c] leading-[1.15]">
          What the <span className="text-[#fe9800]">Clients</span> Say
        </h2>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-4">
        {reviewsData.map((review, idx) => {
          // Staggered layout translation styling:
          // Left card (idx === 0) -> shifted down (md:translate-y-14)
          // Middle card (idx === 1) -> shifted up (md:-translate-y-6)
          // Right card (idx === 2) -> shifted down (md:translate-y-14)
          const isMiddle = idx === 1;
          const staggerClass = isMiddle
            ? "md:translate-y-6 md:z-20"
            : "md:translate-y-24 md:z-10";

          // Micro-animations: float effect
          const floatClass = idx === 0 
            ? "animate-float-a" 
            : idx === 1 
            ? "animate-float-b" 
            : "animate-float-a [animation-delay:1.8s]";

          return (
            <div
              key={review.id}
              className={cn(
                "bg-white border border-[#EBEFF5] rounded-[32px] p-8 lg:p-10 shadow-[0_8px_30px_rgb(15,26,44,0.04)]",
                "hover:shadow-[0_24px_50px_rgba(15,26,44,0.08)] hover:scale-[1.03] hover:-translate-y-1 hover:z-30",
                "transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-[360px]",
                staggerClass,
                floatClass
              )}
            >
              {/* Card Header: Stars & Google Logo */}
              <div className="flex items-center justify-between">
                {/* 5 Gold Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#fe9800] text-[#fe9800] stroke-[1.5]"
                    />
                  ))}
                </div>

                {/* Google multi-colored icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
              </div>

              {/* Review Title & Content */}
              <div className="flex-1 mt-6 flex flex-col justify-start">
                <h4 className="text-xl font-extrabold text-[#0f1a2c] mb-3 leading-snug">
                  {review.title}
                </h4>
                <p className="text-sm leading-relaxed text-[#495973] font-medium line-clamp-5">
                  {review.text}
                </p>
              </div>

              {/* Card Footer: Avatar & User Metadata */}
              <div className="flex items-center gap-3.5 mt-6 border-t border-[#F0F4FA] pt-5">
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex-shrink-0 shadow-sm border border-black/5",
                    review.avatarColor
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-[#0f1a2c] leading-tight">
                    {review.author}
                  </span>
                  <span className="text-[12px] font-semibold text-[#879bb8] mt-0.5">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Poster Image Container */}
      <div className="w-full max-w-[800px] mx-auto mt-12 md:mt-24 lg:mt-28 relative px-4 select-none pointer-events-none z-20 flex justify-center">
        <Image
          src={posterImg}
          alt="Solid Wealth Reviews Envelope"
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
