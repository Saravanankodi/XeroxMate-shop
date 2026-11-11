import { Eye, Percent, Save } from "lucide-react";

import PricingCard from "./PricingCard";

interface PricingHeaderProps {
  onSave: () => void;
}

export default function PricingHeader({
  onSave,
}: PricingHeaderProps) {
  return (
    <PricingCard className="p-6">
      <div className="space-y-4 flex items-center justify-between">
        <div className="space-y-3">
          <h1 className="font-heading text-[26px] font-bold leading-[34px] tracking-[-0.75px] text-navy sm:text-[30px] sm:leading-[38px]">
            Print Services & Pricing Engine
          </h1>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lilac-soft px-3 py-1 text-xs font-semibold leading-[14px] text-navy">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-brand opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-brand-strong" />
            </span>
            Real-time Sync Active
          </span>
          <p className="max-w-[498px] text-sm font-normal leading-[23px] text-muted">
            Configure paper inventory, single/duplex sheet rates, color
            halftones, and post-print finishing. Changes sync in real-time
            (&lt; 2s) with student web & mobile apps.
          </p>
        </div>

        

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-lilac px-3.5 font-heading text-sm font-semibold leading-5 text-ink shadow-sm transition hover:bg-lilac-soft"
          >
            <Percent size={14} className="text-brand-strong" />
            Bulk Markup (%)
          </button>

          {/* <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-lilac px-3.5 font-heading text-sm font-semibold leading-5 text-ink shadow-sm transition hover:bg-lilac-soft"
          >
            <Eye size={14} className="text-muted" />
            Customer App View
          </button> */}

          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-navy px-5 font-heading text-sm font-semibold leading-5 text-white shadow-md transition hover:bg-navy/90"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </PricingCard>
  );
}
