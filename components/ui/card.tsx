import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section";
  children: ReactNode;
}

interface CardSlotProps {
  className?: string;
  children: ReactNode;
}

export function Card({
  as = "article",
  className,
  children,
  ...props
}: CardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "interactive-card tilt-card glass-depth glass-panel neon-card glitch-hover group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border/80 bg-card/92 shadow-[var(--shadow-sm)] ring-1 ring-white/55 backdrop-blur-[var(--blur-sm)] transition-[transform,box-shadow,border-color,background-color] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] dark:ring-white/5 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] motion-safe:hover:border-border-strong motion-safe:hover:shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardImage({ className, children }: CardSlotProps) {
  return <div className={cn("overflow-hidden border-b border-border", className)}>{children}</div>;
}

export function CardContent({ className, children }: CardSlotProps) {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col gap-4 p-[var(--card-padding)] md:p-[var(--card-padding-md)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardSlotProps) {
  return (
    <div
      className={cn(
        "relative mt-auto flex items-center gap-3 px-[var(--card-padding)] pb-[var(--card-padding)] md:px-[var(--card-padding-md)] md:pb-[var(--card-padding-md)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
