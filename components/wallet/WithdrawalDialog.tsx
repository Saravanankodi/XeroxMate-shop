"use client";

import { ArrowUpRight, Landmark, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button, Input } from "@/components/ui";

interface WithdrawalDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawalDialog({
  open,
  onClose,
}: WithdrawalDialogProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

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
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAmount("");
    setNote("");
    onClose();
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
        aria-labelledby="withdrawal-dialog-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac text-brand-strong">
              <ArrowUpRight size={20} />
            </span>
            <div>
              <h2
                id="withdrawal-dialog-title"
                className="font-heading text-lg font-bold text-navy"
              >
                Request Withdrawal
              </h2>
              <p className="mt-0.5 text-xs leading-5 text-muted">
                Move your available balance to your verified bank account.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close withdrawal dialog"
            className="rounded-lg p-1.5 text-muted transition hover:bg-lilac hover:text-navy"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-lilac/60 px-4 py-3">
            <span className="text-xs font-medium text-muted">
              Available balance
            </span>
            <span className="font-heading text-base font-bold text-navy">
              ₹4.52
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="withdrawal-amount"
                className="text-xs font-semibold text-navy"
              >
                Withdrawal amount (₹)
              </label>
              <button
                type="button"
                onClick={() => setAmount("4.52")}
                className="text-[11px] font-semibold text-brand-strong hover:underline"
              >
                Use full balance
              </button>
            </div>
            <Input
              id="withdrawal-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
            <p className="text-xs text-muted">Minimum withdrawal is ₹1.00.</p>
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-navy">
              Destination account
            </span>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5">
              <Landmark size={18} className="shrink-0 text-brand-strong" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-5 text-ink">
                  City Union Bank (CIUB) •••• 3009
                </p>
                <p className="text-xs text-muted">IFSC: CIUB0000123</p>
              </div>
              <ShieldCheck size={16} className="shrink-0 text-success" />
            </div>
          </div>

          <Input
            name="note"
            label="Note (optional)"
            placeholder="Add a reference for this withdrawal"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />

          <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <ArrowUpRight size={15} />
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
