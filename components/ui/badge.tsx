import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "accent";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-transparent bg-card-muted text-foreground/80",
  outline: "border-border bg-transparent text-muted-foreground",
  accent: "border-transparent bg-accent-soft text-accent",
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
        "inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.12em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
