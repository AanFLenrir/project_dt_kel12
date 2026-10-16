"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  LuSearch,
  LuMapPin,
  LuClock,
  LuShieldAlert,
  LuArrowRight,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getReports } from "@/lib/reports-store";
import { cn } from "@/lib/utils";

export function HistoryListView({ initialSearch = "" }: { initialSearch?: string }) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<string>("Semua");

  const reports = useMemo(() => getReports(), []);

  const statusOptions = ["Semua", "Diterima", "Ditugaskan", "Diproses", "Selesai", "Ditolak"];

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => {
      const matchStatus = statusFilter === "Semua" || rep.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        rep.ticketNumber.toLowerCase().includes(q) ||
        rep.title.toLowerCase().includes(q) ||
        rep.district.toLowerCase().includes(q) ||
        rep.category.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [reports, searchQuery, statusFilter]);

  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuShieldAlert className="size-4" />
                <span>Transparansi Penanganan Aduan</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Pelacakan Riwayat Laporan Lingkungan
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Pantau perkembangan penanganan masalah lingkungan warga Kota Surabaya secara transparan menggunakan nomor tiket laporan Anda.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-simulasi">Purwarupa Demonstrasi</Badge>
              <Badge variant="outline">{reports.length} Total Laporan Terdata</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter and Search Bar */}
      <Section className="py-0">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:max-w-md">
              <LuSearch className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nomor tiket (misal: WASI-2026-0841) atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-panel py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald focus:outline-none"
              />
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStatusFilter(opt)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border",
                    statusFilter === opt
                      ? "bg-emerald text-background border-emerald shadow-xs"
                      : "bg-panel text-muted-foreground border-border hover:bg-panel-secondary hover:text-foreground",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Reports List Grid */}
          <div className="mt-8 space-y-4">
            {filteredReports.map((rep) => {
              const statusVariant =
                rep.status === "Selesai"
                  ? "status-selesai"
                  : rep.status === "Diproses"
                    ? "status-diproses"
                    : rep.status === "Ditugaskan"
                      ? "status-ditugaskan"
                      : rep.status === "Ditolak"
                        ? "status-ditolak"
                        : "status-diterima";

              return (
                <Card
                  key={rep.id}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-border/80 bg-panel p-5 transition-all hover:border-emerald/40 hover:shadow-md"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-emerald">
                        {rep.ticketNumber}
                      </span>
                      <Badge variant={statusVariant}>{rep.status}</Badge>
                      <Badge variant="cyan">{rep.category}</Badge>
                      <Badge
                        variant={
                          rep.urgency === "Darurat"
                            ? "ispu-sangat-tidak-sehat"
                            : rep.urgency === "Tinggi"
                              ? "ispu-tidak-sehat"
                              : "neutral"
                        }
                      >
                        Urgensi: {rep.urgency}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-emerald transition-colors">
                      {rep.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 max-w-3xl">
                      {rep.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground pt-1">
                      <span className="flex items-center gap-1 text-foreground/80">
                        <LuMapPin className="size-3 text-emerald" />
                        {rep.location} (Kec. {rep.district})
                      </span>
                      <span className="flex items-center gap-1">
                        <LuClock className="size-3" />
                        {rep.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border/50">
                    <Link
                      href={`/riwayat/${rep.ticketNumber}`}
                      className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-xl border border-border/80 bg-panel-secondary/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-emerald hover:text-background hover:border-emerald transition-all"
                    >
                      <span>Lihat Rincian & Timeline</span>
                      <LuArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}

            {filteredReports.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground space-y-3">
                <LuSearch className="size-10 text-muted-foreground/40" />
                <p className="text-sm font-semibold">Tidak Ada Laporan yang Cocok</p>
                <p className="text-xs max-w-sm">
                  Tidak ditemukan laporan dengan nomor tiket atau kata kunci tersebut. Periksa ejaan atau ubah filter status Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("Semua");
                  }}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground hover:bg-panel-secondary"
                >
                  Reset Pencarian
                </button>
              </Card>
            ) : null}
          </div>
        </Container>
      </Section>
    </div>
  );
}
