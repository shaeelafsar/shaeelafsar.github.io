import type { SkillCategory } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      data-testid="skills-grid"
    >
      {categories.map((category) => (
        <Card key={category.title} className="bg-card/90">
          <CardContent className="gap-5">
            <Heading as="h3" size="h3">
              {category.title}
            </Heading>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <Badge key={skill.name} variant="outline" className="bg-background-secondary/60 text-foreground">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
