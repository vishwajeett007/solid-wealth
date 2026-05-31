import { AnalyticsSection } from "@/components/sections/analytics-section";
import { CTASection } from "@/components/sections/cta-section";
import { FeaturedLogos } from "@/components/sections/featured-logos";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketTicker } from "@/components/sections/market-ticker";
import { PremiumSection } from "@/components/sections/premium-section";
import { StatsSection } from "@/components/sections/stats-section";
import { MutualFundsSection } from "@/components/sections/mutual-funds-section";
import { DownloadAppSection } from "@/components/sections/download-app-section";
import { ContactUsSection } from "@/components/sections/contact-us-section";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarketTicker />
      <FeaturesSection />
      {/* <StatsSection /> */}
      <MutualFundsSection />
      {/* <FeaturedLogos /> */}
      {/* <AnalyticsSection /> */}
      {/* <PremiumSection /> */}
      {/* <CTASection /> */}
      <ContactUsSection />
      <DownloadAppSection />
    </>
  );
}
