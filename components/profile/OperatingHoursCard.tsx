import { CalendarDays, Clock } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import { weekDays } from "./defaults";
import ProfileField from "./ProfileField";
import type { ProfileChangeHandler, ShopProfile, WeekDay } from "./types";

interface OperatingHoursCardProps {
  value: ShopProfile;
  onChange: ProfileChangeHandler;
}

interface DaySelectProps {
  label: string;
  name: "operatingDayFrom" | "operatingDayTo";
  value: WeekDay;
  hint: string;
  minDay?: WeekDay;
  onChange: (day: WeekDay) => void;
}

function DaySelect({
  label,
  name,
  value,
  hint,
  minDay,
  onChange,
}: DaySelectProps) {
  const minIndex = minDay ? weekDays.indexOf(minDay) : 0;

  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1.5 block font-heading text-xs 2xl:text-sm font-semibold leading-4 text-ink"
      >
        {label}
        <span className="text-danger"> *</span>
      </label>

      <div className="relative">
        <CalendarDays
          size={14}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <select
          id={name}
          name={name}
          required
          value={value}
          onChange={(event) => onChange(event.target.value as WeekDay)}
          className="h-11 w-full rounded-lg bg-white px-4 pl-10 text-sm text-ink shadow-sm outline-none transition focus:ring-2 focus:ring-brand/20"
        >
          {weekDays.map((day, index) => (
            <option key={day} value={day} disabled={index < minIndex}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-1 text-[11px] font-semibold leading-3.5 text-muted">
        {hint}
      </p>
    </div>
  );
}

export default function OperatingHoursCard({
  value,
  onChange,
}: OperatingHoursCardProps) {
  const fromIndex = Math.max(0, weekDays.indexOf(value.operatingDayFrom));
  const toIndex = Math.max(
    fromIndex,
    weekDays.indexOf(value.operatingDayTo)
  );
  const fromDay = weekDays[fromIndex];
  const toDay = weekDays[toIndex];

  return (
    <section className="dashboard-card p-6">
      <CardHeader
        icon={Clock}
        title="Operating Hours"
        subtitle="Set student counter timing for live dispatch"
        action={
          <Badge tone="success" className="gap-1.5 px-3 py-1 text-[11px] leading-3.5 text-[#00201D]">
            <span className="h-2 w-2 rounded-full bg-[#00312C]" />
            {fromDay.slice(0, 3)} – {toDay.slice(0, 3)} · Same hours
          </Badge>
        }
      />

      <div className="mt-4 rounded-lg bg-lilac/70 p-4">
        <h3 className="font-heading text-xs font-semibold leading-4 text-ink">
          Weekly Schedule
        </h3>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <DaySelect
            label="From day"
            name="operatingDayFrom"
            value={fromDay}
            hint="First day of the week"
            onChange={(day) => {
              onChange("operatingDayFrom", day);
              if (weekDays.indexOf(day) > weekDays.indexOf(value.operatingDayTo)) {
                onChange("operatingDayTo", day);
              }
            }}
          />
          <DaySelect
            label="To day"
            name="operatingDayTo"
            value={toDay}
            hint="Last day of the week"
            minDay={fromDay}
            onChange={(day) => onChange("operatingDayTo", day)}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ProfileField
            label="Opening time"
            required
            icon={Clock}
            name="openingTime"
            value={value.openingTime}
            onChange={(event) => onChange("openingTime", event.target.value)}
            hint="Morning order intake starts"
            className="bg-white"
          />
          <ProfileField
            label="Closing time"
            required
            icon={Clock}
            name="closingTime"
            value={value.closingTime}
            onChange={(event) => onChange("closingTime", event.target.value)}
            hint="Machine shutdown & counter close"
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
}
