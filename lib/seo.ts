import type { BlogPost } from "@/types/blog";
import type { Project } from "@/types/project";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

const buildTimestamp = new Date("2026-05-02T17:18:28-05:00");
const personReference = {
  "@type": "Person",
  name: siteConfig.author,
  url: siteConfig.url,
};

function isoDate(value: string) {
  return new Date(value).toISOString();
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function createWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    author: personReference,
    publisher: personReference,
  };
}

export function createHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.authorTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: siteConfig.sameAs,
  };
}

export function createBlogStructuredData(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    url: absoluteUrl("/blog"),
    description: "Writing on product engineering, design systems, MDX workflows, and frontend craft.",
    publisher: personReference,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: isoDate(post.date),
      description: post.excerpt,
      image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
      keywords: post.tags,
      author: personReference,
    })),
  };
}

export function createBlogPostStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: personReference,
    publisher: personReference,
    keywords: post.tags,
  };
}

export function createProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.excerpt,
    datePublished: isoDate(project.date),
    url: absoluteUrl(`/projects/${project.slug}`),
    mainEntityOfPage: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(`/projects/${project.slug}/opengraph-image`),
    genre: project.category,
    keywords: project.tags,
    author: personReference,
    creator: personReference,
    sameAs: [project.liveUrl, project.githubUrl].filter(Boolean),
  };
}

export function createSitemapEntries(posts: BlogPost[], projects: Project[]) {
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/resume", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: buildTimestamp,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: new Date(project.date),
      changeFrequency: "monthly" as const,
      priority: 0.76,
    })),
  ];
}

export function createRssXml(posts: BlogPost[]) {
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</link>
      <guid>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</guid>
      <pubDate>${escapeXml(new Date(post.date).toUTCString())}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`,
    )
    .join("");

  const lastBuildDate = posts[0] ? new Date(posts[0].date).toUTCString() : buildTimestamp.toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}
