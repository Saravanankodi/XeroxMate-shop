"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import OrderCard from "./OrderCard";

const tabs = [
  "All Orders (2)",
  "New (1)",
  "Ready for Pickup (1)",
];

export default function LiveOrders() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section>
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-lg font-bold leading-6 text-navy">
            Live Orders
          </h2>

          <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold leading-[14px] text-[#fefcff]">
            2 orders active
          </span>
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex max-w-full flex-wrap items-center gap-1 rounded-xl bg-lilac p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-semibold leading-4 transition ${
                  activeTab === tab
                    ? "bg-white text-navy shadow-sm"
                    : "font-medium text-muted hover:bg-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium leading-4 text-brand-strong transition hover:bg-lilac">
            View all archive
            <ArrowRight size={11} />
          </button>
        </div>
      </Card>

      <div className="mt-4">
        {activeTab === "New (1)" ||
        activeTab === "All Orders (2)" ? (
          <OrderCard />
        ) : (
          <Card className="p-6 text-center text-xs text-muted">
            No orders to display in this category.
          </Card>
        )}
      </div>
    </section>
  );
}
