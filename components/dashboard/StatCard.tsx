import { ReactNode } from "react";
import {
  RefreshCw,
  FileText,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import Card from "../ui/Card";

const icons = {
  refresh: RefreshCw,
  file: FileText,
  rupee: IndianRupee,
  trend: TrendingUp,
};

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof icons;
  iconClassName?: string;
  valueClassName?: string;
  valueFont?: "display" | "heading";
  badge?: ReactNode;
  footer: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
  iconClassName = "bg-[#e2e7ff] text-brand-strong",
  valueClassName = "text-ink",
  valueFont = "display",
  badge,
  footer,
}: StatCardProps) {
  const Icon = icons[icon];

  return (
    <Card className="flex h-full min-w-0 flex-col justify-between gap-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-heading text-sm font-semibold leading-5 text-muted">
          {title}
        </p>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon size={15} />
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span
          className={`text-4xl font-bold leading-[44px] ${
            valueFont === "heading" ? "font-heading" : "font-display"
          } ${valueClassName}`}
        >
          {value}
        </span>

        {badge}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        {footer}
      </div>
    </Card>
  );
}
