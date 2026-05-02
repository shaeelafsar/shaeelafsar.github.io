import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/metadata";

export default function Home() {
  return (
    <Section className="pt-20 md:pt-24 lg:pt-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.9fr)] lg:items-end">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.2em] text-muted-foreground">
            Phase 1 foundation
          </p>
          <Heading as="h1" size="display-xl" className="max-w-4xl text-balance">
            {siteConfig.name}
          </Heading>
          <p className="max-w-2xl text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/projects">
              View projects
            </Button>
            <Button as="a" href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
        </div>
        <Card>
          <CardImage>
            <div className="flex min-h-56 items-end bg-[linear-gradient(135deg,var(--color-accent-soft),transparent_70%)] p-6">
              <Badge variant="accent">Wave 2</Badge>
            </div>
          </CardImage>
          <CardContent>
            <Heading as="h2" size="h3">
              Foundation pieces are in place
            </Heading>
            <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
              Shared layout, reusable design-system components, and the first MDX content pipeline are now wired into the app shell.
            </p>
          </CardContent>
          <CardFooter>
            <Button as="a" href="/contact" variant="ghost" size="sm">
              Let&apos;s collaborate
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </Section>
  );
}
