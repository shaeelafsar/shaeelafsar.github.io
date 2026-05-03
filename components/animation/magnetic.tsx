"use client";

import { useEffect, useState, type PointerEvent, type PropsWithChildren } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

export type MagneticProps = PropsWithChildren<{
  strength?: number;
  className?: string;
}>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Magnetic({
  children,
  strength = 0.34,
  className,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.32 });
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.32 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerMode = (event: MediaQueryListEvent) => {
      setIsFinePointer(event.matches);
    };

    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = clamp((event.clientX - centerX) / (rect.width / 2), -1, 1);
    const normalizedY = clamp((event.clientY - centerY) / (rect.height / 2), -1, 1);
    const distance = Math.min(Math.hypot(normalizedX, normalizedY), 1.2);
    const influence = Math.max(0, 1 - distance / 1.2);
    const maxOffset = 72 * strength;

    x.set(normalizedX * maxOffset * influence);
    y.set(normalizedY * maxOffset * influence);
  };

  if (prefersReducedMotion || !isFinePointer) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("transform-gpu motion-safe:transition-transform", className)}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.012 }}
      onBlur={reset}
      onPointerCancel={reset}
      onPointerLeave={reset}
      onPointerMove={handlePointerMove}
    >
      {children}
    </motion.div>
  );
}
