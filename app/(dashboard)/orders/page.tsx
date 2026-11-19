"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";

import IconTile from "@/components/ui/IconTile";
import { QUEUE_ORDERS } from "@/lib/orders";
import type { OrderStatus } from "@/types/orders";

import OrderFilters from "@/components/orders/OrderFilters";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderCard from "@/components/dashboard/OrderCard";

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>("New");
  const [search, setSearch] = useState("");
  const [unpaidOnly, setUnpaidOnly] = useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return QUEUE_ORDERS.filter((order) => {
      if (order.status !== activeStatus) return false;
      if (unpaidOnly && !order.unpaid) return false;
      if (!query) return true;

      return [
        order.id,
        order.customer,
        order.phone,
        order.document.fileName,
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [activeStatus, search, unpaidOnly]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-2 p-2 sm:px-2 sm:py-3 xl:space-y-2.5 xl:py-3 2xl:px-5 2xl:py-4">
      <OrdersHeader />

      <OrderFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        search={search}
        onSearchChange={setSearch}
        unpaidOnly={unpaidOnly}
        onUnpaidOnlyChange={setUnpaidOnly}
      />

      {filteredOrders.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <IconTile icon={Inbox} size="lg" tone="brand" />

          <div>
            <p className="font-heading text-lg font-semibold text-ink">
              No orders in this queue
            </p>
            <p className="mt-1 text-sm text-muted">
              Try another status, clear the search, or reset the filters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
