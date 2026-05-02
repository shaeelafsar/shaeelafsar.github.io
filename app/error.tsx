"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[calc(100dvh-10rem)] items-center pt-20 md:pt-24 lg:pt-28">
      <Container>
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-border bg-card/90 p-8 shadow-[var(--shadow-md)] md:p-10">
          <div className="space-y-6">
            <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.2em] text-muted-foreground">
              Unexpected error
            </p>
            <div className="space-y-3">
              <Heading as="h1" size="h2">
                Something went wrong while rendering this page.
              </Heading>
              <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
                Please try again. If the problem keeps happening, feel free to reach out directly and include what you were doing when the error appeared.
              </p>
              {error.digest ? (
                <p className="text-sm text-muted-foreground">Reference: {error.digest}</p>
              ) : null}
            </div>
            <Button onClick={reset} size="lg">
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
