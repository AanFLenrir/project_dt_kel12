import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "emerald"
  | "cyan"
  | "destructive"
  | "destructive-outline";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm",
  secondary:
    "bg-panel-secondary text-foreground hover:bg-muted border border-border/80",
  outline:
    "border border-border bg-panel/50 text-foreground hover:bg-panel hover:border-emerald/50",
  ghost:
    "text-muted-foreground hover:text-foreground hover:bg-panel-secondary",
  emerald:
    "bg-emerald text-background font-semibold hover:bg-emerald/90 shadow-sm shadow-emerald/20",
  cyan:
    "bg-cyan text-background font-semibold hover:bg-cyan/90 shadow-sm shadow-cyan/20",
  destructive:
    "bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 shadow-sm",
  "destructive-outline":
    "border border-destructive/40 text-destructive hover:bg-destructive/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props} />
  );
}
