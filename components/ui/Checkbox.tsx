import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export default function Checkbox({
  label,
  id,
  name,
  className,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? name;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex cursor-pointer items-start gap-2.5 text-sm text-muted",
        className
      )}
    >
      <input
        id={checkboxId}
        name={name}
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand accent-brand focus:ring-2 focus:ring-brand/20"
        {...props}
      />
      <span className="leading-5">{label}</span>
    </label>
  );
}
