import type { CustomerReview } from "./types";

export const customerReviews: CustomerReview[] = [
  {
    id: "review-omx-10022",
    customerName: "Akash K",
    customerInitial: "A",
    avatarTone: "blue",
    location: "Anna University Student Hub",
    dateShort: "12/10/2026",
    dateFull: "12 Oct 2026, 02:45 PM",
    rating: 5,
    orderId: "OMX-10022",
    items: ["A4 B&W Single Sided", "Spiral Binding (Blue Sheet)"],
    paid: "1.12",
    paymentMethod: "UPI Paid",
    body: "Super fast print turnaround during peak exam hours! The spiral binding was neat and the pickup was instant with counter OTP verification. Zero queue waiting.",
    originalNote: "No additional issues reported.",
    helpful: 2,
    status: "awaiting",
  },
  {
    id: "review-omx-10021",
    customerName: "Saravanan K",
    customerInitial: "S",
    avatarTone: "mint",
    location: "Department of Computer Science",
    dateShort: "07/10/2026",
    dateFull: "07 Oct 2026, 11:18 AM",
    rating: 5,
    orderId: "OMX-10021",
    items: ["A4 Duplex Report", "100 GSM Bond Paper"],
    paid: "1.50",
    paymentMethod: "Counter Cash",
    body: "Print quality is crisp, toner density is perfect with zero smudges. Friendly shopkeeper counter service. Will definitely print project documentation here again.",
    helpful: 1,
    status: "replied",
    response: {
      author: "Tamil Printers",
      date: "07 Oct, 01:20 PM",
      body: "Thank you Saravanan! Glad the project synopsis print came out great. Best of luck with your final semester review! Always happy to assist with thesis hard-binding.",
    },
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 2, percentage: 100 },
  { stars: 4, count: 0, percentage: 0 },
  { stars: 3, count: 0, percentage: 0 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];
