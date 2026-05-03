import { Geist_Mono, Inter } from "next/font/google";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/animation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createWebsiteStructuredData } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `(() => {
  try {
    const storageKey = "theme";
    const root = document.documentElement;
    const storedTheme = localStorage.getItem(storageKey);
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "dark";

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }
})();`;

export const metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const websiteStructuredData = createWebsiteStructuredData();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <JsonLd data={websiteStructuredData} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-toast)] focus:rounded-[var(--radius-pill)] focus:bg-card focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main id="main-content" className="flex-1" style={{ viewTransitionName: "site-content" }}>
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
