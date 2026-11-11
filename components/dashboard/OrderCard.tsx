"use client";

import { useState } from "react";
import {
  AlertCircle,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

export default function OrderCard() {
  const [status, setStatus] = useState("pending");

  return (
    <div className="dashboard-card flex flex-col gap-4 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] sm:px-6 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      {/* Order identity */}
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-[#fefcff] shadow-sm">
          <AlertCircle size={22} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffdad6] px-2 py-0.5 text-xs font-bold leading-[14px] text-[#93000a]">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />
              Action Required (4m ago)
            </span>

            <h3 className="font-heading text-lg font-bold leading-6 text-navy">
              #OMX-3547
            </h3>

            <span className="text-xs font-medium leading-[14px] text-muted">
              • Counter Pickup
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="flex items-center gap-1 font-heading font-semibold leading-4 text-ink">
              <User size={12} className="text-brand-strong" />
              THESTART (Saravanan K)
            </span>

            <span className="text-muted">•</span>

            <span className="flex items-center gap-1 leading-4 text-muted">
              <Phone size={12} className="text-[#757682]" />
              +91 90925 79460
            </span>
          </div>
        </div>
      </div>

      {/* Price + actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:flex-nowrap lg:justify-end lg:gap-6">
        <div className="w-full rounded-xl bg-lilac px-4 py-2 text-right sm:w-auto">
          <p className="font-heading text-[11px] font-semibold leading-[14px] text-muted">
            Order Total
          </p>

          <p className="font-heading text-3xl font-bold leading-[38px] tracking-tight text-navy">
            ₹1.54
          </p>

          <p className="flex items-center justify-end gap-1 text-xs font-medium leading-[14px] text-danger">
            <Info size={11} />
            Unpaid (Collect at Counter)
          </p>
        </div>

        {status === "pending" ? (
          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
            <button
              onClick={() => setStatus("accepted")}
              className="flex shrink-0 items-center gap-1 rounded-xl bg-brand px-4 py-2.5 font-heading text-base font-bold text-[#fefcff] shadow-sm transition hover:bg-blue-600"
            >
              <CheckCircle size={16} />
              Accept
            </button>

            <button
              onClick={() => setStatus("rejected")}
              className="flex items-center gap-1 rounded px-2 py-2 text-xs font-semibold text-danger transition hover:bg-red-50"
            >
              <XCircle size={13} />
              Reject Job
            </button>
          </div>
        ) : (
          <span
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
              status === "accepted"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status === "accepted"
              ? "Order Accepted"
              : "Order Rejected"}
          </span>
        )}
      </div>
    </div>
  );
}
