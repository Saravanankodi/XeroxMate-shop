import type {
  ProfileStatus,
  ShopImageAsset,
  VerificationStatus,
  WeekDay,
  WithdrawalAccount,
} from "@/types/shop";

import {
  defaultFulfillment,
  defaultPayment,
  defaultShopProfile,
  weekDays,
} from "./defaults";

type Data = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : fallback;
}

function asDay(value: unknown, fallback: WeekDay) {
  return weekDays.includes(value as WeekDay) ? (value as WeekDay) : fallback;
}

function pick(primary: unknown, fallback: unknown): unknown {
  return primary === undefined || primary === null || primary === ""
    ? fallback
    : primary;
}

function asImageAsset(value: unknown): ShopImageAsset | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const data = value as Data;
  const url = asString(data.url);
  const publicId = asString(data.publicId);

  if (!url || !publicId) {
    return undefined;
  }

  return {
    url,
    publicId,
    fileName: asString(data.fileName),
    size: asNumber(data.size, 0),
    width: asNumber(data.width, 0),
    height: asNumber(data.height, 0),
  };
}

export function normalizeShopProfile(data: Data | undefined) {
  if (!data) {
    return defaultShopProfile;
  }

  const shopInfo = (data.shopInfo ?? {}) as Data;
  const openingHours = (data.openingHours ?? {}) as Data;
  const address = (data.address ?? {}) as Data;
  const paymentOption = (data.paymentOption ?? data.payment ?? {}) as Data;
  const fulfillment = (data.fulfillment ?? {}) as Data;
  const images = (data.images ?? {}) as Data;

  const operatingDayFrom = asDay(
    pick(openingHours.formDay, data.operatingDayFrom),
    defaultShopProfile.operatingDayFrom
  );
  let operatingDayTo = asDay(
    pick(openingHours.toDay, data.operatingDayTo),
    defaultShopProfile.operatingDayTo
  );

  if (weekDays.indexOf(operatingDayTo) < weekDays.indexOf(operatingDayFrom)) {
    operatingDayTo = operatingDayFrom;
  }

  return {
    ...defaultShopProfile,
    shopName: asString(
      pick(shopInfo.name, data.shopName),
      defaultShopProfile.shopName
    ),
    registrationCode: asString(
      pick(shopInfo.licinceCode, data.registrationCode),
      defaultShopProfile.registrationCode
    ),
    ownerName: asString(
      pick(shopInfo.ownerName, data.ownerName),
      defaultShopProfile.ownerName
    ),
    ownerEmail: asString(
      pick(shopInfo.OwnerEmail, data.ownerEmail),
      defaultShopProfile.ownerEmail
    ),
    contactPhone: asString(
      pick(shopInfo.phone, data.contactPhone),
      defaultShopProfile.contactPhone
    ),
    backupPhone: asString(
      pick(shopInfo.landline, data.backupPhone),
      defaultShopProfile.backupPhone
    ),
    operatingDayFrom,
    operatingDayTo,
    openingTime: asString(
      pick(openingHours.openingTime, data.openingTime),
      defaultShopProfile.openingTime
    ),
    closingTime: asString(
      pick(openingHours.CloseTime, data.closingTime),
      defaultShopProfile.closingTime
    ),
    addressLine1: asString(
      pick(address.line1, data.addressLine1),
      defaultShopProfile.addressLine1
    ),
    area: asString(pick(address.area, data.area), defaultShopProfile.area),
    city: asString(pick(address.city, data.city), defaultShopProfile.city),
    state: asString(pick(address.state, data.state), defaultShopProfile.state),
    pinCode: asString(
      pick(address.pincode, data.pinCode),
      defaultShopProfile.pinCode
    ),
    country: asString(
      pick(address.country, data.country),
      defaultShopProfile.country
    ),
    payment: {
      fullOnline: asBoolean(
        pick(paymentOption.payFull, paymentOption.fullOnline),
        defaultPayment.fullOnline
      ),
      advanceOnline: asBoolean(
        pick(paymentOption.payAdvance, paymentOption.advanceOnline),
        defaultPayment.advanceOnline
      ),
      pickup: asBoolean(
        pick(paymentOption.payAtPickup, paymentOption.pickup),
        defaultPayment.pickup
      ),
      cod: asBoolean(
        pick(paymentOption.cashOnDelivary, paymentOption.cod),
        defaultPayment.cod
      ),
    },
    advancePercent: asNumber(
      pick(paymentOption.advancePercentage, data.advancePercent),
      50
    ),
    fulfillment: {
      pickup: asBoolean(
        pick(fulfillment.pickup, paymentOption.pickup),
        defaultFulfillment.pickup
      ),
      delivery: asBoolean(
        pick(fulfillment.delivery, paymentOption.delivery),
        defaultFulfillment.delivery
      ),
    },
    deliveryFee: asString(
      pick(fulfillment.deliveryFee, data.deliveryFee),
      defaultShopProfile.deliveryFee
    ),
    freeAbove: asString(
      pick(fulfillment.freeAbove, data.freeAbove),
      defaultShopProfile.freeAbove
    ),
    deliveryEta: asString(
      pick(fulfillment.deliveryEta, data.deliveryEta),
      defaultShopProfile.deliveryEta
    ),
    deliveryAreas: asString(
      pick(fulfillment.deliveryAreas, data.deliveryAreas),
      defaultShopProfile.deliveryAreas
    ),
    images: (() => {
      const frontImage = asImageAsset(images.frontImage);
      const interiorImage = asImageAsset(images.interiorImage);

      return {
        front: asBoolean(images.front, Boolean(frontImage)),
        interior: asBoolean(images.interior, Boolean(interiorImage)),
        frontImage,
        interiorImage,
      };
    })(),
  };
}

export function normalizeProfileStatus(value: unknown): ProfileStatus {
  return value === "completed" ? "completed" : "pending";
}

export function normalizeVerificationStatus(
  value: unknown
): VerificationStatus {
  return value === "approved" || value === "rejected" ? value : "pending";
}

export function normalizeWithdrawalAccount(
  id: string,
  data: Data
): WithdrawalAccount {
  return {
    id,
    accountHolder: asString(data.accountHolder),
    accountNumber: asString(data.accountNumber),
    ifsc: asString(data.ifsc).toUpperCase(),
    bankName: asString(data.bankName),
    branch: asString(data.branch),
    isPrimary: asBoolean(data.isPrimary, false),
  };
}
