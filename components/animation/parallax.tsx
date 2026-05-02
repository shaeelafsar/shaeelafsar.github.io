"use client";

import { useRef, type PropsWithChildren } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

export type ParallaxProps = PropsWithChildren<{
  speed?: number;
  className?: string;
}>;

export function Parallax({
  children,
  speed = 0.5,
  className,
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const distance = speed * 100;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
