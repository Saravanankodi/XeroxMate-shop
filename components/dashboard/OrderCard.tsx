"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Info,
  Phone,
  User,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import type { OrderStatus, QueueOrder } from "@/types/orders";

interface OrderCardProps {
  order: QueueOrder;
  onAccept?: (order: QueueOrder) => void;
  onReject?: (order: QueueOrder) => void;
}

const statusLabels: Record<OrderStatus, string> = {
  New: "Action Required",
  "In Progress": "In Progress",
  "Ready for Pickup": "Ready for Pickup",
  Completed: "Completed",
  Rejected: "Rejected",
};

const statusTone: Record<OrderStatus, string> = {
  New: "bg-danger-soft text-danger-ink",
  "In Progress": "bg-info-soft text-info-ink",
  "Ready for Pickup": "bg-[#dcfce7] text-[#166534]",
  Completed: "bg-lilac text-brand-strong",
  Rejected: "bg-danger-soft text-danger-ink",
};

const iconTone: Record<OrderStatus, string> = {
  New: "bg-brand text-[#fefcff]",
  "In Progress": "bg-info-soft text-info-ink",
  "Ready for Pickup": "bg-[#dcfce7] text-[#166534]",
  Completed: "bg-lilac text-brand-strong",
  Rejected: "bg-danger-soft text-danger-ink",
};

const statusIcons: Record<OrderStatus, LucideIcon> = {
  New: AlertCircle,
  "In Progress": Info,
  "Ready for Pickup": CheckCircle,
  Completed: CheckCircle,
  Rejected: XCircle,
};

export default function OrderCard({
  order,
  onAccept,
  onReject,
}: OrderCardProps) {
  const [decision, setDecision] = useState<"idle" | "accepted" | "rejected">(
    "idle"
  );

  const isNew = order.status === "New";
  const showActions = isNew && decision === "idle";
  const StatusIcon = statusIcons[order.status];

  const badgeTone =
    decision === "accepted"
      ? "bg-[#dcfce7] text-[#166534]"
      : decision === "rejected"
        ? "bg-danger-soft text-danger-ink"
        : statusTone[order.status];

  const badgeLabel =
    decision === "accepted"
      ? "Accepted"
      : decision === "rejected"
        ? "Rejected"
        : statusLabels[order.status];

  return (
    <article className="dashboard-card flex flex-col gap-4 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:px-6 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      {/* Order identity */}
      <div className="flex min-w-0 items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm",
            iconTone[order.status]
          )}
        >
          <StatusIcon size={22} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-lg font-bold leading-6 text-navy">
              <Link
                href={`/orders/${order.id}`}
                className="transition hover:text-brand"
              >
                #{order.id}
              </Link>
            </h3>

            <span className="hidden sm:block text-xs font-medium leading-3.5 text-muted">
              • {order.mode}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold leading-3.5",
                badgeTone
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isNew || decision === "rejected" ? "bg-danger" : "bg-current"
                )}
              />
              {badgeLabel}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="flex items-center gap-1 text-[13px] tr font-heading font-semibold leading-4 text-ink">
              <User size={12} className="text-brand-strong" />
              {order.customerName}
            </span>

            <span className="text-muted">•</span>

            <span className="flex items-center gap-1 leading-4 text-muted">
              <Phone size={12} className="text-[#757682]" />
              {order.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Price + actions */}
      <div className="flex items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:flex-nowrap lg:justify-end lg:gap-6">
        <div className="w-full rounded-xl bg-lilac px-3 sm:px-4 py-2 text-right sm:w-auto">
          <p className="font-heading max-sm:text-center text-[11px] font-semibold leading-3.5 text-muted">
            Order Total
          </p>

          <p className="font-heading max-sm:text-center text-2xl sm:text-3xl font-bold leading-9.5 tracking-tight text-navy">
            {formatCurrency(order.amount)}
          </p>

          <p
            className={cn(
              "flex items-center max-sm:text-center sm:justify-end gap-1 text-[10px] sm:text-xs font-medium leading-3.5",
              order.unpaid ? "text-danger" : "text-mint-ink"
            )}
          >
            <Info size={11} className="hidden sm:block" />
            {order.unpaid ? "Unpaid (Collect at Counter)" : "Paid in Cash"}
          </p>
        </div>

        {showActions ? (
          <div className="flex w-full flex-col items-end gap-2 sm:w-auto">
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setDecision("rejected");
                  onReject?.(order);
                }}
                className="flex items-center gap-1 rounded px-2 py-2 text-sm font-semibold text-danger transition hover:bg-red-50"
              >
                <XCircle size={13} />
                Reject
              </button>
              <button
                onClick={() => {
                  setDecision("accepted");
                  onAccept?.(order);
                }}
                className="flex shrink-0 items-center gap-1 rounded-xl bg-brand px-4 py-2.5 font-heading text-sm font-bold text-[#fefcff] shadow-sm transition hover:bg-blue-600"
              >
                <CheckCircle size={16} />
                Accept
              </button>
            </div>
            <Link
              href={`/orders/${order.id}`}
              className="inline-flex w-full h-9 bg-surface text-center items-center justify-center gap-1 text-xs 2xl:text-sm rounded-md font-semibold text-brand-strong transition hover:text-brand"
            >
              View details
              <ArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
            {/* <span
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold",
                badgeTone
              )}
            >
              {resultLabel}
            </span> */}
            <Link
              href={`/orders/${order.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-strong transition hover:text-brand"
            >
              View details
              <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
