"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD, TEXT_STAGGER } from "./tokens";

export type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: DURATION_ENTER,
      ease: EASE_STANDARD,
    },
  },
};

export function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = children.trim().split(/\s+/);

  if (prefersReducedMotion) {
    return <span className={cn(className)}>{children}</span>;
  }

  return (
    <motion.span
      aria-label={children}
      className={cn("inline-flex flex-wrap", className)}
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
          className="mr-[0.25em] inline-flex overflow-hidden"
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
