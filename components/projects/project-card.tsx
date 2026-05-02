import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block h-full rounded-[var(--radius-lg)] focus-visible:rounded-[var(--radius-lg)]"
    >
      <Card className="h-full">
        <CardImage>
          <div className="relative aspect-[16/10] overflow-hidden bg-card-muted">
            <Image
              alt={`Preview of ${project.title}`}
              className="h-full w-full object-cover"
              height={900}
              priority={project.featured}
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              src={project.image}
              width={1600}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-background/80 via-background/20 to-transparent p-4">
              <Badge variant="accent">{project.category}</Badge>
              <span className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.14em] text-foreground/80">
                Case study
              </span>
            </div>
          </div>
        </CardImage>
        <CardContent>
          <div className="space-y-3">
            <Heading as="h2" size="h3">
              {project.title}
            </Heading>
            <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
              {project.excerpt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium text-accent transition-colors duration-[var(--duration-ui)] group-hover:text-accent-hover">
            View project →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
