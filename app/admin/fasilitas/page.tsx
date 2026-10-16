import type { Metadata } from "next";
import { AdminFacilitiesView } from "@/components/pages/admin/facilities-admin-client";

export const metadata: Metadata = {
  title: "Manajemen Fasilitas Persampahan — WASI ASRI Admin",
  description:
    "Direktori dan pemantauan kapasitas fasilitas persampahan TPS, TPS-3R, Bank Sampah Induk, dan PSEL TPA Benowo Surabaya.",
};

export default function AdminFacilitiesPage() {
  return <AdminFacilitiesView />;
}
