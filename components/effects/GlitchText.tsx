"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion || isMobile) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <span className={cn("glitch-wrapper relative inline-grid place-items-center isolate", className)}>
      <span className="relative z-[1] col-start-1 row-start-1">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 col-start-1 row-start-1 opacity-0 mix-blend-screen text-[#67e8f9] [text-shadow:0_0_12px_rgba(103,232,249,0.38)] [.glitch-wrapper:hover_&]:opacity-[0.58] [.glitch-wrapper:hover_&]:animate-[glitch-slice-cyan_700ms_steps(2,end)_1]"
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 col-start-1 row-start-1 opacity-0 mix-blend-screen text-[#f472b6] [text-shadow:0_0_14px_rgba(244,114,182,0.34)] [.glitch-wrapper:hover_&]:opacity-[0.58] [.glitch-wrapper:hover_&]:animate-[glitch-slice-magenta_700ms_steps(2,end)_1]"
      >
        {children}
      </span>
    </span>
  );
}
