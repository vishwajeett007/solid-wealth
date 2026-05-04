import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { sectionIcons, statsImage, wealthStats } from "@/lib/content";

export function StatsSection() {
  return (
    <SectionWrapper
      className="py-16 sm:py-20"
      id="solutions"
      innerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
      width="wide"
    >
      <div className="flex flex-col gap-10">
        <div>
          <SectionLabel icon={sectionIcons.globe}>Global Scale</SectionLabel>
          <SectionHeading className="mt-4">
            Global Scale,
            <br />
            Personal Touch
          </SectionHeading>
          <p className="mt-4 max-w-[420px] text-base leading-relaxed text-wealth-secondary">
            We bridge the gap between institutional power and individual control
            - giving every investor access to tools once reserved for the
            ultra-wealthy.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {wealthStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-extrabold leading-none text-wealth-primary sm:text-5xl">
                {stat.value}
                <span className="text-wealth-accent">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-normal text-wealth-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden rounded-wealth-xl shadow-wealth-xl sm:min-h-[480px]">
        <Image
          alt={statsImage.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={statsImage.src}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wealth-dark-bg/80 to-transparent p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-wealth-pill border border-wealth-accent/40 bg-wealth-accent/20 px-4 py-2 text-sm font-semibold text-wealth-accent-mid">
            <BadgeCheck aria-hidden="true" className="size-4" />
            SOC 2 Type II Certified | $2.4B+ AUM
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
