import { signOut } from "firebase/auth";

import { getFirebaseAuth } from "./client";

interface SessionPayload {
  idToken: string;
  name?: string;
  phone?: string;
}

async function requestSession(method: "POST" | "DELETE", body?: SessionPayload) {
  const response = await fetch("/api/auth/session", {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(data?.error ?? "Could not create a secure session.");
  }
}

export async function createServerSession(
  idToken: string,
  profile: { name?: string; phone?: string } = {}
) {
  await requestSession("POST", {
    idToken,
    name: profile.name,
    phone: profile.phone,
  });
}

export async function clearServerSession() {
  await requestSession("DELETE");
}

export async function signOutClient() {
  await clearServerSession().catch(() => undefined);
  await signOut(getFirebaseAuth()).catch(() => undefined);
}
