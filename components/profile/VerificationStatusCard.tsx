import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import Badge from "@/components/ui/Badge";
import CardHeader from "./CardHeader";
import type { VerificationStatus } from "./types";

const details: Record<
  VerificationStatus,
  {
    title: string;
    description: string;
    icon: typeof Clock3;
    tone: "success" | "danger" | "muted";
  }
> = {
  pending: {
    title: "Verification in review",
    description:
      "We are checking your shop details and withdrawal accounts. This usually takes a few hours.",
    icon: Clock3,
    tone: "muted",
  },
  approved: {
    title: "Shop approved",
    description:
      "Your shop is live. Customers can now find you and place print orders.",
    icon: CheckCircle2,
    tone: "success",
  },
  rejected: {
    title: "Verification needs attention",
    description:
      "Some details could not be verified. Update your profile and withdrawal accounts, then contact support.",
    icon: XCircle,
    tone: "danger",
  },
};

export default function VerificationStatusCard({
  status,
}: {
  status: VerificationStatus;
}) {
  const item = details[status];
  const Icon = item.icon;

  return (
    <section id="verification" className="dashboard-card p-6">
      <CardHeader
        icon={Icon}
        title="Verification & Approval"
        subtitle="Admin review of your shop before going live"
        action={<Badge tone={item.tone}>{status.toUpperCase()}</Badge>}
      />

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-lilac/60 p-4">
        <Icon size={18} className="mt-0.5 shrink-0 text-brand-strong" />
        <div>
          <p className="font-heading text-sm font-semibold text-navy">
            {item.title}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted">
            {item.description}
          </p>
        </div>
      </div>
    </section>
  );
}
