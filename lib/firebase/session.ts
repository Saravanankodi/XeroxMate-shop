import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getFirebaseAdminAuth } from "./admin";
import { SESSION_COOKIE_NAME } from "./constants";

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "./constants";

export interface SessionUser {
  uid: string;
  email: string | null;
  name: string | null;
  picture: string | null;
}

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!cookie) {
    return null;
  }

  try {
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(cookie, true);

    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: decoded.name ?? null,
      picture: decoded.picture ?? null,
    };
  } catch {
    return null;
  }
});

export const verifySession = cache(async (): Promise<SessionUser> => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
});
