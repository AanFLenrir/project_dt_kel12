"use client";

import {
  LuInfo,
  LuShieldCheck,
  LuDatabase,
  LuFlaskConical,
  LuGlobe,
  LuCloud,
  LuLeaf,
  LuCircleCheck,
  LuCircleAlert,
  LuClock,
  LuSettings,
  LuBookOpen,
  LuRefreshCw,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";

/* ──────────────────────────────────────────────────────────
   Static configuration data — no fake "live" backend status
   ────────────────────────────────────────────────────────── */

const PLATFORM_INFO = {
  name: site.name,
  fullName: site.fullName,
  version: "0.1.0-demo",
  environment: "Demonstrasi / Purwarupa Akademik",
  description: site.description,
  institution: site.institution,
  disclaimer: site.disclaimer,
};

const DATA_SOURCES = [
  {
    id: "open-data-sby",
    label: "Open Data Surabaya — DLH",
    description:
      "Data historis kualitas udara resmi tahun 2023 dari Dinas Lingkungan Hidup Kota Surabaya melalui portal data.surabaya.go.id.",
    url: "https://data.surabaya.go.id/",
    dataType: "historis" as const,
    updateFrequency: "Tahunan (rilis publik)",
    status: "Aktif (Data Historis 2023)",
  },
  {
    id: "bmkg-perak",
    label: "BMKG Stasiun Meteorologi Perak I Surabaya",
    description:
      "Data meteorologi (suhu, kelembapan, kecepatan angin, tekanan) dari stasiun pengamatan cuaca BMKG Kelas I Perak.",
    url: "https://bmkg.go.id/",
    dataType: "referensi" as const,
    updateFrequency: "Referensi dataset harian",
    status: "Aktif (Data Referensi)",
  },
  {
    id: "bmkg-juanda",
    label: "BMKG Stasiun Meteorologi Juanda",
    description:
      "Data meteorologi komplementer dari stasiun BMKG Juanda Sidoarjo untuk konteks cuaca kawasan Surabaya selatan.",
    url: "https://bmkg.go.id/",
    dataType: "referensi" as const,
    updateFrequency: "Referensi dataset harian",
    status: "Aktif (Data Referensi)",
  },
  {
    id: "permen-lhk",
    label: "Permen LHK No. 14 Tahun 2020 — Standar ISPU",
    description:
      "Regulasi baku mutu ISPU (Indeks Standar Pencemar Udara) Kementerian Lingkungan Hidup & Kehutanan RI, digunakan sebagai dasar kategorisasi kualitas udara seluruh platform.",
    url: "https://jdih.menlhk.go.id/",
    dataType: "regulasi" as const,
    updateFrequency: "Tetap (Regulasi berlaku)",
    status: "Aktif (Referensi Regulasi)",
  },
  {
    id: "wasi-asri-internal",
    label: "Repositori Internal WASI ASRI",
    description:
      "Data laporan pengaduan masyarakat, status penanganan, dan data fasilitas pengelolaan sampah yang dikelola langsung oleh platform dalam memori sesi (in-memory store).",
    url: "#",
    dataType: "simulasi" as const,
    updateFrequency: "Real-time (dalam sesi browser)",
    status: "Aktif (Mode Demonstrasi)",
  },
];

const SYSTEM_PARAMETERS = [
  {
    key: "ISPU Early Warning Threshold",
    value: "101",
    unit: "Indeks",
    description: "Ambang batas ISPU untuk memicu peringatan dini otomatis. Merujuk Permen LHK 14/2020: nilai >100 = Tidak Sehat.",
  },
  {
    key: "Radius Estimasi IDW",
    value: "15",
    unit: "km",
    description: "Radius interpolasi spasial Inverse Distance Weighting untuk estimasi kualitas udara di area blank-spot sensor.",
  },
  {
    key: "Jumlah Stasiun SPKU Aktif",
    value: "2",
    unit: "Stasiun",
    description: "Jumlah titik Stasiun Pemantauan Kualitas Udara (SPKU) yang memiliki data historis aktif: Wonorejo & Kebonsari.",
  },
  {
    key: "SLA Penyelesaian Laporan",
    value: "48",
    unit: "Jam",
    description: "Target batas waktu penyelesaian aduan masyarakat mengacu Standar Pelayanan Minimal DLH Kota Surabaya.",
  },
  {
    key: "Mode Aplikasi",
    value: "Demonstrasi",
    unit: "",
    description: "Platform beroperasi sebagai purwarupa akademik. Tidak ada koneksi ke database produksi, API resmi, maupun sistem autentikasi pemerintah.",
  },
];

const dataTypeBadge = {
  historis: { label: "Data Historis Resmi", variant: "prov-aktual" as const },
  referensi: { label: "Data Referensi", variant: "prov-estimasi" as const },
  regulasi: { label: "Regulasi", variant: "emerald" as const },
  simulasi: { label: "Simulasi Pengujian", variant: "prov-simulasi" as const },
};

export function AdminSettingsView() {
  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Pengaturan & Konfigurasi Platform
            </h1>
            <Badge variant="prov-simulasi" size="sm">
              Mode Demonstrasi
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Informasi teknis platform, sumber data lingkungan, parameter sistem, dan status operasional WASI ASRI.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-muted-foreground">
          <LuCircleAlert className="mt-0.5 size-4 shrink-0 text-amber-400" />
          <div className="leading-relaxed">
            <strong className="text-foreground">Pemberitahuan Penting:</strong>{" "}
            {site.disclaimer}
          </div>
        </div>

        {/* Section A: Platform Identity */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-2">
            <LuShieldCheck className="size-5 text-emerald" />
            <h2 className="text-base font-semibold text-foreground">A. Identitas Platform</h2>
          </div>

          <Card className="border-border/80 bg-panel/90 backdrop-blur-xs">
            <dl className="divide-y divide-border/40">
              {[
                { term: "Nama Platform", detail: PLATFORM_INFO.name },
                { term: "Kepanjangan", detail: PLATFORM_INFO.fullName },
                { term: "Versi", detail: PLATFORM_INFO.version },
                { term: "Lingkungan", detail: PLATFORM_INFO.environment },
                { term: "Institusi", detail: PLATFORM_INFO.institution },
              ].map(({ term, detail }) => (
                <div key={term} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-4">
                  <dt className="w-full shrink-0 text-xs font-semibold text-muted-foreground sm:w-48">
                    {term}
                  </dt>
                  <dd className="text-xs text-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </section>

        {/* Section B: Data Sources */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-2">
            <LuDatabase className="size-5 text-cyan" />
            <h2 className="text-base font-semibold text-foreground">B. Sumber Data Lingkungan</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {DATA_SOURCES.map((source) => {
              const badgeInfo = dataTypeBadge[source.dataType];
              return (
                <Card
                  key={source.id}
                  className="border-border/80 bg-panel/90 p-5 backdrop-blur-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {source.dataType === "historis" && <LuDatabase className="size-4 shrink-0 text-emerald" />}
                      {source.dataType === "referensi" && <LuCloud className="size-4 shrink-0 text-cyan" />}
                      {source.dataType === "regulasi" && <LuBookOpen className="size-4 shrink-0 text-emerald" />}
                      {source.dataType === "simulasi" && <LuFlaskConical className="size-4 shrink-0 text-amber-400" />}
                      <h3 className="text-sm font-semibold text-foreground">{source.label}</h3>
                    </div>
                    <Badge variant={badgeInfo.variant} size="sm">
                      {badgeInfo.label}
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {source.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-2.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <LuRefreshCw className="size-3 text-muted-foreground" />
                      {source.updateFrequency}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald">
                      <LuCircleCheck className="size-3" />
                      {source.status}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-cyan/30 bg-cyan/5 p-4 text-xs text-muted-foreground">
            <LuInfo className="mt-0.5 size-4 shrink-0 text-cyan" />
            <div className="leading-relaxed">
              <strong className="text-foreground">Transparansi Provenance Data:</strong> Seluruh data di platform WASI ASRI
              diberi label provenance yang jelas: <span className="font-mono text-emerald">Aktual</span> (data sensor SPKU fisik),{" "}
              <span className="font-mono text-cyan">Estimasi</span> (interpolasi IDW AI),{" "}
              <span className="font-mono text-amber-300">Simulasi</span> (data pengujian prototipe).
              Tidak ada klaim real-time tanpa verifikasi sumber resmi.
            </div>
          </div>
        </section>

        {/* Section C: System Parameters */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-2">
            <LuSettings className="size-5 text-emerald" />
            <h2 className="text-base font-semibold text-foreground">C. Parameter Sistem</h2>
          </div>

          <Card className="border-border/80 bg-panel/90 backdrop-blur-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-panel-secondary/40 text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Parameter</th>
                  <th className="px-3 py-3 font-semibold text-right">Nilai</th>
                  <th className="hidden px-3 py-3 font-semibold sm:table-cell">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {SYSTEM_PARAMETERS.map((param) => (
                  <tr key={param.key} className="hover:bg-panel-secondary/30">
                    <td className="px-5 py-3 font-medium text-foreground">{param.key}</td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-mono text-emerald font-bold">
                        {param.value}
                        {param.unit && (
                          <span className="ml-1 font-normal text-muted-foreground text-[11px]">{param.unit}</span>
                        )}
                      </span>
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell leading-relaxed">
                      {param.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* Section D: System Status */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-2">
            <LuGlobe className="size-5 text-cyan" />
            <h2 className="text-base font-semibold text-foreground">D. Status Layanan Sistem</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Frontend Next.js",
                status: "Berjalan",
                detail: "Next.js 16.3.8 + React 19 + Turbopack",
                icon: LuCircleCheck,
                ok: true,
              },
              {
                label: "Tailwind CSS v4",
                status: "Berjalan",
                detail: "CSS-first, token berbasis @theme",
                icon: LuCircleCheck,
                ok: true,
              },
              {
                label: "Modul AI / IDW",
                status: "Berjalan (In-Memory)",
                detail: "Interpolasi spasial client-side, bukan API eksternal",
                icon: LuCircleCheck,
                ok: true,
              },
              {
                label: "Penyimpanan Data",
                status: "In-Memory (Sesi)",
                detail: "Tidak ada database persistensi. Data direset saat reload.",
                icon: LuClock,
                ok: false,
              },
              {
                label: "API Backend / REST",
                status: "Tidak Tersedia",
                detail: "Platform prototipe tidak terhubung backend produksi.",
                icon: LuCircleAlert,
                ok: false,
              },
              {
                label: "Autentikasi / SSO",
                status: "Tidak Tersedia",
                detail: "Tidak ada sistem login aktif. Halaman admin dapat diakses langsung.",
                icon: LuCircleAlert,
                ok: false,
              },
            ].map(({ label, status, detail, icon: Icon, ok }) => (
              <Card
                key={label}
                className="border-border/80 bg-panel/90 p-4 backdrop-blur-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-foreground">{label}</span>
                  <Icon
                    className={`size-4 shrink-0 ${ok ? "text-emerald" : "text-amber-400"}`}
                  />
                </div>
                <p className={`mt-1 text-sm font-medium ${ok ? "text-emerald" : "text-amber-400"}`}>
                  {status}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer Credit */}
        <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-panel/50 p-4 text-xs text-muted-foreground">
          <LuLeaf className="size-4 shrink-0 text-emerald" />
          <span>
            WASI ASRI v{PLATFORM_INFO.version} — {site.academicContext.group},{" "}
            {site.academicContext.program}, {site.academicContext.faculty},{" "}
            {site.academicContext.university} &bull; Tahun Akademik {site.academicContext.year}
          </span>
        </div>
      </div>
    </AdminShell>
  );
}
