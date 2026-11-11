import { Check, Clock } from "lucide-react";

import Badge from "@/components/ui/Badge";
import SectionCard from "@/components/ui/SectionCard";
import { cn } from "@/lib/utils";
import type { WorkflowStage } from "@/types/orders";

interface ProductionWorkflowProps {
  stages: WorkflowStage[];
}

export default function ProductionWorkflow({
  stages,
}: ProductionWorkflowProps) {
  const currentIndex = stages.findIndex(
    (stage) => stage.state === "current"
  );
  const activeStage = currentIndex >= 0 ? currentIndex + 1 : stages.length;

  return (
    <SectionCard
      icon={Clock}
      title="Production Fulfillment Workflow"
      badge={
        <Badge tone="info">
          Stage {activeStage} of {stages.length} Active
        </Badge>
      }
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage, index) => {
          const isDone = stage.state === "done";
          const isCurrent = stage.state === "current";

          return (
            <div
              key={stage.title}
              className={cn(
                "relative min-w-0 overflow-hidden rounded-xl border p-3 pt-4",
                isCurrent
                  ? "border-brand/40 bg-stepper shadow-sm"
                  : isDone
                    ? "border-line bg-white"
                    : "border-line bg-lilac/70 opacity-70"
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[3px]",
                  isDone || isCurrent ? "bg-brand" : "bg-lilac-soft"
                )}
              />

              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    isDone
                      ? "bg-brand text-white"
                      : isCurrent
                        ? "bg-brand-strong text-white"
                        : "border border-[#cfd3e6] bg-white text-muted"
                  )}
                >
                  {isDone ? <Check size={13} /> : index + 1}
                </span>

                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wide",
                    isCurrent ? "text-brand-strong" : "text-muted/70"
                  )}
                >
                  {isCurrent
                    ? "Current"
                    : isDone
                      ? "Done"
                      : `Step ${index + 1}`}
                </span>
              </div>

              <p className="mt-2.5 text-xs font-semibold leading-4 text-ink">
                {stage.title}
              </p>

              <p className="mt-1 text-[11px] leading-4 text-muted">
                {stage.time}
              </p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
