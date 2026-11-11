import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export default function Avatar({
  initials,
  name,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <span
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-navy font-heading font-bold text-white",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
