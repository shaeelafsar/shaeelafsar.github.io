"use client";

import { Children, type PropsWithChildren } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD, STAGGER_DEFAULT } from "./tokens";

export type StaggerChildrenProps = PropsWithChildren<{
  staggerDelay?: number;
  className?: string;
}>;

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_ENTER,
      ease: EASE_STANDARD,
    },
  },
};

export function StaggerChildren({
  children,
  staggerDelay = STAGGER_DEFAULT,
  className,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants(staggerDelay)}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
