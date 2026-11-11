"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  FileImage,
  FileText,
  Phone,
  Printer,
  User,
  XCircle,
} from "lucide-react";

import Badge, { type BadgeTone } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import IconTile from "@/components/ui/IconTile";
import { cn, formatCurrency } from "@/lib/utils";
import type { OrderStatus, QueueOrder } from "@/types/orders";

interface OrderListCardProps {
  order: QueueOrder;
  onAccept?: (order: QueueOrder) => void;
  onReject?: (order: QueueOrder) => void;
}

const statusTone: Record<OrderStatus, BadgeTone> = {
  New: "danger",
  "In Progress/Spooling": "info",
  "Ready for Pickup": "success",
  Completed: "neutral",
  Rejected: "danger",
};

const statusLabel: Record<OrderStatus, string> = {
  New: "Action Required",
  "In Progress/Spooling": "In Progress · Spooling",
  "Ready for Pickup": "Ready for Pickup",
  Completed: "Completed",
  Rejected: "Rejected",
};

export default function OrderListCard({
  order,
  onAccept,
  onReject,
}: OrderListCardProps) {
  const [decision, setDecision] = useState<
    "idle" | "accepted" | "rejected"
  >("idle");

  const DocIcon = order.document.kind.includes("PDF")
    ? FileText
    : FileImage;

  const isNew = order.status === "New";
  const showReviewActions = isNew && decision === "idle";

  return (
    <article className="rounded-xl bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:p-6">
      {/* Order identity + payment state */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex min-w-0 items-center gap-4">
          <IconTile icon={AlertCircle} size="lg" tone="primary" />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <Badge tone={statusTone[order.status]}>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isNew ? "bg-danger" : "bg-current"
                  )}
                />
                {statusLabel[order.status]}
                {isNew ? ` (${order.placedAgo})` : ""}
              </Badge>

              <Link
                href={`/orders/${order.id}`}
                className="font-heading text-lg font-bold leading-6 text-navy transition hover:text-brand"
              >
                #{order.id}
              </Link>

              <span className="text-xs font-medium leading-[14px] text-muted">
                • {order.mode}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-4">
              <span className="flex items-center gap-1 font-heading font-semibold text-ink">
                <User size={11} className="text-brand-strong" />
                {order.customer}
              </span>

              <span className="text-muted">·</span>

              <span className="flex items-center gap-1 text-muted">
                <Phone size={12} className="text-[#757682]" />
                {order.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 rounded-xl bg-lilac px-4 py-2 text-left sm:w-auto sm:min-w-[206px] sm:text-right">
          <p className="font-heading text-xs font-semibold leading-[14px] text-muted">
            Order Total
          </p>

          <p className="font-heading text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-navy">
            {formatCurrency(order.amount)}
          </p>

          <p
            className={cn(
              "flex items-center gap-1 text-xs font-medium leading-[14px] sm:justify-end",
              order.unpaid ? "text-danger" : "text-mint-ink"
            )}
          >
            <AlertCircle size={12} />
            {order.unpaid ? "Unpaid (Collect at Counter)" : "Paid in Cash"}
          </p>
        </div>
      </div>

      {/* Document specifications + action controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl bg-lilac p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-[45px] w-10 shrink-0 items-center justify-center rounded-lg bg-stepper text-brand-strong">
              <DocIcon size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate font-heading text-base font-semibold leading-[22px] text-ink">
                {order.document.fileName}
              </p>

              <div className="mt-1 flex flex-wrap gap-1">
                {order.document.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded bg-white px-2 py-0.5 text-xs font-medium leading-[14px] text-ink"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 text-left sm:text-right">
            <p className="font-heading text-base font-bold leading-4 text-ink">
              {formatCurrency(order.document.lineTotal)}
            </p>

            <p className="text-xs font-semibold leading-[14px] text-muted">
              ({formatCurrency(order.document.unitPrice)} ×{" "}
              {order.document.pages}{" "}
              {order.document.pages === 1 ? "pg" : "pgs"})
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 rounded-xl bg-white p-2 lg:w-[341px]">
          {showReviewActions ? (
            <>
              <Button
                size="xl"
                fullWidth
                className="font-heading font-bold leading-5 text-[#fefcff]"
                onClick={() => {
                  setDecision("accepted");
                  onAccept?.(order);
                }}
              >
                <Printer size={17} />
                Accept & Send to Spooler
              </Button>

              <div className="flex items-center justify-end px-2 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-heading leading-[14px] text-danger hover:bg-danger-soft"
                  onClick={() => {
                    setDecision("rejected");
                    onReject?.(order);
                  }}
                >
                  <XCircle size={13} />
                  Reject Job
                </Button>
              </div>
            </>
          ) : isNew && decision !== "idle" ? (
            <>
              <Badge
                tone={decision === "accepted" ? "success" : "danger"}
                size="md"
                className="justify-center px-3 py-2"
              >
                {decision === "accepted"
                  ? "Accepted · Sent to Spooler"
                  : "Job Rejected"}
              </Badge>

              <div className="flex items-center justify-end px-2 pt-1">
                <Link
                  href={`/orders/${order.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-strong transition hover:text-brand"
                >
                  View Order Details
                  <ArrowRight size={13} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href={`/orders/${order.id}`}
                className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-bold text-white shadow-sm transition hover:bg-brand-strong"
              >
                View Order Details
                <ArrowRight size={15} />
              </Link>

              <p className="px-2 text-center text-[11px] text-muted">
                Open the production console
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
