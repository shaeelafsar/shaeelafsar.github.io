# About (`/about`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: mobile shell, menu overlay available
  - `768-1023`: tablet shell, menu overlay still primary nav
  - `1024-1279`: compact desktop shell with inline nav
  - `1280+`: wide desktop shell
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`AboutIntro` → `WhatIDoSection` → `TechnologiesSection` (`SkillsGrid`) → `BeyondCodeSection`

## Client / server ownership

- Server sections: `AboutIntro`, `WhatIDoSection`, `TechnologiesSection`, `BeyondCodeSection`
- Client islands in shell only: `ThemeToggle [client]`, `MobileMenu [client]`

## Data flow

- `AboutIntro`, `WhatIDoSection`, `BeyondCodeSection`: static page copy + portrait asset
- `TechnologiesSection` / `SkillsGrid`: shared structured skills data from `content/resume.json` via `lib/resume.ts`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ AboutIntro                          │
│ [fade-in] portrait image            │
│ [fade-in] H1 About                  │
│ [fade-in] extended bio              │
├─────────────────────────────────────┤
│ WhatIDoSection                      │
│ [fade-in] H2 What I Do              │
│ philosophy copy                     │
├─────────────────────────────────────┤
│ TechnologiesSection                 │
│ [fade-in] H2 Technologies           │
│ [stagger] skills category 01        │
│ [stagger] skills category 02        │
│ [stagger] skills category 03        │
├─────────────────────────────────────┤
│ BeyondCodeSection                   │
│ [fade-in] H2 Beyond Code            │
│ stacked interest cards              │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ AboutIntro                                                   │
│ 2-col layout locked: text left, portrait right              │
├──────────────────────────────────────────────────────────────┤
│ WhatIDoSection full-width narrative                         │
├──────────────────────────────────────────────────────────────┤
│ TechnologiesSection: locked 2-col skills grid              │
├──────────────────────────────────────────────────────────────┤
│ BeyondCodeSection: locked 2-col cards/image-text mix       │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ AboutIntro: 2-col split, portrait fixed to right column                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ WhatIDoSection: 2-col editorial copy                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ TechnologiesSection: locked 3-col skills grid                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ BeyondCodeSection: locked 3-up interest cards                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ AboutIntro                                                                   │
│ text left / portrait right                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ WhatIDoSection                                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ TechnologiesSection / 3-col SkillsGrid                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ BeyondCodeSection / 3-up interest cards                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Portrait missing: replace image slot with framed neutral placeholder and keep copy order unchanged
- Skills data empty: render section heading plus "Skills details coming soon" copy instead of empty cards
- Beyond-code content empty: render a short personality blurb, no blank card grid
- Global loading: root loading shell with section placeholders
- Global error: page-level error boundary keeps shell visible and swaps section bodies for recovery copy

## Accessibility + interaction notes

- Landmarks: `header`, `main`, four semantic `section`s, `footer`
- Heading order is fixed: one `h1`, then `h2`s only for page sections
- Portrait alt text is required and descriptive
- Inline links in bio/interests follow visual reading order; no card is focusable unless it is a real link
- Interest cards and inline links use shared hover/focus recipe from the design system

## Suggested test IDs

- `about-intro`
- `about-portrait`
- `what-i-do-section`
- `skills-grid`
- `beyond-code-section`
