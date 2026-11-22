export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface PaymentOptions {
  fullOnline: boolean;
  advanceOnline: boolean;
  pickup: boolean;
  cod: boolean;
}

export interface FulfillmentOptions {
  pickup: boolean;
  delivery: boolean;
}

export interface ShopImageAsset {
  url: string;
  publicId: string;
  fileName: string;
  size: number;
  width: number;
  height: number;
}

export interface ShopImages {
  front: boolean;
  interior: boolean;
  frontImage?: ShopImageAsset;
  interiorImage?: ShopImageAsset;
}

export interface PaperItem {
  id: string;
  name: string;
  active: boolean;
  bwPrice: string;
  colorPrice: string;
}

export type FinishingUnit = "document set" | "page";

export interface FinishingItem {
  id: string;
  name: string;
  unit: FinishingUnit;
  active: boolean;
  price: string;
}

export interface ShopProfile {
  shopName: string;
  registrationCode: string;
  ownerName: string;
  ownerEmail: string;
  contactPhone: string;
  backupPhone: string;
  operatingDayFrom: WeekDay;
  operatingDayTo: WeekDay;
  openingTime: string;
  closingTime: string;
  addressLine1: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  payment: PaymentOptions;
  advancePercent: number;
  fulfillment: FulfillmentOptions;
  deliveryFee: string;
  freeAbove: string;
  deliveryEta: string;
  deliveryAreas: string;
  images: ShopImages;
}

export interface ShopInfoDocument {
  name: string;
  licinceCode: string;
  ownerName: string;
  OwnerEmail: string;
  phone: string;
  landline: string;
}

export interface OpeningHoursDocument {
  formDay: string;
  toDay: string;
  openingTime: string;
  CloseTime: string;
}

export interface AddressDocument {
  line1: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PaymentOptionDocument {
  payFull: boolean;
  payAdvance: boolean;
  payAtPickup: boolean;
  cashOnDelivary: boolean;
  advancePercentage: number;
}

export interface FulfillmentDocument {
  pickup: boolean;
  delivery: boolean;
  deliveryFee: string;
  freeAbove: string;
  deliveryEta: string;
  deliveryAreas: string;
}

export interface PricingAndServiceDocument {
  serviceType: string;
  isActive: boolean;
  price: string;
  itemId: string;
  variant: "bw" | "color" | "finishing";
  name: string;
  unit?: FinishingUnit;
}

export interface WithdrawalAccount {
  id: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
  isPrimary: boolean;
}

export type VerificationStatus = "pending" | "approved" | "rejected";
export type ProfileStatus = "pending" | "completed";

export interface ShopOverview {
  profile: ShopProfile;
  profileCompleted: boolean;
  profilStatus: ProfileStatus;
  hasPricing: boolean;
  verificationStatus: VerificationStatus;
  withdrawalAccounts: WithdrawalAccount[];
}
