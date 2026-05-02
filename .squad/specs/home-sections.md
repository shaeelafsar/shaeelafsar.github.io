# Spec: Home Page Sections

> **Components:** `components/home/featured-projects.tsx`, `about-teaser.tsx`, `blog-teaser.tsx`, `cta-section.tsx` · **Owner:** Rachael

---

## Purpose

The home page below the hero has four content sections that showcase work, personality, writing, and a call to action. Together with the hero, they form the full home page experience. This is work item 2.2.

## Component Type

All four sections are **Server Components**. Animation wrappers (`FadeIn`, `StaggerChildren`) are Client Components wrapping server-rendered content.

---

## `FeaturedProjects` (`components/home/featured-projects.tsx`)

### Props / Interfaces

```ts
// No props — fetches featured projects internally
```

### Implementation

```tsx
import { getFeaturedProjects } from '@/lib/projects';

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(); // top 3 featured
  return (
    <Section>
      <Container>
        <FadeIn>
          <Heading as="h2">Selected Work</Heading>
          <p className="text-[var(--color-text-secondary)]">
            A few projects I'm proud of.
          </p>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </StaggerChildren>
        <FadeIn>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline">View All Projects</Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
```

### Data

Fetches top 3 featured projects (where `featured: true`) from `lib/projects.ts`, sorted by date.

### Animation

- Section heading: `FadeIn` (default up direction)
- Project cards: `StaggerChildren` with 100ms stagger
- "View All" button: `FadeIn` after cards

---

## `AboutTeaser` (`components/home/about-teaser.tsx`)

### Props / Interfaces

```ts
// No props — content is hardcoded
```

### Implementation

Two-column layout on desktop: text left, image/illustration right.

```tsx
export function AboutTeaser() {
  return (
    <Section className="bg-[var(--color-bg-secondary)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <Heading as="h2">About Me</Heading>
            <p>2-3 sentences about Shaeel — professional identity, what drives them.</p>
            <Button href="/about" variant="ghost" className="mt-6">
              Learn More →
            </Button>
          </FadeIn>
          <FadeIn direction="right">
            <OptimizedImage src="/images/about-preview.jpg" alt="Shaeel Afsar" width={600} height={400} />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
```

### Animation

- Text block: `FadeIn direction="left"`
- Image: `FadeIn direction="right"`
- Creates a converging visual effect on scroll

---

## `BlogTeaser` (`components/home/blog-teaser.tsx`)

### Props / Interfaces

```ts
// No props — fetches latest posts internally
```

### Implementation

```tsx
import { getAllPosts } from '@/lib/blog';

export async function BlogTeaser() {
  const posts = (await getAllPosts()).slice(0, 3); // Latest 3
  return (
    <Section>
      <Container>
        <FadeIn>
          <Heading as="h2">Latest Writing</Heading>
          <p className="text-[var(--color-text-secondary)]">Thoughts on code, design, and building.</p>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </StaggerChildren>
        <FadeIn>
          <div className="mt-12 text-center">
            <Button href="/blog" variant="outline">Read the Blog</Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
```

### Data

Fetches latest 3 published posts from `lib/blog.ts`, sorted by date desc.

### Animation

Same pattern as Featured Projects — heading `FadeIn`, cards `StaggerChildren`, CTA `FadeIn`.

---

## `CTASection` (`components/home/cta-section.tsx`)

### Props / Interfaces

```ts
// No props — content is hardcoded
```

### Implementation

Full-width section with centered text and prominent CTA. This is the final push to contact.

```tsx
export function CTASection() {
  return (
    <Section className="bg-[var(--color-accent)] text-white">
      <Container className="text-center">
        <FadeIn>
          <Heading as="h2" className="text-white">Let's Work Together</Heading>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            I'm always interested in new projects and opportunities.
            Whether you have a question or just want to say hi — reach out.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
```

### Animation

- Entire content block: single `FadeIn` from below
- Consider subtle floating/pulse accent in background (Pris can enhance in Phase 4)

---

## Home Page Assembly (`app/page.tsx`)

```tsx
import { Hero } from '@/components/home/hero';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { AboutTeaser } from '@/components/home/about-teaser';
import { BlogTeaser } from '@/components/home/blog-teaser';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutTeaser />
      <BlogTeaser />
      <CTASection />
    </>
  );
}
```

---

## Responsive Behavior

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Featured Projects | 1-col stack | 2-col grid | 3-col grid |
| About Teaser | Stacked (text above image) | Stacked | 2-col side-by-side |
| Blog Teaser | 1-col stack | 2-col grid | 3-col grid |
| CTA | Centered, full-width | Same | Same |

## Accessibility

- Each section uses semantic `<section>` element (via `Section` component)
- Section headings are `<h2>` (single `<h1>` is in the Hero)
- All links are descriptive ("View All Projects", not "Click here")
- Images have meaningful `alt` text
- CTA section: ensure white text on accent background meets WCAG AA contrast (4.5:1 minimum)

## Dependencies

- Hero section (2.1)
- UI components (1.3) — `Button`, `Section`, `Container`, `Heading`, `OptimizedImage`
- Content pipeline (1.8) — `getFeaturedProjects()`, `getAllPosts()`
- Blog and project components — `PostCard`, `ProjectCard`
- Animation primitives (1.7) — `FadeIn`, `StaggerChildren`

## Acceptance Criteria

1. Home page renders all 5 sections in order: Hero → Featured Projects → About Teaser → Blog Teaser → CTA
2. Featured projects section shows exactly 3 featured projects (or fewer if less exist)
3. Blog teaser shows exactly 3 latest published posts (or fewer if less exist)
4. All "View All" / CTA links navigate to correct pages
5. Sections animate in on scroll (each triggered independently via `whileInView`)
6. About teaser image loads with blur placeholder
7. CTA section has accessible color contrast (white on accent)
8. All sections are responsive per the breakpoint table above
9. Page loads with no layout shift (CLS = 0)
10. `generateMetadata` or static `metadata` export exists on `app/page.tsx`
