import Image from "next/image";
import Link from "next/link";
import playstore from "../../../public/404 notfound/playstore.png";
export function DownloadAppSection() {
  return (
    <section className="relative w-full bg-[#FFFDF4] pt-16 overflow-hidden mb-8">
      {/* Radial Glow */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-[#fe9800]/35 rounded-full blur-[160px] pointer-events-none" />

      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(to right, #9ca3af 2px, transparent 2px), linear-gradient(to bottom, #9ca3af 2px, transparent 2px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at bottom center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at bottom center, black 30%, transparent 75%)'
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">
        {/* Header Content */}
        <div className="flex flex-col items-center text-center px-4 mb-4 mt-2">
          <h2 className="text-5xl sm:text-4xl md:text-[70px] font-black text-[#0f1a2c] leading-[1.1] tracking-tight mb-1">
            Get started with
          </h2>
          <h2 className="text-5xl sm:text-4xl md:text-[70px] font-black text-[#fe9800] leading-[1.1] tracking-tight mb-2">
            Solid Wealth
          </h2>
          <p className="text-[#879bb8] font-medium text-2xl md:text-4xl mb-6">
            Best Investing Platform For You!
          </p>

          <Link
            href="#"
            className="flex items-center gap-3 bg-[#1e1e1e] text-white px-8 py-4 rounded-[14px] hover:bg-black transition-transform hover:scale-105 shadow-xl shadow-black/10"
          >
            <Image src={playstore} alt="Google Play" className="w-10 h-10" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-xs text-gray-300 font-medium tracking-wide">
                Download on the
              </span>
              <span className="text-lg font-bold mt-1">
                Play Store
              </span>
            </div>
          </Link>
        </div>

        {/* Phone & Floating Icons */}
        <div className="relative w-full max-w-[1200px] h-[400px] md:h-[550px] flex justify-center mt-6">
          {/* Top Left Icon (Red Square) */}
          <div className="absolute top-[5%] left-[2%] md:left-[10%] animate-float-a z-20">
            <div className="relative w-[75px] h-[75px] md:w-[110px] md:h-[110px] -rotate-[8deg] drop-shadow-xl">
              <Image src="/footerfloating.png" alt="Floating icon" fill sizes="(max-width: 768px) 75px, 110px" className="object-contain" />
            </div>
          </div>

          {/* Top Right Icon (Orange Pot) */}
          <div className="absolute -top-[5%] right-[2%] md:right-[8%] animate-float-b z-20">
            <div className="relative w-[80px] h-[80px] md:w-[115px] md:h-[115px] drop-shadow-xl">
              <Image src="/footerfloating1.png" alt="Floating icon" fill sizes="(max-width: 768px) 80px, 115px" className="object-contain" />
            </div>
          </div>

          {/* Bottom Left Icon (Green Square) */}
          <div className="absolute bottom-[30%] left-[4%] md:left-[15%] animate-float-b z-20" style={{ animationDelay: '1s' }}>
            <div className="relative w-[75px] h-[75px] md:w-[105px] md:h-[105px] rotate-[12deg] drop-shadow-xl">
              <Image src="/footerfloating2.png" alt="Floating icon" fill sizes="(max-width: 768px) 75px, 105px" className="object-contain" />
            </div>
          </div>

          {/* Bottom Right Icon (IDFC) */}
          <div className="absolute bottom-[25%] right-[5%] md:right-[12%] animate-float-a z-20" style={{ animationDelay: '1.5s' }}>
            <div className="relative w-[75px] h-[75px] md:w-[105px] md:h-[105px] rotate-[10deg] drop-shadow-xl">
              <Image src="/footerfloating3.png" alt="Floating icon" fill sizes="(max-width: 768px) 75px, 105px" className="object-contain" />
            </div>
          </div>

          {/* Phone */}
          <div className="relative w-[320px] md:w-[450px] z-10 h-full">
            <Image
              src="/footerphone.png"
              alt="Solid Wealth Phone Mockup"
              fill
              sizes="(max-width: 768px) 320px, 450px"
              className="object-contain object-top drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scrolling Text Marquee (Full Screen Width) */}
      <div className="w-full overflow-hidden whitespace-nowrap mt-[-80px] relative z-20 pointer-events-none bg-white/70 py-1">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-[#FFFDF4] from-10% to-transparent z-10" />
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-[#FFFDF4] from-10% to-transparent z-10" />

        <div className="animate-ticker inline-flex items-center">
          {[1, 2, 3].map((i) => (
            <span key={i} className="text-[35px] md:text-[60px] lg:text-[65px] font-black text-[#fe9800]/40 mx-4 tracking-wider uppercase" style={{ fontFamily: 'var(--font-sora)' }}>
              Securing Futures. Building Wealth.
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
