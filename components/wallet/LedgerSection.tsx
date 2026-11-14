"use client";

import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";

import LedgerControls from "./LedgerControls";
import type { LedgerTab } from "./LedgerTabs";
import LedgerSummary from "./LedgerSummary";
import TransactionItem from "./TransactionItem";
import type {
  LedgerTabId,
  WalletTransaction,
} from "./types";

interface LedgerSectionProps {
  transactions: WalletTransaction[];
}

const tabs: LedgerTab[] = [
  {
    id: "transactions",
    label: "Transactions",
    count: 4,
  },
  {
    id: "withdrawals",
    label: "Withdrawals",
    count: 0,
  },
  {
    id: "cycles",
    label: "Daily Cycles & Logs",
  },
  {
    id: "tax",
    label: "TDS & GST Invoices",
  },
];

function LedgerEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac text-brand-strong">
        <Wallet size={22} />
      </span>
      <h3 className="mt-3 font-heading text-base font-bold text-ink">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-xs leading-4 text-muted">
        {description}
      </p>
    </div>
  );
}

export default function LedgerSection({
  transactions,
}: LedgerSectionProps) {
  const [activeTab, setActiveTab] =
    useState<LedgerTabId>("transactions");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredTransactions = useMemo(() => {
    if (!query) {
      return transactions;
    }

    return transactions.filter((transaction) =>
      [
        transaction.orderId,
        transaction.customer ?? "",
        transaction.description,
        transaction.title,
        transaction.method,
        transaction.status,
      ].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [query, transactions]);

  const visibleTransactions =
    activeTab === "transactions"
      ? filteredTransactions
      : [];

  const settledVolume = visibleTransactions.reduce(
    (total, transaction) =>
      total + Number(transaction.amount),
    0
  );

  const exportTransactions = () => {
    const headers = [
      "Order ID",
      "Type",
      "Method",
      "Status",
      "Customer",
      "Description",
      "Date",
      "Amount",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.orderId,
      transaction.title,
      transaction.method,
      transaction.status,
      transaction.customer ?? "",
      transaction.description,
      transaction.date,
      transaction.amount,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wallet-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const activeTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label ??
    "activity";

  return (
    <section className="space-y-4">
      <LedgerControls
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />

      {activeTab === "transactions" ? (
        visibleTransactions.length > 0 ? (
          <>
            <div className="space-y-2">
              {visibleTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>

            <LedgerSummary
              visibleCount={visibleTransactions.length}
              totalCount={transactions.length}
              settledVolume={settledVolume}
              onExport={exportTransactions}
            />
          </>
        ) : (
          <LedgerEmptyState
            title="No matching transactions"
            description="Try another order ID, customer name, or transaction description."
          />
        )
      ) : (
        <LedgerEmptyState
          title={`No ${activeTabLabel.toLowerCase()} yet`}
          description="This ledger view will populate automatically once activity is available."
        />
      )}
    </section>
  );
}
