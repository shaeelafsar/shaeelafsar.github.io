import { StaggerChildren } from "@/components/animation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SkillCategory } from "@/types/resume";

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  if (categories.length === 0) {
    return (
      <p className="text-[length:var(--text-body)] leading-8 text-muted-foreground">
        Skills details coming soon.
      </p>
    );
  }

  return (
    <StaggerChildren
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      data-testid="skills-grid"
    >
      {categories.map((category) => (
        <Card key={category.title} as="div" className="bg-card/95">
          <CardContent>
            <div className="space-y-3">
              <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-accent">
                {category.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill.name} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </StaggerChildren>
  );
}
