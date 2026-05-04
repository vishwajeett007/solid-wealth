import { SectionLabel } from "@/components/ui/section-label";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { featuredLogos } from "@/lib/content";

export function FeaturedLogos() {
  return (
    <SectionWrapper className="py-12 sm:py-16">
      <div className="mb-9 text-center">
        <SectionLabel tone="muted">Featured In</SectionLabel>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale lg:justify-between">
        {featuredLogos.map((logo) => (
          <span
            className="font-display text-lg font-extrabold text-wealth-primary"
            key={logo}
          >
            {logo}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}
