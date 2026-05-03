"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

const IMAGE_SOURCES = ["/images/profile.jpg", "/images/profile.png"] as const;

export interface ProfileAvatarProps {
  className?: string;
  imageClassName?: string;
  sizes?: string;
  alt?: string;
  initials?: string;
  priority?: boolean;
}

export function ProfileAvatar({
  className,
  imageClassName,
  sizes = "100vw",
  alt = "Portrait of Shaeel Afsar",
  initials = "SA",
  priority = false,
}: ProfileAvatarProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = IMAGE_SOURCES[sourceIndex] ?? null;

  return (
    <div className={cn("relative isolate aspect-square", className)}>
      <div className="pointer-events-none absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.24),transparent_58%)] blur-2xl" />
      <div className="relative h-full overflow-hidden rounded-full border border-[color:color-mix(in_srgb,var(--color-neon-cyan)_42%,var(--color-border))] bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.18),transparent_38%),linear-gradient(180deg,rgba(8,15,30,0.98),rgba(15,23,42,0.9))] shadow-[0_0_0_1px_rgba(103,232,249,0.12),0_0_34px_rgba(34,211,238,0.16)]">
        {source ? (
          <Image
            fill
            alt={alt}
            className={cn("object-cover", imageClassName)}
            onError={() => setSourceIndex((current) => current + 1)}
            priority={priority}
            sizes={sizes}
            src={source}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(103,232,249,0.14),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(244,114,182,0.14),transparent_38%)]">
            <span className="font-mono text-[clamp(1.4rem,4vw,3rem)] font-semibold uppercase tracking-[0.26em] text-[color:var(--color-neon-cyan)] [text-shadow:0_0_24px_rgba(34,211,238,0.42)]">
              {initials}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-[8%] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute inset-x-[18%] top-[14%] h-px bg-gradient-to-r from-transparent via-[rgba(103,232,249,0.8)] to-transparent opacity-80" />
      </div>
    </div>
  );
}
