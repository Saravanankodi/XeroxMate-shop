import {
  BadgeCheck,
  Star,
} from "lucide-react";

import { ratingBreakdown } from "./reviews-data";
import ReviewSurface from "./ReviewSurface";

export default function RatingDistribution() {
  return (
    <ReviewSurface className="flex min-h-[244px] flex-col gap-4 p-5 px-6 xl:self-start">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-base font-semibold leading-[22px] text-ink">
          Star Distribution
        </h2>

        <span className="text-xs font-semibold leading-[14px] text-brand-strong">
          Active Term 2026
        </span>
      </div>

      <div className="space-y-2">
        {ratingBreakdown.map((item) => (
          <div
            key={item.stars}
            className="flex items-center gap-2"
          >
            <span className="flex w-7 items-center gap-0.5 text-[11px] font-semibold leading-[14px] text-ink">
              {item.stars}
              <Star
                size={12}
                className="fill-brand-strong text-brand-strong"
              />
            </span>

            <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-lilac-soft">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-brand-strong"
                style={{ width: `${item.percentage}%` }}
              />
            </span>

            <span className="w-8 text-right text-[11px] font-semibold leading-[14px] text-ink">
              {item.count}
            </span>

            <span className="w-10 text-right text-[11px] leading-[14px] text-muted">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 text-xs leading-4 text-muted">
        <BadgeCheck
          size={14}
          className="shrink-0 text-brand-strong"
        />
        Reviews verified against scanned counter OTP checkouts.
      </div>
    </ReviewSurface>
  );
}
