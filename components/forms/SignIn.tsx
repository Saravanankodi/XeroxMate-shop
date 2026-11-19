"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";

import { Button, Input, Card } from "@/components/ui";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";
import { createServerSession } from "@/lib/firebase/session-client";

function getRedirectPath(value: string | null) {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/";
}

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getRedirectPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function completeSignIn(user: User) {
    const idToken = await user.getIdToken();
    await createServerSession(idToken);
    router.replace(redirectTo);
    router.refresh();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password
      );

      await completeSignIn(credential.user);
    } catch (signInError) {
      setError(getFirebaseAuthErrorMessage(signInError));
    } finally {
      setLoading(false);
    }
  }

  async function continueWithGoogle() {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(getFirebaseAuth(), provider);

      await completeSignIn(credential.user);
    } catch (signInError) {
      setError(getFirebaseAuthErrorMessage(signInError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full items-center justify-center p-4">
      <Card padding="lg" className="w-full max-w-lg border border-line">
        <h1 className="font-heading text-2xl font-bold text-navy">
          Merchant Sign In
        </h1>

        <p className="mb-6 mt-2 text-sm text-muted">
          Access your order queue, pricing and settlements.
        </p>

        <form className="space-y-5" onSubmit={submit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@yourshop.com"
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {error ? (
            <p
              role="alert"
              className="rounded-lg bg-danger-soft p-3 text-xs font-semibold text-danger-ink"
            >
              {error}
            </p>
          ) : null}

          <Button type="submit" fullWidth loading={loading}>
            Sign In to Merchant Console
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
            disabled={loading}
            onClick={continueWithGoogle}
          >
            Continue with Google
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          New to XeroxMate?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-brand hover:underline"
          >
            Create a merchant account
          </Link>
        </p>
      </Card>
    </main>
  );
}
