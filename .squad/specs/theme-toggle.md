# Spec: Theme Toggle

> **Component:** `components/layout/theme-toggle.tsx` · **Owner:** Rachael

---

## Purpose

Allows users to switch between light and dark themes. Persists preference in `localStorage`. Respects system preference as default. Provides animated icon transition.

## Component Type

**Client Component** — requires `useState`, `useEffect`, browser APIs (`localStorage`, `matchMedia`).

## Props / Interfaces

```ts
interface ThemeToggleProps {
  className?: string;
}
```

## Implementation Details

### State Machine

```
States: 'light' | 'dark'
Transitions:
  - User clicks toggle → switch to opposite state
  - Initial mount → read from localStorage or system preference
```

### Logic

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  }

  // Don't render until mounted (avoids hydration mismatch)
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      className={cn("relative w-9 h-9 rounded-full flex items-center justify-center", className)}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? <SunIcon key="sun" /> : <MoonIcon key="moon" />}
      </AnimatePresence>
    </button>
  );
}
```

### Icon Animation

Icons crossfade with a subtle scale + rotate:
- Exit: `opacity: 0, scale: 0.5, rotate: -90` (duration: 0.15s)
- Enter: `opacity: 1, scale: 1, rotate: 0` (duration: 0.2s)

### Icons

Inline SVGs (not an icon library). Sun icon: circle with rays. Moon icon: crescent. Keep them simple — 24x24 viewBox.

### Hydration Safety

- Render a placeholder `<div>` with matching dimensions until `mounted` is true
- This prevents hydration mismatch since server doesn't know the theme

---

## Animation Requirements

| Element | Animation | Timing |
|---------|-----------|--------|
| Icon swap | `AnimatePresence` crossfade + scale + rotate | 0.15s exit, 0.2s enter |
| Button hover | Subtle `background-color` transition | CSS `transition 150ms` |
| Reduced motion | Instant swap, no rotation/scale | Disable motion variants |

## Responsive Behavior

- Same size at all breakpoints (44x44 touch target minimum for mobile)
- Positioned in header, right side

## Accessibility

- `aria-label` updates dynamically: "Switch to light mode" / "Switch to dark mode"
- `role="button"` implicit from `<button>` element
- Keyboard accessible: focusable, activates on Enter/Space
- Visible focus ring on keyboard focus
- 44x44px minimum touch target

## Dependencies

- Root layout (1.2) — needs the FOUC-prevention inline script in place
- `motion` package installed (1.1)

## Acceptance Criteria

1. Clicking toggle switches between light and dark mode instantly
2. Theme persists across page reloads (via `localStorage`)
3. First visit respects `prefers-color-scheme` system setting
4. No FOUC — theme is correct on first paint
5. No hydration mismatch errors in console
6. Icon animates smoothly between sun and moon
7. `prefers-reduced-motion: reduce` disables icon animation
8. Button has visible focus ring for keyboard users
9. Touch target is at least 44x44px
10. `aria-label` correctly reflects the action (not current state)
