import {
  Download,
  QrCode,
} from "lucide-react";

import CounterQr from "./CounterQr";
import ReviewSurface from "./ReviewSurface";

export default function CounterQrCard() {
  return (
    <ReviewSurface className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <QrCode size={20} />
        </span>

        <div>
          <h2 className="font-heading text-base font-semibold leading-[22px] text-ink">
            Counter Review Poster
          </h2>
          <p className="text-xs font-semibold leading-[14px] text-muted">
            Boost student feedback rate
          </p>
        </div>
      </div>

      <div className="flex h-[228px] flex-col items-center justify-center gap-2 rounded-xl bg-lilac p-4">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <CounterQr className="h-32 w-32" />
        </div>

        <div className="text-center">
          <p className="font-heading text-sm font-semibold leading-5 text-ink">
            Tamil Printers • Madurai West
          </p>
          <p className="text-xs leading-4 text-muted">
            xeroxmate.store/r/tamil-printers
          </p>
        </div>
      </div>

      <p className="text-xs leading-4 text-muted">
        Shops displaying our table-top standee collect 4.2x
        more reviews per semester. Students scan directly via
        Google Lens or XeroxMate.
      </p>

      <button
        type="button"
        className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-xl bg-navy px-4 font-heading text-xs font-semibold leading-4 text-white shadow-sm transition hover:bg-navy-deep"
      >
        <Download size={15} />
        Download Counter Poster (PDF)
      </button>
    </ReviewSurface>
  );
}
