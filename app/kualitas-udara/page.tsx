import type { Metadata } from "next";
import { AirQualityView } from "@/components/pages/kualitas-udara/air-quality-client";

export const metadata: Metadata = {
  title: "Kualitas Udara Surabaya (ISPU) — WASI ASRI",
  description:
    "Pemantauan indeks standar pencemar udara (ISPU) dan parameter PM2.5, PM10, SO2, CO, O3, NO2 stasiun Wonorejo, Kebonsari, dan Tandes Kota Surabaya.",
};

export default function AirQualityPage() {
  return <AirQualityView />;
}
