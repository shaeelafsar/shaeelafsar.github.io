# Spec: Projects System

> **Components:** `components/projects/*.tsx`, `app/projects/` · **Owner:** Rachael

---

## Data Model (`types/project.ts`)

```ts
interface Project {
  slug: string;
  title: string;
  excerpt: string;
  date: string;            // ISO date
  tags: string[];
  image: string;           // Cover image path
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectDetail extends Project {
  content: string;         // Compiled MDX
}
```

## Content Source

MDX files in `content/projects/*.mdx` with YAML frontmatter matching the `Project` interface. Body is the case study content.

## Pages

### `/projects` — Listing (Server Component: `app/projects/page.tsx`)

- Fetch all projects via `lib/projects.ts`
- Sort by date (newest first), featured items first
- Render `ProjectGrid` with `ProjectCard` components
- `ProjectFilter` (Client Component) for filtering by tag

**Metadata:**
```ts
export const metadata: Metadata = {
  title: 'Projects — Shaeel Afsar',
  description: 'Selected projects and case studies.',
};
```

### `/projects/[slug]` — Detail (Server Component: `app/projects/[slug]/page.tsx`)

- `generateStaticParams()` returns all project slugs
- Fetch project by slug, compile MDX
- Render `ProjectDetail` layout with MDX body
- `generateMetadata()` for dynamic title/description/OG

---

## Components

### `ProjectCard` (`project-card.tsx`) — Server Component

```ts
interface ProjectCardProps {
  project: Project;
}
```

Card with cover image, title, excerpt, tags (as `Badge`), and date. Links to `/projects/[slug]`. Wrapped in `Card` component.

### `ProjectGrid` (`project-grid.tsx`) — Server Component

```ts
interface ProjectGridProps {
  projects: Project[];
}
```

Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop. Wraps in `StaggerChildren` for entrance animation.

### `ProjectFilter` (`project-filter.tsx`) — Client Component

```ts
interface ProjectFilterProps {
  tags: string[];          // All unique tags
  projects: Project[];     // All projects (filter client-side)
}
```

Horizontal scrollable list of tag buttons. "All" selected by default. Filters `ProjectGrid` on click. Uses URL search params for shareable filter state.

### `ProjectDetail` (`project-detail.tsx`) — Server Component

Full case study layout. Header section with title, date, tags, links (live URL, GitHub). Hero image. MDX body rendered with custom components.

---

## Responsive

| Breakpoint | Grid | Card |
|-----------|------|------|
| Mobile | 1 col | Full-width, stacked layout |
| Tablet (`md`) | 2 col | Image on top, content below |
| Desktop (`lg`) | 3 col | Same as tablet but smaller |

## Animations

- Grid cards: `StaggerChildren` on view
- Cards: hover `scale(1.02)` + shadow lift via CSS
- Detail page: `FadeIn` sections for content blocks, parallax on hero image

## Accessibility

- Project grid uses semantic list (`<ul>`) or CSS grid with proper roles
- Each project card is a single link (entire card clickable)
- Filter buttons have clear active/selected state
- Filter uses URL search params (shareable, bookmarkable)
- Project detail: proper heading hierarchy, links open in new tab where appropriate
- Images have descriptive `alt` text

## Dependencies

- UI components (1.3) — `Card`, `Badge`, `Section`, `Container`, `Heading`, `OptimizedImage`, `Button`
- Animation primitives (1.7) — `FadeIn`, `StaggerChildren`
- Content pipeline (1.8) — `lib/projects.ts`
- Type definitions (1.9) — `Project`, `ProjectDetail`
- MDX components (3.1) — for project detail case study rendering

## Acceptance Criteria

1. `/projects` lists all projects sorted by date (featured first)
2. `ProjectFilter` shows all unique tags as filter buttons
3. Clicking a filter button shows only projects with that tag
4. "All" filter shows all projects
5. Filter state persists in URL search params (`?tag=react`)
6. Each `ProjectCard` shows: cover image, title, excerpt, tags, date
7. Clicking a card navigates to `/projects/[slug]`
8. `/projects/[slug]` renders full MDX case study with header and body
9. Project detail shows: title, date, tags, live URL (if any), GitHub URL (if any), hero image, MDX content
10. `generateStaticParams` returns all project slugs
11. `generateMetadata` returns project-specific title, description, OG tags
12. Grid is responsive: 1-col mobile, 2-col tablet, 3-col desktop
13. Cards animate in with `StaggerChildren` on scroll
14. Cards have hover scale + shadow effect (desktop only, via CSS)
15. Dark mode: cards, badges, and images all render correctly
