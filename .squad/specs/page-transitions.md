# Spec: Page Transitions

> **Component:** `components/animation/page-transition.tsx` · **Owner:** Pris

---

## Purpose

Smooth visual transitions between route changes. Uses the View Transitions API (available in Next.js 16) with a Framer Motion fallback for unsupported browsers. Creates a polished, app-like navigation feel.

## Component Type

**Client Component** — requires hooks, browser APIs, and animation libraries.

## Props / Interfaces

```ts
interface PageTransitionProps {
  children: React.ReactNode;
}
```

## Implementation Details

### Strategy: View Transitions API (Primary)

Next.js 16 supports the View Transitions API via `experimental.viewTransitions: true` in `next.config.ts`. This is the preferred approach:

```tsx
'use client';

import { useViewTransition } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### CSS for View Transitions

```css
/* In globals.css */
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.2s ease-in forwards;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-out;
}

@keyframes fade-out {
  to { opacity: 0; transform: translateY(-4px); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
}
```

### Integration

Wraps `{children}` in the root layout, between `SmoothScrollProvider` and page content:

```tsx
// In app/layout.tsx
<SmoothScrollProvider>
  <Header />
  <main id="main-content">
    <PageTransition>
      {children}
    </PageTransition>
  </main>
  <Footer />
</SmoothScrollProvider>
```

### Decision: Framer Motion AnimatePresence as Fallback

If the View Transitions API is not available (older browsers), `AnimatePresence` provides the same visual effect via JS-based animation. The component detects support and chooses the right approach.

---

## Animation Requirements

| Element | Animation | Timing |
|---------|-----------|--------|
| Page exit | Fade out + slight upward translate | 200ms, ease-in |
| Page enter | Fade in + slight downward-to-center translate | 300ms, ease-out |
| Total transition | Exit → Enter | ~400ms total (mode: "wait") |

**Performance constraints:**
- Only animate `opacity` and `transform` — no layout properties
- `mode="wait"` ensures clean exit before enter (no overlap glitches)
- Keep total duration under 500ms — users shouldn't wait for animations

## Responsive Behavior

Same at all breakpoints. Transition is viewport-agnostic.

## Accessibility

- `prefers-reduced-motion: reduce` → no animation, instant page swap
- Content remains in DOM during transition (no flash of empty page)
- Focus management: after transition, focus resets to top of page or main content
- No content is hidden or inaccessible during the transition

## Dependencies

- `next.config.ts` with `experimental.viewTransitions: true` (1.1)
- `motion` package (Framer Motion v12)
- Root layout (1.2) — wraps children

## Acceptance Criteria

1. Navigating between routes shows a smooth fade transition
2. Transition total duration is under 500ms
3. Exit animation completes before enter animation starts
4. No flash of unstyled/empty content during transition
5. `prefers-reduced-motion: reduce` shows instant navigation (no animation)
6. Header and footer do NOT transition (only page content)
7. Back/forward browser navigation also transitions
8. Scroll position resets to top on page change
9. No layout shift during transitions
10. Works in Chrome, Firefox, Safari (View Transitions polyfill or fallback)
