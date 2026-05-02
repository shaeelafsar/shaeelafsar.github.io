import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import { Badge } from "@/components/ui/badge";
import { cn, slugify } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type CalloutTone = "info" | "success" | "warning" | "error";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

type CalloutProps = {
  children: ReactNode;
  title?: string;
  tone?: CalloutTone;
};

const headingClasses: Record<HeadingTag, string> = {
  h1: "mt-12 scroll-mt-24 text-[length:var(--text-h1)]",
  h2: "mt-12 scroll-mt-24 text-[length:var(--text-h2)]",
  h3: "mt-10 scroll-mt-24 text-[length:var(--text-h3)]",
  h4: "mt-8 scroll-mt-24 text-xl md:text-2xl",
  h5: "mt-8 scroll-mt-24 text-lg md:text-xl",
  h6: "mt-8 scroll-mt-24 text-base uppercase tracking-[0.14em] text-muted-foreground",
};

const calloutClasses: Record<CalloutTone, string> = {
  info: "border-info/30 bg-info/8",
  success: "border-success/30 bg-success/8",
  warning: "border-warning/30 bg-warning/8",
  error: "border-error/30 bg-error/8",
};

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return "";
}

function MdxHeading({
  as,
  className,
  children,
  id,
  ...props
}: HeadingProps & { as: HeadingTag }) {
  const Component = as;
  const resolvedId = id ?? slugify(getTextContent(children));

  return (
    <Component
      id={resolvedId}
      className={cn(
        "group font-semibold tracking-tight text-foreground",
        headingClasses[as],
        className,
      )}
      {...props}
    >
      <a
        className="inline-flex items-start gap-2 no-underline transition-colors duration-[var(--duration-ui)] hover:text-accent"
        href={`#${resolvedId}`}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="font-mono text-sm text-muted-foreground opacity-0 transition-opacity duration-[var(--duration-ui)] group-hover:opacity-100">
          #
        </span>
      </a>
    </Component>
  );
}

function Pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-card-muted p-5 text-sm",
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  return <code className={cn(className)} {...props} />;
}

function Blockquote({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "rounded-r-[var(--radius-md)] border-l-2 border-accent bg-accent-soft/60 px-5 py-4 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-8 overflow-x-auto rounded-[var(--radius-lg)] border border-border">
      <table className={cn("min-w-full border-collapse", className)} {...props} />
    </div>
  );
}

function MdxImage({
  alt,
  className,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className={cn(
        "my-8 w-full rounded-[var(--radius-lg)] border border-border bg-card object-cover shadow-[var(--shadow-sm)]",
        className,
      )}
      loading="lazy"
      {...props}
    />
  );
}

export function Callout({
  children,
  title,
  tone = "info",
}: CalloutProps) {
  return (
    <div className={cn("my-8 rounded-[var(--radius-lg)] border p-5", calloutClasses[tone])}>
      <div className="mb-3 flex items-center gap-3">
        <Badge variant="accent">{tone}</Badge>
        {title ? <p className="font-medium text-foreground">{title}</p> : null}
      </div>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  h1: (props: HeadingProps) => <MdxHeading as="h1" {...props} />,
  h2: (props: HeadingProps) => <MdxHeading as="h2" {...props} />,
  h3: (props: HeadingProps) => <MdxHeading as="h3" {...props} />,
  h4: (props: HeadingProps) => <MdxHeading as="h4" {...props} />,
  h5: (props: HeadingProps) => <MdxHeading as="h5" {...props} />,
  h6: (props: HeadingProps) => <MdxHeading as="h6" {...props} />,
  pre: Pre,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  img: MdxImage,
  Callout,
};
