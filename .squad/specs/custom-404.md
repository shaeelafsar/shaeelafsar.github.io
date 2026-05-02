# Spec: Custom 404 Page

> **File:** `app/not-found.tsx` · **Owner:** Rachael

---

## Purpose

Branded 404 page that maintains site identity and helps users find their way back. Replaces the default Next.js 404 page.

## Component Type

**Server Component** (default export).

## Props / Interfaces

```ts
// Standard Next.js not-found page — no props
export default function NotFound(): JSX.Element;
```

## Implementation Details

```tsx
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container className="text-center">
        <p className="text-[var(--color-accent)] text-lg font-mono mb-4">404</p>
        <Heading as="h1" size="xl">Page not found</Heading>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">Go Home</Button>
          <Button href="/projects" variant="outline">View Projects</Button>
        </div>
      </Container>
    </Section>
  );
}
```

### Key Design Elements

- Large "404" in monospace accent color
- Clear heading: "Page not found"
- Helpful description
- Two CTAs: back to home (primary) and view projects (secondary)
- Vertically centered in viewport
- Maintains header/footer from root layout

---

## Animation Requirements

- `FadeIn` on the content block (subtle entrance if navigated to)
- No complex animations — this is a functional page

## Responsive Behavior

| Breakpoint | Layout |
|-----------|--------|
| Mobile | Stacked buttons, full-width |
| Desktop | Side-by-side buttons, centered |

## Accessibility

- `<h1>` contains "Page not found" (not "404")
- Buttons are descriptive links
- No disorienting animations

## Dependencies

- UI components (1.3) — `Section`, `Container`, `Heading`, `Button`

## Acceptance Criteria

1. Navigating to a non-existent route shows the custom 404 page
2. Header and footer remain visible
3. "Go Home" button navigates to `/`
4. "View Projects" button navigates to `/projects`
5. Page is properly centered vertically
6. Works correctly in both light and dark mode
7. No metadata needed (404 pages are not indexed)
