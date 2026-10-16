import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "ghost";
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        variant === "default" && "border-border bg-panel p-6 shadow-sm",
        variant === "secondary" && "border-border/70 bg-panel-secondary p-6 shadow-xs",
        variant === "ghost" && "border-transparent bg-transparent p-4",
        className,
      )}
      {...props}
    />
  );
}
