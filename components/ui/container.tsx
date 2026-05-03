import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-content)] px-4 sm:px-6 md:px-8 xl:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
