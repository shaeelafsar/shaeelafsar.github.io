import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animation";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { compileMDX } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { formatDate } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: "Projects",
      description: "Selected case studies by Shaeel Afsar.",
      path: "/projects",
    });
  }

  return createMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { content } = await compileMDX({
    source: project.content,
    components: mdxComponents,
  });

  return (
    <Section className="pt-16 md:pt-20 lg:pt-24">
      <Container className="max-w-[var(--container-wide)] space-y-10 md:space-y-12">
        <FadeIn>
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-foreground"
            href="/projects"
          >
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-start" data-testid="project-detail-header">
          <FadeIn>
            <div className="space-y-5">
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                {project.category}
              </p>
              <Heading as="h1" size="display-lg" className="max-w-4xl text-balance">
                {project.title}
              </Heading>
              <p className="max-w-3xl text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
                {project.excerpt}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-6 rounded-[var(--radius-lg)] border border-border bg-card/70 p-6 md:p-8">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
                    Published
                  </p>
                  <p className="mt-2 text-foreground">{formatDate(project.date)}</p>
                </div>
                <div>
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
                    Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <Button
                    as="a"
                    data-testid="project-live-link"
                    href={project.liveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Visit live site
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button
                    as="a"
                    data-testid="project-github-link"
                    href={project.githubUrl}
                    rel="noreferrer"
                    target="_blank"
                    variant="outline"
                  >
                    View GitHub repo
                  </Button>
                ) : null}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12}>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card-muted" data-testid="project-hero-image">
            <Image
              alt={`Hero image for ${project.title}`}
              className="h-auto w-full object-cover"
              height={900}
              priority
              sizes="(min-width: 1280px) 80rem, 100vw"
              src={project.image}
              width={1600}
            />
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3" data-testid="project-metadata-block">
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
              Category
            </p>
            <p className="mt-3 text-lg font-medium text-foreground">{project.category}</p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
              Links available
            </p>
            <p className="mt-3 text-lg font-medium text-foreground">
              {[project.liveUrl && "Live site", project.githubUrl && "Repository"].filter(Boolean).join(" · ") || "Private"}
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
              Focus
            </p>
            <p className="mt-3 text-lg font-medium text-foreground">Problem → process → outcome</p>
          </div>
        </div>

        <article data-testid="project-mdx-body">
          <Prose>{content}</Prose>
        </article>

        <div
          className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card/70 p-6 md:flex-row md:items-center md:justify-between md:p-8"
          data-testid="project-detail-cta"
        >
          <div className="space-y-2">
            <Heading as="h2" size="h3">
              Want a product partner who can ship the interface and the system behind it?
            </Heading>
            <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
              Let&apos;s talk through the product constraints, front-end quality bar, and the delivery plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/projects" variant="ghost">
              Browse more work
            </Button>
            <Button as="a" href="/contact">
              Start a conversation
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
