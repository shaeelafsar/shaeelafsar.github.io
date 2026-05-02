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
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] motion-safe:hover:-translate-y-1 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[var(--shadow-lg)]",
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
  return <div className={cn("flex flex-1 flex-col gap-4 p-6 md:p-8", className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardSlotProps) {
  return (
    <div className={cn("mt-auto flex items-center gap-3 px-6 pb-6 md:px-8 md:pb-8", className)}>
      {children}
    </div>
  );
}
