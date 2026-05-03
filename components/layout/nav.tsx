"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type NavOrientation = "horizontal" | "vertical";

interface NavProps {
  className?: string;
  orientation?: NavOrientation;
  onNavigate?: () => void;
  dataTestId?: string;
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav({
  className,
  orientation = "horizontal",
  onNavigate,
  dataTestId = "site-nav",
}: NavProps) {
  const pathname = usePathname();
  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex items-center gap-2",
        isVertical && "flex-col items-start gap-3",
        className,
      )}
      data-testid={dataTestId}
    >
      {navigationLinks.map((item) => {
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative inline-flex min-h-11 items-center rounded-[var(--radius-pill)] px-3 py-2 text-sm font-medium transition-[color,transform] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] after:absolute after:bottom-1 after:left-3 after:h-px after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-[var(--duration-ui)] after:ease-[var(--ease-snappy)] hover:text-foreground focus-visible:text-accent focus-visible:after:scale-x-100",
              active
                ? "text-accent after:scale-x-100"
                : "text-muted-foreground hover:after:scale-x-100 hover:after:bg-border-strong",
              isVertical && "w-full px-0 py-3 text-[length:var(--text-h3)] after:left-0 after:w-full",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
