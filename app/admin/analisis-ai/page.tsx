import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminAiAnalyticsView } from "@/components/pages/admin/ai-analytics-client";

export const metadata: Metadata = {
  title: "Analisis Kecerdasan Buatan (AI Analytics) — WASI ASRI Admin",
  description:
    "Dashboard evaluasi NLP triage pengaduan warga, akurasi klasifikasi heuristik, serta interpolasi spasial inversi jarak terbobot (IDW) kualitas udara.",
};

export default function AdminAiAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat modul Environmental AI Analytics...
        </div>
      }
    >
      <AdminAiAnalyticsView />
    </Suspense>
  );
}
