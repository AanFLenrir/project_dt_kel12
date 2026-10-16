import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminSettingsView } from "@/components/pages/admin/settings-admin-client";

export const metadata: Metadata = {
  title: "Pengaturan Platform — WASI ASRI Admin",
  description:
    "Konfigurasi teknis platform WASI ASRI, sumber data lingkungan, parameter sistem ISPU, dan status operasional layanan administrasi.",
};

export default function AdminSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat konfigurasi platform...
        </div>
      }
    >
      <AdminSettingsView />
    </Suspense>
  );
}
