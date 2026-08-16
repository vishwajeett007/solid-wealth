import type { Metadata } from "next";
import { ResearchCourse } from "@/components/research/research-course";
export const metadata: Metadata = {
    title: "Mutual Fund Investment Mastery | Solid Wealth Research",
    description: "Explore Solid Wealth's structured 26-module mutual fund education curriculum, from investing foundations to portfolio construction and practical case studies.",
};
export default function ResearchPage() {
    return <ResearchCourse />;
}
