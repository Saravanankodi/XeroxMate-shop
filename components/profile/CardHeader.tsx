import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface CardHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  bordered?: boolean;
}

export default function CardHeader({
  icon: Icon,
  title,
  subtitle,
  badge,
  action,
  bordered,
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        bordered && "border-b border-[#e2e7ff]/60 pb-4"
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {Icon ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lilac text-navy">
            <Icon size={18} />
          </span>
        ) : null}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-base font-semibold leading-[22px] text-ink">
              {title}
            </h2>
            {badge}
          </div>

          {subtitle ? (
            <p className="mt-0.5 text-[11px] font-semibold leading-[14px] text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
