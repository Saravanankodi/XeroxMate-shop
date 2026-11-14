"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Flag,
  MessageSquare,
  Reply,
  SquarePen,
  ThumbsUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import ReviewStars from "./ReviewStars";
import ReviewSurface from "./ReviewSurface";
import type {
  CustomerReview,
  ReviewResponse,
} from "./types";

interface ReviewCardProps {
  review: CustomerReview;
}

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [hasHelped, setHasHelped] = useState(false);
  const [response, setResponse] = useState<
    ReviewResponse | undefined
  >(review.response);
  const [isEditing, setIsEditing] = useState(false);
  const [isWritingNew, setIsWritingNew] =
    useState(false);
  const [draft, setDraft] = useState(
    review.response?.body ?? ""
  );

  const isReplied = Boolean(response);
  const isComposerOpen =
    isEditing || (!response && isWritingNew);

  const startEditing = () => {
    setDraft(response?.body ?? "");
    setIsEditing(true);
  };

  const cancelComposer = () => {
    setIsEditing(false);
    setIsWritingNew(false);
    setDraft(response?.body ?? "");
  };

  const submitReply = () => {
    const body = draft.trim();

    if (!body) {
      return;
    }

    setResponse({
      author: "Tamil Printers",
      date: "Just now",
      body,
    });
    setIsEditing(false);
    setIsWritingNew(false);
  };

  const toggleHelpful = () => {
    setHelpful((count) =>
      hasHelped ? count - 1 : count + 1
    );
    setHasHelped((current) => !current);
  };

  return (
    <ReviewSurface className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold leading-6",
              review.avatarTone === "blue"
                ? "bg-[#D7E3FF] text-[#001B3F]"
                : "bg-mint text-[#00201D]"
            )}
          >
            {review.customerInitial}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1">
              <span className="font-heading text-base font-semibold leading-[22px] text-ink">
                XeroxMate Customer
              </span>

              <span className="text-[11px] font-semibold leading-[14px] text-muted">
                ({review.customerName})
              </span>

              <span className="inline-flex items-center rounded-full bg-mint px-1.5 py-0.5 text-[10px] font-bold leading-5 text-[#00201D]">
                Verified Pickup
              </span>
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] font-semibold leading-[14px] text-muted">
              <span>{review.location}</span>
              <span className="text-[#C5C5D3]">•</span>
              <span>
                {review.dateShort} ({review.dateFull})
              </span>
            </div>
          </div>
        </div>

        <span className="inline-flex h-[22px] w-fit shrink-0 items-center gap-1 rounded-full bg-lilac px-2">
          <ReviewStars rating={review.rating} size={13} />
          <span className="text-[11px] font-bold leading-[14px] text-navy">
            {review.rating.toFixed(1)}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-lilac p-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold leading-[14px] text-muted">
            Order:
          </span>

          <Link
            href={`/orders/${review.orderId}`}
            className="inline-flex items-center gap-0.5 font-heading text-[11px] font-semibold leading-[14px] text-brand-strong hover:underline"
          >
            {review.orderId}
            <ArrowUpRight size={10} />
          </Link>

          {review.items.map((item) => (
            <span
              key={item}
              className="rounded bg-white px-2 py-0.5 text-[11px] font-medium leading-[14px] text-ink"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="font-heading text-xs font-semibold leading-[14px] text-ink">
          Paid: ₹{review.paid}{" "}
          <span className="font-sans text-[11px] font-semibold text-success">
            ({review.paymentMethod})
          </span>
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-sm leading-[23px] text-ink">
          “{review.body}”
        </p>

        {review.originalNote ? (
          <p className="text-xs leading-4 text-muted">
            Original note: {review.originalNote}
          </p>
        ) : null}
      </div>

      {isComposerOpen ? (
        <div className="rounded-xl bg-lilac p-4">
          <div className="flex items-center gap-1 font-heading text-xs font-bold leading-4 text-navy">
            <MessageSquare size={12} />
            Tamil Printers (Shopkeeper Response)
          </div>

          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={3}
            placeholder="Write a public reply to this review..."
            className="mt-2 w-full resize-none rounded-lg bg-white p-3 text-sm leading-5 text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/25"
          />

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelComposer}
              className="inline-flex h-7 items-center rounded-lg bg-white px-3 font-heading text-xs font-medium text-ink transition hover:bg-lilac-soft"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={submitReply}
              disabled={!draft.trim()}
              className="inline-flex h-7 items-center gap-1 rounded-lg bg-navy px-3 font-heading text-xs font-medium text-white transition hover:bg-navy-deep disabled:pointer-events-none disabled:opacity-50"
            >
              <Reply size={12} />
              Publish Reply
            </button>
          </div>
        </div>
      ) : response ? (
        <div className="rounded-xl bg-lilac p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1">
              <MessageSquare
                size={12}
                className="text-navy"
              />
              <span className="font-heading text-xs font-bold leading-4 text-navy">
                {response.author} (Shopkeeper Response)
              </span>
              <span className="text-[11px] font-semibold leading-[14px] text-muted">
                • {response.date}
              </span>
            </div>

            <button
              type="button"
              onClick={startEditing}
              className="inline-flex items-center gap-0.5 text-xs font-semibold leading-[14px] text-brand-strong hover:underline"
            >
              <SquarePen size={11} />
              Edit Reply
            </button>
          </div>

          <p className="mt-1.5 pl-4 text-sm leading-5 text-muted">
            {response.body}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleHelpful}
            className={cn(
              "inline-flex h-[22px] items-center gap-1 rounded p-1 text-xs font-semibold leading-[14px] transition hover:bg-lilac",
              hasHelped ? "text-brand-strong" : "text-muted"
            )}
          >
            <ThumbsUp size={14} />
            Helpful ({helpful})
          </button>

          <button
            type="button"
            className="inline-flex h-[22px] items-center gap-1 rounded p-1 text-xs font-semibold leading-[14px] text-muted transition hover:bg-lilac"
          >
            <Flag size={10} />
            Report
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isReplied ? (
            <span className="inline-flex h-[18px] items-center gap-1 rounded-full bg-[rgba(137,245,231,0.3)] px-2 text-[11px] font-heading font-semibold leading-[14px] text-success">
              <Check size={13} />
              Replied
            </span>
          ) : (
            <span className="inline-flex h-[18px] items-center rounded-full bg-[rgba(255,218,214,0.4)] px-2 font-heading text-[11px] font-semibold leading-[14px] text-danger">
              Awaiting Reply
            </span>
          )}

          {isReplied ? (
            <button
              type="button"
              className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-lilac px-4 font-heading text-xs font-medium text-ink transition hover:bg-lilac-soft"
            >
              <MessageSquare size={13} />
              Direct Message
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsWritingNew(true)}
              className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-navy px-4 font-heading text-xs font-medium text-white shadow-sm transition hover:bg-navy-deep"
            >
              <Reply size={12} />
              Reply
            </button>
          )}
        </div>
      </div>
    </ReviewSurface>
  );
}
