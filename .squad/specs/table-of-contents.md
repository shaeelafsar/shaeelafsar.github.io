# Spec: Table of Contents

> **Component:** `components/blog/table-of-contents.tsx` · **Owner:** Rachael

---

## Purpose

Auto-generated navigation sidebar for blog posts. Shows h2/h3 headings with scroll-spy active state. Helps readers navigate long-form content.

## Component Type

**Client Component** — requires `IntersectionObserver`, `useState`, scroll event handling.

## Props / Interfaces

```ts
import type { Heading } from '@/types/blog';

interface TableOfContentsProps {
  headings: Heading[];       // Pre-extracted from MDX (h2 and h3 only)
}
```

## Implementation Details

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading currently visible in the viewport
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px', // Trigger when heading is near top
        threshold: 0,
      },
    );

    headings.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  function handleClick(slug: string) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash without scrolling (Lenis handles scroll)
      window.history.replaceState(null, '', `#${slug}`);
    }
  }

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="text-sm font-semibold mb-4 text-[var(--color-text-secondary)]">
        On this page
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map(({ text, slug, level }) => (
          <li key={slug}>
            <button
              onClick={() => handleClick(slug)}
              className={cn(
                'text-left w-full transition-colors duration-200 hover:text-[var(--color-text)]',
                level === 3 && 'pl-4',
                activeId === slug
                  ? 'text-[var(--color-accent)] font-medium'
                  : 'text-[var(--color-text-secondary)]',
              )}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Layout Integration (Blog Post Page)

```tsx
// In app/blog/[slug]/page.tsx
<div className="relative lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
  <article>
    {/* MDX content */}
  </article>
  <aside className="hidden lg:block">
    <div className="sticky top-24">
      <TableOfContents headings={post.headings} />
    </div>
  </aside>
</div>
```

### Scroll-Spy Algorithm

1. Observe all heading elements with `IntersectionObserver`
2. `rootMargin: '-80px 0px -60% 0px'` — trigger when heading enters the top 40% of viewport (offset for sticky header)
3. When multiple headings are visible, the first one wins (topmost in view)
4. Active heading gets accent color and `font-medium`

### Sticky Positioning

- `sticky top-24` — sticks 6rem from top (below header)
- Maximum height: `calc(100vh - 8rem)` with `overflow-y: auto` for very long TOCs

---

## Animation Requirements

- Active item highlight: CSS `transition-colors duration-200` (no Framer Motion needed)
- No entrance animation — TOC should be immediately available

## Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (`< lg`) | Hidden completely (not needed for mobile reading) |
| Desktop (`lg+`) | Sticky sidebar, 250px wide |

## Accessibility

- `<nav>` with `aria-label="Table of contents"`
- Each item is a `<button>` (not `<a>`) since it triggers JS scroll, not navigation
- Active item is visually distinct (color + weight)
- Keyboard accessible: Tab through items, Enter/Space activates scroll
- Indentation for h3 items (nested under h2) via left padding

## Dependencies

- Blog post page (3.3) — provides heading data and layout grid
- Content pipeline (1.8) — extracts headings during MDX compilation
- `Heading` type from `types/blog.ts`

## Acceptance Criteria

1. TOC renders all h2 and h3 headings from the blog post
2. h3 headings are visually indented under h2
3. Clicking a heading smoothly scrolls to that section
4. Active heading highlights in accent color as user scrolls
5. TOC is sticky and follows user down the page
6. TOC is hidden on mobile (below `lg` breakpoint)
7. Empty heading list renders nothing (no empty nav)
8. URL hash updates when clicking a TOC item
9. Initial load with hash in URL scrolls to correct heading
10. Works correctly with Lenis smooth scrolling
