"use client";

import { Menu, Power } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm lg:hidden"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-heading text-[22px] font-bold leading-8 tracking-tight text-navy sm:text-2xl sm:leading-9 xl:text-[30px] xl:leading-[38px]">
          Console Overview
        </h1>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-strong" />
          <span className="whitespace-nowrap text-[11px] font-bold leading-[14px] text-brand-strong">
            Real-time Feed
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <div className="flex items-center rounded-xl bg-white p-1 shadow-sm">
          <button className="flex items-center gap-2 rounded-lg bg-lilac-soft px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            <span className="text-xs font-semibold leading-4 text-navy">
              Accepting Online Orders
            </span>
          </button>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-danger px-4 py-2 shadow-sm transition hover:bg-[#9f1515]">
          <Power size={14} className="text-white" />
          <span className="font-heading text-xs font-medium leading-4 text-white">
            End Shift
          </span>
        </button>
      </div>
    </header>
  );
}
