import { LuGraduationCap, LuShieldCheck, LuDatabase } from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { home } from "@/content/home";

export function HomeAcademicDisclaimer() {
  return (
    <Section className="py-12 bg-panel-secondary/40 border-t border-border/60">
      <Container>
        <Card className="border-border/80 bg-panel/90 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="emerald" className="gap-1.5 py-1">
                  <LuGraduationCap className="size-3.5" />
                  <span>Karya Akademis Inovasi Digital</span>
                </Badge>
                <Badge variant="outline">Design Thinking 2026</Badge>
              </div>
              <h3 className="mt-2 text-lg font-bold text-foreground">
                {home.disclaimerSection.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <LuShieldCheck className="size-4 text-emerald" />
              <span>Transparansi & Kejujuran Data</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground leading-relaxed">
            <div className="space-y-2">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <LuGraduationCap className="size-4 text-emerald" />
                Identitas Proyek Kelompok 12 UNAIR
              </p>
              <p>{home.disclaimerSection.academicText}</p>
              <p>
                Platform ini dikembangkan untuk menguji kelayakan konsep pemantauan lingkungan terpadu berbasis data terbuka dan pelaporan masyarakat berbantuan AI.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <LuDatabase className="size-4 text-cyan" />
                Ketentuan & Batasan Sumber Data
              </p>
              <p>{home.disclaimerSection.noticeText}</p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                <Badge variant="prov-aktual">Sensor Aktual (DLH/BMKG)</Badge>
                <Badge variant="prov-estimasi">Estimasi Spasial AI</Badge>
                <Badge variant="prov-simulasi">Simulasi Alur Pengujian</Badge>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
