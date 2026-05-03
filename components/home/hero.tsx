import { CountUp, Magnetic, Parallax, ScrollReveal, SlideIn } from "@/components/animation";
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
import { ProfileAvatar } from "@/components/ui/profile-avatar";
import { Section } from "@/components/ui/section";

const heroStats = [
  { label: "Years building systems", value: 6, suffix: "+" },
  { label: "Enterprise teams", value: 4, suffix: "" },
  { label: "Core strengths", value: 3, suffix: "" },
] as const;

const skillPills = ["Spring Boot", "AWS", "Microservices", "APIs"] as const;

export function Hero() {
  return (
    <Section
      className="hero-gradient-shell relative flex items-start overflow-hidden py-12 sm:min-h-[calc(100dvh-5rem)] sm:items-center sm:py-16 md:py-20 lg:py-24"
      data-testid="home-hero"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-80" />
        <GridBackground className="bottom-[-16%] top-[34%] opacity-75" color="rgba(34, 211, 238, 0.34)" />
        <ParticleField className="opacity-70" />
        <div className="matrix-dots absolute inset-0 opacity-20" />
        <div className="ambient-pulse accent-orb accent-orb-cyan absolute left-[6%] top-16 h-32 w-32 sm:h-56 sm:w-56" />
        <div
          className="ambient-pulse accent-orb accent-orb-magenta absolute right-[8%] top-[12%] h-36 w-36 sm:h-64 sm:w-64"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="ambient-float accent-orb accent-orb-blue absolute bottom-[12%] left-[28%] h-28 w-28 sm:h-48 sm:w-48"
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)] lg:items-center lg:gap-16">
          <div className="max-w-4xl">
            <ScrollReveal className="mb-6 flex items-center gap-4 lg:hidden" direction="none">
              <ProfileAvatar className="h-16 w-16 shrink-0" sizes="64px" />
              <div className="min-w-0">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-[color:var(--color-neon-cyan)]">
                  Profile ready for your photo
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drop <span className="font-mono text-foreground">public/images/profile.jpg</span> or <span className="font-mono text-foreground">profile.png</span> in place later.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05} className="mb-6">
              <p className="flicker-text font-mono text-[length:var(--text-meta)] uppercase tracking-[0.22em] text-[color:var(--color-neon-green)]">
                Lead Software Engineer · Chicago, IL
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Heading as="h1" size="display-xl" className="max-w-5xl text-balance leading-none">
                <GlitchText className="inline-block">
                  <span className="neon-text block">Shaeel Afsar</span>
                </GlitchText>
              </Heading>
            </ScrollReveal>
            <ScrollReveal delay={0.18} className="mt-6">
              <p className="typing-glitch inline-flex max-w-full rounded-[var(--radius-pill)] border border-border/80 bg-card/60 px-4 py-2 text-left font-mono text-[length:var(--text-meta)] uppercase tracking-[0.16em] text-accent shadow-[var(--shadow-neon-sm)]">
                <TypeWriter text="Backend systems // cloud architecture" delay={0.22} className="max-w-full" />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="mt-8 max-w-2xl">
              <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground md:leading-9">
                Backend-focused engineer with 6+ years building distributed systems, microservices, and cloud-native APIs at Fortune 500 companies. I design and ship the services behind the product — scalable, reliable, and built to last.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.42} className="mt-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skillPills.map((skill) => (
                  <span
                    key={skill}
                    className="glass-panel inline-flex min-h-10 items-center rounded-full border border-border/70 bg-card/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/85 shadow-[var(--shadow-neon-xs)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.5} className="mt-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
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
            <ScrollReveal delay={0.6} className="mt-10">
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
            </ScrollReveal>
            <ScrollReveal delay={0.74} className="mt-12">
              <a
                href="#featured-projects"
                className="neon-link group inline-flex min-h-11 items-center gap-3 py-2 pr-1 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-accent"
              >
                <span className="h-px w-12 bg-border transition-[transform,background-color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-standard)] motion-safe:group-hover:translate-x-1 motion-safe:group-hover:bg-accent motion-safe:group-hover:shadow-[var(--shadow-neon-sm)]" />
                Scroll to selected work
              </a>
            </ScrollReveal>
          </div>

          <div className="hidden lg:block">
            <SlideIn direction="right" delay={0.24}>
              <div className="relative mx-auto max-w-md">
                <Parallax speed={0.16} className="relative">
                  <NeonGlow className="rounded-[var(--radius-xl)]" color="cyan">
                    <div className="glass-panel cyber-grid glitch-hover relative overflow-hidden rounded-[var(--radius-xl)] border border-border/80 p-8 shadow-[var(--shadow-lg)] backdrop-blur-[var(--blur-md)]">
                      <div className="accent-orb accent-orb-magenta absolute -right-10 top-8 h-32 w-32 opacity-65" />
                      <div className="accent-orb accent-orb-cyan absolute -left-10 bottom-14 h-28 w-28 opacity-55" />
                      <div className="relative space-y-8">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-[color:var(--color-neon-cyan)]">
                              Profile preview
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Auto-uses <span className="font-mono text-foreground">/public/images/profile.jpg</span> or <span className="font-mono text-foreground">profile.png</span>.
                            </p>
                          </div>
                          <span className="pulse-dot accent-pulse" />
                        </div>

                        <div className="mx-auto max-w-[17rem]">
                          <ProfileAvatar
                            className="h-full w-full"
                            priority
                            sizes="(min-width: 1280px) 18rem, 16rem"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-5 py-4">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                              Current focus
                            </p>
                            <p className="mt-3 text-sm leading-6 text-foreground/90">
                              Distributed backend systems, cloud-native APIs, and enterprise architecture.
                            </p>
                          </div>
                          <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-5 py-4">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                              Location
                            </p>
                            <p className="mt-3 text-sm leading-6 text-foreground/90">Chicago, IL · Remote-friendly</p>
                          </div>
                        </div>

                        <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 px-5 py-4">
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                              Signature stack
                            </p>
                            <span className="pulse-dot accent-pulse" />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Java · Spring Boot · AWS · Python · Kubernetes · TypeScript
                          </p>
                        </div>
                      </div>
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
