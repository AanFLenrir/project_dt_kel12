import type { ReactNode } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  provenance: {
    source: string;
    type: "Aktual" | "Estimasi" | "Simulasi";
    lastUpdated?: string;
  };
  highlightColor?: "emerald" | "cyan" | "amber" | "rose" | "blue" | "default";
  className?: string;
};

export function StatCard({
  title,
  value,
  unit,
  description,
  icon,
  trend,
  provenance,
  highlightColor = "default",
  className,
}: StatCardProps) {
  const badgeVariant: BadgeVariant =
    provenance.type === "Aktual"
      ? "prov-aktual"
      : provenance.type === "Estimasi"
        ? "prov-estimasi"
        : "prov-simulasi";

  return (
    <Card
      className={cn(
        "relative flex flex-col justify-between overflow-hidden border-border/80 bg-panel/90 backdrop-blur-xs transition-all hover:border-emerald/40 hover:shadow-md",
        highlightColor === "emerald" && "border-emerald/30 bg-emerald/5",
        highlightColor === "cyan" && "border-cyan/30 bg-cyan/5",
        highlightColor === "amber" && "border-amber-500/30 bg-amber-500/5",
        highlightColor === "rose" && "border-rose-500/30 bg-rose-500/5",
        highlightColor === "blue" && "border-blue-500/30 bg-blue-500/5",
        className,
      )}
    >
      {/* Header Stat */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {value}
            </span>
            {unit ? (
              <span className="text-xs font-semibold text-muted-foreground">
                {unit}
              </span>
            ) : null}
          </div>
        </div>
        {icon ? (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-panel-secondary text-emerald">
            {icon}
          </div>
        ) : null}
      </div>

      {/* Description / Trend */}
      <div className="mt-3 space-y-2">
        {trend ? (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "font-semibold",
                trend.isPositive ? "text-emerald" : "text-rose-400",
              )}
            >
              {trend.value}
            </span>
            {trend.label ? (
              <span className="text-muted-foreground">{trend.label}</span>
            ) : null}
          </div>
        ) : null}

        {description ? (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        ) : null}
      </div>

      {/* Footer Provenance */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5 truncate">
          <span className="truncate" title={`Sumber: ${provenance.source}`}>
            {provenance.source}
          </span>
          {provenance.lastUpdated ? (
            <span className="text-muted-foreground/60">• {provenance.lastUpdated}</span>
          ) : null}
        </div>
        <Badge variant={badgeVariant}>{provenance.type}</Badge>
      </div>
    </Card>
  );
}
