import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProfileFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  hint?: string;
  trailing?: ReactNode;
  required?: boolean;
}

export default function ProfileField({
  label,
  icon: Icon,
  hint,
  trailing,
  required,
  className,
  id,
  ...props
}: ProfileFieldProps) {
  const inputId =
    id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-w-0">
      <label
        htmlFor={inputId}
        className="mb-1.5 block font-heading text-xs font-semibold leading-4 text-ink"
      >
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>

      <div className="relative">
        {Icon ? (
          <Icon
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
        ) : null}

        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-lg bg-lilac px-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-muted/60 focus:ring-2 focus:ring-brand/20",
            Icon && "pl-10",
            trailing ? "pr-10" : undefined,
            className
          )}
          {...props}
        />

        {trailing ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p className="mt-1 text-[11px] font-semibold leading-[14px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
