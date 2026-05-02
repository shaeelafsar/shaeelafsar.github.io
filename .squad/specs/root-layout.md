# Spec: Root Layout & Global Styles

> **Files:** `app/layout.tsx`, `app/globals.css` · **Owner:** Rachael

---

## Purpose

The root layout wraps every page. It provides: font loading, theme initialization (FOUC prevention), smooth scroll provider, header/footer, and global CSS custom properties. This is work item 1.2.

## Component Type

- **`app/layout.tsx`**: Server Component (default export)
- Wraps children with Client Components: `SmoothScrollProvider`, `PageTransition`

## Props / Interfaces

```ts
// Standard Next.js layout signature
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element;
```

## Implementation Details

### `app/layout.tsx`

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/animation/smooth-scroll';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shaeelafsar.com'),
  title: {
    default: 'Shaeel Afsar',
    template: '%s — Shaeel Afsar',
  },
  description: 'Personal website of Shaeel Afsar — developer, builder.',
  openGraph: { ... },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline script to prevent FOUC — sets dark class before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
      </head>
      <body className="font-sans bg-[var(--color-bg)] text-[var(--color-text)] antialiased transition-colors duration-300">
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### `app/globals.css`

```css
@import 'tailwindcss';

/* Color tokens — Light mode */
:root {
  --color-bg: #fafafa;
  --color-bg-secondary: #f0f0f0;
  --color-text: #171717;
  --color-text-secondary: #525252;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --color-border: #e5e5e5;
  --color-card: #ffffff;
}

/* Color tokens — Dark mode */
.dark {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #171717;
  --color-text: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-border: #262626;
  --color-card: #141414;
}

/* Fluid typography scale */
:root {
  --font-size-display: clamp(3rem, 8vw, 6rem);
  --font-size-xl: clamp(2rem, 4vw, 3.5rem);
  --font-size-lg: clamp(1.5rem, 3vw, 2.5rem);
  --font-size-md: clamp(1.25rem, 2vw, 1.75rem);
  --font-size-sm: clamp(1rem, 1.5vw, 1.125rem);
  --font-size-body: clamp(0.875rem, 1vw, 1rem);
}

/* Base styles */
html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  min-height: 100dvh;
}

/* Skip-to-content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  z-index: 100;
  background: var(--color-accent);
  color: white;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 0;
}

/* Selection color */
::selection {
  background-color: var(--color-accent);
  color: white;
}
```

### Font Decision

- **Sans-serif:** Inter Variable (via `next/font/google`) — clean, professional, highly legible
- **Monospace:** JetBrains Mono (for code blocks) — ligatures, clear distinction from body text
- Both loaded as CSS variables and applied via Tailwind's `font-sans` / `font-mono`

### Theme Script Placement

The inline `<script>` in `<head>` runs synchronously before first paint. It checks:
1. `localStorage.getItem('theme')` — explicit user preference
2. `window.matchMedia('(prefers-color-scheme: dark)')` — system preference
3. Applies `dark` class to `<html>` if needed

This prevents the "flash of wrong theme" (FOUC) on page load.

---

## Responsive Behavior

The layout itself is full-width. Responsive behavior is handled by child components (Header, pages). The `<main>` has no width constraints — pages apply their own `Container`.

## Accessibility

- `lang="en"` on `<html>`
- Skip-to-content link (targets `#main-content`)
- `suppressHydrationWarning` on `<html>` (because the theme script modifies classList before hydration)
- Semantic `<main>` landmark
- `antialiased` text rendering for readability

## Animation Requirements

- `transition-colors duration-300` on `<body>` for smooth theme transitions
- `SmoothScrollProvider` wraps all content for Lenis smooth scroll

## Dependencies

- Work item 1.1 (project scaffold) — needs all deps installed
- `SmoothScrollProvider` from animation primitives (1.7)
- `Header` and `Footer` from layout components (1.4)

## Acceptance Criteria

1. Fonts load without CLS (verified via Lighthouse)
2. Dark mode applies instantly on page load — no flash of light theme
3. Color tokens change smoothly (300ms) on theme toggle
4. Skip-to-content link is visible on focus and jumps to `<main>`
5. `<html>` has correct `lang` attribute
6. Default metadata (title, description, OG) renders in `<head>`
7. Title template works (`"Page Name — Shaeel Afsar"`)
8. Smooth scrolling via Lenis is active on all pages
9. Header and footer render on all pages
10. Body has no horizontal overflow at any viewport width
