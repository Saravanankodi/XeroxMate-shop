import { Package } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import ProfileField from "./ProfileField";
import ToggleRow from "./ToggleRow";
import type { FulfillmentOptions } from "./types";

interface FulfillmentCardProps {
  value: FulfillmentOptions;
  onChange: (value: FulfillmentOptions) => void;
}

export default function FulfillmentCard({
  value,
  onChange,
}: FulfillmentCardProps) {
  const toggle = (key: keyof FulfillmentOptions) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Package}
        title="Fulfillment"
        subtitle="Select at least one fulfillment method."
        badge={
          <Badge
            tone="danger"
            className="text-[11px] leading-[14px]"
          >
            Required for Setup
          </Badge>
        }
        bordered
      />

      <div className="mt-4">
        <ToggleRow
          title="Accept pickup orders"
          description="Customers collect from your counter."
          checked={value.pickup}
          onChange={() => toggle("pickup")}
          className="border-b border-[#e2e7ff]/60 pb-2"
        />

        <ToggleRow
          title="Delivery Options"
          description="Charge a fee or offer free delivery above a value."
          checked={value.delivery}
          onChange={() => toggle("delivery")}
          className="py-2"
        />
      </div>

      <div className="mt-4 rounded-xl bg-lilac/60 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Delivery fee (₹)"
            defaultValue="50"
            className="bg-white"
          />
          <ProfileField
            label="Free above (₹)"
            defaultValue="500"
            className="bg-white"
          />
        </div>

        <div className="mt-4 space-y-4">
          <ProfileField
            label="Delivery ETA"
            defaultValue="2 to 4 Hours"
            className="bg-white"
          />
          <ProfileField
            label="Delivery areas (comma separated)"
            defaultValue="Kumbakonam"
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
}
