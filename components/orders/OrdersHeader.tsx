"use client";

import { Menu, Printer } from "lucide-react";

import IconTile from "@/components/ui/IconTile";
import { useMobileNav } from "@/components/layout/MobileNavContext";

interface OrdersHeaderProps {
  title?: string;
}

export default function OrdersHeader({
  title = "Orders Details",
}: OrdersHeaderProps) {
  const { openSidebar } = useMobileNav();

  return (
    <header className="dashboard-card flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
      <button
        onClick={openSidebar}
        aria-label="Open navigation"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac text-navy transition hover:bg-lilac-soft lg:hidden"
      >
        <Menu size={20} />
      </button>

      <IconTile icon={Printer} size="lg" tone="info" />

      <div className="min-w-0">
        <h1 className="truncate font-heading text-2xl font-semibold leading-tight text-ink sm:text-[30px]">
          {title}
        </h1>
      </div>
    </header>
  );
}
