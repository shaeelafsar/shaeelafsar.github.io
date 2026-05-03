import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProseProps {
  className?: string;
  children: ReactNode;
}

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-narrow)] min-w-0 break-words text-[length:var(--text-body)] leading-8 text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:break-all [&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:text-accent-hover hover:[&_a]:underline [&_blockquote]:rounded-r-[var(--radius-md)] [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:bg-accent-soft/60 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-muted-foreground [&_code]:break-words [&_code]:rounded-[var(--radius-sm)] [&_code]:bg-card-muted [&_code]:px-1.5 [&_code]:py-1 [&_code]:font-mono [&_code]:text-sm [&_h1]:mt-12 [&_h1]:text-[length:var(--text-h1)] [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-[length:var(--text-h2)] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-10 [&_h3]:scroll-mt-24 [&_h3]:text-[length:var(--text-h3)] [&_h3]:font-semibold [&_hr]:my-10 [&_hr]:border-border [&_img]:rounded-[var(--radius-lg)] [&_li]:text-muted-foreground [&_li]:[overflow-wrap:anywhere] [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-6 [&_p]:text-muted-foreground [&_p]:[overflow-wrap:anywhere] [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-lg)] [&_pre]:border [&_pre]:border-border [&_pre]:bg-card-muted [&_pre]:p-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_td]:[overflow-wrap:anywhere] [&_th]:border [&_th]:border-border [&_th]:bg-card-muted [&_th]:px-4 [&_th]:py-3 [&_th]:[overflow-wrap:anywhere] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
