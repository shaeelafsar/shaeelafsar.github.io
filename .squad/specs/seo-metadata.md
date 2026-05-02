# Spec: SEO Metadata

> **Scope:** All pages (`app/*/page.tsx`) · **Owner:** Rachael

---

## Purpose

Ensure every page has complete, accurate metadata for search engines and social sharing. Uses Next.js `Metadata` API for static pages and `generateMetadata` for dynamic pages.

## Component Type

N/A — Next.js metadata exports on page files.

## Implementation Details

### Static Pages (export `metadata`)

```ts
// app/page.tsx (Home)
export const metadata: Metadata = {
  title: 'Shaeel Afsar — Developer & Builder',
  description: 'Personal website of Shaeel Afsar. Explore projects, read the blog, and get in touch.',
};

// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Shaeel Afsar — background, philosophy, skills, and interests.',
};

// app/projects/page.tsx
export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects and case studies by Shaeel Afsar.',
};

// app/blog/page.tsx
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on code, design, and building products.',
};

// app/resume/page.tsx
export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional experience, skills, and education of Shaeel Afsar.',
};

// app/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Shaeel Afsar.',
};
```

### Dynamic Pages (export `generateMetadata`)

```ts
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: `/blog/${slug}/opengraph-image` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: 'article',
      images: [{ url: `/projects/${slug}/opengraph-image` }],
    },
  };
}
```

### Root Layout Metadata

The root `app/layout.tsx` sets site-wide defaults:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://shaeelafsar.com'),
  title: {
    default: 'Shaeel Afsar',
    template: '%s — Shaeel Afsar',
  },
  description: 'Personal website of Shaeel Afsar — developer, builder.',
  openGraph: {
    type: 'website',
    siteName: 'Shaeel Afsar',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shaeelafsar',  // Update with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

### `app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllProjects } from '@/lib/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const projects = await getAllProjects();

  const blogEntries = posts.map(post => ({
    url: `https://shaeelafsar.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectEntries = projects.map(project => ({
    url: `https://shaeelafsar.com/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: 'https://shaeelafsar.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://shaeelafsar.com/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://shaeelafsar.com/projects', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://shaeelafsar.com/blog', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://shaeelafsar.com/resume', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://shaeelafsar.com/contact', changeFrequency: 'yearly', priority: 0.5 },
    ...blogEntries,
    ...projectEntries,
  ];
}
```

### `app/robots.ts`

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://shaeelafsar.com/sitemap.xml',
  };
}
```

---

## Responsive Behavior

N/A — metadata is not visual.

## Accessibility

Good metadata improves accessibility for search engines and social media previews, which assists users who discover the site via these channels.

## Animation Requirements

N/A.

## Dependencies

- All pages built (Phase 2)
- Content pipeline (1.8) — `getAllPosts()`, `getAllProjects()`
- `lib/metadata.ts` — `siteConfig` for consistent URLs

## Acceptance Criteria

1. Every page has `<title>` tag (via `metadata` or `generateMetadata`)
2. Every page has `<meta name="description">` tag
3. Title template works: "Page Name — Shaeel Afsar"
4. Home page title is the full custom title (not template)
5. Dynamic pages (blog/project slugs) have unique, content-specific metadata
6. OpenGraph tags present on all pages (title, description, image, type)
7. Twitter card tags present on all pages
8. `/sitemap.xml` returns valid sitemap with all static and dynamic routes
9. `/robots.txt` allows all crawlers and points to sitemap
10. RSS feed `<link>` in `<head>` for feed discovery
11. Favicon and apple-touch-icon referenced in metadata
12. `metadataBase` correctly set for absolute URL resolution
