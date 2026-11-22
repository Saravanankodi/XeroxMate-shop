import { MapPin } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import GridPattern from "./GridPattern";
import ProfileField from "./ProfileField";
import type { ProfileChangeHandler, ShopProfile } from "./types";

interface ShopAddressCardProps {
  value: ShopProfile;
  onChange: ProfileChangeHandler;
}

export default function ShopAddressCard({
  value,
  onChange,
}: ShopAddressCardProps) {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={MapPin}
        title="Shop Address"
        subtitle="Students and courier delivery executives will navigate to this GPS location"
        badge={
          <Badge tone="danger" className="text-[11px] leading-3.5">
            Required for Setup
          </Badge>
        }
      />

      <div className="mt-4 space-y-4">
        <ProfileField
          label="Address Line 1"
          required
          icon={MapPin}
          name="addressLine1"
          value={value.addressLine1}
          onChange={(event) => onChange("addressLine1", event.target.value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Area"
            required
            name="area"
            value={value.area}
            onChange={(event) => onChange("area", event.target.value)}
          />
          <ProfileField
            label="City"
            required
            name="city"
            value={value.city}
            onChange={(event) => onChange("city", event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <ProfileField
            label="State"
            required
            name="state"
            value={value.state}
            onChange={(event) => onChange("state", event.target.value)}
          />
          <ProfileField
            label="Pin code"
            required
            name="pinCode"
            value={value.pinCode}
            onChange={(event) => onChange("pinCode", event.target.value)}
          />
          <ProfileField
            label="Country"
            required
            name="country"
            value={value.country}
            onChange={(event) => onChange("country", event.target.value)}
          />
        </div>

        <div className="pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold leading-3.5 text-muted">
              <MapPin size={13} className="text-brand-strong" />
              Shop location on XeroxMate
            </span>
          </div>

          <div className="relative mt-2 h-32 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#dce1ff,#f2f3ff)] shadow-sm">
            <GridPattern />

            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-md">
              <MapPin size={18} />
            </div>

            <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold leading-3.5 text-ink shadow-sm backdrop-blur">
              <MapPin size={12} className="text-brand-strong" />
              {[value.area, value.city, value.pinCode].filter(Boolean).join(", ") ||
                "Add your shop address"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
