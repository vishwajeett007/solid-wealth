import Image from "next/image";

export function HeroPhone() {
  return (
    <div className="relative mx-auto flex justify-center py-4 lg:py-6">
      <div className="relative z-20 w-[320px] drop-shadow-[0_40px_80px_rgba(15,26,44,0.18)] sm:w-[420px] md:w-[480px] lg:w-[640px] xl:w-[760px]">
        <Image
          alt="Solid Wealth App Mockup"
          className="h-auto w-full drop-shadow-2xl"
          height={1240}
          priority
          src="/herophone.png"
          width={620}
        />
      </div>
    </div>
  );
}
