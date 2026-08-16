import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, ExternalLink, FileText, GraduationCap, ShieldCheck, } from "lucide-react";
import type { CourseLevel, CourseModule } from "@/lib/course-curriculum";
import { courseReferenceSources, getTopicExplanation, } from "@/lib/course-topic-explanations";
type ResearchLevelPageProps = {
    level: CourseLevel;
    modules: CourseModule[];
    nextLevel?: CourseLevel;
    previousLevel?: CourseLevel;
};
function getTopicGroups(courseModule: CourseModule) {
    if (courseModule.subsections?.length)
        return courseModule.subsections;
    return [
        {
            title: "Core topics",
            topics: courseModule.topics,
        },
    ];
}
export function ResearchLevelPage({ level, modules, nextLevel, previousLevel, }: ResearchLevelPageProps) {
    const topicCount = modules.reduce((total, courseModule) => total + courseModule.topics.length, 0);
    return (<div className="bg-[#fffdf8]">
      <section className="relative isolate overflow-hidden border-b border-wealth-dark-border bg-wealth-primary px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/55">
            <Link className="transition hover:text-white" href="/research">
              Research
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/85">Level {level.levelNumber}</span>
          </nav>

          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-wealth-accent">
                <GraduationCap aria-hidden="true" className="size-4"/>
                Level {level.levelNumber} of 8
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {level.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
                {level.focus}. Work through each module and open every topic for
                a plain-language explanation of the concept and its practical
                investment relevance.
              </p>
            </div>

            <Link className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition hover:border-wealth-accent hover:text-wealth-accent" href="/research">
              <ArrowLeft aria-hidden="true" className="size-4"/>
              Course overview
            </Link>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="px-3 py-4 text-center sm:px-5">
              <p className="font-display text-2xl font-extrabold text-white">
                {modules.length}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/45 sm:text-xs">
                Modules
              </p>
            </div>
            <div className="border-l border-white/10 px-3 py-4 text-center sm:px-5">
              <p className="font-display text-2xl font-extrabold text-white">
                {topicCount}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/45 sm:text-xs">
                Explained topics
              </p>
            </div>
            <div className="border-l border-white/10 px-3 py-4 text-center sm:px-5">
              <p className="font-display text-2xl font-extrabold text-white">
                {level.moduleRange[0]}
                {level.moduleRange[0] !== level.moduleRange[1] &&
            `–${level.moduleRange[1]}`}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/45 sm:text-xs">
                Module range
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-12">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-wealth-border/80 bg-white p-4 shadow-wealth-sm sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-wealth-accent">
                <BookOpen aria-hidden="true" className="size-4"/>
                In this level
              </div>
              <nav aria-label="Level modules" className="mt-4">
                <ol className="space-y-1.5">
                  {modules.map((courseModule) => (<li key={courseModule.id}>
                      <a className="group flex items-start gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold leading-5 text-wealth-secondary transition hover:bg-wealth-accent-light/60 hover:text-wealth-primary" href={`#${courseModule.id}`}>
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-wealth-surface-dim text-[9px] font-extrabold tabular-nums text-wealth-muted transition group-hover:bg-wealth-accent group-hover:text-white">
                          {courseModule.moduleNumber}
                        </span>
                        {courseModule.title}
                      </a>
                    </li>))}
                </ol>
              </nav>

              <div className="mt-5 border-t border-wealth-border/70 pt-4">
                <p className="text-xs leading-5 text-wealth-muted">
                  Select a module, then expand it to read every topic
                  explanation.
                </p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent">
                Level curriculum
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-wealth-primary sm:text-4xl">
                Every topic, explained
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-wealth-secondary sm:text-base">
                Explanations focus on meaning, mechanics, investor relevance,
                and the limitations that should be considered before applying a
                concept.
              </p>
            </div>

            <div className="space-y-5">
              {modules.map((courseModule) => (<details className="group scroll-mt-28 overflow-hidden rounded-3xl border border-wealth-border/80 bg-white shadow-wealth-sm open:border-wealth-accent/35 open:shadow-wealth-md" id={courseModule.id} key={courseModule.id} open={true}>
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-5 marker:hidden sm:items-center sm:gap-5 sm:p-7 [&::-webkit-details-marker]:hidden">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-wealth-accent text-sm font-extrabold tabular-nums text-white sm:size-13">
                      {courseModule.moduleNumber}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-wealth-accent">
                        {courseModule.category}
                      </span>
                      <span className="mt-1 block font-display text-lg font-bold text-wealth-primary sm:text-2xl">
                        {courseModule.title}
                      </span>
                      <span className="mt-2 hidden max-w-3xl text-sm leading-6 text-wealth-secondary sm:block">
                        {courseModule.description}
                      </span>
                      <span className="mt-2 block text-xs font-bold text-wealth-muted">
                        {courseModule.topics.length} explained topics
                      </span>
                    </span>
                    <ChevronDown aria-hidden="true" className="mt-3 size-5 shrink-0 text-wealth-muted transition-transform duration-200 group-open:rotate-180 group-open:text-wealth-accent sm:mt-0"/>
                  </summary>

                  <div className="border-t border-wealth-border/70 bg-[#fffdf8] px-4 py-6 sm:px-7 sm:py-8">
                    <p className="mb-6 text-sm leading-6 text-wealth-secondary sm:hidden">
                      {courseModule.description}
                    </p>

                    <div className="space-y-8">
                      {getTopicGroups(courseModule).map((group, groupIndex) => (<section key={group.title ?? `group-${groupIndex}`}>
                          {group.title && (<div className="mb-4 flex items-center gap-3">
                              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-wealth-primary">
                                {group.title}
                              </h3>
                              <span className="h-px flex-1 bg-wealth-border/70"/>
                            </div>)}

                          <div className="grid gap-3 xl:grid-cols-2">
                            {group.topics.map((topic, topicIndex) => (<article className="rounded-2xl border border-wealth-border/70 bg-white p-4 transition hover:border-wealth-accent/35 hover:shadow-wealth-sm sm:p-5" id={`${courseModule.id}-topic-${groupIndex + 1}-${topicIndex + 1}`} key={topic}>
                                <div className="flex items-start gap-3">
                                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-wealth-accent-light text-[10px] font-extrabold tabular-nums text-wealth-accent">
                                    {String(topicIndex + 1).padStart(2, "0")}
                                  </span>
                                  <div>
                                    <h4 className="text-sm font-bold leading-5 text-wealth-primary sm:text-base">
                                      {topic}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-wealth-secondary">
                                      {getTopicExplanation(courseModule, topic)}
                                    </p>
                                  </div>
                                </div>
                              </article>))}
                          </div>
                        </section>))}
                    </div>
                  </div>
                </details>))}
            </div>

            <section className="mt-10 rounded-3xl border border-wealth-border/80 bg-white p-5 shadow-wealth-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck aria-hidden="true" className="size-5"/>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-wealth-primary">
                    Educational content, not a personal recommendation
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-wealth-secondary">
                    Tax, regulatory, and scheme rules can change. Verify the
                    latest official documents and obtain qualified advice when a
                    decision depends on your personal facts.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {courseReferenceSources.map((source) => (<a className="group rounded-xl border border-wealth-border/70 bg-[#fffdf8] p-4 transition hover:border-wealth-accent/40" href={source.href} key={source.title} rel="noreferrer" target="_blank">
                    <span className="flex items-start justify-between gap-2">
                      <FileText aria-hidden="true" className="size-4 text-wealth-accent"/>
                      <ExternalLink aria-hidden="true" className="size-3.5 text-wealth-muted transition group-hover:text-wealth-accent"/>
                    </span>
                    <span className="mt-3 block text-xs font-bold leading-5 text-wealth-primary">
                      {source.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-wealth-muted">
                      {source.description}
                    </span>
                  </a>))}
              </div>
            </section>

            <nav aria-label="Course level pagination" className="mt-8 grid gap-3 sm:grid-cols-2">
              {previousLevel ? (<Link className="group rounded-2xl border border-wealth-border bg-white p-5 transition hover:border-wealth-accent/40 hover:shadow-wealth-sm" href={`/research/${previousLevel.id}`}>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-wealth-muted">
                    <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1"/>
                    Previous level
                  </span>
                  <span className="mt-3 block font-bold text-wealth-primary">
                    {previousLevel.shortTitle}
                  </span>
                </Link>) : (<div className="hidden sm:block"/>)}

              {nextLevel ? (<Link className="group rounded-2xl border border-wealth-border bg-white p-5 text-right transition hover:border-wealth-accent/40 hover:shadow-wealth-sm" href={`/research/${nextLevel.id}`}>
                  <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.12em] text-wealth-muted">
                    Next level
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1"/>
                  </span>
                  <span className="mt-3 block font-bold text-wealth-primary">
                    {nextLevel.shortTitle}
                  </span>
                </Link>) : (<Link className="group rounded-2xl bg-wealth-accent p-5 text-right text-white transition hover:-translate-y-0.5 hover:shadow-wealth-md" href="/research">
                  <span className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                    Course complete
                    <CheckCircle2 aria-hidden="true" className="size-4"/>
                  </span>
                  <span className="mt-3 block font-bold">Return to overview</span>
                </Link>)}
            </nav>
          </div>
        </div>
      </section>
    </div>);
}
