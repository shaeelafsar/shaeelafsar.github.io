import { FadeIn, TextReveal } from "@/components/animation";
import { ProjectsBrowser } from "@/components/projects/projects-browser";
import type { ProjectFilterOption } from "@/components/projects/project-filter";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";
import { slugify } from "@/lib/utils";

const preferredCategoryOrder = ["Frontend", "Backend", "Full Stack"];

export const metadata = createMetadata({
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

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const filterOptions = getFilterOptions(
    Array.from(new Set(projects.map((project) => project.category))),
  );

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
              <TextReveal className="block" delay={0.08} neonTrail>
                Projects built with product clarity and a frontend-first eye.
              </TextReveal>
            </Heading>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="max-w-3xl text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
              A growing archive of interface systems, backend platforms, and full-stack products. Filter by discipline to browse the case studies most relevant to the work ahead.
            </p>
          </FadeIn>
        </div>

        <ProjectsBrowser options={filterOptions} projects={projects} />
      </Container>
    </Section>
  );
}
