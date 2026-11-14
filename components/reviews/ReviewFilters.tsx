"use client";

import {
  useEffect,
  useRef,
} from "react";
import {
  ArrowDownWideNarrow,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";

import ReviewSurface from "./ReviewSurface";
import type { RatingFilter } from "./types";

interface ReviewFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  ratingFilter: RatingFilter;
  onRatingChange: (value: RatingFilter) => void;
  totalReviews: number;
}

const ratingOptions: Array<{
  value: RatingFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: 5, label: "5 Star" },
  { value: 4, label: "4 Star" },
  { value: 3, label: "3 Star" },
  { value: 2, label: "2 Star" },
  { value: 1, label: "1 Star" },
];

export default function ReviewFilters({
  search,
  onSearchChange,
  ratingFilter,
  onRatingChange,
  totalReviews,
}: ReviewFiltersProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <ReviewSurface className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          ref={inputRef}
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by customer name, order ID, or keywords... (e.g. spiral, OMX-10022)"
          aria-label="Search reviews"
          className="h-9 w-full rounded-xl bg-lilac pl-11 pr-16 text-[11px] leading-[13px] text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/25"
        />

        <span className="pointer-events-none absolute right-3.5 top-1/2 hidden h-[18px] -translate-y-1/2 items-center rounded bg-white px-1.5 text-[10px] font-semibold text-muted shadow-sm sm:inline-flex">
          ⌘K
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <div className="flex items-center rounded-xl bg-lilac p-1">
          {ratingOptions.map((option) => {
            const active = option.value === ratingFilter;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onRatingChange(option.value)}
                className={cn(
                  "h-[26px] whitespace-nowrap rounded-lg px-2 text-[11px] leading-[14px] transition",
                  active
                    ? "bg-white font-semibold text-navy shadow-sm"
                    : "font-medium text-muted hover:bg-white/60"
                )}
              >
                {option.value === "all"
                  ? `${option.label} (${totalReviews})`
                  : option.label}
              </button>
            );
          })}
        </div>

        <span className="mx-1 h-6 w-px bg-lilac-soft" />

        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-lilac px-4 text-xs font-medium leading-4 text-ink transition hover:bg-lilac-soft"
        >
          <ArrowDownWideNarrow
            size={14}
            className="text-ink"
          />
          Newest First
        </button>

        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-lilac px-4 text-xs font-medium leading-4 text-ink transition hover:bg-lilac-soft"
        >
          <SlidersHorizontal
            size={15}
            className="text-brand-strong"
          />
          Filters & Tags
        </button>
      </div>
    </ReviewSurface>
  );
}
