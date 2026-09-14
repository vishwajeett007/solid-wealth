import type { Metadata } from "next";
import { MUTUAL_FUNDS_DATA, getFundBySlugOrName } from "@/lib/mutual-funds-data";
import { FundCardDetail } from "@/components/mutual-funds/fund-card-detail";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return MUTUAL_FUNDS_DATA.map((fund) => ({
    slug: fund.slug,
  }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const fund = getFundBySlugOrName(resolvedParams.slug);

  return {
    title: `${fund.fullName} - Fund Card & Analytics | Solid Wealth`,
    description: `Detailed factsheet, NAV, asset allocation, yearly performance, risk-o-meter, and SIP returns for ${fund.fullName}.`,
  };
}

export default async function FundSlugPage({ params }: SlugPageProps) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <FundCardDetail initialScheme={resolvedParams.slug} />
      </div>
    </div>
  );
}
