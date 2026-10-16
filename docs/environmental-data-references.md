# Dokumen Referensi Data Lingkungan WASI ASRI
**Platform:** WASI ASRI (Sistem Pelaporan Lingkungan Cerdas dan Pemantauan Kualitas Udara Real-time Kota Surabaya Berbasis AI)  
**Konteks:** Proyek Design Thinking Kelompok 12, D4 Teknik Informatika, Fakultas Vokasi, Universitas Airlangga  
**Status Dokumen:** Hasil Audit Riset Data & Spesifikasi Adapter

---

## 1. Ringkasan Eksekutif Riset

Berdasarkan investigasi terhadap sumber data resmi Kota Surabaya dan lembaga nasional, platform WASI ASRI dirancang dengan memegang prinsip **kejujuran dan transparansi data (Data Transparency & Integrity)**. Sistem membedakan secara tegas 4 kategori data:
1. **Data Pengukuran Aktual (Real-time / Near Real-time Sensor):** Berasal dari stasiun SPKU yang aktif dan API cuaca BMKG terbuka.
2. **Data Historis Resmi:** Berasal dari portal Open Data Kota Surabaya (DLH) untuk periode tertentu (misal: 2023).
3. **Data Estimasi Model AI:** Hasil inferensi model komputasi spasial (Spatial Kriging/IDW) untuk wilayah blank-spot tanpa sensor, dengan label ketidakpastian (confidence margin).
4. **Data Simulasi Demonstrasi:** Digunakan untuk pengujian alur tiket penanganan laporan warga dalam lingkungan purwarupa akademis.

---

## 2. Inventarisasi & Evaluasi Sumber Data

### Referensi 1: Portal DLH Kota Surabaya & Eco-Campus
- **URL Sumber:** `https://lh.surabaya.go.id/weblh/index.php?c=main&m=ecocampus`
- **Kegunaan:** Mempelajari arsitektur informasi tata kelola lingkungan, program Eco-Campus, fasilitas bank sampah binaan, dan mekanisme pengaduan masyarakat eksisting.
- **Karakteristik Data:** Format HTML statis & dinamis CMS. Tidak menyediakan public JSON REST API langsung.
- **Batasan Akses:** Hanya dapat diakses melalui web scraping terjadwal atau referensi regulasi lokal.
- **Adapter Strategy:** WASI ASRI mengadopsi taksonomi aduan dan kategori fasilitas persampahan binaan DLH ke dalam kamus data sistem.

---

### Referensi 2: Open Data Surabaya — Organisasi DLH
- **URL Sumber:** `https://opendata.surabaya.go.id/organisasi/dlh`
- **Kegunaan:** Katalog dataset sektoral lingkungan hidup Pemerintah Kota Surabaya.
- **Karakteristik Data:** Format CKAN metadata, format unduh CSV, XLSX, dan sebagian API endpoint CKAN `action/package_show`.
- **Ketentuan Atribusi:** Mengikuti lisensi Open Data Pemerintah Kota Surabaya (Atribusi: Dinas Lingkungan Hidup Kota Surabaya).

---

### Referensi 3: Dataset Kualitas Udara Menurut Lokasi Pengukuran Per Hari (Tahun 2023)
- **URL Sumber:** `https://opendata.surabaya.go.id/dataset/kualitas-udara-menurut-lokasi-pengukuran-per-hari-tahun-2023`
- **Kegunaan:** Baseline data historis pengukuran kualitas udara harian di Kota Surabaya.
- **Struktur Kolom Dataset:**
  - `tanggal` (Date, format YYYY-MM-DD)
  - `stasiun` / `lokasi` (Text, contoh: SPKU Wonorejo, SPKU Kebonsari, SPKU Tandes)
  - `pm25` (Numerik, satuan µg/m³)
  - `pm10` (Numerik, satuan µg/m³)
  - `so2` (Numerik, satuan µg/m³ atau ppm)
  - `co` (Numerik, satuan µg/m³ atau ppm)
  - `o3` (Numerik, satuan µg/m³ atau ppm)
  - `no2` (Numerik, satuan µg/m³ atau ppm)
  - `kategori` (Text: BAIK, SEDANG, TIDAK SEHAT, SANGAT TIDAK SEHAT, BERBAHAYA)
  - `parameter_kritis` (Text: parameter dengan indeks tertinggi)
- **Satuan Parameter:**
  - PM2.5 & PM10: µg/Nm³
  - Gas (SO2, CO, NO2, O3): µg/Nm³ (dikonversi dari ppm sesuai temperatur standar 25°C, 1 atm).
- **Periode & Frekuensi:** Harian, agregasi tahun 2023.
- **Batasan Akses:** Data bersifat historis (bukan streaming real-time per detik).
- **Implementasi WASI ASRI:** Digunakan untuk melatih/memvalidasi tren historis 7 hari, visualisasi komparasi stasiun, dan kalibrasi formula ISPU.

---

### Referensi 4: Dataset Lokasi Pengangkutan Sampah & Fasilitas TPS
- **URL Sumber:** `https://opendata.surabaya.go.id/kumpulan_dataset/2900-5187-317`
- **Kegunaan:** Pemetaan titik fasilitas pengangkutan sampah, TPS (Tempat Penampungan Sementara), dan TPS-3R.
- **Struktur Kolom:**
  - `id_fasilitas` (String/ID)
  - `nama_tps` (Text, contoh: TPS Bratang, TPS Keputih, TPS Dukuh Kupang)
  - `jenis_fasilitas` (Enum: TPS, TPS-3R, Bank Sampah Induk, Rumah Kompos)
  - `kecamatan` (Text, contoh: Wonokromo, Sukolilo, Rungkut)
  - `kelurahan` (Text)
  - `alamat_fasilitas` (Text)
  - `koordinat_lat` (Latitude desimal)
  - `koordinat_lng` (Longitude desimal)
  - `kapasitas_ton_hari` (Numerik)
- **Batasan Akses:** Pembaruan tahunan; koordinat diverifikasi dengan data spasial peta Surabaya.
- **Implementasi WASI ASRI:** Ditampilkan pada modul `/sampah` dan layer GIS di `/peta`.

---

### Referensi 5: Dataset Laju Timbulan Sampah Kota Surabaya
- **URL Sumber:** `https://opendata.surabaya.go.id/kumpulan_dataset/2900-9586-655`
- **Kegunaan:** Menghitung estimasi beban sampah harian dan bulanan per kapita.
- **Indikator Kunci:**
  - Rata-rata timbulan sampah: **0,67 kg/jiwa/hari** atau sekitar **1.600 - 1.800 ton/hari** untuk seluruh Surabaya.
  - Komposisi sampah: Sampah organik/sisa makanan (~55%), plastik (~21%), kertas/karton (~13%), logam/kaca/residu (~11%).
- **Implementasi WASI ASRI:** Menjadi acuan analitik di `/admin/sampah` dan `/admin/statistik` untuk mengevaluasi efektivitas penanganan aduan sampah warga.

---

### Referensi 6: Dataset Stasiun Pemantauan Kualitas Udara (SPKU) Surabaya
- **URL Sumber:** `https://opendata.surabaya.go.id/kumpulan_dataset/2900-7014-111`
- **Stasiun Terverifikasi:**
  1. **SPKU Wonorejo (SUF-1):** Lokasi Jl. Wonorejo Timur, Kec. Rungkut (Kawasan Konservasi & Pemukiman Timur Surabaya). Lat: -7.3082, Lng: 112.7931.
  2. **SPKU Kebonsari (SUF-2):** Lokasi Jl. Kebonsari Manunggal, Kec. Jambangan (Kawasan Pemukiman & Penyangga Selatan). Lat: -7.3275, Lng: 112.7163.
  3. **SPKU Tandes (SUF-3):** Lokasi Jl. Margomulyo / Tandes, Kec. Tandes (Kawasan Industri & Pergudangan Barat). Lat: -7.2519, Lng: 112.6714.
- **Batasan Operasional:** Ketersediaan sensor gas dapat mengalami masa kalibrasi berkala. Status sensor (Online/Kalibrasi) harus selalu ditunjukkan secara transparan di UI.

---

### Referensi 7: BMKG — Data Prakiraan Cuaca Terbuka
- **URL Sumber:** `https://data.bmkg.go.id/prakiraan-cuaca/`
- **Kegunaan:** Sumber parameter meteorologi untuk konteks dispersi polutan dan informasi publik.
- **Parameter:**
  - Suhu Udara (`T`): °C
  - Kelembapan Relatif (`RH`): %
  - Kecepatan Angin (`ws`): km/jam atau knot
  - Arah Angin (`wd`): derajat mata angin (contoh: Timur Laut, Barat Daya)
  - Kondisi Cuaca (`weather_desc`): Cerah, Cerah Berawan, Berawan, Hujan Ringan, Hujan Petir
  - Timestamp Validitas (`utc_datetime`, `local_datetime`)
- **Kode Wilayah Surabaya (BMKG adm4):**
  - Kota Surabaya (ID Provinsi: 35, ID Kota: 35.78).
- **Atribusi Wajib:** *"Sumber Data: Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) - Prakiraan Cuaca Terbuka"*.
- **Peringatan Sains:** Suhu dan kelembapan **BUKAN** komponen pembentuk nilai ISPU, melainkan variabel kontekstual meteorologis.

---

### Referensi 8: Regulasi ISPU — Permen LHK No. 14 Tahun 2020
- **URL Dokumen:** `https://ppkl.menlhk.go.id/website/filebox/988/210704011643PERMEN%20ISPU%20NO%2014%20TAHUN%202020.pdf`
- **Metodologi Resmi:** Indeks Standar Pencemar Udara (ISPU) dihitung untuk 7 parameter: PM2.5, PM10, SO2, CO, O3, NO2, dan HC.
- **Formula Interpolasi Linier ISPU:**
  $$I = \frac{I_a - I_b}{X_a - X_b} (X_x - X_b) + I_b$$
  Di mana:
  - $I$ = Nilai ISPU terhitung
  - $I_a$ = Batas atas ISPU pada kategori terkait
  - $I_b$ = Batas bawah ISPU pada kategori terkait
  - $X_a$ = Konsentrasi ambang batas atas parameter
  - $X_b$ = Konsentrasi ambang batas bawah parameter
  - $X_x$ = Konsentrasi hasil pengukuran aktual
- **Rentang & Kategori Resmi:**
  | Rentang ISPU | Kategori | Warna Standar | Implikasi Kesehatan |
  | :--- | :--- | :--- | :--- |
  | **1 – 50** | **Baik** | Hijau (`#10B981`) | Tingkat kualitas udara yang sangat baik, tidak memberikan efek negatif terhadap manusia, hewan, dan tumbuhan. |
  | **51 – 100** | **Sedang** | Biru (`#3B82F6`) | Kualitas udara masih dapat diterima pada kesehatan manusia, hewan, dan tumbuhan. |
  | **101 – 200** | **Tidak Sehat** | Kuning (`#F59E0B`) | Kualitas udara yang bersifat merugikan pada manusia, hewan, dan tumbuhan. Kelompok sensitif disarankan mengurangi aktivitas luar ruangan. |
  | **201 – 300** | **Sangat Tidak Sehat** | Merah (`#EF4444`) | Kualitas udara yang dapat meningkatkan risiko kesehatan pada sejumlah segmen populasi yang terpapar. Hindari aktivitas luar ruangan. |
  | **> 300** | **Berbahaya** | Hitam / Ungu Gelap (`#881337`) | Kualitas udara berbahaya yang secara umum dapat merugikan kesehatan yang serius pada populasi dan memerlukan penanganan darurat. |

---

## 3. Ketentuan Desain & Batasan Platform WASI ASRI

1. **Larangan Klaim Palsu:** WASI ASRI tidak boleh menyatakan diri sebagai portal kedinasan Pemkot Surabaya. Footer dan header menyertakan atribusi akademis Kelompok 12 D4 TI UNAIR.
2. **Pemisahan Data Pengukuran vs Estimasi:** Data stasiun SPKU dilabeli *"Pengukuran Sensor Fisik"*, data blank-spot dilabeli *"Estimasi Spasial AI"*, dan data demo alur aduan dilabeli *"Data Simulasi Pengujian"*.
3. **Penyajian Satuan Konsisten:**
   - ISPU: Indeks tanpa satuan (skala 1–500).
   - PM2.5 & PM10: `µg/m³`.
   - Suhu: `°C`.
   - Kelembapan: `%`.
   - Kecepatan Angin: `km/jam`.
   - Timbulan Sampah: `kg/jiwa/hari` atau `ton/hari`.
