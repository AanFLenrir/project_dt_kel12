import type { Metadata } from "next";
import { WasteView } from "@/components/pages/sampah/waste-client";

export const metadata: Metadata = {
  title: "Fasilitas Persampahan & Kebersihan Surabaya — WASI ASRI",
  description:
    "Direktori fasilitas pengelolaan sampah, TPS, TPS-3R, Bank Sampah Induk Surabaya, Rumah Kompos, dan data laju timbulan sampah Kota Surabaya.",
};

export default function WastePage() {
  return <WasteView />;
}
