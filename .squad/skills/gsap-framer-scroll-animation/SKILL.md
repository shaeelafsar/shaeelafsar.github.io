---
name: gsap-framer-scroll-animation
description: >-
  Use this skill whenever the user wants to build scroll animations, scroll effects,
  parallax, scroll-triggered reveals, pinned sections, horizontal scroll, text animations,
  or any motion tied to scroll position — in vanilla JS, React, or Next.js.
metadata:
  author: 'Utkarsh Patrikar'
  author_url: 'https://github.com/utkarsh232005'
  source: 'github/awesome-copilot'
  installed_at: '2026-05-02'
  confidence: low
---

# GSAP & Framer Motion — Scroll Animations Skill

Production-grade scroll animations with GitHub Copilot prompts, ready-to-use code recipes, and deep API references.

> **Design Companion:** This skill provides the *technical implementation* for scroll-driven motion.
> For the *creative philosophy*, design principles, and premium aesthetics that should guide **how**
> and **when** to animate, always cross-reference the **premium-frontend-ui** skill.

## Quick Library Selector

| Need | Use |
|---|---|
| Vanilla JS, Webflow, Vue | **GSAP** |
| Pinning, horizontal scroll, complex timelines | **GSAP** |
| React / Next.js, declarative style | **Framer Motion** |
| whileInView entrance animations | **Framer Motion** |
| Both in same Next.js app | See notes in references |

Read the relevant reference file for full recipes and Copilot prompts:

- **GSAP** → `references/gsap.md` — ScrollTrigger API, all recipes, React integration
- **Framer Motion** → `references/framer.md` — useScroll, useTransform, all recipes

## Setup

### GSAP
```bash
npm install gsap
```
```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Framer Motion (Motion v12)
```bash
npm install motion
```
```js
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
```

## The 5 Most Common Scroll Patterns

### 1. Fade-in on enter (Framer Motion — preferred for React/Next.js)
```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6 }}
/>
```

### 2. Scroll-linked (Framer Motion)
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
return <motion.div style={{ y }} />;
```

### 3. Pinned timeline (GSAP)
```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: '.section', pin: true, scrub: 1, start: 'top top', end: '+=200%' }
});
tl.from('.title', { opacity: 0, y: 60 }).from('.img', { scale: 0.85 });
```

## Critical Rules

- **Framer Next.js**: always add `'use client'` at top of files using motion hooks
- **Both**: animate only `transform` and `opacity`
- **Accessibility**: always check `prefers-reduced-motion`
- **GSAP React**: use `useGSAP` from `@gsap/react`, never plain `useEffect`
- **Premium polish**: follow the **premium-frontend-ui** skill principles

## Reference Files

| File | Contents |
|---|---|
| `references/gsap.md` | Full ScrollTrigger API reference, 10 recipes, React integration |
| `references/framer.md` | Full useScroll / useTransform API, 8 recipes, Motion v12 notes |
