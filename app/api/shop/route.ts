import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/firebase/session";
import { getShopOverview, saveShopProfile } from "@/lib/shop/server";
import { normalizeShopProfile } from "@/components/profile/normalize";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getShopOverview(user.uid));
  } catch (error) {
    console.error("Failed to load shop", error);
    return NextResponse.json(
      { error: "Could not load shop details." },
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
    const body = (await request.json()) as Record<string, unknown>;
    const profile = normalizeShopProfile(body);

    await saveShopProfile(user.uid, profile);

    return NextResponse.json({ status: "ok", profile });
  } catch (error) {
    console.error("Failed to save shop profile", error);
    return NextResponse.json(
      { error: "Could not save shop details." },
      { status: 500 }
    );
  }
}
