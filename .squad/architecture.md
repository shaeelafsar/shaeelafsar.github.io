# Architecture — Shaeel Afsar Personal Website

> **Author:** Deckard (Lead) · **Date:** 2026-05-02 · **Status:** Draft — pending team review

---

## 1. Project Overview

A personal professional website for **Shaeel Afsar** — portfolio, blog, resume, and contact. The site must feel award-worthy: cinematic pacing, buttery scroll animations, strong typographic hierarchy, and flawless dark mode. Think Awwwards-caliber, but grounded in real content and fast load times.

**Goals:**
- Showcase projects with rich detail pages
- Publish long-form blog posts (MDX)
- Present a downloadable/viewable resume
- Deliver an immersive, animated experience
- Achieve perfect Lighthouse scores

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 16** (App Router) | Server Components, `use cache`, PPR, Turbopack, View Transitions |
| Language | **TypeScript** (strict mode) | Type safety, better DX, catch errors at compile time |
| Styling | **Tailwind CSS v4** | Utility-first, CSS-native config, dark mode via `dark:` variant |
| Animations | **Framer Motion (Motion v12)** | Declarative, React-native, `whileInView`, scroll hooks |
| Scroll | **Lenis** (`@studio-freight/lenis`) | Smooth scrolling, inertia, momentum |
| Content | **MDX** via `next-mdx-remote` | Blog posts and project case studies as MDX files |
| Fonts | **`next/font`** | Zero-CLS font loading, variable fonts |
| Images | **`next/image`** | Automatic optimization, lazy loading, AVIF/WebP |
| Deployment | **Vercel** | Native Next.js support, edge network, analytics |
| Package Manager | **pnpm** | Fast, disk-efficient |

**Decision: Framer Motion over GSAP.** For a React/Next.js project, Framer Motion's declarative API is cleaner. We avoid the GSAP `useEffect` cleanup pitfalls. If we later need a pinned timeline section, we can add GSAP for that one component only.

**Decision: `next-mdx-remote` over `@next/mdx`.** Remote allows us to load MDX from `content/` at build time with full control over frontmatter parsing, custom components, and rehype/remark plugins.

---

## 3. Directory Structure

```
personal-website/
├── app/
│   ├── layout.tsx              # Root layout — font, metadata, theme provider, nav, footer
│   ├── page.tsx                # Home page
│   ├── loading.tsx             # Root loading state
│   ├── error.tsx               # Root error boundary
│   ├── not-found.tsx           # Custom 404
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx        # Project detail
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post
│   ├── resume/
│   │   └── page.tsx            # Resume / CV
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # Robots.txt generation
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Sticky header with scroll-aware behavior
│   │   ├── footer.tsx          # Site footer
│   │   ├── nav.tsx             # Navigation (desktop + mobile)
│   │   ├── mobile-menu.tsx     # Full-screen mobile menu (client)
│   │   └── theme-toggle.tsx    # Dark/light mode toggle (client)
│   ├── ui/
│   │   ├── button.tsx          # Base button variants
│   │   ├── badge.tsx           # Tag/category badge
│   │   ├── card.tsx            # Generic card container
│   │   ├── section.tsx         # Full-width section wrapper with spacing
│   │   ├── container.tsx       # Max-width container
│   │   ├── heading.tsx         # Typographic heading component
│   │   └── image.tsx           # Wrapper around next/image with blur placeholder
│   ├── animation/
│   │   ├── fade-in.tsx         # Scroll-triggered fade-in (client)
│   │   ├── stagger-children.tsx # Stagger children on view (client)
│   │   ├── text-reveal.tsx     # Character/word reveal animation (client)
│   │   ├── parallax.tsx        # Parallax scroll wrapper (client)
│   │   ├── page-transition.tsx # Page transition wrapper (client)
│   │   └── smooth-scroll.tsx   # Lenis smooth scroll provider (client)
│   ├── home/
│   │   ├── hero.tsx            # Hero section
│   │   ├── featured-projects.tsx
│   │   ├── about-teaser.tsx
│   │   ├── blog-teaser.tsx
│   │   └── cta-section.tsx
│   ├── projects/
│   │   ├── project-card.tsx
│   │   ├── project-grid.tsx
│   │   ├── project-filter.tsx  # Client — filter by tech/category
│   │   └── project-detail.tsx  # Case study layout
│   ├── blog/
│   │   ├── post-card.tsx
│   │   ├── post-list.tsx
│   │   ├── post-header.tsx
│   │   ├── mdx-components.tsx  # Custom MDX component map
│   │   └── table-of-contents.tsx # Client — scroll-spy TOC
│   ├── resume/
│   │   ├── experience-timeline.tsx
│   │   ├── skills-grid.tsx
│   │   ├── education-section.tsx
│   │   └── download-button.tsx
│   └── contact/
│       └── contact-form.tsx    # Client — form with validation
├── content/
│   ├── blog/
│   │   └── *.mdx               # Blog posts with frontmatter
│   ├── projects/
│   │   └── *.mdx               # Project case studies with frontmatter
│   └── resume.json             # Structured resume data (JSON Resume schema)
├── lib/
│   ├── mdx.ts                  # MDX compilation & frontmatter parsing
│   ├── projects.ts             # Project data fetching helpers
│   ├── blog.ts                 # Blog data fetching helpers
│   ├── resume.ts               # Resume data loader
│   ├── metadata.ts             # Shared metadata helpers
│   └── utils.ts                # General utilities (cn, formatDate, etc.)
├── types/
│   ├── project.ts              # Project type definitions
│   ├── blog.ts                 # Blog post type definitions
│   └── resume.ts               # Resume type definitions
├── public/
│   ├── images/                 # Static images (OG, favicons, etc.)
│   ├── fonts/                  # Self-hosted variable fonts (if not using Google)
│   └── resume.pdf              # Downloadable resume
├── next.config.ts
├── tailwind.config.ts          # Tailwind v4 config (if needed beyond CSS)
├── tsconfig.json
├── package.json
└── .env.local                  # Environment variables (contact form endpoint, etc.)
```

---

## 4. Route Map

| Route | Page | Gen Strategy | Description |
|-------|------|-------------|-------------|
| `/` | Home | Static | Hero, featured projects, about teaser, blog teaser, CTA |
| `/about` | About | Static | Bio, philosophy, skills, personal interests |
| `/projects` | Projects | Static | Filterable grid of all projects |
| `/projects/[slug]` | Project Detail | SSG (`generateStaticParams`) | Full case study — problem, process, outcome, tech, images |
| `/blog` | Blog | Static | Chronological list of blog posts |
| `/blog/[slug]` | Blog Post | SSG (`generateStaticParams`) | Full MDX blog post with TOC |
| `/resume` | Resume | Static | Interactive resume with download option |
| `/contact` | Contact | Static (form is client) | Contact form + social links |

All pages are statically generated at build time. No SSR needed — content lives in the repo.

---

## 5. Component Hierarchy

```
RootLayout (Server)
├── SmoothScrollProvider (Client) — Lenis wrapper
├── PageTransition (Client) — View Transition wrapper
├── Header (Server shell + Client interactivity)
│   ├── Nav (Server)
│   ├── ThemeToggle (Client)
│   └── MobileMenu (Client)
├── <main> — page content (Server by default)
│   └── [Page Component]
│       └── Section > Container > [Content Components]
│           └── FadeIn / StaggerChildren / TextReveal (Client animation wrappers)
└── Footer (Server)
```

**Rule: Server Components by default.** A component becomes a Client Component only when it needs:
- Event handlers (`onClick`, `onChange`)
- Hooks (`useState`, `useEffect`, `useScroll`)
- Browser APIs (`window`, `IntersectionObserver`)
- Animation libraries (Framer Motion hooks)

Animation wrapper components (`FadeIn`, `StaggerChildren`, etc.) are Client Components that accept `children` as Server Components.

---

## 6. Data Architecture

### Blog Posts (`content/blog/*.mdx`)

```yaml
---
title: "Building a Design System"
slug: "building-a-design-system"
date: "2026-04-15"
excerpt: "How I approached building a scalable design system..."
tags: ["design", "react", "tailwind"]
published: true
image: "/images/blog/design-system.jpg"
---
```

### Projects (`content/projects/*.mdx`)

```yaml
---
title: "Project Name"
slug: "project-name"
date: "2026-03-01"
excerpt: "Brief description for card view"
tags: ["Next.js", "TypeScript", "AI"]
image: "/images/projects/project-name/cover.jpg"
featured: true
liveUrl: "https://example.com"
githubUrl: "https://github.com/shaeelafsar/project"
---
```

### Resume (`content/resume.json`)

Follows JSON Resume schema (`jsonresume.org`). Structured data enables both visual rendering and potential machine-readable output.

### Data Flow

```
content/*.mdx → lib/mdx.ts (compile + parse frontmatter)
                    ↓
              page.tsx (Server Component) → generateStaticParams()
                    ↓
              Component tree (rendered at build time)
```

All data fetching happens in Server Components. No client-side data fetching. No API routes for content.

---

## 7. Animation Strategy

**Philosophy:** Cinematic pacing with restraint. Every animation must serve a purpose — guide the eye, create depth, or reinforce hierarchy. Never animate for the sake of it.

### Global

| Element | Animation | Implementation |
|---------|-----------|---------------|
| Smooth scrolling | Lenis momentum scroll | `SmoothScrollProvider` wrapping app |
| Page transitions | Fade + subtle slide | React View Transitions API (Next.js 16) |
| Prefers reduced motion | Disable all motion | `@media (prefers-reduced-motion: reduce)` |

### Per-Page

| Page | Animation Elements |
|------|-------------------|
| **Home Hero** | Text reveal (word-by-word), floating accent elements, parallax background |
| **Home Sections** | Staggered fade-in on scroll, counter animations for stats |
| **Projects Grid** | Stagger cards on view, hover scale + shadow lift |
| **Project Detail** | Image parallax, content fade-in sections |
| **Blog List** | Stagger post cards |
| **Blog Post** | TOC scroll-spy highlight, reading progress bar |
| **Resume** | Timeline stagger, skill bars animate on view |
| **Contact** | Form fields stagger in |

### Animation Primitives (reusable)

1. **`<FadeIn>`** — `whileInView` fade + translate. Props: `direction`, `delay`, `duration`.
2. **`<StaggerChildren>`** — Container that staggers child entrance. Props: `staggerDelay`.
3. **`<TextReveal>`** — Word/character split with cascading reveal. Props: `text`, `type`.
4. **`<Parallax>`** — Scroll-linked Y offset. Props: `speed`, `children`.

### Performance Rules

- Only animate `transform` and `opacity` — never `width`, `height`, `top`, `left`
- Use `will-change: transform` sparingly, remove after animation
- Wrap hover animations in `@media (hover: hover) and (pointer: fine)`
- All `whileInView` use `viewport={{ once: true }}` — animate once, not repeatedly
- Lazy-load animation components below the fold

---

## 8. Design System Plan

### Color Tokens (CSS Custom Properties)

```css
:root {
  /* Neutrals */
  --color-bg: #fafafa;
  --color-bg-secondary: #f0f0f0;
  --color-text: #171717;
  --color-text-secondary: #525252;
  --color-border: #e5e5e5;

  /* Accent — monochromatic with a single accent color */
  --color-accent: #2563eb;        /* Blue-600 */
  --color-accent-hover: #1d4ed8;  /* Blue-700 */

  /* Surfaces */
  --color-card: #ffffff;
  --color-card-hover: #f9fafb;
}

.dark {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #171717;
  --color-text: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-border: #262626;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-card: #141414;
  --color-card-hover: #1c1c1c;
}
```

**Decision: Class-based dark mode** (`dark` class on `<html>`). Persisted in `localStorage`, respects `prefers-color-scheme` as default. This gives users explicit control.

### Typography Scale

| Token | Size | Usage |
|-------|------|-------|
| `display` | `clamp(3rem, 8vw, 6rem)` | Hero headline |
| `h1` | `clamp(2rem, 5vw, 3.5rem)` | Page titles |
| `h2` | `clamp(1.5rem, 3vw, 2.25rem)` | Section headings |
| `h3` | `clamp(1.25rem, 2vw, 1.75rem)` | Card titles |
| `body` | `1rem (16px)` — `1.125rem (18px)` | Body text |
| `small` | `0.875rem` | Captions, metadata |

**Font pairing:** One variable sans-serif for headings + body (e.g., Inter Variable or Geist). Monospace for code (Geist Mono or JetBrains Mono). Loaded via `next/font`.

### Spacing

Tailwind's default spacing scale. Section vertical padding: `py-24 md:py-32 lg:py-40`. Container max-width: `max-w-7xl`.

### Responsive Breakpoints

Tailwind defaults (mobile-first):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 9. SEO Strategy

| Feature | Implementation |
|---------|---------------|
| Page metadata | Next.js Metadata API in every `page.tsx` and `layout.tsx` |
| Dynamic OG images | `opengraph-image.tsx` using `ImageResponse` (Satori) |
| Sitemap | `app/sitemap.ts` — auto-generated from content |
| Robots | `app/robots.ts` |
| Structured data | JSON-LD for Person, BlogPosting, WebSite schemas |
| Canonical URLs | Set in metadata |
| RSS feed | `app/feed.xml/route.ts` for blog |

Every page exports `metadata` or `generateMetadata()`:
```ts
export const metadata: Metadata = {
  title: 'Projects — Shaeel Afsar',
  description: '...',
  openGraph: { ... },
};
```

---

## 10. Performance Plan

| Technique | Details |
|-----------|---------|
| Static Generation | All pages built at build time via `generateStaticParams` |
| Image Optimization | `next/image` with blur placeholders, AVIF/WebP, responsive `sizes` |
| Font Optimization | `next/font` with `display: swap`, subset, preload |
| Code Splitting | Automatic via Next.js — animation components lazy-loaded |
| Bundle Analysis | `@next/bundle-analyzer` for monitoring |
| Core Web Vitals | Target: LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| Caching | `use cache` directive on content-heavy Server Components |
| Prefetching | Next.js `<Link>` auto-prefetch for internal navigation |

---

## 11. Deployment

**Platform:** Vercel

- Auto-deploy from `main` branch
- Preview deployments on PRs
- Environment variables for contact form endpoint
- Vercel Analytics + Speed Insights enabled
- Custom domain configuration

---

## 12. Development Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Branch strategy:** `main` (production), feature branches (`feat/home-page`, `feat/blog-system`)
- **PR flow:** Feature branch → PR → Deckard review → merge to `main`
- **File naming:** kebab-case for all files (`project-card.tsx`, not `ProjectCard.tsx`)
- **Exports:** Named exports (not default) for components; default export only for `page.tsx` and `layout.tsx`
- **Component files:** One component per file
- **`cn()` utility:** Use `clsx` + `tailwind-merge` for conditional class names

---

## Appendix: Key Dependencies

```json
{
  "next": "^16.0.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "^5.8.0",
  "tailwindcss": "^4.0.0",
  "motion": "^12.0.0",
  "lenis": "^1.2.0",
  "next-mdx-remote": "^5.0.0",
  "rehype-pretty-code": "^0.14.0",
  "rehype-slug": "^6.0.0",
  "remark-gfm": "^4.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^3.0.0",
  "zod": "^3.24.0",
  "shiki": "^3.0.0"
}
```
