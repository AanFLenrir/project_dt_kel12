import Link from "next/link";
import { LuMapPin, LuArrowRight } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { EnvironmentalMap } from "@/components/ui/environmental-map";

export function HomeMapPreview() {
  return (
    <Section className="py-12">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald uppercase tracking-wider">
              <LuMapPin className="size-4" />
              <span>Pusat Informasi Geospasial Lingkungan</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Peta Pemantauan Lingkungan Kota Surabaya
            </h2>
            <p className="mt-1 text-xs text-muted-foreground max-w-2xl">
              Eksplorasi spasial stasiun pemantauan udara (Wonorejo, Kebonsari, Tandes), sebaran fasilitas TPS persampahan, dan titik laporan masyarakat.
            </p>
          </div>

          <Link
            href="/peta"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-panel px-4 py-2 text-xs font-semibold text-foreground hover:bg-panel-secondary hover:border-emerald/40 transition-colors"
          >
            <span>Buka Layar Penuh</span>
            <LuArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Map Canvas Preview */}
        <EnvironmentalMap height={450} showControls={true} />
      </Container>
    </Section>
  );
}
