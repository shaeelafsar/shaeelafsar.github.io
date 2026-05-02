"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/mdx";

type TableOfContentsMode = "inline" | "aside";

interface TableOfContentsProps {
  items: TocItem[];
  mode?: TableOfContentsMode;
}

const HEADING_OFFSET = 112;

export function TableOfContents({
  items,
  mode = "aside",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading instanceof HTMLElement);

    const updateActiveId = () => {
      const currentHeading =
        headingElements.filter((heading) => heading.getBoundingClientRect().top - HEADING_OFFSET <= 0).at(-1) ??
        headingElements[0];

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      window.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  function scrollToHeading(id: string) {
    const heading = document.getElementById(id);

    if (!heading) {
      return;
    }

    const top = heading.getBoundingClientRect().top + window.scrollY - HEADING_OFFSET;

    window.history.replaceState(null, "", `#${id}`);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
    setIsOpen(false);
  }

  const list = (
    <ol className="space-y-1.5">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
            <button
              className={cn(
                "w-full rounded-[var(--radius-md)] px-3 py-2 text-left text-sm leading-6 text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-foreground",
                active && "bg-accent-soft text-accent",
              )}
              onClick={() => scrollToHeading(item.id)}
              type="button"
            >
              {item.title}
            </button>
          </li>
        );
      })}
    </ol>
  );

  if (mode === "inline") {
    return (
      <div className="hidden md:block lg:hidden">
        <div className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-4" data-testid="table-of-contents">
          <button
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between gap-4 rounded-[var(--radius-md)] px-2 py-2 text-left"
            data-testid="toc-disclosure"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            <span className="font-medium text-foreground">On this page</span>
            <span className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
              {isOpen ? "Hide" : "Show"}
            </span>
          </button>
          {isOpen ? <nav aria-label="Table of contents" className="mt-3">{list}</nav> : null}
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Table of contents"
        className="sticky top-28 rounded-[var(--radius-lg)] border border-border bg-card/70 p-5"
        data-testid="table-of-contents"
      >
        <p className="mb-4 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
          On this page
        </p>
        {list}
      </nav>
    </aside>
  );
}
