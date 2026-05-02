import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-[var(--radius-lg)] focus-visible:rounded-[var(--radius-lg)]"
    >
      <Card className="h-full bg-card/85">
        <CardContent className="gap-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="space-y-3">
            <Heading as="h2" size="h3" className="text-balance">
              {post.title}
            </Heading>
            <p className="max-w-3xl text-[length:var(--text-body)] leading-7 text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium text-accent transition-colors duration-[var(--duration-ui)] group-hover:text-accent-hover">
            Read article →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
