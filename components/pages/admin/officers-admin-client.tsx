"use client";

import { useState } from "react";
import {
  LuShieldCheck,
  LuMapPin,
  LuPhone,
  LuMail,
  LuSearch,
  LuInfo,
  LuCircleCheck,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export interface Officer {
  id: string;
  name: string;
  role: string;
  division: string;
  coverageArea: string;
  phone: string;
  email: string;
  status: "Bertugas" | "Di Lapangan" | "Siaga (Standby)" | "Cuti";
  activeTasks: number;
}

const INITIAL_OFFICERS: Officer[] = [
  {
    id: "STG-TIMUR-01",
    name: "Ir. Bambang Hermanto, M.T.",
    role: "Koordinator Lapangan Satgas Wilayah Timur",
    division: "Bidang Kebersihan & Ruang Terbuka Hijau",
    coverageArea: "Sukolilo, Rungkut, Mulyorejo, Gunung Anyar",
    phone: "0812-3456-7801",
    email: "bambang.hermanto@surabaya.go.id",
    status: "Di Lapangan",
    activeTasks: 2,
  },
  {
    id: "STG-LAB-02",
    name: "Siti Rahmawati, S.Si.",
    role: "Analis Laboratorium & Kualitas Udara",
    division: "Bidang Pengendalian Pencemaran Lingkungan",
    coverageArea: "SPKU 1 Kebonsari & SPKU 2 Wonorejo",
    phone: "0812-3456-7802",
    email: "siti.rahmawati@surabaya.go.id",
    status: "Siaga (Standby)",
    activeTasks: 1,
  },
  {
    id: "STG-BARAT-03",
    name: "Dedi Prasetyo, S.T.",
    role: "Pengawas Penertiban TPS Liar & Saluran",
    division: "Satuan Tugas Pengelolaan Persampahan",
    coverageArea: "Tandes, Sambikerep, Benowo, Lakarsantri",
    phone: "0812-3456-7803",
    email: "dedi.prasetyo@surabaya.go.id",
    status: "Di Lapangan",
    activeTasks: 3,
  },
  {
    id: "STG-SELATAN-04",
    name: "Agus Santoso",
    role: "Unit Reaksi Cepat Genangan & Drainase",
    division: "Satuan Tugas Tanggap Darurat Bencana Lingkungan",
    coverageArea: "Wonokromo, Sawahan, Jambangan, Gayungan",
    phone: "0812-3456-7804",
    email: "agus.santoso@surabaya.go.id",
    status: "Bertugas",
    activeTasks: 2,
  },
  {
    id: "STG-PUSAT-05",
    name: "Rina Wijayanti, S.Hut.",
    role: "Fasilitator Bank Sampah & TPS 3R",
    division: "Pemberdayaan Masyarakat & Ekonomi Sirkular",
    coverageArea: "Genteng, Tegalsari, Bubutan, Simokerto",
    phone: "0812-3456-7805",
    email: "rina.wijayanti@surabaya.go.id",
    status: "Siaga (Standby)",
    activeTasks: 1,
  },
];

export function AdminOfficersView() {
  const [officers, setOfficers] = useState<Officer[]>(INITIAL_OFFICERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Officer["status"]>("Bertugas");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.coverageArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || officer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = () => {
    if (!selectedOfficer) return;
    setOfficers((prev) =>
      prev.map((o) => (o.id === selectedOfficer.id ? { ...o, status: newStatus } : o)),
    );
    setShowStatusModal(false);
    setFeedbackMsg(`Status ${selectedOfficer.name} berhasil diubah menjadi "${newStatus}".`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Pengelolaan Satuan Tugas Lapangan (Satgas DLH)
              </h1>
              <Badge variant="amber" size="sm">
                Mode Demonstrasi
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Direktori personil penanganan aduan masyarakat, zonasi wilayah kerja, dan pemantauan status kehadiran tugas lapangan.
            </p>
          </div>
        </div>

        {/* Disclaimer on Demo Identity */}
        <div className="flex items-start gap-3 rounded-xl border border-amber/30 bg-amber/5 p-4 text-xs text-muted-foreground">
          <LuInfo className="mt-0.5 size-4 shrink-0 text-amber" />
          <div className="leading-relaxed">
            <strong className="text-foreground">Pemberitahuan Sistem Demonstrasi:</strong> Data profil petugas,
            jabatan, dan nomor kontak di bawah ini merupakan profil demo yang digunakan untuk simulasi operasional
            disposisi laporan WASI ASRI. Halaman ini bukan sistem autentikasi / SSO kepegawaian produksi Pemerintah Kota Surabaya.
          </div>
        </div>

        {/* Action feedback */}
        {feedbackMsg && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald/40 bg-emerald/10 p-3 text-xs text-emerald">
            <LuCircleCheck className="size-4 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="relative sm:col-span-2">
            <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama personil, jabatan, atau cakupan wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs"
            >
              <option value="all">Semua Status Kehadiran</option>
              <option value="Bertugas">Bertugas (Di Kantor/Posko)</option>
              <option value="Di Lapangan">Di Lapangan (Operasional)</option>
              <option value="Siaga (Standby)">Siaga (Standby On-Call)</option>
              <option value="Cuti">Cuti / Izin</option>
            </Select>
          </div>
        </div>

        {/* Officer Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOfficers.map((officer) => {
            const isField = officer.status === "Di Lapangan";
            const isStandby = officer.status === "Siaga (Standby)";

            return (
              <Card
                key={officer.id}
                className="flex flex-col justify-between border-border/80 bg-panel/90 p-5 backdrop-blur-xs transition-colors hover:border-emerald/40"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground">{officer.id}</span>
                      <h3 className="font-bold text-foreground">{officer.name}</h3>
                      <p className="text-xs font-medium text-emerald">{officer.role}</p>
                    </div>
              <Badge
                      variant={isField ? "cyan" : isStandby ? "outline" : "emerald"}
                      size="sm"
                    >
                      {officer.status}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-muted-foreground">{officer.division}</p>

                  <div className="space-y-1.5 border-t border-border/50 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <LuMapPin className="size-3.5 shrink-0 text-cyan" />
                      <span className="line-clamp-1">{officer.coverageArea}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <LuPhone className="size-3.5 shrink-0 text-emerald" />
                      <span>{officer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <LuMail className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{officer.email}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <LuShieldCheck className="size-3.5 text-emerald" />
                    <span>
                      Beban Tugas: <strong className="text-foreground">{officer.activeTasks} Kasus</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOfficer(officer);
                        setNewStatus(officer.status);
                        setShowStatusModal(true);
                      }}
                      className="text-xs"
                    >
                      Ubah Status
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Status Update Modal */}
        {showStatusModal && selectedOfficer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Perbarui Status Satgas</h3>
                  <p className="text-xs text-muted-foreground">{selectedOfficer.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="rounded-md p-1 text-muted-foreground hover:bg-panel-secondary hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <Field id="officer-status-select" label="Pilih Status Operasional Personil">
                  <Select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Officer["status"])}
                    className="text-xs"
                  >
                    <option value="Bertugas">Bertugas (Di Posko / Kantor DLH)</option>
                    <option value="Di Lapangan">Di Lapangan (Eksekusi Penanganan Aduan)</option>
                    <option value="Siaga (Standby)">Siaga (Standby On-Call)</option>
                    <option value="Cuti">Cuti / Sakit / Izin</option>
                  </Select>
                </Field>

                <div className="rounded-lg border border-border/60 bg-panel-secondary/40 p-3 text-xs text-muted-foreground">
                  <p>
                    Perubahan status akan segera tercatat dalam jadwal operasional harian dinas
                    dan menjadi rujukan algoritma penugasan otomatis laporan masuk.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                <Button variant="ghost" size="sm" onClick={() => setShowStatusModal(false)}>
                  Batal
                </Button>
                <Button variant="primary" size="sm" onClick={handleUpdateStatus}>
                  Simpan Perubahan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
