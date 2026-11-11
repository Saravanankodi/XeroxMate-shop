"use client";

import { useState } from "react";
import {
  Banknote,
  CreditCard,
  IndianRupee,
  Smartphone,
  Wallet,
} from "lucide-react";

import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { cn } from "@/lib/utils";

type PaymentMethod = "cash" | "upi" | "card";

interface PaymentCollectionProps {
  amountDue?: number;
  onSubmit?: (data: {
    amount: number;
    method: PaymentMethod;
  }) => void;
}

export default function PaymentCollection({
  amountDue = 1.54,
  onSubmit,
}: PaymentCollectionProps) {
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [amount, setAmount] = useState("");

  const paymentMethods = [
    { id: "cash" as const, label: "Cash", icon: Banknote },
    { id: "upi" as const, label: "UPI", icon: Smartphone },
    { id: "card" as const, label: "Card", icon: CreditCard },
  ];

  const handleSubmit = () => {
    const value = Number(amount);

    if (!amount || !Number.isFinite(value) || value <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onSubmit?.({
      amount: value,
      method,
    });
  };

  return (
    <SectionCard
      icon={Wallet}
      title="Payment Collection"
      subtitle={`Collect ₹${amountDue.toFixed(2)} from the customer at pickup.`}
    >
      <div className="space-y-2.5">
        <p className="text-xs font-medium text-muted">Collected via</p>

        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map(({ id, label, icon: Icon }) => {
            const active = method === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                aria-pressed={active}
                className={cn(
                  "flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs font-semibold transition",
                  active
                    ? "border-brand bg-brand text-white shadow-sm"
                    : "border-line bg-white text-muted hover:bg-lilac"
                )}
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-3 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
          <IndianRupee size={14} className="shrink-0 text-muted" />

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
            className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/70"
            aria-label="Payment amount"
          />
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          className="font-heading font-bold"
        >
          <IndianRupee size={16} strokeWidth={2.5} />
          Submit Payment
        </Button>
      </div>
    </SectionCard>
  );
}
