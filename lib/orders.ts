import { formatCurrency, getInitials } from "@/lib/utils";
import type {
  OrderDetails,
  OrderDocument,
  OrderDocumentDetail,
  OrderStatus,
  OrderTab,
  PrintSpec,
  QueueOrder,
  WorkflowStage,
} from "@/types/orders";

export const ORDER_TABS: OrderTab[] = [
  { id: "New", label: "New", count: 1 },
  {
    id: "In Progress",
    label: "In Progress",
    count: 1,
  },
  { id: "Ready for Pickup", label: "Ready for Pickup", count: 1 },
  { id: "Completed", label: "Completed", count: 24 },
  { id: "Rejected", label: "Rejected", count: 2 },
];

const newOrderDocument: OrderDocument = {
  id: "doc-1",
  fileName: "SaravananK(UIUX).pdf",
  kind: "PDF",
  sheets: 1,
  pages: 2,
  size: "1.2 MB",
  specs: ["1 Copy", "2 Pages", "B&W Laser", "Single-Sided", "A4"],
  unitPrice: 0.77,
  lineTotal: 1.54,
};

export const QUEUE_ORDERS: QueueOrder[] = [
  {
    id: "OMX-3547",
    status: "New",
    placedAgo: "4m ago",
    mode: "Counter Pickup",
    customer: "THESTART (Saravanan K)",
    customerName: "Saravanan K",
    phone: "+91 90925 79460",
    amount: 1.54,
    unpaid: true,
    document: newOrderDocument,
  },
  {
    id: "OMX-3347",
    status: "New",
    placedAgo: "4m ago",
    mode: "Counter Pickup",
    customer: "THESTART (Saravanan K)",
    customerName: "Saravanan K",
    phone: "+91 90925 79460",
    amount: 1.54,
    unpaid: true,
    document: newOrderDocument,
  },
  {
    id: "OMX-3548",
    status: "New",
    placedAgo: "4m ago",
    mode: "Counter Pickup",
    customer: "THESTART (Saravanan K)",
    customerName: "Saravanan K",
    phone: "+91 90925 79460",
    amount: 1.54,
    unpaid: true,
    document: newOrderDocument,
  },
  {
    id: "OMX-3549",
    status: "New",
    placedAgo: "4m ago",
    mode: "Counter Pickup",
    customer: "THESTART (Saravanan K)",
    customerName: "Saravanan K",
    phone: "+91 90925 79460",
    amount: 1.54,
    unpaid: true,
    document: newOrderDocument,
  },
  {
    id: "OMX-3546",
    status: "In Progress",
    placedAgo: "18m ago",
    mode: "Counter Pickup",
    customer: "Ravi Kumar",
    customerName: "Ravi Kumar",
    phone: "+91 98765 43210",
    amount: 3.2,
    document: {
      id: "doc-1",
      fileName: "Maths-Unit3.pdf",
      kind: "PDF",
      sheets: 4,
      pages: 4,
      size: "2.4 MB",
      specs: ["1 Copy", "4 Pages", "B&W Laser", "Single-Sided", "A4"],
      unitPrice: 0.8,
      lineTotal: 3.2,
    },
  },
  {
    id: "OMX-2839",
    status: "Ready for Pickup",
    placedAgo: "2 days ago",
    mode: "Counter Pickup",
    customer: "Akash K",
    customerName: "Akash K",
    phone: "+91 8525913433",
    amount: 0.77,
    document: {
      id: "doc-1",
      fileName: "Screenshot_2026-10-11",
      kind: "JPG / IMAGE",
      sheets: 1,
      pages: 1,
      size: "0.8 MB",
      specs: ["1 Copy", "1 Page", "B&W Laser", "Single-Sided", "A4"],
      unitPrice: 0.75,
      lineTotal: 0.77,
    },
  },
  {
    id: "OMX-2801",
    status: "Completed",
    placedAgo: "3 days ago",
    mode: "Counter Pickup",
    customer: "Priya S",
    customerName: "Priya S",
    phone: "+91 90000 12345",
    amount: 12,
    document: {
      id: "doc-1",
      fileName: "Project-Report.pdf",
      kind: "PDF",
      sheets: 15,
      pages: 15,
      size: "6.1 MB",
      specs: ["1 Copy", "15 Pages", "B&W Laser", "Double-Sided", "A4"],
      unitPrice: 0.8,
      lineTotal: 12,
    },
  },
  {
    id: "OMX-2798",
    status: "Rejected",
    placedAgo: "4 days ago",
    mode: "Counter Pickup",
    customer: "Vignesh R",
    customerName: "Vignesh R",
    phone: "+91 91234 56789",
    amount: 4.5,
    document: {
      id: "doc-1",
      fileName: "Flyer-Draft.png",
      kind: "PNG / IMAGE",
      sheets: 3,
      pages: 3,
      size: "3.2 MB",
      specs: ["1 Copy", "3 Pages", "Colour", "Single-Sided", "A4"],
      unitPrice: 1.5,
      lineTotal: 4.5,
    },
  },
];

const workflowTemplate = [
  { title: "Accepted", time: "11/10, 6:01 pm" },
  { title: "Printing", time: "11/10, 6:03 pm" },
  { title: "Finishing", time: "11/10, 6:04 pm" },
  { title: "Ready for Pickup", time: "11/10, 6:06 pm" },
  { title: "Handed Over", time: "Pending OTP" },
];

const currentStageByStatus: Record<OrderStatus, number> = {
  New: 0,
  "In Progress": 2,
  "Ready for Pickup": 4,
  Completed: 5,
  Rejected: 0,
};

const completedStepsByStatus: Record<OrderStatus, number> = {
  New: 0,
  "In Progress": 2,
  "Ready for Pickup": 4,
  Completed: 5,
  Rejected: 0,
};

export const FULFILLMENT_LABELS = [
  "Order Accepted",
  "Printing",
  "Finished",
  "Ready For Pickup",
  "Completed",
];

function buildWorkflow(status: OrderStatus): WorkflowStage[] {
  const current = currentStageByStatus[status];

  return workflowTemplate.map((stage, index) => ({
    ...stage,
    state:
      index < current
        ? "done"
        : index === current
          ? "current"
          : "pending",
  }));
}

function buildSpecs(document: OrderDocument): PrintSpec[] {
  const copies = document.specs[0] ?? "1 Copy";
  const printType = document.specs[2] ?? "B&W Laser";
  const sides = document.specs[3] ?? "Single-Sided";
  const paper = document.specs[4] ?? "A4";

  return [
    { label: "Paper", value: `${paper} Paper` },
    {
      label: "Print type",
      value: printType.toLowerCase().includes("colour")
        ? "Colour"
        : "Black & White",
    },
    {
      label: "Sides",
      value: sides === "Double-Sided" ? "Front & Back" : "Front Only",
    },
    { label: "Orientation", value: "Portrait" },
    { label: "Copies", value: copies.replace(" Copy", "") },
    {
      label: "Pages",
      value: `All pages (${document.pages} Total ${
        document.pages === 1 ? "Page" : "Pages"
      })`,
    },
    { label: "Page layout", value: "1 Page / Sheet" },
    { label: "Binding", value: "None" },
    { label: "Extras", value: "None" },
    { label: "Delivery option", value: "Pickup" },
  ];
}

function buildOrderDocuments(
  orderId: string,
  primary: OrderDocument
): OrderDocument[] {
  const secondPages = Math.max(1, Math.ceil(primary.pages / 2));
  const paper = primary.specs[4] ?? "A4";
  const printType = primary.specs[2] ?? "B&W Laser";

  const second: OrderDocument = {
    id: `${orderId}-doc-2`,
    fileName: primary.fileName.replace(/(\.[^.]+)?$/, "-notes$1"),
    kind: primary.kind,
    sheets: Math.max(1, Math.ceil(primary.sheets / 2)),
    pages: secondPages,
    size: "0.9 MB",
    specs: [
      "1 Copy",
      `${secondPages} ${secondPages === 1 ? "Page" : "Pages"}`,
      printType,
      "Double-Sided",
      paper,
    ],
    unitPrice: Number((primary.unitPrice * 0.6).toFixed(2)),
    lineTotal: Number((primary.lineTotal * 0.6).toFixed(2)),
  };

  const third: OrderDocument = {
    id: `${orderId}-doc-3`,
    fileName: "Cover-Page.pdf",
    kind: "PDF",
    sheets: 1,
    pages: 1,
    size: "0.3 MB",
    specs: ["1 Copy", "1 Page", "Colour Laser", "Single-Sided", "A4"],
    unitPrice: 1.2,
    lineTotal: 1.2,
  };

  return [primary, second, third];
}

function buildDocumentDetails(
  documents: OrderDocument[]
): OrderDocumentDetail[] {
  return documents.map((document) => ({
    document,
    specs: buildSpecs(document),
  }));
}

const baseDocument: OrderDocument = {
  id: "doc-1",
  fileName: "Screenshot_2026-10-11",
  kind: "JPG / IMAGE",
  sheets: 1,
  pages: 1,
  size: "0.8 MB",
  specs: ["1 Copy", "1 Page", "B&W Laser", "Single-Sided", "A4"],
  unitPrice: 0.75,
  lineTotal: 0.77,
};

const orderDetailsBase: OrderDetails = {
  id: "OMX-2839",
  paidLabel: "Paid ₹0.75 (Cash / Counter Pickup)",
  statusLabel: "Ready for Pickup",
  placedAt: "11/10/2028, 5:59:11 pm",
  placedAgo: "2 days ago",
  fastTrack: true,
  document: baseDocument,
  documents: buildDocumentDetails(
    buildOrderDocuments("OMX-2839", baseDocument)
  ),
  specs: buildSpecs(baseDocument),
  workflow: buildWorkflow("Ready for Pickup"),
  actions: FULFILLMENT_LABELS.map((label, index) => ({
    label,
    done: index < 4,
  })),
  billing: {
    lines: [
      { label: "1 A-Page B&W Laser (A4)", amount: 0.75 },
      { label: "Binding & Extra Finish", amount: 0 },
      { label: "Self Pickup Delivery Fee", amount: 0 },
      { label: "Convenience Fee & Platform GST", amount: 0.02 },
    ],
    total: 0.77,
    margin: 0.62,
    marginBreakdown: "Paper ₹0.08 · Toner ₹0.07",
    paidInCash: true,
  },
  customer: {
    name: "Akash K",
    initials: "AK",
    phone: "+91 8525913433",
    address: "Tamil Printers, Kumbakonam.",
    passcode: "4192",
    ordersCompleted: 5,
    pickupRate: "100% Pickup",
  },
  bin: "A-12",
};

export function getOrderDetails(orderId: string): OrderDetails {
  const normalized = orderId.toUpperCase();
  const order = QUEUE_ORDERS.find(
    (item) => item.id.toUpperCase() === normalized
  );

  if (!order) {
    return {
      ...orderDetailsBase,
      id: normalized,
      documents: buildDocumentDetails(
        buildOrderDocuments(normalized, baseDocument)
      ),
    };
  }

  if (order.id === orderDetailsBase.id) {
    return orderDetailsBase;
  }

  const billing: OrderDetails["billing"] = {
    lines: [
      {
        label: `${order.document.pages} ${
          order.document.pages === 1 ? "Page" : "Pages"
        } B&W Laser (A4)`,
        amount: order.amount,
      },
      { label: "Platform & convenience fee", amount: 0 },
    ],
    total: order.amount,
    margin: Number((order.amount * 0.8).toFixed(2)),
    marginBreakdown: "Paper & toner included",
    paidInCash: !order.unpaid,
  };

  return {
    ...orderDetailsBase,
    id: order.id,
    paidLabel: order.unpaid
      ? `Unpaid ${formatCurrency(order.amount)} (Collect at Counter)`
      : `Paid ${formatCurrency(order.amount)} (Cash / Counter Pickup)`,
    statusLabel: order.status,
    placedAgo: order.placedAgo,
    document: order.document,
    documents: buildDocumentDetails(
      buildOrderDocuments(order.id, order.document)
    ),
    specs: buildSpecs(order.document),
    workflow: buildWorkflow(order.status),
    actions: FULFILLMENT_LABELS.map((label, index) => ({
      label,
      done: index < completedStepsByStatus[order.status],
    })),
    billing,
    customer: {
      ...orderDetailsBase.customer,
      name: order.customerName,
      initials: getInitials(order.customerName),
      phone: order.phone,
    },
  };
}
