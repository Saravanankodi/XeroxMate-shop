"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Menu,
  Phone,
  Zap,
} from "lucide-react";

import Badge, { type BadgeTone } from "@/components/ui/Badge";
import { useMobileNav } from "@/components/layout/MobileNavContext";
import type { OrderDetails, OrderStatus } from "@/types/orders";

interface OrderDetailsHeaderProps {
  order: OrderDetails;
}

const statusTone: Record<OrderStatus, BadgeTone> = {
  New: "danger",
  "In Progress/Spooling": "info",
  "Ready for Pickup": "success",
  Completed: "neutral",
  Rejected: "danger",
};

export default function OrderDetailsHeader({
  order,
}: OrderDetailsHeaderProps) {
  const { openSidebar } = useMobileNav();

  return (
    <header className="dashboard-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={openSidebar}
            aria-label="Open navigation"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac text-navy transition hover:bg-lilac-soft lg:hidden"
          >
            <Menu size={20} />
          </button>

          <Link
            href="/orders"
            className="inline-flex items-center gap-1 rounded-lg px-1 py-1 text-xs font-semibold text-brand-strong transition hover:text-brand"
          >
            <ArrowLeft size={14} />
            Back to Orders
          </Link>
        </div>

        <a
          href={`tel:${order.customer.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
        >
          <Phone size={15} />
          <span className="hidden sm:inline">Contact Customer</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <h1 className="font-heading text-2xl font-semibold leading-tight text-navy sm:text-[32px] xl:text-[36px]">
          Order #{order.id}
        </h1>

        <Badge tone="info" size="md">
          {order.paidLabel}
        </Badge>

        <Badge tone={statusTone[order.statusLabel]} size="md">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {order.statusLabel}
        </Badge>
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted sm:text-sm">
        <CalendarDays size={14} />
        <span>
          Placed {order.placedAt} ({order.placedAgo})
        </span>

        {order.fastTrack ? (
          <>
            <span className="text-line">•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand-strong">
              <Zap size={13} />
              Fast Track Dispatch
            </span>
          </>
        ) : null}
      </p>
    </header>
  );
}
