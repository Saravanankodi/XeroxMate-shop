import { Wallet, Download } from "lucide-react";
import Card from "../ui/Card";

export default function DailySettlement() {
  return (
    <Card className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-base font-semibold leading-[22px] text-ink">
          Daily Settlement
        </h3>

        <Wallet size={16} className="text-brand-strong" />
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm leading-5 text-muted">
          Today&apos;s Total GMV
        </p>

        <h2 className="font-heading text-lg font-bold leading-6 text-navy">
          ₹6.06
        </h2>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-lilac-soft">
        <div className="h-full w-[65%] rounded-full bg-navy" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold leading-[14px] text-muted">
          ₹4.52 Settled to HDFC **9201
        </span>

        <span className="text-xs font-semibold leading-[14px] text-success">
          74% online
        </span>
      </div>

      <button className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg bg-lilac py-2 font-heading text-xs font-semibold leading-4 text-navy transition hover:bg-lilac-soft">
        <Download size={12} />
        Download Day End Report (PDF)
      </button>
    </Card>
  );
}
