import { Wallet } from "lucide-react";

import Badge from "@/components/ui/Badge";
import SectionCard from "@/components/ui/SectionCard";
import { formatCurrency } from "@/lib/utils";
import type { OrderBilling } from "@/types/orders";

interface BillingEarningsProps {
  billing: OrderBilling;
}

export default function BillingEarnings({
  billing,
}: BillingEarningsProps) {
  return (
    <SectionCard
      icon={Wallet}
      title="Billing & Earnings"
      badge={
        <Badge tone={billing.paidInCash ? "success" : "danger"}>
          {billing.paidInCash ? "Paid in Cash" : "Payment Pending"}
        </Badge>
      }
    >
      <div>
        {billing.lines.map((line) => (
          <div
            key={line.label}
            className="flex items-center justify-between gap-3 border-b border-line py-2 text-xs last:border-0"
          >
            <span className="text-muted">{line.label}</span>
            <span className="shrink-0 font-semibold text-ink">
              {formatCurrency(line.amount)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between gap-3 border-t border-line pt-3">
        <span className="text-sm font-semibold text-ink">
          Total Customer Amount
        </span>

        <span className="font-heading text-lg font-bold text-navy">
          {formatCurrency(billing.total)}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-lilac p-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">
            Shopkeeper Margin
          </p>
          <p className="text-[11px] text-muted">
            {billing.marginBreakdown}
          </p>
        </div>

        <span className="shrink-0 font-heading text-lg font-bold text-brand">
          {formatCurrency(billing.margin)} net
        </span>
      </div>
    </SectionCard>
  );
}
