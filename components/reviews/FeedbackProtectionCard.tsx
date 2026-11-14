import {
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import ReviewSurface from "./ReviewSurface";

export default function FeedbackProtectionCard() {
  return (
    <ReviewSurface className="flex min-h-[221px] flex-col gap-2 p-6">
      <div className="flex items-center gap-1">
        <ShieldCheck
          size={20}
          className="text-brand-strong"
        />
        <h2 className="font-heading text-base font-semibold leading-[22px] text-navy">
          Fair Feedback Protection
        </h2>
      </div>

      <p className="text-xs leading-5 text-muted">
        All reviews require an OTP verified counter pickup. If a
        student submits an inaccurate rating due to third-party
        file corruption or wrong upload parameters, you have a{" "}
        <span className="font-bold text-ink">
          48-hour mediation window
        </span>{" "}
        to request merchant mediator verification.
      </p>

      <button
        type="button"
        className="mt-auto inline-flex w-fit items-center gap-1 pt-2 font-heading text-[11px] font-semibold leading-[14px] text-brand-strong hover:underline"
      >
        Learn about Seller Reputation Rules
        <ChevronRight size={10} />
      </button>
    </ReviewSurface>
  );
}
