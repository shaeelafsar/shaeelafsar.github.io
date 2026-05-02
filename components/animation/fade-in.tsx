"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
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

function useResponsiveDistance(distance: number) {
  const [resolvedDistance, setResolvedDistance] = useState(() => {
    if (typeof window === "undefined") {
      return distance;
    }

    return window.matchMedia("(max-width: 767px)").matches ? Math.min(distance, 20) : distance;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDistance = () => {
      setResolvedDistance(mediaQuery.matches ? Math.min(distance, 20) : distance);
    };

    updateDistance();
    mediaQuery.addEventListener("change", updateDistance);

    return () => {
      mediaQuery.removeEventListener("change", updateDistance);
    };
  }, [distance]);

  return resolvedDistance;
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
  const resolvedDistance = useResponsiveDistance(distance);

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const { x, y } = getDirectionalOffset(direction, resolvedDistance);

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}
