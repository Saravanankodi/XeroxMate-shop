import { cn } from "@/lib/utils";

import type { LedgerTabId } from "./types";

export interface LedgerTab {
  id: LedgerTabId;
  label: string;
  count?: number;
}

interface LedgerTabsProps {
  tabs: LedgerTab[];
  activeTab: LedgerTabId;
  onChange: (tab: LedgerTabId) => void;
}

export default function LedgerTabs({
  tabs,
  activeTab,
  onChange,
}: LedgerTabsProps) {
  return (
    <div className="flex min-w-max items-center gap-1 rounded-2xl bg-lilac p-1.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex h-8 items-center whitespace-nowrap rounded-xl px-4 text-xs font-semibold leading-4 transition",
              isActive
                ? "bg-navy text-white shadow-sm"
                : "bg-white text-muted hover:bg-lilac-soft"
            )}
          >
            {tab.label}

            {typeof tab.count === "number" ? (
              <span
                className={cn(
                  "ml-2 inline-flex min-w-[22px] items-center justify-center rounded-full px-2 text-[10px] font-semibold leading-4",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-lilac-soft text-muted"
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
