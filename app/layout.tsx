import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SkipLink } from "@/components/layouts/skip-link";
import { ThemeScript } from "@/components/layouts/theme-script";
import { site } from "@/content/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: "Tokigo starter template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeScript />
        <SkipLink label={site.skipLinkLabel} />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
