# Spec: Dynamic OG Images

> **Files:** `app/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx` · **Owner:** Rachael

---

## Purpose

Auto-generated Open Graph images for social sharing. Each page gets a unique, branded image using Satori (via `@vercel/og`). When shared on Twitter, LinkedIn, Slack, etc., each link shows a custom preview image.

## Component Type

N/A — **Image Route Handlers** using Next.js `ImageResponse` API.

## Props / Interfaces

```ts
// Standard Next.js OG image signature
export default async function OGImage(): Promise<ImageResponse>;

// For dynamic routes
export default async function OGImage({ params }: { params: Promise<{ slug: string }> }): Promise<ImageResponse>;
```

## Implementation Details

### Default OG Image (`app/opengraph-image.tsx`)

Used for home, about, projects listing, blog listing, resume, contact.

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shaeel Afsar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
        fontFamily: 'Inter',
      }}>
        <div style={{ fontSize: 72, fontWeight: 700 }}>Shaeel Afsar</div>
        <div style={{ fontSize: 28, color: '#a3a3a3', marginTop: 16 }}>
          Developer & Builder
        </div>
      </div>
    ),
    { ...size },
  );
}
```

### Blog Post OG Image (`app/blog/[slug]/opengraph-image.tsx`)

```tsx
import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'edge';
export const alt = 'Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 80,
        backgroundColor: '#0a0a0a',
        color: '#fafafa',
      }}>
        <div style={{ fontSize: 16, color: '#3b82f6', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 2 }}>
          Blog
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.2, maxWidth: '90%' }}>
          {post?.title || 'Blog Post'}
        </div>
        <div style={{ fontSize: 24, color: '#a3a3a3', marginTop: 24 }}>
          Shaeel Afsar
        </div>
      </div>
    ),
    { ...size },
  );
}
```

### Project OG Image (`app/projects/[slug]/opengraph-image.tsx`)

Same pattern as blog, but with "Project" label and project title.

### Design Guidelines

- **Size:** 1200×630px (standard OG image ratio)
- **Background:** Dark (`#0a0a0a`) — looks good on all platforms
- **Typography:** System font stack or loaded Inter (edge function limitation)
- **Branding:** Always include "Shaeel Afsar" name
- **Accent:** Blue (`#3b82f6`) for category labels
- **Layout:** Left-aligned, bottom-aligned text with generous padding (80px)

### Font Loading

Satori supports custom fonts via fetching:

```tsx
const inter = fetch(new URL('../public/fonts/Inter-Bold.woff', import.meta.url)).then(res => res.arrayBuffer());

export default async function OGImage() {
  const fontData = await inter;
  return new ImageResponse(jsx, {
    ...size,
    fonts: [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }],
  });
}
```

If font loading is complex, use the default system font (Satori handles this).

### `generateStaticParams` for OG Images

Dynamic OG images are generated at build time via the same `generateStaticParams` as the parent page — no extra config needed.

---

## Responsive Behavior

N/A — OG images are fixed 1200×630px.

## Accessibility

- `alt` text exported for each image route
- OG images are decorative in context (social previews), but alt text improves accessibility of link previews

## Animation Requirements

N/A — static images.

## Dependencies

- `@vercel/og` / `next/og` (built into Next.js)
- Content pipeline (1.8) — `getPostBySlug()`, `getProjectBySlug()` for dynamic data
- Fonts in `public/fonts/` (optional — can use system fonts)
- SEO metadata (5.1) — pages reference these images in their `openGraph.images`

## Acceptance Criteria

1. `/opengraph-image` returns a 1200×630 PNG image
2. `/blog/[slug]/opengraph-image` returns a post-specific OG image with title
3. `/projects/[slug]/opengraph-image` returns a project-specific OG image with title
4. Images render with consistent dark theme branding
5. Long titles truncate gracefully (no overflow)
6. Images are referenced in page metadata (`openGraph.images`)
7. Social sharing previews show correct images (test with Twitter Card Validator, LinkedIn Post Inspector)
8. OG images generate at build time for all static params
9. Edge runtime is specified for performance
