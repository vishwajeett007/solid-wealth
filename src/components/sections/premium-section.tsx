import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { premiumBenefits, premiumImage, sectionIcons } from "@/lib/content";

export function PremiumSection() {
  return (
    <SectionWrapper
      className="py-16 sm:py-20"
      id="about"
      innerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
      width="wide"
    >
      <div className="relative min-h-[360px] overflow-hidden rounded-wealth-xl shadow-wealth-xl sm:min-h-[520px]">
        <Image
          alt={premiumImage.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={premiumImage.src}
        />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <SectionLabel icon={sectionIcons.gem}>Premium Tier</SectionLabel>
          <SectionHeading className="mt-4">
            Designed for the
            <br />
            Modern Elite
          </SectionHeading>
        </div>

        <div className="flex flex-col gap-5">
          {premiumBenefits.map((benefit) => (
            <div className="flex items-start gap-3.5" key={benefit.lead}>
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-wealth-accent-light text-wealth-accent-dark">
                <Check aria-hidden="true" className="size-3.5" />
              </div>
              <p className="text-[15px] leading-relaxed text-wealth-secondary">
                <strong className="font-semibold text-wealth-primary">
                  {benefit.lead}
                </strong>{" "}
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>

        <Button
          icon={<ArrowRight aria-hidden="true" className="size-4" />}
          size="lg"
        >
          Explore Premium
        </Button>
      </div>
    </SectionWrapper>
  );
}
