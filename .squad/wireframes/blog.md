# Blog (`/blog`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: single-column listing
  - `768-1023`: single-column listing with wider rhythm
  - `1024-1279`: compact desktop list, larger whitespace, inline nav visible
  - `1280+`: wide editorial list rhythm
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`BlogHero` → `TagList` (decorative metadata strip) → `PostList`

## Client / server ownership

- Server sections only: `BlogHero`, `TagList`, `PostList`
- Client islands in shell only: `ThemeToggle [client]`, `MobileMenu [client]`
- `TagList` is **not** interactive in v1

## Data flow

- Posts: `content/blog/*.mdx` → `lib/blog.ts` → published-only, date desc
- `TagList`: derived unique tags from published posts for display-only metadata
- Pagination direction: **v1 uses one static full list**; no pagination, no load-more, no filtering

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ BlogHero                            │
│ [fade-in] H1 Blog                   │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ TagList                             │
│ decorative topic pills only         │
├─────────────────────────────────────┤
│ PostList                            │
│ [stagger] PostCard 01               │
│ [stagger] PostCard 02               │
│ [stagger] PostCard 03               │
│ [stagger] PostCard 04               │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ BlogHero                                                     │
├──────────────────────────────────────────────────────────────┤
│ TagList pills wrap across rows                               │
├──────────────────────────────────────────────────────────────┤
│ PostList                                                     │
│ single-column editorial stack with larger spacing            │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BlogHero                                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ TagList / metadata strip                                                     │
│ tags + post count + editorial note                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostList                                                                     │
│ single-column stack, generous vertical rhythm                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BlogHero                                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ TagList / metadata strip                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostList                                                                     │
│ vertical editorial rhythm with generous whitespace                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Empty state: show `TagList` only if tags exist; render "No posts published yet" copy plus return CTA to `/`
- Data/build failure: page-level error boundary swaps `PostList` for recovery copy and keeps hero visible
- Loading: root loading shell shows hero + metadata-strip skeleton + list skeleton rows

## Accessibility + interaction notes

- `TagList` pills are plain text/badge elements, not buttons or links
- `PostList` remains fully keyboard navigable through card links only
- Heading order stays `h1` for page hero, then card titles beneath
- Decorative tags still require sufficient contrast against backgrounds

## Suggested test IDs

- `blog-hero`
- `blog-tag-list`
- `blog-post-list`
- `blog-empty-state`
- `blog-post-count`
