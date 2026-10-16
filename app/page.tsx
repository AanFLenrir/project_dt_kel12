import type { Metadata } from "next";
import { HomeHero } from "@/components/pages/home/hero";
import { HomeMetricsOverview } from "@/components/pages/home/metrics-overview";
import { HomeMapPreview } from "@/components/pages/home/map-preview";
import { HomeWorkflow } from "@/components/pages/home/workflow";
import { HomeFeatures } from "@/components/pages/home/features";
import { HomeAcademicDisclaimer } from "@/components/pages/home/academic-disclaimer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Beranda — WASI ASRI Environmental Intelligence",
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMetricsOverview />
      <HomeMapPreview />
      <HomeWorkflow />
      <HomeFeatures />
      <HomeAcademicDisclaimer />
    </>
  );
}
