"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <span className={cn("glitch-text relative inline-grid place-items-center", className)}>
      <span className="relative z-[1] col-start-1 row-start-1">{children}</span>
      <span aria-hidden="true" className="glitch-layer glitch-layer-cyan col-start-1 row-start-1">
        {children}
      </span>
      <span aria-hidden="true" className="glitch-layer glitch-layer-magenta col-start-1 row-start-1">
        {children}
      </span>
      <style jsx>{`
        .glitch-text {
          isolation: isolate;
        }

        .glitch-layer {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0;
          mix-blend-mode: screen;
        }

        .glitch-layer-cyan {
          color: #67e8f9;
          text-shadow: 0 0 12px rgba(103, 232, 249, 0.38);
        }

        .glitch-layer-magenta {
          color: #f472b6;
          text-shadow: 0 0 14px rgba(244, 114, 182, 0.34);
        }

        @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
          .glitch-text:hover .glitch-layer,
          .glitch-text:focus-visible .glitch-layer {
            opacity: 0.58;
          }

          .glitch-text:hover .glitch-layer-cyan,
          .glitch-text:focus-visible .glitch-layer-cyan {
            animation: glitch-slice-cyan 700ms steps(2, end) 1;
          }

          .glitch-text:hover .glitch-layer-magenta,
          .glitch-text:focus-visible .glitch-layer-magenta {
            animation: glitch-slice-magenta 700ms steps(2, end) 1;
          }
        }

        @media (max-width: 767px), (pointer: coarse) {
          .glitch-text {
            display: inline-block;
          }

          .glitch-layer {
            display: none;
          }
        }

        @keyframes glitch-slice-cyan {
          0% {
            clip-path: inset(4% 0 68% 0);
            transform: translate3d(0, 0, 0);
          }
          24% {
            clip-path: inset(18% 0 46% 0);
            transform: translate3d(-0.05em, -0.01em, 0);
          }
          49% {
            clip-path: inset(58% 0 12% 0);
            transform: translate3d(0.04em, 0.03em, 0);
          }
          72% {
            clip-path: inset(30% 0 36% 0);
            transform: translate3d(-0.03em, -0.02em, 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes glitch-slice-magenta {
          0% {
            clip-path: inset(60% 0 8% 0);
            transform: translate3d(0, 0, 0);
          }
          28% {
            clip-path: inset(10% 0 58% 0);
            transform: translate3d(0.06em, 0.02em, 0);
          }
          56% {
            clip-path: inset(36% 0 28% 0);
            transform: translate3d(-0.04em, -0.03em, 0);
          }
          78% {
            clip-path: inset(12% 0 60% 0);
            transform: translate3d(0.03em, 0.01em, 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </span>
  );
}
