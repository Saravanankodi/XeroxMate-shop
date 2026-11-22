import { Package } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import ProfileField from "./ProfileField";
import ToggleRow from "./ToggleRow";
import type { ProfileChangeHandler, ShopProfile } from "./types";

interface FulfillmentCardProps {
  value: ShopProfile;
  onChange: ProfileChangeHandler;
}

export default function FulfillmentCard({
  value,
  onChange,
}: FulfillmentCardProps) {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Package}
        title="Fulfillment"
        subtitle="Select at least one fulfillment method."
        badge={
          <Badge tone="danger" className="text-[11px] leading-3.5">
            Required for Setup
          </Badge>
        }
        bordered
      />

      <div className="mt-4">
        <ToggleRow
          title="Accept pickup orders"
          description="Customers collect from your counter."
          checked={value.fulfillment.pickup}
          onChange={() =>
            onChange("fulfillment", {
              ...value.fulfillment,
              pickup: !value.fulfillment.pickup,
            })
          }
          className="border-b border-[#e2e7ff]/60 pb-2"
        />

        <ToggleRow
          title="Delivery Options"
          description="Charge a fee or offer free delivery above a value."
          checked={value.fulfillment.delivery}
          onChange={() =>
            onChange("fulfillment", {
              ...value.fulfillment,
              delivery: !value.fulfillment.delivery,
            })
          }
          className="py-2"
        />
      </div>

      {/* <div className="mt-4 rounded-xl bg-lilac/60 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Delivery fee (₹)"
            name="deliveryFee"
            value={value.deliveryFee}
            onChange={(event) => onChange("deliveryFee", event.target.value)}
            className="bg-white"
          />
          <ProfileField
            label="Free above (₹)"
            name="freeAbove"
            value={value.freeAbove}
            onChange={(event) => onChange("freeAbove", event.target.value)}
            className="bg-white"
          />
        </div>

        <div className="mt-4 space-y-4">
          <ProfileField
            label="Delivery ETA"
            name="deliveryEta"
            value={value.deliveryEta}
            onChange={(event) => onChange("deliveryEta", event.target.value)}
            className="bg-white"
          />
          <ProfileField
            label="Delivery areas (comma separated)"
            name="deliveryAreas"
            value={value.deliveryAreas}
            onChange={(event) => onChange("deliveryAreas", event.target.value)}
            className="bg-white"
          />
        </div>
      </div> */}
    </section>
  );
}
