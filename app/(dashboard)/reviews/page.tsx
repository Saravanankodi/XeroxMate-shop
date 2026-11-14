import type { Metadata } from "next";

import ReviewDashboard from "@/components/reviews/ReviewDashboard";

export const metadata: Metadata = {
  title: "Customer Reviews | Tamil Printers",
  description:
    "Monitor verified student reviews, reply to feedback, and maintain your shop quality tier.",
};

export default function ReviewsPage() {
  return <ReviewDashboard />;
}
