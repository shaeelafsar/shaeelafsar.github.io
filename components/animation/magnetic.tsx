"use client";

import type { MouseEvent, PropsWithChildren } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";

export type MagneticProps = PropsWithChildren<{
  strength?: number;
  className?: string;
}>;

export function Magnetic({
  children,
  strength = 0.3,
  className,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 20, mass: 0.4 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = ((event.clientX - centerX) / rect.width) * 60 * strength;
    const offsetY = ((event.clientY - centerY) / rect.height) * 60 * strength;

    x.set(offsetX);
    y.set(offsetY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("motion-safe:transition-transform", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handlePointerMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.div>
  );
}
