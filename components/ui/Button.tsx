import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-sm hover:bg-brand-strong focus-visible:ring-brand/40",
  secondary:
    "bg-lilac text-navy hover:bg-lilac-soft focus-visible:ring-navy/20",
  outline:
    "border border-line bg-white text-ink hover:bg-lilac focus-visible:ring-navy/20",
  ghost:
    "text-muted hover:bg-lilac focus-visible:ring-navy/20",
  danger:
    "bg-danger text-white shadow-sm hover:bg-[#9f1515] focus-visible:ring-danger/40",
  success:
    "bg-mint text-mint-ink hover:brightness-95 focus-visible:ring-mint-ink/30",
};

const sizes: Record<ButtonSize, string> = {
  sm: "gap-1.5 rounded-lg px-3 py-1.5 text-xs",
  md: "gap-2 rounded-lg px-4 py-2 text-sm",
  lg: "gap-2 rounded-xl px-5 py-2.5 text-sm",
  xl: "gap-2 rounded-xl px-4 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
