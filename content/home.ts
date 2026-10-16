export const home = {
  hero: {
    eyebrow: "WASI ASRI • Environmental Intelligence Platform Surabaya",
    title: "Pemantauan Kualitas Udara & Pelaporan Lingkungan Cerdas Kota Surabaya",
    description:
      "Platform Environmental Intelligence terintegrasi yang menyajikan indeks kualitas udara (ISPU) resmi, prakiraan meteorologi BMKG, fasilitas persampahan kota, dan pelaporan insiden lingkungan warga berbantuan AI Triage.",
    primaryAction: {
      label: "Lapor Masalah Lingkungan",
      href: "/lapor",
    },
    secondaryAction: {
      label: "Pantau Kualitas Udara",
      href: "/kualitas-udara",
    },
    statusBadge: "Sistem Terhubung • 3 SPKU Aktif",
  },
  metricsSummary: {
    title: "Kondisi Lingkungan Terkini Kota Surabaya",
    subtitle:
      "Data diolah dari stasiun resmi SPKU Open Data DLH Surabaya dan BMKG Perak/Juanda.",
  },
  workflow: {
    title: "Cara Kerja Pelaporan Cerdas Berbantuan AI",
    subtitle:
      "Empat langkah transparan dari pelaporan masyarakat hingga penanganan tuntas di lapangan.",
    steps: [
      {
        number: "01",
        title: "Foto & Kirim Laporan",
        description:
          "Warga mengambil foto masalah lingkungan (tumpukan sampah, pembakaran terbuka, saluran tersumbat) beserta titik lokasi di Surabaya.",
      },
      {
        number: "02",
        title: "AI Triage & Estimasi Urgensi",
        description:
          "Sistem AI menganalisis visual foto dan deskripsi teks untuk menentukan klasifikasi masalah, skor urgensi, dan unit penanganan yang sesuai.",
      },
      {
        number: "03",
        title: "Disposisi Satgas Lapangan",
        description:
          "Petugas DLH Surabaya memvalidasi tiket dan menugaskan satgas terdekat beserta armada compactor/patroli ke lokasi kejadian.",
      },
      {
        number: "04",
        title: "Penyelesaian & Bukti Verifikasi",
        description:
          "Lokasi dibersihkan, petugas mengunggah foto bukti penyelesaian, dan pelapor dapat melacak status transparan melalui nomor tiket.",
      },
    ],
  },
  features: {
    title: "Fitur Ekosistem Environmental Intelligence",
    subtitle:
      "Pendekatan terpadu untuk pemantauan data lingkungan dan tata kelola persampahan.",
    items: [
      {
        title: "Indeks Kualitas Udara (ISPU)",
        description:
          "Monitoring 6 parameter polutan (PM2.5, PM10, SO2, CO, O3, NO2) dari 3 stasiun resmi: Wonorejo, Kebonsari, dan Tandes sesuai Permen LHK No. 14/2020.",
        href: "/kualitas-udara",
        cta: "Lihat Indeks ISPU",
      },
      {
        title: "Prakiraan Cuaca BMKG",
        description:
          "Data meteorologi suhu, kelembapan, kecepatan angin, dan risiko inversi termal untuk 5 wilayah Surabaya dari BMKG Data Terbuka.",
        href: "/cuaca",
        cta: "Cek Cuaca Surabaya",
      },
      {
        title: "Pemetaan Fasilitas Sampah",
        description:
          "Direktori dan sebaran titik TPS, TPS-3R, Bank Sampah Induk Surabaya, Rumah Kompos, hingga fasilitas Waste-to-Energy TPA Benowo.",
        href: "/sampah",
        cta: "Jelajahi Fasilitas",
      },
      {
        title: "Peta Interaktif Spasial (GIS)",
        description:
          "Visualisasi terintegrasi stasiun sensor, sebaran laporan masyarakat, fasilitas kebersihan, dan kawasan Ruang Terbuka Hijau (RTH).",
        href: "/peta",
        cta: "Buka Peta Lingkungan",
      },
    ],
  },
  disclaimerSection: {
    title: "Komitmen Integritas Data & Konteks Akademis",
    academicText:
      "WASI ASRI merupakan purwarupa inovasi digital yang dikembangkan untuk Proyek Design Thinking Kelompok 12, Program Studi D4 Teknik Informatika, Fakultas Vokasi, Universitas Airlangga.",
    noticeText:
      "Website ini bukan platform resmi Pemerintah Kota Surabaya atau Dinas Lingkungan Hidup (DLH) Kota Surabaya. Semua visualisasi data dipisahkan secara transparan antara pengukuran sensor fisik resmi, estimasi model spasial AI, dan data simulasi demonstrasi.",
  },
};
