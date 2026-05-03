import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animation";
import { mdxComponents } from "@/components/blog/mdx-components";
import { PostCard } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { compileMDX, extractHeadings } from "@/lib/mdx";
import { createMetadata } from "@/lib/metadata";
import { createBlogPostStructuredData } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return createMetadata({
      title: "Blog",
      description: "Writing by Shaeel Afsar.",
      path: "/blog",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    section: "Blog",
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const [compiledPost, relatedPosts] = await Promise.all([
    compileMDX({
      source: post.content,
      components: mdxComponents,
    }),
    getRelatedPosts(post.slug, 3),
  ]);
  const headings = extractHeadings(post.content);
  const structuredData = createBlogPostStructuredData(post);

  return (
    <>
      <JsonLd data={structuredData} />
      <ReadingProgress />
      <Section className="pt-16 md:pt-20 lg:pt-24">
        <Container className="space-y-10 md:space-y-12">
          <div className="max-w-[var(--container-narrow)] space-y-6" data-testid="post-header">
            <FadeIn>
              <Link
                className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-foreground"
                href="/blog"
              >
                <span aria-hidden="true">←</span>
                Back to blog
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Heading as="h1" size="display-lg" className="text-balance">
                {post.title}
              </Heading>
            </FadeIn>
            <FadeIn delay={0.16}>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readingTime}</span>
                <span aria-hidden="true">•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="text-[length:var(--text-body-lg)] leading-8 text-muted-foreground">
                {post.excerpt}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.28}>
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card-muted">
              <Image
                alt={`Cover image for ${post.title}`}
                className="h-auto w-full object-cover"
                height={900}
                priority
                sizes="(min-width: 1280px) 80rem, 100vw"
                src={post.image}
                width={1600}
              />
            </div>
          </FadeIn>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,var(--container-narrow))_250px] lg:justify-center lg:gap-12">
            <div className="space-y-8">
              <TableOfContents items={headings} mode="inline" />
              <article data-testid="blog-article">
                <Prose>{compiledPost.content}</Prose>
              </article>
            </div>
            <TableOfContents items={headings} mode="aside" />
          </div>

          {relatedPosts.length > 0 ? (
            <div className="space-y-6" data-testid="related-posts">
              <Heading as="h2" size="h2" className="max-w-3xl">
                Related posts for the same thread of work.
              </Heading>
              <div className="grid gap-6 xl:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
