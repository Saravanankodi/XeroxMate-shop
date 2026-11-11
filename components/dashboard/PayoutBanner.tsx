import { Landmark, X } from "lucide-react";

export default function PayoutBanner() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-navy-deep p-4 text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:flex">
          <Landmark size={20} className="text-[#dce1ff]" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-semibold leading-[22px] text-white">
              Collect online payments automatically
            </h3>

            <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold uppercase leading-[14px] tracking-[0.275px] text-[#fefcff]">
              Razorpay Instant
            </span>
          </div>

          <p className="mt-0.5 max-w-[768px] break-words text-sm leading-5 text-[#dae2fd]">
            Link your merchant bank account or UPI VPA to receive direct
            settlement credits for every print job — zero daily manual
            reconciliations required.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 self-start sm:self-auto">
        <button className="rounded-lg bg-white px-4 py-2 font-heading text-sm font-semibold text-navy shadow-sm transition hover:bg-blue-50">
          Set up payouts
        </button>

        <button
          aria-label="Close banner"
          className="rounded-lg p-2 text-[#dae2fd] transition hover:bg-white/10"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
