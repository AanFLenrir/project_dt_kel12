"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuPhoneCall, LuShieldCheck, LuLeaf, LuExternalLink } from "react-icons/lu";
import { site } from "@/content/site";
import { dlhSurabayaLink, bmkgLink, emergencyCallLink } from "@/lib/links";

export function PublicFooter() {
  const pathname = usePathname();

  // If inside /admin route, don't render public footer
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-border/80 bg-panel text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Academic Context */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald text-background font-black">
                <LuLeaf className="size-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                WASI ASRI
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              {site.description}
            </p>
            <div className="rounded-lg border border-border/70 bg-panel-secondary p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <LuShieldCheck className="size-3.5 text-emerald" />
                Konteks Pengembangan Akademis
              </p>
              <p className="mt-1 text-[11px] leading-relaxed">
                {site.institution}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/80">
                {site.disclaimer}
              </p>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigasi Platform
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/kualitas-udara" className="hover:text-emerald transition-colors">
                  Pemantauan Kualitas Udara (ISPU)
                </Link>
              </li>
              <li>
                <Link href="/cuaca" className="hover:text-emerald transition-colors">
                  Prakiraan Cuaca BMKG
                </Link>
              </li>
              <li>
                <Link href="/sampah" className="hover:text-emerald transition-colors">
                  Fasilitas Sampah & Kebersihan
                </Link>
              </li>
              <li>
                <Link href="/peta" className="hover:text-emerald transition-colors">
                  Peta Spasial Lingkungan
                </Link>
              </li>
              <li>
                <Link href="/lapor" className="hover:text-emerald transition-colors">
                  Formulir Lapor Lingkungan AI
                </Link>
              </li>
              <li>
                <Link href="/riwayat" className="hover:text-emerald transition-colors">
                  Pelacakan Status Aduan
                </Link>
              </li>
              <li>
                <Link href="/panduan" className="hover:text-emerald transition-colors">
                  Panduan & Edukasi Lingkungan
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Darurat & Sumber Data */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Kontak & Atribusi Resmi
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={emergencyCallLink()}
                className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5 text-rose-300 hover:bg-rose-500/20 transition-colors"
              >
                <LuPhoneCall className="size-4 shrink-0 text-rose-400" />
                <div>
                  <p className="font-bold text-[11px]">Kedaruratan Lingkungan</p>
                  <p className="text-[10px] text-rose-200">Hubungi Call Center 112 Surabaya</p>
                </div>
              </a>

              <div className="pt-2 text-[11px] text-muted-foreground space-y-1.5">
                <p className="font-semibold text-foreground">Atribusi Data Terbuka:</p>
                <a
                  href={dlhSurabayaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-emerald"
                >
                  <span>Dinas Lingkungan Hidup Surabaya</span>
                  <LuExternalLink className="size-3" />
                </a>
                <a
                  href={bmkgLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-emerald"
                >
                  <span>BMKG Data Cuaca Terbuka</span>
                  <LuExternalLink className="size-3" />
                </a>
                <p className="pt-1 text-[10px] text-muted-foreground/70">
                  Standar ISPU: Permen LHK No. 14 Tahun 2020
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 WASI ASRI — Kelompok 12 D4 Teknik Informatika Universitas Airlangga.</p>
          <div className="flex items-center gap-4">
            <Link href="/tentang" className="hover:text-foreground">Tentang Kami</Link>
            <Link href="/panduan" className="hover:text-foreground">Edukasi ISPU</Link>
            <Link href="/design-system" className="hover:text-foreground">Design System</Link>
            <Link href="/admin" className="text-emerald font-semibold hover:underline">Masuk Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
