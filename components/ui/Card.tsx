import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
}

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5",
  lg: "p-6 sm:p-8",
};

export default function Card({
  children,
  className = "",
  padding = "none",
}: CardProps) {
  return (
    <div className={cn("dashboard-card", paddings[padding], className)}>
      {children}
    </div>
  );
}
