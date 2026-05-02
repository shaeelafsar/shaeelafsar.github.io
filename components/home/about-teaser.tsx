import { FadeIn } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function AboutTeaser() {
  return (
    <Section data-testid="about-teaser">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:items-center lg:gap-16">
        <FadeIn className="space-y-6">
          <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
            About me
          </p>
          <Heading as="h2" size="h2" className="max-w-3xl">
            I care about frontend work that feels precise, resilient, and easy to trust.
          </Heading>
          <p className="max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
            My favorite projects sit at the intersection of product thinking, interface craft, and practical systems work. I enjoy shaping the details that make a site feel calm on first load and durable over time.
          </p>
          <Button as="a" href="/about" variant="ghost">
            Learn More
          </Button>
        </FadeIn>
        <FadeIn delay={0.15} direction="left">
          <div
            role="img"
            aria-label="Abstract studio workspace illustration representing Shaeel Afsar's approach to product engineering"
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card/90 p-8 shadow-[var(--shadow-md)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent-soft),transparent_32%),linear-gradient(180deg,transparent,rgba(0,0,0,0.02))]" />
            <div className="relative space-y-6">
              <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
                <div className="rounded-[var(--radius-lg)] border border-border bg-background-secondary/70 p-5">
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                    Approach
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Thoughtful systems, elegant interaction, and just enough motion.
                  </p>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-border bg-card-muted/80" />
              </div>
              <div className="rounded-[var(--radius-lg)] border border-border bg-card-muted/70 p-6">
                <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                  What I optimize for
                </p>
                <p className="mt-4 text-lg font-medium text-foreground">
                  Interfaces with a clear hierarchy, strong accessibility, and a premium feel across every breakpoint.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
