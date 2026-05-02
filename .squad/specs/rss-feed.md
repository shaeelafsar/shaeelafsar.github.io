# Spec: RSS Feed

> **File:** `app/feed.xml/route.ts` · **Owner:** Rachael

---

## Purpose

Generate an RSS 2.0 feed of all published blog posts. Allows readers to subscribe via RSS readers (Feedly, NetNewsWire, etc.).

## Component Type

N/A — **Route Handler** (Next.js API route returning XML).

## Props / Interfaces

```ts
// Next.js Route Handler
export async function GET(): Promise<Response>;
```

## Implementation Details

```ts
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/metadata';

export async function GET() {
  const posts = await getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
```

### Key Details

- **Route:** `/feed.xml` — conventional RSS URL
- **Format:** RSS 2.0 with Atom namespace (for `atom:link` self-reference)
- **Content:** Only published posts, sorted by date desc
- **Caching:** 1-hour cache via `Cache-Control`
- **XML escaping:** All user content escaped to prevent XML injection
- **Discovery:** Add `<link>` tag in root layout `<head>`:
  ```tsx
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
  ```

---

## Responsive Behavior

N/A — XML response.

## Accessibility

N/A — consumed by RSS readers, not rendered in browser.

## Animation Requirements

N/A.

## Dependencies

- Content pipeline (1.8) — `getAllPosts()` function
- `lib/metadata.ts` — `siteConfig` for site URL and name

## Acceptance Criteria

1. `GET /feed.xml` returns valid RSS 2.0 XML
2. Response `Content-Type` is `application/rss+xml`
3. Feed includes all published blog posts
4. Each item has: title, link, guid, pubDate, description, categories
5. XML is properly escaped (no broken XML from special characters in titles)
6. `<atom:link>` self-reference is present
7. Feed validates against an RSS validator (e.g., W3C Feed Validator)
8. Root layout includes `<link rel="alternate">` for RSS discovery
9. Feed is cached for 1 hour
