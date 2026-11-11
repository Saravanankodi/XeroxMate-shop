import { Clock } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import ProfileField from "./ProfileField";

export default function OperatingHoursCard() {
  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Clock}
        title="Operating Hours"
        subtitle="Set student counter timing for live dispatch"
        action={
          <Badge
            tone="success"
            className="gap-1.5 px-3 py-1 text-[11px] leading-[14px] text-[#00201D]"
          >
            <span className="h-2 w-2 rounded-full bg-[#00312C]" />
            Currently Open (09:00 - 23:00)
          </Badge>
        }
      />

      <div className="mt-4 rounded-lg bg-lilac/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading text-xs font-semibold leading-4 text-ink">
            Weekly Schedule
          </h3>
          <span className="text-[11px] font-medium leading-[14px] text-brand-strong">
            Mon – Sun · Same hours
          </span>
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Opening time"
            required
            icon={Clock}
            defaultValue="09:00 AM"
            hint="Morning order intake starts"
            className="bg-white"
          />
          <ProfileField
            label="Closing time"
            required
            icon={Clock}
            defaultValue="11:00 PM"
            hint="Machine shutdown & counter close"
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
}
