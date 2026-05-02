import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Nav } from "@/components/layout/nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header
      className="sticky top-0 z-[var(--z-header)] border-b border-border/80 bg-surface/78 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[var(--blur-lg)]"
      data-testid="site-header"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex min-h-20 items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.22em] text-muted-foreground">
              Shaeel Afsar
            </span>
            <span className="mt-2 text-sm font-medium text-foreground">
              Frontend engineer · builder · writer
            </span>
          </Link>
          <div className="hidden lg:block">
            <Nav />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
