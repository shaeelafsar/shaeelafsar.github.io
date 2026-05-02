import { FadeIn, Parallax, TextReveal } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section
      className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden py-16 md:py-20 lg:py-24"
      data-testid="home-hero"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="ambient-pulse absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_32%),radial-gradient(circle_at_82%_18%,var(--color-accent-glow),transparent_24%)]" />
        <div
          className="ambient-pulse absolute inset-0 bg-[radial-gradient(circle_at_20%_72%,var(--color-accent-soft),transparent_22%),radial-gradient(circle_at_78%_80%,var(--color-accent-glow),transparent_18%)] opacity-60"
          style={{ animationDelay: "-6s" }}
        />
      </div>
      <Parallax speed={0.14} className="pointer-events-none absolute left-[6%] top-24 hidden lg:block">
        <div className="h-28 w-28 rounded-full border border-border/70 bg-card/45 shadow-[var(--shadow-md)] ring-1 ring-white/35 backdrop-blur-[var(--blur-sm)] dark:ring-white/6" />
      </Parallax>
      <Parallax speed={0.24} className="pointer-events-none absolute right-[8%] top-[22%] hidden lg:block">
        <div className="ambient-float h-36 w-36 rounded-full bg-accent-soft blur-3xl" />
      </Parallax>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <Container className="relative max-w-[var(--container-wide)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-16">
          <div className="max-w-4xl">
            <FadeIn delay={0.05} className="mb-6">
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.2em] text-muted-foreground">
                Frontend engineer · builder · writer
              </p>
            </FadeIn>
            <Heading as="h1" size="display-xl" className="max-w-5xl text-balance leading-none">
              <TextReveal className="block" delay={0.08}>
                Shaeel Afsar
              </TextReveal>
            </Heading>
            <FadeIn delay={0.35} className="mt-8 max-w-2xl">
              <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground md:leading-9">
                Frontend engineer building cinematic web experiences with calm precision, strong systems thinking, and motion that always serves the story.
              </p>
            </FadeIn>
            <FadeIn delay={0.55} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row" data-testid="home-primary-cta">
                <Button as="a" href="/projects" size="lg" className="w-full sm:w-auto">
                  View Projects
                </Button>
                <Button as="a" href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
                  Get in Touch
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.78} className="mt-12">
              <a
                href="#featured-projects"
                className="group inline-flex items-center gap-3 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-accent"
              >
                <span className="h-px w-12 bg-border transition-[transform,background-color] duration-[var(--duration-ui)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:bg-accent" />
                Scroll to selected work
              </a>
            </FadeIn>
          </div>
          <div aria-hidden="true" className="hidden lg:block">
            <div className="relative mx-auto aspect-[4/5] max-w-md">
              <Parallax speed={0.18} className="absolute inset-0">
                <div className="absolute inset-0 rounded-[var(--radius-xl)] border border-border/80 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-card)_82%,transparent),transparent_70%)] shadow-[var(--shadow-lg)] ring-1 ring-white/40 backdrop-blur-[var(--blur-md)] dark:ring-white/6" />
                <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-accent-soft blur-2xl" />
                <div className="absolute right-10 top-14 h-28 w-28 rounded-full border border-border bg-card/80 shadow-[var(--shadow-sm)]" />
              </Parallax>
              <Parallax speed={0.28} className="absolute left-10 top-1/3 right-10">
                <div className="rounded-[var(--radius-lg)] border border-border bg-card/82 p-6 shadow-[var(--shadow-md)] backdrop-blur-[var(--blur-sm)]">
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                    Selected focus
                  </p>
                  <p className="mt-4 text-lg font-medium text-foreground">
                    Design systems, content-rich interfaces, and premium product detail.
                  </p>
                </div>
              </Parallax>
              <Parallax speed={0.22} className="absolute bottom-10 right-0 w-56">
                <div className="rounded-[var(--radius-lg)] border border-border bg-card/82 p-5 shadow-[var(--shadow-md)] backdrop-blur-[var(--blur-sm)]">
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                    Current stack
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Next.js 16 · React 19 · TypeScript · Tailwind · Motion
                  </p>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
