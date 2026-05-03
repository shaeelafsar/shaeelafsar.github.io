import { describe, expect, it } from "vitest";
import { createBlogPostStructuredData, createProjectStructuredData, createRssXml, createSitemapEntries, createWebsiteStructuredData } from "@/lib/seo";

const samplePost = {
  slug: "shipping-server-components",
  title: "Shipping server components without losing the human feel",
  date: "2026-04-02T09:00:00-05:00",
  excerpt: "A post on balancing performance and polish.",
  tags: ["nextjs", "react"],
  image: "/images/blog/shipping-server-components.svg",
  published: true,
  featured: false,
  readingTime: "6 min read",
  content: "## Hello world",
};

const sampleProject = {
  slug: "personal-website-foundation",
  title: "Personal website foundation",
  date: "2026-05-02T17:18:28-05:00",
  excerpt: "Designing and building the portfolio platform that powers the site.",
  category: "Full Stack",
  tags: ["nextjs", "tailwind", "mdx"],
  image: "/images/projects/personal-website-foundation.svg",
  featured: true,
  liveUrl: "https://shaeelafsar.github.io",
  githubUrl: "https://github.com/shaeelafsar/personal-website",
  content: "## Problem",
};

describe("seo helpers", () => {
  it("creates website structured data for the root layout", () => {
    expect(createWebsiteStructuredData()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Shaeel Afsar",
      url: "https://shaeelafsar.github.io",
    });
  });

  it("creates blog and project structured data with dynamic og image URLs", () => {
    expect(createBlogPostStructuredData(samplePost)).toMatchObject({
      image: "https://shaeelafsar.github.io/images/blog/shipping-server-components.svg",
      mainEntityOfPage: "https://shaeelafsar.github.io/blog/shipping-server-components",
    });

    expect(createProjectStructuredData(sampleProject)).toMatchObject({
      image: "https://shaeelafsar.github.io/images/projects/personal-website-foundation.svg",
      sameAs: ["https://shaeelafsar.github.io", "https://github.com/shaeelafsar/personal-website"],
    });
  });

  it("creates sitemap entries for static and dynamic routes", () => {
    const sitemap = createSitemapEntries([samplePost], [sampleProject]);

    expect(sitemap.some((entry) => entry.url === "https://shaeelafsar.github.io/")).toBe(true);
    expect(sitemap.some((entry) => entry.url === "https://shaeelafsar.github.io/blog/shipping-server-components")).toBe(true);
    expect(sitemap.some((entry) => entry.url === "https://shaeelafsar.github.io/projects/personal-website-foundation")).toBe(true);
  });

  it("creates rss xml for published posts", () => {
    const xml = createRssXml([samplePost]);

    expect(xml).toContain("<rss version=\"2.0\">");
    expect(xml).toContain("https://shaeelafsar.github.io/blog/shipping-server-components");
    expect(xml).toContain("Shipping server components without losing the human feel");
  });
});
