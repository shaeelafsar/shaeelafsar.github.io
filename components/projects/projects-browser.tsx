"use client";

import { useEffect, useMemo, useState } from "react";
import { StaggerChildren } from "@/components/animation";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter, type ProjectFilterOption } from "@/components/projects/project-filter";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectsBrowserProps {
  projects: Project[];
  options: ProjectFilterOption[];
}

function getSelectedFilterFromUrl(options: ProjectFilterOption[]) {
  if (typeof window === "undefined") {
    return null;
  }

  const requestedTag = new URLSearchParams(window.location.search).get("tag");

  return options.some((option) => option.value === requestedTag) ? requestedTag : null;
}

export function ProjectsBrowser({ projects, options }: ProjectsBrowserProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    const syncSelection = () => {
      setSelectedValue(getSelectedFilterFromUrl(options));
    };

    syncSelection();
    window.addEventListener("popstate", syncSelection);

    return () => {
      window.removeEventListener("popstate", syncSelection);
    };
  }, [options]);

  const filteredProjects = useMemo(() => {
    if (!selectedValue) {
      return projects;
    }

    return projects.filter((project) => slugify(project.category) === selectedValue);
  }, [projects, selectedValue]);

  function handleFilterChange(nextValue: string | null) {
    setSelectedValue(nextValue);

    if (typeof window === "undefined") {
      return;
    }

    const nextUrl = new URL(window.location.href);

    if (nextValue) {
      nextUrl.searchParams.set("tag", nextValue);
    } else {
      nextUrl.searchParams.delete("tag");
    }

    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }

  return (
    <>
      <div className="lg:sticky lg:top-20 lg:z-20 lg:-mx-2 lg:px-2">
        <ProjectFilter
          hasResults={filteredProjects.length > 0}
          onSelect={handleFilterChange}
          options={options}
          selectedValue={selectedValue}
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div data-testid="projects-grid">
          <StaggerChildren className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </StaggerChildren>
        </div>
      ) : (
        <div
          className="rounded-[var(--radius-xl)] border border-dashed border-border bg-card/70 px-6 py-10 text-center md:px-10"
          data-testid="projects-empty-state"
        >
          <Heading as="h2" size="h3">
            No projects match that filter right now.
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-[length:var(--text-body)] leading-7 text-muted-foreground">
            Reset to the full archive and explore frontend systems, backend infrastructure, and end-to-end product builds.
          </p>
          <div className="mt-6 flex justify-center">
            <Button as="button" onClick={() => handleFilterChange(null)} variant="secondary">
              Reset filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
