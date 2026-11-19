import { CheckCircle2, TrendingUp, Info } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsCards() {
  return (
    <div className="grid gap-2 sm:gap-4 grid-cols-2 xl:grid-cols-4 2xl:gap-6 mb-6">
      <StatCard
        title="New requests"
        value="1"
        icon="refresh"
        iconClassName="bg-[#e2e7ff] text-brand-strong"
        valueClassName="text-ink"
        valueFont="display"
        footer={
          <span className="flex items-center gap-1.5 text-xs font-semibold leading-3.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#757682]" />
            Arrived 4 mins ago
          </span>
        }
      />

      <StatCard
        title="Active orders"
        value="2"
        icon="file"
        iconClassName="bg-brand-strong/10 text-brand-strong"
        valueClassName="text-navy"
        valueFont="heading"
        footer={
          <span className="flex items-center gap-1.5 text-xs font-semibold leading-3.5 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-strong" />
            1 pending customer pickup
          </span>
        }
      />

      <StatCard
        title="Collected"
        value="₹4.52"
        icon="rupee"
        iconClassName="bg-lilac text-success"
        valueClassName="text-navy"
        valueFont="heading"
        footer={
          <>
            <span className="text-xs font-semibold leading-3.5 text-muted">
              Via UPI Auto-Collect
            </span>
            <span className="text-xs font-semibold leading-3.5 text-navy">
              3 receipts
            </span>
          </>
        }
      />

      <StatCard
        title="Balance pending"
        value="₹1.54"
        icon="trend"
        iconClassName="bg-[#e2e7ff] text-brand-strong"
        valueClassName="text-danger"
        valueFont="heading"
        footer={
          <span className="flex items-center gap-1.5 text-xs font-semibold leading-3.5 text-danger">
            <Info size={11} />
            Cash on pickup
          </span>
        }
      />
    </div>
  );
}
