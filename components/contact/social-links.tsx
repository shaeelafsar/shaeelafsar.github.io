import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/lib/metadata";

type IconProps = {
  className?: string;
};

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.93 18.02c.46.09.63-.2.63-.45v-1.58c-2.56.56-3.1-1.08-3.1-1.08-.42-1.06-1.03-1.35-1.03-1.35-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.82 1.41 2.16 1 2.69.76.08-.6.32-1 .58-1.23-2.04-.23-4.18-1.02-4.18-4.54 0-1 .36-1.82.95-2.46-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.53.94a8.74 8.74 0 0 1 4.6 0c1.76-1.19 2.53-.94 2.53-.94.5 1.27.19 2.21.09 2.44.59.64.95 1.46.95 2.46 0 3.53-2.14 4.3-4.19 4.53.33.29.63.86.63 1.73v2.57c0 .25.17.54.63.45A9.25 9.25 0 0 0 12 2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.25 8.25v8.5M7.25 5.75h.01M11.5 10.75v6M11.5 10.75c0-1.1.9-2 2-2h.5a2.75 2.75 0 0 1 2.75 2.75v5.25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5h3.17l10.83 14H15.8L5 5Zm14 0-5.28 6.04M10.62 13.66 5 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7.75 11.28 13a1.25 1.25 0 0 0 1.44 0L20 7.75M5.75 19.25h12.5A1.75 1.75 0 0 0 20 17.5v-11a1.75 1.75 0 0 0-1.75-1.75H5.75A1.75 1.75 0 0 0 4 6.5v11c0 .97.78 1.75 1.75 1.75Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  "Twitter/X": XIcon,
  Email: MailIcon,
} as const;

export function SocialLinks() {
  return (
    <Card className="h-full bg-card/90" as="section" data-testid="social-links-panel">
      <CardContent className="gap-8">
        <div className="space-y-4">
          <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
            Availability
          </p>
          <Heading as="h2" size="h3">
            Currently available for freelance work and select product collaborations.
          </Heading>
          <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
            The best conversations usually start with context. Share what you’re building, where you’re stuck, and what a good outcome looks like.
          </p>
          <p className="text-sm text-muted-foreground">
            Typical response time: within 2–3 business days.
          </p>
        </div>

        <ul className="grid gap-3">
          {siteConfig.socials.map((link) => {
            const Icon = iconMap[link.label];
            const external = link.href.startsWith("http");

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-background-secondary/50 px-4 py-4 transition-[transform,border-color,background-color] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] hover:border-border-strong hover:bg-card"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
                      <Icon className="h-5 w-5 text-foreground" />
                    </span>
                    <span>
                      <span className="block font-medium text-foreground">{link.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {external ? "Open profile" : "Send an email"}
                        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm text-muted-foreground">↗</span>
                </a>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
