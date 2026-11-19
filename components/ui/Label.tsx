import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  dot?: boolean;
  dotColor?: string;
  className?: string;
}

export default function Label({
  children,
  htmlFor,
  dot = false,
  dotColor = "bg-brand",
  className,
}: LabelProps) {
  const content = (
    <>
      {dot ? (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor)}
        />
      ) : null}
      {children}
    </>
  );

  const styles = cn(
    "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted",
    className
  );

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={styles}>
        {content}
      </label>
    );
  }

  return <span className={styles}>{content}</span>;
}
