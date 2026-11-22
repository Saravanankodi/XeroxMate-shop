import "server-only";

import { getFirestore } from "firebase-admin/firestore";

import { getFirebaseAdminApp } from "@/lib/firebase/admin";

export function getFirestoreDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getShopDocument(uid: string) {
  return getFirestoreDb().collection("shops").doc(uid);
}

export function getPricingAndServicesCollection(uid: string) {
  return getShopDocument(uid).collection("pricingAndServices");
}

export function getWithdrawalAccountsCollection(uid: string) {
  return getShopDocument(uid).collection("withdrawalAccounts");
}
