"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD, TEXT_STAGGER } from "./tokens";

export type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  neonTrail?: boolean;
};

function getWordVariants(neonTrail: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: "100%",
      filter: neonTrail ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: "0%",
      filter: "blur(0px)",
      transition: {
        duration: DURATION_ENTER,
        ease: EASE_STANDARD,
      },
    },
  };
}

const glowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    scaleX: 0.84,
    filter: "blur(16px)",
  },
  visible: {
    opacity: [0, 0.72, 0],
    y: ["100%", "14%", "0%"],
    scaleX: [0.84, 1.02, 1.12],
    filter: ["blur(16px)", "blur(10px)", "blur(18px)"],
    transition: {
      duration: DURATION_ENTER * 1.05,
      ease: EASE_STANDARD,
    },
  },
};

export function TextReveal({
  children,
  className,
  delay = 0,
  neonTrail = false,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.trim().split(/\s+/);
  const wordVariants = getWordVariants(neonTrail);

  if (prefersReducedMotion) {
    return <span className={cn(className)}>{children}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        className="inline-flex flex-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: delay,
              staggerChildren: TEXT_STAGGER,
            },
          },
        }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            aria-hidden="true"
            className="relative mr-[0.25em] inline-flex overflow-hidden"
          >
            {neonTrail ? (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 inline-block text-cyan-300/70 [text-shadow:0_0_18px_rgba(34,211,238,0.45),0_0_32px_rgba(244,114,182,0.24)]"
                variants={glowVariants}
              >
                {word}
              </motion.span>
            ) : null}
            <motion.span className="relative inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
