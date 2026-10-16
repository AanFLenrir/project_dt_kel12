"use client";

import { useState } from "react";
import {
  LuMapPin,
  LuCalculator,
  LuRefreshCw,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IspuGaugeMeter, AreaChartCard } from "@/components/ui/chart-components";
import {
  SURABAYA_SPKU_STATIONS,
  SURABAYA_HISTORICAL_ISPU,
  type AirQualityStation,
} from "@/lib/environmental-data";

export function AdminAirQualityView() {
  const [selectedStationId, setSelectedStationId] = useState<string>("spku-wonorejo");
  const [calcPm25, setCalcPm25] = useState<string>("35");
  const [calculatedIspu, setCalculatedIspu] = useState<number>(55);

  const currentStation: AirQualityStation =
    SURABAYA_SPKU_STATIONS.find((s) => s.id === selectedStationId) ||
    SURABAYA_SPKU_STATIONS[0];

  // Helper ISPU Linear Interpolation formula (Permen LHK 14/2020)
  function handleCalculateIspu() {
    const val = parseFloat(calcPm25) || 0;
    let ispu = 0;
    if (val <= 15.5) {
      ispu = Math.round((50 / 15.5) * val);
    } else if (val <= 55.4) {
      ispu = Math.round(((100 - 50) / (55.4 - 15.6)) * (val - 15.6) + 50);
    } else if (val <= 150.4) {
      ispu = Math.round(((200 - 100) / (150.4 - 55.5)) * (val - 55.5) + 100);
    } else {
      ispu = Math.round(((300 - 200) / (250.4 - 150.5)) * (val - 150.5) + 200);
    }
    setCalculatedIspu(Math.max(1, Math.min(ispu, 500)));
  }

  return (
    <AdminShell
      title="Monitoring Jaringan Sensor SPKU & Analitik ISPU"
      description="Pemantauan telemetri stasiun pemantau kualitas udara resmi Kota Surabaya dan kalibrasi baku mutu Permen LHK No. 14 Tahun 2020."
    >
      <div className="space-y-8">
        {/* Stations Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SURABAYA_SPKU_STATIONS.map((station) => {
            const isSelected = station.id === selectedStationId;
            return (
              <Card
                key={station.id}
                onClick={() => setSelectedStationId(station.id)}
                className={`cursor-pointer transition-all p-5 space-y-3 ${
                  isSelected
                    ? "border-emerald bg-panel shadow-md ring-1 ring-emerald"
                    : "border-border/80 bg-panel/80 hover:bg-panel hover:border-emerald/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald">
                      {station.code}
                    </span>
                    <Badge variant="prov-aktual">Sensor Aktif</Badge>
                  </div>
                  <Badge variant={station.ispu <= 50 ? "ispu-baik" : "ispu-sedang"}>
                    ISPU {station.ispu}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">{station.name}</h3>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <LuMapPin className="size-3 text-emerald" />
                    <span>Kec. {station.district} • {station.address.slice(0, 32)}...</span>
                  </p>
                </div>

                <div className="border-t border-border/50 pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Parameter Kritis: <strong className="text-foreground">{station.criticalParam}</strong></span>
                  <span>{station.lastUpdated}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Station Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <IspuGaugeMeter
              value={currentStation.ispu}
              criticalParam={currentStation.criticalParam}
              stationName={currentStation.name}
            />

            {/* Ingest Telemetry Card */}
            <Card className="border-border/80 bg-panel p-5 space-y-3 text-xs">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <LuRefreshCw className="size-4 text-emerald" />
                Status Telemetri Ingest Data
              </h3>
              <div className="space-y-1.5 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Frekuensi Akuisisi:</span>
                  <span className="text-foreground">Per Hari (Agregasi 24 Jam)</span>
                </div>
                <div className="flex justify-between">
                  <span>Protokol Sensor:</span>
                  <span className="text-foreground font-mono">Modbus TCP / REST</span>
                </div>
                <div className="flex justify-between">
                  <span>Kualitas Data:</span>
                  <span className="text-emerald font-semibold">Tervalidasi DLH (99.8%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sumber Referensi:</span>
                  <span className="text-foreground">{currentStation.provenance.source}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* 6 Pollutants Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(currentStation.pollutants).map(([key, item]) => {
                const isUnderStandard = item.value <= item.standard;
                return (
                  <Card key={key} className="border-border/70 bg-panel p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground uppercase">{key}</span>
                      <Badge variant={isUnderStandard ? "ispu-baik" : "ispu-tidak-sehat"} className="text-[9px] py-0">
                        {isUnderStandard ? "Aman" : "Tinggi"}
                      </Badge>
                    </div>
                    <p className="text-lg font-black text-foreground">
                      {item.value} <span className="text-[10px] font-normal text-muted-foreground">{item.unit}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Baku Mutu: {item.standard} {item.unit}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Historical Area Trend */}
            <AreaChartCard
              title={`Riwayat Tren ISPU — ${currentStation.name}`}
              subtitle="Data pengukuran berkala parameter kritis terhadap ambang batas baku mutu."
              unit="ISPU"
              data={SURABAYA_HISTORICAL_ISPU}
              primaryLabel="Pengukuran Fisik Sensor"
              secondaryLabel="Batas Mutu Sedang (100)"
              source="Open Data Surabaya / DLH"
            />
          </div>
        </div>

        {/* ISPU Permen LHK 14/2020 Interactive Simulator Tool */}
        <Card className="border-border/80 bg-panel p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <LuCalculator className="size-4 text-emerald" />
                Kalkulator Kalibrasi ISPU (Permen LHK No. 14 Tahun 2020)
              </h3>
              <p className="text-xs text-muted-foreground">
                Simulasi konversi konsentrasi konsentrasi rata-rata 24 jam parameter PM2.5 menjadi nilai indeks ISPU.
              </p>
            </div>
            <Badge variant="outline">Formula Resmi KLHK</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Field id="calc-pm25" label="Konsentrasi Partikulat PM2.5 (µg/m³)">
              <Input
                id="calc-pm25"
                type="number"
                value={calcPm25}
                onChange={(e) => setCalcPm25(e.target.value)}
                placeholder="Misal: 35"
              />
            </Field>

            <div>
              <Button
                type="button"
                variant="emerald"
                size="md"
                onClick={handleCalculateIspu}
                className="w-full text-xs font-bold"
              >
                Hitung Konversi ISPU
              </Button>
            </div>

            <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-3 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase">Hasil Indeks ISPU:</span>
                <p className="text-lg font-black text-emerald">{calculatedIspu}</p>
              </div>
              <Badge variant={calculatedIspu <= 50 ? "ispu-baik" : calculatedIspu <= 100 ? "ispu-sedang" : "ispu-tidak-sehat"}>
                {calculatedIspu <= 50 ? "Baik" : calculatedIspu <= 100 ? "Sedang" : "Tidak Sehat"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
