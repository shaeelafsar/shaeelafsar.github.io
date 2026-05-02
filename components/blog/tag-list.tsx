import { Badge } from "@/components/ui/badge";

interface TagListProps {
  tags: string[];
  postCount: number;
}

export function TagList({ tags, postCount }: TagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-[var(--radius-lg)] border border-border bg-card/70 p-6 md:p-8"
      data-testid="blog-tag-list"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
            Topics in rotation
          </p>
          <p className="text-sm leading-6 text-muted-foreground" data-testid="blog-post-count">
            {postCount} published essays across product thinking, engineering craft, and technical notes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
