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

export interface ShopImages {
  front: boolean;
  interior: boolean;
}
