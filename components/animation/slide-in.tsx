"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD } from "./tokens";

export type SlideDirection = "left" | "right";

export type SlideInProps = PropsWithChildren<{
  delay?: number;
  duration?: number;
  direction?: SlideDirection;
  distance?: number;
  rotate?: number;
  className?: string;
}>;

function useResponsiveDistance(distance: number) {
  const [resolvedDistance, setResolvedDistance] = useState(() => {
    if (typeof window === "undefined") {
      return distance;
    }

    return window.matchMedia("(max-width: 767px)").matches ? Math.min(distance, 24) : distance;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDistance = () => {
      setResolvedDistance(mediaQuery.matches ? Math.min(distance, 24) : distance);
    };

    updateDistance();
    mediaQuery.addEventListener("change", updateDistance);

    return () => {
      mediaQuery.removeEventListener("change", updateDistance);
    };
  }, [distance]);

  return resolvedDistance;
}

export function SlideIn({
  children,
  delay = 0,
  duration = DURATION_ENTER,
  direction = "left",
  distance = 40,
  rotate,
  className,
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion();
  const resolvedDistance = useResponsiveDistance(distance);
  const resolvedRotate = rotate ?? (direction === "left" ? -4 : 4);
  const x = direction === "left" ? -resolvedDistance : resolvedDistance;

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x, rotate: resolvedRotate, transformOrigin: "center center" }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}
