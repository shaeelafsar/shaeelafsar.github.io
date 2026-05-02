# Spec: MDX Components

> **File:** `components/blog/mdx-components.tsx` · **Owner:** Rachael

---

## Purpose

Custom component map for MDX rendering. Replaces default HTML elements with styled, accessible, design-system-aligned components. Used by both blog posts and project case studies.

## Component Type

**Server Component** (the component map itself). Individual custom components within the map may be Server or Client.

## Props / Interfaces

```ts
import type { MDXComponents } from 'mdx/types';

// The component map passed to MDX compilation
export function getMDXComponents(): MDXComponents;
```

## Implementation Details

### Component Map

```tsx
import { OptimizedImage } from '@/components/ui/image';
import Link from 'next/link';

export function getMDXComponents(): MDXComponents {
  return {
    h2: ({ children, id, ...props }) => (
      <h2 id={id} className="group scroll-mt-24 text-[var(--font-size-lg)] font-bold mt-12 mb-4" {...props}>
        <a href={`#${id}`} className="no-underline hover:underline" aria-label={`Link to ${children}`}>
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity">#</span>
        </a>
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3 id={id} className="group scroll-mt-24 text-[var(--font-size-md)] font-semibold mt-8 mb-3" {...props}>
        <a href={`#${id}`} className="no-underline hover:underline" aria-label={`Link to ${children}`}>
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-50 transition-opacity">#</span>
        </a>
      </h3>
    ),
    p: (props) => <p className="text-[var(--font-size-body)] leading-relaxed mb-6 text-[var(--color-text)]" {...props} />,
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline underline-offset-4 hover:text-[var(--color-accent-hover)]" {...props}>{children}</a>;
      }
      return <Link href={href || '#'} className="text-[var(--color-accent)] underline underline-offset-4 hover:text-[var(--color-accent-hover)]" {...props}>{children}</Link>;
    },
    img: ({ src, alt, width, height, ...props }) => (
      <figure className="my-8">
        <OptimizedImage
          src={src || ''}
          alt={alt || ''}
          width={Number(width) || 800}
          height={Number(height) || 450}
          className="rounded-lg"
        />
        {alt && <figcaption className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">{alt}</figcaption>}
      </figure>
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-6 my-6 italic text-[var(--color-text-secondary)]" {...props} />
    ),
    ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
    li: (props) => <li className="text-[var(--font-size-body)] leading-relaxed" {...props} />,
    hr: () => <hr className="my-12 border-[var(--color-border)]" />,
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    ),
    th: (props) => <th className="border-b-2 border-[var(--color-border)] px-4 py-2 font-semibold" {...props} />,
    td: (props) => <td className="border-b border-[var(--color-border)] px-4 py-2" {...props} />,
    pre: (props) => (
      <pre className="my-6 rounded-lg overflow-x-auto p-4 text-sm leading-relaxed" {...props} />
    ),
    code: ({ children, className, ...props }) => {
      // Inline code (no className from rehype-pretty-code)
      if (!className) {
        return <code className="bg-[var(--color-bg-secondary)] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
      }
      // Block code (has className from rehype-pretty-code)
      return <code className={className} {...props}>{children}</code>;
    },
    Callout,
  };
}
```

### Custom `Callout` Component

```tsx
interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
}

function Callout({ children, type = 'info', title }: CalloutProps) {
  const styles = {
    info: { border: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', icon: 'ℹ️' },
    warning: { border: 'border-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950/30', icon: '⚠️' },
    tip: { border: 'border-green-500', bg: 'bg-green-50 dark:bg-green-950/30', icon: '💡' },
    danger: { border: 'border-red-500', bg: 'bg-red-50 dark:bg-red-950/30', icon: '🚨' },
  };
  const s = styles[type];

  return (
    <aside className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} p-4`} role="note">
      {title && <p className="font-semibold mb-1">{s.icon} {title}</p>}
      <div>{children}</div>
    </aside>
  );
}
```

### Syntax Highlighting

Handled by `rehype-pretty-code` + Shiki in the MDX compilation pipeline (`lib/mdx.ts`):
- **Theme:** `one-dark-pro` (both modes work well, or use dual themes: `github-dark` / `github-light`)
- **Line numbers:** Enabled via CSS, not inline
- **Line highlighting:** Support `{1,3-5}` syntax for highlighting specific lines
- **Copy button:** Optional — can be added as Client Component enhancement in Phase 4

### `scroll-mt-24` on Headings

All heading IDs get `scroll-mt-24` to offset for the fixed header when navigating via anchor links or TOC clicks.

---

## Responsive Behavior

- Code blocks scroll horizontally on mobile (no wrapping)
- Tables scroll horizontally in a wrapper
- Images are full-width on mobile, constrained on desktop
- Callouts are full-width with responsive padding

## Accessibility

- Heading anchor links have `aria-label` for screen readers
- External links marked with `rel="noopener noreferrer"` and open in new tab
- Images always have `alt` text (figcaption serves as visible caption)
- Callouts use `role="note"` for screen reader semantics
- Code blocks use `<pre>` + `<code>` semantically
- Tables are properly structured with `<th>` headers

## Animation Requirements

None — MDX content does not animate individually. The parent `FadeIn` on the content section handles entrance.

## Dependencies

- `rehype-pretty-code` and `shiki` (installed in 1.1)
- `rehype-slug` (installed in 1.1) — generates heading IDs
- `remark-gfm` (installed in 1.1) — tables, strikethrough, task lists
- Content pipeline (1.8) — `compileMDXContent()` uses this component map
- `OptimizedImage` from UI components (1.3)

## Acceptance Criteria

1. All standard MDX elements (h2, h3, p, a, img, ul, ol, blockquote, code, table) render with custom styles
2. Headings have clickable anchor links with `#` indicator on hover
3. External links open in new tab with security attributes
4. Internal links use Next.js `<Link>` for client-side navigation
5. Inline code has background pill styling, block code has full syntax highlighting
6. Images render via `next/image` with optimization and blur placeholder
7. `<Callout>` component renders with correct variant styling (info/warning/tip/danger)
8. Code blocks support line highlighting (`{1,3-5}`)
9. All elements maintain consistent spacing (vertical rhythm)
10. Tables scroll horizontally on mobile without breaking layout
11. Dark mode: all elements look correct with dark theme tokens
