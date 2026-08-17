import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLevelPage } from "@/components/research/research-level-page";
import { courseCurriculum, courseLevels, getModulesForLevel, type CourseLevel, } from "@/lib/course-curriculum";
type LevelPageProps = {
    params: Promise<{
        level: string;
    }>;
};
export const dynamicParams = true;
function findLevelForSlug(slug: string): {
    level: CourseLevel;
    index: number;
} | null {
    const normalized = slug.toLowerCase().trim();
    let index = courseLevels.findIndex((l) => l.id.toLowerCase() === normalized);
    if (index !== -1)
        return { level: courseLevels[index], index };
    const levelNumMatch = normalized.match(/^(?:level-)?([1-8])$/);
    if (levelNumMatch) {
        const num = parseInt(levelNumMatch[1], 10);
        index = courseLevels.findIndex((l) => l.levelNumber === num);
        if (index !== -1)
            return { level: courseLevels[index], index };
    }
    const moduleNumMatch = normalized.match(/^(?:module-|m)?([1-9]|[12][0-9])$/);
    if (moduleNumMatch) {
        const modNum = parseInt(moduleNumMatch[1], 10);
        const targetModule = courseCurriculum.find((m) => m.moduleNumber === modNum);
        if (targetModule) {
            index = courseLevels.findIndex((l) => modNum >= l.moduleRange[0] && modNum <= l.moduleRange[1]);
            if (index !== -1)
                return { level: courseLevels[index], index };
        }
    }
    return null;
}
export function generateStaticParams() {
    const levelSlugs = courseLevels.map((level) => ({ level: level.id }));
    const levelNumSlugs = courseLevels.map((level) => ({ level: String(level.levelNumber) }));
    const moduleSlugs = courseCurriculum.map((m) => ({ level: m.id }));
    const moduleNumSlugs = courseCurriculum.map((m) => ({ level: String(m.moduleNumber) }));
    return [...levelSlugs, ...levelNumSlugs, ...moduleSlugs, ...moduleNumSlugs];
}
export async function generateMetadata({ params, }: LevelPageProps): Promise<Metadata> {
    const { level: slug } = await params;
    const match = findLevelForSlug(slug);
    if (!match)
        return {};
    const { level } = match;
    return {
        title: `${level.title} | Solid Wealth Investment Education`,
        description: `Learn ${level.focus.toLowerCase()} through modules ${level.moduleRange[0]}–${level.moduleRange[1]} of the Solid Wealth Mutual Fund Investment Mastery course.`,
    };
}
export default async function LevelPage({ params }: LevelPageProps) {
    const { level: slug } = await params;
    const match = findLevelForSlug(slug);
    if (!match)
        notFound();
    const { level, index: levelIndex } = match;
    return (<ResearchLevelPage level={level} modules={getModulesForLevel(level)} nextLevel={courseLevels[levelIndex + 1]} previousLevel={courseLevels[levelIndex - 1]}/>);
}
