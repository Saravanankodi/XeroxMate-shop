import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/firebase/session";
import {
  addWithdrawalAccount,
  getShopOverview,
} from "@/lib/shop/server";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overview = await getShopOverview(user.uid);

    return NextResponse.json({
      accounts: overview.withdrawalAccounts,
    });
  } catch (error) {
    console.error("Failed to load withdrawal accounts", error);
    return NextResponse.json(
      { error: "Could not load withdrawal accounts." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = await addWithdrawalAccount(user.uid, body);

    const overview = await getShopOverview(user.uid);

    return NextResponse.json({
      status: "ok",
      id,
      accounts: overview.withdrawalAccounts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not add withdrawal account.",
      },
      { status: 400 }
    );
  }
}
