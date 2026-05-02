# Project Detail (`/projects/[slug]`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: stacked header/meta/actions
  - `768-1023`: narrow article with full-width hero image
  - `1024-1279`: compact desktop two-column header, narrow article body
  - `1280+`: wide desktop two-column header with generous media spacing
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`ProjectDetailHeader` → `HeroImage` → `ProjectMetadataBlock` → `MDX case study blocks` → `BackToProjects + ContactCTA`

## Client / server ownership

- Server sections: `ProjectDetailHeader`, `HeroImage`, `ProjectMetadataBlock`, MDX body, CTA row
- Client islands in shell only: `ThemeToggle [client]`, `MobileMenu [client]`

## Data flow

- Route data: `content/projects/[slug].mdx` frontmatter + MDX body via `lib/projects.ts` / `lib/mdx.ts`
- Metadata block is explicit and separate from body content: date, tags, role/platform/stack labels, optional external actions

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ProjectDetailHeader                 │
│ [fade-in] title                     │
│ [fade-in] excerpt                   │
│ [fade-in] date / tags               │
│ [fade-in] external actions if any   │
├─────────────────────────────────────┤
│ HeroImage                           │
│ fallback frame if image missing     │
├─────────────────────────────────────┤
│ ProjectMetadataBlock                │
│ Tech stack / role / platform        │
├─────────────────────────────────────┤
│ Article / MDX body                  │
│ problem / process / outcome         │
│ media / quotes / callouts           │
├─────────────────────────────────────┤
│ BackToProjects + ContactCTA         │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ ProjectDetailHeader                                          │
│ stacked title, metadata, action links                        │
├──────────────────────────────────────────────────────────────┤
│ HeroImage full-width                                         │
├──────────────────────────────────────────────────────────────┤
│ ProjectMetadataBlock in 2-col definition list                │
├──────────────────────────────────────────────────────────────┤
│ MDX body in narrow container                                 │
├──────────────────────────────────────────────────────────────┤
│ BackToProjects + ContactCTA                                  │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectDetailHeader                                                          │
│ title/excerpt left | meta/actions right                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ HeroImage                                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectMetadataBlock / 3-4 metadata cells                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ MDX article                                                                  │
│ wide tables and long code blocks scroll inside their own containers          │
├──────────────────────────────────────────────────────────────────────────────┤
│ BackToProjects + ContactCTA                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectDetailHeader                                                          │
│ title/excerpt left | date/tags/actions right                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ HeroImage with subtle desktop parallax                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ ProjectMetadataBlock                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Article / project-detail layout                                              │
│ MDX blocks, gallery, metrics rail, quote/callout                             │
├──────────────────────────────────────────────────────────────────────────────┤
│ BackToProjects + ContactCTA                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Missing slug: route resolves to `not-found` with a return link to `/projects`
- Malformed frontmatter / asset failure: page-level error boundary with retry copy
- Missing hero image: render the metadata block and article normally; hero slot becomes a neutral framed placeholder
- Missing `liveUrl`: omit live button entirely
- Missing `githubUrl`: omit GitHub button entirely
- No adjacent/related item: CTA row still shows `Back to Projects` and `Contact`

## Content handling notes

- MDX supports gallery, metrics rail, callout, blockquote, and images
- Video/embed is deferred out of v1 unless explicitly authored as a supported MDX component later
- Anchor links inside the article respect sticky-header offset and keep focus visible

## Accessibility + interaction notes

- Landmarks: `header`, `main`, `article`, `footer`
- External links announce destination and new-tab behavior
- Hero/media assets require alt text or decorative opt-out
- Focus order: shell → project header → external actions → hero/media → article → CTA row

## Suggested test IDs

- `project-detail-header`
- `project-hero-image`
- `project-metadata-block`
- `project-mdx-body`
- `project-live-link`
- `project-github-link`
- `project-detail-cta`
