"use client";

import { useState } from "react";
import {
  LuWind,
  LuMapPin,
  LuInfo,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IspuGaugeMeter, AreaChartCard } from "@/components/ui/chart-components";
import {
  SURABAYA_SPKU_STATIONS,
  SURABAYA_HISTORICAL_ISPU,
  type AirQualityStation,
} from "@/lib/environmental-data";
import { cn } from "@/lib/utils";

export function AirQualityView() {
  const [selectedStationId, setSelectedStationId] = useState<string>("spku-wonorejo");

  const currentStation: AirQualityStation =
    SURABAYA_SPKU_STATIONS.find((s) => s.id === selectedStationId) ||
    SURABAYA_SPKU_STATIONS[0];

  const pollutantList = [
    {
      key: "pm25",
      name: "Partikulat Halus (PM2.5)",
      value: currentStation.pollutants.pm25.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.pm25.standard,
      desc: "Partikel mikroskopis berdiameter < 2.5 µm yang dapat masuk ke saluran pernapasan dalam.",
    },
    {
      key: "pm10",
      name: "Partikulat Kasar (PM10)",
      value: currentStation.pollutants.pm10.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.pm10.standard,
      desc: "Debu jalanan dan partikel suspensi industri berdiameter < 10 µm.",
    },
    {
      key: "so2",
      name: "Sulfur Dioksida (SO2)",
      value: currentStation.pollutants.so2.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.so2.standard,
      desc: "Gas emisi pembakaran bahan bakar fosil dan aktivitas kawasan industri.",
    },
    {
      key: "co",
      name: "Karbon Monoksida (CO)",
      value: currentStation.pollutants.co.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.co.standard,
      desc: "Gas hasil pembakaran tidak sempurna dari kendaraan bermotor padat.",
    },
    {
      key: "o3",
      name: "Ozon Permukaan (O3)",
      value: currentStation.pollutants.o3.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.o3.standard,
      desc: "Polutan sekunder dari reaksi fotokimia sinar matahari dengan gas buang.",
    },
    {
      key: "no2",
      name: "Nitrogen Dioksida (NO2)",
      value: currentStation.pollutants.no2.value,
      unit: "µg/m³",
      standard: currentStation.pollutants.no2.standard,
      desc: "Gas emisi transportasi dan cerobong manufaktur.",
    },
  ];

  return (
    <div className="py-8 space-y-10">
      {/* Header Page */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuWind className="size-4" />
                <span>Monitoring Kualitas Udara Resmi</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Indeks Standar Pencemar Udara (ISPU)
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Data pengukuran fisik dari 3 Stasiun Pemantau Kualitas Udara (SPKU) Kota Surabaya sesuai standar regulasi Permen LHK No. 14 Tahun 2020.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-aktual">Pengukuran Fisik Sensor</Badge>
              <Badge variant="outline">Permen LHK 14/2020</Badge>
            </div>
          </div>

          {/* Station Selector Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SURABAYA_SPKU_STATIONS.map((station) => {
              const isSelected = station.id === selectedStationId;
              return (
                <button
                  key={station.id}
                  onClick={() => setSelectedStationId(station.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer flex-1 min-w-[240px]",
                    isSelected
                      ? "border-emerald bg-panel shadow-md shadow-emerald/10 ring-1 ring-emerald"
                      : "border-border/80 bg-panel-secondary/50 hover:bg-panel hover:border-border",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg font-bold text-xs",
                      station.ispu <= 50
                        ? "bg-ispu-baik/20 text-ispu-baik"
                        : "bg-ispu-sedang/20 text-ispu-sedang",
                    )}
                  >
                    {station.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-foreground">{station.name}</p>
                      <Badge variant={station.ispu <= 50 ? "ispu-baik" : "ispu-sedang"} className="text-[10px] py-0 px-1.5">
                        ISPU {station.ispu}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <LuMapPin className="size-3 text-emerald" />
                      <span>Kec. {station.district} • {station.status}</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Main Analysis Section */}
      <Section className="py-0">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Gauge Meter & Detail */}
            <div className="space-y-6 lg:col-span-1">
              <IspuGaugeMeter
                value={currentStation.ispu}
                criticalParam={currentStation.criticalParam}
                stationName={currentStation.name}
              />

              {/* Station Metadata Card */}
              <Card className="border-border/80 bg-panel p-5 text-xs space-y-3">
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  <LuInfo className="size-4 text-emerald" />
                  Informasi Operasional Stasiun
                </h3>
                <div className="space-y-1.5 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Kode Registrasi:</span>
                    <strong className="text-foreground">{currentStation.code}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Wilayah Pantau:</span>
                    <strong className="text-foreground">Kecamatan {currentStation.district}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Alamat:</span>
                    <span className="text-right text-foreground max-w-[180px]">{currentStation.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu Pengukuran:</span>
                    <strong className="text-emerald">{currentStation.lastUpdated}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sumber Data:</span>
                    <span className="text-foreground">{currentStation.provenance.source}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: 6 Pollutants Breakdown & 7-Day Trend */}
            <div className="space-y-6 lg:col-span-2">
              {/* Pollutants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pollutantList.map((p) => {
                  const pct = Math.min(Math.round((p.value / p.standard) * 100), 100);
                  const isSafe = p.value <= p.standard;
                  return (
                    <Card key={p.key} className="border-border/80 bg-panel/90 p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-foreground">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                        </div>
                        <Badge variant={isSafe ? "ispu-baik" : "ispu-tidak-sehat"} className="text-[10px]">
                          {isSafe ? "Di Bawah Baku Mutu" : "Melebihi Batas"}
                        </Badge>
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-xl font-extrabold text-foreground">
                          {p.value} <span className="text-xs font-normal text-muted-foreground">{p.unit}</span>
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Baku Mutu: {p.standard} {p.unit}
                        </span>
                      </div>

                      {/* Progress bar to threshold */}
                      <div className="h-1.5 w-full rounded-full bg-panel-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isSafe ? "var(--color-emerald)" : "var(--color-destructive)",
                          }}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Historical Trend */}
              <AreaChartCard
                title={`Tren ISPU 7 Hari — ${currentStation.name}`}
                subtitle="Data historis pengukuran harian parameter kritis dari Open Data Surabaya."
                unit="ISPU"
                data={SURABAYA_HISTORICAL_ISPU}
                primaryLabel="Nilai Harian"
                secondaryLabel="Ambang Batas Sedang (100)"
                source="Dinas Lingkungan Hidup Kota Surabaya"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Health Guidelines & Standard Table */}
      <Section className="py-6 bg-panel-secondary/30 border-t border-border/60">
        <Container>
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Panduan Kategori ISPU & Rekomendasi Kesehatan
            </h2>
            <p className="text-xs text-muted-foreground">
              Berdasarkan Lampiran Peraturan Menteri Lingkungan Hidup dan Kehutanan No. P.14/MENLHK/SETJEN/KUM.1/7/2020.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="rounded-xl border border-ispu-baik/40 bg-ispu-baik/5 p-4 space-y-1.5">
              <Badge variant="ispu-baik">1 – 50 • Baik</Badge>
              <p className="font-semibold text-foreground">Kualitas Udara Sehat</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Sangat aman bagi seluruh kelompok usia untuk melakukan kegiatan luar ruang.
              </p>
            </div>

            <div className="rounded-xl border border-ispu-sedang/40 bg-ispu-sedang/5 p-4 space-y-1.5">
              <Badge variant="ispu-sedang">51 – 100 • Sedang</Badge>
              <p className="font-semibold text-foreground">Kualitas Udara Diterima</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Aman bagi umum. Individu yang luar biasa sensitif dapat merasakan gejala ringan.
              </p>
            </div>

            <div className="rounded-xl border border-ispu-tidak-sehat/40 bg-ispu-tidak-sehat/5 p-4 space-y-1.5">
              <Badge variant="ispu-tidak-sehat">101 – 200 • Tidak Sehat</Badge>
              <p className="font-semibold text-foreground">Merugikan Kelompok Sensitif</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Anak-anak, lansia, dan penderita asma disarankan mengurangi aktivitas luar ruang yang berat.
              </p>
            </div>

            <div className="rounded-xl border border-ispu-sangat-tidak-sehat/40 bg-ispu-sangat-tidak-sehat/5 p-4 space-y-1.5">
              <Badge variant="ispu-sangat-tidak-sehat">201 – 300 • Sangat Tidak Sehat</Badge>
              <p className="font-semibold text-foreground">Peringatan Bahaya</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Masyarakat umum mulai merasakan dampak kesehatan nyata. Disarankan memakai masker filtrasi.
              </p>
            </div>

            <div className="rounded-xl border border-ispu-berbahaya/40 bg-ispu-berbahaya/10 p-4 space-y-1.5">
              <Badge variant="ispu-berbahaya">&gt; 300 • Berbahaya</Badge>
              <p className="font-semibold text-foreground">Darurat Kesehatan</p>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Tingkat beracun bagi semua orang. Seluruh populasi wajib berada di dalam ruangan tertutup.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
