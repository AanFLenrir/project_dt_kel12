import type { Metadata } from "next";
import { AdminGisView } from "@/components/pages/admin/gis-admin-client";

export const metadata: Metadata = {
  title: "Peta Komando Geospasial (GIS) — WASI ASRI Admin",
  description:
    "Visualisasi geospasial terpadu stasiun kualitas udara, fasilitas persampahan, dan sebaran laporan insiden masyarakat Kota Surabaya.",
};

export default function AdminGisPage() {
  return <AdminGisView />;
}
