"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

export interface TypeWriterProps {
  text: string;
  className?: string;
  delay?: number;
  characterDelay?: number;
}

const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.32em",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
};

export function TypeWriter({
  text,
  className,
  delay = 0,
  characterDelay = 0.035,
}: TypeWriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);

  if (prefersReducedMotion) {
    return <span className={cn(className)}>{text}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap items-center", className)}>
      <span className="sr-only">{text}</span>
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
              staggerChildren: characterDelay,
            },
          },
        }}
      >
        {characters.map((character, index) => (
          <motion.span key={`${character}-${index}`} className="inline-block whitespace-pre" variants={characterVariants}>
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.05em] w-px rounded-full bg-current/85 shadow-[0_0_14px_currentColor]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          delay: delay + characters.length * characterDelay,
          duration: 1.05,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </span>
  );
}
