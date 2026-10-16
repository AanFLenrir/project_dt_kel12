import type { Metadata } from "next";
import { ReportFormView } from "@/components/pages/lapor/report-form-client";

export const metadata: Metadata = {
  title: "Lapor Permasalahan Lingkungan — WASI ASRI",
  description:
    "Formulir pelaporan tumpukan sampah liar, pembakaran terbuka, dan pencemaran saluran air Kota Surabaya berbantuan AI Triage dan penugasan satgas DLH.",
};

export default function ReportPage() {
  return <ReportFormView />;
}
