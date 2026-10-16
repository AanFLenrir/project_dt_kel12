"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  LuShieldAlert,
  LuCloudUpload,
  LuMapPin,
  LuCrosshair,
  LuBrainCircuit,
  LuCircleCheck,
  LuArrowRight,
  LuTriangleAlert,
  LuFileText,
  LuUser,
} from "react-icons/lu";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layouts/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { analyzeReportInput } from "@/lib/ai-service";
import { createReport, type ReportCategory } from "@/lib/reports-store";

const CATEGORY_OPTIONS: ReportCategory[] = [
  "Sampah Menumpuk",
  "Pembuangan Sampah Sembarangan",
  "Pembakaran Sampah",
  "Limbah & Saluran Air",
  "Polusi Udara / Asap",
  "Genangan Air",
  "Lainnya",
];

const SURABAYA_DISTRICTS = [
  "Rungkut",
  "Wonokromo",
  "Tandes",
  "Genteng",
  "Gubeng",
  "Sukolilo",
  "Jambangan",
  "Karang Pilang",
  "Kenjeran",
  "Tegalsari",
  "Sawahan",
  "Krembangan",
  "Semampir",
  "Pabean Cantian",
  "Dukuh Pakis",
  "Wiyung",
  "Benowo",
  "Mulyorejo",
];

export function ReportFormView() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ReportCategory>("Sampah Menumpuk");
  const [district, setDistrict] = useState("Rungkut");
  const [locationAddress, setLocationAddress] = useState("");
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: -7.3182,
    lng: 112.7845,
  });

  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Submission state
  const [isPending, startTransition] = useTransition();
  const [createdTicket, setCreatedTicket] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Real-time AI Triage preview
  const aiTriage = analyzeReportInput(description, category);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Format berkas harus berupa gambar (JPEG, PNG, atau WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Ukuran gambar melebihi batas maksimal 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleDetectGps() {
    if (!navigator.geolocation) {
      alert("Geolokasi tidak didukung oleh browser Anda.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
        });
        setLocationAddress(
          (prev) => prev || `Titik Terdeteksi: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Surabaya)`,
        );
      },
      () => {
        // Fallback default Surabaya
        setCoords({ lat: -7.2575, lng: 112.7521 });
        setLocationAddress((prev) => prev || "Pusat Kota Surabaya");
      },
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Judul laporan wajib diisi.");
      return;
    }
    if (!description.trim() || description.length < 15) {
      setFormError("Deskripsi masalah minimal 15 karakter agar akurasi AI optimal.");
      return;
    }
    if (!locationAddress.trim()) {
      setFormError("Alamat atau patokan lokasi wajib diisi.");
      return;
    }
    if (!reporterName.trim()) {
      setFormError("Nama pelapor wajib diisi.");
      return;
    }

    startTransition(() => {
      const newReport = createReport({
        title,
        category: aiTriage.predictedCategory || category,
        location: locationAddress,
        district,
        coordinates: coords,
        description,
        photoUrl:
          photoPreview ||
          "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
        urgency: aiTriage.urgencyLevel,
        aiConfidence: aiTriage.confidenceScore,
        aiTriageNotes: `Triage AI otomatis: ${aiTriage.detectedEntities.join(", ")} terdeteksi. Skor urgensi: ${aiTriage.urgencyScore}/100. Disposisi: ${aiTriage.recommendedUnit}.`,
        assignedUnit: aiTriage.recommendedUnit,
        reporterName,
        reporterPhone,
      });

      setCreatedTicket(newReport.ticketNumber);
    });
  }

  return (
    <div className="py-8 space-y-10">
      {/* Header */}
      <Section className="pb-4">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald uppercase tracking-wider">
                <LuShieldAlert className="size-4" />
                <span>Partisipasi Masyarakat Cerdas</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Formulir Pelaporan Lingkungan Warga
              </h1>
              <p className="mt-1 text-xs text-muted-foreground max-w-2xl sm:text-sm">
                Laporkan tumpukan sampah, pembakaran ilegal, atau pencemaran saluran air di Kota Surabaya. Sistem AI akan menganalisis visual dan teks untuk percepatan disposisi satgas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="prov-simulasi">Purwarupa Demonstrasi</Badge>
              <Badge variant="emerald">AI Triage Aktif</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Form or Success Modal */}
      <Section className="py-0">
        <Container>
          {createdTicket ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <Card className="max-w-2xl mx-auto border-emerald/50 bg-panel p-8 text-center space-y-6 shadow-xl">
              <div className="flex size-16 mx-auto items-center justify-center rounded-2xl bg-emerald/15 text-emerald border border-emerald/30">
                <LuCircleCheck className="size-8" />
              </div>

              <div>
                <Badge variant="status-diterima" className="mb-2">
                  Laporan Berhasil Dicatat
                </Badge>
                <h2 className="text-2xl font-extrabold text-foreground">
                  Nomor Tiket Anda:{" "}
                  <span className="font-mono text-emerald">{createdTicket}</span>
                </h2>
                <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Laporan Anda telah berhasil dicatat dalam data store simulasi WASI ASRI dan dianalisis oleh AI Triage. Simpan nomor tiket ini untuk melacak perkembangan penanganan di lapangan.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-4 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kategori:</span>
                  <strong className="text-foreground">{category}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lokasi:</span>
                  <span className="text-foreground">{locationAddress} ({district})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgensi AI:</span>
                  <Badge variant="ispu-tidak-sehat">{aiTriage.urgencyLevel}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rekomendasi Satgas:</span>
                  <span className="text-emerald font-semibold">{aiTriage.recommendedUnit}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href={`/riwayat?q=${createdTicket}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-2.5 text-xs font-semibold text-background shadow-xs hover:bg-emerald/90 transition-all"
                >
                  <span>Lacak Laporan Ini</span>
                  <LuArrowRight className="size-4" />
                </Link>
                <button
                  onClick={() => {
                    setCreatedTicket(null);
                    setTitle("");
                    setDescription("");
                    setLocationAddress("");
                    setPhotoPreview(null);
                  }}
                  className="rounded-xl border border-border px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-panel-secondary transition-all"
                >
                  Kirim Laporan Lain
                </button>
              </div>
            </Card>
          ) : (
            /* INPUT FORM */
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Form Input Area */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                {formError ? (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive">
                    <LuTriangleAlert className="size-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                ) : null}

                {/* Section 1: Upload Bukti Foto */}
                <Card className="border-border/80 bg-panel p-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <LuCloudUpload className="size-4 text-emerald" />
                    Foto Bukti Masalah Lingkungan
                  </h3>

                  <div className="space-y-3">
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-panel-secondary/30 p-6 text-center cursor-pointer hover:border-emerald/60 hover:bg-panel-secondary/60 transition-all"
                    >
                      <LuCloudUpload className="size-8 text-emerald/80 mb-2" />
                      <p className="text-xs font-semibold text-foreground">
                        Klik untuk unggah foto atau seret ke sini
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Format: JPEG, PNG, WebP (Maksimal 5 MB)
                      </p>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                    </label>

                    {photoError ? (
                      <p className="text-xs text-destructive">{photoError}</p>
                    ) : null}

                    {photoPreview ? (
                      <div className="relative rounded-lg overflow-hidden border border-border max-w-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoPreview}
                          alt="Pratinjau Bukti Laporan"
                          className="h-44 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white hover:bg-black"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    ) : null}
                  </div>
                </Card>

                {/* Section 2: Data Laporan */}
                <Card className="border-border/80 bg-panel p-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <LuFileText className="size-4 text-emerald" />
                    Rincian Masalah Lingkungan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="report-category" label="Kategori Masalah">
                      <Select
                        id="report-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ReportCategory)}
                      >
                        {CATEGORY_OPTIONS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field id="report-district" label="Kecamatan">
                      <Select
                        id="report-district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        {SURABAYA_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            Kecamatan {dist}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <Field id="report-title" label="Judul Laporan Singkat">
                    <Input
                      id="report-title"
                      placeholder="Contoh: Tumpukan sampah liar menutupi trotoar jalan raya"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Field>

                  <Field
                    id="report-desc"
                    label="Deskripsi Masalah Lengkap"
                    hint="Jelaskan kondisi di lokasi (bau menyengat, asap tebal, estimasi volume sampah, dll)."
                  >
                    <Textarea
                      id="report-desc"
                      rows={4}
                      placeholder="Tuliskan keterangan terperinci agar sistem AI dapat menganalisis tingkat urgensi dengan akurat..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="report-location" className="text-xs font-semibold text-foreground">
                        Alamat / Patokan Lokasi
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectGps}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald hover:underline cursor-pointer"
                      >
                        <LuCrosshair className="size-3" />
                        <span>Deteksi GPS Surabaya</span>
                      </button>
                    </div>
                    <Input
                      id="report-location"
                      placeholder="Contoh: Jl. Rungkut Madya No. 45, depan mini market"
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <LuMapPin className="size-3 text-emerald" />
                      <span>Koordinat: Lat {coords.lat}, Lng {coords.lng}</span>
                    </p>
                  </div>
                </Card>

                {/* Section 3: Data Pelapor */}
                <Card className="border-border/80 bg-panel p-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <LuUser className="size-4 text-emerald" />
                    Identitas Pelapor
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="reporter-name" label="Nama Lengkap">
                      <Input
                        id="reporter-name"
                        placeholder="Nama Anda"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                      />
                    </Field>

                    <Field id="reporter-phone" label="Nomor WhatsApp / HP" hint="Untuk konfirmasi tindak lanjut satgas">
                      <Input
                        id="reporter-phone"
                        type="tel"
                        placeholder="0812xxxxxxxx"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                      />
                    </Field>
                  </div>
                </Card>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="emerald"
                    size="lg"
                    disabled={isPending}
                    className="w-full text-sm font-bold"
                  >
                    {isPending ? "Sedang Memproses Laporan..." : "Kirim Laporan Lingkungan Sekarang"}
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    Laporan akan langsung mendapatkan nomor tiket unik dan tercatat di data store demonstrasi.
                  </p>
                </div>
              </form>

              {/* Live AI Pre-Triage Panel */}
              <div className="space-y-6 lg:col-span-1">
                <Card className="sticky top-24 border-emerald/40 bg-panel/95 p-5 space-y-4 shadow-md backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald/15 text-emerald">
                        <LuBrainCircuit className="size-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">
                          AI Smart Triage Preview
                        </h4>
                        <p className="text-[10px] text-emerald font-mono">
                          {aiTriage.modelSignature.split(" ")[0]}
                        </p>
                      </div>
                    </div>
                    <Badge variant="prov-estimasi">Estimasi AI</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Model NLP & Computer Vision menganalisis teks deskripsi dan foto Anda secara instan:
                  </p>

                  <div className="space-y-2.5 rounded-lg border border-border/70 bg-panel-secondary/50 p-3 text-xs">
                    <div>
                      <span className="text-[11px] text-muted-foreground">Kategori Terdeteksi:</span>
                      <p className="font-bold text-foreground">{aiTriage.predictedCategory}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-muted-foreground">Estimasi Urgensi:</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge
                          variant={
                            aiTriage.urgencyLevel === "Darurat"
                              ? "ispu-sangat-tidak-sehat"
                              : aiTriage.urgencyLevel === "Tinggi"
                                ? "ispu-tidak-sehat"
                                : "ispu-sedang"
                          }
                        >
                          {aiTriage.urgencyLevel} ({aiTriage.urgencyScore}/100)
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-muted-foreground">Entitas Dikenali:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiTriage.detectedEntities.map((ent, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-panel px-1.5 py-0.5 text-[10px] text-foreground border border-border"
                          >
                            {ent}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-2">
                      <span className="text-[11px] text-muted-foreground">Rekomendasi Satgas:</span>
                      <p className="font-semibold text-emerald text-[11px] leading-tight mt-0.5">
                        {aiTriage.recommendedUnit}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/60 bg-panel p-3 text-[11px] text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">Transparansi Simulasi:</p>
                    <p>
                      Hasil triage ini merupakan rekomendasi algoritmik untuk membantu petugas menentukan prioritas tindakan di lapangan.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
