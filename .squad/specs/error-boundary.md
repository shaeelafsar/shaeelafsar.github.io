# Spec: Error Boundary

> **File:** `app/error.tsx` · **Owner:** Rachael

---

## Purpose

Graceful error display when an unhandled exception occurs during rendering. Provides retry functionality and prevents the entire app from crashing.

## Component Type

**Client Component** (`'use client'` — required by Next.js for error boundaries).

## Props / Interfaces

```ts
// Standard Next.js error page signature
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element;
```

## Implementation Details

```tsx
'use client';

import { useEffect } from 'react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (and optionally to error tracking service)
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container className="text-center">
        <p className="text-red-500 text-lg font-mono mb-4">Error</p>
        <Heading as="h1" size="xl">Something went wrong</Heading>
        <p className="mt-4 text-[var(--color-text-secondary)] max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-6 p-4 bg-[var(--color-bg-secondary)] rounded-lg text-sm text-left overflow-x-auto max-w-2xl mx-auto font-mono">
            {error.message}
          </pre>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">Try Again</Button>
          <Button href="/" variant="outline">Go Home</Button>
        </div>
      </Container>
    </Section>
  );
}
```

### Key Behaviors

- **Error logging:** `console.error` in `useEffect` — extensible to external services (Sentry, etc.)
- **Dev mode:** Shows error message in a `<pre>` block for debugging
- **Production:** Hides error details, shows friendly message only
- **Reset:** `reset()` re-renders the route segment, clearing the error
- **Fallback navigation:** "Go Home" link if reset doesn't work

---

## Animation Requirements

None — error pages should render instantly without delay.

## Responsive Behavior

| Breakpoint | Layout |
|-----------|--------|
| Mobile | Stacked buttons, full-width, error message scrollable horizontally |
| Desktop | Side-by-side buttons, centered layout |

## Accessibility

- `<h1>` with clear error description
- Error message (in dev mode) in a `<pre>` for screen readers
- "Try Again" button has clear action description
- Focus management: auto-focus on the heading or first actionable element

## Dependencies

- UI components (1.3) — `Section`, `Container`, `Heading`, `Button`
- Must be a Client Component (Next.js requirement)

## Acceptance Criteria

1. Unhandled rendering errors show this page instead of crashing
2. "Try Again" button calls `reset()` and re-renders the segment
3. "Go Home" navigates to `/`
4. Error message is visible in development mode
5. Error message is hidden in production mode
6. Header and footer remain visible (root layout is not affected)
7. Error is logged to console via `useEffect`
8. Works in both light and dark mode
9. Layout matches 404 page style for visual consistency
