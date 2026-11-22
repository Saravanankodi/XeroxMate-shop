import "server-only";

import { createHash, randomUUID } from "node:crypto";
import type { ShopImageAsset } from "@/types/shop";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function signParameters(
  parameters: Record<string, string | number>,
  apiSecret: string
) {
  const serialized = Object.keys(parameters)
    .sort()
    .map((key) => `${key}=${parameters[key]}`)
    .join("&");

  return createHash("sha1")
    .update(`${serialized}${apiSecret}`)
    .digest("hex");
}

export async function uploadShopImage(
  file: File,
  uid: string
): Promise<ShopImageAsset> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Choose a JPG, PNG or WEBP image.");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 10 MB.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString("base64")}`;
  const publicId = `xeroxmate/shop-images/${uid}/${randomUUID()}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signParameters(
    { public_id: publicId, timestamp },
    apiSecret
  );

  const body = new FormData();
  body.append("file", dataUri);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("public_id", publicId);
  body.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body }
  );

  const data = (await response.json()) as {
    secure_url?: string;
    public_id?: string;
    bytes?: number;
    width?: number;
    height?: number;
    error?: { message?: string };
  };

  if (!response.ok || !data.secure_url || !data.public_id) {
    throw new Error(
      data.error?.message ?? "Image upload failed. Please try again."
    );
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    fileName: file.name,
    size: data.bytes ?? file.size,
    width: data.width ?? 0,
    height: data.height ?? 0,
  };
}
