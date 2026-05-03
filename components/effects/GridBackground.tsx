"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface GridBackgroundProps {
  className?: string;
  color?: string;
}

export function GridBackground({
  className,
  color = "rgba(34, 211, 238, 0.32)",
}: GridBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 bottom-[-18%] top-[30%] overflow-hidden", className)}
      style={{ "--grid-color": color } as CSSProperties}
    >
      <div className={cn("grid-surface absolute inset-x-[-14%] bottom-[-42%] top-0", !prefersReducedMotion && "grid-surface-animated")} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg)_10%,transparent_34%,transparent_76%,var(--color-bg)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_srgb,var(--grid-color)_56%,transparent),transparent_68%)] opacity-80" />
      <style jsx>{`
        .grid-surface {
          background-image:
            linear-gradient(to right, color-mix(in srgb, var(--grid-color) 72%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--grid-color) 62%, transparent) 1px, transparent 1px);
          background-size: 4.5rem 4.5rem;
          opacity: 0.34;
          transform: perspective(980px) rotateX(78deg) scale(1.24);
          transform-origin: center top;
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.52) 18%, rgba(0, 0, 0, 0.98) 56%, transparent 100%);
        }

        @media (prefers-reduced-motion: no-preference) {
          .grid-surface-animated {
            animation: grid-drift 18s linear infinite;
          }
        }

        @keyframes grid-drift {
          from {
            background-position: 0 0, 0 0;
          }
          to {
            background-position: 0 5.5rem, 5.5rem 0;
          }
        }
      `}</style>
    </div>
  );
}
