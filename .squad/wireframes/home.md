# Home (`/`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: logo + `ThemeToggle [client]` + menu trigger, no inline nav
  - `768-1023`: same as mobile, tablet spacing only
  - `1024-1279`: inline `Nav` appears, `MobileMenu [client]` hidden, compact desktop gutters
  - `1280+`: full desktop nav spacing and hero accent field
- Shared keyboard/accessibility contract: skip link → header → main → footer; `MobileMenu [client]` traps focus when open, closes on Escape, and returns focus to its trigger; `ThemeToggle [client]` exposes pressed/label state
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `mobile-menu-panel`, `site-footer`

## Page stack

`Hero` → `FeaturedProjects` → `AboutTeaser` → `BlogTeaser` → `CTASection`

## Client / server ownership

- Server sections: `Hero`, `FeaturedProjects`, `AboutTeaser`, `BlogTeaser`, `CTASection`
- Client islands inside the shell only: `ThemeToggle [client]`, `MobileMenu [client]`
- Motion wrappers remain client-owned around server content

## Data flow

- `FeaturedProjects`: `lib/projects.ts` → top 3 `featured: true`, sorted by newest first
- `BlogTeaser`: `lib/blog.ts` → latest 3 published posts, sorted by date desc
- `AboutTeaser` + `CTASection`: static page copy + static image asset

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
│ [Logo]             [Theme][Menu]    │
├─────────────────────────────────────┤
│ Hero / Section (100dvh min)         │
│ [text-reveal] H1 Shaeel Afsar       │
│ [fade-in] role / subtitle           │
│ [fade-in] [View Work] [Get in Touch]│
├─────────────────────────────────────┤
│ FeaturedProjects                    │
│ [fade-in] H2 Selected Work          │
│ [stagger] ProjectCard 01            │
│ [stagger] ProjectCard 02            │
│ [stagger] ProjectCard 03            │
│ [fade-in] View All Projects         │
├─────────────────────────────────────┤
│ AboutTeaser                         │
│ [fade-in] H2 About Me               │
│ body copy                           │
│ [ghost] Learn More                  │
│ [fade-in] image below text          │
├─────────────────────────────────────┤
│ BlogTeaser                          │
│ [stagger] PostCard 01               │
│ [stagger] PostCard 02               │
│ [stagger] PostCard 03               │
│ [fade-in] Read the Blog             │
├─────────────────────────────────────┤
│ CTASection                          │
│ [fade-in] Let's Work Together       │
│ [fade-in] Get in Touch              │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: [Logo]                           [Theme][Menu]       │
├──────────────────────────────────────────────────────────────┤
│ Hero: text stack only, max 10 cols                           │
├──────────────────────────────────────────────────────────────┤
│ FeaturedProjects: 2-col grid, row 2 may contain single card  │
├──────────────────────────────────────────────────────────────┤
│ AboutTeaser: locked stacked layout                           │
│ text block first, image full-width below                     │
├──────────────────────────────────────────────────────────────┤
│ BlogTeaser: 2-col grid with third card wrapping below        │
├──────────────────────────────────────────────────────────────┤
│ CTASection centered stack                                    │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header: [Logo] [Nav] [ThemeToggle]                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Hero: 2-col layout; decorative accent layer visible, pointer-events none    │
├──────────────────────────────────────────────────────────────────────────────┤
│ FeaturedProjects: locked 3-col grid                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ AboutTeaser: locked 2-col layout, text left / image right                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ BlogTeaser: locked 3-col grid                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ CTASection centered                                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ Hero / h-dvh                                                                 │
│ text left, accent halo + grain right                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ FeaturedProjects / 3-col grid                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ AboutTeaser / 2-col split                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ BlogTeaser / 3-col grid                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ CTASection / accent field                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- `FeaturedProjects` empty: render heading, helper copy, and CTA to `/projects`; no empty card shells
- `FeaturedProjects` load/build failure: page-level error boundary renders retry copy and keeps shell visible
- `BlogTeaser` empty: render heading, helper copy, and CTA to `/blog`
- `BlogTeaser` load/build failure: page-level error boundary renders retry copy and keeps shell visible
- Global loading: root loading shell keeps header/footer visible with section skeleton blocks

## Accessibility + interaction notes

- `Hero` is the only `h1`; downstream sections use `h2`
- Decorative hero layer is `aria-hidden="true"`, `pointer-events: none`, and below header controls via z-index
- `AboutTeaser` image uses meaningful alt text
- Buttons/links follow visual tab order; no off-screen focus targets

## Suggested test IDs

- `home-hero`
- `home-primary-cta`
- `featured-projects-section`
- `featured-projects-grid`
- `about-teaser`
- `blog-teaser-list`
- `home-cta-section`
