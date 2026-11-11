import {
  Camera,
  Landmark,
  Store,
  type LucideIcon,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import ImagePreview from "./ImagePreview";
import UploadPlaceholder from "./UploadPlaceholder";
import type { ShopImages } from "./types";

interface ImageSlotProps {
  title: string;
  description: string;
  uploaded: boolean;
  preview: {
    label: string;
    fileName: string;
    meta: string;
    icon: LucideIcon;
  };
  className?: string;
  onToggle: () => void;
}

function ImageSlot({
  title,
  description,
  uploaded,
  preview,
  className,
  onToggle,
}: ImageSlotProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Camera size={14} className="text-brand-strong" />
          <span className="text-xs font-bold leading-4 text-ink">
            {title}
          </span>
          <span className="text-xs font-bold leading-4 text-danger">
            *
          </span>
        </div>

        <span className="text-xs font-semibold leading-[14px] text-muted">
          Max 10 MB (JPG, PNG)
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold leading-[14px] text-muted">
        {description}
      </p>

      <div className="mt-2">
        {uploaded ? (
          <ImagePreview
            label={preview.label}
            fileName={preview.fileName}
            meta={preview.meta}
            icon={preview.icon}
            onRemove={onToggle}
          />
        ) : (
          <UploadPlaceholder label={title} onUpload={onToggle} />
        )}
      </div>
    </div>
  );
}

interface ShopImagesCardProps {
  value: ShopImages;
  onChange: (value: ShopImages) => void;
}

export default function ShopImagesCard({
  value,
  onChange,
}: ShopImagesCardProps) {
  const uploadedCount =
    (value.front ? 1 : 0) + (value.interior ? 1 : 0);

  return (
    <section className="dashboard-card space-y-4 p-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-base font-semibold leading-[22px] text-ink">
              Shop Images
            </h2>
            <Badge
              tone="danger"
              className="text-[11px] leading-[14px]"
            >
              Required for Setup
            </Badge>
          </div>

          <span className="text-[11px] font-bold leading-[14px] text-brand-strong">
            {uploadedCount} / 2 Uploaded
          </span>
        </div>

        <p className="mt-2 text-xs font-medium leading-5 text-muted">
          Both images are required. Upload clear photos of your shop
          front and printing machinery for student trust.
        </p>
      </div>

      <ImageSlot
        title="Shop Front Image"
        description="A clear photo of your shop front / signage board."
        uploaded={value.front}
        preview={{
          label: "Front Signboard & Machine",
          fileName: "tamil_printers_front.jpg",
          meta: "1.4 MB • 1920 × 1080",
          icon: Store,
        }}
        onToggle={() =>
          onChange({ ...value, front: !value.front })
        }
      />

      <ImageSlot
        title="Shop Interior Image"
        description="A photo of your shop interior / counter area."
        uploaded={value.interior}
        preview={{
          label: "Interior Counter & Workshop",
          fileName: "tamil_printers_interior_standee.jpg",
          meta: "2.1 MB • 1920 × 1080",
          icon: Landmark,
        }}
        className="pt-3"
        onToggle={() =>
          onChange({ ...value, interior: !value.interior })
        }
      />
    </section>
  );
}
