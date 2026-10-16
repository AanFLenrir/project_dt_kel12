import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "outline"
  | "emerald"
  | "cyan"
  | "amber"
  | "ispu-baik"
  | "ispu-sedang"
  | "ispu-tidak-sehat"
  | "ispu-sangat-tidak-sehat"
  | "ispu-berbahaya"
  | "status-diterima"
  | "status-ditugaskan"
  | "status-diproses"
  | "status-selesai"
  | "status-ditolak"
  | "prov-aktual"
  | "prov-estimasi"
  | "prov-simulasi";

export type BadgeSize = "sm" | "md";

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-panel-secondary text-foreground border border-border/60",
  primary: "bg-primary text-primary-foreground font-semibold",
  outline: "border border-border bg-panel/30 text-foreground",
  emerald: "bg-emerald/15 text-emerald border border-emerald/30 font-medium",
  cyan: "bg-cyan/15 text-cyan border border-cyan/30 font-medium",
  amber: "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-medium",

  // ISPU Permen LHK 14/2020 Standard
  "ispu-baik":
    "bg-ispu-baik/15 text-ispu-baik border border-ispu-baik/30 font-semibold",
  "ispu-sedang":
    "bg-ispu-sedang/15 text-ispu-sedang border border-ispu-sedang/30 font-semibold",
  "ispu-tidak-sehat":
    "bg-ispu-tidak-sehat/15 text-ispu-tidak-sehat border border-ispu-tidak-sehat/30 font-semibold",
  "ispu-sangat-tidak-sehat":
    "bg-ispu-sangat-tidak-sehat/15 text-ispu-sangat-tidak-sehat border border-ispu-sangat-tidak-sehat/30 font-semibold",
  "ispu-berbahaya":
    "bg-ispu-berbahaya/20 text-red-200 border border-ispu-berbahaya/50 font-bold",

  // Laporan Status
  "status-diterima":
    "bg-blue-500/15 text-blue-400 border border-blue-500/30 font-medium",
  "status-ditugaskan":
    "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-medium",
  "status-diproses":
    "bg-purple-500/15 text-purple-400 border border-purple-500/30 font-medium",
  "status-selesai":
    "bg-emerald/15 text-emerald border border-emerald/30 font-semibold",
  "status-ditolak":
    "bg-rose-500/15 text-rose-400 border border-rose-500/30 font-medium",

  // Provenance / Data Tag
  "prov-aktual":
    "bg-emerald/10 text-emerald text-[11px] border border-emerald/30 font-mono",
  "prov-estimasi":
    "bg-cyan/10 text-cyan text-[11px] border border-cyan/30 font-mono",
  "prov-simulasi":
    "bg-amber-500/10 text-amber-300 text-[11px] border border-amber-500/30 font-mono",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-0.5 text-xs",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  variant = "neutral",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full tracking-tight transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
