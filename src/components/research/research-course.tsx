"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, BookOpen, Calculator, Check, ChevronDown, GraduationCap, Layers3, Search, ShieldCheck, Sparkles, Target, } from "lucide-react";
import { courseCurriculum, courseDeliveryFormat, courseLevels, getModulesForLevel, professionalDeepDives, } from "@/lib/course-curriculum";
import { cn } from "@/lib/utils";
const levelThemes = [
    {
        badge: "bg-amber-100 text-amber-700",
        border: "border-amber-200",
        number: "bg-amber-500 text-white",
    },
    {
        badge: "bg-sky-100 text-sky-700",
        border: "border-sky-200",
        number: "bg-sky-500 text-white",
    },
    {
        badge: "bg-indigo-100 text-indigo-700",
        border: "border-indigo-200",
        number: "bg-indigo-500 text-white",
    },
    {
        badge: "bg-violet-100 text-violet-700",
        border: "border-violet-200",
        number: "bg-violet-500 text-white",
    },
    {
        badge: "bg-rose-100 text-rose-700",
        border: "border-rose-200",
        number: "bg-rose-500 text-white",
    },
    {
        badge: "bg-emerald-100 text-emerald-700",
        border: "border-emerald-200",
        number: "bg-emerald-500 text-white",
    },
    {
        badge: "bg-cyan-100 text-cyan-700",
        border: "border-cyan-200",
        number: "bg-cyan-600 text-white",
    },
    {
        badge: "bg-orange-100 text-orange-700",
        border: "border-orange-200",
        number: "bg-wealth-accent text-white",
    },
] as const;
const totalLessons = courseCurriculum.reduce((total, courseModule) => total + courseModule.topics.length, 0);
export function ResearchCourse() {
    const [query, setQuery] = useState("");
    const [activeLevel, setActiveLevel] = useState<number | "all">("all");
    const [openModules, setOpenModules] = useState<number[]>(courseCurriculum.map((m) => m.moduleNumber));
    const normalizedQuery = query.trim().toLowerCase();
    const visibleLevels = courseLevels
        .filter((level) => activeLevel === "all" || level.levelNumber === activeLevel)
        .map((level) => ({
        ...level,
        modules: getModulesForLevel(level).filter((courseModule) => {
            if (!normalizedQuery)
                return true;
            return [
                courseModule.title,
                courseModule.description,
                courseModule.category,
                ...courseModule.topics,
            ]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);
        }),
    }))
        .filter((level) => level.modules.length > 0);
    const visibleModuleCount = visibleLevels.reduce((total, level) => total + level.modules.length, 0);
    const toggleModule = (moduleNumber: number) => {
        setOpenModules((current) => current.includes(moduleNumber)
            ? current.filter((number) => number !== moduleNumber)
            : [...current, moduleNumber]);
    };
    return (<div className="overflow-hidden bg-[#fffdf8]">
      <section className="relative isolate border-b border-wealth-border/70 bg-[#fff9ec] px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-28">

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-wealth-accent/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent shadow-wealth-sm">
              <Sparkles aria-hidden="true" className="size-4"/>
              Solid Wealth Research Academy
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-wealth-primary sm:text-5xl lg:text-7xl">
              Mutual Fund Investment
              <span className="block text-wealth-accent">Mastery Course</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-wealth-secondary sm:text-lg sm:leading-8">
              A systematic path from money and market fundamentals to fund
              analysis, portfolio construction, taxation, practical case
              studies, and a complete capstone plan.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-wealth-primary px-6 text-sm font-bold text-white shadow-wealth-md transition hover:-translate-y-0.5 hover:bg-black" href="#curriculum">
                Explore the curriculum
                <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5"/>
              </a>
              <a className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-wealth-border bg-white px-6 text-sm font-bold text-wealth-primary transition hover:border-wealth-accent hover:text-wealth-accent" href="#course-format">
                See how each lesson works
              </a>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-wealth-border/80 bg-white/75 shadow-wealth-sm backdrop-blur sm:grid-cols-4">
            {[
            [courseCurriculum.length, "Modules"],
            [courseLevels.length, "Learning levels"],
            [`${totalLessons}+`, "Core topics"],
            [1, "Capstone project"],
        ].map(([value, label], index) => (<div className={cn("px-4 py-5 text-center", index % 2 !== 0 && "border-l border-wealth-border/70", index >= 2 && "border-t border-wealth-border/70 sm:border-t-0", index === 2 && "sm:border-l")} key={label}>
                <p className="font-display text-2xl font-extrabold text-wealth-primary">
                  {value}
                </p>
                <p className="mt-1 text-xs font-semibold text-wealth-muted">
                  {label}
                </p>
              </div>))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent">
                Your learning path
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-wealth-primary sm:text-4xl">
                Eight levels. One clear progression.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-wealth-secondary">
              The course moves from investor education to analysis and
              portfolio construction before asking you to solve a complete
              real-world planning case.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {courseLevels.map((level, index) => {
            const theme = levelThemes[index];
            return (<Link className={cn("group rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-wealth-md", theme.border)} href={`/research/${level.id}`} key={level.id}>
                  <div className="flex items-center justify-between">
                    <span className={cn("flex size-9 items-center justify-center rounded-xl text-xs font-extrabold", theme.number)}>
                      {level.levelNumber}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 text-wealth-muted transition-transform group-hover:translate-x-1 group-hover:text-wealth-accent"/>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-wealth-primary">
                    {level.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-wealth-secondary">
                    {level.focus}
                  </p>
                  <p className="mt-4 text-xs font-bold text-wealth-muted">
                    Modules {level.moduleRange[0]}
                    {level.moduleRange[0] !== level.moduleRange[1] &&
                    `–${level.moduleRange[1]}`}
                  </p>
                </Link>);
        })}
          </div>
        </div>
      </section>

      <section className="border-y border-wealth-border/70 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="curriculum">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent">
                Complete curriculum
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-wealth-primary sm:text-4xl">
                Find your next module
              </h2>
              <p className="mt-3 text-sm text-wealth-secondary">
                Search by concept, fund type, metric, strategy, or goal.
              </p>
            </div>

            <label className="relative block w-full lg:max-w-md">
              <span className="sr-only">Search the course curriculum</span>
              <Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-wealth-muted"/>
              <input className="h-12 w-full rounded-xl border border-wealth-border bg-[#fffdf8] pl-11 pr-4 text-sm text-wealth-primary outline-none transition placeholder:text-wealth-muted focus:border-wealth-accent focus:ring-4 focus:ring-wealth-accent/10" onChange={(event) => setQuery(event.target.value)} placeholder="Search modules and topics…" type="search" value={query}/>
            </label>
          </div>

          <div className="mt-7 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition", activeLevel === "all"
            ? "border-wealth-primary bg-wealth-primary text-white"
            : "border-wealth-border bg-white text-wealth-secondary hover:border-wealth-accent hover:text-wealth-accent")} onClick={() => setActiveLevel("all")} type="button">
              All levels
            </button>
            {courseLevels.map((level) => (<button className={cn("shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition", activeLevel === level.levelNumber
                ? "border-wealth-primary bg-wealth-primary text-white"
                : "border-wealth-border bg-white text-wealth-secondary hover:border-wealth-accent hover:text-wealth-accent")} key={level.id} onClick={() => setActiveLevel(level.levelNumber)} type="button">
                {level.shortTitle}
              </button>))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 text-xs text-wealth-muted">
            <p>
              Showing {visibleModuleCount} of {courseCurriculum.length} modules
            </p>
            {visibleModuleCount > 0 && (<button className="font-bold text-wealth-secondary transition hover:text-wealth-accent" onClick={() => setOpenModules(visibleLevels.flatMap((level) => level.modules.map((courseModule) => courseModule.moduleNumber)))} type="button">
                Expand results
              </button>)}
          </div>

          <div className="mt-8 space-y-12">
            {visibleLevels.map((level) => {
            const theme = levelThemes[level.levelNumber - 1];
            return (<section className="scroll-mt-28" id={level.id} key={level.id}>
                  <div className="mb-4 flex flex-col gap-3 border-l-4 border-wealth-accent pl-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-wealth-accent">
                        Level {level.levelNumber}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-wealth-primary sm:text-2xl">
                        {level.title}
                      </h3>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs text-wealth-muted">{level.focus}</p>
                      <Link className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-wealth-accent transition hover:gap-2" href={`/research/${level.id}`}>
                        Read every topic explanation
                        <ArrowRight aria-hidden="true" className="size-3.5"/>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {level.modules.map((courseModule) => {
                    const isOpen = openModules.includes(courseModule.moduleNumber);
                    return (<article className={cn("scroll-mt-32 overflow-hidden rounded-2xl border bg-[#fffdf8] transition", isOpen
                            ? `${theme.border} shadow-wealth-sm`
                            : "border-wealth-border/80 hover:border-wealth-accent/40")} id={courseModule.id} key={courseModule.id}>
                          <button aria-controls={`${courseModule.id}-content`} aria-expanded={isOpen} className="flex w-full items-start gap-3 p-4 text-left sm:items-center sm:gap-5 sm:p-5" onClick={() => toggleModule(courseModule.moduleNumber)} type="button">
                            <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold tabular-nums sm:size-12 sm:text-sm", theme.number)}>
                              {courseModule.moduleNumber}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-display text-base font-bold text-wealth-primary sm:text-lg">
                                  {courseModule.title}
                                </span>
                                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]", theme.badge)}>
                                  {courseModule.category}
                                </span>
                              </span>
                              <span className="mt-1.5 hidden text-sm leading-6 text-wealth-secondary sm:block">
                                {courseModule.description}
                              </span>
                              <span className="mt-2 block text-xs font-semibold text-wealth-muted">
                                {courseModule.topics.length} core topics
                              </span>
                            </span>
                            <ChevronDown aria-hidden="true" className={cn("mt-2 size-5 shrink-0 text-wealth-muted transition-transform duration-200 sm:mt-0", isOpen && "rotate-180 text-wealth-accent")}/>
                          </button>

                          {isOpen && (<div className="border-t border-wealth-border/70 bg-white px-4 py-5 sm:px-6 sm:py-6" id={`${courseModule.id}-content`}>
                              <p className="mb-5 text-sm leading-6 text-wealth-secondary sm:hidden">
                                {courseModule.description}
                              </p>

                              {courseModule.subsections ? (<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                  {courseModule.subsections.map((subsection) => (<div className="rounded-xl border border-wealth-border/70 bg-[#fffdf8] p-4" key={subsection.title}>
                                      {subsection.title && (<h4 className="mb-3 text-sm font-bold text-wealth-primary">
                                          {subsection.title}
                                        </h4>)}
                                      <ul className="space-y-2">
                                        {subsection.topics.map((topic) => (<li key={topic}>
                                            <Link className="group flex items-start gap-2 text-sm leading-5 text-wealth-secondary transition hover:text-wealth-accent" href={`/research/${level.id}#${courseModule.id}`}>
                                              <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-wealth-accent transition-transform group-hover:scale-110"/>
                                              <span className="group-hover:underline underline-offset-2">
                                                {topic}
                                              </span>
                                              <ArrowRight aria-hidden="true" className="mt-0.5 size-3 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 text-wealth-accent"/>
                                            </Link>
                                          </li>))}
                                      </ul>
                                    </div>))}
                                </div>) : (<ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                  {courseModule.topics.map((topic) => (<li key={topic}>
                                      <Link className="group flex items-start gap-2 text-sm leading-5 text-wealth-secondary transition hover:text-wealth-accent" href={`/research/${level.id}#${courseModule.id}`}>
                                        <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-wealth-accent transition-transform group-hover:scale-110"/>
                                        <span className="group-hover:underline underline-offset-2">
                                          {topic}
                                        </span>
                                        <ArrowRight aria-hidden="true" className="mt-0.5 size-3 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 text-wealth-accent"/>
                                      </Link>
                                    </li>))}
                                </ul>)}
                            </div>)}
                        </article>);
                })}
                  </div>
                </section>);
        })}

            {visibleLevels.length === 0 && (<div className="rounded-2xl border border-dashed border-wealth-border bg-[#fffdf8] px-6 py-16 text-center">
                <Search aria-hidden="true" className="mx-auto size-7 text-wealth-muted"/>
                <h3 className="mt-4 font-bold text-wealth-primary">
                  No matching module found
                </h3>
                <p className="mt-2 text-sm text-wealth-secondary">
                  Try a broader term such as risk, SIP, tax, debt, or portfolio.
                </p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent">
              Professional depth
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-wealth-primary sm:text-4xl">
              Four deep dives that strengthen the core course
            </h2>
            <p className="mt-4 text-sm leading-6 text-wealth-secondary sm:text-base">
              These subjects are integrated across the relevant modules to
              connect fund knowledge with mathematics, security analysis, and
              portfolio construction.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {professionalDeepDives.map((deepDive, index) => {
            const icons = [Calculator, BookOpen, Layers3, Target];
            const Icon = icons[index];
            return (<article className="rounded-2xl border border-wealth-border/80 bg-white p-5 shadow-wealth-sm sm:p-6" key={deepDive.title}>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-wealth-accent-light text-wealth-accent">
                    <Icon aria-hidden="true" className="size-5"/>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-wealth-primary">
                    {deepDive.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-wealth-secondary">
                    {deepDive.description}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {deepDive.topics.map((topic) => (<li key={topic}>
                        <Link className="group flex items-start gap-2 text-xs leading-5 text-wealth-secondary transition hover:text-wealth-accent" href="#curriculum">
                          <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-wealth-accent transition-transform group-hover:scale-110"/>
                          <span className="group-hover:underline underline-offset-2">
                            {topic}
                          </span>
                        </Link>
                      </li>))}
                  </ul>
                </article>);
        })}
          </div>
        </div>
      </section>

      <section className="border-y border-wealth-border/70 bg-wealth-primary px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8" id="course-format">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-wealth-accent">
                <GraduationCap aria-hidden="true" className="size-6"/>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-wealth-accent">
                Consistent learning format
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Every module turns theory into practice.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Each subject follows the same teaching architecture so learners
                understand the idea, calculate it, apply it, and test their
                understanding.
              </p>
            </div>

            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {courseDeliveryFormat.map((step, index) => (<li className="rounded-2xl border border-white/10 bg-white/[0.06] p-4" key={step}>
                  <span className="text-xs font-extrabold tabular-nums text-wealth-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-sm font-bold leading-5 text-white">
                    {step}
                  </p>
                </li>))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-wealth-border bg-white p-6 shadow-wealth-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck aria-hidden="true" className="size-5"/>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                  Education-first framework
                </p>
                <h2 className="mt-2 text-xl font-bold text-wealth-primary sm:text-2xl">
                  Learn the difference between education and advice.
                </h2>
                <p className="mt-3 text-sm leading-6 text-wealth-secondary">
                  The curriculum separates investor education, analysis,
                  portfolio construction, recommendation, and execution. Course
                  examples are educational and historical returns are never
                  presented as guaranteed future outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-wealth-accent p-6 text-white shadow-wealth-md sm:p-8">
            <BookOpen aria-hidden="true" className="size-7"/>
            <h2 className="mt-6 text-2xl font-bold">Put the learning to work.</h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Use the calculators to practise goal, SIP, return, and retirement
              concepts from the curriculum.
            </p>
            <Link className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3" href="/calculators">
              Open financial calculators
              <ArrowRight aria-hidden="true" className="size-4"/>
            </Link>
          </div>
        </div>
      </section>
    </div>);
}
