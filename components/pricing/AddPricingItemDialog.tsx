"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button, Input } from "@/components/ui";

interface AddPricingItemDialogProps<TUnit extends string> {
  title: string;
  description: string;
  nameLabel: string;
  namePlaceholder: string;
  unitOptions?: readonly TUnit[];
  onSubmit: (name: string, unit?: TUnit) => void;
  onClose: () => void;
}

export default function AddPricingItemDialog<TUnit extends string = string>({
  title,
  description,
  nameLabel,
  namePlaceholder,
  unitOptions,
  onSubmit,
  onClose,
}: AddPricingItemDialogProps<TUnit>) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<TUnit | "">(unitOptions?.[0] ?? "");
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      return;
    }

    onSubmit(trimmed, unitOptions?.length ? (unit as TUnit) : undefined);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac text-brand-strong">
              <Plus size={20} />
            </span>
            <div>
              <h2
                id={titleId}
                className="font-heading text-lg font-bold text-navy"
              >
                {title}
              </h2>
              <p className="mt-0.5 text-xs leading-5 text-muted">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted transition hover:bg-lilac hover:text-navy"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Input
            label={nameLabel}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={namePlaceholder}
            autoComplete="off"
            required
          />

          {unitOptions?.length ? (
            <div className="space-y-1.5">
              <label
                htmlFor={`${titleId}-unit`}
                className="block text-xs font-semibold text-navy"
              >
                Charged per
              </label>
              <select
                id={`${titleId}-unit`}
                value={unit}
                onChange={(event) => setUnit(event.target.value as TUnit)}
                className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus size={15} />
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
