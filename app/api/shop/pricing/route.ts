import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/firebase/session";
import { getPricing, savePricing } from "@/lib/shop/server";
import type { FinishingItem, PaperItem } from "@/types/shop";

interface PricingBody {
  paperItems?: PaperItem[];
  finishingItems?: FinishingItem[];
}

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pricing = await getPricing(user.uid);

    return NextResponse.json({
      paperItems: pricing?.paperItems ?? [],
      finishingItems: pricing?.finishingItems ?? [],
    });
  } catch (error) {
    console.error("Failed to load pricing", error);
    return NextResponse.json(
      { error: "Could not load pricing." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PricingBody;

    if (!Array.isArray(body.paperItems) || !Array.isArray(body.finishingItems)) {
      return NextResponse.json(
        { error: "Invalid pricing payload." },
        { status: 400 }
      );
    }

    await savePricing(user.uid, body.paperItems, body.finishingItems);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Failed to save pricing", error);
    return NextResponse.json(
      { error: "Could not save pricing." },
      { status: 500 }
    );
  }
}
