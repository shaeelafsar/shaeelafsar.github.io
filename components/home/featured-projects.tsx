import { FadeIn, StaggerChildren } from "@/components/animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardImage } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Project } from "@/types/project";

interface FeaturedProjectsProps {
  projects: Project[];
}

const projectDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <Section id="featured-projects" className="bg-background-secondary/55" data-testid="featured-projects-section">
      <Container className="space-y-12">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Selected work
            </p>
            <Heading as="h2" size="h2">
              Featured projects that balance product clarity and frontend craft.
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              A quick look at systems-minded work across design systems, product surfaces, and modern web architecture.
            </p>
          </div>
          <Button as="a" href="/projects" variant="ghost">
            View All Projects
          </Button>
        </FadeIn>
        {projects.length === 0 ? (
          <FadeIn className="rounded-[var(--radius-xl)] border border-dashed border-border-strong bg-card/70 p-8 md:p-10">
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              Featured case studies are being prepared. In the meantime, you can browse the broader projects archive.
            </p>
          </FadeIn>
        ) : (
          <StaggerChildren
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            data-testid="featured-projects-grid"
          >
            {projects.map((project) => (
              <Card key={project.slug} className="bg-card/95">
                <CardImage>
                  <div className="flex min-h-52 flex-col justify-between bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_45%),linear-gradient(160deg,var(--color-card-muted),transparent_78%)] p-6">
                    <Badge variant="accent">Featured</Badge>
                    <div className="space-y-3">
                      <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                        {projectDateFormatter.format(new Date(project.date))}
                      </p>
                      <p className="text-lg font-medium text-foreground">{project.title}</p>
                    </div>
                  </div>
                </CardImage>
                <CardContent>
                  <Heading as="h3" size="h3">
                    {project.title}
                  </Heading>
                  <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
                    {project.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex-wrap">
                  {project.liveUrl ? (
                    <Button as="a" href={project.liveUrl} variant="ghost" size="sm" target="_blank" rel="noreferrer">
                      Live Site
                    </Button>
                  ) : null}
                  {project.githubUrl ? (
                    <Button as="a" href={project.githubUrl} variant="outline" size="sm" target="_blank" rel="noreferrer">
                      Source
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            ))}
          </StaggerChildren>
        )}
      </Container>
    </Section>
  );
}
