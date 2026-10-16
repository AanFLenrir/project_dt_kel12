import type { Metadata } from "next";
import { Suspense } from "react";
import { ReportsManagementView } from "@/components/pages/admin/reports-management-client";

export const metadata: Metadata = {
  title: "Manajemen & Disposisi Aduan Warga — WASI ASRI Admin",
  description:
    "Tabel manajemen pelaporan insiden lingkungan masyarakat, verifikasi AI triage, dan pembaruan status satgas lapangan Kota Surabaya.",
};

export default function AdminReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat data manajemen laporan...
        </div>
      }
    >
      <ReportsManagementView />
    </Suspense>
  );
}
