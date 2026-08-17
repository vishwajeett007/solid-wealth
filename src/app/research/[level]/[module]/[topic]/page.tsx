import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchTopicArticle } from "@/components/research/research-topic-article";
import {
  createTopicSlug,
  getCourseTopicEntries,
} from "@/lib/course-curriculum";
import { getTopicExplanation } from "@/lib/course-topic-explanations";

type TopicPageProps = {
  params: Promise<{
    level: string;
    module: string;
    topic: string;
  }>;
};

const topicEntries = getCourseTopicEntries();

export const dynamicParams = false;

function findTopicEntry(levelSlug: string, moduleSlug: string, topicSlug: string) {
  const index = topicEntries.findIndex(
    (entry) =>
      entry.level.id === levelSlug &&
      entry.courseModule.id === moduleSlug &&
      createTopicSlug(entry.topic) === topicSlug,
  );

  if (index === -1) return null;

  return {
    entry: topicEntries[index],
    index,
  };
}

export function generateStaticParams() {
  return topicEntries.map((entry) => ({
    level: entry.level.id,
    module: entry.courseModule.id,
    topic: createTopicSlug(entry.topic),
  }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { level, module, topic } = await params;
  const match = findTopicEntry(level, module, topic);

  if (!match) return {};

  const { entry } = match;
  const explanation = getTopicExplanation(entry.courseModule, entry.topic);

  return {
    title: `${entry.topic} | Solid Wealth Investment Education`,
    description: explanation,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { level, module, topic } = await params;
  const match = findTopicEntry(level, module, topic);

  if (!match) notFound();

  const { entry, index } = match;

  return (
    <ResearchTopicArticle
      courseModule={entry.courseModule}
      level={entry.level}
      nextTopic={topicEntries[index + 1]}
      previousTopic={topicEntries[index - 1]}
      topic={entry.topic}
      topicIndex={entry.topicIndex}
    />
  );
}
