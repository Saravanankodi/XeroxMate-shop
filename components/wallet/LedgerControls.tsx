import {
  CalendarDays,
  ListFilter,
  Search,
} from "lucide-react";

import LedgerTabs, { type LedgerTab } from "./LedgerTabs";
import type { LedgerTabId } from "./types";

interface LedgerControlsProps {
  tabs: LedgerTab[];
  activeTab: LedgerTabId;
  onTabChange: (tab: LedgerTabId) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function LedgerControls({
  tabs,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: LedgerControlsProps) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="overflow-x-auto pb-1 xl:pb-0">
        <LedgerTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={onTabChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-white px-2.5 text-[11px] font-semibold leading-[14px] text-ink shadow-sm transition hover:bg-lilac"
        >
          <CalendarDays
            size={12}
            className="text-muted"
          />
          Last 7 Days (Oct 07 - Oct 13)
        </button>

        <div className="relative w-full sm:w-60">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search Order ID or Customer..."
            aria-label="Search transactions"
            className="h-8 w-full rounded-xl bg-white pl-9 pr-4 text-xs leading-5 text-ink shadow-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <button
          type="button"
          aria-label="Filter transactions"
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-muted shadow-sm transition hover:bg-lilac"
        >
          <ListFilter size={14} />
        </button>
      </div>
    </div>
  );
}
