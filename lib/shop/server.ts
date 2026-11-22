import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import type {
  FinishingItem,
  PaperItem,
  ShopOverview,
  ShopProfile,
} from "@/types/shop";

import {
  getPricingAndServicesCollection,
  getShopDocument,
  getWithdrawalAccountsCollection,
} from "@/lib/firebase/firestore";

import {
  normalizeProfileStatus,
  normalizeShopProfile,
  normalizeVerificationStatus,
  normalizeWithdrawalAccount,
} from "@/components/profile/normalize";

type Data = Record<string, unknown>;

interface NewShopUser {
  uid: string;
  name?: string | null;
  email?: string | null;
  phone?: string;
}

export async function ensureShopDocument(user: NewShopUser) {
  const ref = getShopDocument(user.uid);
  const snapshot = await ref.get();

  if (snapshot.exists) {
    return;
  }

  await ref.set({
    shopInfo: {
      name: user.name ?? "",
      phone: user.phone ?? "",
      email: user.email ?? "",
    },
    profilStatus: "pending",
    verificationStatus: "pending",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getShopOverview(uid: string): Promise<ShopOverview> {
  const [shopSnapshot, pricingSnapshot, accountsSnapshot] = await Promise.all([
    getShopDocument(uid).get(),
    getPricingAndServicesCollection(uid).get(),
    getWithdrawalAccountsCollection(uid).get(),
  ]);

  const data = (shopSnapshot.data() ?? {}) as Data;
  const profile = normalizeShopProfile(data);
  const profilStatus = normalizeProfileStatus(
    data.profilStatus ??
      (data.profileCompleted === true ? "completed" : undefined)
  );
  const verificationStatus = normalizeVerificationStatus(
    data.verificationStatus
  );

  const accounts = accountsSnapshot.docs.map((doc) =>
    normalizeWithdrawalAccount(doc.id, doc.data() as Data)
  );

  accounts.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));

  return {
    profile,
    profileCompleted: profilStatus === "completed",
    profilStatus,
    hasPricing: !pricingSnapshot.empty,
    verificationStatus,
    withdrawalAccounts: accounts,
  };
}

export async function saveShopProfile(uid: string, profile: ShopProfile) {
  await getShopDocument(uid).set(
    {
      shopInfo: {
        name: profile.shopName,
        licinceCode: profile.registrationCode,
        ownerName: profile.ownerName,
        OwnerEmail: profile.ownerEmail,
        phone: profile.contactPhone,
        landline: profile.backupPhone,
      },
      openingHours: {
        formDay: profile.operatingDayFrom,
        toDay: profile.operatingDayTo,
        openingTime: profile.openingTime,
        CloseTime: profile.closingTime,
      },
      address: {
        line1: profile.addressLine1,
        area: profile.area,
        city: profile.city,
        state: profile.state,
        pincode: profile.pinCode,
        country: profile.country,
      },
      paymentOption: {
        payFull: profile.payment.fullOnline,
        payAdvance: profile.payment.advanceOnline,
        payAtPickup: profile.payment.pickup,
        cashOnDelivary: profile.payment.cod,
        advancePercentage: profile.advancePercent,
      },
      fulfillment: {
        pickup: profile.fulfillment.pickup,
        delivery: profile.fulfillment.delivery,
        deliveryFee: profile.deliveryFee,
        freeAbove: profile.freeAbove,
        deliveryEta: profile.deliveryEta,
        deliveryAreas: profile.deliveryAreas,
      },
      images: {
        front: Boolean(profile.images?.frontImage),
        interior: Boolean(profile.images?.interiorImage),
        frontImage: profile.images?.frontImage ?? null,
        interiorImage: profile.images?.interiorImage ?? null,
      },
      profilStatus: "completed",
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getPricing(uid: string): Promise<{
  paperItems: PaperItem[];
  finishingItems: FinishingItem[];
} | null> {
  const snapshot = await getPricingAndServicesCollection(uid).get();

  if (snapshot.empty) {
    return null;
  }

  const paperMap = new Map<string, PaperItem>();
  const finishingItems: FinishingItem[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data() as Data;
    const itemId = String(data.itemId ?? "");
    const name = String(data.name ?? data.serviceType ?? "");
    const isActive = data.isActive === true;
    const price = String(data.price ?? "0");

    if (data.variant === "bw" || data.variant === "color") {
      const item = paperMap.get(itemId) ?? {
        id: itemId,
        name,
        active: isActive,
        bwPrice: "0",
        colorPrice: "0",
      };

      if (data.variant === "bw") {
        item.bwPrice = price;
      } else {
        item.colorPrice = price;
      }

      item.active = item.active || isActive;
      paperMap.set(itemId, item);
    }

    if (data.variant === "finishing") {
      finishingItems.push({
        id: itemId,
        name,
        unit: data.unit === "page" ? "page" : "document set",
        active: isActive,
        price,
      });
    }
  }

  return {
    paperItems: [...paperMap.values()],
    finishingItems,
  };
}

export async function savePricing(
  uid: string,
  paperItems: PaperItem[],
  finishingItems: FinishingItem[]
) {
  const db = getShopDocument(uid).firestore;
  const batch = db.batch();
  const collection = getPricingAndServicesCollection(uid);
  const snapshot = await collection.get();
  const keepIds = new Set([
    ...paperItems.flatMap((item) => [`${item.id}_bw`, `${item.id}_color`]),
    ...finishingItems.map((item) => `finishing_${item.id}`),
  ]);

  for (const doc of snapshot.docs) {
    if (!keepIds.has(doc.id)) {
      batch.delete(doc.ref);
    }
  }

  for (const item of paperItems) {
    batch.set(collection.doc(`${item.id}_bw`), {
      serviceType: `${item.name} - B/W`,
      isActive: item.active,
      price: item.bwPrice,
      itemId: item.id,
      variant: "bw",
      name: item.name,
      updatedAt: FieldValue.serverTimestamp(),
    });

    batch.set(collection.doc(`${item.id}_color`), {
      serviceType: `${item.name} - Color`,
      isActive: item.active,
      price: item.colorPrice,
      itemId: item.id,
      variant: "color",
      name: item.name,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  for (const item of finishingItems) {
    batch.set(collection.doc(`finishing_${item.id}`), {
      serviceType: item.name,
      isActive: item.active,
      price: item.price,
      itemId: item.id,
      variant: "finishing",
      name: item.name,
      unit: item.unit,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
}

function sanitizeAccount(input: Data) {
  return {
    accountHolder: String(input.accountHolder ?? "").trim(),
    accountNumber: String(input.accountNumber ?? "").replace(/\D/g, ""),
    ifsc: String(input.ifsc ?? "").trim().toUpperCase(),
    bankName: String(input.bankName ?? "").trim(),
    branch: String(input.branch ?? "").trim(),
    isPrimary: input.isPrimary === true,
  };
}

function validateAccount(account: ReturnType<typeof sanitizeAccount>) {
  return (
    account.accountHolder.length > 0 &&
    account.accountNumber.length >= 9 &&
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(account.ifsc) &&
    account.bankName.length > 0
  );
}

export async function addWithdrawalAccount(uid: string, input: Data) {
  const account = sanitizeAccount(input);

  if (!validateAccount(account)) {
    throw new Error("Enter a valid account holder, number, IFSC and bank name.");
  }

  const collection = getWithdrawalAccountsCollection(uid);
  const batch = getShopDocument(uid).firestore.batch();
  const existing = await collection.get();

  if (account.isPrimary) {
    for (const doc of existing.docs) {
      batch.update(doc.ref, { isPrimary: false });
    }
  }

  const ref = collection.doc();

  batch.set(ref, {
    ...account,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();

  return ref.id;
}

export async function updateWithdrawalAccount(
  uid: string,
  id: string,
  input: Data
) {
  const account = sanitizeAccount(input);

  if (!validateAccount(account)) {
    throw new Error("Enter a valid account holder, number, IFSC and bank name.");
  }

  const collection = getWithdrawalAccountsCollection(uid);
  const ref = collection.doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Account not found.");
  }

  const batch = ref.firestore.batch();

  if (account.isPrimary) {
    const existing = await collection.get();
    for (const doc of existing.docs) {
      if (doc.id !== id) {
        batch.update(doc.ref, { isPrimary: false });
      }
    }
  }

  batch.update(ref, {
    ...account,
    updatedAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();
}

export async function deleteWithdrawalAccount(uid: string, id: string) {
  const ref = getWithdrawalAccountsCollection(uid).doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    return;
  }

  const data = snapshot.data() as Data;
  await ref.delete();

  if (data.isPrimary === true) {
    const remaining = await getWithdrawalAccountsCollection(uid)
      .orderBy("createdAt", "asc")
      .limit(1)
      .get();

    if (!remaining.empty) {
      await remaining.docs[0].ref.update({ isPrimary: true });
    }
  }
}
