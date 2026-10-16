import type { Metadata } from "next";
import { AdminWeatherView } from "@/components/pages/admin/weather-admin-client";

export const metadata: Metadata = {
  title: "Monitoring Cuaca & Meteorologi — WASI ASRI Admin",
  description:
    "Pemantauan telemetri cuaca BMKG terbuka Kota Surabaya dan evaluasi dispersi atmosfer polutan.",
};

export default function AdminWeatherPage() {
  return <AdminWeatherView />;
}
