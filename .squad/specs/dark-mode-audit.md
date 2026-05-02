# Spec: Dark Mode Audit

> **Scope:** Cross-cutting — all components and pages · **Owner:** Pris

---

## Purpose

Systematic verification that every component, page, and visual element looks correct in both light and dark themes. Catches contrast issues, hard-coded colors, missing token usage, and visual inconsistencies.

## Component Type

N/A — audit checklist and process spec.

## Implementation Details

### Color Token System

All colors must use CSS custom properties defined in `globals.css`:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-bg` | `#fafafa` | `#0a0a0a` | Page background |
| `--color-bg-secondary` | `#f0f0f0` | `#171717` | Cards, code blocks, secondary surfaces |
| `--color-text` | `#171717` | `#fafafa` | Primary text |
| `--color-text-secondary` | `#525252` | `#a3a3a3` | Muted text, descriptions |
| `--color-accent` | `#2563eb` | `#3b82f6` | Links, highlights, accent elements |
| `--color-accent-hover` | `#1d4ed8` | `#60a5fa` | Hover state of accent |
| `--color-border` | `#e5e5e5` | `#262626` | Borders, dividers |
| `--color-card` | `#ffffff` | `#141414` | Card backgrounds |

### Audit Checklist

#### Global

- [ ] Background transitions smoothly between themes (300ms)
- [ ] No flash of wrong theme on page load (FOUC prevention script works)
- [ ] Selection color works in both modes
- [ ] Scrollbar matches theme (if custom-styled)

#### Typography

- [ ] Primary text meets WCAG AA contrast (4.5:1) in both modes
- [ ] Secondary text meets WCAG AA contrast in both modes
- [ ] Accent text on both backgrounds meets WCAG AA
- [ ] Code blocks (inline and block) are readable in both modes

#### Components

- [ ] **Buttons (all variants):** Primary, secondary, outline, ghost all look correct
- [ ] **Cards:** Background, border, shadow all adapt
- [ ] **Badges:** Readable in both modes
- [ ] **Heading component:** No hard-coded colors
- [ ] **Images:** No color fringing from transparent PNGs on dark backgrounds

#### Layout

- [ ] **Header:** Background blur/opacity works in both modes
- [ ] **Footer:** Border, text, social icons all adapt
- [ ] **Mobile menu:** Overlay background uses theme token
- [ ] **Theme toggle:** Icons are visible in both modes

#### Pages

- [ ] **Home hero:** Background, text, CTA buttons all correct
- [ ] **CTA section:** Accent background with white text works in both modes
- [ ] **About page:** Photo doesn't clash with dark background
- [ ] **Projects:** Filter buttons, cards, grid all adapt
- [ ] **Blog:** Post cards, MDX content, code blocks, callouts all correct
- [ ] **Resume:** Timeline, skill badges, download button all adapt
- [ ] **Contact:** Form fields (input borders, focus rings, placeholder text) all correct
- [ ] **404/Error:** Both pages look correct in dark mode

#### Syntax Highlighting

- [ ] Code blocks use theme-appropriate Shiki theme
- [ ] Line highlighting visible in both modes
- [ ] Inline code background is distinguishable from page background

#### Animations

- [ ] Box-shadow transitions work in dark mode (deeper shadows needed)
- [ ] Accent color animations (progress bar, underlines) visible in both modes

### Contrast Requirements (WCAG AA)

| Combination | Minimum Ratio | Light Mode | Dark Mode |
|-------------|---------------|------------|-----------|
| Primary text on bg | 4.5:1 | `#171717` on `#fafafa` ≈ 16:1 ✓ | `#fafafa` on `#0a0a0a` ≈ 18:1 ✓ |
| Secondary text on bg | 4.5:1 | `#525252` on `#fafafa` ≈ 7:1 ✓ | `#a3a3a3` on `#0a0a0a` ≈ 9:1 ✓ |
| Accent on bg | 4.5:1 | `#2563eb` on `#fafafa` ≈ 4.6:1 ✓ | `#3b82f6` on `#0a0a0a` ≈ 5.3:1 ✓ |
| White on accent (CTA) | 4.5:1 | `#ffffff` on `#2563eb` ≈ 4.6:1 ✓ | N/A | 

### Process

1. Pris reviews every page in both themes using browser DevTools
2. Screenshot comparison: light vs. dark for each page
3. Use browser's accessibility inspector to verify contrast ratios
4. Fix issues by updating components to use tokens (not hard-coded colors)
5. Run axe-core accessibility scan in both modes

---

## Responsive Behavior

Audit must cover both themes at ALL breakpoints (mobile, tablet, desktop).

## Accessibility

This IS the accessibility audit for color/contrast. Every item must pass WCAG AA.

## Dependencies

- All Phase 2 pages built
- All UI components built
- Theme toggle working

## Acceptance Criteria

1. Every color in the codebase uses CSS custom properties (no hard-coded `#hex` except in `globals.css`)
2. All text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
3. No visual bugs when switching themes (no leftover light-mode styles in dark)
4. Form inputs have visible borders and focus rings in both modes
5. Code blocks are readable in both themes
6. Box shadows adapt (lighter in light mode, deeper in dark mode)
7. The CTA section's accent background + white text passes contrast in both modes
8. Theme transition is smooth (300ms via `transition-colors` on `<body>`)
9. OG images render correctly for both theme contexts
10. All audit checklist items above are verified and passing
