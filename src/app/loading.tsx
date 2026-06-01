"use client";

import Script from "next/script";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" strategy="lazyOnload" />
      
      <div className="w-full max-w-[200px] mx-auto">
        {/* @ts-expect-error Custom element from lottie-player script */}
        <lottie-player
          src="/loading.json"
          background="transparent"
          speed="1"
          style={{ width: "100%", height: "200px" }}
          loop
          autoplay
        />
      </div>
    </div>
  );
}
