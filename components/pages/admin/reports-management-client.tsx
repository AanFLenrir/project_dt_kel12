"use client";

import { useState, useMemo } from "react";
import {
  LuSearch,
  LuShieldAlert,
  LuClock,
  LuCircleCheck,
  LuUser,
  LuBrainCircuit,
  LuBuilding2,
  LuX,
  LuEye,
} from "react-icons/lu";
import { AdminShell } from "@/components/layouts/admin-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  getReports,
  updateReportStatus,
  type CitizenReport,
  type ReportStatus,
} from "@/lib/reports-store";

export function ReportsManagementView({ initialSelectedId }: { initialSelectedId?: string }) {
  const [reportsList, setReportsList] = useState<CitizenReport[]>(() => getReports());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [urgencyFilter, setUrgencyFilter] = useState("Semua");

  // Selected report for review modal
  const [selectedReport, setSelectedReport] = useState<CitizenReport | null>(() => {
    if (initialSelectedId) {
      const found = reportsList.find(
        (r) => r.ticketNumber === initialSelectedId || r.id === initialSelectedId,
      );
      return found || null;
    }
    return null;
  });

  // Action form state inside modal
  const [actionStatus, setActionStatus] = useState<ReportStatus>("Diproses");
  const [actionOfficer, setActionOfficer] = useState("Ir. Hendro Siswanto (Satgas DLH)");
  const [actionNote, setActionNote] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const statusOptions = ["Semua", "Diterima", "Ditugaskan", "Diproses", "Selesai", "Ditolak"];
  const urgencyOptions = ["Semua", "Darurat", "Tinggi", "Sedang", "Rendah"];
  const categoryOptions = [
    "Semua",
    "Sampah Menumpuk",
    "Pembuangan Sampah Sembarangan",
    "Pembakaran Sampah",
    "Limbah & Saluran Air",
    "Polusi Udara / Asap",
    "Genangan Air",
  ];

  const filteredReports = useMemo(() => {
    return reportsList.filter((r) => {
      const matchStatus = statusFilter === "Semua" || r.status === statusFilter;
      const matchCategory = categoryFilter === "Semua" || r.category === categoryFilter;
      const matchUrgency = urgencyFilter === "Semua" || r.urgency === urgencyFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.ticketNumber.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);

      return matchStatus && matchCategory && matchUrgency && matchSearch;
    });
  }, [reportsList, statusFilter, categoryFilter, urgencyFilter, searchQuery]);

  function handleOpenModal(report: CitizenReport) {
    setSelectedReport(report);
    setActionStatus(report.status);
    setActionNote("");
    setActionSuccess(null);
  }

  function handleSaveStatusChange() {
    if (!selectedReport) return;
    if (!actionNote.trim()) {
      alert("Harap masukkan catatan tindakan petugas.");
      return;
    }

    const updated = updateReportStatus(
      selectedReport.id,
      actionStatus,
      actionNote,
      actionOfficer,
    );

    if (updated) {
      setReportsList([...getReports()]);
      setSelectedReport(updated);
      setActionSuccess(`Status tiket ${updated.ticketNumber} berhasil diperbarui menjadi ${updated.status}!`);
      setTimeout(() => setActionSuccess(null), 3500);
    }
  }

  return (
    <AdminShell
      title="Manajemen & Disposisi Aduan Warga"
      description="Kelola seluruh laporan insiden lingkungan masyarakat, verifikasi AI triage, dan pembaruan status satgas lapangan."
    >
      <div className="space-y-6">
        {/* Filters and Search Toolbar */}
        <Card className="border-border/80 bg-panel p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <LuSearch className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari tiket / judul / lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-panel-secondary/50 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-border bg-panel-secondary/50 py-2 px-2.5 text-xs text-foreground focus:border-emerald focus:outline-none"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Kategori:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-lg border border-border bg-panel-secondary/50 py-2 px-2.5 text-xs text-foreground focus:border-emerald focus:outline-none"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Urgensi:</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full rounded-lg border border-border bg-panel-secondary/50 py-2 px-2.5 text-xs text-foreground focus:border-emerald focus:outline-none"
              >
                {urgencyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Master Reports Table */}
        <Card className="border-border/80 bg-panel p-0 overflow-hidden">
          <div className="p-4 border-b border-border/60 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Daftar Tiket Pengaduan ({filteredReports.length} Ditemukan)
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Klik tombol &quot;Tinjau & Disposisi&quot; untuk memperbarui status dan penugasan satgas.
              </p>
            </div>
            <Badge variant="prov-simulasi">Penyimpanan Terpadu</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-panel-secondary/60 text-muted-foreground uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Nomor Tiket</th>
                  <th className="p-3.5">Judul & Kategori</th>
                  <th className="p-3.5">Wilayah</th>
                  <th className="p-3.5">Urgensi AI</th>
                  <th className="p-3.5">Satgas Tujuan</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredReports.map((rep) => {
                  const statusVariant =
                    rep.status === "Selesai"
                      ? "status-selesai"
                      : rep.status === "Diproses"
                        ? "status-diproses"
                        : rep.status === "Ditugaskan"
                          ? "status-ditugaskan"
                          : rep.status === "Ditolak"
                            ? "status-ditolak"
                            : "status-diterima";

                  return (
                    <tr
                      key={rep.id}
                      className="hover:bg-panel-secondary/40 transition-colors"
                    >
                      <td className="p-3.5 font-mono font-bold text-emerald whitespace-nowrap">
                        {rep.ticketNumber}
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <p className="font-bold text-foreground line-clamp-1">{rep.title}</p>
                        <p className="text-[11px] text-cyan">{rep.category}</p>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                        Kec. {rep.district}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <Badge
                          variant={
                            rep.urgency === "Darurat"
                              ? "ispu-sangat-tidak-sehat"
                              : rep.urgency === "Tinggi"
                                ? "ispu-tidak-sehat"
                                : "neutral"
                          }
                          className="text-[10px]"
                        >
                          {rep.urgency}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-[11px] text-muted-foreground max-w-[180px] truncate">
                        {rep.assignedUnit}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <Badge variant={statusVariant} className="text-[10px]">
                          {rep.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenModal(rep)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald/15 px-3 py-1.5 text-xs font-semibold text-emerald hover:bg-emerald hover:text-background transition-colors cursor-pointer"
                        >
                          <LuEye className="size-3" />
                          <span>Tinjau & Disposisi</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted-foreground space-y-2">
              <LuShieldAlert className="size-8 mx-auto text-muted-foreground/40" />
              <p className="font-semibold text-foreground">Tidak Ada Tiket yang Cocok</p>
              <p>Sesuaikan kata kunci pencarian atau filter status Anda.</p>
            </div>
          ) : null}
        </Card>

        {/* Modal / Drawer for Review & Disposisi */}
        {selectedReport ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-border/90 bg-panel p-6 sm:p-8 space-y-6 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-emerald">
                      {selectedReport.ticketNumber}
                    </span>
                    <Badge variant="cyan">{selectedReport.category}</Badge>
                    <Badge variant="ispu-tidak-sehat">Urgensi: {selectedReport.urgency}</Badge>
                  </div>
                  <h2 className="text-lg font-bold text-foreground mt-1">
                    {selectedReport.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-panel-secondary hover:text-foreground"
                  aria-label="Tutup modal"
                >
                  <LuX className="size-5" />
                </button>
              </div>

              {actionSuccess ? (
                <div className="rounded-xl border border-emerald/50 bg-emerald/10 p-3 text-xs text-emerald font-semibold flex items-center gap-2">
                  <LuCircleCheck className="size-4" />
                  <span>{actionSuccess}</span>
                </div>
              ) : null}

              {/* Photo & Report Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Photo */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-muted-foreground">Bukti Foto Masalah:</span>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-panel-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedReport.photoUrl}
                      alt={selectedReport.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Lokasi: {selectedReport.location} (Kec. {selectedReport.district})
                  </p>
                </div>

                {/* AI & Reporter Info */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-3.5 space-y-1.5">
                    <p className="font-bold text-foreground flex items-center gap-1.5">
                      <LuBrainCircuit className="size-4 text-emerald" />
                      Hasil Inferensi AI Triage
                    </p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {selectedReport.aiTriageNotes}
                    </p>
                    <p className="text-[10px] text-emerald font-medium">
                      Keyakinan Model: {Math.round(selectedReport.aiConfidence * 100)}% • Prioritas: {selectedReport.urgency}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-panel-secondary/50 p-3 space-y-1 text-[11px]">
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      <LuUser className="size-3.5" />
                      Identitas Pelapor
                    </p>
                    <p className="text-foreground">{selectedReport.reporterName}</p>
                    <p className="text-muted-foreground">Kontak: {selectedReport.reporterPhone || "Tersimpan"}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Form */}
              <div className="rounded-xl border border-border/80 bg-panel-secondary/40 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <LuBuilding2 className="size-4 text-emerald" />
                  Formulir Tindakan Petugas & Disposisi
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="action-status" label="Ubah Status Tiket">
                    <Select
                      id="action-status"
                      value={actionStatus}
                      onChange={(e) => setActionStatus(e.target.value as ReportStatus)}
                    >
                      <option value="Diterima">Diterima (Menunggu Penugasan)</option>
                      <option value="Ditugaskan">Ditugaskan (Armada Bergerak)</option>
                      <option value="Diproses">Diproses (Penanganan di Lokasi)</option>
                      <option value="Selesai">Selesai (Tuntas Dibersihkan)</option>
                      <option value="Ditolak">Ditolak (Duplikat / Tidak Valid)</option>
                    </Select>
                  </Field>

                  <Field id="action-officer" label="Petugas / Satgas Penanggung Jawab">
                    <Input
                      id="action-officer"
                      value={actionOfficer}
                      onChange={(e) => setActionOfficer(e.target.value)}
                    />
                  </Field>
                </div>

                <Field id="action-note" label="Catatan Penanganan Lapangan" hint="Catatan ini akan muncul pada timeline riwayat pelapor.">
                  <Textarea
                    id="action-note"
                    rows={2}
                    placeholder="Contoh: 1 unit compactor dikerahkan, tumpukan sampah trotoar telah diangkut ke TPS terdekat..."
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                  />
                </Field>

                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReport(null)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    variant="emerald"
                    size="sm"
                    onClick={handleSaveStatusChange}
                  >
                    Simpan Perubahan Status
                  </Button>
                </div>
              </div>

              {/* Status History Timeline */}
              <div className="space-y-3 border-t border-border/50 pt-4">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <LuClock className="size-3.5 text-emerald" />
                  Riwayat Perubahan Status Tiket Ini
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedReport.history.map((hist, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between rounded-lg border border-border/60 bg-panel p-2.5"
                    >
                      <div>
                        <span className="font-bold text-emerald">
                          Status: {hist.status}
                        </span>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{hist.note}</p>
                        {hist.officer ? (
                          <p className="text-[10px] text-cyan">Oleh: {hist.officer}</p>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{hist.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}
