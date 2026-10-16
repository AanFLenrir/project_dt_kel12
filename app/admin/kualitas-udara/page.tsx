import type { Metadata } from "next";
import { AdminAirQualityView } from "@/components/pages/admin/air-quality-admin-client";

export const metadata: Metadata = {
  title: "Monitoring Sensor Kualitas Udara — WASI ASRI Admin",
  description:
    "Monitoring telemetri stasiun pemantau kualitas udara SPKU Wonorejo, Kebonsari, dan Tandes serta kalibrasi ISPU Permen LHK 14/2020.",
};

export default function AdminAirQualityPage() {
  return <AdminAirQualityView />;
}
