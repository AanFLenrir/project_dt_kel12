import type { Metadata } from "next";
import Link from "next/link";
import {
  LuBookOpen,
  LuWind,
  LuDatabase,
  LuPhoneCall,
  LuFlame,
  LuArrowRight,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { emergencyCallLink, dlhCallLink } from "@/lib/links";

export const metadata: Metadata = {
  title: "Panduan Lingkungan & Edukasi Warga — WASI ASRI",
  description:
    "Edukasi baku mutu kualitas udara ISPU Permen LHK 14/2020, panduan pelaporan masalah kebersihan, aturan larangan pembakaran sampah, dan kontak darurat Surabaya.",
};

export default function GuidePage() {
  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuBookOpen className="size-4" />
                <span>Edukasi & Pedoman Masyarakat</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Panduan Lingkungan Hidup Kota Surabaya
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Pelajari cara membaca indikator kualitas udara, metodologi data lingkungan, tata cara pelaporan, serta regulasi persampahan Kota Surabaya.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="emerald">Edukasi Warga</Badge>
              <Badge variant="outline">Permen LHK 14/2020</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Guides */}
      <Section className="py-0">
        <Container className="space-y-8">
          {/* Section 1: Cara Membaca ISPU */}
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-base font-bold text-foreground border-b border-border/50 pb-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald/15 text-emerald">
                <LuWind className="size-5" />
              </div>
              <h2>1. Memahami Indeks Standar Pencemar Udara (ISPU)</h2>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
              <p>
                ISPU adalah angka tanpa satuan yang digunakan untuk menggambarkan kondisi mutu udara ambien di lokasi tertentu berdasarkan dampak kesehatan manusia, nilai estetika, dan makhluk hidup lainnya. Dihitung secara resmi mengacu pada <strong>Permen LHK No. 14 Tahun 2020</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                <div className="rounded-lg border border-ispu-baik/40 bg-ispu-baik/5 p-3 space-y-1">
                  <Badge variant="ispu-baik">1 – 50 • Baik</Badge>
                  <p className="text-[11px] text-foreground font-semibold">Sangat Sehat</p>
                  <p className="text-[10px]">Aman untuk seluruh aktivitas luar ruangan tanpa masker.</p>
                </div>
                <div className="rounded-lg border border-ispu-sedang/40 bg-ispu-sedang/5 p-3 space-y-1">
                  <Badge variant="ispu-sedang">51 – 100 • Sedang</Badge>
                  <p className="text-[11px] text-foreground font-semibold">Cukup Memadai</p>
                  <p className="text-[10px]">Kualitas udara masih dapat diterima sebagian besar populasi.</p>
                </div>
                <div className="rounded-lg border border-ispu-tidak-sehat/40 bg-ispu-tidak-sehat/5 p-3 space-y-1">
                  <Badge variant="ispu-tidak-sehat">101 – 200 • Tidak Sehat</Badge>
                  <p className="text-[11px] text-foreground font-semibold">Kelompok Rentan Waspada</p>
                  <p className="text-[10px]">Anak-anak dan lansia disarankan membatasi aktivitas berat di luar.</p>
                </div>
                <div className="rounded-lg border border-ispu-sangat-tidak-sehat/40 bg-ispu-sangat-tidak-sehat/5 p-3 space-y-1">
                  <Badge variant="ispu-sangat-tidak-sehat">201 – 300 • Sangat Tidak Sehat</Badge>
                  <p className="text-[11px] text-foreground font-semibold">Peringatan Serius</p>
                  <p className="text-[10px]">Gunakan masker filtrasi standar saat harus bepergian.</p>
                </div>
                <div className="rounded-lg border border-ispu-berbahaya/40 bg-ispu-berbahaya/10 p-3 space-y-1">
                  <Badge variant="ispu-berbahaya">&gt; 300 • Berbahaya</Badge>
                  <p className="text-[11px] text-foreground font-semibold">Darurat Kesehatan</p>
                  <p className="text-[10px]">Hindari sama sekali berada di luar ruangan tertutup.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: 4 Klasifikasi Transparansi Data */}
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-base font-bold text-foreground border-b border-border/50 pb-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                <LuDatabase className="size-5" />
              </div>
              <h2>2. Empat Klasifikasi Integritas Data di WASI ASRI</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-4 space-y-2">
                <Badge variant="prov-aktual">1. Data Pengukuran Aktual</Badge>
                <p className="font-semibold text-foreground">Sensor Fisik Terpasang</p>
                <p className="text-muted-foreground leading-relaxed text-[11px]">
                  Berasal langsung dari alat ukur fisik di stasiun SPKU resmi (Wonorejo, Kebonsari, Tandes) dan stasiun meteorologi BMKG.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-4 space-y-2">
                <Badge variant="outline">2. Data Historis Resmi</Badge>
                <p className="font-semibold text-foreground">Arsip Open Data Surabaya</p>
                <p className="text-muted-foreground leading-relaxed text-[11px]">
                  Berasal dari data agregasi harian/bulanan periode tahun sebelumnya yang dipublikasikan secara resmi oleh Pemerintah Kota Surabaya.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-4 space-y-2">
                <Badge variant="prov-estimasi">3. Data Estimasi Model AI</Badge>
                <p className="font-semibold text-foreground">Interpolasi Spasial Komputasi</p>
                <p className="text-muted-foreground leading-relaxed text-[11px]">
                  Hasil komputasi algoritma matematis (Inverse Distance Weighting) untuk memperkirakan kualitas udara di wilayah blank-spot tanpa sensor.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-4 space-y-2">
                <Badge variant="prov-simulasi">4. Data Simulasi / Demo</Badge>
                <p className="font-semibold text-foreground">Purwarupa Uji Coba</p>
                <p className="text-muted-foreground leading-relaxed text-[11px]">
                  Data aduan yang digunakan untuk memvalidasi alur penugasan satgas dalam lingkungan akademik tanpa diklaim sebagai laporan resmi kedinasan.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3: Regulasi Larangan Bakar Sampah */}
          <Card className="border-border/80 bg-panel p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-base font-bold text-foreground border-b border-border/50 pb-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                <LuFlame className="size-5" />
              </div>
              <h2>3. Larangan Pembakaran Sampah Terbuka (Perda Kota Surabaya)</h2>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
              <p>
                Berdasarkan <strong>Peraturan Daerah Kota Surabaya No. 5 Tahun 2014</strong> tentang Pengelolaan Sampah dan Kebersihan di Kota Surabaya:
              </p>
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-200 space-y-1.5">
                <p className="font-bold">Pasal Larangan:</p>
                <p>
                  &quot;Setiap orang atau badan hukum dilarang membakar sampah pada pekarangan, sempadan jalan, jalur hijau, fasilitas umum, dan tempat terbuka lainnya.&quot;
                </p>
                <p className="text-[11px] text-rose-300 pt-1">
                  Sanksi: Pelanggaran pembakaran sampah terbuka dapat dikenakan sanksi administratif dan denda tindak pidana ringan oleh Satuan Polisi Pamong Praja (Satpol PP) Kota Surabaya.
                </p>
              </div>
            </div>
          </Card>

          {/* Section 4: Kontak Darurat */}
          <Card className="border-emerald/40 bg-emerald/5 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Layanan Darurat Lingkungan Kota Surabaya
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hubungi kanal resmi apabila terjadi situasi berbahaya (kebakaran lahan, bau gas beracun, pencemaran mendesak).
                </p>
              </div>
              <Badge variant="emerald">24 Jam Bebas Pulsa</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={emergencyCallLink()}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-500 transition-colors"
              >
                <LuPhoneCall className="size-4" />
                <span>Panggilan Darurat 112 Surabaya</span>
              </a>

              <a
                href={dlhCallLink()}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-panel px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-panel-secondary transition-colors"
              >
                <LuPhoneCall className="size-4 text-emerald" />
                <span>Posko DLH Surabaya (031-5345700)</span>
              </a>

              <Link
                href="/lapor"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-xs font-semibold text-background hover:bg-emerald/90 transition-colors"
              >
                <span>Buka Formulir Lapor AI</span>
                <LuArrowRight className="size-3.5" />
              </Link>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
