import Image from "next/image";
import { Camera, RotateCcw, Trash2 } from "lucide-react";

import type { ShopImageAsset } from "@/types/shop";
import { formatImageMeta } from "@/lib/cloudinary/client";
import GridPattern from "./GridPattern";

interface ImagePreviewProps {
  label: string;
  image: ShopImageAsset;
  onReplace: () => void;
  onRemove: () => void;
}

export default function ImagePreview({
  label,
  image,
  onReplace,
  onRemove,
}: ImagePreviewProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-lilac shadow-sm">
      <div className="relative flex h-[203px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#dce1ff,#f2f3ff)]">
        <GridPattern />

        <Image
          src={image.url}
          alt={label}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 420px"
          className="object-cover"
        />

        <span className="absolute left-3 top-3.5 inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-bold leading-3.5 text-ink shadow-sm backdrop-blur">
          <Camera size={12} className="text-brand-strong" />
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line/60 bg-white p-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold leading-3.5 text-ink">
            {image.fileName || "Shop image"}
          </p>
          <p className="mt-0.5 text-xs font-semibold leading-3.5 text-muted">
            {formatImageMeta(image)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onReplace}
            className="flex h-[26px] items-center gap-1 rounded-lg bg-lilac px-3 text-xs font-semibold leading-3.5 text-ink transition hover:bg-lilac-soft"
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
