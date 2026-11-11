"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";

import IconTile from "@/components/ui/IconTile";
import { QUEUE_ORDERS } from "@/lib/orders";
import type { OrderStatus } from "@/types/orders";

import OrderFilters from "@/components/orders/OrderFilters";
import OrderListCard from "@/components/orders/OrderListCard";
import OrdersHeader from "@/components/orders/OrdersHeader";

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
    <div className="mx-auto w-full max-w-[1280px] space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5 xl:space-y-6 xl:py-4 2xl:px-8 2xl:py-6">
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
            <OrderListCard key={order.id} order={order} />
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
