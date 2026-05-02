# Spec: UI Design System Components

> **Components:** `components/ui/*.tsx` · **Owner:** Rachael

All UI components are **Server Components** unless noted. They are pure presentational — no state, no side effects.

---

## `Button` (`button.tsx`)

```ts
interface ButtonProps {
  children: React.ReactNode;
  href?: string;                          // If provided, renders as <Link>
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;                   // Makes it Client Component when used
}
```

- Primary: solid accent background, white text
- Secondary: muted background
- Outline: border only, transparent bg
- Ghost: no border, no bg, text only
- All sizes use `transform` scale on hover (via CSS `hover:scale-[1.02]`)

---

## `Badge` (`badge.tsx`)

```ts
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}
```

Small pill for tags/categories. Uses `--color-bg-secondary` background by default.

---

## `Card` (`card.tsx`)

```ts
interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;                    // If provided, entire card is clickable
  hover?: boolean;                  // Enable hover lift effect, default: true
}
```

Rounded container with border, background `--color-card`. Hover: subtle `scale(1.01)` + shadow increase.

---

## `Section` (`section.tsx`)

```ts
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;                      // For anchor links
}
```

Full-width section with consistent vertical padding: `py-24 md:py-32 lg:py-40`.

---

## `Container` (`container.tsx`)

```ts
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}
```

- `default`: `max-w-7xl mx-auto px-6 md:px-8`
- `narrow`: `max-w-3xl` (for blog post body)
- `wide`: `max-w-[90rem]` (for full-bleed grids)

---

## `Heading` (`heading.tsx`)

```ts
interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm';
  className?: string;
}
```

Maps to typography scale from architecture. Uses `clamp()` for fluid sizing. Renders semantic heading element.

---

## `OptimizedImage` (`image.tsx`)

```ts
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}
```

Thin wrapper around `next/image`. Adds:
- Blur placeholder (auto-generated or provided)
- Rounded corners consistent with design system
- Responsive `sizes` default: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`

---

## Utility: `cn()` (`lib/utils.ts`)

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Used by all components for conditional class merging.

---

## Dependencies

- `clsx` and `tailwind-merge` packages (1.1)
- `next/image` for `OptimizedImage`
- `next/link` for `Button` with `href`
- CSS custom properties from `globals.css` (1.2)

## Accessibility

- `Button`: uses native `<button>` or `<a>` (semantic HTML)
- `Button` with `disabled`: has `aria-disabled="true"` and prevents interaction
- `Heading`: renders correct semantic heading level (`h1`–`h4`)
- `OptimizedImage`: requires `alt` prop (enforced by TypeScript)
- `Card` with `href`: entire card is a single `<a>` (not nested links)
- All interactive elements have visible focus ring (`:focus-visible`)

## Acceptance Criteria

1. All components render correctly as Server Components (no `'use client'` needed)
2. `Button` renders as `<a>` when `href` provided, `<button>` otherwise
3. `Button` displays all 4 variants with distinct visual styles
4. `Button` sizes (`sm`, `md`, `lg`) have appropriate padding and font sizes
5. `Card` shows hover effect (scale + shadow) when `hover` is true
6. `Card` wraps in `<a>` when `href` provided (whole card clickable)
7. `Section` provides consistent vertical spacing (`py-24 md:py-32 lg:py-40`)
8. `Container` constrains width correctly for all 3 sizes
9. `Heading` uses fluid `clamp()` sizing for all size variants
10. `OptimizedImage` renders `next/image` with blur placeholder and responsive `sizes`
11. All components pass `className` through via `cn()` for override support
12. All components use CSS custom properties (no hard-coded colors)
13. Dark mode: all components look correct without additional props
