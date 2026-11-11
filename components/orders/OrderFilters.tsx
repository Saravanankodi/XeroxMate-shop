"use client";

import { useState } from "react";
import { Printer, Search, SlidersHorizontal } from "lucide-react";

import Button from "@/components/ui/Button";
import { ORDER_TABS } from "@/lib/orders";
import { cn } from "@/lib/utils";
import type { OrderStatus, OrderTab } from "@/types/orders";

interface OrderFiltersProps {
  tabs?: OrderTab[];
  activeStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  search: string;
  onSearchChange: (value: string) => void;
  unpaidOnly: boolean;
  onUnpaidOnlyChange: (value: boolean) => void;
}

export default function OrderFilters({
  tabs = ORDER_TABS,
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
  unpaidOnly,
  onUnpaidOnlyChange,
}: OrderFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="dashboard-card p-3 sm:p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1 xl:pb-0">
          {tabs.map((tab) => {
            const active = tab.id === activeStatus;

            return (
              <button
                key={tab.id}
                onClick={() => onStatusChange(tab.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition",
                  active
                    ? "bg-navy-deep text-white shadow-sm"
                    : "text-muted hover:bg-lilac"
                )}
              >
                {active ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                ) : null}

                {tab.label}

                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-4",
                    active
                      ? "bg-brand text-white"
                      : "bg-lilac-soft text-navy"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative min-w-0 flex-1 sm:flex-none">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search order ID, customer..."
              className="w-full rounded-lg border border-transparent bg-lilac py-2 pl-9 pr-3 text-xs text-ink outline-none transition placeholder:text-muted/70 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15 sm:w-56 lg:w-60"
            />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-lg bg-lilac px-3 py-2 text-xs font-semibold text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <Printer size={13} className="text-mint-ink" />
            Live Spool: ON
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
            className="shrink-0"
          >
            <SlidersHorizontal size={14} />
            Filters
          </Button>
        </div>
      </div>

      {filtersOpen ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg bg-lilac px-3 py-2.5">
          <span className="text-xs font-semibold text-muted">
            Quick filters
          </span>

          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink">
            <input
              type="checkbox"
              checked={unpaidOnly}
              onChange={(event) => onUnpaidOnlyChange(event.target.checked)}
              className="h-4 w-4 rounded border-line accent-brand"
            />
            Unpaid only
          </label>

          <button
            onClick={() => onUnpaidOnlyChange(false)}
            className="text-xs font-semibold text-brand-strong transition hover:text-brand"
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}
