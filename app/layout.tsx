import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SkipLink } from "@/components/layouts/skip-link";
import { ThemeScript } from "@/components/layouts/theme-script";
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { PublicFooter } from "@/components/layouts/public-footer";
import { site } from "@/content/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground selection:bg-emerald selection:text-background">
        <ThemeScript />
        <SkipLink label={site.skipLinkLabel} />
        <PublicNavbar />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <PublicFooter />
      </body>
    </html>
  );
}
