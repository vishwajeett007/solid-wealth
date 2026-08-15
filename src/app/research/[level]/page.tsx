import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchLevelPage } from "@/components/research/research-level-page";
import {
  courseLevels,
  getModulesForLevel,
} from "@/lib/course-curriculum";

type LevelPageProps = {
  params: Promise<{ level: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return courseLevels.map((level) => ({ level: level.id }));
}

export async function generateMetadata({
  params,
}: LevelPageProps): Promise<Metadata> {
  const { level: levelId } = await params;
  const level = courseLevels.find((candidate) => candidate.id === levelId);

  if (!level) return {};

  return {
    title: `${level.title} | Solid Wealth Research`,
    description: `Learn ${level.focus.toLowerCase()} through modules ${level.moduleRange[0]}–${level.moduleRange[1]} of the Solid Wealth Mutual Fund Investment Mastery course.`,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { level: levelId } = await params;
  const levelIndex = courseLevels.findIndex(
    (candidate) => candidate.id === levelId,
  );

  if (levelIndex === -1) notFound();

  const level = courseLevels[levelIndex];

  return (
    <ResearchLevelPage
      level={level}
      modules={getModulesForLevel(level)}
      nextLevel={courseLevels[levelIndex + 1]}
      previousLevel={courseLevels[levelIndex - 1]}
    />
  );
}
