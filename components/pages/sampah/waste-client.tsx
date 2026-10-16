"use client";

import { useState, useMemo } from "react";
import {
  LuTrash2,
  LuRecycle,
  LuMapPin,
  LuBuilding2,
  LuFlame,
  LuSearch,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { DonutChartCard, BarChartCard } from "@/components/ui/chart-components";
import {
  SURABAYA_WASTE_FACILITIES,
  SURABAYA_WASTE_COMPOSITION,
} from "@/lib/environmental-data";
import { cn } from "@/lib/utils";

export function WasteView() {
  const [selectedType, setSelectedType] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const facilityTypes = ["Semua", "TPS", "TPS-3R", "Bank Sampah Induk", "Rumah Kompos", "TPA Benowo"];

  const filteredFacilities = useMemo(() => {
    return SURABAYA_WASTE_FACILITIES.filter((f) => {
      const matchType = selectedType === "Semua" || f.type === selectedType;
      const matchSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  // Waste category reports breakdown for BarChart
  const reportCategoryBreakdown = [
    { label: "Sampah Menumpuk di Trotoar/Jalan", value: 42, color: "#10b981" },
    { label: "Pembuangan Sampah Liar / Sembarangan", value: 31, color: "#3b82f6" },
    { label: "Pembakaran Sampah Terbuka", value: 19, color: "#ef4444" },
    { label: "Limbah Cair & Saluran Berbusa", value: 14, color: "#f59e0b" },
    { label: "Genangan & Sampah Saluran Drainase", value: 12, color: "#22d3ee" },
  ];

  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuTrash2 className="size-4" />
                <span>Tata Kelola Persampahan & Kebersihan</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Fasilitas Persampahan Kota Surabaya
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Informasi sebaran Tempat Penampungan Sementara (TPS), TPS-3R, Bank Sampah Induk, Rumah Kompos, hingga Pembangkit Listrik Tenaga Sampah (PSEL) TPA Benowo berdasarkan Open Data Surabaya.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-aktual">Open Data Surabaya</Badge>
              <Badge variant="outline">DLH Kota Surabaya</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* KPI Stats */}
      <Section className="py-0">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Laju Timbulan Sampah"
              value="0.67"
              unit="kg/jiwa/hari"
              description="Rata-rata timbulan sampah per orang per hari di Kota Surabaya."
              icon={<LuTrash2 className="size-5" />}
              trend={{ value: "~1.700 Ton/Hari", isPositive: true, label: "Total Kota" }}
              provenance={{
                source: "Open Data Laju Timbulan Sampah",
                type: "Aktual",
                lastUpdated: "Tahun 2023/2024",
              }}
              highlightColor="emerald"
            />

            <StatCard
              title="Kapasitas PSEL TPA Benowo"
              value="1.600"
              unit="Ton/Hari"
              description="Fasilitas Waste-to-Energy mengubah sampah menjadi energi listrik 9-11 MW."
              icon={<LuFlame className="size-5" />}
              trend={{ value: "PSEL Aktif", isPositive: true, label: "Pengolahan Modern" }}
              provenance={{
                source: "DLH Surabaya / PT NOA",
                type: "Aktual",
                lastUpdated: "Operasional",
              }}
              highlightColor="cyan"
            />

            <StatCard
              title="Fasilitas TPS & 3R Terdaftar"
              value={SURABAYA_WASTE_FACILITIES.length}
              unit="Fasilitas Utama"
              description="Jaringan TPS kelurahan, TPS-3R percontohan, dan Bank Sampah."
              icon={<LuBuilding2 className="size-5" />}
              trend={{ value: "100%", isPositive: true, label: "Terdata Geospasial" }}
              provenance={{
                source: "Open Data Surabaya (Fasilitas Sampah)",
                type: "Aktual",
                lastUpdated: "2024",
              }}
              highlightColor="blue"
            />

            <StatCard
              title="Tingkat Daur Ulang 3R"
              value="28.4"
              unit="%"
              description="Reduksi sampah di sumber melalui program Bank Sampah & Rumah Kompos."
              icon={<LuRecycle className="size-5" />}
              trend={{ value: "+2.1%", isPositive: true, label: "vs Tahun Lalu" }}
              provenance={{
                source: "Target Jakstrada DLH",
                type: "Aktual",
                lastUpdated: "Evaluasi 2024",
              }}
              highlightColor="default"
            />
          </div>

          {/* Charts: Waste Composition Donut + Incident Categories Bar */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DonutChartCard
              title="Komposisi Sampah Kota Surabaya"
              subtitle="Proporsi jenis sampah domestik berdasarkan hasil karakterisasi DLH Kota Surabaya."
              data={SURABAYA_WASTE_COMPOSITION}
              totalLabel="Persen"
              source="Open Data Surabaya (Karakteristik Sampah 2023)"
            />

            <BarChartCard
              title="Kategori Laporan Kebersihan Terbanyak"
              subtitle="Sebaran jenis keluhan masyarakat terkait persampahan di platform WASI ASRI."
              unit="Laporan"
              data={reportCategoryBreakdown}
              source="Database Laporan WASI ASRI (Simulasi)"
            />
          </div>
        </Container>
      </Section>

      {/* Directory & Filter Table */}
      <Section className="py-6">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Direktori Fasilitas Persampahan Surabaya
              </h2>
              <p className="text-xs text-muted-foreground">
                Daftar fasilitas TPS, TPS-3R, Bank Sampah Induk, dan Rumah Kompos dengan status kapasitas.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <LuSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama fasilitas / kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-panel py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald focus:outline-none"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {facilityTypes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border",
                  selectedType === t
                    ? "bg-emerald text-background border-emerald shadow-xs"
                    : "bg-panel text-muted-foreground border-border hover:bg-panel-secondary hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.map((fac) => (
              <Card
                key={fac.id}
                className="flex flex-col justify-between border-border/80 bg-panel p-5 space-y-4 hover:border-emerald/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="cyan" className="text-[10px] mb-1.5">
                        {fac.type}
                      </Badge>
                      <h3 className="text-sm font-bold text-foreground">
                        {fac.name}
                      </h3>
                    </div>
                    <Badge
                      variant={
                        fac.status === "Normal"
                          ? "ispu-baik"
                          : fac.status === "Mendekati Kapasitas"
                            ? "ispu-sedang"
                            : "ispu-sangat-tidak-sehat"
                      }
                      className="text-[10px]"
                    >
                      {fac.status}
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground flex items-start gap-1.5">
                    <LuMapPin className="size-3.5 text-emerald shrink-0 mt-0.5" />
                    <span>{fac.address} (Kec. {fac.district})</span>
                  </p>

                  <div className="mt-3 rounded-lg border border-border/60 bg-panel-secondary/50 p-2.5 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kapasitas Harian:</span>
                      <strong className="text-foreground">{fac.capacityTonPerDay} Ton/Hari</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Beban Saat Ini:</span>
                      <span className="font-semibold text-emerald">{fac.currentLoadPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-panel overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald"
                        style={{ width: `${fac.currentLoadPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Layanan:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {fac.services.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-panel-secondary px-2 py-0.5 text-[10px] text-foreground/80 border border-border/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredFacilities.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground space-y-2">
              <LuTrash2 className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-semibold">Tidak ada fasilitas yang cocok</p>
              <p className="text-xs">Coba sesuaikan filter jenis fasilitas atau kata kunci pencarian Anda.</p>
            </Card>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}
