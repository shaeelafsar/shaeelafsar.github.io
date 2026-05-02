# Spec: Layout Components

> **Components:** `components/layout/*.tsx` · **Owner:** Rachael

---

## `Header` (`header.tsx`)

**Type:** Server Component shell + Client interactivity

Sticky header that reacts to scroll direction (hide on scroll down, show on scroll up). Contains navigation, theme toggle, and mobile menu trigger.

```ts
// No props — singleton layout component
```

**Structure:**
```
<header className="fixed top-0 w-full z-50">
  <Container className="flex items-center justify-between h-16 md:h-20">
    <Logo />                    <!-- Link to / -->
    <Nav />                     <!-- Desktop nav links (hidden on mobile) -->
    <div className="flex items-center gap-4">
      <ThemeToggle />           <!-- Dark/light toggle -->
      <MobileMenuTrigger />     <!-- Hamburger (visible on mobile only) -->
    </div>
  </Container>
</header>
```

**Scroll behavior (Client wrapper):** Use `useScroll` + `useMotionValueEvent` to track scroll direction. Apply `translate-y: -100%` to hide, `0` to show. Add `backdrop-blur` + semi-transparent background after scrolling past hero.

**Responsive:**
- Mobile: Logo + theme toggle + hamburger
- Desktop: Logo + full nav + theme toggle

---

## `Nav` (`nav.tsx`)

**Type:** Server Component

Horizontal nav links for desktop.

```ts
const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];
```

Active link styling based on current pathname (use `usePathname()` — requires Client Component wrapper or pass pathname from layout).

**Decision:** Make a thin Client Component `NavLinks` that wraps `usePathname()` and renders the `<nav>` with active states.

---

## `MobileMenu` (`mobile-menu.tsx`)

**Type:** Client Component

Full-screen overlay menu for mobile. Triggered by hamburger button in header.

**Animation:** Slide in from right (or full-screen fade) using Framer Motion `AnimatePresence`. Links stagger in.

**Behavior:**
- Trap focus inside menu when open
- Close on link click, escape key, or overlay click
- Prevent body scroll when open (`overflow: hidden` on `<body>`)

---

## `ThemeToggle` (`theme-toggle.tsx`)

**Type:** Client Component

Toggle between light and dark mode.

**Implementation:**
1. On mount: check `localStorage` for saved preference, fallback to `prefers-color-scheme`
2. Toggle: add/remove `dark` class on `<html>`, save to `localStorage`
3. Icon: Sun/Moon with crossfade animation
4. Prevent flash: inline `<script>` in `layout.tsx` `<head>` to set `dark` class before paint

---

## `Footer` (`footer.tsx`)

**Type:** Server Component

Site footer with:
- Social links (GitHub, LinkedIn, Twitter/X, email)
- Copyright line
- Optional "Built with Next.js" credit

**Structure:**
```
<footer className="border-t border-[var(--color-border)]">
  <Container className="py-12 md:py-16">
    <div>Social icons</div>
    <p>© 2026 Shaeel Afsar</p>
  </Container>
</footer>
```

---

## Dependencies

- UI components (1.3) — `Container`, `Button`
- Animation primitives (1.7) — Framer Motion for scroll behavior, mobile menu, theme toggle
- `next/link` for navigation links
- `next/navigation` — `usePathname()` for active state

## Accessibility

- `<header>` landmark for the header
- `<nav>` with `aria-label="Main navigation"` for desktop nav
- `<footer>` landmark for the footer
- Skip-to-content link is the first focusable element
- Mobile menu: focus trap, `aria-expanded`, `aria-label` (see mobile-menu spec)
- Theme toggle: `aria-label` with dynamic text (see theme-toggle spec)
- All nav links are keyboard-accessible
- Active link has `aria-current="page"`

## Acceptance Criteria

1. Header renders on all pages with logo, nav, theme toggle
2. Header hides on scroll down, shows on scroll up (desktop)
3. Header gains `backdrop-blur` background after scrolling past hero
4. Desktop nav shows all 5 links with active state highlighting
5. Mobile: hamburger visible, desktop nav hidden (below `lg`)
6. Desktop: hamburger hidden, full nav visible (at `lg+`)
7. Footer renders on all pages with social links and copyright
8. Footer social icons link to correct external URLs
9. Logo links back to `/`
10. Active nav link is visually distinct and has `aria-current="page"`
11. All layout components use CSS custom properties (theme-aware)
12. `prefers-reduced-motion`: header scroll-hide behavior is instant (no transition)
