import {
  ArrowUpRight,
  Download,
} from "lucide-react";

export default function WalletHeader() {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="max-w-[502px]">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-[28px] font-bold leading-[34px] tracking-[-0.9px] text-ink sm:text-4xl sm:leading-[44px]">
            Wallet & Settlements
          </h1>

          <span className="inline-flex items-center rounded-full bg-[#D7E3FF] px-2.5 py-0.5 text-xs font-bold leading-[14px] tracking-[-0.9px] text-[#001B3F]">
            Live Payout Node
          </span>
        </div>

        <p className="mt-1.5 text-sm leading-5 text-muted">
          Track your real-time earnings, manage destination bank
          accounts, inspect micro-transaction audits, and withdraw
          your available balance instantly.
        </p>
      </div>

      <div className="flex w-full shrink-0 flex-col gap-2 xl:w-[419px]">
        <div className="flex flex-wrap items-center gap-2 xl:justify-between">
          <span className="inline-flex h-[26px] items-center gap-1 rounded-xl bg-lilac px-2 py-1.5 text-xs font-semibold leading-[14px] text-ink">
            <span className="h-2 w-2 rounded-full bg-[#6BD8CB]" />
            Auto-Sweep: 11:30 PM Daily
          </span>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-white px-4 font-heading text-sm font-semibold leading-[14px] text-ink shadow-sm transition hover:bg-lilac"
          >
            <Download size={14} className="text-brand-strong" />
            Download Report
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-fit items-center gap-1 rounded-xl bg-brand px-4 font-heading text-base font-semibold leading-4 text-white shadow-md transition hover:bg-brand-strong"
        >
          <ArrowUpRight size={14} />
          Request Withdrawal
        </button>
      </div>
    </header>
  );
}
