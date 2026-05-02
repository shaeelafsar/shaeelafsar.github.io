import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { createHomeStructuredData } from "@/lib/seo";
import { getFeaturedProjects } from "@/lib/projects";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Cinematic portfolio home for Shaeel Afsar featuring selected work, writing, and a clear path to connect.",
  path: "/",
});

export default async function Home() {
  const [projects, posts] = await Promise.all([getFeaturedProjects(), getAllPosts()]);
  const structuredData = createHomeStructuredData();

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <FeaturedProjects projects={projects.slice(0, 3)} />
      <AboutTeaser />
      <BlogTeaser posts={posts.slice(0, 3)} />
      <CtaSection />
    </>
  );
}
