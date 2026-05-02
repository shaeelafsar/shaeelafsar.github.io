# Spec: Project Scaffold & Configuration

> **Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `.env.local`, `.eslintrc.json` · **Owner:** Rachael

---

## Purpose

Initialize the Next.js 16 project with all dependencies, tooling, and configuration. This is work item 1.1 — everything else depends on it.

## Component Type

N/A — configuration only.

## Implementation Details

### Project Initialization

```bash
pnpm create next-app@latest personal-website --typescript --tailwind --eslint --app --src=false --import-alias "@/*"
```

### Dependencies

**Core:**
- `next` (v16+)
- `react`, `react-dom` (v19+)
- `typescript` (v5.5+)

**Styling & UI:**
- `tailwindcss` (v4)
- `clsx`
- `tailwind-merge`

**Animation:**
- `motion` (v12 — the `framer-motion` rebrand)
- `@studio-freight/lenis`

**Content:**
- `next-mdx-remote`
- `gray-matter`
- `rehype-pretty-code`
- `rehype-slug`
- `remark-gfm`
- `shiki`

**Forms & Validation:**
- `zod`
- `react-hook-form`
- `@hookform/resolvers`

**SEO:**
- `@vercel/og` (Satori-based OG image generation)

**Dev Dependencies:**
- `@types/node`, `@types/react`, `@types/react-dom`
- `eslint`, `eslint-config-next`
- `prettier`, `prettier-plugin-tailwindcss`
- `@next/bundle-analyzer`

### `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    viewTransitions: true,
    mdxRs: false, // We use next-mdx-remote, not @next/mdx
  },
};

export default nextConfig;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `.env.local`

```env
# Contact form endpoint (Resend or Formspree)
CONTACT_FORM_ENDPOINT=

# Site URL (used in metadata, OG images, sitemap)
NEXT_PUBLIC_SITE_URL=https://shaeelafsar.com
```

### `tailwind.config.ts`

Tailwind v4 uses CSS-native config. A minimal `tailwind.config.ts` is only needed for content paths if not auto-detected:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
};

export default config;
```

### ESLint Configuration

Extend `eslint-config-next` with strict TypeScript rules. No custom rules beyond what Next.js provides.

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Directory Scaffolding

Create all directories from architecture.md section 3:

```
app/
components/layout/
components/ui/
components/animation/
components/home/
components/projects/
components/blog/
components/resume/
components/contact/
content/blog/
content/projects/
lib/
types/
public/images/
```

---

## Responsive Behavior

N/A — configuration only.

## Accessibility

N/A — configuration only.

## Animation Requirements

N/A — configuration only.

## Dependencies

None — this is the first work item.

## Acceptance Criteria

1. `pnpm install` succeeds with zero errors
2. `pnpm dev` starts the dev server with Turbopack
3. `pnpm build` produces a successful production build
4. TypeScript strict mode is enabled and `tsc --noEmit` passes
5. All directories from architecture exist (even if empty with `.gitkeep`)
6. `next.config.ts` has image formats, view transitions enabled
7. All dependencies from the list above are in `package.json`
8. `.env.local.example` exists documenting required env vars
9. Prettier + ESLint configured and `pnpm lint` passes
10. `pnpm format` formats all files without errors
