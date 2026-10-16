"use client";

import {
  LuInfo,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnvironmentalMap } from "@/components/ui/environmental-map";
import { SURABAYA_SPKU_STATIONS, SURABAYA_WASTE_FACILITIES } from "@/lib/environmental-data";
import { getReports } from "@/lib/reports-store";

export function AdminGisView() {
  const reports = getReports();

  return (
    <AdminShell
      title="Pusat Komando Geospasial (GIS)"
      description="Visualisasi spasial pemetaan terpadu stasiun kualitas udara, titik fasilitas persampahan, dan sebaran laporan masyarakat Kota Surabaya."
    >
      <div className="space-y-6">
        {/* Quick status bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Card className="border-border/70 bg-panel p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Stasiun Sensor:</span>
              <p className="text-base font-bold text-emerald">{SURABAYA_SPKU_STATIONS.length} Titik SPKU</p>
            </div>
            <Badge variant="prov-aktual">Aktif</Badge>
          </Card>

          <Card className="border-border/70 bg-panel p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Fasilitas Sampah:</span>
              <p className="text-base font-bold text-cyan">{SURABAYA_WASTE_FACILITIES.length} Titik TPS/3R</p>
            </div>
            <Badge variant="cyan">Terdaftar</Badge>
          </Card>

          <Card className="border-border/70 bg-panel p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Aduan Warga di Peta:</span>
              <p className="text-base font-bold text-amber-400">{reports.length} Insiden</p>
            </div>
            <Badge variant="prov-simulasi">Terplot</Badge>
          </Card>

          <Card className="border-border/70 bg-panel p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Cakupan Wilayah:</span>
              <p className="text-base font-bold text-foreground">31 Kecamatan</p>
            </div>
            <Badge variant="outline">Kota Surabaya</Badge>
          </Card>
        </div>

        {/* Expansive Map View */}
        <EnvironmentalMap height={650} showControls={true} />

        {/* GIS Analytical Summary */}
        <Card className="border-border/80 bg-panel p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 border-b border-border/50 pb-2.5">
            <LuInfo className="size-4 text-emerald" />
            <h3 className="font-bold text-foreground">
              Prosedur Operasional Pemantauan Geospasial DLH Surabaya
            </h3>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Peta komando ini memproyeksikan koordinat GPS desimal aktual ke dalam bidang kartografi Kota Surabaya (rentang Latitude: -7.36 hingga -7.18, Longitude: 112.60 hingga 112.85). Petugas pengawas dapat mengidentifikasi klaster penumpukan sampah liar dan mengarahkan armada truk terdekat secara efisien.
          </p>
        </Card>
      </div>
    </AdminShell>
  );
}
