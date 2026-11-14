import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export default function ReviewSurface({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    />
  );
}
