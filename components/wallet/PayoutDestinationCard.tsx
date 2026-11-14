import {
  BadgeCheck,
  Landmark,
  Settings2,
} from "lucide-react";

import WalletCard from "./WalletCard";

export default function PayoutDestinationCard() {
  return (
    <WalletCard className="flex flex-col gap-6 p-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D7E3FF] text-navy">
          <Landmark size={27} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h2 className="font-heading text-lg font-bold leading-6 text-ink">
              City Union Bank (CIUB)
            </h2>

            <span className="inline-flex items-center gap-1 rounded-full bg-info-soft px-2 py-0.5 text-xs font-semibold leading-[14px] text-navy">
              <BadgeCheck
                size={12}
                className="text-success"
              />
              KYC & Penny Drop Verified
            </span>
          </div>

          <div className="mt-1 space-y-0.5">
            <p className="flex flex-wrap items-center gap-x-2 text-sm leading-5 text-ink">
              <span className="font-semibold">
                •••• 3009
              </span>
              <span className="text-[#C5C5D3]">•</span>
              <span className="font-semibold">
                CIUB••••
              </span>
              <span className="text-[#C5C5D3]">•</span>
              <span className="text-muted">IFSC:</span>
              <span className="font-medium">
                CIUB0000123
              </span>
            </p>

            <p className="text-sm leading-5 text-muted">
              Holder: Tamil Printers / Saravanan
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-xl bg-lilac px-4 font-heading text-xs font-semibold leading-4 text-ink transition hover:bg-lilac-soft"
        >
          Add Backup UPI
        </button>

        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-navy px-4 font-heading text-xs font-semibold leading-4 text-white transition hover:bg-navy-deep"
        >
          <Settings2 size={12} />
          Manage Account
        </button>
      </div>
    </WalletCard>
  );
}
