import { FadeIn, Magnetic, StaggerChildren } from "@/components/animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { BlogPost } from "@/types/blog";

interface BlogTeaserProps {
  posts: BlogPost[];
}

const postDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function BlogTeaser({ posts }: BlogTeaserProps) {
  return (
    <Section className="relative overflow-hidden" data-testid="blog-teaser-section">
      <div aria-hidden="true" className="accent-orb accent-orb-magenta absolute right-[10%] top-20 h-40 w-40 opacity-35" />
      <Container className="relative space-y-12">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="flicker-text font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
              Latest writing
            </p>
            <Heading as="h2" size="h2" className="text-balance">
              Notes on systems, product detail, and frontend craftsmanship.
            </Heading>
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              Short essays from the build process — the decisions, patterns, and tradeoffs behind thoughtful digital products.
            </p>
          </div>
          <Magnetic className="inline-flex">
            <Button as="a" href="/blog" variant="ghost">
              Read the Blog
            </Button>
          </Magnetic>
        </FadeIn>
        {posts.length === 0 ? (
          <FadeIn className="glass-panel neon-card rounded-[var(--radius-xl)] border border-dashed border-border-strong p-8 md:p-10">
            <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
              New writing is on the way. Visit the blog index for upcoming essays and notes.
            </p>
          </FadeIn>
        ) : (
          <StaggerChildren
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            data-testid="blog-teaser-list"
          >
            {posts.map((post) => (
              <Card key={post.slug} className="bg-card/95">
                <CardContent className="gap-5">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{postDateFormatter.format(new Date(post.date))}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <Heading as="h3" size="h3">
                    {post.title}
                  </Heading>
                  <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button as="a" href={`/blog/${post.slug}`} variant="ghost" size="sm">
                    Read Post
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </StaggerChildren>
        )}
      </Container>
    </Section>
  );
}
