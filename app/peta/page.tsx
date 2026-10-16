import type { Metadata } from "next";
import { LuMapPin } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EnvironmentalMap } from "@/components/ui/environmental-map";

export const metadata: Metadata = {
  title: "Peta Spasial Lingkungan Surabaya (GIS) — WASI ASRI",
  description:
    "Eksplorasi peta interaktif geospasial Kota Surabaya: sebaran stasiun kualitas udara SPKU, lokasi fasilitas persampahan TPS/3R, dan sebaran laporan insiden lingkungan warga.",
};

export default function EnvironmentalMapPage() {
  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <Section className="pb-2">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuMapPin className="size-4" />
                <span>Geographic Information System (GIS)</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Peta Spasial Lingkungan Kota Surabaya
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Visualisasi terpadu titik stasiun pemantau udara fisik, fasilitas pengelolaan persampahan, titik laporan masyarakat aktif, dan kawasan Ruang Terbuka Hijau (RTH) Surabaya.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-aktual">Koordinat Terverifikasi</Badge>
              <Badge variant="outline">GIS Surabaya</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Map Container */}
      <Section className="py-0">
        <Container>
          {/* Broad, expansive map canvas */}
          <EnvironmentalMap height={620} showControls={true} />

          {/* Guidelines on Map Layers & Methodology */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <Card className="border-border/80 bg-panel p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <span className="size-2.5 rounded-full bg-emerald" />
                <span>Stasiun SPKU Resmi</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Stasiun pemantau kualitas udara fisik di Wonorejo (Timur), Kebonsari (Selatan), dan Tandes (Barat) yang mengukur konsentrasi polutan PM2.5, PM10, SO2, CO, O3, dan NO2.
              </p>
            </Card>

            <Card className="border-border/80 bg-panel p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <span className="size-2.5 rounded-full bg-cyan" />
                <span>Fasilitas Persampahan</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Tempat Penampungan Sementara (TPS), TPS-3R percontohan, Rumah Kompos, dan Bank Sampah Induk berdasarkan direktori Open Data Dinas Lingkungan Hidup Surabaya.
              </p>
            </Card>

            <Card className="border-border/80 bg-panel p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span>Laporan Masyarakat</span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Titik lokasi laporan masyarakat yang masuk melalui portal WASI ASRI. Warna hijau menandakan laporan telah terselesaikan di lapangan.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
