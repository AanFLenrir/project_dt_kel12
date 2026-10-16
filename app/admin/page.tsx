import type { Metadata } from "next";
import { AdminOverviewView } from "@/components/pages/admin/overview-client";

export const metadata: Metadata = {
  title: "Pusat Komando Admin — WASI ASRI Environmental Intelligence",
  description:
    "Dashboard komando pemantauan kualitas udara, cuaca meteorologi, dan eskalasi penanganan aduan masyarakat Kota Surabaya.",
};

export default function AdminOverviewPage() {
  return <AdminOverviewView />;
}
