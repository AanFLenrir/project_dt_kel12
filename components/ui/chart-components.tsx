"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* =========================================================
   1. ISPU GAUGE METER (Permen LHK No. 14 Tahun 2020)
   ========================================================= */
export type IspuCategory =
  | "Baik"
  | "Sedang"
  | "Tidak Sehat"
  | "Sangat Tidak Sehat"
  | "Berbahaya";

export function getIspuCategory(value: number): {
  name: IspuCategory;
  color: string;
  badgeVariant:
    | "ispu-baik"
    | "ispu-sedang"
    | "ispu-tidak-sehat"
    | "ispu-sangat-tidak-sehat"
    | "ispu-berbahaya";
  healthAdvice: string;
} {
  if (value <= 50) {
    return {
      name: "Baik",
      color: "var(--color-ispu-baik, #10b981)",
      badgeVariant: "ispu-baik",
      healthAdvice:
        "Tingkat mutu udara sangat baik, aman untuk seluruh aktivitas luar ruangan.",
    };
  }
  if (value <= 100) {
    return {
      name: "Sedang",
      color: "var(--color-ispu-sedang, #3b82f6)",
      badgeVariant: "ispu-sedang",
      healthAdvice:
        "Kualitas udara memadai, aman bagi sebagian besar masyarakat umum.",
    };
  }
  if (value <= 200) {
    return {
      name: "Tidak Sehat",
      color: "var(--color-ispu-tidak-sehat, #f59e0b)",
      badgeVariant: "ispu-tidak-sehat",
      healthAdvice:
        "Kelompok rentan (anak, lansia, penderita asma) dianjurkan membatasi aktivitas luar ruangan.",
    };
  }
  if (value <= 300) {
    return {
      name: "Sangat Tidak Sehat",
      color: "var(--color-ispu-sangat-tidak-sehat, #ef4444)",
      badgeVariant: "ispu-sangat-tidak-sehat",
      healthAdvice:
        "Hindari aktivitas berat di luar ruangan. Gunakan masker filtrasi standar saat bepergian.",
    };
  }
  return {
    name: "Berbahaya",
    color: "var(--color-ispu-berbahaya, #881337)",
    badgeVariant: "ispu-berbahaya",
    healthAdvice:
      "Tingkat bahaya serius. Seluruh populasi disarankan tetap berada di dalam ruangan.",
  };
}

export function IspuGaugeMeter({
  value,
  criticalParam = "PM2.5",
  stationName = "Rata-rata Kota Surabaya",
  className,
}: {
  value: number;
  criticalParam?: string;
  stationName?: string;
  className?: string;
}) {
  const cat = getIspuCategory(value);

  // Math for semi-circle arc (0 to 300 scale mapped to 180 degrees)
  const clampedVal = Math.min(Math.max(value, 0), 300);
  const percentage = clampedVal / 300;
  const radius = 80;
  const strokeWidth = 14;

  // Arc length for circumference of half-circle: Math.PI * radius ≈ 251.3
  const halfCircumference = Math.PI * radius;
  const strokeDashoffset = halfCircumference * (1 - percentage);

  return (
    <Card
      className={cn(
        "relative flex flex-col items-center justify-between border-border/80 bg-panel/90 p-6 text-center backdrop-blur-xs",
        className,
      )}
    >
      <div className="w-full text-left">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Indeks Standar Pencemar Udara (ISPU)
        </p>
        <p className="text-xs text-muted-foreground">{stationName}</p>
      </div>

      <div className="relative my-4 flex h-36 w-52 items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 115" className="h-full w-full">
          {/* Background track */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="var(--color-panel-secondary, #163127)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Active progress arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke={cat.color}
            strokeWidth={strokeWidth}
            strokeDasharray={halfCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Value */}
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tight text-foreground">
            {value}
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Skala 1 - 300+
          </span>
        </div>
      </div>

      <div className="w-full space-y-2 border-t border-border/60 pt-3">
        <div className="flex items-center justify-between">
          <Badge variant={cat.badgeVariant} className="text-xs px-3 py-1">
            {cat.name}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">
            Parameter Kritis: <strong className="text-foreground">{criticalParam}</strong>
          </span>
        </div>
        <p className="text-left text-xs leading-relaxed text-muted-foreground">
          {cat.healthAdvice}
        </p>
      </div>
    </Card>
  );
}

/* =========================================================
   2. SVG AREA / LINE CHART CARD (With Tooltip & Units)
   ========================================================= */
export type AreaDataPoint = {
  label: string;
  value: number;
  secondaryValue?: number;
};

export function AreaChartCard({
  title,
  subtitle,
  unit,
  data,
  primaryLabel = "Nilai",
  secondaryLabel,
  source = "Open Data Surabaya (DLH)",
  className,
}: {
  title: string;
  subtitle?: string;
  unit: string;
  data: AreaDataPoint[];
  primaryLabel?: string;
  secondaryLabel?: string;
  source?: string;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <Card className="flex h-64 items-center justify-center p-6 text-muted-foreground">
        Data grafik tidak tersedia
      </Card>
    );
  }

  const values = data.map((d) => d.value);
  if (secondaryLabel) {
    data.forEach((d) => {
      if (d.secondaryValue !== undefined) values.push(d.secondaryValue);
    });
  }

  const maxVal = Math.max(...values, 10);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  // Chart coordinate box
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const getX = (index: number) =>
    paddingX + (index / (data.length - 1)) * plotWidth;
  const getY = (val: number) =>
    paddingY + plotHeight - ((val - minVal) / range) * plotHeight;

  // Generate SVG path for primary
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `M ${getX(0)},${paddingY + plotHeight} L ${points.join(
    " L ",
  )} L ${getX(data.length - 1)},${paddingY + plotHeight} Z`;

  // Secondary path if available
  let secPoints: string[] = [];
  let secLinePath = "";
  if (secondaryLabel) {
    secPoints = data.map(
      (d, i) => `${getX(i)},${getY(d.secondaryValue ?? d.value)}`,
    );
    secLinePath = `M ${secPoints.join(" L ")}`;
  }

  const activeData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <Card className={cn("border-border/80 bg-panel/90 p-6 backdrop-blur-xs", className)}>
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/50 pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          {subtitle ? (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald" />
            <span className="text-muted-foreground">{primaryLabel}</span>
          </div>
          {secondaryLabel ? (
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-cyan" />
              <span className="text-muted-foreground">{secondaryLabel}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-4 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-emerald, #10b981)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-emerald, #10b981)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((pct, idx) => {
            const y = paddingY + plotHeight * pct;
            const valLabel = Math.round(maxVal - pct * range);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--color-border, #243b32)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  fill="var(--color-muted-foreground, #9ca3af)"
                  fontSize="10"
                  textAnchor="end"
                >
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line paths */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-emerald, #10b981)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {secLinePath ? (
            <path
              d={secLinePath}
              fill="none"
              stroke="var(--color-cyan, #22d3ee)"
              strokeWidth="2"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />
          ) : null}

          {/* Points & Hover targets */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.value);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5 : 3.5}
                  fill={
                    isHovered
                      ? "var(--color-mint, #a7f3d0)"
                      : "var(--color-emerald, #10b981)"
                  }
                  stroke="var(--color-panel, #10231d)"
                  strokeWidth="2"
                  className="transition-all"
                />
                {/* Invisible hover trigger area */}
                <rect
                  x={cx - 15}
                  y={0}
                  width={30}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* X-axis label */}
                <text
                  x={cx}
                  y={height - 5}
                  fill="var(--color-muted-foreground, #9ca3af)"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {activeData && hoveredIndex !== null ? (
          <div
            className="pointer-events-none absolute -top-2 rounded-md border border-border bg-panel-secondary px-3 py-1.5 shadow-lg text-xs"
            style={{
              left: `${(hoveredIndex / (data.length - 1)) * 80 + 10}%`,
              transform: "translateX(-50%)",
            }}
          >
            <p className="font-semibold text-foreground">{activeData.label}</p>
            <p className="text-emerald">
              {primaryLabel}: {activeData.value} {unit}
            </p>
            {activeData.secondaryValue !== undefined && secondaryLabel ? (
              <p className="text-cyan">
                {secondaryLabel}: {activeData.secondaryValue} {unit}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2 text-[11px] text-muted-foreground">
        <span>Satuan: <strong>{unit}</strong></span>
        <span>Sumber: {source}</span>
      </div>
    </Card>
  );
}

/* =========================================================
   3. SVG BAR CHART CARD (Categorical Distribution)
   ========================================================= */
export type BarDataPoint = {
  label: string;
  value: number;
  color?: string;
  percentage?: number;
};

export function BarChartCard({
  title,
  subtitle,
  unit = "Laporan",
  data,
  source = "Database WASI ASRI",
  className,
}: {
  title: string;
  subtitle?: string;
  unit?: string;
  data: BarDataPoint[];
  source?: string;
  className?: string;
}) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className={cn("border-border/80 bg-panel/90 p-6 backdrop-blur-xs", className)}>
      <div className="border-b border-border/50 pb-3">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        {data.map((item, idx) => {
          const pct = Math.round((item.value / maxVal) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="font-semibold text-emerald">
                  {item.value} <span className="font-normal text-muted-foreground">{unit}</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-panel-secondary">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.color || "var(--color-emerald, #10b981)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
        <span>Satuan: <strong>{unit}</strong></span>
        <span>Sumber: {source}</span>
      </div>
    </Card>
  );
}

/* =========================================================
   4. DONUT CHART CARD
   ========================================================= */
export function DonutChartCard({
  title,
  subtitle,
  data,
  totalLabel = "Total",
  source = "WASI ASRI Data Center",
  className,
}: {
  title: string;
  subtitle?: string;
  data: { label: string; value: number; color: string }[];
  totalLabel?: string;
  source?: string;
  className?: string;
}) {
  const total = data.reduce((acc, cur) => acc + cur.value, 0) || 1;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const donutSegments = data.map((item, idx) => {
    const itemStroke = (item.value / total) * circumference;
    const strokeOffset = data
      .slice(0, idx)
      .reduce((sum, d) => sum + (d.value / total) * circumference, 0);
    return { ...item, itemStroke, strokeOffset };
  });

  return (
    <Card className={cn("border-border/80 bg-panel/90 p-6 backdrop-blur-xs", className)}>
      <div className="border-b border-border/50 pb-3">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row">
        {/* SVG Donut */}
        <div className="relative flex size-36 shrink-0 items-center justify-center">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="var(--color-panel-secondary, #163127)"
              strokeWidth="14"
            />
            {donutSegments.map((item, idx) => (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="14"
                strokeDasharray={`${item.itemStroke} ${circumference - item.itemStroke}`}
                strokeDashoffset={-item.strokeOffset}
                className="transition-all duration-500"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-foreground">{total}</span>
            <span className="text-[10px] text-muted-foreground uppercase">{totalLabel}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2 text-xs">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / total) * 100);
            return (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-semibold text-foreground">
                  {item.value} <span className="font-normal text-muted-foreground">({pct}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-border/50 pt-2 text-[11px] text-muted-foreground">
        Sumber: {source}
      </div>
    </Card>
  );
}
