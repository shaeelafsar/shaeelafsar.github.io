"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProjectFilterOption {
  label: string;
  value: string;
}

interface ProjectFilterProps {
  options: ProjectFilterOption[];
  selectedValue: string | null;
  hasResults: boolean;
}

const pillBaseClasses =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border px-5 text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] motion-safe:hover:-translate-y-0.5 focus-visible:border-accent disabled:pointer-events-none disabled:opacity-50";

export function ProjectFilter({
  options,
  selectedValue,
  hasResults,
}: ProjectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const items = useMemo(
    () => [{ label: "All", value: "all" }, ...options],
    [options],
  );
  const activeValue = pendingValue ?? selectedValue ?? "all";

  function selectValue(nextValue: string) {
    const nextHref = nextValue === "all" ? pathname : `${pathname}?tag=${nextValue}`;

    setPendingValue(nextValue === "all" ? null : nextValue);
    startTransition(() => {
      router.push(nextHref, { scroll: false });
    });
  }

  function moveFocus(nextIndex: number) {
    const normalizedIndex = (nextIndex + items.length) % items.length;
    buttonsRef.current[normalizedIndex]?.focus();
  }

  return (
    <div className="space-y-4" data-testid="projects-filter">
      <div
        aria-label="Filter projects by tag"
        className={cn(
          "flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible",
          isPending && "opacity-90",
        )}
        role="toolbar"
      >
        {items.map((item, index) => {
          const selected = activeValue === item.value;

          return (
            <button
              key={item.value}
              ref={(element) => {
                buttonsRef.current[index] = element;
              }}
              aria-pressed={selected}
              className={cn(
                pillBaseClasses,
                "border-border bg-transparent text-foreground hover:bg-accent-soft",
                selected && "border-accent bg-accent-soft text-accent hover:bg-accent-soft",
              )}
              data-testid={`filter-pill-${item.value}`}
              disabled={isPending && selected}
              onClick={() => selectValue(item.value)}
              onKeyDown={(event) => {
                switch (event.key) {
                  case "ArrowRight":
                  case "ArrowDown": {
                    event.preventDefault();
                    moveFocus(index + 1);
                    break;
                  }
                  case "ArrowLeft":
                  case "ArrowUp": {
                    event.preventDefault();
                    moveFocus(index - 1);
                    break;
                  }
                  case "Home": {
                    event.preventDefault();
                    moveFocus(0);
                    break;
                  }
                  case "End": {
                    event.preventDefault();
                    moveFocus(items.length - 1);
                    break;
                  }
                  case "Enter":
                  case " ": {
                    event.preventDefault();
                    selectValue(item.value);
                    break;
                  }
                  default:
                    break;
                }
              }}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {!hasResults && selectedValue ? (
        <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-border bg-card/70 p-4 text-sm text-muted-foreground">
          <span>No projects match this filter yet.</span>
          <Button onClick={() => selectValue("all")} size="sm" variant="ghost">
            Reset filters
          </Button>
        </div>
      ) : null}
    </div>
  );
}
