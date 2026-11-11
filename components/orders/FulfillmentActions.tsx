"use client";

import { useState } from "react";
import { Check, ListChecks } from "lucide-react";

import Badge from "@/components/ui/Badge";
import SectionCard from "@/components/ui/SectionCard";
import { cn } from "@/lib/utils";
import type { FulfillmentStep } from "@/types/orders";

interface FulfillmentActionsProps {
  steps: FulfillmentStep[];
  bin: string;
}

export default function FulfillmentActions({
  steps,
  bin,
}: FulfillmentActionsProps) {
  const [completed, setCompleted] = useState(
    steps.map((step) => step.done)
  );

  return (
    <SectionCard
      icon={ListChecks}
      title="Fulfillment Actions"
      badge={<Badge tone="info">Bin #{bin}</Badge>}
    >
      <div className="space-y-1.5">
        {steps.map((step, index) => {
          const done = completed[index];

          return (
            <label
              key={step.label}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition",
                done ? "bg-lilac" : "bg-lilac/60 hover:bg-lilac"
              )}
            >
              <span className="flex items-center gap-2 text-xs font-medium text-muted">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-navy">
                  {index + 1}
                </span>
                {step.label}
              </span>

              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={done}
                  aria-label={step.label}
                  onChange={(event) => {
                    const next = event.target.checked;

                    setCompleted((previous) =>
                      previous.map((value, position) =>
                        position === index ? next : value
                      )
                    );
                  }}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#c9cde3] bg-white transition checked:border-brand checked:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                />

                <Check
                  size={12}
                  className="pointer-events-none absolute text-white opacity-0 transition peer-checked:opacity-100"
                />
              </span>
            </label>
          );
        })}
      </div>
    </SectionCard>
  );
}
