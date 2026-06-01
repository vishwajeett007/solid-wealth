"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4 text-center bg-white pb-20 pt-10">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="lazyOnload" />

      <div className="w-full max-w-[500px] mx-auto relative z-10 -mb-10">
        {/* @ts-expect-error Custom element from lottie-player script */}
        <lottie-player
          src="/404%20notfound/animations/12345.json"
          background="transparent"
          speed="1"
          style={{ width: "100%", height: "350px", maxWidth: "100%" }}
          loop
          autoplay
        />
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1a2332] mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-base md:text-lg">
          Oops! The financial page you're looking for seems to have vanished into thin air. Let's get you back on track.
        </p>

        <Link href="/">
          <Button size="lg" className="bg-[#fe9800] hover:bg-orange-600 text-white rounded-full px-8 h-14 text-base font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
