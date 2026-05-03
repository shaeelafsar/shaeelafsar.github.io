import { CountUp, ScrollReveal, StaggerChildren, TextReveal } from "@/components/animation";
import { SkillsGrid } from "@/components/about/skills-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { getResumeData } from "@/lib/resume";

const CURRENT_REFERENCE_DATE = new Date("2026-05-03T11:07:20.721-05:00");

const interests = [
  {
    title: "Bridging tech & business",
    body: "I thrive at the intersection of engineering and stakeholder engagement — translating complex technical ideas into clear value propositions that drive adoption.",
  },
  {
    title: "Mentoring & leadership",
    body: "I enjoy mentoring engineers on technical storytelling, presentation skills, and how to think about architecture as a business enabler.",
  },
  {
    title: "Life outside the screen",
    body: "Good coffee, fitness, family time, and the kind of side projects that start as curiosity and become real products.",
  },
] as const;

const portraitBadges = ["Spring Boot", "AWS", "Product thinking"] as const;

function getYearsExperience(startDate: string) {
  const start = new Date(startDate);
  let years = CURRENT_REFERENCE_DATE.getFullYear() - start.getFullYear();
  const anniversaryReached =
    CURRENT_REFERENCE_DATE.getMonth() > start.getMonth() ||
    (CURRENT_REFERENCE_DATE.getMonth() === start.getMonth() &&
      CURRENT_REFERENCE_DATE.getDate() >= start.getDate());

  if (!anniversaryReached) {
    years -= 1;
  }

  return Math.max(years, 0);
}

export const metadata = createMetadata({
  title: "About",
  description:
    "About Shaeel Afsar — Lead Software Engineer focused on scalable cloud solutions, enterprise architecture, and bridging technical and business priorities.",
  path: "/about",
});

export default async function AboutPage() {
  const resume = await getResumeData();
  const firstEngineeringRole = [...resume.experience]
    .reverse()
    .find((experience) => experience.role.toLowerCase().includes("engineer"));
  const yearsExperience = getYearsExperience(firstEngineeringRole?.startDate ?? "2019-06-01");
  const fortune500Count = 3;
  const introStats = [
    { label: "Years in engineering", value: yearsExperience, suffix: "+" },
    { label: "Fortune 500 teams", value: fortune500Count, suffix: "" },
    { label: "Skill tracks", value: resume.skillCategories.length, suffix: "" },
  ] as const;

  return (
    <>
      <Section className="section-reveal-shell pt-16 md:pt-20 lg:pt-24" data-testid="about-intro">
        <Container className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] md:items-center lg:gap-16">
          <ScrollReveal className="space-y-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              About
            </p>
            <Heading as="h1" size="h1" className="max-w-3xl">
              <TextReveal className="block" delay={0.06} neonTrail>
                {resume.name}
              </TextReveal>
            </Heading>
            <p className="text-[length:var(--text-body-lg)] leading-8 text-foreground/90 md:leading-9">
              {resume.title}
            </p>
            <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
              {resume.summary}
            </p>
            <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
              Known for clear communication, stakeholder alignment, and translating complex ideas into client value. I bring a unique perspective shaped by years in both engineering and customer-facing sales roles.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="/projects">
                View Projects
              </Button>
              <Button as="a" href="/contact" variant="outline">
                Get in Touch
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {introStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-4 py-4 shadow-[var(--shadow-sm)]"
                >
                  <CountUp
                    className="text-2xl font-semibold text-foreground sm:text-[1.75rem]"
                    suffix={stat.suffix}
                    to={stat.value}
                  />
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.25} direction="left">
            <div
              className="breathing-neon glass-depth hero-gradient-shell relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card/90 p-6 shadow-[var(--shadow-md)] sm:p-8"
              data-testid="about-portrait"
            >
              <div className="cyber-grid absolute inset-0 opacity-40" />
              <div className="accent-orb accent-orb-cyan absolute -left-8 top-10 h-28 w-28 opacity-50" />
              <div className="accent-orb accent-orb-magenta absolute -right-8 bottom-12 h-32 w-32 opacity-55" />
              <div className="relative flex flex-col items-center gap-6">
                <div className="terminal-shell ambient-float absolute left-0 top-0 z-10 w-[min(17rem,calc(100%-1rem))] max-w-[88%] rounded-[var(--radius-lg)] border border-border/80 bg-card/85 shadow-[var(--shadow-neon-sm)] backdrop-blur-[var(--blur-sm)] sm:left-2 sm:top-2">
                  <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-neon-magenta)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-neon-magenta)_55%,transparent)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-neon-cyan)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-neon-cyan)_55%,transparent)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-neon-green)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-neon-green)_55%,transparent)]" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      systems.sh
                    </p>
                  </div>
                  <div className="space-y-3 px-4 py-4 font-mono text-[11px] leading-5 text-muted-foreground sm:text-xs">
                    <p className="text-[color:var(--color-neon-green)]">$ architect --mode reliable</p>
                    <p><span className="text-[color:var(--color-neon-cyan)]">stack:</span> Java · Spring Boot · AWS</p>
                    <p><span className="text-[color:var(--color-neon-magenta)]">focus:</span> scalable APIs + cloud delivery</p>
                    <p className="text-foreground/80">→ translating architecture into product momentum</p>
                  </div>
                </div>
                <ProfileAvatar className="w-full max-w-[17rem] pt-28 sm:pt-24" priority sizes="(min-width: 768px) 18rem, 14rem" />
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-4 py-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Based in
                    </p>
                    <p className="mt-3 text-base font-medium text-foreground">{resume.location}</p>
                  </div>
                  <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-4 py-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Current lane
                    </p>
                    <p className="mt-3 text-base font-medium text-foreground">Cloud APIs + product-facing architecture</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {portraitBadges.map((badge, index) => (
                    <span
                      key={badge}
                      className="glass-panel ambient-float inline-flex min-h-10 items-center rounded-full border border-border/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/85 shadow-[var(--shadow-neon-xs)]"
                      style={{ animationDelay: `-${index + 1.2}s` }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <Section className="section-reveal-shell bg-background-secondary/55" data-testid="what-i-do-section">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              What I do
            </p>
            <Heading as="h2" size="h2" className="max-w-xl">
              <TextReveal className="block" delay={0.05} neonTrail>
                I approach software as a backend-first engineer — designing distributed systems, cloud APIs, and microservices that are built for scale and reliability.
              </TextReveal>
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="space-y-6">
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              The best engineering work starts with understanding the problem deeply. That means designing clean API contracts, choosing the right data models, and building services that handle failure gracefully at scale.
            </p>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              I care about the details that compound — architecture decisions that enable future growth, service boundaries that keep teams autonomous, and observability that catches issues before customers do.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      <Section className="section-reveal-shell">
        <Container className="space-y-10">
          <ScrollReveal className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Technologies
            </p>
            <Heading as="h2" size="h2">
              <TextReveal className="block" delay={0.05} neonTrail>
                Tools and technologies I work with most often.
              </TextReveal>
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              A grouped view of the technologies and practices that shape my day-to-day engineering work.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SkillsGrid categories={resume.skillCategories} />
          </ScrollReveal>
        </Container>
      </Section>

      <Section className="section-reveal-shell bg-background-secondary/55" data-testid="beyond-code-section">
        <Container className="space-y-10">
          <ScrollReveal className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Beyond code
            </p>
            <Heading as="h2" size="h2">
              <TextReveal className="block" delay={0.05} neonTrail>
                The human side of how I work.
              </TextReveal>
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              I&apos;m drawn to work that blends technical depth with clear stakeholder communication, and that shapes how I lead, collaborate, and grow.
            </p>
          </ScrollReveal>
          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" staggerDelay={0.1}>
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

      <Section className="section-reveal-shell pt-8 md:pt-12 lg:pt-16">
        <Container>
          <ScrollReveal>
            <div className="rounded-[var(--radius-xl)] border border-border bg-card/90 px-6 py-12 shadow-[var(--shadow-md)] md:px-10 md:py-14">
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                  Next step
                </p>
                <Heading as="h2" size="h2" className="mt-4">
                  <TextReveal className="block" delay={0.08} neonTrail>
                    Want to see the work in context?
                  </TextReveal>
                </Heading>
                <p className="mt-6 text-[length:var(--text-body)] leading-8 text-muted-foreground">
                  Explore selected projects or reach out if you&apos;re looking for an engineering leader who delivers results.
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
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
