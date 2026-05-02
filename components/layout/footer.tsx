import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigationLinks, siteConfig, socialLinks } from "@/lib/metadata";

const copyrightYear = new Date("2026-05-02T17:18:28-05:00").getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/70" data-testid="site-footer">
      <Container className="grid gap-10 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:justify-between">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-foreground">{siteConfig.name}</p>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Thoughtful interfaces, polished frontends, and a writing practice rooted in product clarity.
          </p>
          <p className="text-sm text-muted-foreground">
            © {copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.16em] text-muted-foreground">
              Navigate
            </p>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[length:var(--text-meta)] uppercase tracking-[0.16em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {socialLinks.map((link) => {
                const external = link.href.startsWith("http");

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors duration-[var(--duration-ui)] hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
