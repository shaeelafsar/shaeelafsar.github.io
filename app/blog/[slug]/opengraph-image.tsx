import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og";
import { formatDate } from "@/lib/utils";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return createOgImage({
    eyebrow: "Blog Post",
    title: post.title,
    description: post.excerpt,
    meta: [formatDate(post.date), post.readingTime],
    badges: post.tags,
  });
}
