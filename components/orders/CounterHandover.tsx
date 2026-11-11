"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface CounterHandoverProps {
  customerName: string;
  passcode: string;
}

export default function CounterHandover({
  customerName,
  passcode,
}: CounterHandoverProps) {
  const [otp, setOtp] = useState(passcode);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const firstName = customerName.split(" ")[0];

  const verifyOtp = () => {
    if (!/^\d{4}$/.test(otp)) {
      setError("Enter a valid 4-digit pickup code.");
      return;
    }

    if (otp !== passcode) {
      setError("That code does not match this order.");
      return;
    }

    setError("");
    setVerified(true);
  };

  return (
    <section className="flex w-full flex-col gap-2 rounded-xl bg-lilac-soft p-2">
      <div className="flex h-4 items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <ShieldCheck
            size={12}
            className="h-[15px] w-3 shrink-0 text-brand-strong"
          />

          <h2 className="whitespace-nowrap font-sans text-xs font-bold leading-4 text-ink">
            Counter Handover
          </h2>
        </div>

        <p
          className={cn(
            "truncate text-right text-[11px] font-semibold leading-[14px]",
            error ? "text-danger" : "text-muted"
          )}
          title={error || undefined}
        >
          {error || "Customer OTP Required"}
        </p>
      </div>

      <div
        className={cn(
          "flex h-16 items-center justify-between gap-3 rounded-lg bg-white p-2 transition",
          verified && "bg-mint/30",
          error && "ring-1 ring-danger"
        )}
      >
        <div className="w-[90px] shrink-0">
          <p className="whitespace-nowrap text-[10px] font-normal leading-5 text-[#757682]">
            VERIFICATION CODE
          </p>

          <input
            value={otp}
            maxLength={4}
            inputMode="numeric"
            disabled={verified}
            aria-label="Verification code"
            onChange={(event) => {
              setOtp(event.target.value.replace(/\D/g, ""));
              setError("");
            }}
            className="h-7 w-full bg-transparent font-heading text-[22px] font-bold leading-7 tracking-[2.2px] text-navy outline-none disabled:opacity-70"
          />
        </div>

        <button
          type="button"
          disabled={verified}
          onClick={() => {
            setOtp(passcode);
            setError("");
          }}
          className="flex h-[22px] shrink-0 items-center justify-center rounded bg-info-soft px-3 py-1 text-xs font-semibold leading-[14px] text-navy transition hover:bg-icon-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          Auto Fill
        </button>
      </div>

      <button
        type="button"
        onClick={verifyOtp}
        disabled={verified}
        className={cn(
          "flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-heading text-sm font-bold leading-5 transition disabled:cursor-not-allowed disabled:opacity-80",
          verified
            ? "bg-mint text-mint-ink"
            : "bg-brand text-[#fefcff] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-brand-strong"
        )}
      >
        <Check size={14} className="shrink-0" />
        {verified
          ? "Verified & Handed Over"
          : `Verify & Hand Over to ${firstName}`}
      </button>
    </section>
  );
}
