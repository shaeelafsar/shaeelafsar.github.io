# Shaeel Afsar — Design System

## Design Direction

- **Mood:** cinematic, minimal, technical, calm confidence
- **Visual language:** bold type, restrained blue accent, soft glass surfaces, subtle grain, high whitespace
- **Interaction rule:** animate only `transform` and `opacity`; color changes may transition softly

## Tailwind + CSS Token Strategy

Use CSS custom properties in `app/globals.css`, then alias them into Tailwind v4 tokens with `@theme inline`.

```css
:root {
  --color-bg: #fafafa;
  --color-bg-secondary: #f1f5f9;
  --color-surface: rgba(255, 255, 255, 0.72);
  --color-surface-strong: rgba(255, 255, 255, 0.9);
  --color-card: #ffffff;
  --color-card-muted: #f8fafc;
  --color-text: #171717;
  --color-text-secondary: #525252;
  --color-text-tertiary: #737373;
  --color-border: #e5e7eb;
  --color-border-strong: #d4d4d8;
  --color-primary: #171717;
  --color-secondary: #475569;
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --color-accent-soft: rgba(37, 99, 235, 0.12);
  --color-accent-glow: rgba(37, 99, 235, 0.22);
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-error: #b91c1c;
  --color-info: #0369a1;
  --color-selection: rgba(37, 99, 235, 0.16);
}

.dark {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #171717;
  --color-surface: rgba(23, 23, 23, 0.72);
  --color-surface-strong: rgba(20, 20, 20, 0.9);
  --color-card: #141414;
  --color-card-muted: #101826;
  --color-text: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary: #737373;
  --color-border: #262626;
  --color-border-strong: #3f3f46;
  --color-primary: #fafafa;
  --color-secondary: #cbd5e1;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-accent-soft: rgba(59, 130, 246, 0.16);
  --color-accent-glow: rgba(96, 165, 250, 0.24);
  --color-success: #4ade80;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-info: #38bdf8;
  --color-selection: rgba(59, 130, 246, 0.24);
}
```

```css
@theme inline {
  --color-background: var(--color-bg);
  --color-background-secondary: var(--color-bg-secondary);
  --color-surface: var(--color-surface);
  --color-card: var(--color-card);
  --color-foreground: var(--color-text);
  --color-muted-foreground: var(--color-text-secondary);
  --color-border: var(--color-border);
  --color-accent: var(--color-accent);
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

## Color Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg` | `#fafafa` | `#0a0a0a` | App background |
| `--color-bg-secondary` | `#f1f5f9` | `#171717` | Alternating sections |
| `--color-surface` | `rgba(255,255,255,0.72)` | `rgba(23,23,23,0.72)` | Header/mobile menu glass |
| `--color-surface-strong` | `rgba(255,255,255,0.9)` | `rgba(20,20,20,0.9)` | Modal/panel surfaces |
| `--color-card` | `#ffffff` | `#141414` | Cards |
| `--color-card-muted` | `#f8fafc` | `#101826` | Code/callout surfaces |
| `--color-text` | `#171717` | `#fafafa` | Primary text |
| `--color-text-secondary` | `#525252` | `#a3a3a3` | Supporting text |
| `--color-text-tertiary` | `#737373` | `#737373` | Eyebrows/meta |
| `--color-border` | `#e5e7eb` | `#262626` | Standard borders |
| `--color-border-strong` | `#d4d4d8` | `#3f3f46` | Hover/focus border state |
| `--color-primary` | `#171717` | `#fafafa` | High-contrast fills/text |
| `--color-secondary` | `#475569` | `#cbd5e1` | Quiet utility text |
| `--color-accent` | `#2563eb` | `#3b82f6` | Links, progress, active states |
| `--color-accent-hover` | `#1d4ed8` | `#60a5fa` | Hover state |
| `--color-accent-soft` | `rgba(37,99,235,0.12)` | `rgba(59,130,246,0.16)` | Pills, selection, subtle fills |
| `--color-accent-glow` | `rgba(37,99,235,0.22)` | `rgba(96,165,250,0.24)` | Gradient halos |
| `--color-success` | `#15803d` | `#4ade80` | Success states |
| `--color-warning` | `#b45309` | `#fbbf24` | Warning states |
| `--color-error` | `#b91c1c` | `#f87171` | Error states |
| `--color-info` | `#0369a1` | `#38bdf8` | Info/callouts |

### Gradient + texture usage

- **Hero glow:** `radial-gradient(circle at 70% 20%, var(--color-accent-glow), transparent 45%)`
- **CTA wash:** accent-to-accent-hover linear gradient at low angle
- **Grain overlay:** monochrome noise layer at `opacity: 0.03` light / `0.05` dark
- **Glass border:** `1px solid color-mix(in srgb, var(--color-border) 65%, transparent)`

## Typography

### Font stack (`next/font`)

- **Display / headings:** `Space_Grotesk` variable → `--font-display`
- **Body / UI:** `Inter` variable → `--font-sans`
- **Code / metadata:** `JetBrains_Mono` variable → `--font-mono`

### Hierarchy rules

- Headlines feel editorial: tighter tracking, stronger weight, shorter measure
- Body copy stays highly readable: `65-72ch` max for long-form text
- Metadata and tags use mono sparingly for technical flavor

### Fluid type scale

| Token | Clamp | Use |
|---|---|---|
| `--text-display-xl` | `clamp(3.5rem, 8vw, 7.5rem)` | Home hero name |
| `--text-display-lg` | `clamp(2.75rem, 6vw, 5rem)` | Page hero h1 |
| `--text-h1` | `clamp(2.25rem, 4vw, 3.75rem)` | About/Resume/Contact h1 |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.75rem)` | Section headings |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles/subsections |
| `--text-body-lg` | `clamp(1.125rem, 1.3vw, 1.375rem)` | Hero subtitle/intros |
| `--text-body` | `clamp(1rem, 1vw, 1.125rem)` | Body copy |
| `--text-body-sm` | `clamp(0.9375rem, 0.9vw, 1rem)` | Supporting text |
| `--text-meta` | `clamp(0.75rem, 0.7vw, 0.875rem)` | Labels, dates, tags |

### Weights + leading

| Role | Font | Weight | Line-height |
|---|---|---|---|
| Display | `var(--font-display)` | 600-700 | `0.95-1.02` |
| Section heading | `var(--font-display)` | 600 | `1.05-1.1` |
| Body intro | `var(--font-sans)` | 400-500 | `1.45` |
| Body copy | `var(--font-sans)` | 400 | `1.6-1.75` |
| Labels/meta | `var(--font-mono)` or `var(--font-sans)` | 500 | `1.4` |

## Spacing Scale

Use an 8pt rhythm with a few editorial steps.

| Token | Value | Tailwind fit |
|---|---|---|
| `--space-2` | `0.5rem` | `2` |
| `--space-3` | `0.75rem` | `3` |
| `--space-4` | `1rem` | `4` |
| `--space-6` | `1.5rem` | `6` |
| `--space-8` | `2rem` | `8` |
| `--space-10` | `2.5rem` | `10` |
| `--space-12` | `3rem` | `12` |
| `--space-16` | `4rem` | `16` |
| `--space-20` | `5rem` | `20` |
| `--space-24` | `6rem` | `24` |
| `--space-32` | `8rem` | `32` |
| `--space-40` | `10rem` | `40` |

### Layout rhythm

- `Section`: `py-24 md:py-32 lg:py-40`
- Hero internal stack: `gap-6 md:gap-8`
- Card internal padding: `p-6 md:p-8`
- Grid gaps: `gap-6 md:gap-8 lg:gap-10`
- Sticky header offset for anchors: `scroll-mt-24`

## Component Tokens

### Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.75rem` | Badges, inputs |
| `--radius-md` | `1rem` | Buttons, callouts |
| `--radius-lg` | `1.5rem` | Cards, images |
| `--radius-xl` | `2rem` | Hero media, CTA surfaces |
| `--radius-pill` | `999px` | Filter pills |

### Shadows

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--shadow-sm` | `0 10px 30px -18px rgba(15,23,42,0.16)` | `0 10px 30px -18px rgba(0,0,0,0.45)` | Buttons/floating UI |
| `--shadow-md` | `0 20px 50px -24px rgba(15,23,42,0.18)` | `0 20px 50px -24px rgba(0,0,0,0.55)` | Cards |
| `--shadow-lg` | `0 30px 80px -32px rgba(15,23,42,0.22)` | `0 30px 80px -32px rgba(0,0,0,0.62)` | Hero image / CTA spotlight |
| `--shadow-focus` | `0 0 0 3px var(--color-accent-soft)` | same | Focus ring halo |

### Surface + blur

- `--backdrop-blur-sm: 12px`
- `--backdrop-blur-md: 18px`
- `--backdrop-blur-lg: 24px`
- Header uses `backdrop-blur-md`
- Mobile menu and glass cards use `backdrop-blur-lg`

### Transition tokens

| Token | Value | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.21, 0.47, 0.32, 0.98)` | Section entrances |
| `--ease-snappy` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Hover/UI transitions |
| `--duration-micro` | `150ms` | Buttons, icon taps |
| `--duration-ui` | `300ms` | Nav underline, theme, panels |
| `--duration-enter` | `600ms` | Section reveals |
| `--duration-slow` | `900ms` | Hero ambient motion |

## Component Styling Guidance

### Header / nav

- Fixed glass bar with border-bottom using `--color-border`
- Active nav uses accent underline and high-contrast text
- Scrolled state gets stronger surface opacity and blur

### Buttons

- Primary: accent fill + white text
- Secondary: `--color-bg-secondary` fill
- Outline: transparent + border
- Ghost: transparent, text-led, used for tertiary actions
- Buttons should feel dense and premium, never oversized and bubbly

### Cards

- Use `--color-card` background, `--radius-lg`, `--shadow-md`
- Border always visible; shadow is subtle until hover
- Media corners match card corners; image zoom stays clipped inside container

### Forms

- Inputs use `--color-card` / `--color-surface-strong`
- Border default `--color-border`, focus `--color-accent`
- Placeholder uses `--color-text-tertiary`

### Long-form content

- MDX body max width: `72ch`
- TOC width: `250px`
- Code blocks use `--color-card-muted`
- Callouts map to semantic colors with soft tinted backgrounds, not saturated fills

## Animation Choreography Standards

### Global timing

| Pattern | Duration | Notes |
|---|---|---|
| TextReveal word stagger | `0.08s` | Hero and key h1 moments |
| FadeIn default | `0.6s` | `y: 32-40px` |
| Stagger children | `0.1s` | Cards, badges, form fields |
| Page enter | `0.3s` | View Transition / AnimatePresence fallback |
| Page exit | `0.2s` | Slight upward drift |
| Hover lift | `0.15-0.3s` | CSS only |
| Parallax drift | scroll-linked | max ±48px desktop |

### Scroll trigger thresholds

- Standard reveal viewport margin: `-80px`
- Section triggers when content enters top 70-75% of viewport
- Sticky TOC observes headings with `rootMargin: -80px 0px -60% 0px`
- Resume timeline reveals one card at a time with alternating direction
- Hero accents/parallax disabled on mobile and reduced motion

### Allowed motion vocabulary

- `opacity`
- `translateY`
- `translateX`
- `scale`
- `rotate` only for tiny icon swaps, never for core content

## Dark Mode Strategy

### Mapping approach

- Keep **structure** identical across modes; only tokens swap
- Dark mode is not inverted light mode; it uses denser surfaces and brighter accent
- Maintain constant hierarchy:
  - background < secondary background < card < surface overlay
  - tertiary text < secondary text < primary text
  - accent soft < accent < accent hover

### Per-surface behavior

| Surface | Light mode | Dark mode |
|---|---|---|
| Page background | airy off-white | near-black neutral |
| Secondary sections | cool mist | charcoal |
| Card | white | graphite |
| Glass overlay | white transparency | soot transparency |
| Border | cool gray | muted charcoal |
| Shadows | soft navy-gray | deep black |

### Content-specific notes

- Hero gradients stay subtle in both modes; only glow intensity shifts slightly higher in dark mode
- CTA section can stay accent-led in both themes; copy remains white with 80% secondary white text
- Images should receive a very subtle overlay in dark mode only when needed for text contrast
- Code blocks should use dual Shiki themes: `github-light` + `github-dark`

## Shared Art Direction Notes

- **Home:** big-name hero, restrained glow accents, asymmetrical about teaser
- **Projects:** rigid grid with generous gutters; tags feel like technical metadata
- **Blog:** editorial; more white space, narrow reading column, precise TOC rail
- **Resume:** timeline feels architectural, not infographic-heavy
- **Contact:** calm, conversational, high-trust form layout with visible social proof
