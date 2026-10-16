import type { Metadata } from "next";
import { WeatherView } from "@/components/pages/cuaca/weather-client";

export const metadata: Metadata = {
  title: "Cuaca & Iklim Surabaya — BMKG Data Terbuka | WASI ASRI",
  description:
    "Prakiraan cuaca terbuka BMKG Kota Surabaya: temperatur, kelembapan relatif, kecepatan angin, dan analisis dispersi udara untuk 5 wilayah kota.",
};

export default function WeatherPage() {
  return <WeatherView />;
}
