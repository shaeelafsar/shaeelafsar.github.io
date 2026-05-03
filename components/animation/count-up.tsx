"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.1,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(from);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const nextValue = from + (to - from) * easedProgress;
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, from, isInView, prefersReducedMotion, to]);

  const resolvedValue = prefersReducedMotion ? to : displayValue;
  const roundedValue = decimals > 0 ? Number(resolvedValue.toFixed(decimals)) : Math.round(resolvedValue);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {formatter.format(roundedValue)}
      {suffix}
    </span>
  );
}
