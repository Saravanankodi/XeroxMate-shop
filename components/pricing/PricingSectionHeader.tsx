import type { LucideIcon } from "lucide-react";

import PricingCard from "./PricingCard";

interface PricingSectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  activeCount: number;
  totalCount: number;
}

export default function PricingSectionHeader({
  icon: Icon,
  title,
  subtitle,
  activeCount,
  totalCount,
}: PricingSectionHeaderProps) {
  return (
    <PricingCard className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon
              size={18}
              className="shrink-0 text-brand-strong"
            />
            <h2 className="font-heading text-lg font-bold leading-6 text-ink">
              {title}
            </h2>
          </div>

          <p className="mt-0.5 text-xs font-medium leading-4 text-muted">
            {subtitle}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center rounded-full bg-lilac px-3 py-1 text-xs font-semibold leading-[14px] text-navy">
          {activeCount} of {totalCount} active
        </span>
      </div>
    </PricingCard>
  );
}
