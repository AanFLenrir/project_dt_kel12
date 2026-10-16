"use client";

import { useState } from "react";
import {
  LuThermometer,
  LuDroplets,
  LuWind,
  LuCompass,
  LuEye,
  LuCloud,
  LuMapPin,
  LuInfo,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { BarChartCard } from "@/components/ui/chart-components";
import { SURABAYA_WEATHER_DATA } from "@/lib/environmental-data";

export function AdminWeatherView() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const currentWeather = SURABAYA_WEATHER_DATA[selectedIdx];

  // Temperature comparison across regions
  const tempComparisonData = SURABAYA_WEATHER_DATA.map((w) => ({
    label: w.region,
    value: w.temperature,
    color: "#22d3ee",
  }));

  // Humidity comparison across regions
  const humidityComparisonData = SURABAYA_WEATHER_DATA.map((w) => ({
    label: w.region,
    value: w.humidity,
    color: "#3b82f6",
  }));

  return (
    <AdminShell
      title="Monitoring Meteorologi & Dispersi Atmosfer"
      description="Pemantauan telemetri cuaca BMKG terbuka untuk 5 wilayah administratif Surabaya guna evaluasi pergerakan polutan udara."
    >
      <div className="space-y-8">
        {/* Region Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {SURABAYA_WEATHER_DATA.map((item, idx) => (
            <button
              key={item.region}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                selectedIdx === idx
                  ? "border-cyan bg-panel text-cyan shadow-sm ring-1 ring-cyan"
                  : "border-border/80 bg-panel/70 text-muted-foreground hover:bg-panel hover:text-foreground"
              }`}
            >
              <LuMapPin className="size-3.5" />
              <span>{item.region}</span>
              <span className="text-[11px] font-normal text-muted-foreground">({item.temperature}°C)</span>
            </button>
          ))}
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Temperatur Udara"
            value={currentWeather.temperature}
            unit="°C"
            description={`Wilayah pantau: ${currentWeather.district}.`}
            icon={<LuThermometer className="size-5" />}
            trend={{ value: currentWeather.weatherCondition, isPositive: true }}
            provenance={{
              source: currentWeather.source,
              type: "Aktual",
              lastUpdated: "Hari ini",
            }}
            highlightColor="cyan"
          />

          <StatCard
            title="Kelembapan Relatif"
            value={currentWeather.humidity}
            unit="%"
            description="Tingkat kejenuhan uap air atmosfer pesisir."
            icon={<LuDroplets className="size-5" />}
            trend={{ value: "Lembap Normal", isPositive: true }}
            provenance={{
              source: currentWeather.source,
              type: "Aktual",
              lastUpdated: "Hari ini",
            }}
            highlightColor="blue"
          />

          <StatCard
            title="Kecepatan Angin"
            value={currentWeather.windSpeed}
            unit="km/jam"
            description={`Arah angin dominan dari ${currentWeather.windDirection}.`}
            icon={<LuWind className="size-5" />}
            trend={{ value: currentWeather.windDirection, isPositive: true }}
            provenance={{
              source: currentWeather.source,
              type: "Aktual",
              lastUpdated: "Hari ini",
            }}
            highlightColor="emerald"
          />

          <StatCard
            title="Jarak Pandang / Visibility"
            value={currentWeather.visibility}
            unit="km"
            description={`Tutupan awan: ${currentWeather.cloudCover}%.`}
            icon={<LuEye className="size-5" />}
            trend={{ value: "Transparansi Tinggi", isPositive: true }}
            provenance={{
              source: currentWeather.source,
              type: "Aktual",
              lastUpdated: "Hari ini",
            }}
            highlightColor="default"
          />
        </div>

        {/* Two Comparison Bar Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChartCard
            title="Komparasi Suhu Wilayah Surabaya"
            subtitle="Perbandingan suhu udara antar wilayah administratif Surabaya dari data BMKG."
            unit="°C"
            data={tempComparisonData}
            source="BMKG Data Prakiraan Terbuka"
          />

          <BarChartCard
            title="Komparasi Kelembapan Udara"
            subtitle="Tingkat kelembapan relatif 5 wilayah kota Surabaya."
            unit="%"
            data={humidityComparisonData}
            source="BMKG Data Prakiraan Terbuka"
          />
        </div>

        {/* Meteorology & Atmospheric Dispersion Notes */}
        <Card className="border-border/80 bg-panel p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <LuInfo className="size-5 text-cyan shrink-0" />
            <h3 className="text-base font-bold text-foreground">
              Analisis Pengaruh Cuaca Terhadap Dispersi Polutan Surabaya
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground leading-relaxed">
            <div className="rounded-xl border border-border/60 bg-panel-secondary/40 p-4 space-y-1.5">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <LuCompass className="size-3.5 text-cyan" />
                Dinamika Angin Muson
              </span>
              <p className="text-[11px]">
                Angin bertiup dari {currentWeather.windDirection} dengan kecepatan {currentWeather.windSpeed} km/jam membawa dampak pengenceran polusi partikulat dari kawasan industri ke arah laut selat Madura.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-panel-secondary/40 p-4 space-y-1.5">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <LuCloud className="size-3.5 text-cyan" />
                Tutupan Awan & Radiasi
              </span>
              <p className="text-[11px]">
                Tutupan awan {currentWeather.cloudCover}% memberikan insolasi matahari yang memadai untuk fotolisis NO2 menjadi O3 permukaan di siang hari.
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-panel-secondary/40 p-4 space-y-1.5">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <LuThermometer className="size-3.5 text-cyan" />
                Status Inversi Termal
              </span>
              <p className="text-[11px]">
                Risiko inversi termal di wilayah ini tergolong <strong>{currentWeather.thermalInversionRisk}</strong>, sehingga udara vertikal dapat bersirkulasi normal tanpa penjebakan polutan berbahaya.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
