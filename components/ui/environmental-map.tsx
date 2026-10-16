"use client";

import { useState, useMemo } from "react";
import {
  LuZoomIn,
  LuZoomOut,
  LuSearch,
  LuMapPin,
  LuWind,
  LuTrash2,
  LuTreePine,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  SURABAYA_SPKU_STATIONS,
  SURABAYA_WASTE_FACILITIES,
  type AirQualityStation,
  type WasteFacility,
} from "@/lib/environmental-data";
import { getReports, type CitizenReport } from "@/lib/reports-store";
import { cn } from "@/lib/utils";

// Additional RTH (Ruang Terbuka Hijau) points in Surabaya
const SURABAYA_RTH = [
  {
    id: "rth-bungkul",
    name: "Taman Bungkul (Kawasan Edukasi & RTH)",
    district: "Wonokromo",
    coordinates: { lat: -7.2913, lng: 112.7397 },
    areaHa: 1.2,
    status: "RTH Publik Aktif",
    treesCount: 350,
  },
  {
    id: "rth-mangrove",
    name: "Ekowisata Mangrove Wonorejo",
    district: "Rungkut",
    coordinates: { lat: -7.3115, lng: 112.8124 },
    areaHa: 200,
    status: "Kawasan Konservasi Pesisir",
    treesCount: 15000,
  },
  {
    id: "rth-harmoni",
    name: "Taman Harmoni Keputih (Eks TPA Keputih)",
    district: "Sukolilo",
    coordinates: { lat: -7.2974, lng: 112.8021 },
    areaHa: 8.5,
    status: "Taman Hutan Kota & Bambu",
    treesCount: 2200,
  },
];

// Surabaya bounding box:
// Lat: -7.36 (South) to -7.18 (North)
// Lng: 112.60 (West) to 112.85 (East)
const MIN_LAT = -7.36;
const MAX_LAT = -7.18;
const MIN_LNG = 112.60;
const MAX_LNG = 112.85;

function projectToCanvas(lat: number, lng: number, width: number, height: number) {
  const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * width;
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * height;
  return { x, y };
}

export type SelectedMapEntity =
  | { type: "station"; data: AirQualityStation }
  | { type: "facility"; data: WasteFacility }
  | { type: "report"; data: CitizenReport }
  | { type: "rth"; data: (typeof SURABAYA_RTH)[0] }
  | null;

export function EnvironmentalMap({
  height = 550,
  showControls = true,
  className,
}: {
  height?: number;
  showControls?: boolean;
  className?: string;
}) {
  const [zoom, setZoom] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState<SelectedMapEntity>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [layerStations, setLayerStations] = useState(true);
  const [layerFacilities, setLayerFacilities] = useState(true);
  const [layerReports, setLayerReports] = useState(true);
  const [layerRth, setLayerRth] = useState(true);

  const reports = useMemo(() => getReports(), []);

  const svgWidth = 800;
  const svgHeight = 500;

  // Filtered lists based on search
  const filteredStations = useMemo(() => {
    if (!layerStations) return [];
    return SURABAYA_SPKU_STATIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [layerStations, searchQuery]);

  const filteredFacilities = useMemo(() => {
    if (!layerFacilities) return [];
    return SURABAYA_WASTE_FACILITIES.filter(
      (f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.district.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [layerFacilities, searchQuery]);

  const filteredReports = useMemo(() => {
    if (!layerReports) return [];
    return reports.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.district.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [layerReports, reports, searchQuery]);

  const filteredRth = useMemo(() => {
    if (!layerRth) return [];
    return SURABAYA_RTH.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.district.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [layerRth, searchQuery]);

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden border-border/80 bg-panel/95 p-0 backdrop-blur-md",
        className,
      )}
      style={{ minHeight: `${height}px` }}
    >
      {/* Top Map Toolbar */}
      {showControls ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-panel-secondary/60 p-3 sm:px-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <LuSearch className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari kecamatan / stasiun / TPS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-panel py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-emerald focus:outline-none"
            />
          </div>

          {/* Layer toggles */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setLayerStations(!layerStations)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors border",
                layerStations
                  ? "bg-emerald/20 text-emerald border-emerald/40"
                  : "bg-panel text-muted-foreground border-border opacity-60",
              )}
            >
              <LuWind className="size-3.5" />
              <span>SPKU ({SURABAYA_SPKU_STATIONS.length})</span>
            </button>

            <button
              onClick={() => setLayerFacilities(!layerFacilities)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors border",
                layerFacilities
                  ? "bg-cyan/20 text-cyan border-cyan/40"
                  : "bg-panel text-muted-foreground border-border opacity-60",
              )}
            >
              <LuTrash2 className="size-3.5" />
              <span>TPS/Fasilitas ({SURABAYA_WASTE_FACILITIES.length})</span>
            </button>

            <button
              onClick={() => setLayerReports(!layerReports)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors border",
                layerReports
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-panel text-muted-foreground border-border opacity-60",
              )}
            >
              <LuMapPin className="size-3.5" />
              <span>Laporan Warga ({reports.length})</span>
            </button>

            <button
              onClick={() => setLayerRth(!layerRth)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-colors border",
                layerRth
                  ? "bg-green-500/20 text-green-300 border-green-500/40"
                  : "bg-panel text-muted-foreground border-border opacity-60",
              )}
            >
              <LuTreePine className="size-3.5" />
              <span>RTH Konservasi</span>
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-panel p-0.5">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
              className="flex size-7 items-center justify-center rounded text-foreground hover:bg-panel-secondary"
              title="Perbesar"
              aria-label="Perbesar peta"
            >
              <LuZoomIn className="size-3.5" />
            </button>
            <span className="px-1 text-[10px] font-mono text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
              className="flex size-7 items-center justify-center rounded text-foreground hover:bg-panel-secondary"
              title="Perkecil"
              aria-label="Perkecil peta"
            >
              <LuZoomOut className="size-3.5" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Main Interactive Map Canvas */}
      <div className="relative flex-1 overflow-hidden bg-[#06100d] select-none">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* SVG Projection */}
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="h-full w-full max-h-[600px] overflow-visible"
          >
            {/* Surabaya stylized coastline / boundaries */}
            <path
              d="M 120 40 Q 250 20 450 60 T 700 120 L 750 350 Q 720 450 600 460 T 350 480 T 150 420 T 80 250 Z"
              fill="#0e1f19"
              stroke="#243b32"
              strokeWidth="2"
              className="transition-colors"
            />

            {/* Major Arterial Roads / Kalimas river representation */}
            <path
              d="M 380 70 Q 420 180 430 260 T 450 450"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              opacity="0.4"
            />
            <path
              d="M 150 250 Q 320 270 550 260 T 730 240"
              fill="none"
              stroke="#164e63"
              strokeWidth="1.5"
              opacity="0.5"
            />

            {/* District labels in background */}
            <text x="420" y="210" fill="#243b32" fontSize="16" fontWeight="bold" textAnchor="middle">
              SURABAYA PUSAT
            </text>
            <text x="580" y="310" fill="#243b32" fontSize="14" fontWeight="bold" textAnchor="middle">
              SURABAYA TIMUR
            </text>
            <text x="240" y="280" fill="#243b32" fontSize="14" fontWeight="bold" textAnchor="middle">
              SURABAYA BARAT
            </text>
            <text x="430" y="390" fill="#243b32" fontSize="14" fontWeight="bold" textAnchor="middle">
              SURABAYA SELATAN
            </text>
            <text x="440" y="110" fill="#243b32" fontSize="14" fontWeight="bold" textAnchor="middle">
              SURABAYA UTARA
            </text>

            {/* LAYER: RTH Conservations */}
            {filteredRth.map((rth) => {
              const { x, y } = projectToCanvas(
                rth.coordinates.lat,
                rth.coordinates.lng,
                svgWidth,
                svgHeight,
              );
              return (
                <g
                  key={rth.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedEntity({ type: "rth", data: rth })}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill="#15803d"
                    fillOpacity="0.25"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                  />
                  <circle cx={x} cy={y} r="5" fill="#22c55e" />
                  <text
                    x={x}
                    y={y + 18}
                    fill="#86efac"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {rth.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* LAYER: Waste Facilities */}
            {filteredFacilities.map((fac) => {
              const { x, y } = projectToCanvas(
                fac.coordinates.lat,
                fac.coordinates.lng,
                svgWidth,
                svgHeight,
              );
              return (
                <g
                  key={fac.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedEntity({ type: "facility", data: fac })}
                >
                  <rect
                    x={x - 10}
                    y={y - 10}
                    width="20"
                    height="20"
                    rx="4"
                    fill="#0891b2"
                    fillOpacity="0.25"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform origin-center"
                  />
                  <circle cx={x} cy={y} r="3" fill="#22d3ee" />
                  <text
                    x={x}
                    y={y + 16}
                    fill="#a5f3fc"
                    fontSize="8.5"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {fac.name.replace(/TPS-3R|Bank Sampah Induk|Rumah Kompos|TPA/g, "").trim().slice(0, 10)}
                  </text>
                </g>
              );
            })}

            {/* LAYER: Citizen Reports */}
            {filteredReports.map((rep) => {
              const { x, y } = projectToCanvas(
                rep.coordinates.lat,
                rep.coordinates.lng,
                svgWidth,
                svgHeight,
              );
              const isResolved = rep.status === "Selesai";
              return (
                <g
                  key={rep.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedEntity({ type: "report", data: rep })}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill={isResolved ? "#059669" : "#eab308"}
                    fillOpacity="0.3"
                    stroke={isResolved ? "#10b981" : "#facc15"}
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform origin-center"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={isResolved ? "#10b981" : "#facc15"}
                  />
                </g>
              );
            })}

            {/* LAYER: Air Quality Stations (SPKU) */}
            {filteredStations.map((station) => {
              const { x, y } = projectToCanvas(
                station.coordinates.lat,
                station.coordinates.lng,
                svgWidth,
                svgHeight,
              );
              const color =
                station.ispu <= 50
                  ? "#10b981"
                  : station.ispu <= 100
                    ? "#3b82f6"
                    : "#f59e0b";

              return (
                <g
                  key={station.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedEntity({ type: "station", data: station })}
                >
                  {/* Ping radar effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    opacity="0.4"
                    className="animate-ping"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill={color}
                    fillOpacity="0.2"
                    stroke={color}
                    strokeWidth="2"
                    className="group-hover:scale-125 transition-transform origin-center"
                  />
                  <circle cx={x} cy={y} r="5" fill={color} />
                  {/* Label badge */}
                  <rect
                    x={x - 35}
                    y={y - 28}
                    width="70"
                    height="16"
                    rx="4"
                    fill="#081411"
                    stroke={color}
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y - 17}
                    fill="#f8fafc"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ISPU {station.ispu}
                  </text>
                  <text
                    x={x}
                    y={y + 19}
                    fill="#f8fafc"
                    fontSize="9.5"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {station.code} ({station.district})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Detail Card on Selection */}
        {selectedEntity ? (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 rounded-xl border border-border/90 bg-panel/95 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2.5">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {selectedEntity.type === "station" && "Stasiun Pemantau Udara (SPKU)"}
                  {selectedEntity.type === "facility" && "Fasilitas Pengelolaan Sampah"}
                  {selectedEntity.type === "report" && "Laporan Lingkungan Warga"}
                  {selectedEntity.type === "rth" && "Ruang Terbuka Hijau & Konservasi"}
                </span>
                <h4 className="text-sm font-bold text-foreground">
                  {selectedEntity.type === "station" && selectedEntity.data.name}
                  {selectedEntity.type === "facility" && selectedEntity.data.name}
                  {selectedEntity.type === "report" && selectedEntity.data.title}
                  {selectedEntity.type === "rth" && selectedEntity.data.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-xs text-muted-foreground hover:text-foreground p-1"
                aria-label="Tutup popup"
              >
                ✕
              </button>
            </div>

            <div className="mt-2.5 space-y-2 text-xs">
              {/* Station specifics */}
              {selectedEntity.type === "station" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Indeks ISPU Terkini:</span>
                    <Badge variant={selectedEntity.data.ispu <= 50 ? "ispu-baik" : "ispu-sedang"}>
                      {selectedEntity.data.ispu} (Parameter: {selectedEntity.data.criticalParam})
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">PM2.5 / PM10:</span>
                    <span className="font-semibold text-foreground">
                      {selectedEntity.data.pollutants.pm25.value} / {selectedEntity.data.pollutants.pm10.value} µg/m³
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Lokasi: {selectedEntity.data.address}
                  </p>
                </>
              )}

              {/* Facility specifics */}
              {selectedEntity.type === "facility" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tipe:</span>
                    <Badge variant="cyan">{selectedEntity.data.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Beban Kapasitas:</span>
                    <span className="font-semibold text-foreground">
                      {selectedEntity.data.currentLoadPercentage}% ({selectedEntity.data.capacityTonPerDay} ton/hari)
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Alamat: {selectedEntity.data.address}
                  </p>
                </>
              )}

              {/* Report specifics */}
              {selectedEntity.type === "report" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={selectedEntity.data.status === "Selesai" ? "status-selesai" : "status-diproses"}>
                      {selectedEntity.data.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nomor Tiket:</span>
                    <span className="font-mono text-emerald font-bold">
                      {selectedEntity.data.ticketNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {selectedEntity.data.description}
                  </p>
                </>
              )}

              {/* RTH specifics */}
              {selectedEntity.type === "rth" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status Kawasan:</span>
                    <span className="font-semibold text-green-300">
                      {selectedEntity.data.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Luas Area:</span>
                    <span className="font-bold text-foreground">
                      {selectedEntity.data.areaHa} Hektar
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}

        {/* Bottom Legend */}
        <div className="absolute bottom-3 left-3 hidden sm:flex flex-wrap items-center gap-2 rounded-lg border border-border/80 bg-panel/90 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-xs">
          <span className="font-semibold text-foreground">Legenda:</span>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-emerald" />
            <span>ISPU Baik</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-blue-500" />
            <span>ISPU Sedang</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-cyan" />
            <span>Fasilitas TPS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-yellow-400" />
            <span>Laporan Masuk</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
