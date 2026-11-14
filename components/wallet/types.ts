export type WalletTransactionKind =
  | "payment"
  | "settlement";

export type WalletTransactionStatus =
  | "verified"
  | "completed"
  | "auto";

export interface WalletTransaction {
  id: string;
  kind: WalletTransactionKind;
  title: string;
  orderId: string;
  method: string;
  status: string;
  statusTone: WalletTransactionStatus;
  customer?: string;
  description: string;
  date: string;
  amount: string;
}

export type LedgerTabId =
  | "transactions"
  | "withdrawals"
  | "cycles"
  | "tax";
