# Spec: Animation Primitives

> **Components:** `components/animation/*.tsx` · **Owner:** Pris

## Overview

Reusable animation wrapper components. All are Client Components (`'use client'`). They accept `children` (which may be Server Components) and add scroll-triggered or mount-triggered animations.

---

## `FadeIn`

Fade + translate on enter viewport.

```ts
interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';  // default: 'up'
  delay?: number;        // seconds, default: 0
  duration?: number;     // seconds, default: 0.6
  once?: boolean;        // animate once, default: true
  className?: string;
}
```

**Implementation:**
```tsx
<motion.div
  initial={{ opacity: 0, y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0, x: ... }}
  whileInView={{ opacity: 1, y: 0, x: 0 }}
  viewport={{ once, margin: '-80px' }}
  transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
>
```

---

## `StaggerChildren`

Container that staggers its children's entrance animations.

```ts
interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;   // seconds between children, default: 0.1
  className?: string;
}
```

**Implementation:** Use `motion.div` with `variants` and `staggerChildren` in `transition`.

Each direct child must be wrapped in a `motion.div` with child variants (fade + translate up).

---

## `TextReveal`

Split text into words or characters and animate them in sequence.

```ts
interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';  // default: 'h1'
  type?: 'word' | 'character';                 // default: 'word'
  staggerDelay?: number;                       // default: 0.08
  className?: string;
}
```

**Implementation:** Split `text` by words/chars, wrap each in `<motion.span>` with overflow hidden container. Animate `y` from `100%` to `0%` with stagger.

---

## `Parallax`

Scroll-linked vertical offset for depth effect.

```ts
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;     // multiplier, default: 0.5 (positive = moves slower than scroll)
  className?: string;
}
```

**Implementation:** `useScroll` on target ref, `useTransform` to map scrollYProgress to Y translation.

---

## `SmoothScrollProvider`

Wraps the app in Lenis smooth scrolling.

```ts
interface SmoothScrollProviderProps {
  children: React.ReactNode;
}
```

**Implementation:** Initialize Lenis instance in `useEffect`, handle RAF loop, cleanup on unmount. Provide Lenis instance via React context for programmatic scroll-to.

---

## `PageTransition`

Wraps page content for route transition animations. Leverage React View Transitions API if available in Next.js 16, fallback to Framer Motion `AnimatePresence`.

```ts
interface PageTransitionProps {
  children: React.ReactNode;
}
```

---

## Performance Rules (ALL animation components)

1. Only animate `transform` and `opacity`
2. Check `prefers-reduced-motion` — if reduce, render children with no animation
3. Use `viewport={{ once: true }}` by default
4. Don't use `will-change` permanently — apply only during animation if needed
5. Wrap all hover animations in `@media (hover: hover)`

## Reduced Motion Implementation

```tsx
const prefersReducedMotion = useReducedMotion(); // from motion/react

if (prefersReducedMotion) {
  return <div className={className}>{children}</div>;
}
```

## Dependencies

- `motion` (Framer Motion v12) — primary animation library
- `@studio-freight/lenis` — smooth scroll (for `SmoothScrollProvider`)
- Project scaffold (1.1) — all packages installed

## Acceptance Criteria

1. `FadeIn` animates children from transparent to opaque with directional translate
2. `FadeIn` triggers on viewport entry (not on mount, except above-the-fold)
3. `StaggerChildren` delays each child's entrance by `staggerDelay`
4. `TextReveal` splits text and reveals word-by-word (or char-by-char)
5. `Parallax` creates scroll-linked vertical offset on children
6. `SmoothScrollProvider` enables Lenis smooth scrolling globally
7. `PageTransition` animates page enter/exit on route change
8. ALL components return plain `<div>` (no animation) when `prefers-reduced-motion` is active
9. All animations use only `transform` and `opacity` (no layout properties)
10. `viewport={{ once: true }}` is default — animations don't replay on re-scroll
11. Custom easing `[0.21, 0.47, 0.32, 0.98]` used consistently across components
12. Each component accepts `className` prop for external styling
