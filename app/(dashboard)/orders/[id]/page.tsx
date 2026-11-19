import type { Metadata } from "next";

import BillingEarnings from "@/components/orders/BillingEarnings";
import CounterHandover from "@/components/orders/CounterHandover";
import CustomerDetails from "@/components/orders/CustomerDetails";
import DocumentPreview from "@/components/orders/DocumentPreview";
import FulfillmentActions from "@/components/orders/FulfillmentActions";
import OrderDetailsHeader from "@/components/orders/OrderDetailsHeader";
import PaymentCollection from "@/components/orders/PaymentCollection";
import PrintSpecification from "@/components/orders/PrintSpecification";
import ProductionWorkflow from "@/components/orders/ProductionWorkflow";
import { getOrderDetails, QUEUE_ORDERS } from "@/lib/orders";

export const instant = false;

export function generateStaticParams() {
  return QUEUE_ORDERS.map((order) => ({ id: order.id }));
}

export const metadata: Metadata = {
  title: "Order Details | Tamil Printers",
  description: "Review print specifications and fulfill an order.",
};

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;
  const order = getOrderDetails(id);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-2 p-2 sm:px-2 sm:py-3 xl:space-y-2.5 xl:py-3 2xl:px-5 2xl:py-4">
      <OrderDetailsHeader order={order} />

      <ProductionWorkflow stages={order.workflow} />

      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] 2xl:gap-6">
        <div className="space-y-4 sm:space-y-5">
          <DocumentPreview document={order.document} />

          <PrintSpecification specs={order.specs} />
        </div>

        <div className="space-y-4 sm:space-y-5">
          <FulfillmentActions steps={order.actions} bin={order.bin} />

          <CounterHandover
            customerName={order.customer.name}
            passcode={order.customer.passcode}
          />

          <BillingEarnings billing={order.billing} />

          <PaymentCollection amountDue={order.billing.total} />

          <CustomerDetails customer={order.customer} />
        </div>
      </div>
    </div>
  );
}
