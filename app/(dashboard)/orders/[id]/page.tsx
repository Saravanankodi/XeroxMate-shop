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
    <div className="mx-auto w-full max-w-[1360px] space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5 xl:space-y-6 xl:py-6 2xl:px-8">
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
