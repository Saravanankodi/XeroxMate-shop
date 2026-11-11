import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
  muted?: boolean;
}

export default function PricingCard({
  muted,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#e2e7ff]/60 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        muted && "opacity-85",
        className
      )}
      {...props}
    />
  );
}
