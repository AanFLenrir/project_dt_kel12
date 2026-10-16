import type { Metadata } from "next";
import { AdminFacilitiesView } from "@/components/pages/admin/facilities-admin-client";

export const metadata: Metadata = {
  title: "Sampah & Fasilitas Kebersihan — WASI ASRI Admin",
  description:
    "Direktori dan pemantauan kapasitas fasilitas persampahan Kota Surabaya.",
};

export default function AdminSampahPage() {
  return <AdminFacilitiesView />;
}
