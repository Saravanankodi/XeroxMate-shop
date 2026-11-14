"use client";

import { useMemo, useState } from "react";

import RatingOverview from "./RatingOverview";
import ReviewAuxiliaryRail from "./ReviewAuxiliaryRail";
import ReviewFilters from "./ReviewFilters";
import ReviewHeader from "./ReviewHeader";
import ReviewList from "./ReviewList";
import { customerReviews } from "./reviews-data";
import type { RatingFilter } from "./types";

export default function ReviewDashboard() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] =
    useState<RatingFilter>("all");

  const query = search.trim().toLowerCase();

  const filteredReviews = useMemo(() => {
    return customerReviews.filter((review) => {
      const matchesRating =
        ratingFilter === "all" ||
        review.rating === ratingFilter;

      if (!matchesRating) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchable = [
        review.customerName,
        review.orderId,
        review.location,
        review.body,
        review.paymentMethod,
        review.response?.body ?? "",
        ...review.items,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [query, ratingFilter]);

  const exportReviews = () => {
    const headers = [
      "Customer",
      "Rating",
      "Order ID",
      "Items",
      "Paid",
      "Payment Method",
      "Date",
      "Review",
      "Response",
      "Helpful",
      "Status",
    ];

    const rows = filteredReviews.map((review) => [
      review.customerName,
      review.rating.toFixed(1),
      review.orderId,
      review.items.join(" | "),
      review.paid,
      review.paymentMethod,
      review.dateFull,
      review.body,
      review.response?.body ?? "",
      String(review.helpful),
      review.status,
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
    link.download = "customer-reviews.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6">
      <ReviewHeader onExport={exportReviews} />

      <RatingOverview />

      <ReviewFilters
        search={search}
        onSearchChange={setSearch}
        ratingFilter={ratingFilter}
        onRatingChange={setRatingFilter}
        totalReviews={customerReviews.length}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_352px]">
        <ReviewList reviews={filteredReviews} />
        <ReviewAuxiliaryRail />
      </div>
    </div>
  );
}
