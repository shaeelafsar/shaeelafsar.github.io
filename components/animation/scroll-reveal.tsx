"use client";

import { useRef, type PropsWithChildren } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD } from "./tokens";

export type ScrollRevealDirection = "up" | "down" | "left" | "right" | "none";

export type ScrollRevealProps = PropsWithChildren<{
  delay?: number;
  duration?: number;
  direction?: ScrollRevealDirection;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}>;

function getDirectionalOffset(direction: ScrollRevealDirection, distance: number) {
  switch (direction) {
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
    case "up":
    default:
      return { x: 0, y: distance };
  }
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = DURATION_ENTER,
  direction = "up",
  distance = 20,
  once = true,
  amount = 0.2,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once, amount });

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const { x, y } = getDirectionalOffset(direction, distance);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}
