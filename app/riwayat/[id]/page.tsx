import type { Metadata } from "next";
import Link from "next/link";
import {
  LuArrowLeft,
  LuMapPin,
  LuClock,
  LuBrainCircuit,
  LuShieldAlert,
  LuCircleCheck,
  LuUser,
  LuBuilding2,
  LuImage,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  INITIAL_CITIZEN_REPORTS,
  getReportByTicket,
} from "@/lib/reports-store";

export function generateStaticParams() {
  return INITIAL_CITIZEN_REPORTS.map((r) => ({
    id: r.ticketNumber,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const report = getReportByTicket(id);

  if (!report) {
    return {
      title: "Laporan Tidak Ditemukan — WASI ASRI",
    };
  }

  return {
    title: `Tiket ${report.ticketNumber}: ${report.title} — WASI ASRI`,
    description: report.description,
  };
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReportByTicket(id);

  if (!report) {
    return (
      <Section className="py-20">
        <Container>
          <Card className="max-w-xl mx-auto p-8 text-center space-y-4 border-border/80">
            <LuShieldAlert className="size-12 mx-auto text-amber-500" />
            <h1 className="text-xl font-bold text-foreground">
              Nomor Tiket &quot;{id}&quot; Tidak Ditemukan
            </h1>
            <p className="text-xs text-muted-foreground">
              Pastikan Anda memasukkan format nomor tiket yang benar (contoh: WASI-2026-0841).
            </p>
            <div className="pt-2">
              <Link
                href="/riwayat"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-2.5 text-xs font-semibold text-background hover:bg-emerald/90 transition-colors"
              >
                <LuArrowLeft className="size-3.5" />
                <span>Kembali ke Daftar Laporan</span>
              </Link>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  const statusVariant =
    report.status === "Selesai"
      ? "status-selesai"
      : report.status === "Diproses"
        ? "status-diproses"
        : report.status === "Ditugaskan"
          ? "status-ditugaskan"
          : report.status === "Ditolak"
            ? "status-ditolak"
            : "status-diterima";

  return (
    <div className="py-8 space-y-8">
      {/* Top back navigation */}
      <Section className="pb-0">
        <Container>
          <Link
            href="/riwayat"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-emerald transition-colors"
          >
            <LuArrowLeft className="size-3.5" />
            <span>Kembali ke Pelacakan Riwayat</span>
          </Link>
        </Container>
      </Section>

      {/* Main Detail Header */}
      <Section className="py-0">
        <Container>
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-emerald">
                    {report.ticketNumber}
                  </span>
                  <Badge variant={statusVariant}>{report.status}</Badge>
                  <Badge variant="cyan">{report.category}</Badge>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {report.title}
                </h1>
              </div>

              <div className="text-right text-xs text-muted-foreground">
                <p>Dilaporkan: {report.createdAt}</p>
                <p className="text-[11px] text-emerald font-semibold mt-0.5">
                  Update Terakhir: {report.updatedAt}
                </p>
              </div>
            </div>

            {/* Two column layout: Info + Photo on left, Timeline on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (2 Cols) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Photo Evidence */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <LuImage className="size-3.5 text-emerald" />
                    Bukti Foto Kejadian
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-border/80 bg-panel-secondary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={report.photoUrl}
                          alt={`Bukti Laporan ${report.ticketNumber}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Kondisi Awal Dilaporkan
                      </span>
                    </div>

                    {report.resolutionPhotoUrl ? (
                      <div className="space-y-1.5">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald/50 bg-panel-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={report.resolutionPhotoUrl}
                            alt={`Bukti Penyelesaian ${report.ticketNumber}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-emerald flex items-center gap-1">
                          <LuCircleCheck className="size-3" />
                          Bukti Penyelesaian di Lokasi
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-2">
                  <h4 className="text-xs font-bold text-foreground">Deskripsi Permasalahan:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {report.description}
                  </p>
                </div>

                {/* Location & Reporter Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-2">
                    <h4 className="font-bold text-foreground flex items-center gap-1.5">
                      <LuMapPin className="size-3.5 text-emerald" />
                      Lokasi Kejadian
                    </h4>
                    <p className="text-foreground">{report.location}</p>
                    <p className="text-muted-foreground text-[11px]">
                      Kecamatan {report.district} (Lat: {report.coordinates.lat}, Lng: {report.coordinates.lng})
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-2">
                    <h4 className="font-bold text-foreground flex items-center gap-1.5">
                      <LuUser className="size-3.5 text-cyan" />
                      Identitas Pelapor
                    </h4>
                    <p className="text-foreground">{report.reporterName}</p>
                    <p className="text-muted-foreground text-[11px]">
                      Kontak: {report.reporterPhone || "Tersimpan di sistem"}
                    </p>
                  </div>
                </div>

                {/* AI Triage Card */}
                <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <LuBrainCircuit className="size-4 text-emerald" />
                      <span>Catatan Hasil AI Triage</span>
                    </div>
                    <Badge variant="prov-estimasi">Keyakinan Model: {Math.round(report.aiConfidence * 100)}%</Badge>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {report.aiTriageNotes}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald font-semibold">
                    <LuBuilding2 className="size-3.5" />
                    <span>Disposisi Unit: {report.assignedUnit}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Status Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <LuClock className="size-3.5 text-emerald" />
                  Kronologi Status Penanganan
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {report.history.map((step, idx) => {
                    const isLatest = idx === report.history.length - 1;
                    return (
                      <div key={idx} className="relative space-y-1 text-xs">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-6 top-0.5 size-4 rounded-full border-2 border-panel ${
                            isLatest ? "bg-emerald ring-2 ring-emerald/30" : "bg-muted-foreground"
                          }`}
                        />

                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold ${
                              isLatest ? "text-emerald" : "text-foreground"
                            }`}
                          >
                            Status: {step.status}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {step.timestamp.split(",")[0]}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                          {step.note}
                        </p>

                        {step.officer ? (
                          <p className="text-[10px] text-cyan font-medium pt-0.5">
                            Oleh: {step.officer}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
