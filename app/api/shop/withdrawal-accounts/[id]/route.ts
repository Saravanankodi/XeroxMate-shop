import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/firebase/session";
import {
  deleteWithdrawalAccount,
  getShopOverview,
  updateWithdrawalAccount,
} from "@/lib/shop/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    await updateWithdrawalAccount(user.uid, id, body);

    const overview = await getShopOverview(user.uid);

    return NextResponse.json({
      status: "ok",
      accounts: overview.withdrawalAccounts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not update withdrawal account.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deleteWithdrawalAccount(user.uid, id);

    const overview = await getShopOverview(user.uid);

    return NextResponse.json({
      status: "ok",
      accounts: overview.withdrawalAccounts,
    });
  } catch (error) {
    console.error("Failed to delete withdrawal account", error);
    return NextResponse.json(
      { error: "Could not delete withdrawal account." },
      { status: 500 }
    );
  }
}
