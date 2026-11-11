import { MapPin } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import GridPattern from "./GridPattern";
import ProfileField from "./ProfileField";

export default function ShopAddressCard() {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={MapPin}
        title="Shop Address"
        subtitle="Students and courier delivery executives will navigate to this GPS location"
        badge={
          <Badge
            tone="danger"
            className="text-[11px] leading-[14px]"
          >
            Required for Setup
          </Badge>
        }
      />

      <div className="mt-4 space-y-4">
        <ProfileField
          label="Address Line 1"
          required
          icon={MapPin}
          defaultValue="No.4 Bismi Nagar"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Area"
            required
            defaultValue="Baburajapuram"
          />
          <ProfileField
            label="City"
            required
            defaultValue="Kumbakonam"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <ProfileField
            label="State"
            required
            defaultValue="Tamil Nadu"
          />
          <ProfileField
            label="Pin code"
            required
            defaultValue="612302"
          />
          <ProfileField
            label="Country"
            required
            defaultValue="India"
          />
        </div>

        <div className="pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold leading-[14px] text-muted">
              <MapPin size={13} className="text-brand-strong" />
              GPS Geofence Match (99.8% precision)
            </span>

            <button
              type="button"
              className="text-[11px] font-medium leading-[14px] text-brand-strong"
            >
              Re-pin on Map
            </button>
          </div>

          <div className="relative mt-2 h-32 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#dce1ff,#f2f3ff)] shadow-sm">
            <GridPattern />

            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-md">
              <MapPin size={18} />
            </div>

            <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold leading-[14px] text-ink shadow-sm backdrop-blur">
              <MapPin size={12} className="text-brand-strong" />
              Kumbakonam, Tamil Nadu · 612302
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
