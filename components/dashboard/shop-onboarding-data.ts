import type { ShopOverview, VerificationStatus } from "@/types/shop";

export type OnboardingStageStatus =
  | "completed"
  | "current"
  | "locked"
  | "rejected";

export interface OnboardingStage {
  key: string;
  label: string;
  status: OnboardingStageStatus;
  statusText: string;
  href: string;
}

function verificationStage(
  status: VerificationStatus,
  ready: boolean
): OnboardingStage {
  if (status === "approved") {
    return {
      key: "verification",
      label: "Verification & approval",
      status: "completed",
      statusText: "Shop is live",
      href: "/profile#verification",
    };
  }

  if (status === "rejected") {
    return {
      key: "verification",
      label: "Verification & approval",
      status: "rejected",
      statusText: "Needs attention",
      href: "/profile#verification",
    };
  }

  return {
    key: "verification",
    label: "Verification & approval",
    status: ready ? "current" : "locked",
    statusText: "Awaiting admin review",
    href: "/profile#verification",
  };
}

export function buildOnboardingStages(
  overview: ShopOverview | null
): OnboardingStage[] {
  const profileCompleted = overview?.profileCompleted ?? false;
  const hasPricing = overview?.hasPricing ?? false;

  return [
    {
      key: "profile",
      label: "Profile setup",
      status: profileCompleted ? "completed" : "current",
      statusText: profileCompleted ? "Shop details saved" : "Add shop details",
      href: "/profile",
    },
    {
      key: "pricing",
      label: "Print service & pricing",
      status: hasPricing
        ? "completed"
        : profileCompleted
          ? "current"
          : "locked",
      statusText: hasPricing ? "Rates configured" : "Configure print rates",
      href: "/pricing",
    },
    verificationStage(
      overview?.verificationStatus ?? "pending",
      profileCompleted && hasPricing
    ),
  ];
}
