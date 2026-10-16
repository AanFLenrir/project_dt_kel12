/**
 * WASI ASRI — Citizen Environmental Reports Store & Simulator
 * Mengelola state laporan masyarakat Kota Surabaya dengan validasi status dan alur penugasan.
 */

export type ReportCategory =
  | "Sampah Menumpuk"
  | "Pembuangan Sampah Sembarangan"
  | "Pembakaran Sampah"
  | "Limbah & Saluran Air"
  | "Polusi Udara / Asap"
  | "Genangan Air"
  | "Lainnya";

export type ReportStatus =
  | "Diterima"
  | "Ditugaskan"
  | "Diproses"
  | "Selesai"
  | "Ditolak";

export type ReportUrgency = "Rendah" | "Sedang" | "Tinggi" | "Darurat";

export type ReportHistoryEntry = {
  timestamp: string;
  status: ReportStatus;
  note: string;
  officer?: string;
};

export type CitizenReport = {
  id: string;
  ticketNumber: string;
  title: string;
  category: ReportCategory;
  location: string;
  district: string;
  coordinates: { lat: number; lng: number };
  description: string;
  photoUrl: string;
  resolutionPhotoUrl?: string;
  status: ReportStatus;
  urgency: ReportUrgency;
  aiConfidence: number; // 0.0 - 1.0
  aiTriageNotes: string;
  assignedUnit: string;
  reporterName: string;
  reporterPhone?: string;
  createdAt: string;
  updatedAt: string;
  history: ReportHistoryEntry[];
};

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: "rep-001",
    ticketNumber: "WASI-2026-0841",
    title: "Tumpukan Sampah Liar Meluber ke Bahu Jalan Raya",
    category: "Sampah Menumpuk",
    location: "Jl. Raya Rungkut Madya No. 45 (Dekat Perempatan UPN)",
    district: "Rungkut",
    coordinates: { lat: -7.3218, lng: 112.7834 },
    description:
      "Tumpukan sampah kantong plastik dan sisa makanan menumpuk di pinggir trotoar sejak 3 hari lalu tanpa diangkut. Menimbulkan bau menyengat dan mengganggu pejalan kaki serta pengguna jalan.",
    photoUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    resolutionPhotoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    status: "Selesai",
    urgency: "Tinggi",
    aiConfidence: 0.94,
    aiTriageNotes:
      "Model CV mendeteksi tumpukan sampah domestik kantong kresek > 2 meter kubik dengan tingkat obstruksi trotoar tinggi.",
    assignedUnit: "Satgas Kebersihan Wilayah Timur (DLH Surabaya)",
    reporterName: "Budi Santoso",
    reporterPhone: "081234567801",
    createdAt: "14 Oktober 2026, 08:30 WIB",
    updatedAt: "15 Oktober 2026, 14:15 WIB",
    history: [
      {
        timestamp: "14 Oktober 2026, 08:30 WIB",
        status: "Diterima",
        note: "Laporan masuk via Portal WASI ASRI. Terverifikasi oleh AI Triage System.",
      },
      {
        timestamp: "14 Oktober 2026, 09:15 WIB",
        status: "Ditugaskan",
        note: "Ditugaskan ke Satgas Kebersihan Wilayah Timur.",
        officer: "Ir. Hendro Siswanto (Pengawas DLH)",
      },
      {
        timestamp: "14 Oktober 2026, 13:00 WIB",
        status: "Diproses",
        note: "1 unit compactor truck dikerahkan ke lokasi pembersihan.",
        officer: "Tim Reaksi Cepat DLH Timur",
      },
      {
        timestamp: "15 Oktober 2026, 14:15 WIB",
        status: "Selesai",
        note: "Area trotoar telah dibersihkan total dan disemprot disinfektan. Laporan ditutup.",
        officer: "Ir. Hendro Siswanto",
      },
    ],
  },
  {
    id: "rep-002",
    ticketNumber: "WASI-2026-0842",
    title: "Asap Tebal Pembakaran Sampah Terbuka di Lahan Kosong",
    category: "Pembakaran Sampah",
    location: "Kawasan Lahan Terbuka Jl. Mastrip, Kebraon",
    district: "Karang Pilang",
    coordinates: { lat: -7.3342, lng: 112.6881 },
    description:
      "Terjadi pembakaran sampah ranting dan plastik di lahan kosong belakang pemukiman warga sejak sore hari. Asap tebal mengarah ke perumahan dan mengganggu pernapasan warga balita dan lansia.",
    photoUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=600&q=80",
    status: "Diproses",
    urgency: "Darurat",
    aiConfidence: 0.96,
    aiTriageNotes:
      "Model CV mengidentifikasi emisi kepulan asap pembakaran ilegal. Pelanggaran Perda No. 5/2014 Kota Surabaya.",
    assignedUnit: "Satpol PP & Tim Pengawas Udara DLH",
    reporterName: "Siti Rahmawati",
    reporterPhone: "081398765432",
    createdAt: "16 Oktober 2026, 07:15 WIB",
    updatedAt: "16 Oktober 2026, 08:30 WIB",
    history: [
      {
        timestamp: "16 Oktober 2026, 07:15 WIB",
        status: "Diterima",
        note: "Laporan masuk. Skor urgensi darurat akibat risiko kesehatan pernapasan dan bahaya rambatan api.",
      },
      {
        timestamp: "16 Oktober 2026, 07:45 WIB",
        status: "Ditugaskan",
        note: "Dikoordinasikan dengan Satpol PP Kecamatan Karang Pilang dan Pos Pemadam Kebakaran terdekat.",
        officer: "Komandan Regu Patroli Karang Pilang",
      },
      {
        timestamp: "16 Oktober 2026, 08:30 WIB",
        status: "Diproses",
        note: "Petugas sedang melakukan pemadaman api dan peringatan kepada pihak pengelola lahan.",
        officer: "Satpol PP Karang Pilang",
      },
    ],
  },
  {
    id: "rep-003",
    ticketNumber: "WASI-2026-0843",
    title: "Saluran Got Tersumbat Sampah dan Berbusa Putih",
    category: "Limbah & Saluran Air",
    location: "Saluran Sekunder Jl. Kenjeran No. 182",
    district: "Simokerto",
    coordinates: { lat: -7.2415, lng: 112.7612 },
    description:
      "Saluran air tersumbat endapan sampah plastik dan terlihat air berbusa putih dengan bau detergen/kimia menyengat.",
    photoUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=600&q=80",
    status: "Ditugaskan",
    urgency: "Tinggi",
    aiConfidence: 0.89,
    aiTriageNotes:
      "Model NLP mengidentifikasi anomali bau kimia dan potensi pencemaran air permukaan.",
    assignedUnit: "Bidang Pengendalian Pencemaran DLH & Dinas SDA Pematusan",
    reporterName: "Ahmad Faisal",
    reporterPhone: "082155443322",
    createdAt: "16 Oktober 2026, 09:40 WIB",
    updatedAt: "16 Oktober 2026, 10:10 WIB",
    history: [
      {
        timestamp: "16 Oktober 2026, 09:40 WIB",
        status: "Diterima",
        note: "Laporan diterima dan diverifikasi.",
      },
      {
        timestamp: "16 Oktober 2026, 10:10 WIB",
        status: "Ditugaskan",
        note: "Petugas laboratorium lingkungan dijadwalkan mengambil sampel air pengujian DO/BOD.",
        officer: "Dr. Lilis Suryani (Pengendali Dampak Lingkungan)",
      },
    ],
  },
  {
    id: "rep-004",
    ticketNumber: "WASI-2026-0844",
    title: "TPS Liar di Sekitar Jalur Hijau Margomulyo",
    category: "Pembuangan Sampah Sembarangan",
    location: "Bantaran Saluran Margomulyo Indah",
    district: "Tandes",
    coordinates: { lat: -7.2554, lng: 112.6698 },
    description:
      "Oknum tak bertanggung jawab membuang puing bangunan dan limbah kardus industri di taman jalur hijau.",
    photoUrl: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=600&q=80",
    status: "Diterima",
    urgency: "Sedang",
    aiConfidence: 0.91,
    aiTriageNotes:
      "Deteksi material puing konstruksi dan sampah industri anorganik pada sempadan jalan.",
    assignedUnit: "Tim Patroli Lingkungan Wilayah Barat",
    reporterName: "Dewi Lestari",
    reporterPhone: "085712348765",
    createdAt: "16 Oktober 2026, 11:20 WIB",
    updatedAt: "16 Oktober 2026, 11:20 WIB",
    history: [
      {
        timestamp: "16 Oktober 2026, 11:20 WIB",
        status: "Diterima",
        note: "Laporan menunggu verifikasi administrasi dan penjadwalan patroli satgas.",
      },
    ],
  },
];

// Helper functions for reading and updating reports in-memory
let inMemoryReports = [...INITIAL_CITIZEN_REPORTS];

export function getReports(): CitizenReport[] {
  return inMemoryReports;
}

export function getReportByTicket(ticket: string): CitizenReport | undefined {
  const norm = ticket.trim().toUpperCase();
  return inMemoryReports.find(
    (r) => r.ticketNumber.toUpperCase() === norm || r.id === ticket,
  );
}

export function createReport(
  payload: Omit<
    CitizenReport,
    "id" | "ticketNumber" | "status" | "createdAt" | "updatedAt" | "history"
  >,
): CitizenReport {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `WASI-2026-${randomSuffix}`;
  const nowStr = "Hari ini, 12:00 WIB";

  const newReport: CitizenReport = {
    ...payload,
    id: `rep-${Date.now()}`,
    ticketNumber,
    status: "Diterima",
    createdAt: nowStr,
    updatedAt: nowStr,
    history: [
      {
        timestamp: nowStr,
        status: "Diterima",
        note: "Laporan diterima oleh sistem WASI ASRI. Triage AI telah dijalankan otomatis.",
      },
    ],
  };

  inMemoryReports = [newReport, ...inMemoryReports];
  return newReport;
}

export function updateReportStatus(
  reportId: string,
  newStatus: ReportStatus,
  note: string,
  officer: string = "Petugas Admin DLH",
): CitizenReport | null {
  const idx = inMemoryReports.findIndex((r) => r.id === reportId || r.ticketNumber === reportId);
  if (idx === -1) return null;

  const nowStr = "Hari ini, 12:30 WIB";
  const current = inMemoryReports[idx];

  const updated: CitizenReport = {
    ...current,
    status: newStatus,
    updatedAt: nowStr,
    history: [
      ...current.history,
      {
        timestamp: nowStr,
        status: newStatus,
        note,
        officer,
      },
    ],
  };

  inMemoryReports[idx] = updated;
  return updated;
}
