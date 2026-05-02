# Spec: About Page

> **Component:** `app/about/page.tsx` · **Owner:** Rachael

---

## Purpose

Personal about page — who Shaeel is, professional philosophy, technical expertise, and personal interests. Builds trust and personality.

## Page Structure

```
<Section> — Hero/intro
  <Container size="narrow">
    <Heading as="h1">About</Heading>
    <p>Extended bio / introduction</p>
    <OptimizedImage ... />   <!-- Professional photo -->
  </Container>
</Section>

<Section> — Philosophy / what I do
  <Container>
    <Heading as="h2">What I Do</Heading>
    <p>Professional philosophy, approach to work</p>
  </Container>
</Section>

<Section> — Skills / technologies
  <Container>
    <Heading as="h2">Technologies</Heading>
    <SkillsGrid />   <!-- Reuse from resume or dedicated version -->
  </Container>
</Section>

<Section> — Personal interests (optional, adds personality)
  <Container>
    <Heading as="h2">Beyond Code</Heading>
    <p>Hobbies, interests, fun facts</p>
  </Container>
</Section>
```

## Component Type

Server Component. Animation wrappers are Client Components wrapping content.

## Metadata

```ts
export const metadata: Metadata = {
  title: 'About — Shaeel Afsar',
  description: 'Learn more about Shaeel Afsar — developer, builder, ...',
};
```

## Animations

- Each `Section` content wrapped in `FadeIn` for scroll-triggered entrance
- Photo: subtle parallax or scale-on-scroll
- Skills: `StaggerChildren` on skill items

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile (`< md`) | Single column, full-width photo above text, skills in 1-col |
| Tablet (`md`) | Two-column skills grid, photo beside text |
| Desktop (`lg+`) | Full two-column intro layout, 3-col skills grid |

## Accessibility

- Page `<h1>` is "About" (semantic)
- Photo has descriptive `alt` text
- Skills list uses proper list semantics (`<ul>`)
- All sections have heading hierarchy (`h1` → `h2`)
- Focus order follows visual order

## Dependencies

- UI components (1.3) — `Section`, `Container`, `Heading`, `OptimizedImage`
- Animation primitives (1.7) — `FadeIn`, `StaggerChildren`
- Skills grid may be shared with resume page (or a separate instance)

## Acceptance Criteria

1. Page renders at `/about` with correct metadata (title, description)
2. Four sections render: intro/bio, philosophy, technologies, personal interests
3. Professional photo loads with blur placeholder via `next/image`
4. Each section animates in on scroll via `FadeIn`
5. Skills/technologies use `StaggerChildren` for entrance
6. Content is immediately accessible (not hidden behind animations)
7. Page is fully responsive per breakpoint table
8. Dark mode: all text, backgrounds, and images look correct
9. `prefers-reduced-motion` shows all content without animation
10. No horizontal overflow at any viewport width
