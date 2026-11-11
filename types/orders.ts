export type OrderStatus =
  | "New"
  | "In Progress/Spooling"
  | "Ready for Pickup"
  | "Completed"
  | "Rejected";

export interface OrderTab {
  id: OrderStatus;
  label: string;
  count: number;
}

export interface OrderDocument {
  fileName: string;
  kind: string;
  sheets: number;
  pages: number;
  size: string;
  specs: string[];
  unitPrice: number;
  lineTotal: number;
}

export interface QueueOrder {
  id: string;
  status: OrderStatus;
  placedAgo: string;
  mode: string;
  customer: string;
  customerName: string;
  phone: string;
  amount: number;
  unpaid?: boolean;
  document: OrderDocument;
}

export interface PrintSpec {
  label: string;
  value: string;
  hint?: string;
}

export interface WorkflowStage {
  title: string;
  time: string;
  state: "done" | "current" | "pending";
}

export interface FulfillmentStep {
  label: string;
  done: boolean;
}

export interface BillingLine {
  label: string;
  amount: number;
}

export interface OrderBilling {
  lines: BillingLine[];
  total: number;
  margin: number;
  marginBreakdown: string;
  paidInCash: boolean;
}

export interface CustomerProfile {
  name: string;
  initials: string;
  phone: string;
  address: string;
  passcode: string;
  ordersCompleted: number;
  pickupRate: string;
}

export interface OrderDetails {
  id: string;
  paidLabel: string;
  statusLabel: OrderStatus;
  placedAt: string;
  placedAgo: string;
  fastTrack: boolean;
  document: OrderDocument;
  specs: PrintSpec[];
  workflow: WorkflowStage[];
  actions: FulfillmentStep[];
  billing: OrderBilling;
  customer: CustomerProfile;
  bin: string;
}
