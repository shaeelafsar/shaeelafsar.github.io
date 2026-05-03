import { FadeIn, Magnetic, Parallax, SlideIn } from "@/components/animation";
import {
  GlitchText,
  GridBackground,
  NeonGlow,
  ParticleField,
  TypeWriter,
} from "@/components/effects";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section
      className="hero-gradient-shell relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden py-16 md:py-20 lg:py-24"
      data-testid="home-hero"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-80" />
        <GridBackground className="bottom-[-16%] top-[34%] opacity-75" color="rgba(34, 211, 238, 0.34)" />
        <ParticleField className="opacity-70" />
        <div className="matrix-dots absolute inset-0 opacity-20" />
        <div className="ambient-pulse accent-orb accent-orb-cyan absolute left-[6%] top-16 h-56 w-56" />
        <div
          className="ambient-pulse accent-orb accent-orb-magenta absolute right-[8%] top-[12%] h-64 w-64"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="ambient-float accent-orb accent-orb-blue absolute bottom-[12%] left-[28%] h-48 w-48"
          style={{ animationDelay: "-2.5s" }}
        />
      </div>
      <Parallax speed={0.14} className="pointer-events-none absolute left-[5%] top-24 hidden lg:block">
        <div className="glass-panel glitch-hover h-28 w-28 rounded-full border border-border/70 bg-card/45 shadow-[var(--shadow-md)] ring-1 ring-white/35 backdrop-blur-[var(--blur-sm)] dark:ring-white/6" />
      </Parallax>
      <Parallax speed={0.24} className="pointer-events-none absolute right-[8%] top-[22%] hidden lg:block">
        <div className="ambient-float h-36 w-36 rounded-full bg-accent-soft blur-3xl" />
      </Parallax>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <Container className="relative max-w-[var(--container-wide)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-16">
          <div className="max-w-4xl">
            <FadeIn delay={0.05} className="mb-6">
              <p className="flicker-text font-mono text-[length:var(--text-meta)] uppercase tracking-[0.22em] text-[color:var(--color-neon-green)]">
                Lead Software Engineer · Chicago, IL
              </p>
            </FadeIn>
            <Heading as="h1" size="display-xl" className="max-w-5xl text-balance leading-none">
              <GlitchText className="inline-block">
                <span className="neon-text block">Shaeel Afsar</span>
              </GlitchText>
            </Heading>
            <FadeIn delay={0.22} className="mt-6">
              <p className="typing-glitch inline-flex rounded-[var(--radius-pill)] border border-border/80 bg-card/60 px-4 py-2 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.16em] text-accent shadow-[var(--shadow-neon-sm)]">
                <TypeWriter text="Backend systems // cloud architecture" delay={0.22} />
              </p>
            </FadeIn>
            <FadeIn delay={0.35} className="mt-8 max-w-2xl">
              <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground md:leading-9">
                Backend-focused engineer with 6+ years building distributed systems, microservices, and cloud-native APIs at Fortune 500 companies. I design and ship the services behind the product — scalable, reliable, and built to last.
              </p>
            </FadeIn>
            <FadeIn delay={0.55} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row" data-testid="home-primary-cta">
                <Magnetic className="w-full sm:w-auto">
                  <Button as="a" href="/projects" size="lg" className="w-full sm:w-auto">
                    View Projects
                  </Button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Button as="a" href="/contact" variant="outline" size="lg" className="w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Magnetic>
              </div>
            </FadeIn>
            <FadeIn delay={0.78} className="mt-12">
              <a
                href="#featured-projects"
                className="neon-link group inline-flex items-center gap-3 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-accent"
              >
                <span className="h-px w-12 bg-border transition-[transform,background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:bg-accent motion-safe:group-hover:shadow-[var(--shadow-neon-sm)]" />
                Scroll to selected work
              </a>
            </FadeIn>
          </div>
          <div aria-hidden="true" className="hidden lg:block">
            <SlideIn direction="right" delay={0.24}>
              <div className="relative mx-auto aspect-[4/5] max-w-md">
                <Parallax speed={0.18} className="absolute inset-0">
                  <div className="glass-panel cyber-grid glitch-hover absolute inset-0 rounded-[var(--radius-xl)] border border-border/80 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-card)_82%,transparent),transparent_70%)] shadow-[var(--shadow-lg)] ring-1 ring-white/40 backdrop-blur-[var(--blur-md)] dark:ring-white/6">
                    <div className="absolute inset-6 rounded-[calc(var(--radius-xl)-0.75rem)] border border-white/10" />
                    <div className="absolute left-8 top-8 flex items-center gap-3">
                      <span className="pulse-dot accent-pulse" />
                      <span className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-[color:var(--color-neon-cyan)]">
                        Backend systems
                      </span>
                    </div>
                    <div className="absolute left-8 top-24 h-20 w-20 rounded-full bg-accent-soft blur-2xl" />
                    <div className="absolute right-10 top-14 h-28 w-28 rounded-full border border-border bg-card/80 shadow-[var(--shadow-sm)]" />
                    <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
                      {[
                        ["Scale", "Distributed"],
                        ["Focus", "Backend"],
                        ["Stack", "JVM + AWS"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-4 py-3"
                        >
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                            {label}
                          </p>
                          <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Parallax>
                <Parallax speed={0.28} className="absolute left-10 right-10 top-[30%]">
                  <NeonGlow className="rounded-[var(--radius-lg)]" color="cyan">
                    <div className="glass-panel neon-card glitch-hover rounded-[var(--radius-lg)] border border-border/80 p-6 backdrop-blur-[var(--blur-sm)]">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                          Current focus
                        </p>
                        <span className="pulse-dot accent-pulse" />
                      </div>
                      <p className="mt-4 text-lg font-medium text-foreground">
                        Distributed backend systems, cloud-native APIs, and enterprise-scale architecture.
                      </p>
                    </div>
                  </NeonGlow>
                </Parallax>
                <Parallax speed={0.22} className="absolute bottom-10 right-0 w-56">
                  <NeonGlow className="rounded-[var(--radius-lg)]" color="magenta">
                    <div className="glass-panel neon-card glitch-hover rounded-[var(--radius-lg)] border border-border/80 p-5 backdrop-blur-[var(--blur-sm)]">
                      <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                        Current stack
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        Java · Spring Boot · AWS · Python · Kubernetes
                      </p>
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                    </div>
                  </NeonGlow>
                </Parallax>
              </div>
            </SlideIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
