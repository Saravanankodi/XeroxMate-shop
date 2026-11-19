import type { InputHTMLAttributes } from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export default function Input({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-navy"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-lilac disabled:text-muted",
          error && "border-danger focus:border-danger focus:ring-danger/20",
          className
        )}
        {...props}
      />

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
