import { FadeIn, Magnetic, TextReveal } from "@/components/animation";
import { NeonGlow } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function CtaSection() {
  return (
    <Section className="section-reveal-shell pt-8 md:pt-12 lg:pt-16" data-testid="home-cta-section">
      <Container>
        <FadeIn>
          <NeonGlow className="rounded-[var(--radius-xl)]" color="green">
            <div className="breathing-neon glass-depth glass-panel neon-card glitch-hover hero-gradient-shell cyber-grid relative overflow-hidden rounded-[var(--radius-xl)] border border-border/80 px-6 py-12 shadow-[var(--shadow-md)] md:px-10 md:py-16 lg:px-16">
              <div aria-hidden="true" className="accent-orb accent-orb-cyan absolute -left-10 top-0 h-36 w-36 opacity-60" />
              <div aria-hidden="true" className="accent-orb accent-orb-magenta absolute -right-10 bottom-0 h-40 w-40 opacity-55" />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <p className="flicker-text font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                  Let&apos;s work together
                </p>
                <Heading as="h2" size="h2" className="mt-4 text-balance neon-text">
                  <TextReveal className="block" delay={0.08} neonTrail>
                    If you need a backend engineer who can architect distributed systems and ship reliable cloud-native services, let&apos;s connect.
                  </TextReveal>
                </Heading>
                <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
                  I enjoy collaborating on high-throughput backend systems, API platform design, cloud infrastructure, and building engineering teams that ship with confidence.
                </p>
                <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                  <Magnetic className="w-full sm:w-auto">
                    <Button as="a" href="/contact" size="lg" className="w-full sm:w-auto">
                      Get in Touch
                    </Button>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                    <Button
                      as="a"
                      href="mailto:afsarshaeel@gmail.com"
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Email Directly
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </NeonGlow>
        </FadeIn>
      </Container>
    </Section>
  );
}
