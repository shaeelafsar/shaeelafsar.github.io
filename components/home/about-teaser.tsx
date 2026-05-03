import { FadeIn, Magnetic } from "@/components/animation";
import { NeonGlow } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function AboutTeaser() {
  return (
    <Section className="relative overflow-hidden" data-testid="about-teaser">
      <div aria-hidden="true" className="accent-orb accent-orb-blue absolute right-[10%] top-16 h-44 w-44 opacity-55" />
      <Container className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-16">
        <FadeIn className="space-y-6">
          <p className="flicker-text font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
            About me
          </p>
          <Heading as="h2" size="h2" className="max-w-3xl text-balance">
            I build the backend systems that power enterprise products — scalable, reliable, and cloud-native.
          </Heading>
          <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
            With experience across Fortune 500 companies like Amazon, United Airlines, and UnitedHealth Group, I specialize in Java/Spring Boot microservices, AWS cloud infrastructure, and designing APIs that serve millions of requests.
          </p>
          <Magnetic className="inline-flex">
            <Button as="a" href="/about" variant="ghost">
              Learn More
            </Button>
          </Magnetic>
        </FadeIn>
        <FadeIn delay={0.15} direction="left">
          <NeonGlow className="rounded-[var(--radius-xl)]" color="magenta">
            <div
              role="img"
              aria-label="Abstract studio workspace illustration representing Shaeel Afsar's approach to product engineering"
              className="glass-panel neon-card glitch-hover hero-gradient-shell relative overflow-hidden rounded-[var(--radius-xl)] border border-border/80 p-8"
            >
              <div className="cyber-grid absolute inset-0 opacity-55" />
              <div className="accent-orb accent-orb-magenta absolute -right-8 top-6 h-28 w-28 opacity-65" />
              <div className="relative space-y-6">
                <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
                  <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 p-5">
                    <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                      Approach
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Discovery workshops, architecture proposals, and proof-of-concepts that drive adoption.
                    </p>
                  </div>
                  <div className="glass-panel relative rounded-[var(--radius-lg)] border border-border/70 bg-card-muted/70">
                    <div className="absolute inset-4 rounded-[calc(var(--radius-lg)-0.5rem)] border border-white/10" />
                    <div className="absolute inset-x-5 top-6 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                    <div className="absolute inset-x-5 bottom-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      <span>ship</span>
                      <span>iterate</span>
                    </div>
                  </div>
                </div>
                <div className="glass-panel rounded-[var(--radius-lg)] border border-border/70 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                      What I optimize for
                    </p>
                    <span className="pulse-dot accent-pulse" />
                  </div>
                  <p className="mt-4 text-lg font-medium text-foreground">
                    High-throughput backend services, clean API contracts, and cloud architectures built for reliability at scale.
                  </p>
                </div>
              </div>
            </div>
          </NeonGlow>
        </FadeIn>
      </Container>
    </Section>
  );
}
