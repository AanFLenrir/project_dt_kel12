import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminStatisticsView } from "@/components/pages/admin/statistics-admin-client";

export const metadata: Metadata = {
  title: "Statistik & Evaluasi SLA — WASI ASRI Admin",
  description:
    "Dashboard analitik performa pelayanan pengaduan lingkungan, pemenuhan SLA 48 Jam, dan rasio penyelesaian insiden Kota Surabaya.",
};

export default function AdminStatisticsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat data statistik dan SLA...
        </div>
      }
    >
      <AdminStatisticsView />
    </Suspense>
  );
}
