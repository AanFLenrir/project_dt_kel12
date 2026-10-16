/**
 * WASI ASRI — Environmental Data Models & Reference Datasets
 * Sesuai riset Open Data Surabaya (DLH), BMKG, dan Regulasi ISPU Permen LHK No. 14 Tahun 2020.
 */

export type AirQualityStation = {
  id: string;
  code: string;
  name: string;
  district: string;
  address: string;
  coordinates: { lat: number; lng: number };
  status: "Aktif" | "Kalibrasi" | "Maintenance";
  lastUpdated: string;
  ispu: number;
  criticalParam: "PM2.5" | "PM10" | "SO2" | "CO" | "O3" | "NO2";
  pollutants: {
    pm25: { value: number; unit: "µg/m³"; standard: 65 };
    pm10: { value: number; unit: "µg/m³"; standard: 75 };
    so2: { value: number; unit: "µg/m³"; standard: 75 };
    co: { value: number; unit: "µg/m³"; standard: 4000 };
    o3: { value: number; unit: "µg/m³"; standard: 100 };
    no2: { value: number; unit: "µg/m³"; standard: 65 };
  };
  provenance: {
    source: string;
    type: "Aktual" | "Estimasi" | "Simulasi";
  };
};

export const SURABAYA_SPKU_STATIONS: AirQualityStation[] = [
  {
    id: "spku-wonorejo",
    code: "SUF-1",
    name: "SPKU Wonorejo",
    district: "Rungkut",
    address: "Jl. Wonorejo Timur No. 1, Kawasan Konservasi Mangrove Rungkut",
    coordinates: { lat: -7.3082, lng: 112.7931 },
    status: "Aktif",
    lastUpdated: "Hari ini, 10:00 WIB",
    ispu: 42,
    criticalParam: "PM2.5",
    pollutants: {
      pm25: { value: 24.8, unit: "µg/m³", standard: 65 },
      pm10: { value: 36.2, unit: "µg/m³", standard: 75 },
      so2: { value: 14.1, unit: "µg/m³", standard: 75 },
      co: { value: 920, unit: "µg/m³", standard: 4000 },
      o3: { value: 48.0, unit: "µg/m³", standard: 100 },
      no2: { value: 18.5, unit: "µg/m³", standard: 65 },
    },
    provenance: {
      source: "Open Data Surabaya / DLH SPKU SUF-1",
      type: "Aktual",
    },
  },
  {
    id: "spku-kebonsari",
    code: "SUF-2",
    name: "SPKU Kebonsari",
    district: "Jambangan",
    address: "Jl. Kebonsari Manunggal No. 12, Jambangan, Surabaya Selatan",
    coordinates: { lat: -7.3275, lng: 112.7163 },
    status: "Aktif",
    lastUpdated: "Hari ini, 10:00 WIB",
    ispu: 68,
    criticalParam: "PM2.5",
    pollutants: {
      pm25: { value: 46.2, unit: "µg/m³", standard: 65 },
      pm10: { value: 54.8, unit: "µg/m³", standard: 75 },
      so2: { value: 21.4, unit: "µg/m³", standard: 75 },
      co: { value: 1450, unit: "µg/m³", standard: 4000 },
      o3: { value: 58.2, unit: "µg/m³", standard: 100 },
      no2: { value: 28.0, unit: "µg/m³", standard: 65 },
    },
    provenance: {
      source: "Open Data Surabaya / DLH SPKU SUF-2",
      type: "Aktual",
    },
  },
  {
    id: "spku-tandes",
    code: "SUF-3",
    name: "SPKU Tandes",
    district: "Tandes",
    address: "Kawasan Industri & Pergudangan Margomulyo, Tandes, Surabaya Barat",
    coordinates: { lat: -7.2519, lng: 112.6714 },
    status: "Aktif",
    lastUpdated: "Hari ini, 10:00 WIB",
    ispu: 88,
    criticalParam: "PM2.5",
    pollutants: {
      pm25: { value: 59.4, unit: "µg/m³", standard: 65 },
      pm10: { value: 68.7, unit: "µg/m³", standard: 75 },
      so2: { value: 34.0, unit: "µg/m³", standard: 75 },
      co: { value: 2100, unit: "µg/m³", standard: 4000 },
      o3: { value: 62.5, unit: "µg/m³", standard: 100 },
      no2: { value: 35.8, unit: "µg/m³", standard: 65 },
    },
    provenance: {
      source: "Open Data Surabaya / DLH SPKU SUF-3",
      type: "Aktual",
    },
  },
];

export type WeatherObservation = {
  region: string;
  district: string;
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection: string; // e.g. "Timur Laut"
  cloudCover: number; // %
  visibility: number; // km
  weatherCondition: "Cerah" | "Cerah Berawan" | "Berawan" | "Hujan Ringan" | "Hujan Petir";
  forecastTime: string;
  source: string;
  thermalInversionRisk: "Rendah" | "Sedang" | "Tinggi";
};

export const SURABAYA_WEATHER_DATA: WeatherObservation[] = [
  {
    region: "Surabaya Pusat",
    district: "Genteng / Tegalsari",
    temperature: 32,
    humidity: 72,
    windSpeed: 14,
    windDirection: "Timur Laut",
    cloudCover: 35,
    visibility: 9,
    weatherCondition: "Cerah Berawan",
    forecastTime: "Pukul 12:00 - 18:00 WIB",
    source: "BMKG Data Terbuka Stasiun Perak II",
    thermalInversionRisk: "Rendah",
  },
  {
    region: "Surabaya Timur",
    district: "Rungkut / Sukolilo",
    temperature: 31,
    humidity: 76,
    windSpeed: 16,
    windDirection: "Timur",
    cloudCover: 40,
    visibility: 10,
    weatherCondition: "Cerah Berawan",
    forecastTime: "Pukul 12:00 - 18:00 WIB",
    source: "BMKG Data Terbuka Stasiun Maritim Tanjung Perak",
    thermalInversionRisk: "Rendah",
  },
  {
    region: "Surabaya Barat",
    district: "Tandes / Benowo",
    temperature: 33,
    humidity: 68,
    windSpeed: 12,
    windDirection: "Barat Laut",
    cloudCover: 30,
    visibility: 8,
    weatherCondition: "Cerah",
    forecastTime: "Pukul 12:00 - 18:00 WIB",
    source: "BMKG Data Terbuka Stasiun Meteorologi Juanda",
    thermalInversionRisk: "Sedang",
  },
  {
    region: "Surabaya Selatan",
    district: "Wonokromo / Jambangan",
    temperature: 31,
    humidity: 74,
    windSpeed: 10,
    windDirection: "Tenggara",
    cloudCover: 45,
    visibility: 9,
    weatherCondition: "Berawan",
    forecastTime: "Pukul 12:00 - 18:00 WIB",
    source: "BMKG Data Terbuka",
    thermalInversionRisk: "Rendah",
  },
  {
    region: "Surabaya Utara",
    district: "Pabean Cantian / Kenjeran",
    temperature: 32,
    humidity: 78,
    windSpeed: 18,
    windDirection: "Utara",
    cloudCover: 30,
    visibility: 10,
    weatherCondition: "Cerah Berawan",
    forecastTime: "Pukul 12:00 - 18:00 WIB",
    source: "BMKG Stasiun Meteorologi Maritim",
    thermalInversionRisk: "Rendah",
  },
];

export type WasteFacility = {
  id: string;
  name: string;
  type: "TPS" | "TPS-3R" | "Bank Sampah Induk" | "Rumah Kompos" | "TPA Benowo";
  district: string;
  address: string;
  coordinates: { lat: number; lng: number };
  capacityTonPerDay: number;
  currentLoadPercentage: number;
  status: "Normal" | "Mendekati Kapasitas" | "Perlu Pengangkutan Segera";
  services: string[];
};

export const SURABAYA_WASTE_FACILITIES: WasteFacility[] = [
  {
    id: "fac-tpa-benowo",
    name: "TPA Benowo (PSEL Waste-to-Energy)",
    type: "TPA Benowo",
    district: "Benowo",
    address: "Jl. Romokalisari, Benowo, Surabaya Barat",
    coordinates: { lat: -7.2185, lng: 112.6318 },
    capacityTonPerDay: 1600,
    currentLoadPercentage: 82,
    status: "Normal",
    services: ["Pembangkit Listrik Sampah", "Sanitary Landfill", "Pengolahan Residu"],
  },
  {
    id: "fac-bsi-surabaya",
    name: "Bank Sampah Induk Surabaya (BSIS)",
    type: "Bank Sampah Induk",
    district: "Tegalsari",
    address: "Jl. Menur Pumpungan No. 32, Surabaya",
    coordinates: { lat: -7.2885, lng: 112.7668 },
    capacityTonPerDay: 45,
    currentLoadPercentage: 64,
    status: "Normal",
    services: ["Tabungan Sampah Plastik", "Edukasi Daur Ulang", "Penerimaan Kertas/Karton"],
  },
  {
    id: "fac-tps3r-sutorejo",
    name: "TPS-3R Sutorejo Prima",
    type: "TPS-3R",
    district: "Mulyorejo",
    address: "Jl. Sutorejo Prima Utara Blok BB, Mulyorejo",
    coordinates: { lat: -7.2662, lng: 112.7885 },
    capacityTonPerDay: 18,
    currentLoadPercentage: 70,
    status: "Normal",
    services: ["Pemilahan Organik/Anorganik", "Pencacahan Plastik", "Pengomposan Warga"],
  },
  {
    id: "fac-rk-bratang",
    name: "Rumah Kompos Bratang",
    type: "Rumah Kompos",
    district: "Gubeng",
    address: "Kawasan Taman Flora Bratang, Jl. Bratang Binangun, Gubeng",
    coordinates: { lat: -7.2941, lng: 112.7602 },
    capacityTonPerDay: 25,
    currentLoadPercentage: 58,
    status: "Normal",
    services: ["Pengolahan Sampah Ranting/Daun", "Distribusi Kompos Gratis untuk Warga"],
  },
  {
    id: "fac-tps-bratang",
    name: "TPS Bratang Gede",
    type: "TPS",
    district: "Wonokromo",
    address: "Jl. Bratang Gede Gang VI, Wonokromo",
    coordinates: { lat: -7.2995, lng: 112.7538 },
    capacityTonPerDay: 22,
    currentLoadPercentage: 88,
    status: "Perlu Pengangkutan Segera",
    services: ["Pengangkutan Kontainer Harian", "Pembuangan Sampah Rumah Tangga"],
  },
  {
    id: "fac-tps-dukuh-kupang",
    name: "TPS Dukuh Kupang",
    type: "TPS",
    district: "Dukuh Pakis",
    address: "Jl. Dukuh Kupang Barat No. 50, Dukuh Pakis",
    coordinates: { lat: -7.2798, lng: 112.7092 },
    capacityTonPerDay: 20,
    currentLoadPercentage: 75,
    status: "Normal",
    services: ["Armada Dump Truck DLH", "Penampungan Sampah Kelurahan"],
  },
  {
    id: "fac-tps-manukan",
    name: "TPS Manukan Kulon",
    type: "TPS",
    district: "Tandes",
    address: "Jl. Manukan Kulon No. 18, Tandes",
    coordinates: { lat: -7.2612, lng: 112.6685 },
    capacityTonPerDay: 24,
    currentLoadPercentage: 85,
    status: "Mendekati Kapasitas",
    services: ["Armada Truk DLH", "Penampungan Limbah Domestik"],
  },
];

export const SURABAYA_HISTORICAL_ISPU = [
  { label: "Senin", value: 58, secondaryValue: 62 },
  { label: "Selasa", value: 65, secondaryValue: 70 },
  { label: "Rabu", value: 72, secondaryValue: 74 },
  { label: "Kamis", value: 68, secondaryValue: 65 },
  { label: "Jumat", value: 82, secondaryValue: 78 },
  { label: "Sabtu", value: 76, secondaryValue: 80 },
  { label: "Minggu", value: 66, secondaryValue: 68 },
];

export const SURABAYA_WASTE_COMPOSITION = [
  { label: "Sampah Organik (Sisa Makanan)", value: 54, color: "#10b981" },
  { label: "Sampah Plastik (Kemasan/Kresek)", value: 22, color: "#3b82f6" },
  { label: "Kertas & Karton", value: 12, color: "#f59e0b" },
  { label: "Logam & Kaca", value: 6, color: "#22d3ee" },
  { label: "Residu / B3 Rumah Tangga", value: 6, color: "#ef4444" },
];
