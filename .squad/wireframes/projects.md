# Projects (`/projects`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: mobile shell, no sticky filter
  - `768-1023`: tablet shell, no sticky filter
  - `1024-1279`: compact desktop shell, sticky filter row enabled
  - `1280+`: wide desktop shell, sticky filter row enabled
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`ProjectsHero` → `ProjectFilter [client]` → `ProjectGrid`

## Client / server ownership

- Server sections: `ProjectsHero`, `ProjectGrid`
- Client islands: `ThemeToggle [client]`, `MobileMenu [client]`, `ProjectFilter [client]`
- Filter changes update URL state and trigger server-rendered grid refresh

## Data flow

- Projects: `content/projects/*.mdx` → `lib/projects.ts` → sorted newest first, featured first
- Tags: derived unique project tags → passed into `ProjectFilter [client]`
- URL state: `/projects?tag={slug}`; invalid tag falls back to all projects

## ProjectFilter state machine

`idle → hover → focus-visible → active/selected → loading/pending → zero-results`

- `idle`: `All` selected when no valid tag is present
- `hover`: pointer preview only; never the sole selected signal
- `focus-visible`: roving focus ring on pills for keyboard users
- `active/selected`: current tag pill styled as selected and announced with `aria-pressed="true"`
- `loading/pending`: `useTransition` pending state; selected pill remains visible, grid reduces opacity, no scroll reset
- `zero-results`: grid replaced by empty copy + reset link back to `/projects`

## Keyboard contract

- Left/Right arrows move focus across pills
- Home/End jump to first/last pill
- Enter/Space selects the focused pill
- Focus remains on the selected pill after URL update completes

## Responsive layout

### Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ProjectsHero                        │
│ [fade-in] H1 Projects               │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ ProjectFilter [client]              │
│ horizontal pill scroller            │
│ [All][Next.js][AI][TS][Design]      │
├─────────────────────────────────────┤
│ ProjectGrid                         │
│ [stagger] ProjectCard 01            │
│ [stagger] ProjectCard 02            │
│ [stagger] ProjectCard 03            │
└─────────────────────────────────────┘
```

### Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ ProjectsHero                                                 │
├──────────────────────────────────────────────────────────────┤
│ ProjectFilter [client]                                       │
│ wrapping pill rows, not sticky                               │
├──────────────────────────────────────────────────────────────┤
│ ProjectGrid                                                  │
│ locked 2-col grid                                            │
└──────────────────────────────────────────────────────────────┘
```

### Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectsHero                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectFilter [client] sticky below header                                   │
│ single row when possible, wraps only if tag count demands it                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectGrid                                                                  │
│ locked 3-col grid                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectsHero                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectFilter [client] sticky below header                                   │
│ All | Next.js | TypeScript | AI | Design Systems | ...                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectGrid / 3-col grid                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Initial state: `/projects` with `All` selected and full grid visible
- Valid tag state: `/projects?tag=next-js` shows matching cards only
- Invalid tag state: `/projects?tag=unknown` behaves exactly like `/projects`
- Zero results: explanatory copy + `Reset filters` link to `/projects`
- Loading: pending overlay is subtle only; filter row remains interactive after transition settles
- Error: page-level error boundary preserves hero + filter row and swaps grid for retry copy

## Accessibility + interaction notes

- Filter pill row is a labeled control group: `aria-label="Filter projects by tag"`
- Cards remain full-card links; filter never steals card focus order after selection
- Sticky behavior starts at `lg` only; never sticky on mobile/tablet
- Filter change should not replay full-page entrance animations; only grid contents crossfade softly

## Suggested test IDs

- `projects-hero`
- `projects-filter`
- `filter-pill-all`
- `filter-pill-{tag}`
- `projects-grid`
- `projects-empty-state`
