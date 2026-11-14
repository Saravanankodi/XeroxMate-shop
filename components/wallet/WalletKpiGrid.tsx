import {
  Check,
  CheckCircle2,
  Clock,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

import WalletMetricCard from "./WalletMetricCard";

export default function WalletKpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <WalletMetricCard
        label="Total Earned"
        value="₹4.52"
        icon={TrendingUp}
        footerLabel="Last 7 Days"
        footerValue="4 orders"
        meta={
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold leading-[14px] text-brand-strong">
              <TrendingUp size={12} />
              +12.4%
            </span>
            <span className="text-xs leading-4 text-muted">
              vs previous week
            </span>
          </div>
        }
      />

      <WalletMetricCard
        label="Pending Requests"
        value="₹0.00"
        icon={Clock}
        iconTone="brand"
        footerLabel="Next automated batch"
        footerValue="In ~4h 15m"
        footerValueClassName="text-brand-strong"
        meta={
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-info-soft px-2 py-0.5 text-xs font-semibold leading-[14px] text-muted">
              All cleared
            </span>
            <span className="text-xs leading-4 text-muted">
              0 in-flight
            </span>
          </div>
        }
      />

      <WalletMetricCard
        label="Available Balance"
        value="₹4.52"
        icon={Wallet}
        highlighted
        footerLabel="Min Withdrawal"
        footerValue="₹1.00 (No lockin)"
        footerValueClassName="text-white"
        meta={
          <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold leading-[14px] text-[#FEFCFF]">
            <Zap size={10} />
            Instant Payout Ready
          </span>
        }
      />

      <WalletMetricCard
        label="Orders Credited"
        value="3 Orders"
        icon={CheckCircle2}
        iconTone="success"
        footerLabel="Average Ticket Size"
        footerValue="₹1.50 / order"
        meta={
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-semibold leading-[14px] text-success">
              <Check size={11} />
              100% Settled
            </span>
            <span className="text-xs leading-4 text-muted">
              • 0 disputed
            </span>
          </div>
        }
      />
    </div>
  );
}
