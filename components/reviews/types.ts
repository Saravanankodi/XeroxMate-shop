export interface ReviewResponse {
  author: string;
  date: string;
  body: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerInitial: string;
  avatarTone: "blue" | "mint";
  location: string;
  dateShort: string;
  dateFull: string;
  rating: number;
  orderId: string;
  items: string[];
  paid: string;
  paymentMethod: string;
  body: string;
  originalNote?: string;
  helpful: number;
  status: "awaiting" | "replied";
  response?: ReviewResponse;
}

export type RatingFilter =
  | "all"
  | 5
  | 4
  | 3
  | 2
  | 1;
