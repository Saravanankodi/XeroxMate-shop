import type { ReactNode } from "react";
import { Copy, Info, Landmark, ShieldCheck } from "lucide-react";

import CardHeader from "./CardHeader";

interface BankFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

function BankField({
  label,
  required,
  children,
}: BankFieldProps) {
  return (
    <div>
      <p className="mb-1.5 font-heading text-xs font-semibold leading-4 text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </p>
      <div className="flex h-11 items-center justify-between gap-2 rounded-lg bg-white px-3.5 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export default function BankingCard() {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Landmark}
        title="Banking & Payout Credentials"
        subtitle="Daily automated UPI & NEFT payout route"
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-icon-soft px-3 py-2 text-[11px] font-bold leading-[14px] text-[#001B3F]">
            <ShieldCheck
              size={14}
              className="text-brand-strong"
            />
            Verified by RazorpayX Penny Drop
          </span>
        }
      />

      <div className="mt-4 rounded-xl bg-lilac/60 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <BankField label="Account Number">
            <span className="truncate text-sm tracking-[0.7px] text-ink">
              500101013593009
            </span>
            <Copy size={13} className="shrink-0 text-muted" />
          </BankField>

          <BankField label="IFSC Code" required>
            <span className="text-sm text-navy">CIUB0000473</span>
            <ShieldCheck
              size={15}
              className="shrink-0 text-brand-strong"
            />
          </BankField>

          <BankField label="Branch" required>
            <span className="text-sm text-ink">Kabisthalam</span>
          </BankField>

          <BankField label="Bank Name">
            <span className="text-xs font-medium leading-5 text-ink">
              City Union Bank (CIUB)
            </span>
            <span className="rounded bg-info-soft px-2 py-0.5 text-[11px] font-bold leading-[14px] text-[#264191]">
              COMMERCIAL
            </span>
          </BankField>
        </div>

        <div className="mt-4 flex items-start gap-2">
          <Info
            size={13}
            className="mt-0.5 shrink-0 text-brand-strong"
          />
          <p className="text-[11px] font-semibold leading-[14px] text-muted">
            All daily store print revenues are credited to this account
            by 11:30 PM every night automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
