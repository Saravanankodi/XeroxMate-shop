import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import IconTile from "./IconTile";

interface SectionCardProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function SectionCard({
  icon,
  title,
  subtitle,
  badge,
  action,
  children,
  className,
  bodyClassName,
}: SectionCardProps) {
  return (
    <section className={cn("dashboard-card", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex min-w-0 items-start gap-3">
          {icon ? <IconTile icon={icon} size="sm" /> : null}

          <div className="min-w-0">
            <h2 className="font-heading text-base font-semibold leading-6 text-ink sm:text-[17px]">
              {title}
            </h2>

            {subtitle ? (
              <p className="mt-0.5 text-xs leading-4 text-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {badge || action ? (
          <div className="flex flex-wrap items-center gap-2">
            {badge}
            {action}
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "px-4 pb-4 pt-3 sm:px-5 sm:pb-5",
          bodyClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
