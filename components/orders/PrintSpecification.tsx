import { CheckCircle2, SlidersHorizontal } from "lucide-react";

import Badge from "@/components/ui/Badge";
import type { PrintSpec } from "@/types/orders";

interface PrintSpecificationProps {
  specs: PrintSpec[];
}

export default function PrintSpecification({
  specs,
}: PrintSpecificationProps) {
  return (
    <section className="dashboard-card flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex min-w-0 items-center gap-1">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D7E3FF] text-navy">
            <SlidersHorizontal size={14} />
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-bold leading-[22px] text-ink">
                Print Specification
              </h2>

              <Badge tone="info">Document 1</Badge>
            </div>

            <p className="text-xs leading-5 text-muted">
              Standard B&W Configuration
            </p>
          </div>
        </div>

        <Badge tone="neutral" size="md" className="text-muted">
          <CheckCircle2 size={12} className="text-brand-strong" />
          Verified Settings
        </Badge>
      </div>

      <div className="divide-y divide-stepper overflow-hidden rounded-xl bg-lilac">
        {specs.map((spec) => {
          const pageMatch =
            spec.label === "Pages"
              ? spec.value.match(/^(.*?)(\(.*\))$/)
              : null;

          const primaryValue = pageMatch
            ? pageMatch[1].trim()
            : spec.value;

          const secondaryValue = pageMatch ? pageMatch[2] : null;

          return (
            <div
              key={spec.label}
              className="flex items-center justify-between gap-4 px-4 py-[10px]"
            >
              <span className="text-sm font-medium leading-5 text-muted">
                {spec.label}
              </span>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="text-xs font-bold leading-4 text-ink">
                  {primaryValue}
                </span>

                {secondaryValue ? (
                  <span className="text-xs font-normal leading-5 text-[#757682]">
                    {secondaryValue}
                  </span>
                ) : null}

                {spec.hint ? (
                  <span className="rounded bg-info-soft px-2 py-0.5 text-xs font-semibold leading-5 text-brand-strong">
                    {spec.hint}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
