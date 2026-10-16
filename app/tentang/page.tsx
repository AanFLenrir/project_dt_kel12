import type { Metadata } from "next";
import {
  LuLeaf,
  LuGraduationCap,
  LuShieldCheck,
  LuCode,
  LuBrainCircuit,
  LuExternalLink,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { dlhSurabayaLink, bmkgLink, openDataSurabayaLink } from "@/lib/links";

export const metadata: Metadata = {
  title: "Tentang WASI ASRI — Konteks Inovasi Akademik D4 TI UNAIR",
  description:
    "Profil platform WASI ASRI, latar belakang proyek Design Thinking Kelompok 12 D4 Teknik Informatika Vokasi Universitas Airlangga, metodologi, dan batasan purwarupa.",
};

export default function AboutPage() {
  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuGraduationCap className="size-4" />
                <span>Identitas & Konteks Pengembangan</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Tentang Platform WASI ASRI
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Sistem Pelaporan Lingkungan Cerdas dan Pemantauan Kualitas Udara Real-time Kota Surabaya Berbasis Kecerdasan Buatan (AI).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="emerald">Kelompok 12</Badge>
              <Badge variant="outline">D4 TI UNAIR</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-0">
        <Container className="space-y-8">
          {/* Card 1: Academic Identity & Disclaimer */}
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-base font-bold text-foreground border-b border-border/50 pb-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald/15 text-emerald">
                <LuGraduationCap className="size-5" />
              </div>
              <h2>Konteks Akademis & Pemberitahuan Resmi</h2>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>WASI ASRI</strong> adalah hasil perancangan dan purwarupa sistem perangkat lunak yang dikembangkan untuk memenuhi tugas mata kuliah <strong>Design Thinking</strong> pada program studi <strong>D4 Teknik Informatika, Fakultas Vokasi, Universitas Airlangga</strong>.
              </p>

              <div className="rounded-xl border border-border/80 bg-panel-secondary/50 p-4 space-y-2">
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <LuShieldCheck className="size-4 text-emerald" />
                  Pemberitahuan Batasan Sistem (Disclaimer):
                </p>
                <p className="text-[11px] leading-relaxed">
                  {site.disclaimer}
                </p>
                <p className="text-[11px] leading-relaxed">
                  Platform ini tidak menggunakan identitas visual lambang resmi Pemerintah Kota Surabaya secara seolah-olah telah disahkan oleh kedinasan. Segala integrasi data terbuka menggunakan atribusi lisensi publik Open Data Pemerintah Kota Surabaya dan BMKG.
                </p>
              </div>
            </div>
          </Card>

          {/* Card 2: Latar Belakang & Masalah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/80 bg-panel p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald/15 text-emerald">
                  <LuLeaf className="size-4" />
                </div>
                <h3>Latar Belakang Proyek</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kota Surabaya sebagai kota metropolitan terbesar kedua di Indonesia menghadapi tantangan lingkungan ganda: emisi transportasi & industri yang memengaruhi kualitas udara, serta beban volume sampah harian mencapai ~1.700 ton. Partisipasi warga dalam melaporkan insiden kebersihan sering kali terkendala mekanisme pelaporan yang terpecah dan minimnya feedback penanganan.
              </p>
            </Card>

            <Card className="border-border/80 bg-panel p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="flex size-8 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
                  <LuBrainCircuit className="size-4" />
                </div>
                <h3>Solusi WASI ASRI</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                WASI ASRI menyatukan portal publik transparan dengan command center administratif. Fitur unggulan mencakup agregasi indeks kualitas udara (ISPU Permen LHK 14/2020), prakiraan cuaca terbuka BMKG, direktori fasilitas sampah TPS/3R, dan AI Triage untuk klasifikasi instan foto dan deskripsi laporan warga.
              </p>
            </Card>
          </div>

          {/* Card 3: Arsitektur Teknologi */}
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-base font-bold text-foreground border-b border-border/50 pb-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-panel-secondary text-emerald border border-border">
                <LuCode className="size-5" />
              </div>
              <h2>Arsitektur Teknologi & Prinsip Rekayasa</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-1.5">
                <h4 className="font-bold text-foreground">Next.js 16 App Router</h4>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Dibangun dengan React 19, arsitektur Server Components secara default, rendering cepat, dan optimasi performa tinggi.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-1.5">
                <h4 className="font-bold text-foreground">Tailwind CSS v4</h4>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Design tokens CSS terpadu bertema Dark Emerald Environmental Intelligence dengan dukungan mode gelap dan kontras WCAG AA.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/40 p-4 space-y-1.5">
                <h4 className="font-bold text-foreground">AI Triage & Spatial Kriging</h4>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Model NLP & Computer Vision terpadu untuk klasifikasi tingkat urgensi aduan serta interpolasi spasial kualitas udara (IDW).
                </p>
              </div>
            </div>
          </Card>

          {/* Card 4: Referensi Terbuka */}
          <Card className="border-border/80 bg-panel p-6 space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Dokumentasi & Referensi Data Resmi
            </h3>
            <p className="text-xs text-muted-foreground">
              Sistem dibangun berdasarkan hasil audit data lingkungan yang didokumentasikan di dokumen referensi:
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs">
              <a
                href={openDataSurabayaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald hover:underline"
              >
                <span>Open Data Surabaya (DLH)</span>
                <LuExternalLink className="size-3" />
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href={bmkgLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald hover:underline"
              >
                <span>BMKG Data Prakiraan Cuaca Terbuka</span>
                <LuExternalLink className="size-3" />
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href={dlhSurabayaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald hover:underline"
              >
                <span>DLH Surabaya Eco-Campus</span>
                <LuExternalLink className="size-3" />
              </a>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
