"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuWind,
  LuCloudSun,
  LuTrash2,
  LuMapPin,
  LuClipboardList,
  LuBrainCircuit,
  LuChartBar,
  LuUsers,
  LuSettings,
  LuArrowLeft,
  LuLeaf,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    group: "Pusat Kendali",
    items: [
      {
        label: "Overview",
        href: "/admin",
        icon: LuLayoutDashboard,
      },
    ],
  },
  {
    group: "Monitoring Lingkungan",
    items: [
      {
        label: "Kualitas Udara",
        href: "/admin/kualitas-udara",
        icon: LuWind,
      },
      {
        label: "Cuaca & Iklim",
        href: "/admin/cuaca",
        icon: LuCloudSun,
      },
      {
        label: "Manajemen Fasilitas",
        href: "/admin/fasilitas",
        icon: LuTrash2,
      },
      {
        label: "Peta Komando GIS",
        href: "/admin/peta",
        icon: LuMapPin,
      },
    ],
  },
  {
    group: "Manajemen & Analitik",
    items: [
      {
        label: "Pelaporan Warga",
        href: "/admin/laporan",
        icon: LuClipboardList,
        badge: "4 Aduan",
      },
      {
        label: "Analisis AI & Spasial",
        href: "/admin/analisis-ai",
        icon: LuBrainCircuit,
        badge: "Triage",
      },
      {
        label: "Statistik & SLA",
        href: "/admin/statistik",
        icon: LuChartBar,
      },
    ],
  },
  {
    group: "Sistem & Konfigurasi",
    items: [
      {
        label: "Pengelolaan Petugas",
        href: "/admin/petugas",
        icon: LuUsers,
      },
      {
        label: "Pengaturan & Ingest",
        href: "/admin/pengaturan",
        icon: LuSettings,
      },
    ],
  },
];

export function AdminSidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/80 bg-panel text-foreground transition-transform duration-200 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 px-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald text-background font-black shadow-md shadow-emerald/20">
              <LuLeaf className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-foreground">
                  WASI ASRI
                </span>
                <span className="rounded-full bg-emerald/15 px-1.5 text-[9px] font-bold text-emerald">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Environmental Command Center
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {adminNavItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="px-3 text-[11px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all",
                        isActive
                          ? "bg-emerald/15 text-emerald font-semibold border border-emerald/30 shadow-xs"
                          : "text-muted-foreground hover:bg-panel-secondary hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-colors",
                            isActive ? "text-emerald" : "text-muted-foreground group-hover:text-foreground",
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className="rounded-full bg-panel-secondary px-2 py-0.5 text-[10px] font-bold text-emerald border border-border">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* System Status & Return to Public */}
        <div className="border-t border-border/70 p-3 space-y-2 bg-panel-secondary/40">
          <div className="rounded-lg border border-border/70 bg-panel p-2.5 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Infrastruktur Sensor:</span>
              <Badge variant="prov-aktual">3 SPKU Aktif</Badge>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Engine AI:</span>
              <span className="text-cyan font-mono text-[10px]">EcoVision v1.4</span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-panel py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-panel-secondary transition-colors"
          >
            <LuArrowLeft className="size-3.5" />
            <span>Kembali ke Portal Publik</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
