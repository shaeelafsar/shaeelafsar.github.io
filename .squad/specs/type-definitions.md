# Spec: Type Definitions

> **Files:** `types/project.ts`, `types/blog.ts`, `types/resume.ts` · **Owner:** Rachael

---

## Purpose

Central TypeScript type definitions for all content models. These are the single source of truth for data shapes flowing through the content pipeline, components, and pages.

## Component Type

N/A — pure TypeScript types (no runtime code).

## Implementation Details

### `types/blog.ts`

```ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;              // ISO 8601 date string (YYYY-MM-DD)
  excerpt: string;           // 1-2 sentence summary for cards/meta
  tags: string[];
  image?: string;            // Optional cover image path (relative to /public)
  published: boolean;        // Only published posts appear on site
  readingTime: number;       // Minutes, calculated from word count (words / 200)
}

export interface BlogPostDetail extends BlogPost {
  content: React.ReactElement;  // Compiled MDX content (JSX)
  headings: Heading[];          // Extracted h2/h3 for TOC
}

export interface Heading {
  text: string;              // Heading text content
  slug: string;              // URL-safe ID (via rehype-slug)
  level: 2 | 3;             // Only h2 and h3 are extracted
}
```

### `types/project.ts`

```ts
export interface Project {
  slug: string;
  title: string;
  excerpt: string;           // Short description for cards
  date: string;              // ISO 8601 date
  tags: string[];            // Technologies / categories
  image: string;             // Cover image (required for projects)
  featured: boolean;         // Featured projects appear on home page
  liveUrl?: string;          // Live site URL
  githubUrl?: string;        // GitHub repository URL
}

export interface ProjectDetail extends Project {
  content: React.ReactElement;  // Compiled MDX case study
}
```

### `types/resume.ts`

```ts
export interface Resume {
  basics: ResumeBasics;
  work: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects?: ProjectRef[];
}

export interface ResumeBasics {
  name: string;
  label: string;             // Professional title (e.g., "Software Engineer")
  email: string;
  url: string;               // Personal website URL
  summary: string;           // Professional summary paragraph
  location: {
    city: string;
    region: string;
    country: string;
  };
  profiles: SocialProfile[];
}

export interface SocialProfile {
  network: string;           // "GitHub", "LinkedIn", "Twitter"
  url: string;
  username: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  url?: string;              // Company website
  startDate: string;         // YYYY-MM format
  endDate?: string;          // Omitted = current position
  summary: string;           // Role description
  highlights: string[];      // Key achievements/responsibilities
}

export interface Education {
  institution: string;
  area: string;              // Field of study
  studyType: string;         // "Bachelor", "Master", etc.
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  name: string;              // Category name: "Frontend", "Backend", "DevOps"
  keywords: string[];        // Skills in category: ["React", "Next.js", "TypeScript"]
}

export interface ProjectRef {
  name: string;
  description: string;
  url?: string;
}
```

### Shared Types

```ts
// types/common.ts (if needed)
export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  ogImage: string;
}
```

---

## Conventions

- All interfaces use `interface` (not `type` alias) for object shapes
- Optional fields use `?` syntax (not `| undefined`)
- Date fields are ISO strings (parsed at display time, not stored as `Date`)
- Arrays are never nullable — use empty array `[]` as default
- All exports are named exports (no default exports)

## Dependencies

None — types have no runtime dependencies.

## Acceptance Criteria

1. All three type files exist at the specified paths
2. TypeScript compiles without errors (`tsc --noEmit`)
3. Types match the frontmatter schemas defined in content files
4. Types are imported and used by `lib/blog.ts`, `lib/projects.ts`, `lib/resume.ts`
5. No use of `any` type anywhere
6. All fields have JSDoc or inline comments explaining their purpose
7. `BlogPostDetail.content` is typed as `React.ReactElement` (from MDX compilation)
8. `Heading.level` is a union literal `2 | 3` (not `number`)
