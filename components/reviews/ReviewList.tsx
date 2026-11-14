import { SearchX } from "lucide-react";

import ReviewCard from "./ReviewCard";
import ReviewSurface from "./ReviewSurface";
import type { CustomerReview } from "./types";

export default function ReviewList({
  reviews,
}: {
  reviews: CustomerReview[];
}) {
  if (reviews.length === 0) {
    return (
      <ReviewSurface className="flex min-h-[240px] flex-col items-center justify-center p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac text-brand-strong">
          <SearchX size={22} />
        </span>
        <h2 className="mt-3 font-heading text-base font-semibold text-ink">
          No reviews found
        </h2>
        <p className="mt-1 max-w-sm text-xs leading-4 text-muted">
          Try another search or choose a different star filter.
        </p>
      </ReviewSurface>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
