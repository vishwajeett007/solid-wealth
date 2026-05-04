import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { HeroPhone } from "@/components/sections/hero-phone";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { avatarImages } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <SectionWrapper
      className="relative overflow-hidden bg-[linear-gradient(125deg,rgba(214,245,234,0.78)_0%,rgba(245,250,248,0)_46%)] py-16 sm:py-20 lg:py-24"
      innerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
      width="wide"
    >
      <div className="flex flex-col gap-6">
        <SectionLabel className="animate-fade-up">Next-Gen Wealth Platform</SectionLabel>

        <h1 className="animate-fade-up font-display text-4xl font-extrabold leading-tight tracking-normal text-wealth-primary [animation-delay:100ms] sm:text-5xl lg:text-6xl">
          Reimagine{" "}
          <span className="bg-gradient-to-r from-wealth-accent to-[#0AB5A8] bg-clip-text text-transparent">
            money,
          </span>
          <br className="hidden sm:block" />
          Simple solutions
        </h1>

        <p className="max-w-[460px] animate-fade-up text-[17px] leading-relaxed text-wealth-secondary [animation-delay:200ms]">
          Experience next-generation wealth management. Transparent, secure,
          and designed for the modern investor who values clarity over
          complexity.
        </p>

        <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
          <Button
            icon={<ArrowRight aria-hidden="true" className="size-4" />}
            size="lg"
          >
            Get Started
          </Button>
          <Button size="lg" variant="ghost">
            Learn More
          </Button>
        </div>

        <div className="flex animate-fade-up items-center gap-3.5 [animation-delay:450ms]">
          <div className="flex">
            {avatarImages.map((avatar, index) => (
              <Image
                alt={avatar.alt}
                className={cn(
                  "size-[38px] rounded-full border-[2.5px] border-wealth-surface object-cover",
                  index > 0 && "-ml-2.5",
                )}
                height={38}
                key={avatar.src}
                src={avatar.src}
                width={38}
              />
            ))}
          </div>
          <p className="text-[13px] font-medium text-wealth-secondary">
            <strong className="font-bold text-wealth-primary">50,000+</strong>{" "}
            active investors
          </p>
        </div>
      </div>

      <HeroPhone />
    </SectionWrapper>
  );
}
