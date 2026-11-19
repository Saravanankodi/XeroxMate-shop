import "server-only";

import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

let adminApp: App | undefined;

function getPrivateKey() {
  const key = process.env.FIREBASE_PRIVATE_KEY;

  return key ? key.replace(/\\n/g, "\n") : undefined;
}

export function getFirebaseAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  adminApp = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: getPrivateKey(),
        }),
      });

  return adminApp;
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}
