"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";

import { Button, Card, Checkbox, Input, PasswordInput } from "@/components/ui";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";
import { createServerSession } from "@/lib/firebase/session-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedPhone = phone.replace(/\D/g, "");

    if (!/^\d{10}$/.test(normalizedPhone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    let accountCreated = false;

    try {
      const credential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password
      );

      accountCreated = true;

      await updateProfile(credential.user, {
        displayName: name.trim(),
      });

      const idToken = await credential.user.getIdToken();

      await createServerSession(idToken, {
        name: name.trim(),
        phone: normalizedPhone,
      });

      router.replace("/");
      router.refresh();
    } catch (signUpError) {
      if (accountCreated) {
        await firebaseSignOut(getFirebaseAuth()).catch(() => undefined);
      }

      setError(getFirebaseAuthErrorMessage(signUpError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full items-center justify-center sm:p-4">
      <Card padding="lg" className="w-full max-w-lg border border-line">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-navy">
          Create Your Shop Account
        </h1>

        <p className="sm:mb-6 sm:mt-2 mb-3 mt-1 text-xs sm:text-sm text-muted">
          List your print shop, accept orders and settle payments digitally.
        </p>

        <form className="space-y-5" onSubmit={submit}>
          <Input
            label="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@yourshop.com"
            autoComplete="email"
            required
          />

          <Input
            label="Mobile Number"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            required
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password (min. 8 characters)"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <Checkbox
            name="terms"
            label="I agree to the terms of service and privacy policy"
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
            Create Shop Account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-brand hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
