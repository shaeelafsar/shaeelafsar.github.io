import type { Education } from "@/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatMonthYear } from "@/lib/utils";

interface EducationSectionProps {
  entries: Education[];
}

function getDateRange(startDate: string, endDate?: string) {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";

  return `${start} — ${end}`;
}

export function EducationSection({ entries }: EducationSectionProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6" data-testid="education-section">
      {entries.map((entry) => (
        <Card key={`${entry.institution}-${entry.degree}`} className="bg-card/90">
          <CardContent className="gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <Heading as="h3" size="h3">
                  {entry.degree}
                </Heading>
                <p className="break-words text-lg font-medium text-foreground">
                  {entry.institution}
                  {entry.fieldOfStudy ? ` · ${entry.fieldOfStudy}` : ""}
                </p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground md:text-right">
                <p>{getDateRange(entry.startDate, entry.endDate)}</p>
                {entry.location ? <p>{entry.location}</p> : null}
              </div>
            </div>
            {entry.summary ? (
              <p className="max-w-3xl text-[length:var(--text-body)] leading-7 text-muted-foreground">
                {entry.summary}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
