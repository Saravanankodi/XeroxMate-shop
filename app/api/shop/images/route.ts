import { NextResponse } from "next/server";

import { uploadShopImage } from "@/lib/cloudinary/server";
import { getSessionUser } from "@/lib/firebase/session";

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Choose an image to upload." },
        { status: 400 }
      );
    }

    const image = await uploadShopImage(file, user.uid);
    return NextResponse.json(image);
  } catch (error) {
    console.error("Failed to upload shop image", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not upload the image.",
      },
      { status: 500 }
    );
  }
}
