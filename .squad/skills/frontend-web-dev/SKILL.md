---
name: frontend-web-dev
description: 'Frontend web development best practices for React, TypeScript, and CSS frameworks'
metadata:
  source: 'github/awesome-copilot (plugin)'
  installed_at: '2026-05-02'
  confidence: low
---

# Frontend Web Development

Essential patterns and practices for modern frontend web development.

## Included Capabilities

- React 19.2 best practices (hooks, Server Components, Actions)
- TypeScript strict patterns for frontend
- CSS framework integration (Tailwind CSS)
- Playwright E2E test generation
- Website exploration for testing

## React Best Practices

- Server Components by default, Client Components for interactivity
- Use modern hooks: `useOptimistic`, `useFormStatus`, `useTransition`
- Progressive enhancement — work without JavaScript, enhance with it
- Proper Suspense boundaries for streaming
- TypeScript types for all props and state

## Performance Patterns

- Only animate `transform` and `opacity`
- Code split with dynamic imports
- Optimize images with next/image
- Implement proper caching strategies
- Monitor Core Web Vitals (LCP, FID, CLS)

## Testing Strategy

- Component tests with React Testing Library
- E2E tests with Playwright for critical flows
- Visual regression testing for design consistency
- Accessibility testing (axe-core integration)

## Source

Plugin from [Awesome Copilot](https://github.com/github/awesome-copilot) — `plugins/frontend-web-dev`
