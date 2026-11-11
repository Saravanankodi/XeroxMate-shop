"use client";

import { useState } from "react";
import { Check, Copy, MapPin, Phone, User } from "lucide-react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import SectionCard from "@/components/ui/SectionCard";
import type { CustomerProfile } from "@/types/orders";

interface CustomerDetailsProps {
  customer: CustomerProfile;
}

export default function CustomerDetails({
  customer,
}: CustomerDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(customer.phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SectionCard icon={User} title="Customer Details">
      <div className="flex items-center gap-3">
        <Avatar
          initials={customer.initials}
          name={customer.name}
          size="lg"
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {customer.name}
          </p>

          <p className="text-xs text-muted">
            ★ {customer.ordersCompleted} Orders Completed ·{" "}
            {customer.pickupRate}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-3 rounded-lg bg-lilac px-3 py-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold text-ink">
            <Phone size={13} className="text-brand-strong" />
            {customer.phone}
          </span>

          <button
            onClick={copyPhone}
            aria-label="Copy phone number"
            className="rounded-md p-1 text-brand-strong transition hover:bg-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        <div className="flex items-start justify-between gap-3 rounded-lg bg-lilac px-3 py-2.5">
          <span className="flex items-center gap-2 text-xs text-muted">
            <MapPin size={13} />
            Address
          </span>

          <span className="text-right text-xs font-semibold text-ink">
            {customer.address}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-lilac px-3 py-2.5">
          <span className="text-xs text-muted">Pickup Passcode</span>

          <Badge tone="info">{customer.passcode}</Badge>
        </div>
      </div>
    </SectionCard>
  );
}
