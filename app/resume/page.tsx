import type { Metadata } from "next";
import { FadeIn } from "@/components/animation";
import { EducationSection } from "@/components/resume/education-section";
import { SkillsGrid } from "@/components/resume/skills-grid";
import { ExperienceTimeline } from "@/components/resume/timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { getResumeData } from "@/lib/resume";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Resume",
    description: "Experience, skills, and education for Shaeel Afsar.",
    path: "/resume",
  });
}

export default async function ResumePage() {
  const resume = await getResumeData();

  return (
    <>
      <Section className="pt-20 md:pt-24 lg:pt-28">
        <Container>
          <FadeIn>
            <div className="grid gap-8 rounded-[var(--radius-xl)] border border-border bg-card/85 p-8 shadow-[var(--shadow-md)] md:p-10 lg:grid-cols-[minmax(0,1.25fr)_auto] lg:items-start">
              <div className="space-y-6" data-testid="resume-hero">
                <div className="space-y-4">
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.2em] text-muted-foreground">
                    Resume
                  </p>
                  <Heading as="h1" size="h1" className="max-w-4xl text-balance">
                    {resume.name}
                  </Heading>
                  <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
                    {resume.title}
                  </p>
                  <p className="max-w-3xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
                    {resume.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {resume.location ? <Badge variant="outline">{resume.location}</Badge> : null}
                  {resume.email ? <Badge variant="outline">{resume.email}</Badge> : null}
                  {resume.website ? <Badge variant="outline">{resume.website.replace(/^https?:\/\//, "")}</Badge> : null}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Button as="a" href="/resume.pdf" size="lg" data-testid="resume-download">
                  Download resume PDF
                </Button>
                <p className="text-sm text-muted-foreground">
                  Printable PDF placeholder while the final export is prepared.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {resume.experience.length > 0 ? (
        <Section className="pt-0 md:pt-0 lg:pt-0">
          <Container className="space-y-10">
            <FadeIn>
              <div className="space-y-4">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                  Experience
                </p>
                <Heading as="h2" size="h2">
                  Selected work across consulting, product, and delivery.
                </Heading>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <ExperienceTimeline experiences={resume.experience} />
            </FadeIn>
          </Container>
        </Section>
      ) : null}

      {resume.skillCategories.length > 0 ? (
        <Section className="bg-background-secondary/40 py-20 md:py-24 lg:py-28">
          <Container className="space-y-10">
            <FadeIn>
              <div className="space-y-4">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                  Skills
                </p>
                <Heading as="h2" size="h2">
                  Tools and disciplines I rely on to ship durable web experiences.
                </Heading>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <SkillsGrid categories={resume.skillCategories} />
            </FadeIn>
          </Container>
        </Section>
      ) : null}

      {resume.education.length > 0 ? (
        <Section className="pt-20 md:pt-24 lg:pt-28">
          <Container className="space-y-10">
            <FadeIn>
              <div className="space-y-4">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                  Education
                </p>
                <Heading as="h2" size="h2">
                  Formal training, grounded in practical product work.
                </Heading>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <EducationSection entries={resume.education} />
            </FadeIn>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
