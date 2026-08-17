import Image from "next/image";
export function HeroPhone() {
    return (<div className="relative mx-auto flex justify-center py-4 lg:py-[clamp(8px,2dvh,24px)]">
      <div className="relative z-20 w-[320px] drop-shadow-[0_40px_80px_rgba(15,26,44,0.18)] sm:w-[420px] md:w-[480px] lg:w-[min(42vw,74dvh,760px)]">
        <Image alt="Solid Wealth App Mockup" className="h-auto w-full drop-shadow-2xl" height={806} priority sizes="(max-width: 639px) 320px, (max-width: 767px) 420px, (max-width: 1023px) 480px, min(42vw, 760px)" src="/herophone.png" width={1024}/>
      </div>
    </div>);
}
