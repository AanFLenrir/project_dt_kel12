import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminOfficersView } from "@/components/pages/admin/officers-admin-client";

export const metadata: Metadata = {
  title: "Pengelolaan Satgas Lapangan — WASI ASRI Admin",
  description:
    "Direktori personil satuan tugas penanganan aduan lingkungan DLH Kota Surabaya, zonasi wilayah kerja, beban tugas aktif, dan pembaruan status kehadiran lapangan.",
};

export default function AdminOfficersPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat data direktori satgas lapangan...
        </div>
      }
    >
      <AdminOfficersView />
    </Suspense>
  );
}
