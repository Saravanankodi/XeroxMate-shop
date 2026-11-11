import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition",
        checked ? "bg-brand-strong" : "bg-line"
      )}
    >
      <span
        className={cn(
          "h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

interface ToggleRowProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
  bold?: boolean;
}

export default function ToggleRow({
  title,
  description,
  checked,
  onChange,
  className,
  bold,
}: ToggleRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        className
      )}
    >
      <div className="min-w-0">
        <h3
          className={cn(
            "font-heading text-xs leading-4 text-ink",
            bold ? "font-bold" : "font-semibold"
          )}
        >
          {title}
        </h3>

        {description ? (
          <p className="mt-0.5 text-[11px] font-semibold leading-[14px] text-muted">
            {description}
          </p>
        ) : null}
      </div>

      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
