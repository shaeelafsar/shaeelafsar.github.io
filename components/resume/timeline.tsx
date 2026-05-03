"use client";

import { useId, useState } from "react";
import type { Experience } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { cn, formatMonthYear } from "@/lib/utils";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

function getDateRange(startDate: string, endDate?: string) {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";

  return `${start} — ${end}`;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
        expanded ? "rotate-180" : "rotate-0",
      )}
      aria-hidden="true"
    >
      <path
        d="M6.75 9.75 12 15l5.25-5.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const baseId = useId();

  if (experiences.length === 0) {
    return null;
  }

  return (
    <ol
      className="timeline-rail relative space-y-6 before:absolute before:bottom-3 before:left-[0.45rem] before:top-3 before:w-px before:bg-[linear-gradient(180deg,rgba(103,232,249,0)_0%,rgba(103,232,249,0.72)_18%,rgba(244,114,182,0.64)_82%,rgba(244,114,182,0)_100%)] before:shadow-[0_0_22px_rgba(34,211,238,0.2)] before:content-[''] lg:before:left-1/2 lg:before:-translate-x-1/2"
      data-testid="experience-timeline"
    >
      {experiences.map((experience, index) => {
        const expanded = expandedIndex === index;
        const detailsId = `${baseId}-experience-${index}`;
        const isEven = index % 2 === 0;

        return (
          <li key={`${experience.company}-${experience.role}-${experience.startDate}`} className="relative">
            <div className="timeline-node absolute left-0 top-9 flex h-[0.9rem] w-[0.9rem] items-center justify-center rounded-full border border-cyan-300/35 bg-background shadow-[0_0_0_6px_var(--color-bg),0_0_20px_rgba(34,211,238,0.2)] lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true">
              <span className="timeline-node-core h-2 w-2 rounded-full bg-[linear-gradient(180deg,rgba(125,249,255,1)_0%,rgba(244,114,182,0.9)_100%)] shadow-[0_0_12px_rgba(34,211,238,0.34)]" />
            </div>
            <div
              className={cn(
                "pl-8 lg:grid lg:grid-cols-2 lg:pl-0",
                isEven ? "lg:pr-12" : "lg:pl-12",
              )}
            >
              <div className={cn(!isEven && "lg:col-start-2")}>
                <Card className="timeline-card bg-card/90">
                  <CardContent className="gap-5">
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-start justify-between gap-4 text-left"
                      aria-expanded={expanded}
                      aria-controls={detailsId}
                      onClick={() => setExpandedIndex((current) => (current === index ? null : index))}
                    >
                      <div className="space-y-3">
                        <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.16em] text-muted-foreground">
                          {getDateRange(experience.startDate, experience.endDate)}
                        </p>
                        <div className="space-y-2">
                          <Heading as="h3" size="h3">
                            {experience.role}
                          </Heading>
                          <p className="break-words text-lg font-medium text-foreground">
                            {experience.company}
                            {experience.location ? ` · ${experience.location}` : ""}
                          </p>
                        </div>
                      </div>
                      <ChevronIcon expanded={expanded} />
                    </button>

                    <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
                      {experience.summary}
                    </p>

                    <div
                      id={detailsId}
                      className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
                        expanded ? "grid-rows-[1fr] opacity-100 translate-y-0" : "grid-rows-[0fr] opacity-70 -translate-y-1",
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {experience.techStack.map((item) => (
                        <Badge key={item} variant="outline" className="bg-background-secondary/60 text-foreground">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
