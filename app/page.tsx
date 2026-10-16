import type { Metadata } from "next";
import { HomeHero } from "@/components/pages/home/hero";
import { HomeFeatures } from "@/components/pages/home/features";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Starter Tokigo: struktur netral, design system hidup, dan aturan jelas untuk membangun website klien.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
    </>
  );
}
