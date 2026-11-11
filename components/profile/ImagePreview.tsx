import {
  Camera,
  RotateCcw,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import GridPattern from "./GridPattern";

interface ImagePreviewProps {
  label: string;
  fileName: string;
  meta: string;
  icon: LucideIcon;
  onRemove: () => void;
}

export default function ImagePreview({
  label,
  fileName,
  meta,
  icon: Icon,
  onRemove,
}: ImagePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-lilac shadow-sm">
      <div className="relative flex h-[203px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#dce1ff,#f2f3ff)]">
        <GridPattern />

        <div className="relative flex flex-col items-center gap-2 text-navy/50">
          <Icon size={44} strokeWidth={1.3} />
          <span className="text-[11px] font-semibold">Preview</span>
        </div>

        <span className="absolute left-3 top-3.5 inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-bold leading-[14px] text-ink shadow-sm backdrop-blur">
          <Camera size={12} className="text-brand-strong" />
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line/60 bg-white p-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold leading-[14px] text-ink">
            {fileName}
          </p>
          <p className="mt-0.5 text-xs font-semibold leading-[14px] text-muted">
            {meta}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex h-[26px] items-center gap-1 rounded-lg bg-lilac px-3 text-xs font-semibold leading-[14px] text-ink transition hover:bg-lilac-soft"
          >
            <RotateCcw size={11} />
            Replace
          </button>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
            className="flex h-[30px] w-6 items-center justify-center rounded-lg text-danger transition hover:bg-danger-soft"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
