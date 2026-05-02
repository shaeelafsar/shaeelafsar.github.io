"use client";

import Lenis from "@studio-freight/lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type PropsWithChildren,
} from "react";
import { useReducedMotion } from "motion/react";

type LenisRef = MutableRefObject<Lenis | null>;

const LenisContext = createContext<LenisRef | null>(null);

export type SmoothScrollProviderProps = PropsWithChildren;

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const instance = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    let isSyncingScroll = false;
    const syncMotionScroll = () => {
      if (isSyncingScroll) {
        return;
      }

      isSyncingScroll = true;
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
        isSyncingScroll = false;
      });
    };

    let frameId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    lenisRef.current = instance;
    instance.on("scroll", syncMotionScroll);
    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      instance.off("scroll", syncMotionScroll);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
