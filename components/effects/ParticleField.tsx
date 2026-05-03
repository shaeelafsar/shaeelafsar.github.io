"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

function getParticleCount(width: number, height: number) {
  return Math.min(30, Math.max(12, Math.round((width * height) / 52000)));
}

function createParticles(width: number, height: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 1 + Math.random() * 1.8,
    alpha: 0.28 + Math.random() * 0.38,
  }));
}

export function ParticleField({ className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [allowParticles, setAllowParticles] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const updateAllowance = () => {
      setAllowParticles(mediaQuery.matches);
    };

    updateAllowance();
    mediaQuery.addEventListener("change", updateAllowance);

    return () => {
      mediaQuery.removeEventListener("change", updateAllowance);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !allowParticles) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let particles: Particle[] = [];

    const parent = canvas.parentElement;

    const resize = () => {
      const bounds = (parent ?? canvas).getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = createParticles(width, height, getParticleCount(width, height));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.fillStyle = `rgba(125, 249, 255, ${particle.alpha})`;
        context.shadowBlur = 10;
        context.shadowColor = "rgba(34, 211, 238, 0.35)";
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const otherParticle = particles[otherIndex];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 116) {
            continue;
          }

          const opacity = (1 - distance / 116) * 0.16;
          context.beginPath();
          context.strokeStyle = `rgba(125, 249, 255, ${opacity})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(otherParticle.x, otherParticle.y);
          context.stroke();
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;

    if (resizeObserver && parent) {
      resizeObserver.observe(parent);
    }

    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
    };
  }, [allowParticles, prefersReducedMotion]);

  if (prefersReducedMotion || !allowParticles) {
    return null;
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-70", className)} />;
}
