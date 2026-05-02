# Spec: Content Pipeline

> **Files:** `lib/mdx.ts`, `lib/blog.ts`, `lib/projects.ts`, `lib/resume.ts` · **Owner:** Rachael

---

## `lib/mdx.ts` — MDX Compilation

Core MDX compilation function used by both blog and projects.

```ts
import { compileMDX } from 'next-mdx-remote/rsc';

interface CompileMDXResult<T> {
  content: React.ReactElement;
  frontmatter: T;
}

async function compileMDXContent<T>(source: string): Promise<CompileMDXResult<T>>;
```

**Plugins:**
- `remark-gfm` — tables, strikethrough, task lists
- `rehype-slug` — auto-generate heading IDs
- `rehype-pretty-code` — syntax highlighting with Shiki
  - Theme: `one-dark-pro` (dark), `github-light` (light) — or single theme that works in both

**Heading extraction:** Parse MDX source to extract h2/h3 headings + slugs for TOC generation.

---

## `lib/blog.ts` — Blog Data

```ts
// Get all published posts (sorted by date desc)
async function getAllPosts(): Promise<BlogPost[]>;

// Get single post by slug (with compiled MDX content)
async function getPostBySlug(slug: string): Promise<BlogPostDetail | null>;

// Get all slugs for generateStaticParams
async function getAllPostSlugs(): Promise<string[]>;
```

**Implementation:** Read `content/blog/` directory, parse frontmatter from each `.mdx` file, filter by `published: true`, sort by date.

---

## `lib/projects.ts` — Project Data

```ts
async function getAllProjects(): Promise<Project[]>;
async function getFeaturedProjects(): Promise<Project[]>;
async function getProjectBySlug(slug: string): Promise<ProjectDetail | null>;
async function getAllProjectSlugs(): Promise<string[]>;
async function getAllProjectTags(): Promise<string[]>;
```

**Implementation:** Same pattern as blog — read `content/projects/`, parse frontmatter, compile MDX.

---

## `lib/resume.ts` — Resume Data

```ts
async function getResume(): Promise<Resume>;
```

**Implementation:** Read and parse `content/resume.json`. Validate with Zod schema.

---

## `lib/metadata.ts` — Shared Metadata

```ts
const siteConfig = {
  name: 'Shaeel Afsar',
  url: 'https://shaeelafsar.com',  // Update with actual domain
  description: 'Personal website of Shaeel Afsar',
  ogImage: '/images/og-default.jpg',
};

function constructMetadata(params: {
  title?: string;
  description?: string;
  image?: string;
}): Metadata;
```

---

## File System Pattern

All content functions use `fs.readFile` and `fs.readdir` from `node:fs/promises` with `path.join(process.cwd(), 'content', ...)`. This works because all pages are statically generated — file system access happens at build time only.
