import { ReceiptText } from "lucide-react";

import WalletCard from "./WalletCard";

export default function SettlementStrip() {
  return (
    <WalletCard className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D7E3FF] text-brand-strong">
          <ReceiptText size={18} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h2 className="font-heading text-sm font-bold leading-5 text-navy">
              Instant IMPS / UPI Direct Settlement Pipeline
            </h2>

            <span className="inline-flex items-center rounded bg-info-soft px-1.5 text-[11px] font-semibold uppercase leading-5 text-navy">
              0% Merchant Commission
            </span>
          </div>

          <p className="mt-0.5 max-w-[638px] text-xs leading-4 text-muted">
            Campus customer print orders are settled on zero
            turnaround friction. Counter cash collected is
            automatically adjusted against monthly gateway balances.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-4">
        <div className="text-right">
          <p className="text-xs font-semibold leading-[14px] text-muted">
            Payout Cycle
          </p>
          <p className="mt-0.5 font-heading text-xs font-bold leading-4 text-brand-strong">
            T+0 Real-Time
          </p>
        </div>

        <span className="h-8 w-px bg-stepper" />

        <div className="text-right">
          <p className="text-xs font-semibold leading-[14px] text-muted">
            Gateway Fee
          </p>
          <p className="mt-0.5 font-heading text-xs font-bold leading-4 text-success">
            Waived (₹0.00)
          </p>
        </div>
      </div>
    </WalletCard>
  );
}
