import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import IconTile from "./IconTile";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-xl border border-line bg-white/70 p-4 backdrop-blur-sm",
        className
      )}
    >
      <IconTile icon={icon} tone="brand" size="sm" />

      <div className="space-y-1">
        <h3 className="font-heading text-sm font-bold leading-5 text-navy">
          {title}
        </h3>
        <p className="text-xs leading-5 text-muted">{description}</p>
      </div>
    </div>
  );
}
