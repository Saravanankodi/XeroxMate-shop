import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  trailing?: ReactNode;
}

export default function Input({
  label,
  hint,
  error,
  id,
  className,
  trailing,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  const input = (
    <input
      id={inputId}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      className={cn(
        "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-lilac disabled:text-muted",
        error && "border-danger focus:border-danger focus:ring-danger/20",
        trailing ? "pr-11" : undefined,
        className
      )}
      {...props}
    />
  );

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

      {trailing ? (
        <div className="relative">
          {input}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {trailing}
          </div>
        </div>
      ) : (
        input
      )}

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
