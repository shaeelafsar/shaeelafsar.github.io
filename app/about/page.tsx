import { FadeIn, StaggerChildren } from "@/components/animation";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { getResumeData } from "@/lib/resume";

const interests = [
  {
    title: "Writing to clarify",
    body: "I like turning implementation details into language that helps teams align faster and make better product decisions.",
  },
  {
    title: "Systems that scale quietly",
    body: "The work I enjoy most is often invisible: naming, spacing, component structure, and the patterns that keep future changes easy.",
  },
  {
    title: "Life outside the screen",
    body: "Good coffee, long walks, films with strong pacing, and the kind of side projects that start as curiosity and become practice.",
  },
] as const;

export const metadata = createMetadata({
  title: "About",
  description:
    "About Shaeel Afsar — frontend engineer focused on thoughtful systems, premium interfaces, and calm product execution.",
  path: "/about",
});

export default async function AboutPage() {
  const resume = await getResumeData();

  return (
    <>
      <Section className="pt-16 md:pt-20 lg:pt-24" data-testid="about-intro">
        <Container className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] md:items-center lg:gap-16">
          <FadeIn className="space-y-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              About
            </p>
            <Heading as="h1" size="h1" className="max-w-3xl">
              {resume.name}
            </Heading>
            <p className="text-[length:var(--text-body-lg)] leading-8 text-foreground/90 md:leading-9">
              {resume.title}
            </p>
            <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
              {resume.summary}
            </p>
            <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
              I&apos;m most energized by ambitious ideas that need clear structure: multi-page marketing sites, content-rich product surfaces, and design systems that make teams faster without flattening the experience.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="/projects">
                View Projects
              </Button>
              <Button as="a" href="/contact" variant="outline">
                Get in Touch
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.3} direction="left">
            <div
              role="img"
              aria-label="Portrait placeholder for Shaeel Afsar"
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card/90 p-6 shadow-[var(--shadow-md)]"
              data-testid="about-portrait"
            >
              <div className="aspect-[4/5] rounded-[var(--radius-lg)] bg-[radial-gradient(circle_at_top,var(--color-accent-soft),transparent_32%),linear-gradient(180deg,var(--color-card-muted),transparent)]" />
              <div className="absolute inset-x-10 bottom-10 rounded-[var(--radius-lg)] border border-border bg-card/90 p-5 backdrop-blur-[var(--blur-sm)]">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                  Based in
                </p>
                <p className="mt-3 text-lg font-medium text-foreground">{resume.location}</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section className="bg-background-secondary/55" data-testid="what-i-do-section">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              What I do
            </p>
            <Heading as="h2" size="h2" className="max-w-xl">
              I approach software as a blend of product judgment, engineering discipline, and visual craft.
            </Heading>
          </FadeIn>
          <FadeIn delay={0.15} className="space-y-6">
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              The best frontend work helps users feel oriented immediately. That means hierarchy that reads clearly, interactions that never fight the task, and systems underneath that make iteration easier for the team.
            </p>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              I like sweating the details — naming, spacing, accessibility, motion timing, content structure — because those details compound into software that feels more trustworthy. My goal is to leave a product more coherent than I found it.
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          <FadeIn className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Technologies
            </p>
            <Heading as="h2" size="h2">
              Tools and disciplines I reach for most often.
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              A grouped view of the technologies and practices that shape my day-to-day frontend work.
            </p>
          </FadeIn>
          <SkillsGrid categories={resume.skillCategories} />
        </Container>
      </Section>

      <Section className="bg-background-secondary/55" data-testid="beyond-code-section">
        <Container className="space-y-10">
          <FadeIn className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Beyond code
            </p>
            <Heading as="h2" size="h2">
              The human side of how I work.
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              I&apos;m drawn to work that blends taste with systems thinking, and that usually spills into the way I write, collaborate, and recharge.
            </p>
          </FadeIn>
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {interests.map((interest) => (
              <Card key={interest.title} as="div" className="bg-card/95">
                <CardContent>
                  <Heading as="h3" size="h3">
                    {interest.title}
                  </Heading>
                  <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
                    {interest.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <Section className="pt-8 md:pt-12 lg:pt-16">
        <Container>
          <FadeIn>
            <div className="rounded-[var(--radius-xl)] border border-border bg-card/90 px-6 py-12 shadow-[var(--shadow-md)] md:px-10 md:py-14">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                  Next step
                </p>
                <Heading as="h2" size="h2" className="mt-4">
                  Want to see the work in context?
                </Heading>
                <p className="mt-6 text-[length:var(--text-body)] leading-8 text-muted-foreground">
                  Explore selected projects or reach out if you&apos;re building something that needs thoughtful frontend leadership.
                </p>
                <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button as="a" href="/projects" className="w-full sm:w-auto">
                    Browse Projects
                  </Button>
                  <Button as="a" href="/contact" variant="outline" className="w-full sm:w-auto">
                    Contact Me
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
