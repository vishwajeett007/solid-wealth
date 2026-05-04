import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { featureItems, sectionIcons } from "@/lib/content";

export function FeaturesSection() {
  return (
    <SectionWrapper className="py-16 sm:py-20" id="features">
      <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
        <SectionLabel icon={sectionIcons.bolt}>Core Features</SectionLabel>
        <SectionHeading className="mt-3">
          Everything you need,
          <br />
          nothing you don&apos;t
        </SectionHeading>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featureItems.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              as="article"
              className="group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-wealth-xl"
              key={feature.title}
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-wealth-accent to-wealth-accent-mid opacity-0 transition group-hover:opacity-100" />
              <div className="mb-5 flex size-[52px] items-center justify-center rounded-wealth-sm bg-wealth-accent-light text-wealth-accent-dark">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <h3 className="mb-2.5 font-display text-lg font-bold text-wealth-primary">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-wealth-secondary">
                {feature.description}
              </p>
              <Link
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-wealth-accent transition-all hover:gap-2"
                href={feature.href}
              >
                Learn more
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
