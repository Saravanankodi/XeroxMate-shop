import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "@/lib/firebase/constants";

interface SessionBody {
  idToken?: string;
  name?: string;
  phone?: string;
}

export async function POST(request: Request) {
  let body: SessionBody;

  try {
    body = (await request.json()) as SessionBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.idToken) {
    return NextResponse.json({ error: "Missing ID token." }, { status: 400 });
  }

  try {
    const auth = getFirebaseAdminAuth();
    const decoded = await auth.verifyIdToken(body.idToken, true);
    const displayName = body.name?.trim();
    const phone = body.phone?.replace(/\D/g, "");

    if (displayName && displayName !== decoded.name) {
      await auth.updateUser(decoded.uid, { displayName });
    }

    if (phone && /^\d{10}$/.test(phone)) {
      await auth.setCustomUserClaims(decoded.uid, {
        ...decoded.customClaims,
        phone,
      });
    }

    const sessionCookie = await auth.createSessionCookie(body.idToken, {
      expiresIn: SESSION_MAX_AGE_MS,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_MAX_AGE_MS / 1000),
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Failed to create Firebase session", error);

    return NextResponse.json(
      { error: "Could not create a secure session. Please try again." },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      const auth = getFirebaseAdminAuth();
      const decoded = await auth.verifySessionCookie(sessionCookie);
      await auth.revokeRefreshTokens(decoded.sub);
    } catch (error) {
      console.error("Failed to revoke Firebase session", error);
    }
  }

  cookieStore.delete(SESSION_COOKIE_NAME);

  return NextResponse.json({ status: "ok" });
}
