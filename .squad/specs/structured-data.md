# Spec: Structured Data (JSON-LD)

> **Scope:** `app/layout.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx` · **Owner:** Rachael

---

## Purpose

Add JSON-LD structured data to key pages for enhanced search engine results (rich snippets). Helps Google understand the site's content type, author, and relationships.

## Component Type

N/A — `<script type="application/ld+json">` tags rendered in Server Components.

## Implementation Details

### Helper Function

```ts
// lib/structured-data.ts

export function jsonLd(data: Record<string, unknown>): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### 1. WebSite Schema (Root Layout or Home Page)

```tsx
// In app/layout.tsx or app/page.tsx
{jsonLd({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Shaeel Afsar',
  url: 'https://shaeelafsar.com',
  description: 'Personal website of Shaeel Afsar.',
  author: {
    '@type': 'Person',
    name: 'Shaeel Afsar',
  },
})}
```

### 2. Person Schema (Home Page)

```tsx
// In app/page.tsx
{jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shaeel Afsar',
  url: 'https://shaeelafsar.com',
  jobTitle: 'Software Engineer', // Update with actual title
  sameAs: [
    'https://github.com/shaeelafsar',      // Update with actual URLs
    'https://linkedin.com/in/shaeelafsar',
    'https://twitter.com/shaeelafsar',
  ],
  image: 'https://shaeelafsar.com/images/shaeel.jpg', // Update with actual image
})}
```

### 3. BlogPosting Schema (Blog Posts)

```tsx
// In app/blog/[slug]/page.tsx
{jsonLd({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Person',
    name: 'Shaeel Afsar',
    url: 'https://shaeelafsar.com',
  },
  image: post.image ? `https://shaeelafsar.com${post.image}` : undefined,
  url: `https://shaeelafsar.com/blog/${post.slug}`,
  keywords: post.tags,
  wordCount: undefined, // Calculate from content if desired
  publisher: {
    '@type': 'Person',
    name: 'Shaeel Afsar',
  },
})}
```

### 4. BreadcrumbList (All Pages)

```tsx
// Reusable breadcrumb helper in lib/structured-data.ts
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

// Usage in app/blog/[slug]/page.tsx
{breadcrumbJsonLd([
  { name: 'Home', url: 'https://shaeelafsar.com' },
  { name: 'Blog', url: 'https://shaeelafsar.com/blog' },
  { name: post.title, url: `https://shaeelafsar.com/blog/${post.slug}` },
])}
```

### Schema Placement

JSON-LD scripts go inside the page component's JSX — Next.js automatically places `<script>` tags in the `<head>` when inside Server Components.

---

## Responsive Behavior

N/A — structured data is not visual.

## Accessibility

N/A — consumed by search engines, not rendered visually.

## Animation Requirements

N/A.

## Dependencies

- All pages built (Phase 2)
- Content pipeline (1.8) — blog post data for dynamic schemas
- SEO metadata (5.1) — complements `Metadata` exports

## Acceptance Criteria

1. Home page includes `WebSite` and `Person` JSON-LD schemas
2. Blog post pages include `BlogPosting` JSON-LD schema with correct data
3. Key pages include `BreadcrumbList` JSON-LD
4. All JSON-LD is valid (test with Google Rich Results Test)
5. No duplicate schemas on the same page
6. `@context` is always `https://schema.org`
7. URLs are absolute (not relative)
8. Schemas render in `<head>` (or valid `<script>` in body)
9. Dynamic data (post title, date, tags) populates correctly
