"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input, { type InputProps } from "./Input";

export default function PasswordInput({
  disabled,
  ...props
}: Omit<InputProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      disabled={disabled}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className="rounded-md p-1 text-muted transition hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      }
    />
  );
}
