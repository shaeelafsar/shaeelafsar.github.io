import Link from "next/link";
import { FadeIn } from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[calc(100dvh-10rem)] items-center pt-20 md:pt-24 lg:pt-28">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card/90 px-8 py-16 text-center shadow-[var(--shadow-md)] md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-x-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-accent-soft blur-3xl" aria-hidden="true" />
            <div className="relative space-y-6">
              <p className="font-mono text-[clamp(4rem,16vw,9rem)] font-semibold uppercase tracking-[0.2em] text-accent/80">
                404
              </p>
              <div className="space-y-3">
                <Heading as="h1" size="h1">
                  Page not found
                </Heading>
                <p className="mx-auto max-w-2xl text-[length:var(--text-body)] leading-8 text-muted-foreground">
                  The page you were looking for has moved, expired, or never made it out of draft mode.
                </p>
              </div>
              <Button as="a" href="/" size="lg">
                Go home
              </Button>
              <p className="text-sm text-muted-foreground">
                Or head back to the <Link href="/projects" className="text-accent underline-offset-4 hover:underline">projects page</Link> to keep exploring.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
