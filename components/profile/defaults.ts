import type {
  FulfillmentOptions,
  PaymentOptions,
  ShopImages,
  ShopProfile,
  WeekDay,
} from "@/types/shop";

export type {
  FulfillmentOptions,
  PaymentOptions,
  ShopImages,
  ShopProfile,
  VerificationStatus,
  WeekDay,
  WithdrawalAccount,
} from "@/types/shop";

export const weekDays: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const defaultPayment: PaymentOptions = {
  fullOnline: true,
  advanceOnline: true,
  pickup: true,
  cod: true,
};

export const defaultFulfillment: FulfillmentOptions = {
  pickup: true,
  delivery: true,
};

export const defaultImages: ShopImages = {
  front: false,
  interior: false,
};

export const defaultShopProfile: ShopProfile = {
  shopName: "",
  registrationCode: "",
  ownerName: "",
  ownerEmail: "",
  contactPhone: "",
  backupPhone: "",
  operatingDayFrom: "Monday",
  operatingDayTo: "Saturday",
  openingTime: "09:00 AM",
  closingTime: "11:00 PM",
  addressLine1: "",
  area: "",
  city: "",
  state: "Tamil Nadu",
  pinCode: "",
  country: "India",
  payment: defaultPayment,
  advancePercent: 50,
  fulfillment: defaultFulfillment,
  deliveryFee: "50",
  freeAbove: "500",
  deliveryEta: "2 to 4 Hours",
  deliveryAreas: "",
  images: defaultImages,
};
