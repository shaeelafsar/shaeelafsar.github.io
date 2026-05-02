import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize =
  | "display-xl"
  | "display-lg"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

const sizeClasses: Record<HeadingSize, string> = {
  "display-xl": "text-[length:var(--text-display-xl)]",
  "display-lg": "text-[length:var(--text-display-lg)]",
  h1: "text-[length:var(--text-h1)]",
  h2: "text-[length:var(--text-h2)]",
  h3: "text-[length:var(--text-h3)]",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
  h6: "text-base uppercase tracking-[0.14em] text-muted-foreground",
};

interface HeadingProps {
  as?: HeadingTag;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
}

export function Heading({
  as = "h2",
  size,
  className,
  children,
}: HeadingProps) {
  const Component = as;
  const resolvedSize = size ?? as;

  return (
    <Component
      className={cn(
        "font-semibold tracking-tight text-balance text-foreground",
        sizeClasses[resolvedSize],
        className,
      )}
    >
      {children}
    </Component>
  );
}
