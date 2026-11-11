import { cn } from "@/lib/utils";

interface PriceInputProps {
  label: string;
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  muted?: boolean;
  align?: "left" | "right";
  className?: string;
}

export default function PriceInput({
  label,
  ariaLabel,
  value,
  onChange,
  muted,
  align = "left",
  className,
}: PriceInputProps) {
  return (
    <div className={cn("w-28 shrink-0", className)}>
      <label
        htmlFor={ariaLabel}
        className={cn(
          "mb-1 block font-sans text-xs font-semibold uppercase leading-5 tracking-[0.55px]",
          align === "right" ? "text-right" : "text-left",
          muted ? "text-[#757682]" : "text-muted"
        )}
      >
        {label}
      </label>

      <div className="relative">
        <span
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-sans text-sm font-semibold leading-5",
            muted ? "text-[#757682]" : "text-muted"
          )}
        >
          ₹
        </span>

        <input
          id={ariaLabel}
          type="text"
          inputMode="decimal"
          value={value}
          aria-label={ariaLabel}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-10 w-full rounded-xl bg-lilac py-2 pl-7 pr-3 font-heading text-base font-bold leading-[22px] outline-none transition focus:ring-2 focus:ring-brand/20",
            muted ? "text-muted" : "text-ink"
          )}
        />
      </div>
    </div>
  );
}
