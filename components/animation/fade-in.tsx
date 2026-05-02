"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { DEFAULT_DISTANCE, DURATION_ENTER, EASE_STANDARD } from "./tokens";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

export type FadeInProps = PropsWithChildren<{
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
  distance?: number;
  className?: string;
}>;

function getDirectionalOffset(direction: FadeDirection, distance: number) {
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

export function FadeIn({
  children,
  delay = 0,
  duration = DURATION_ENTER,
  direction = "up",
  distance = DEFAULT_DISTANCE,
  className,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const { x, y } = getDirectionalOffset(direction, distance);

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}
