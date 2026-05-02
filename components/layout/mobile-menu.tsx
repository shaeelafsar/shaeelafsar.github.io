"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { Nav } from "@/components/layout/nav";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const standardEase = [0.21, 0.47, 0.32, 0.98] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const panelOffset = prefersReducedMotion ? 0 : 24;
  const panelVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, x: panelOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.24,
        ease: standardEase,
      },
    },
    exit: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: panelOffset,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.18,
        ease: standardEase,
      },
    },
  };

  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: prefersReducedMotion ? 0 : 0.06,
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: standardEase,
      },
    },
  };

  useEffect(() => {
    if (!open && wasOpenRef.current) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border border-border bg-card/80 text-foreground transition-[transform,background-color,border-color] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] hover:border-border-strong hover:bg-accent-soft motion-safe:hover:-translate-y-0.5 lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        data-testid="mobile-menu-trigger"
      >
        <span className="relative h-5 w-5">
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-[0.45rem] rounded-full bg-current transition-transform duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
              open && "translate-y-0 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-5 translate-y-[0.35rem] rounded-full bg-current transition-transform duration-[var(--duration-ui)] ease-[var(--ease-standard)]",
              open && "translate-y-0 -rotate-45",
            )}
          />
        </span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: standardEase }}
            className="fixed inset-0 z-[var(--z-mobile-menu)] lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/30"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              className="absolute inset-y-0 right-0 flex w-full max-w-full flex-col bg-surface-strong px-6 pb-10 pt-6 backdrop-blur-[var(--blur-lg)]"
              data-testid="mobile-menu-panel"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
                <Link href="/" className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground" onClick={() => setOpen(false)}>
                  {siteConfig.name}
                </Link>
              </div>
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-1 flex-col justify-between"
              >
                <motion.div variants={itemVariants} className="pt-8">
                  <Nav
                    orientation="vertical"
                    onNavigate={() => setOpen(false)}
                    dataTestId="mobile-menu-nav"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="border-t border-border pt-6">
                  <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
                    Portfolio, blog, and case studies
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
