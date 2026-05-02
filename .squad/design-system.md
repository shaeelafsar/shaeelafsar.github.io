# Shaeel Afsar — Design System

## Design Direction

- **Mood:** cinematic, minimal, technical, calm confidence
- **Visual language:** bold type, restrained blue accent, soft glass surfaces, subtle grain, high whitespace
- **Interaction rule:** animate `transform` and `opacity` first; color can transition softly for state change

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

## Breakpoints

| Token | Min width | Usage |
|---|---:|---|
| `sm` | `640px` | spacious mobile / small tablets |
| `md` | `768px` | tablet layouts begin |
| `lg` | `1024px` | compact desktop, sticky rails/filter bars begin |
| `xl` | `1280px` | wide desktop layouts |
| `2xl` | `1536px` | large-display breathing room only |

**Responsive contract:** ambiguous handoff ranges are locked as `<768`, `768-1023`, `1024-1279`, and `1280+`.

## Container + max-width tokens

| Token | Value | Primary usage |
|---|---:|---|
| `--container-narrow` | `72ch` | long-form article / case-study copy |
| `--container-content` | `80rem` | standard page content |
| `--container-wide` | `90rem` | hero and large media sections |
| `--container-full` | `100%` | edge-to-edge accents / backgrounds |

- Default page container: `max-w-[var(--container-content)] mx-auto px-6 md:px-8 xl:px-10`
- Long-form container: `max-w-[var(--container-narrow)]`
- TOC rail width: `250px`

## Z-index layer scale

| Token | Value | Usage |
|---|---:|---|
| `--z-base` | `0` | page content |
| `--z-decorative` | `10` | halos, grains, non-interactive art |
| `--z-header` | `40` | sticky header |
| `--z-mobile-menu` | `50` | mobile menu overlay |
| `--z-reading-progress` | `60` | reading progress above header |
| `--z-toast` | `70` | transient status/toast surfaces |
| `--z-debug` | `80` | QA/debug overlays only |

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
| `--color-accent` | `#2563eb` | `#3b82f6` | Links, progress, active states |
| `--color-accent-hover` | `#1d4ed8` | `#60a5fa` | Hover state |
| `--color-success` | `#15803d` | `#4ade80` | Success states |
| `--color-warning` | `#b45309` | `#fbbf24` | Warning states |
| `--color-error` | `#b91c1c` | `#f87171` | Error states |

## Typography

| Token | Clamp | Use |
|---|---|---|
| `--text-display-xl` | `clamp(3.5rem, 8vw, 7.5rem)` | Home hero name |
| `--text-display-lg` | `clamp(2.75rem, 6vw, 5rem)` | Page hero h1 |
| `--text-h1` | `clamp(2.25rem, 4vw, 3.75rem)` | About/Resume/Contact h1 |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.75rem)` | Section headings |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles/subsections |
| `--text-body-lg` | `clamp(1.125rem, 1.3vw, 1.375rem)` | Hero subtitle/intros |
| `--text-body` | `clamp(1rem, 1vw, 1.125rem)` | Body copy |
| `--text-meta` | `clamp(0.75rem, 0.7vw, 0.875rem)` | Labels, dates, tags |

## Spacing + surface tokens

- Section rhythm: `py-24 md:py-32 lg:py-40`
- Card padding: `p-6 md:p-8`
- Grid gaps: `gap-6 md:gap-8 lg:gap-10`
- Anchor offset: `scroll-mt-24`
- Radius: `sm 0.75rem`, `md 1rem`, `lg 1.5rem`, `xl 2rem`, `pill 999px`
- Shadows: `sm`, `md`, `lg`, `focus`
- Blur: `12px`, `18px`, `24px`

## Motion tokens

| Token | Value | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.21, 0.47, 0.32, 0.98)` | section entrances |
| `--ease-snappy` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | UI transitions |
| `--duration-micro` | `150ms` | buttons, icon taps |
| `--duration-ui` | `300ms` | nav underline, theme, panels |
| `--duration-enter` | `600ms` | section reveals |
| `--duration-slow` | `900ms` | ambient hero motion |

## Interactive state matrix

| Component | Rest | Hover | Focus-visible | Active / Pressed | Disabled / Loading | Selected |
|---|---|---|---|---|---|---|
| Button | base fill/border | raise contrast only on hover-capable devices | shared focus ring recipe | slight scale-down or darker fill | reduced opacity, no hover lift, spinner allowed | n/a |
| Input / textarea | card surface + border | border strengthens slightly | accent ring + stronger border | caret active, no extra animation | muted text, blocked pointer interaction | n/a |
| Nav link | quiet text | accent underline + stronger text | underline + focus ring parity | pressed state keeps underline compact | n/a | current route uses accent text + underline |
| Filter pill | outlined pill | soft accent fill on pointer devices | ring + border parity | pressed state shortens transition | pending disables repeat click | active tag uses selected fill + `aria-pressed` |
| Theme toggle | neutral icon button | soft surface tint | ring visible in both themes | icon swap / pressed tint | loading not used | current theme is exposed by aria label, not color alone |
| Card | card surface + border | slight lift + deeper shadow | outline/ring parity with no hover requirement | pressed links remove lift | disabled cards should not exist in v1 | n/a |

## Focus styling recipe

- Remove browser default outline only when replaced with an equal-or-better custom treatment
- Base recipe: `outline: 2px solid transparent` + `box-shadow: 0 0 0 3px var(--color-accent-soft)` + border shift to `--color-accent`
- Dark mode keeps the same halo size but uses the dark accent token values for parity
- Focus styles appear for keyboard focus (`:focus-visible`) and must not depend on hover support
- Minimum visible contrast target: AA against both surface and background tokens

## Component styling guidance

- **Header / nav:** fixed glass bar, active route underline, stronger surface on scroll
- **Buttons:** dense, premium, never overly rounded or bubbly
- **Cards:** visible border, subtle default shadow, media corners clipped to container
- **Forms:** clear labels, muted placeholder, accent focus state, semantic success/error colors
- **Long-form:** `72ch` max measure, `250px` TOC rail, tinted semantic callouts

## Dark mode strategy

- Keep structure identical across themes; only tokens swap
- Dark mode uses denser surfaces and slightly brighter accent, not a naive inversion
- Hero gradients remain subtle in both modes; code blocks use dual Shiki themes

## Shared art direction notes

- **Home:** big-name hero, restrained glow accents, asymmetrical about teaser
- **Projects:** rigid grid, generous gutters, technical metadata tags
- **Blog:** editorial whitespace, narrow reading column, precise TOC rail
- **Resume:** architectural timeline, not infographic-heavy
- **Contact:** calm, high-trust form layout with strong state clarity

## Appendix — `data-testid` convention

- Shared shell: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `mobile-menu-panel`, `site-footer`
- Pages: `{page}-{section}` (`home-hero`, `projects-grid`, `contact-form`)
- Repeated controls: `{component}-{variant}` (`filter-pill-all`, `filter-pill-next-js`)
- Collections: `{page}-{collection}` (`blog-post-list`, `featured-projects-grid`)
- Status regions: `{page}-status` or `{component}-status`
- Keep IDs stable, lowercase, and kebab-case; never encode copy text or index-based meaning unless order is the feature under test
