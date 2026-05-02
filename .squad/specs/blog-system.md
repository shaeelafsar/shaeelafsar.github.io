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
