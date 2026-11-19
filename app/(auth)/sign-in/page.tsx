import type { Metadata } from "next";
import { Suspense } from "react";

import SignIn from "@/components/forms/SignIn";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your XeroxMate account to manage print orders.",
};

function SignInFallback() {
  return (
    <main className="flex w-full items-center justify-center p-4">
      <div className="h-[430px] w-full max-w-lg animate-pulse rounded-3xl bg-slate-100" />
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignIn />
    </Suspense>
  );
}
