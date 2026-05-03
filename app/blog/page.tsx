import { FadeIn, StaggerChildren, TextReveal } from "@/components/animation";
import { PostCard } from "@/components/blog/post-card";
import { TagList } from "@/components/blog/tag-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { getAllPosts, getAllPostTags } from "@/lib/blog";
import { absoluteUrl, createMetadata } from "@/lib/metadata";
import { createBlogStructuredData } from "@/lib/seo";

export const metadata = {
  ...createMetadata({
    title: "Blog",
    description: "Writing on product engineering, design systems, MDX workflows, and frontend craft.",
    path: "/blog",
  }),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
  },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllPostTags()]);
  const structuredData = createBlogStructuredData(posts);

  return (
    <>
      <JsonLd data={structuredData} />
      <Section className="section-reveal-shell pt-16 md:pt-20 lg:pt-24">
        <Container className="space-y-12 md:space-y-14">
          <div className="space-y-6" data-testid="blog-hero">
            <FadeIn>
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                Notes from the build
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Heading as="h1" size="display-lg" className="max-w-4xl text-balance">
                <TextReveal className="block" delay={0.08} neonTrail>
                  Essays about frontend craft, technical systems, and the product choices behind them.
                </TextReveal>
              </Heading>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="max-w-3xl text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
                A running archive of process notes, implementation decisions, and the quieter lessons that make polished software feel inevitable.
              </p>
            </FadeIn>
          </div>

          <TagList postCount={posts.length} tags={tags} />

          {posts.length > 0 ? (
            <div data-testid="blog-post-list">
              <StaggerChildren className="space-y-6 md:space-y-8">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </StaggerChildren>
            </div>
          ) : (
            <div
              className="rounded-[var(--radius-xl)] border border-dashed border-border bg-card/70 px-6 py-10 text-center md:px-10"
              data-testid="blog-empty-state"
            >
              <Heading as="h2" size="h3">
                No posts published yet.
              </Heading>
              <p className="mx-auto mt-4 max-w-2xl text-[length:var(--text-body)] leading-7 text-muted-foreground">
                The archive is warming up. Check back soon for essays on interface systems, content architecture, and modern Next.js delivery.
              </p>
              <div className="mt-6 flex justify-center">
                <Button as="a" href="/" variant="secondary">
                  Return home
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
