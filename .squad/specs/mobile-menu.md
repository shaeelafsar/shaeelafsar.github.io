# Spec: Mobile Menu

> **Component:** `components/layout/mobile-menu.tsx` · **Owner:** Rachael (impl) + Pris (animation)

---

## Purpose

Full-screen overlay navigation menu for mobile/tablet viewports. Triggered by a hamburger button in the header. Provides access to all navigation links in a large, touch-friendly format.

## Component Type

**Client Component** — requires `useState`, `useEffect`, focus trap, animation.

## Props / Interfaces

```ts
interface MobileMenuProps {
  // No props — uses same navLinks constant as desktop Nav
}

interface MobileMenuTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}
```

## Implementation Details

### Architecture

Two components:
1. **`MobileMenuTrigger`** — hamburger/X button (always visible on mobile)
2. **`MobileMenu`** — full-screen overlay (renders conditionally)

Both are Client Components. The parent (`Header`) manages `isOpen` state.

### Menu Trigger (Hamburger)

Animated hamburger → X transformation:
- Three horizontal bars that morph to an X on open
- Use `motion.span` for each bar with animated `rotate` + `translateY`

### Menu Overlay

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      className="fixed inset-0 z-40 bg-[var(--color-bg)] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav aria-label="Mobile navigation">
        <motion.ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            >
              <Link href={link.href} onClick={close} className="text-3xl font-medium">
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.div>
  )}
</AnimatePresence>
```

### Navigation Links

Same list as desktop nav:
```ts
const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];
```

### Behavior

- **Open:** Hamburger click → menu slides in, body scroll locked
- **Close on:** link click, X button click, Escape key
- **Body scroll lock:** Set `overflow: hidden` on `<body>` when open, remove on close
- **Focus trap:** Focus cycles within menu when open (first focus on close button)
- **Route change:** Close menu on Next.js route change (listen to `usePathname`)

---

## Animation Requirements

| Element | Animation | Timing |
|---------|-----------|--------|
| Overlay background | Fade in/out | 300ms, ease |
| Nav links | Stagger fade-up | 50ms stagger, 400ms each, starts after 100ms |
| Hamburger → X | Bar rotation/translation | 300ms, cubic-bezier(0.4, 0, 0.2, 1) |
| Exit | Fade out (reverse) | 200ms |

**Pris:** Keep animations snappy — users want to navigate, not watch animations. Total entrance sequence < 500ms.

## Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Mobile/Tablet (`< lg`) | Menu is available, hamburger visible |
| Desktop (`lg+`) | Menu hidden, hamburger hidden, desktop nav visible instead |

## Accessibility

- `aria-expanded` on hamburger button reflects open state
- `aria-label="Open menu"` / `"Close menu"` on trigger
- `aria-label="Mobile navigation"` on the `<nav>` inside overlay
- Focus trap: Tab cycles through links + close button only
- Escape key closes menu
- All links are large touch targets (minimum 48px height)
- Announce menu open/close to screen readers via `aria-live` region or focus management

## Dependencies

- Layout components (1.4) — Header provides the container
- Animation primitives (1.7) — Framer Motion `AnimatePresence`
- Theme toggle should remain accessible while menu is open

## Acceptance Criteria

1. Hamburger button visible only on `< lg` breakpoints
2. Menu opens with full-screen overlay on click
3. All 5 navigation links are present and link to correct routes
4. Clicking a link closes the menu and navigates to the page
5. Escape key closes the menu
6. Body scroll is prevented while menu is open
7. Focus is trapped inside menu when open
8. Focus returns to hamburger button when menu closes
9. Hamburger animates to X and back smoothly
10. Links stagger in sequentially
11. `prefers-reduced-motion: reduce` shows instant open/close (no stagger)
12. Menu closes on route change (programmatic navigation)
