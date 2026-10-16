import type { Metadata } from "next";
import { Suspense } from "react";
import { HistoryListView } from "@/components/pages/riwayat/history-list-client";

export const metadata: Metadata = {
  title: "Pelacakan Riwayat Laporan — WASI ASRI",
  description:
    "Lacak status dan tindak lanjut penanganan laporan permasalahan lingkungan Kota Surabaya menggunakan nomor tiket.",
};

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-muted-foreground">
          Memuat data riwayat laporan...
        </div>
      }
    >
      <HistoryListView />
    </Suspense>
  );
}
