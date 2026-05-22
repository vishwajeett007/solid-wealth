import Image from "next/image";
import Link from "next/link";
import { Apple } from "lucide-react";

export function DownloadAppSection() {
  return (
    <section className="w-full bg-white pt-24 pb-32 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto relative">
        {/* Main Banner Background & Content */}
        <div className="relative w-full bg-[#fe9800] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[300px] shadow-lg">
          {/* Left Pattern */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-[500px] h-[500px] pointer-events-none">
            <Image
              src="/buttombar.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Right Pattern */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 w-[500px] h-[500px] pointer-events-none">
            <Image
              src="/buttombar.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* Left Side: Phones Image */}
          <div className="w-full lg:w-[320px] h-[340px] relative hidden lg:block z-10 -mb-2">
            <Image
              src="/buttomleft.png"
              alt="Solid Wealth App Preview"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 100vw, 350px"
              priority
            />
          </div>

          {/* Center Text & Buttons */}
          <div className="w-full lg:flex-1 flex flex-col items-center text-center py-16 lg:py-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Get started with Solid Wealth
            </h2>
            <p className="text-white text-lg font-medium tracking-wide mb-8">
              Best Investing Platform For You!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="text-[#1a1a1a] font-medium tracking-wide">
                Google Play Store
              </span>
              <Link
                href="#"
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-transform hover:scale-105"
              >
                <Apple className="w-6 h-6 fill-white" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-300">
                    Download on the
                  </span>
                  <span className="text-sm font-semibold mt-0.5">
                    App Store
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="w-full lg:w-[320px] h-[320px] relative hidden lg:block self-end z-10">
            <Image
              src="/buttomright.png"
              alt="Investing Platform Illustration"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 100vw, 350px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
