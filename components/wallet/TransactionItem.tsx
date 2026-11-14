import Link from "next/link";
import {
  Banknote,
  ChevronRight,
  ReceiptText,
} from "lucide-react";

import { cn } from "@/lib/utils";

import WalletCard from "./WalletCard";
import type { WalletTransaction } from "./types";

interface TransactionItemProps {
  transaction: WalletTransaction;
}

const statusToneClasses = {
  verified: "bg-[#D7E3FF] text-[#001B3F]",
  completed: "bg-info-soft text-navy",
  auto: "bg-[#D7E3FF] text-[#001B3F]",
};

export default function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const Icon =
    transaction.kind === "payment"
      ? Banknote
      : ReceiptText;

  return (
    <WalletCard className="flex flex-col gap-4 p-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lilac",
            transaction.kind === "payment"
              ? "text-navy"
              : "text-brand-strong"
          )}
        >
          <Icon size={21} />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <h3 className="font-heading text-base font-bold leading-[22px] text-ink">
              {transaction.title}
            </h3>

            <span className="text-sm leading-5 text-[#C5C5D3]">
              •
            </span>

            <Link
              href={`/orders/${transaction.orderId}`}
              className="font-heading text-xs font-bold leading-4 text-brand-strong hover:underline"
            >
              Order {transaction.orderId}
            </Link>

            <span className="rounded-full bg-lilac-soft px-2 py-0.5 text-[11px] font-medium leading-[14px] text-muted">
              {transaction.method}
            </span>

            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-semibold leading-[14px]",
                statusToneClasses[transaction.statusTone]
              )}
            >
              {transaction.status}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs leading-4 text-muted">
            {transaction.customer ? (
              <>
                <span className="font-medium text-ink">
                  Customer: {transaction.customer}
                </span>
                <span className="text-[#C5C5D3]">•</span>
              </>
            ) : null}

            <span>{transaction.description}</span>
            <span className="text-[#C5C5D3]">•</span>
            <span>{transaction.date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <div className="text-right">
          <p className="font-heading text-lg font-bold leading-6 text-success">
            +₹{transaction.amount}
          </p>
          <p className="text-[11px] font-semibold leading-[14px] text-muted">
            Credited to Balance
          </p>
        </div>

        <button
          type="button"
          aria-label={`View transaction ${transaction.orderId}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lilac text-ink transition hover:bg-lilac-soft"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </WalletCard>
  );
}
