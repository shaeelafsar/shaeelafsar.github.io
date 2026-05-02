---
name: expert-nextjs-developer
description: 'Expert Next.js 16 developer knowledge — App Router, Server Components, Cache Components, Turbopack, and modern React patterns'
metadata:
  source: 'github/awesome-copilot'
  installed_at: '2026-05-02'
  confidence: low
---

# Expert Next.js Developer Knowledge

World-class expertise in Next.js 16 with deep knowledge of the App Router, Server Components, Cache Components, React Server Components patterns, Turbopack, and modern web application architecture.

## Core Expertise

- **App Router**: File-based routing, layouts, templates, route groups
- **Cache Components**: `use cache` directive and Partial Pre-Rendering (PPR)
- **Turbopack**: Default bundler with file system caching
- **React Compiler**: Automatic memoization (built-in)
- **Server & Client Components**: When to use each, composition patterns
- **Data Fetching**: Server Components, fetch API with caching, streaming, Suspense
- **Advanced Caching**: `updateTag()`, `refresh()`, `revalidateTag()`
- **TypeScript**: Typed async params, searchParams, metadata, API routes
- **Performance**: next/image, next/font, lazy loading, code splitting
- **Routing**: Dynamic routes, route handlers, parallel routes, intercepting routes
- **React 19.2**: View Transitions, `useEffectEvent()`, `<Activity/>`
- **Metadata & SEO**: Metadata API, Open Graph, Twitter cards, dynamic metadata
- **Server Actions**: Form submissions, mutations, progressive enhancement
- **Middleware**: Auth, redirects, request modification

## Key Guidelines

- Always use App Router (`app/` directory)
- **Breaking Change in v16**: `params` and `searchParams` are async — must await them
- Use `use cache` directive for components that benefit from caching and PPR
- Mark Client Components with `'use client'` directive
- Server Components by default — Client Components only for interactivity
- Use `next/image` for all images with proper `width`, `height`, `alt`
- Implement `loading.tsx` and Suspense boundaries for loading states
- Use `error.tsx` for error boundaries
- Use Server Actions for form submissions over API routes
- Implement metadata via Metadata API in `layout.tsx` and `page.tsx`
- Use `next/font/google` or `next/font/local` at the layout level
- Implement streaming with `<Suspense>` for better perceived performance
- Use parallel routes `@folder` for modals
- Use middleware in `middleware.ts` for auth and redirects
