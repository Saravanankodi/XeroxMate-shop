import { CreditCard, Info } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import ToggleRow from "./ToggleRow";
import type { PaymentOptions } from "./types";

interface PaymentOptionsCardProps {
  value: PaymentOptions;
  onChange: (value: PaymentOptions) => void;
}

export default function PaymentOptionsCard({
  value,
  onChange,
}: PaymentOptionsCardProps) {
  const toggle = (key: keyof PaymentOptions) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={CreditCard}
        title="Payment Options"
        subtitle="Select at least one payment method."
        badge={
          <Badge
            tone="danger"
            className="text-[11px] leading-[14px]"
          >
            Required for Setup
          </Badge>
        }
        bordered
      />

      <div>
        <ToggleRow
          title="Pay full amount online"
          checked={value.fullOnline}
          onChange={() => toggle("fullOnline")}
        />

        <ToggleRow
          title="Pay advance online"
          checked={value.advanceOnline}
          onChange={() => toggle("advanceOnline")}
          className="border-t border-[#e2e7ff]/60"
        />

        <ToggleRow
          title="Pay at pickup"
          bold
          checked={value.pickup}
          onChange={() => toggle("pickup")}
          className="border-t border-[#e2e7ff]/60"
        />

        <ToggleRow
          title="Cash on delivery"
          checked={value.cod}
          onChange={() => toggle("cod")}
          className="border-t border-[#e2e7ff]/60"
        />
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-lilac p-2">
        <Info
          size={15}
          className="mt-0.5 shrink-0 text-brand-strong"
        />
        <p className="text-[11px] font-semibold leading-[14px] text-muted">
          When “Pay advance online” is on, customers pay this percentage
          up front and the rest at the shop.
        </p>
      </div>

      <div className="mt-4">
        <label
          htmlFor="advance-percent"
          className="mb-1.5 block font-heading text-xs font-semibold leading-4 text-ink"
        >
          Advance amount (% of order total)
        </label>
        <input
          id="advance-percent"
          type="number"
          defaultValue={50}
          className="h-11 w-32 rounded-lg bg-lilac px-4 text-sm text-ink shadow-sm outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>
    </section>
  );
}
