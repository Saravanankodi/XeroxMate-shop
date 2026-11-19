import { FirebaseError } from "firebase/app";

const messages: Record<string, string> = {
  "auth/email-already-in-use": "An account with this email already exists. Try signing in instead.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/invalid-credential": "The email or password you entered is incorrect.",
  "auth/user-not-found": "No account was found for this email.",
  "auth/wrong-password": "The email or password you entered is incorrect.",
  "auth/weak-password": "Use a password with at least 8 characters.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/popup-closed-by-user": "The sign-in window was closed before finishing.",
  "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/unauthorized-domain": "This domain is not authorized in Firebase Authentication.",
  "auth/operation-not-allowed": "This sign-in method is disabled in Firebase Authentication.",
};

export function getFirebaseAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return messages[error.code] ?? "Something went wrong while signing in. Please try again.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
