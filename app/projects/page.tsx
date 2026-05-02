import type { Metadata } from "next";
import { FadeIn, StaggerChildren } from "@/components/animation";
import { ProjectFilter, type ProjectFilterOption } from "@/components/projects/project-filter";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";
import { slugify } from "@/lib/utils";

const preferredCategoryOrder = ["Frontend", "Backend", "Full Stack"];

type ProjectsPageProps = {
  searchParams: Promise<{ tag?: string | string[] | undefined }>;
};

export const generateMetadata = async (): Promise<Metadata> =>
  createMetadata({
    title: "Projects",
    description: "Selected frontend, backend, and full-stack case studies by Shaeel Afsar.",
    path: "/projects",
  });

function getFilterOptions(categories: string[]): ProjectFilterOption[] {
  return categories
    .sort((left, right) => {
      const leftIndex = preferredCategoryOrder.indexOf(left);
      const rightIndex = preferredCategoryOrder.indexOf(right);

      if (leftIndex !== -1 || rightIndex !== -1) {
        return (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex) -
          (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex);
      }

      return left.localeCompare(right);
    })
    .map((category) => ({
      label: category,
      value: slugify(category),
    }));
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const [projects, resolvedSearchParams] = await Promise.all([getAllProjects(), searchParams]);
  const requestedTag = Array.isArray(resolvedSearchParams.tag)
    ? resolvedSearchParams.tag[0]
    : resolvedSearchParams.tag;
  const filterOptions = getFilterOptions(
    Array.from(new Set(projects.map((project) => project.category))),
  );
  const selectedFilter = filterOptions.find((option) => option.value === requestedTag) ?? null;
  const filteredProjects = selectedFilter
    ? projects.filter((project) => slugify(project.category) === selectedFilter.value)
    : projects;

  return (
    <Section className="pt-16 md:pt-20 lg:pt-24">
      <Container className="space-y-12 md:space-y-14">
        <div className="space-y-6" data-testid="projects-hero">
          <FadeIn>
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
              Selected work
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Heading as="h1" size="display-lg" className="max-w-4xl text-balance">
              Projects built with product clarity and a frontend-first eye.
            </Heading>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="max-w-3xl text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
              A growing archive of interface systems, backend platforms, and full-stack products. Filter by discipline to browse the case studies most relevant to the work ahead.
            </p>
          </FadeIn>
        </div>

        <div className="lg:sticky lg:top-20 lg:z-20 lg:-mx-2 lg:px-2">
          <ProjectFilter
            hasResults={filteredProjects.length > 0}
            options={filterOptions}
            selectedValue={selectedFilter?.value ?? null}
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
              <Button as="a" href="/projects" variant="secondary">
                Reset filters
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
