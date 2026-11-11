import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface AddNewButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AddNewButton({
  onClick,
  className,
}: AddNewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#e2e7ff]/60 bg-lilac py-3.5 font-heading text-base font-semibold leading-5 text-navy transition hover:bg-lilac-soft",
        className
      )}
    >
      <Plus size={14} />
      Add New
    </button>
  );
}
