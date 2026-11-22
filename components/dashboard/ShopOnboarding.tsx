"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Lock,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ShopOverview } from "@/types/shop";

import {
  buildOnboardingStages,
  type OnboardingStage,
  type OnboardingStageStatus,
} from "./shop-onboarding-data";

interface ShopOnboardingProps {
  stages?: OnboardingStage[];
  className?: string;
}

const statusStyles: Record<OnboardingStageStatus, string> = {
  completed: "text-success",
  current: "text-brand",
  locked: "text-muted/50",
  rejected: "text-danger",
};

const statusSubStyles: Record<OnboardingStageStatus, string> = {
  completed: "text-success/70",
  current: "text-brand/70",
  locked: "text-muted/40",
  rejected: "text-danger/70",
};

const statusIcons: Record<OnboardingStageStatus, LucideIcon> = {
  completed: CheckCircle2,
  current: Loader2,
  locked: Lock,
  rejected: XCircle,
};

function StageIcon({ status }: { status: OnboardingStageStatus }) {
  const Icon = statusIcons[status];

  return (
    <Icon
      aria-hidden="true"
      className={cn(
        "h-5 w-5 shrink-0",
        statusStyles[status],
        status === "current" && "animate-spin"
      )}
      strokeWidth={2.2}
    />
  );
}

export default function ShopOnboarding({
  stages: stagesProp,
  className,
}: ShopOnboardingProps) {
  const [fetchedStages, setFetchedStages] = useState<OnboardingStage[]>(() =>
    buildOnboardingStages(null)
  );

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      try {
        const response = await fetch("/api/shop");

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ShopOverview;

        if (active) {
          setFetchedStages(buildOnboardingStages(data));
        }
      } catch {
        return;
      }
    }

    loadProgress();

    return () => {
      active = false;
    };
  }, []);

  const stages = stagesProp ?? fetchedStages;
  const completedCount = stages.filter(
    (stage) => stage.status === "completed"
  ).length;
  const totalCount = stages.length;
  const progressPercent = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <div className={cn("dashboard-card p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-semibold text-navy">
          Setup your shop
        </h2>
        <span className="text-xs font-medium text-muted">
          {completedCount} of {totalCount} completed
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-lilac">
        <div
          className="h-full rounded-full bg-brand transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-5 hidden sm:flex sm:items-center sm:gap-0 sm:ps-[10%]">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex flex-1 items-start">
            <Link
              href={stage.href}
              className="group flex flex-col items-center rounded-lg px-1 py-1 outline-none transition hover:bg-lilac focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <StageIcon status={stage.status} />
              <p
                className={cn(
                  "mt-1.5 max-w-[110px] text-center text-[11px] font-medium leading-tight transition group-hover:underline",
                  statusStyles[stage.status]
                )}
              >
                {stage.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 max-w-[110px] text-center text-[10px] leading-tight",
                  statusSubStyles[stage.status]
                )}
              >
                {stage.statusText}
              </p>
            </Link>

            {index < stages.length - 1 ? (
              <div
                className={cn(
                  "mx-1 mt-2.5 h-px flex-1",
                  stage.status === "completed" ? "bg-success" : "bg-line"
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-0 sm:hidden">
        {stages.map((stage, index) => (
          <Link
            key={stage.key}
            href={stage.href}
            className="group flex items-start gap-3 rounded-lg py-1 outline-none transition hover:bg-lilac focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <div className="flex flex-col items-center">
              <StageIcon status={stage.status} />
              {index < stages.length - 1 ? (
                <div
                  className={cn(
                    "h-5 w-px",
                    stage.status === "completed" ? "bg-success" : "bg-line"
                  )}
                />
              ) : null}
            </div>

            <div className="pb-3">
              <p
                className={cn(
                  "text-sm font-medium transition group-hover:underline",
                  statusStyles[stage.status]
                )}
              >
                {stage.label}
              </p>
              <p className={cn("text-xs", statusSubStyles[stage.status])}>
                {stage.statusText}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
