import { notFound } from "next/navigation";
import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og";
import { getProjectBySlug } from "@/lib/projects";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return createOgImage({
    eyebrow: project.category,
    title: project.title,
    description: project.excerpt,
    meta: ["Project Case Study"],
    badges: project.tags,
  });
}
