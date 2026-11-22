import { Loader2, Save } from "lucide-react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ShopProfileSaveBarProps {
  dirty: boolean;
  lastSaved: string;
  saving?: boolean;
  onDiscard: () => void;
}

export default function ShopProfileSaveBar({
  dirty,
  lastSaved,
  saving = false,
  onDiscard,
}: ShopProfileSaveBarProps) {
  return (
    <div className="sticky bottom-0 z-20 mt-6 flex flex-col gap-2 border-t border-line/70 bg-white/95 px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "h-3 w-3 rounded-full",
            dirty ? "bg-brand" : "bg-[#00312C]"
          )}
        />
        <span className="font-heading text-xs font-semibold leading-4 text-ink">
          {dirty ? "Unsaved changes" : "No unsaved changes"}
        </span>
        <span className="text-sm text-[#c5c5d3]">·</span>
        <span className="text-[11px] font-semibold leading-3.5 text-muted">
          {lastSaved}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onDiscard}
          disabled={saving}
          className="h-9 rounded-lg font-heading text-xs font-semibold text-muted 2xl:text-sm"
        >
          Discard Changes
        </Button>

        <Button
          type="submit"
          size="md"
          disabled={saving}
          className="h-9 gap-2 rounded-lg bg-navy px-6 font-heading text-xs font-bold text-white hover:bg-navy/90 2xl:text-sm"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
