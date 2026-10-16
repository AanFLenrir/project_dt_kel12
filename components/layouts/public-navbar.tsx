"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX, LuShieldAlert, LuLeaf, LuArrowRight } from "react-icons/lu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // If inside /admin route, don't render public navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Disclaimer Strip */}
      <div className="bg-panel-secondary px-4 py-1 text-center text-[11px] text-muted-foreground border-b border-border/50">
        <span className="font-semibold text-emerald">WASI ASRI:</span> Proyek Design Thinking Kelompok 12 D4 Teknik Informatika UNAIR — Prototipe Demonstrasi Akademis
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald text-background font-black shadow-md shadow-emerald/20 transition-transform group-hover:scale-105">
            <LuLeaf className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-foreground">
                WASI ASRI
              </span>
              <span className="rounded-full bg-emerald/15 px-1.5 py-0.2 text-[10px] font-bold text-emerald">
                SBY
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground hidden sm:block">
              Environmental Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links (Max 6 primary items per AGENTS.md) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {site.navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 transition-colors",
                  isActive
                    ? "bg-panel text-emerald font-semibold border border-border/70"
                    : "text-muted-foreground hover:bg-panel/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ThemeToggle labels={site.theme} />
          <Link
            href="/admin"
            className="rounded-lg border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-panel hover:text-foreground transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/lapor"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs hover:bg-emerald/90 transition-all active:scale-95"
          >
            <LuShieldAlert className="size-3.5" />
            <span>Lapor Masalah</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle labels={site.theme} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-panel"
            aria-label="Buka menu navigasi"
            aria-expanded={isOpen}
          >
            {isOpen ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen ? (
        <div className="border-b border-border bg-panel px-4 py-5 lg:hidden">
          <nav className="flex flex-col space-y-1.5">
            {site.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-panel-secondary text-emerald font-bold"
                    : "text-foreground hover:bg-panel-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border/60 my-2 pt-2">
              <Link
                href="/panduan"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Panduan & Edukasi Lingkungan
              </Link>
              <Link
                href="/tentang"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Tentang WASI ASRI
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Portal Admin Dashboard
              </Link>
            </div>
            <Link
              href="/lapor"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald py-2.5 text-center text-sm font-semibold text-background"
            >
              <LuShieldAlert className="size-4" />
              <span>Lapor Masalah Lingkungan</span>
              <LuArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
