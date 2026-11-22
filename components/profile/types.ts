import type { ShopProfile } from "@/types/shop";

export type {
  FulfillmentOptions,
  PaymentOptions,
  ShopImages,
  ShopProfile,
  VerificationStatus,
  WeekDay,
  WithdrawalAccount,
} from "@/types/shop";

export interface ProfileChangeHandler {
  <K extends keyof ShopProfile>(field: K, value: ShopProfile[K]): void;
}
