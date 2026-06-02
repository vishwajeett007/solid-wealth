import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketTicker } from "@/components/sections/market-ticker";
import { MutualFundsSection } from "@/components/sections/mutual-funds-section";
import { DownloadAppSection } from "@/components/sections/download-app-section";
import { ContactUsSection } from "@/components/sections/contact-us-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarketTicker />
      <FeaturesSection />
      <MutualFundsSection />
      <ContactUsSection />
      <DownloadAppSection />
    </>
  );
}
