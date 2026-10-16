"use client";

import { useState } from "react";
import {
  LuCloudSun,
  LuThermometer,
  LuDroplets,
  LuWind,
  LuEye,
  LuCloud,
  LuCompass,
  LuInfo,
  LuMapPin,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  SURABAYA_WEATHER_DATA,
  type WeatherObservation,
} from "@/lib/environmental-data";
import { cn } from "@/lib/utils";

export function WeatherView() {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);

  const currentWeather: WeatherObservation =
    SURABAYA_WEATHER_DATA[selectedRegionIndex];

  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan uppercase tracking-wider">
                <LuCloudSun className="size-4" />
                <span>Data Meteorologi & Prakiraan Terbuka</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Cuaca & Iklim Kota Surabaya
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Informasi meteorologi resmi dari BMKG Stasiun Meteorologi Maritim Perak dan Stasiun Meteorologi Juanda untuk mendukung pemahaman konteks dispersi udara.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-aktual">BMKG Data Terbuka</Badge>
              <Badge variant="cyan">{currentWeather.forecastTime}</Badge>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SURABAYA_WEATHER_DATA.map((item, idx) => (
              <button
                key={item.region}
                onClick={() => setSelectedRegionIndex(idx)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer",
                  selectedRegionIndex === idx
                    ? "border-cyan bg-panel text-cyan shadow-sm shadow-cyan/10 ring-1 ring-cyan"
                    : "border-border/80 bg-panel-secondary/60 text-muted-foreground hover:bg-panel hover:text-foreground",
                )}
              >
                <LuMapPin className="size-3.5" />
                <span>{item.region}</span>
                <span className="text-[11px] font-normal text-muted-foreground">({item.temperature}°C)</span>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Main Weather Metric Cards */}
      <Section className="py-0">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Suhu Udara"
              value={currentWeather.temperature}
              unit="°C"
              description={`Kondisi ${currentWeather.weatherCondition} di wilayah ${currentWeather.district}.`}
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
              description="Tingkat uap air di atmosfer pesisir Surabaya."
              icon={<LuDroplets className="size-5" />}
              trend={{ value: "Kelembapan Tropis", isPositive: true }}
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
              description={`Arah angin berhembus dominan dari ${currentWeather.windDirection}.`}
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
              title="Jarak Pandang (Visibility)"
              value={currentWeather.visibility}
              unit="km"
              description="Jarak pandang horizontal atmosfer perkotaan."
              icon={<LuEye className="size-5" />}
              trend={{ value: `Tutupan Awan: ${currentWeather.cloudCover}%`, isPositive: true }}
              provenance={{
                source: currentWeather.source,
                type: "Aktual",
                lastUpdated: "Hari ini",
              }}
              highlightColor="default"
            />
          </div>

          {/* Detailed Weather Card & Dispersion Context */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: Weather Condition Box */}
            <Card className="border-border/80 bg-panel/90 p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  Prakiraan Cuaca Terkini
                </span>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-extrabold text-foreground">
                      {currentWeather.temperature}°C
                    </h3>
                    <p className="text-sm font-semibold text-cyan mt-1">
                      {currentWeather.weatherCondition}
                    </p>
                  </div>
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-cyan/10 text-cyan border border-cyan/20">
                    <LuCloudSun className="size-8" />
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  Wilayah cakupan: <strong>{currentWeather.district} ({currentWeather.region})</strong>.
                </p>
              </div>

              <div className="space-y-2 border-t border-border/50 pt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Arah Angin:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <LuCompass className="size-3.5 text-cyan" />
                    {currentWeather.windDirection}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tutupan Awan:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <LuCloud className="size-3.5 text-cyan" />
                    {currentWeather.cloudCover}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Risiko Inversi Termal:</span>
                  <Badge variant={currentWeather.thermalInversionRisk === "Rendah" ? "ispu-baik" : "ispu-sedang"}>
                    {currentWeather.thermalInversionRisk}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Right: Environmental Science Note */}
            <Card className="lg:col-span-2 border-border/80 bg-panel/90 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                <LuInfo className="size-5 text-emerald shrink-0" />
                <h3 className="text-base font-bold text-foreground">
                  Catatan Sains Lingkungan: Hubungan Cuaca & Kualitas Udara
                </h3>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Penting:</strong> Parameter suhu dan kelembapan udara <em>BUKAN</em> merupakan komponen pembentuk nilai Indeks Standar Pencemar Udara (ISPU). Nilai ISPU dihitung khusus dari konsentrasi senyawa pencemar (PM2.5, PM10, SO2, CO, O3, NO2).
                </p>
                <p>
                  Namun, kondisi meteorologi berperan krusial dalam <strong>dispersi (penyebaran)</strong> polutan di udara:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-foreground/90">
                  <li>
                    <strong>Kecepatan Angin:</strong> Angin kencang membantu mengencerkan konsentrasi partikulat, sedangkan angin tenang berpotensi mengakumulasi polutan di kawasan padat.
                  </li>
                  <li>
                    <strong>Inversi Termal:</strong> Jika lapisan udara dingin terperangkap di bawah lapisan hangat (sering terjadi saat fajar/kelembapan tinggi), polutan tidak dapat naik ke atas dan tertahan di permukaan hirup manusia.
                  </li>
                  <li>
                    <strong>Sinar Matahari & Ozon:</strong> Radiasi matahari yang intens pada siang hari cerah mempercepat pembentukan Ozon Permukaan (O3) melalui fotokimia senyawa NO2 dan VOC.
                  </li>
                </ul>
              </div>

              <div className="border-t border-border/50 pt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Sumber Data: BMKG Data Prakiraan Terbuka</span>
                <span className="text-cyan font-mono">Kode Wilayah: 35.78 (Surabaya)</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
