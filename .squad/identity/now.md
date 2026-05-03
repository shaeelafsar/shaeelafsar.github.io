# Current State — Personal Website

## Last Session
- **Date:** 2026-05-03
- **User:** Shaeel Afsar
- **Focus:** UI bug fixes, responsive polish, domain rename

## Live Site
- **URL:** https://shaeelafsar.github.io/
- **Repo:** shaeelafsar/shaeelafsar.github.io (was personal-website, renamed)
- **Branch:** master
- **Deploy:** GitHub Actions → GitHub Pages (auto on push)

## Tech Stack
- Next.js 16 (App Router, static export via `output: 'export'`)
- TypeScript (strict mode), pnpm package manager
- Tailwind CSS v4 (responsive breakpoints: sm/md/lg/xl)
- Framer Motion / Motion v12 (`motion/react` imports)
- MDX via `next-mdx-remote` for blog
- Playwright for E2E testing

## Architecture Decisions (Key)
- NEVER use `<style jsx>` — broken with Turbopack. Use Tailwind or globals.css.
- Dark-first cyberpunk neon theme (design tokens in globals.css)
- All content statically generated — no CMS, no SSR
- Contact form: Formspree + mailto fallback (no server actions)
- `next/image` with `unoptimized: true` for static export
- GlitchText uses JS matchMedia for mobile detection (not CSS media queries)
- Profile avatar: "SA" placeholder — user will add photo as public/images/profile.jpg

## Content
- Real professional data from Shaeel's career:
  - Lead SWE at United Airlines (Aug 2023–present)
  - SDE at Amazon AWS Security (Dec 2021–Mar 2023)
  - SWE at UnitedHealth Group/Optum (Jun 2019–Dec 2021)
  - BS CS, DePaul University (March 2019)
- Backend-focused messaging (Java, Spring Boot, AWS, Kubernetes, microservices)
- 5 real projects, 1 blog post, full resume timeline
- GitHub: shaeelafsar (primary), shaqsinc22
- LinkedIn: https://www.linkedin.com/in/shaeel-afsar/

## Pages
- Home (hero, featured projects, stats, CTA)
- About (bio, skills, terminal snippet)
- Projects (filterable grid, 5 projects)
- Blog (MDX-powered, 1 post)
- Resume (timeline, skills, education)
- Contact (Formspree + mailto)

## Known Issues / Future Work
- Profile photo: placeholder "SA" — swap to public/images/profile.jpg
- Custom domain: user opted for free GitHub Pages URL for now
- Formspree: not yet configured (currently mailto fallback only)
- Blog: only 1 post — add more content
- Port 3000 often in use locally — dev server auto-switches to 3001

## Test Coverage
- 39 E2E Playwright tests (live site)
- 42 responsive viewport tests (localhost, 4 breakpoints)
- Vitest unit tests (pre-existing)

## Key Files
- `app/globals.css` — ALL design tokens, neon colors, glow utilities
- `components/effects/GlitchText.tsx` — JS-based mobile detection
- `components/home/hero.tsx` — Main hero with avatar, effects
- `components/layout/header.tsx` — Navigation, mobile menu trigger
- `components/layout/mobile-menu.tsx` — Portal-based mobile menu
- `components/ui/profile-avatar.tsx` — Neon SA placeholder
- `next.config.ts` — Static export, allowedDevOrigins
- `.github/workflows/deploy.yml` — GitHub Pages deploy
- `content/resume.json` — All resume data
- `lib/metadata.ts` — Site config, URLs, social links
