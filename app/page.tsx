import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { getFeaturedProjects } from "@/lib/projects";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Home",
    description:
      "Cinematic portfolio home for Shaeel Afsar featuring selected work, writing, and a clear path to connect.",
    path: "/",
  });
}

export default async function Home() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(), getAllPosts()]);

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects.slice(0, 3)} />
      <AboutTeaser />
      <BlogTeaser posts={posts.slice(0, 3)} />
      <CtaSection />
    </>
  );
}
