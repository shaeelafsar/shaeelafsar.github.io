"use client";

import { Children, useEffect, useState, type PropsWithChildren } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

import { DURATION_ENTER, EASE_STANDARD, STAGGER_DEFAULT } from "./tokens";

export type StaggerChildrenProps = PropsWithChildren<{
  staggerDelay?: number;
  className?: string;
  id?: string;
  "data-testid"?: string;
}>;

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

function childVariants(distance: number): Variants {
  return {
    hidden: {
      opacity: 0,
      y: distance,
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
}

function useResponsiveDistance() {
  const [distance, setDistance] = useState(() => {
    if (typeof window === "undefined") {
      return 28;
    }

    return window.matchMedia("(max-width: 767px)").matches ? 18 : 28;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDistance = () => {
      setDistance(mediaQuery.matches ? 18 : 28);
    };

    updateDistance();
    mediaQuery.addEventListener("change", updateDistance);

    return () => {
      mediaQuery.removeEventListener("change", updateDistance);
    };
  }, []);

  return distance;
}

export function StaggerChildren({
  children,
  staggerDelay = STAGGER_DEFAULT,
  className,
  id,
  "data-testid": dataTestId,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();
  const distance = useResponsiveDistance();

  if (prefersReducedMotion) {
    return (
      <div className={cn(className)} id={id} data-testid={dataTestId}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      id={id}
      data-testid={dataTestId}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants(staggerDelay)}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div key={index} variants={childVariants(distance)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
