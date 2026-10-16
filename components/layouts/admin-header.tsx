"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuRefreshCw, LuUserCheck } from "react-icons/lu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { site } from "@/content/site";

export function AdminHeader({
  onMobileMenuToggle,
  title,
  description,
}: {
  onMobileMenuToggle?: () => void;
  title?: string;
  description?: string;
}) {
  const pathname = usePathname();

  // Generate simple breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Top action bar */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-panel lg:hidden"
            aria-label="Buka menu admin"
          >
            <LuMenu className="size-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/admin" className="hover:text-foreground">
              Dashboard
            </Link>
            {segments.length > 1 ? (
              <>
                <span>/</span>
                <span className="font-semibold text-foreground capitalize">
                  {segments[1].replace(/-/g, " ")}
                </span>
              </>
            ) : null}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Last sync badge */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/80 bg-panel px-3 py-1 text-[11px] text-muted-foreground">
            <LuRefreshCw className="size-3 text-emerald animate-spin-slow" />
            <span>Sinkronisasi Data: <strong>Hari ini, 12:00 WIB</strong></span>
          </div>

          <ThemeToggle labels={site.theme} />

          {/* User Role Profile */}
          <div className="flex items-center gap-2 rounded-lg border border-emerald/30 bg-emerald/10 px-2.5 py-1 text-xs">
            <LuUserCheck className="size-3.5 text-emerald" />
            <div className="hidden md:block text-left">
              <p className="font-bold text-foreground text-[11px] leading-tight">
                Kelompok 12 UNAIR
              </p>
              <p className="text-[10px] text-emerald leading-tight">Admin DLH (Simulasi)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Title & subtitle if provided */}
      {title ? (
        <div className="border-t border-border/40 bg-panel/40 px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
