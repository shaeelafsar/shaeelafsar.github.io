# Spec: Reduced Motion Support

> **Scope:** Cross-cutting — all animation components · **Owner:** Pris

---

## Purpose

Ensure the site is fully usable and accessible when `prefers-reduced-motion: reduce` is active. All animations must degrade gracefully — content remains accessible, layout is unchanged, only motion is removed.

## Component Type

N/A — cross-cutting implementation pattern applied to all Client Components with animation.

## Implementation Details

### Detection

```tsx
// In every animation component
import { useReducedMotion } from 'motion/react';

const prefersReducedMotion = useReducedMotion();
```

### Pattern: Animation Component Bypass

Every animation wrapper component must check `prefers-reduced-motion` and render children without animation:

```tsx
export function FadeIn({ children, className, ...props }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* ... */
    >
      {children}
    </motion.div>
  );
}
```

### Components to Update

| Component | File | Reduced Motion Behavior |
|-----------|------|------------------------|
| `FadeIn` | `components/animation/fade-in.tsx` | Render children in plain `<div>`, no animation |
| `StaggerChildren` | `components/animation/stagger-children.tsx` | Render children without stagger, all visible immediately |
| `TextReveal` | `components/animation/text-reveal.tsx` | Render text normally (no split, no reveal) |
| `Parallax` | `components/animation/parallax.tsx` | Render children without scroll offset |
| `PageTransition` | `components/animation/page-transition.tsx` | Render children without enter/exit animation |
| `SmoothScrollProvider` | `components/animation/smooth-scroll.tsx` | Disable Lenis, use native scroll |
| `ReadingProgress` | `components/blog/reading-progress.tsx` | Show progress bar without spring (raw scroll binding) |
| `ThemeToggle` | `components/layout/theme-toggle.tsx` | Instant icon swap, no rotate/scale |
| `MobileMenu` | `components/layout/mobile-menu.tsx` | Instant open/close, no slide/stagger |
| `Header` | `components/layout/header.tsx` | No scroll-hide animation, always visible |

### CSS-Based Reductions

In addition to JS-level checks, add global CSS:

```css
/* In globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This catches any CSS animations or transitions that don't go through Framer Motion.

### Lenis Smooth Scroll

When reduced motion is preferred, disable Lenis entirely:

```tsx
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return; // Don't init Lenis

    const lenis = new Lenis({ /* config */ });
    // ... RAF loop
    return () => lenis.destroy();
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
```

### What Still Shows (Reduced ≠ None)

- **Reading progress bar** — still visible, just without spring physics
- **Theme toggle icon** — still changes, just instantly
- **Active states** — nav underline, TOC highlight still present (CSS-only, not motion)
- **Hover color changes** — still occur (color is not motion)
- **Content** — everything is visible immediately, nothing hidden behind animations

---

## Testing

### Manual Testing

1. Enable "Reduce motion" in OS settings
   - macOS: System Settings → Accessibility → Display → Reduce Motion
   - Windows: Settings → Accessibility → Visual Effects → Animation Effects (off)
2. Navigate all pages
3. Verify no animation occurs
4. Verify all content is visible and accessible
5. Verify no layout shifts (content not depending on animation for positioning)

### Automated Testing

Roy can use Playwright to test with reduced motion preference:

```ts
// In Playwright test
test.use({
  reducedMotion: 'reduce',
});

test('all content visible with reduced motion', async ({ page }) => {
  await page.goto('/');
  // All sections should be immediately visible
  await expect(page.getByRole('heading', { name: /Shaeel/i })).toBeVisible();
});
```

---

## Responsive Behavior

Reduced motion behavior is independent of viewport size. Applies equally at all breakpoints.

## Accessibility

This IS the accessibility feature. It ensures users who are sensitive to motion (vestibular disorders, motion sickness, seizure disorders) can use the site comfortably.

## Dependencies

- All animation components (1.7) must be built first
- Phase 4 polish animations (4.2-4.5) must be in place to audit

## Acceptance Criteria

1. `prefers-reduced-motion: reduce` disables ALL Framer Motion animations
2. `prefers-reduced-motion: reduce` disables ALL CSS animations/transitions via global rule
3. Lenis smooth scrolling is disabled — native scroll used instead
4. All content is immediately visible (no content hidden behind animation triggers)
5. Page transitions are instant (no fade/slide)
6. TextReveal renders as plain text (no split, no animation)
7. Reading progress bar still shows progress (without spring physics)
8. No layout differences between animated and reduced-motion versions
9. Theme toggle still functions (instant swap)
10. Playwright tests pass with `reducedMotion: 'reduce'` — all content visible
