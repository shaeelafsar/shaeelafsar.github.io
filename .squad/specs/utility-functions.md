# Spec: Utility Functions

> **Files:** `lib/utils.ts`, `lib/metadata.ts` · **Owner:** Rachael

---

## Purpose

Shared utility functions used across the application. `lib/utils.ts` provides general helpers. `lib/metadata.ts` provides SEO metadata construction helpers.

## Component Type

N/A — pure functions, no React components.

## Implementation Details

### `lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string to a human-readable format.
 * @example formatDate('2026-04-15') → 'April 15, 2026'
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate reading time from raw text content.
 * @returns Reading time in minutes (rounded up, minimum 1)
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Generate a URL-safe slug from a string.
 * @example slugify('Hello World!') → 'hello-world'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncate text to a specified length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Get unique values from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Absolute URL from a relative path.
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shaeelafsar.com';
  return `${baseUrl}${path}`;
}
```

### `lib/metadata.ts`

```ts
import type { Metadata } from 'next';
import { absoluteUrl } from './utils';

export const siteConfig = {
  name: 'Shaeel Afsar',
  url: 'https://shaeelafsar.com',
  description: 'Personal website of Shaeel Afsar — developer, builder.',
  ogImage: '/images/og-default.jpg',
} as const;

/**
 * Construct consistent metadata for any page.
 * Merges page-specific values with site defaults.
 */
export function constructMetadata(params: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, image, noIndex } = params;

  return {
    title: title,
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(image || siteConfig.ogImage) }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [absoluteUrl(image || siteConfig.ogImage)],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
```

---

## Responsive Behavior

N/A — utility functions.

## Accessibility

N/A — utility functions.

## Animation Requirements

N/A — utility functions.

## Dependencies

- `clsx` and `tailwind-merge` packages (installed in 1.1)

## Acceptance Criteria

1. `cn()` correctly merges conflicting Tailwind classes (e.g., `cn('px-4', 'px-6')` → `'px-6'`)
2. `cn()` handles conditional classes (e.g., `cn('base', isActive && 'active')`)
3. `formatDate()` produces "Month Day, Year" format for valid ISO dates
4. `calculateReadingTime()` returns minimum 1 minute for short text
5. `calculateReadingTime()` returns correct estimate (e.g., 1000 words → 5 min)
6. `slugify()` handles special characters, spaces, and multiple hyphens
7. `absoluteUrl()` prepends site URL to relative paths
8. `constructMetadata()` returns valid Next.js `Metadata` object
9. `constructMetadata()` falls back to site defaults when params are omitted
10. All functions are pure (no side effects) and fully typed (no `any`)
11. All functions have JSDoc documentation
