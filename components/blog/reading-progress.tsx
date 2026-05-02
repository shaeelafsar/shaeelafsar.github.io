"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    damping: prefersReducedMotion ? 1000 : 30,
    stiffness: prefersReducedMotion ? 1000 : 180,
    mass: 0.2,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-reading-progress)] h-1 bg-transparent"
      data-testid="reading-progress"
    >
      <motion.div
        className="h-full origin-left bg-accent shadow-[0_0_16px_var(--color-accent-glow)]"
        style={{ scaleX }}
      />
    </div>
  );
}
