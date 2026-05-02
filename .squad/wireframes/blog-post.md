# Blog Post (`/blog/[slug]`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `ReadingProgress [client]` above `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: no TOC rail, article only
  - `768-1023`: collapsed `TableOfContents [client]` disclosure above article body
  - `1024-1279`: sticky TOC rail appears beside article in compact desktop layout
  - `1280+`: full sticky TOC rail with 250px width
- Shared test IDs: `site-header`, `theme-toggle`, `mobile-menu-trigger`, `reading-progress`, `site-footer`

## Page stack

`ReadingProgress [client]` → `PostHeader` → `Article + TableOfContents [client]` → `RelatedPosts`

## Client / server ownership

- Client islands: `ReadingProgress [client]`, `TableOfContents [client]`, `ThemeToggle [client]`, `MobileMenu [client]`
- Server sections: `PostHeader`, article body, `RelatedPosts`

## Data flow

- Route data: `content/blog/[slug].mdx` → `lib/blog.ts` / `lib/mdx.ts`
- TOC headings: extracted `h2`/`h3` list from MDX
- Related posts: shared-tag lookup; if none found, section is omitted

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ ReadingProgress [client]            │
├─────────────────────────────────────┤
│ Header                              │
├─────────────────────────────────────┤
│ PostHeader                          │
│ [fade-in] title                     │
│ [fade-in] date / reading time /tags │
│ [fade-in] cover image (optional)    │
├─────────────────────────────────────┤
│ Article / narrow body               │
│ h2 / h3 anchor-ready                │
│ code / callouts / images / tables   │
│ TOC hidden                          │
├─────────────────────────────────────┤
│ RelatedPosts (optional)             │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ ReadingProgress [client]                                     │
├──────────────────────────────────────────────────────────────┤
│ Header                                                       │
├──────────────────────────────────────────────────────────────┤
│ PostHeader                                                   │
├──────────────────────────────────────────────────────────────┤
│ TableOfContents [client] disclosure                          │
│ default collapsed, toggles open/closed inline               │
├──────────────────────────────────────────────────────────────┤
│ Article in narrow container                                  │
├──────────────────────────────────────────────────────────────┤
│ RelatedPosts (optional)                                      │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ReadingProgress [client]                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Header                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostHeader                                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Article + sticky TableOfContents [client]                                    │
│ article narrow | TOC rail 250px                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ RelatedPosts (optional)                                                      │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ReadingProgress [client]                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Header                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostHeader                                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Article + sticky TableOfContents [client]                                    │
│ article narrow | TOC rail 250px                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ RelatedPosts / 2-up cards                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Interaction notes

- Tablet TOC pattern: disclosure button labeled "On this page"; closed by default; expands inline above the article; closes after a heading selection
- Hash-link focus management: TOC click updates hash, scrolls with header offset, and programmatically focuses the destination heading (`tabindex="-1"` if needed)
- Active heading state is reflected visually and remains keyboard-visible with focus styles
- Reduced motion: no smooth scroll animation; hash navigation jumps instantly while still moving focus

## States

- Missing slug: route resolves to `not-found` with link back to `/blog`
- Missing cover image: header renders title/meta without reserving broken image space
- No related posts: omit section entirely
- Malformed heading hierarchy or zero headings: `TableOfContents [client]` renders nothing / disclosure hidden
- Wide tables and long code blocks: horizontally scroll inside their own containers, never page overflow
- Data/build failure: page-level error boundary with article recovery copy

## Accessibility + interaction notes

- Landmarks: skip link, `main`, `article`, TOC `nav`, `footer`
- TOC is labeled `aria-label="Table of contents"`
- Anchor links expose accessible names and visible focus after navigation
- Reading progress is decorative and `aria-hidden="true"`

## Suggested test IDs

- `reading-progress`
- `post-header`
- `blog-article`
- `table-of-contents`
- `toc-disclosure`
- `related-posts`
