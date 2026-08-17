"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type ResearchArticleTocItem = {
  id: string;
  label: string;
};

type ResearchArticleTocProps = {
  items: ResearchArticleTocItem[];
};

export function ResearchArticleToc({ items }: ResearchArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateActiveSection = () => {
      animationFrame = null;
      const readingLine = 150;
      let nextActiveId = items[0]?.id ?? "";

      for (const item of items) {
        const section = document.getElementById(item.id);

        if (section && section.getBoundingClientRect().top <= readingLine) {
          nextActiveId = item.id;
        }
      }

      const isAtPageEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (isAtPageEnd && items.length > 0) {
        nextActiveId = items[items.length - 1].id;
      }

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="mt-4">
      <ol className="space-y-1">
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "border-wealth-accent bg-wealth-accent-light/70 text-wealth-accent shadow-[inset_0_0_0_1px_rgba(254,152,0,0.08)]"
                    : "border-transparent text-wealth-secondary hover:bg-wealth-accent-light/40 hover:text-wealth-accent",
                )}
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-md text-[9px] font-extrabold tabular-nums transition-colors",
                    isActive
                      ? "bg-wealth-accent text-white"
                      : "bg-wealth-surface-dim text-wealth-muted group-hover:bg-white group-hover:text-wealth-accent",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-wealth-accent"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
