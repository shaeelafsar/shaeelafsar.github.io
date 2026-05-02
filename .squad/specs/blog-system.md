# Spec: Blog System

> **Components:** `components/blog/*.tsx`, `app/blog/` · **Owner:** Rachael

---

## Data Model (`types/blog.ts`)

```ts
interface BlogPost {
  slug: string;
  title: string;
  date: string;             // ISO date
  excerpt: string;
  tags: string[];
  image?: string;           // Optional cover image
  published: boolean;
  readingTime: number;      // Calculated from word count
}

interface BlogPostDetail extends BlogPost {
  content: string;          // Compiled MDX
  headings: Heading[];      // Extracted for TOC
}

interface Heading {
  text: string;
  slug: string;             // Auto-generated via rehype-slug
  level: 2 | 3;            // Only h2 and h3
}
```

## Content Source

MDX files in `content/blog/*.mdx`. Frontmatter per architecture spec. Reading time calculated automatically (words / 200).

## Pages

### `/blog` — Listing (`app/blog/page.tsx`) — Server Component

- Fetch all published posts via `lib/blog.ts`, sorted by date desc
- Render `PostList` with `PostCard` components
- Only show posts where `published: true`

### `/blog/[slug]` — Post (`app/blog/[slug]/page.tsx`) — Server Component

- `generateStaticParams()` from published posts
- Compile MDX with custom components, rehype-pretty-code (Shiki), rehype-slug, remark-gfm
- Render post layout: header → MDX body → related posts
- `generateMetadata()` with title, description, OG image, article metadata

---

## Components

### `PostCard` (`post-card.tsx`) — Server Component

```ts
interface PostCardProps {
  post: BlogPost;
}
```

Card with title, date, reading time, excerpt, tags. Links to `/blog/[slug]`.

### `PostList` (`post-list.tsx`) — Server Component

```ts
interface PostListProps {
  posts: BlogPost[];
}
```

Vertical list of `PostCard` components. Wrapped in `StaggerChildren`.

### `PostHeader` (`post-header.tsx`) — Server Component

```ts
interface PostHeaderProps {
  post: BlogPost;
}
```

Title (h1), date, reading time, tags, optional cover image. Full-width layout.

### `MDXComponents` (`mdx-components.tsx`)

Custom component map for MDX rendering:

| MDX Element | Custom Rendering |
|-------------|-----------------|
| `h2`, `h3` | Styled headings with anchor links (via rehype-slug) |
| `pre` / `code` | Syntax highlighted via rehype-pretty-code + Shiki. Dark/light themes. |
| `img` | Wrapped in `OptimizedImage` with proper sizing |
| `a` | External links open in new tab, internal use `<Link>` |
| `blockquote` | Styled callout with left border accent |
| Custom: `<Callout>` | Info/warning/tip callout boxes |

### `TableOfContents` (`table-of-contents.tsx`) — Client Component

```ts
interface TableOfContentsProps {
  headings: Heading[];
}
```

Sidebar on desktop (sticky), hidden on mobile (or collapsible). Scroll-spy: highlights current heading using `IntersectionObserver`. Smooth scroll to heading on click.

### Reading Progress Bar — Client Component (Pris)

Thin bar at very top of viewport. Width tied to `scrollYProgress` via `useScroll`. Uses `--color-accent` color.

---

## RSS Feed (`app/feed.xml/route.ts`)

Route handler that generates RSS 2.0 XML from all published blog posts. Includes title, link, description, pubDate for each item.

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile | Single column, no TOC sidebar, cards stack |
| Desktop (`lg+`) | Post body in `Container size="narrow"`, TOC in sticky sidebar |

## Animations

- Post list: `StaggerChildren` on cards
- Post body: `FadeIn` on content sections
- TOC: active item highlight transition (CSS `transition`)

## Accessibility

- Blog listing: each `PostCard` is a link with descriptive content
- Post page: proper heading hierarchy (`h1` for title, `h2`/`h3` in body)
- Tags are visually distinct but not links (or optionally filterable links)
- Reading time and date displayed as text (not just icons)
- Code blocks have proper `<pre>` / `<code>` semantics
- TOC: `<nav>` with `aria-label` (see table-of-contents spec)

## Dependencies

- UI components (1.3) — `Section`, `Container`, `Heading`, `Badge`, `Card`, `OptimizedImage`
- Animation primitives (1.7) — `FadeIn`, `StaggerChildren`
- Content pipeline (1.8) — `lib/blog.ts`, `lib/mdx.ts`
- Type definitions (1.9) — `BlogPost`, `BlogPostDetail`, `Heading`
- MDX components (3.1) — custom component map for rendering
- Table of contents (3.4) — sidebar navigation
- Reading progress bar (3.5) — scroll progress indicator

## Acceptance Criteria

1. `/blog` lists all published posts sorted by date (newest first)
2. Unpublished posts (where `published: false`) do NOT appear
3. Each `PostCard` shows: title, date, reading time, excerpt, tags
4. Clicking a post card navigates to `/blog/[slug]`
5. `/blog/[slug]` renders full MDX content with custom components
6. Blog post page has: PostHeader (title, date, reading time, tags), MDX body, TOC sidebar
7. `generateStaticParams` returns all published post slugs
8. `generateMetadata` returns post-specific title, description, OG tags
9. Reading progress bar appears on post pages
10. Table of contents highlights current section on scroll (desktop)
11. Posts render correctly in both light and dark mode
12. Code blocks have syntax highlighting via Shiki
13. Post list uses `StaggerChildren` for card entrance animation
14. Related posts section shows 2-3 posts with matching tags (optional for MVP)
