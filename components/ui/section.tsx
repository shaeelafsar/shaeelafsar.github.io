import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "w-full py-[var(--section-padding-y)] md:py-[var(--section-padding-y-md)] lg:py-[var(--section-padding-y-lg)]",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
