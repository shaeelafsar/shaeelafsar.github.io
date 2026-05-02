# Spec: Home Hero Section

> **Component:** `components/home/hero.tsx` · **Owner:** Rachael (impl) + Pris (animation)

## Purpose

Full-viewport hero section — the first thing visitors see. Sets the tone for the entire site. Must feel cinematic and intentional.

## Structure

```
<Section className="h-dvh flex items-center">
  <Container>
    <TextReveal text="Shaeel Afsar" />        <!-- Name/headline -->
    <FadeIn delay={0.5}>
      <p>Tagline / role description</p>       <!-- Subtitle -->
    </FadeIn>
    <FadeIn delay={0.8}>
      <ButtonGroup>                            <!-- CTA buttons -->
        <Button href="/projects">View Work</Button>
        <Button href="/contact" variant="outline">Get in Touch</Button>
      </ButtonGroup>
    </FadeIn>
  </Container>
  <ParallaxAccents />                          <!-- Floating decorative elements -->
</Section>
```

## Component Type

- **`hero.tsx`**: Server Component (shell)
- Animation wrappers (`TextReveal`, `FadeIn`) are Client Components that wrap server-rendered content

## Props / Interfaces

```ts
// No props — content is hardcoded (it's the owner's personal site)
// Animation wrappers accept children
```

## Animation Requirements

| Element | Animation | Timing |
|---------|-----------|--------|
| Headline | Word-by-word reveal (`TextReveal`) | Stagger 0.08s per word, starts on mount |
| Subtitle | Fade up from y:30 | Delay 0.5s after mount |
| CTA buttons | Fade up | Delay 0.8s after mount |
| Background accents | Parallax on scroll | Continuous, speed: 0.3 |
| Entire section | Subtle parallax-out on scroll | Content moves up slightly as user scrolls down |

**Pris:** Use `motion/react` imports. Entry animations trigger on mount (not `whileInView` since this is above the fold). Respect `prefers-reduced-motion`.

## Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (`< md`) | Stack vertically, reduce headline size via `clamp()`, full-width CTAs, hide decorative accents |
| Tablet (`md`) | Headline at medium scale, side-by-side CTAs |
| Desktop (`lg+`) | Full layout with floating accents, max headline size |

## Accessibility

- Headline is an `<h1>`
- CTA buttons are `<a>` (link to pages) or `<button>`
- No essential content hidden by animations — content is in DOM immediately
- Skip-to-content link targets main content below hero
