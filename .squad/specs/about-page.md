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

- Mobile: single column, full-width photo
- Desktop: photo floated or in two-column layout with text
