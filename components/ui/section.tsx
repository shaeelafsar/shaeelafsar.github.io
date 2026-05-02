import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn("w-full py-24 md:py-32 lg:py-40", className)} {...props}>
      {children}
    </section>
  );
}
