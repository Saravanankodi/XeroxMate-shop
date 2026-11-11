import { cn } from "@/lib/utils";

interface PricingToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function PricingToggle({
  checked,
  onChange,
  label,
}: PricingToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition",
        checked ? "bg-brand-strong" : "bg-stepper"
      )}
    >
      <span
        className={cn(
          "h-5 w-5 rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
