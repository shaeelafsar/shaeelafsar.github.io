import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "neon-link glitch-hover relative inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-pill)] border text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] focus-visible:border-accent";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-foreground text-background shadow-[var(--shadow-neon-sm)] hover:bg-accent hover:text-white motion-safe:hover:shadow-[var(--shadow-neon-md)]",
  secondary:
    "border-transparent bg-card-muted text-foreground shadow-[var(--shadow-neon-xs)] hover:bg-surface-strong motion-safe:hover:shadow-[var(--shadow-neon-sm)]",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-accent-soft motion-safe:hover:shadow-[var(--shadow-neon-sm)]",
  outline:
    "border-border bg-transparent text-foreground shadow-[var(--shadow-neon-xs)] hover:border-border-strong hover:bg-card motion-safe:hover:shadow-[var(--shadow-neon-sm)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4",
  md: "min-h-11 px-5",
  lg: "min-h-12 px-6 text-base",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      as = "button",
      ...restProps
    } = props;

    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

    if (as === "a") {
      const { href, ...anchorProps } = restProps as Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
      > & {
        href: string;
      };
      const shouldUseLink =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/resume.pdf") &&
        !/^\/[\w-]+\.[a-z0-9]+(?:$|[?#])/i.test(href);

      if (shouldUseLink) {
        return (
          <Link
            ref={ref as Ref<HTMLAnchorElement>}
            className={classes}
            href={href}
            {...anchorProps}
          >
            {children}
          </Link>
        );
      }

      return (
        <a ref={ref as Ref<HTMLAnchorElement>} className={classes} href={href} {...anchorProps}>
          {children}
        </a>
      );
    }

    const buttonProps = restProps as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        type={buttonProps.type ?? "button"}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
