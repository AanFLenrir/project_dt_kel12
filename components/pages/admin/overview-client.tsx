"use client";

import Link from "next/link";
import {
  LuClipboardList,
  LuClock,
  LuCircleCheck,
  LuFlame,
  LuWind,
  LuCloudSun,
  LuArrowRight,
  LuShieldAlert,
  LuMapPin,
  LuEye,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  IspuGaugeMeter,
  AreaChartCard,
  DonutChartCard,
} from "@/components/ui/chart-components";
import { EnvironmentalMap } from "@/components/ui/environmental-map";
import { getReports } from "@/lib/reports-store";
import {
  SURABAYA_HISTORICAL_ISPU,
  SURABAYA_WEATHER_DATA,
} from "@/lib/environmental-data";

export function AdminOverviewView() {
  const reports = getReports();

  const totalReports = reports.length;
  const newReports = reports.filter((r) => r.status === "Diterima").length;
  const inProgressReports = reports.filter(
    (r) => r.status === "Diproses" || r.status === "Ditugaskan",
  ).length;
  const resolvedReports = reports.filter((r) => r.status === "Selesai").length;
  const highPriorityReports = reports.filter(
    (r) => r.urgency === "Darurat" || r.urgency === "Tinggi",
  ).length;

  const currentWeather = SURABAYA_WEATHER_DATA[0];

  // Distribution for Donut Chart
  const categoryCounts: Record<string, number> = {};
  reports.forEach((r) => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });

  const donutColors = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b", "#22d3ee"];
  const donutData = Object.entries(categoryCounts).map(([label, value], i) => ({
    label,
    value,
    color: donutColors[i % donutColors.length],
  }));

  return (
    <AdminShell
      title="Pusat Komando Environmental Intelligence"
      description="Ringkasan operasional monitoring kualitas udara, cuaca meteorologi, dan eskalasi penanganan aduan masyarakat Kota Surabaya."
    >
      <div className="space-y-8">
        {/* KPI Stat Cards (4 Columns) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Aduan Warga"
            value={totalReports}
            unit="Tiket"
            description="Total akumulasi laporan yang masuk ke sistem."
            icon={<LuClipboardList className="size-5" />}
            trend={{ value: `${newReports} Baru`, isPositive: true }}
            provenance={{
              source: "Database WASI ASRI",
              type: "Simulasi",
              lastUpdated: "Hari ini",
            }}
            highlightColor="emerald"
          />

          <StatCard
            title="Dalam Penanganan"
            value={inProgressReports}
            unit="Tiket"
            description="Sedang ditangani satgas lapangan DLH."
            icon={<LuClock className="size-5" />}
            trend={{ value: "Ditugaskan", isPositive: true }}
            provenance={{
              source: "Disposisi Satgas",
              type: "Simulasi",
              lastUpdated: "Hari ini",
            }}
            highlightColor="cyan"
          />

          <StatCard
            title="Aduan Selesai"
            value={resolvedReports}
            unit="Tiket"
            description="Tuntas dibersihkan dengan bukti foto."
            icon={<LuCircleCheck className="size-5" />}
            trend={{ value: `${Math.round((resolvedReports / (totalReports || 1)) * 100)}% Rasio`, isPositive: true }}
            provenance={{
              source: "Verifikasi Lapangan",
              type: "Simulasi",
              lastUpdated: "Hari ini",
            }}
            highlightColor="default"
          />

          <StatCard
            title="Prioritas Tinggi & Darurat"
            value={highPriorityReports}
            unit="Kasus"
            description="Pembakaran sampah terbuka & bau menyengat."
            icon={<LuFlame className="size-5 text-rose-400" />}
            trend={{ value: "Atensi Cepat", isPositive: false }}
            provenance={{
              source: "AI Triage Engine",
              type: "Estimasi",
              lastUpdated: "Hari ini",
            }}
            highlightColor="rose"
          />

          <StatCard
            title="ISPU Rata-rata Kota"
            value="66"
            unit="Sedang"
            description="Parameter Kritis PM2.5 dari 3 SPKU aktif."
            icon={<LuWind className="size-5 text-emerald" />}
            trend={{ value: "Baku Mutu Aman", isPositive: true }}
            provenance={{
              source: "Open Data DLH SPKU",
              type: "Aktual",
              lastUpdated: "10:00 WIB",
            }}
            highlightColor="blue"
          />
        </div>

        {/* Middle Visuals: Gauge + Area Trend + Donut Category */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Gauge ISPU & Weather snapshot */}
          <div className="space-y-6 lg:col-span-1">
            <IspuGaugeMeter
              value={66}
              criticalParam="PM2.5"
              stationName="Indeks Konsolidasi 3 SPKU"
            />

            <Card className="border-border/80 bg-panel p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <div className="flex items-center gap-2">
                  <LuCloudSun className="size-4 text-cyan" />
                  <h3 className="text-xs font-bold text-foreground">
                    Konteks Cuaca BMKG ({currentWeather.region})
                  </h3>
                </div>
                <Badge variant="cyan" className="text-[10px]">{currentWeather.temperature}°C</Badge>
              </div>
              <div className="text-xs space-y-1.5 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Kelembapan Relatif:</span>
                  <strong className="text-foreground">{currentWeather.humidity}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kecepatan Angin:</span>
                  <strong className="text-foreground">{currentWeather.windSpeed} km/jam ({currentWeather.windDirection})</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kondisi Atmosfer:</span>
                  <span className="text-emerald font-semibold">{currentWeather.weatherCondition}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle & Right: Trend + Donut Breakdown */}
          <div className="space-y-6 lg:col-span-2">
            <AreaChartCard
              title="Tren Dinamika Kualitas Udara Mingguan"
              subtitle="Pergerakan ISPU agregat harian Surabaya terhadap batas aman baku mutu 100."
              unit="ISPU"
              data={SURABAYA_HISTORICAL_ISPU}
              primaryLabel="ISPU Rata-rata"
              secondaryLabel="Batas Aman Baku Mutu (100)"
              source="Open Data Surabaya (Dataset DLH 2023)"
            />

            <DonutChartCard
              title="Sebaran Kategori Keluhan Lingkungan"
              subtitle="Distribusi aduan warga berdasarkan jenis pencemaran di Surabaya."
              data={donutData}
              totalLabel="Total Tiket"
              source="Data Store WASI ASRI (Simulasi)"
            />
          </div>
        </div>

        {/* GIS Map Command Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <LuMapPin className="size-4 text-emerald" />
                Peta Situasi Geospasial Aduan & Sensor
              </h3>
              <p className="text-xs text-muted-foreground">
                Pantau konsentrasi aduan aktif dan status 3 stasiun pemantauan udara.
              </p>
            </div>
            <Link
              href="/admin/peta"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:underline"
            >
              <span>Buka GIS Lengkap</span>
              <LuArrowRight className="size-3.5" />
            </Link>
          </div>
          <EnvironmentalMap height={400} showControls={true} />
        </div>

        {/* Recent Reports Table */}
        <Card className="border-border/80 bg-panel p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <LuShieldAlert className="size-4 text-emerald" />
                Daftar Aduan Warga Terbaru
              </h3>
              <p className="text-xs text-muted-foreground">
                Aduan masyarakat yang memerlukan atensi penugasan satgas lapangan.
              </p>
            </div>
            <Link
              href="/admin/laporan"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald hover:underline"
            >
              <span>Kelola Semua Laporan</span>
              <LuArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-panel-secondary/40 text-muted-foreground">
                <tr>
                  <th className="p-3 font-semibold">Nomor Tiket</th>
                  <th className="p-3 font-semibold">Kategori & Judul</th>
                  <th className="p-3 font-semibold">Lokasi</th>
                  <th className="p-3 font-semibold">Urgensi</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {reports.slice(0, 5).map((rep) => {
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
                    <tr key={rep.id} className="hover:bg-panel-secondary/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-emerald">
                        {rep.ticketNumber}
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-foreground line-clamp-1">{rep.title}</p>
                        <p className="text-[11px] text-muted-foreground">{rep.category}</p>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {rep.district}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            rep.urgency === "Darurat"
                              ? "ispu-sangat-tidak-sehat"
                              : rep.urgency === "Tinggi"
                                ? "ispu-tidak-sehat"
                                : "neutral"
                          }
                          className="text-[10px]"
                        >
                          {rep.urgency}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={statusVariant} className="text-[10px]">
                          {rep.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/admin/laporan?id=${rep.ticketNumber}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-emerald hover:text-background hover:border-emerald transition-all"
                        >
                          <LuEye className="size-3" />
                          <span>Tinjau</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
