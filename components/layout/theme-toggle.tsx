"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glitch-hover inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border border-border bg-card/80 text-foreground shadow-[var(--shadow-neon-xs)] transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] hover:border-border-strong hover:bg-accent-soft motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[var(--shadow-neon-sm)]"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      data-testid="theme-toggle"
      suppressHydrationWarning
    >
      <span className="relative h-5 w-5 overflow-hidden">
        <span
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
            !isDark ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
            isDark ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M20.25 14.44A8.25 8.25 0 1 1 9.56 3.75a6.5 6.5 0 1 0 10.69 10.69Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
