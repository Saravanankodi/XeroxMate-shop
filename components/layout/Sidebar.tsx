"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Printer,
  PrinterCheck,
  SlidersHorizontal,
  Star,
  Store,
  Wallet,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Orders", icon: ClipboardList, href: "/orders", count: 5 },
  {
    name: "Wallet & Settlements",
    icon: Wallet,
    href: "#wallet",
  },
  {
    name: "Print Services & Pricing",
    icon: Printer,
    href: "/pricing",
  },
  {
    name: "Customer Reviews",
    icon: Star,
    href: "#reviews",
  },
  {
    name: "Shop Profile & Hours",
    icon: Store,
    href: "/profile",
  },
  {
    name: "Settings",
    icon: SlidersHorizontal,
    href: "#settings",
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:h-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute right-3 top-3 rounded-lg p-1.5 text-muted transition hover:bg-lilac lg:hidden"
        >
          <X size={18} />
        </button>

        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain py-4">
          <div className="flex items-center gap-2 px-6 pb-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
              <PrinterCheck size={17} />
            </div>

            <div className="flex min-w-0 flex-col">
              <h2 className="truncate font-heading text-lg font-semibold leading-6 tracking-tight text-navy">
                Tamil Printers
              </h2>
              <p className="text-[11px] font-semibold leading-[14px] text-brand-strong">
                Merchant Partner
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 px-2 pt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.href !== "#" &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-4 py-2 text-left transition",
                    active
                      ? "bg-navy-deep text-white"
                      : "text-muted hover:bg-lilac"
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "shrink-0",
                      active ? "text-white" : "text-muted"
                    )}
                  />

                  <span className="min-w-0 flex-1 truncate text-base font-semibold leading-5">
                    {item.name}
                  </span>

                  {item.count ? (
                    <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold leading-[14px] text-white">
                      {item.count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-1 px-2 pt-8">
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-base font-semibold leading-5 text-brand-strong transition hover:bg-lilac"
            >
              <ExternalLink size={16} className="shrink-0" />
              <span className="truncate">Customer App Switch</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-base font-semibold leading-5 text-danger transition hover:bg-red-50"
            >
              <LogOut size={16} className="shrink-0" />
              <span className="truncate">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
