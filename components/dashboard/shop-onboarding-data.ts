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

export const defaultShopOnboardingStages: OnboardingStage[] = [
  {
    key: "register",
    label: "Register",
    status: "completed",
    statusText: "Account created",
    href: "/",
  },
  {
    key: "profile",
    label: "Profile setup",
    status: "current",
    statusText: "Complete shop details",
    href: "/profile",
  },
  {
    key: "pricing",
    label: "Print service & pricing",
    status: "locked",
    statusText: "Add print rates",
    href: "/pricing",
  },
];
