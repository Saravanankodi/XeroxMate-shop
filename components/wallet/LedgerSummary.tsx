import {
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

import { cn } from "@/lib/utils";

import WalletCard from "./WalletCard";

interface LedgerSummaryProps {
  visibleCount: number;
  totalCount: number;
  settledVolume: number;
  onExport: () => void;
  exportDisabled?: boolean;
}

export default function LedgerSummary({
  visibleCount,
  totalCount,
  settledVolume,
  onExport,
  exportDisabled = false,
}: LedgerSummaryProps) {
  return (
    <WalletCard className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-wrap items-center gap-2 text-xs leading-4 text-muted">
        <span>
          Showing {visibleCount} of {totalCount}{" "}
          transactions
        </span>
        <span className="text-[#C5C5D3]">•</span>
        <span>
          Settled Volume:{" "}
          <span className="font-semibold text-ink">
            ₹{settledVolume.toFixed(2)}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          disabled={exportDisabled}
          className={cn(
            "inline-flex h-[26px] items-center gap-1 rounded-xl bg-lilac px-4 font-heading text-xs font-semibold leading-[14px] text-ink transition hover:bg-lilac-soft",
            exportDisabled &&
              "pointer-events-none opacity-50"
          )}
        >
          <Download size={12} />
          Export CSV
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-lilac text-muted"
          >
            <ChevronLeft size={14} />
          </button>

          <span className="inline-flex h-[22px] min-w-[29px] items-center justify-center rounded-lg bg-navy px-2 text-[11px] font-bold leading-[14px] text-white">
            1
          </span>

          <button
            type="button"
            aria-label="Next page"
            disabled
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-lilac text-muted"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </WalletCard>
  );
}
