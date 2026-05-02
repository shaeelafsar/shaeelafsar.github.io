# Spec: Reading Progress Bar

> **Component:** `components/blog/reading-progress.tsx` · **Owner:** Pris

---

## Purpose

Thin horizontal progress bar at the very top of the viewport that indicates how far the user has read through a blog post. Provides visual feedback during long-form reading.

## Component Type

**Client Component** — requires `useScroll`, `useTransform` from Framer Motion.

## Props / Interfaces

```ts
interface ReadingProgressProps {
  // No props — reads scroll progress from the page
}
```

## Implementation Details

```tsx
'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from 'motion/react';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)] z-[60] origin-left"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
    />
  );
}
```

### Behavior

- Fixed to top of viewport, above all other content (including header)
- Width scales from 0% to 100% as user scrolls through the article
- Uses `useSpring` for smooth, slightly springy progression (avoids jittery updates)
- On reduced motion: uses raw `scrollYProgress` without spring (still shows progress, just not smooth)

### Visual Design

- Height: `3px` (thin but visible)
- Color: `var(--color-accent)` — matches site accent
- `z-index: 60` — above header (`z-50`)
- `transform-origin: left` — scales from left edge
- No background track — just the fill bar

### Placement

Only rendered on blog post pages (`app/blog/[slug]/page.tsx`), not on listing pages or other routes.

```tsx
// In app/blog/[slug]/page.tsx
<>
  <ReadingProgress />
  <article>...</article>
</>
```

---

## Animation Requirements

| Element | Animation | Details |
|---------|-----------|---------|
| Progress bar | `scaleX` from 0 to 1 | Tied to `scrollYProgress` via `useSpring` |
| Spring config | Stiffness: 100, Damping: 30 | Smooth but responsive feel |
| Reduced motion | Raw scroll binding | No spring, direct `scrollYProgress` mapping |

**Performance:** Only animates `transform` (scaleX) — no layout thrashing. GPU-accelerated.

## Responsive Behavior

Same at all breakpoints. Full-width, 3px height. Visible on mobile and desktop.

## Accessibility

- Pure visual indicator — no semantic meaning
- `aria-hidden="true"` on the element (decorative)
- Does not interfere with any interactive elements
- Reduced motion: still shows progress (just without spring animation)

## Dependencies

- `motion` package (Framer Motion v12)
- Only used on blog post pages (3.3)

## Acceptance Criteria

1. Progress bar appears at top of viewport on blog post pages only
2. Bar width corresponds to scroll position (0% at top, 100% at bottom)
3. Bar uses spring physics for smooth progression
4. Bar renders above the sticky header
5. Bar uses `var(--color-accent)` and adapts to theme changes
6. `prefers-reduced-motion: reduce` disables spring (still shows progress)
7. No layout shift — bar is `position: fixed`
8. No jank — only animates `transform`
9. Bar disappears (scaleX = 0) when at the very top of the page
