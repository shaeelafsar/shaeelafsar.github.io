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
