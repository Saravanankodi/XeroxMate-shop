import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type IconTileTone =
  | "info"
  | "brand"
  | "navy"
  | "mint"
  | "danger"
  | "primary";
type IconTileSize = "sm" | "md" | "lg";

interface IconTileProps {
  icon: LucideIcon;
  tone?: IconTileTone;
  size?: IconTileSize;
  className?: string;
}

const tones: Record<IconTileTone, string> = {
  info: "bg-icon-soft text-navy",
  brand: "bg-brand/10 text-brand-strong",
  navy: "bg-navy text-white",
  mint: "bg-mint text-mint-ink",
  danger: "bg-danger-soft text-danger-ink",
  primary: "bg-brand text-white",
};

const sizes: Record<IconTileSize, string> = {
  sm: "h-9 w-9 rounded-lg [&_svg]:h-4 [&_svg]:w-4",
  md: "h-10 w-10 rounded-lg [&_svg]:h-5 [&_svg]:w-5",
  lg: "h-12 w-12 rounded-xl [&_svg]:h-6 [&_svg]:w-6",
};

export default function IconTile({
  icon: Icon,
  tone = "info",
  size = "md",
  className,
}: IconTileProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        tones[tone],
        sizes[size],
        className
      )}
    >
      <Icon />
    </span>
  );
}
