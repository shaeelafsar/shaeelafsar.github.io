# Spec: Hover Micro-Interactions

> **Scope:** Cross-cutting — applies to `components/ui/card.tsx`, `components/ui/button.tsx`, `components/layout/nav.tsx` · **Owner:** Pris

---

## Purpose

Subtle hover interactions that add polish and responsiveness to the UI. Applied to interactive elements (cards, buttons, nav links). Must feel effortless — enhance, not distract.

## Component Type

Mixed — some via CSS (on Server Components), some via Framer Motion (on Client Components).

**Rule:** Prefer CSS transitions over Framer Motion for hover states. CSS is more performant and doesn't require Client Components.

## Implementation Details

### 1. Project/Blog Cards — Scale + Shadow Lift

**Target:** `components/ui/card.tsx` (when `hover` prop is true)

```css
.card-hover {
  transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
}

@media (hover: hover) {
  .card-hover:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
  }
  .dark .card-hover:hover {
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
  }
}
```

**Key details:**
- `scale(1.02)` — subtle, not bouncy
- Shadow increases — creates depth/lift illusion
- Dark mode: deeper shadow (higher opacity)
- `@media (hover: hover)` — only applies on devices with hover capability (not touch)

### 2. Buttons — Scale Pulse

**Target:** `components/ui/button.tsx`

```css
.button-interactive {
  transition: transform 150ms ease, background-color 150ms ease;
}

@media (hover: hover) {
  .button-interactive:hover {
    transform: scale(1.03);
  }
}

.button-interactive:active {
  transform: scale(0.98);
}
```

**Key details:**
- Hover: slight scale up (1.03)
- Active/press: slight scale down (0.98) — tactile "press" feel
- `background-color` transitions for variant color changes

### 3. Navigation Links — Underline Slide

**Target:** `components/layout/nav.tsx` (desktop nav links)

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
}

@media (hover: hover) {
  .nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}

/* Active state */
.nav-link[data-active="true"]::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

**Key details:**
- Underline slides in from left on hover, slides out to right on unhover
- Active link always has underline visible
- Uses `transform: scaleX()` — GPU-accelerated, no layout shift
- Accent color underline

### 4. Social Icons (Footer) — Color + Scale

**Target:** `components/layout/footer.tsx` social links

```css
.social-icon {
  transition: color 200ms ease, transform 200ms ease;
  color: var(--color-text-secondary);
}

@media (hover: hover) {
  .social-icon:hover {
    color: var(--color-accent);
    transform: scale(1.15);
  }
}
```

### 5. Image Hover (Project Cards) — Subtle Zoom

**Target:** Project card cover images

```css
.card-image {
  overflow: hidden;
}

.card-image img {
  transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
}

@media (hover: hover) {
  .card-image:hover img {
    transform: scale(1.05);
  }
}
```

**Key details:**
- Image zooms slightly within its container (overflow hidden clips)
- Slower transition (400ms) for elegance
- Only 5% zoom — subtle

---

## Performance Rules

1. **Only animate `transform` and `opacity`** — never animate `width`, `height`, `margin`, `padding`
2. **`@media (hover: hover)`** on ALL hover effects — prevents sticky hover on touch devices
3. **CSS transitions, not JS animations** — keeps these in Server Components
4. **No `will-change` permanently** — only during active transition if needed
5. **Timing:** 150-400ms range. Faster for buttons (immediate feedback), slower for images (elegance)

## Animation Requirements

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Cards | `transform`, `box-shadow` | 200ms | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Buttons | `transform`, `background-color` | 150ms | ease |
| Nav links | `transform` (scaleX on pseudo) | 300ms | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Social icons | `color`, `transform` | 200ms | ease |
| Card images | `transform` | 400ms | cubic-bezier(0.25, 0.1, 0.25, 1) |

## Responsive Behavior

- All hover effects are disabled on touch devices via `@media (hover: hover)`
- Active/focus states remain for keyboard/touch interaction
- Mobile: no hover effects, but `:active` scale-down still applies on buttons

## Accessibility

- Focus states mirror hover states (visible focus ring + any hover visual)
- `:focus-visible` for keyboard-only focus styling
- No hover effect removes or obscures content
- Animations respect `prefers-reduced-motion` — disable scale/translate, keep color changes

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .card-hover,
  .button-interactive,
  .nav-link::after,
  .social-icon,
  .card-image img {
    transition: none !important;
    transform: none !important;
  }
}
```

## Dependencies

- UI components (1.3) — `Card`, `Button`
- Layout components (1.4) — `Nav`, `Footer`
- Phase 2 pages must be built first to see effects in context

## Acceptance Criteria

1. Cards scale up and gain shadow on hover (desktop only)
2. Buttons scale up on hover and scale down on press
3. Nav links show animated underline on hover
4. Active nav link has persistent underline
5. Social icons change color and scale on hover
6. Project card images zoom subtly on hover
7. All hover effects use `@media (hover: hover)` — no sticky hover on mobile
8. All animations only use `transform` and `opacity` (verify with DevTools)
9. `prefers-reduced-motion: reduce` disables all motion-based hover effects
10. Focus states are visually equivalent to hover states for keyboard users
11. All transitions are 150-400ms (not too fast, not too slow)
