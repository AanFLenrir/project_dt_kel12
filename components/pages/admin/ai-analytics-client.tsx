"use client";

import { useState } from "react";
import {
  LuBrainCircuit,
  LuMapPin,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { BarChartCard } from "@/components/ui/chart-components";
import { getReports } from "@/lib/reports-store";
import { estimateSpatialAirQuality, type SpatialAirQualityEstimate } from "@/lib/ai-service";

const BLANK_SPOT_LOCATIONS = [
  { name: "Surabaya Pusat (Kec. Genteng)", lat: -7.2605, lng: 112.7482 },
  { name: "Surabaya Timur (Kec. Sukolilo)", lat: -7.2885, lng: 112.7845 },
  { name: "Surabaya Selatan (Kec. Wonokromo)", lat: -7.2995, lng: 112.7385 },
  { name: "Surabaya Barat (Kec. Sambikerep)", lat: -7.2755, lng: 112.6512 },
  { name: "Surabaya Utara (Kec. Semampir)", lat: -7.2255, lng: 112.7485 },
];

export function AdminAiAnalyticsView() {
  const reports = getReports();

  const [selectedLocIdx, setSelectedLocIdx] = useState(0);
  const selectedLoc = BLANK_SPOT_LOCATIONS[selectedLocIdx];

  const [spatialEstimate, setSpatialEstimate] = useState<SpatialAirQualityEstimate>(() =>
    estimateSpatialAirQuality(selectedLoc.lat, selectedLoc.lng),
  );

  function handleCalculateSpatial(idx: number) {
    setSelectedLocIdx(idx);
    const loc = BLANK_SPOT_LOCATIONS[idx];
    setSpatialEstimate(estimateSpatialAirQuality(loc.lat, loc.lng));
  }

  // AI Classification Breakdown
  const aiUrgencyDistribution = [
    { label: "Darurat (Tindakan < 2 Jam)", value: 1, color: "#ef4444" },
    { label: "Tinggi (Tindakan < 12 Jam)", value: 2, color: "#f59e0b" },
    { label: "Sedang (Tindakan 24 Jam)", value: 1, color: "#3b82f6" },
    { label: "Rendah (Penjadwalan Rutin)", value: 0, color: "#10b981" },
  ];

  return (
    <AdminShell
      title="Analisis Kecerdasan Buatan (AI Engine)"
      description="Evaluasi model Computer Vision & NLP untuk triage aduan warga serta pemodelan estimasi spasial kualitas udara (IDW)."
    >
      <div className="space-y-8">
        {/* Model Meta Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/70 bg-panel p-4 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Arsitektur AI Triage:
            </span>
            <p className="text-sm font-bold text-emerald">WASI-EcoVision v1.4</p>
            <p className="text-[11px] text-muted-foreground">Heuristik NLP & Computer Vision Classifier</p>
          </Card>

          <Card className="border-border/70 bg-panel p-4 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Rata-rata Skor Keyakinan:
            </span>
            <p className="text-sm font-bold text-cyan">92.5% Confidence</p>
            <p className="text-[11px] text-muted-foreground">Berdasarkan 4 aduan terverifikasi</p>
          </Card>

          <Card className="border-border/70 bg-panel p-4 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">
              Model Estimasi Spasial:
            </span>
            <p className="text-sm font-bold text-foreground">Spatial IDW Interpolation</p>
            <p className="text-[11px] text-muted-foreground">Interpolasi 3 titik SPKU fisik Surabaya</p>
          </Card>
        </div>

        {/* Section 1: AI Triage In Action */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <LuBrainCircuit className="size-5 text-emerald" />
                Riwayat Inferensi AI Triage Terhadap Aduan Masuk
              </h3>
              <p className="text-xs text-muted-foreground">
                Hasil deteksi entitas visual dan analisis sentimen deskripsi untuk penentuan prioritas penanganan.
              </p>
            </div>
            <Badge variant="prov-estimasi">Estimasi AI Purwarupa</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((rep) => (
              <Card key={rep.id} className="border-border/80 bg-panel p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald">
                      {rep.ticketNumber}
                    </span>
                    <h4 className="text-xs font-bold text-foreground mt-0.5">{rep.title}</h4>
                  </div>
                  <Badge
                    variant={
                      rep.urgency === "Darurat"
                        ? "ispu-sangat-tidak-sehat"
                        : rep.urgency === "Tinggi"
                          ? "ispu-tidak-sehat"
                          : "neutral"
                    }
                  >
                    {rep.urgency}
                  </Badge>
                </div>

                <div className="rounded-lg border border-border/70 bg-panel-secondary/50 p-3 text-xs space-y-1.5">
                  <p className="text-muted-foreground text-[11px]">
                    <strong className="text-foreground">Catatan Triage:</strong> {rep.aiTriageNotes}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/40">
                    <span className="text-muted-foreground">Tingkat Keyakinan: <strong>{Math.round(rep.aiConfidence * 100)}%</strong></span>
                    <span className="text-cyan font-medium">{rep.assignedUnit}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Urgency Distribution & Spatial Estimation Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartCard
            title="Distribusi Tingkat Urgensi AI"
            subtitle="Klasifikasi eskalasi penanganan aduan masyarakat oleh sistem cerdas."
            unit="Aduan"
            data={aiUrgencyDistribution}
            source="Evaluasi Model WASI-EcoVision"
          />

          {/* Spatial Model IDW Simulator Tool */}
          <Card className="border-border/80 bg-panel p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <LuMapPin className="size-4 text-cyan" />
                  <h3 className="text-sm font-bold text-foreground">
                    Model Estimasi Spasial Wilayah Blank-Spot
                  </h3>
                </div>
                <Badge variant="prov-estimasi">Inverse Distance Weighting</Badge>
              </div>

              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Pilih kawasan di Surabaya yang tidak memiliki sensor fisik SPKU langsung untuk melihat perkiraan kualitas udara berdasarkan interpolasi spasial:
              </p>

              <div className="mt-4 space-y-3">
                <Field id="spatial-loc" label="Pilih Lokasi Titik Uji Spasial">
                  <Select
                    id="spatial-loc"
                    value={selectedLocIdx.toString()}
                    onChange={(e) => handleCalculateSpatial(parseInt(e.target.value))}
                  >
                    {BLANK_SPOT_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={idx.toString()}>
                        {loc.name}
                      </option>
                    ))}
                  </Select>
                </Field>

                <div className="rounded-xl border border-cyan/30 bg-cyan/5 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimasi Nilai ISPU:</span>
                    <Badge variant={spatialEstimate.estimatedIspu <= 50 ? "ispu-baik" : "ispu-sedang"} className="text-sm px-2.5 py-0.5">
                      ISPU {spatialEstimate.estimatedIspu} (Sedang)
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Stasiun Rujukan Terdekat:</span>
                    <strong className="text-foreground">{spatialEstimate.nearestStation} ({spatialEstimate.distanceKm} km)</strong>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Batas Ketidakpastian:</span>
                    <span className="text-cyan font-mono">± {spatialEstimate.confidenceMarginPercent}%</span>
                  </div>

                  <p className="text-[10px] text-muted-foreground/80 pt-1 border-t border-cyan/20">
                    {spatialEstimate.disclaimer}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50 pt-2 text-[10px] text-muted-foreground flex items-center justify-between">
              <span>Metode: {spatialEstimate.modelType}</span>
              <span className="text-emerald font-semibold">Tervalidasi Akademik UNAIR</span>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
