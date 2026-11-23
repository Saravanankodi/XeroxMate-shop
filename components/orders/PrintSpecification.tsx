import type { PrintSpec } from "@/types/orders";

interface PrintSpecificationProps {
  specs: PrintSpec[];
}

export default function PrintSpecification({
  specs,
}: PrintSpecificationProps) {
  return (
    <div className="divide-y divide-stepper overflow-hidden rounded-xl bg-lilac">
      {specs.map((spec) => {
        const pageMatch =
          spec.label === "Pages"
            ? spec.value.match(/^(.*?)(\(.*\))$/)
            : null;

        const primaryValue = pageMatch ? pageMatch[1].trim() : spec.value;

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
  );
}
