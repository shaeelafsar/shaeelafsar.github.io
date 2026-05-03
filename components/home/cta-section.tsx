import { FadeIn } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function CtaSection() {
  return (
    <Section className="pt-8 md:pt-12 lg:pt-16" data-testid="home-cta-section">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card/90 px-6 py-12 shadow-[var(--shadow-md)] md:px-10 md:py-16 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-accent-soft),transparent_38%),linear-gradient(180deg,transparent,rgba(0,0,0,0.03))]"
            />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                Let&apos;s work together
              </p>
              <Heading as="h2" size="h2" className="mt-4">
                If you need an engineering leader who bridges technical depth with business impact, I&apos;d love to connect.
              </Heading>
              <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
                I enjoy collaborating on scalable cloud architectures, enterprise platform modernization, and building engineering teams that ship with clarity and confidence.
              </p>
              <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                <Button as="a" href="/contact" size="lg" className="w-full sm:w-auto">
                  Get in Touch
                </Button>
                <Button as="a" href="mailto:afsarshaeel@gmail.com" variant="outline" size="lg" className="w-full sm:w-auto">
                  Email Directly
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
