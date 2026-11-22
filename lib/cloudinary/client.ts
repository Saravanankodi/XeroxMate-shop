import type { ShopImageAsset } from "@/types/shop";

export type UploadedImage = ShopImageAsset;

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatImageMeta(image: ShopImageAsset) {
  return `${formatBytes(image.size)} • ${image.width} × ${image.height}`;
}

export async function uploadShopImage(file: File): Promise<UploadedImage> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Choose a JPG, PNG or WEBP image.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 10 MB.");
  }

  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/shop/images", {
    method: "POST",
    body,
  });

  const data = (await response.json()) as UploadedImage & {
    error?: string;
  };

  if (!response.ok || !data.url || !data.publicId) {
    throw new Error(data.error ?? "Image upload failed. Please try again.");
  }

  return {
    url: data.url,
    publicId: data.publicId,
    fileName: data.fileName ?? file.name,
    size: data.size ?? file.size,
    width: data.width ?? 0,
    height: data.height ?? 0,
  };
}
