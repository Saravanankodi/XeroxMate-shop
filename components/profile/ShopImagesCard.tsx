"use client";

import { useRef, useState } from "react";
import { Landmark, Store, type LucideIcon } from "lucide-react";

import Badge from "@/components/ui/Badge";
import { uploadShopImage } from "@/lib/cloudinary/client";
import type { ShopImageAsset, ShopImages } from "@/types/shop";
import ImagePreview from "./ImagePreview";
import UploadPlaceholder from "./UploadPlaceholder";

type ImageSlotKey = "front" | "interior";

interface ImageSlotProps {
  title: string;
  description: string;
  asset?: ShopImageAsset;
  uploading: boolean;
  error: string;
  icon: LucideIcon;
  onFile: (file: File) => void;
  onRemove: () => void;
}

function ImageSlot({
  title,
  description,
  asset,
  uploading,
  error,
  icon: Icon,
  onFile,
  onRemove,
}: ImageSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => inputRef.current?.click();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Icon size={14} className="text-brand-strong" />
          <span className="text-xs font-bold leading-4 text-ink">{title}</span>
          <span className="text-xs font-bold leading-4 text-danger">*</span>
        </div>

        <span className="text-xs font-semibold leading-3.5 text-muted">
          Max 10 MB (JPG, PNG, WEBP)
        </span>
      </div>

      <p className="mt-1 text-xs font-semibold leading-3.5 text-muted">
        {description}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onFile(file);
          }
          event.target.value = "";
        }}
      />

      <div className="mt-2">
        {asset ? (
          <ImagePreview
            label={title}
            image={asset}
            onReplace={openPicker}
            onRemove={onRemove}
          />
        ) : (
          <UploadPlaceholder
            label={title}
            onUpload={openPicker}
            uploading={uploading}
          />
        )}
      </div>

      {error ? (
        <p role="alert" className="mt-1 text-[11px] font-semibold text-danger">
          {error}
        </p>
      ) : null}
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
  const [uploading, setUploading] = useState<Record<ImageSlotKey, boolean>>({
    front: false,
    interior: false,
  });
  const [errors, setErrors] = useState<Record<ImageSlotKey, string>>({
    front: "",
    interior: "",
  });

  async function handleFile(slot: ImageSlotKey, file: File) {
    setUploading((current) => ({ ...current, [slot]: true }));
    setErrors((current) => ({ ...current, [slot]: "" }));

    try {
      const image = await uploadShopImage(file);

      if (slot === "front") {
        onChange({ ...value, front: true, frontImage: image });
      } else {
        onChange({ ...value, interior: true, interiorImage: image });
      }
    } catch (uploadError) {
      setErrors((current) => ({
        ...current,
        [slot]:
          uploadError instanceof Error
            ? uploadError.message
            : "Image upload failed. Please try again.",
      }));
    } finally {
      setUploading((current) => ({ ...current, [slot]: false }));
    }
  }

  function handleRemove(slot: ImageSlotKey) {
    if (slot === "front") {
      onChange({ ...value, front: false, frontImage: undefined });
    } else {
      onChange({ ...value, interior: false, interiorImage: undefined });
    }
  }

  const uploadedCount =
    (value.frontImage ? 1 : 0) + (value.interiorImage ? 1 : 0);

  return (
    <section className="dashboard-card space-y-4 p-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-base font-semibold leading-[22px] text-ink">
              Shop Images
            </h2>
            <Badge tone="danger" className="text-[11px] leading-3.5">
              Required for Setup
            </Badge>
          </div>

          <span className="text-[11px] font-bold leading-3.5 text-brand-strong">
            {uploadedCount} / 2 Uploaded
          </span>
        </div>

        <p className="mt-2 text-xs font-medium leading-5 text-muted">
          Both images are required. Upload clear photos of your shop front and
          printing machinery for student trust.
        </p>
      </div>

      <ImageSlot
        title="Shop Front Image"
        description="A clear photo of your shop front / signage board."
        icon={Store}
        asset={value.frontImage}
        uploading={uploading.front}
        error={errors.front}
        onFile={(file) => handleFile("front", file)}
        onRemove={() => handleRemove("front")}
      />

      <ImageSlot
        title="Shop Interior Image"
        description="A photo of your shop interior / counter area."
        icon={Landmark}
        asset={value.interiorImage}
        uploading={uploading.interior}
        error={errors.interior}
        onFile={(file) => handleFile("interior", file)}
        onRemove={() => handleRemove("interior")}
      />
    </section>
  );
}
