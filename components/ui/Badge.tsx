import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BadgeTone =
  | "brand"
  | "info"
  | "success"
  | "danger"
  | "neutral"
  | "muted";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md";
  className?: string;
}

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand text-white",
  info: "bg-info-soft text-info-ink",
  success: "bg-mint text-mint-ink",
  danger: "bg-danger-soft text-danger-ink",
  neutral: "bg-lilac-soft text-ink",
  muted: "bg-[#eef0f8] text-muted",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs leading-[14px]",
  md: "px-2.5 py-1 text-xs leading-4",
};

export default function Badge({
  children,
  tone = "neutral",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
