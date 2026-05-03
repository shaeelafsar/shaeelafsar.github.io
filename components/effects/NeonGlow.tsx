"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const neonPalette = {
  cyan: {
    border: "rgba(103, 232, 249, 0.45)",
    glow: "rgba(34, 211, 238, 0.28)",
    strong: "rgba(34, 211, 238, 0.2)",
  },
  magenta: {
    border: "rgba(244, 114, 182, 0.48)",
    glow: "rgba(236, 72, 153, 0.28)",
    strong: "rgba(236, 72, 153, 0.2)",
  },
  green: {
    border: "rgba(74, 222, 128, 0.46)",
    glow: "rgba(34, 197, 94, 0.26)",
    strong: "rgba(34, 197, 94, 0.18)",
  },
} as const;

export type NeonGlowColor = keyof typeof neonPalette;

export interface NeonGlowProps {
  children: ReactNode;
  className?: string;
  color?: NeonGlowColor;
}

export function NeonGlow({
  children,
  className,
  color = "cyan",
}: NeonGlowProps) {
  const prefersReducedMotion = useReducedMotion();
  const palette = neonPalette[color];
  const glowStyle = {
    "--neon-border": palette.border,
    "--neon-glow": palette.glow,
    "--neon-glow-strong": palette.strong,
  } as CSSProperties;

  return (
    <div className={cn("neon-glow-wrapper relative", className)} style={glowStyle}>
      <div aria-hidden="true" className="neon-glow-overlay" data-reduced={prefersReducedMotion ? "true" : "false"} />
      <div className="relative h-full">{children}</div>
      <style jsx>{`
        .neon-glow-wrapper {
          isolation: isolate;
        }

        .neon-glow-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid transparent;
          opacity: 0;
        }

        @media (hover: hover) and (pointer: fine) {
          .neon-glow-wrapper:hover .neon-glow-overlay,
          .neon-glow-wrapper:focus-within .neon-glow-overlay {
            opacity: 1;
            border-color: var(--neon-border);
            box-shadow:
              0 0 0 1px var(--neon-border),
              0 0 24px var(--neon-glow),
              0 0 54px var(--neon-glow-strong),
              inset 0 0 22px color-mix(in srgb, var(--neon-glow) 72%, transparent);
            animation: neon-pulse 1.8s ease-in-out infinite;
          }

          .neon-glow-wrapper:hover .neon-glow-overlay[data-reduced="true"],
          .neon-glow-wrapper:focus-within .neon-glow-overlay[data-reduced="true"] {
            animation: none;
          }
        }

        @keyframes neon-pulse {
          0%,
          100% {
            box-shadow:
              0 0 0 1px var(--neon-border),
              0 0 20px var(--neon-glow),
              0 0 44px var(--neon-glow-strong),
              inset 0 0 16px color-mix(in srgb, var(--neon-glow) 56%, transparent);
          }
          50% {
            box-shadow:
              0 0 0 1px var(--neon-border),
              0 0 30px color-mix(in srgb, var(--neon-glow) 86%, transparent),
              0 0 62px color-mix(in srgb, var(--neon-glow-strong) 92%, transparent),
              inset 0 0 28px color-mix(in srgb, var(--neon-glow) 82%, transparent);
          }
        }
      `}</style>
    </div>
  );
}
