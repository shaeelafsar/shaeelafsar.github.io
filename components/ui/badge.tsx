import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "accent";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-transparent bg-card-muted text-foreground/80 shadow-[var(--shadow-neon-xs)]",
  outline:
    "border-border bg-transparent text-muted-foreground shadow-[var(--shadow-neon-xs)]",
  accent:
    "border-transparent bg-accent-soft text-accent shadow-[var(--shadow-neon-sm)]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-[var(--radius-pill)] border px-3 py-1 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.12em] whitespace-normal break-words [overflow-wrap:anywhere]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
