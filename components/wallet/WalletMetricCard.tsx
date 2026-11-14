import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import WalletCard from "./WalletCard";

interface WalletMetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  highlighted?: boolean;
  iconTone?: "navy" | "brand" | "success";
  meta?: ReactNode;
  footerLabel: string;
  footerValue: string;
  footerValueClassName?: string;
}

const iconToneClasses = {
  navy: "text-navy",
  brand: "text-brand-strong",
  success: "text-success",
};

export default function WalletMetricCard({
  label,
  value,
  icon: Icon,
  highlighted = false,
  iconTone = "navy",
  meta,
  footerLabel,
  footerValue,
  footerValueClassName,
}: WalletMetricCardProps) {
  return (
    <WalletCard
      className={cn(
        "relative flex min-h-49.5 flex-col justify-between overflow-hidden p-6",
        highlighted ? "bg-navy shadow-lg" :"bg-white "
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full",
          highlighted ? "bg-navy-deep/40 blur-xl" : "bg-lilac/70"
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "text-xs font-medium leading-4",
              highlighted ? "text-icon-soft" : "text-muted"
            )}
          >
            {label}
          </p>

          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              highlighted
                ? "bg-navy-deep text-white"
                : "bg-lilac"
            )}
          >
            <Icon
              size={18}
              className={
                highlighted
                  ? "text-white"
                  : iconToneClasses[iconTone]
              }
            />
          </span>
        </div>

        <div className="mt-4">
          <p
            className={cn(
              "font-heading text-4xl font-bold leading-[44px] tracking-[-0.9px]",
              highlighted ? "text-white" : "text-ink"
            )}
          >
            {value}
          </p>

          {meta ? <div className="mt-1">{meta}</div> : null}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between gap-2 text-[11px] font-semibold leading-[14px]">
        <span
          className={cn(
            highlighted ? "text-icon-soft" : "text-muted"
          )}
        >
          {footerLabel}
        </span>

        <span
          className={cn(
            "text-right",
            highlighted ? "text-white" : "text-ink",
            footerValueClassName
          )}
        >
          {footerValue}
        </span>
      </div>
    </WalletCard>
  );
}
