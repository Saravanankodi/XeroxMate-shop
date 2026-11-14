import {
  ThumbsUp,
} from "lucide-react";

import ReviewStars from "./ReviewStars";
import ReviewSurface from "./ReviewSurface";

export default function RatingHero() {
  return (
    <ReviewSurface className="relative flex min-h-[257px] flex-col justify-between overflow-hidden bg-navy p-6">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-brand/20 blur-[20px]"
      />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase leading-[14px] tracking-[0.55px] text-icon-soft">
          Store Rating Score
        </p>

        <span className="inline-flex h-[18px] items-center rounded-full bg-brand px-2 text-xs font-bold leading-[14px] text-[#FEFCFF]">
          Top 1% Tier
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-8">
        <p className="font-heading text-[56px] font-bold leading-[56px] tracking-[-1.4px] text-white">
          5.0
        </p>

        <div>
          <ReviewStars
            rating={5}
            size={20}
            className="text-mint"
          />

          <p className="mt-1 text-xs font-semibold leading-[14px] text-icon-soft">
            Based on 2 verified student reviews
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between gap-4 rounded-xl bg-navy-deep/40 px-2 pb-2 pt-4">
        <div className="flex items-center gap-1">
          <ThumbsUp size={17} className="text-mint" />
          <span className="text-xs font-semibold leading-[14px] text-white">
            100% Recommended
          </span>
        </div>

        <span className="text-[11px] font-semibold leading-[14px] text-icon-soft">
          2 of 2 reviews
        </span>
      </div>
    </ReviewSurface>
  );
}
