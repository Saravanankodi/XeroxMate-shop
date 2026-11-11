"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

import BankingCard from "./BankingCard";
import FulfillmentCard from "./FulfillmentCard";
import OperatingHoursCard from "./OperatingHoursCard";
import PaymentOptionsCard from "./PaymentOptionsCard";
import ShopAddressCard from "./ShopAddressCard";
import ShopIdentityCard from "./ShopIdentityCard";
import ShopImagesCard from "./ShopImagesCard";
import ShopProfileHeader from "./ShopProfileHeader";
import ShopProfileSaveBar from "./ShopProfileSaveBar";
import type {
  FulfillmentOptions,
  PaymentOptions,
  ShopImages,
} from "./types";

const initialPayment: PaymentOptions = {
  fullOnline: true,
  advanceOnline: true,
  pickup: true,
  cod: true,
};

const initialFulfillment: FulfillmentOptions = {
  pickup: true,
  delivery: true,
};

const initialImages: ShopImages = {
  front: true,
  interior: true,
};

export default function ShopProfileForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState("Last saved 2 min ago");
  const [payment, setPayment] = useState(initialPayment);
  const [fulfillment, setFulfillment] = useState(initialFulfillment);
  const [images, setImages] = useState(initialImages);

  const markDirty = () => setDirty(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDirty(false);
    setLastSaved("Just now");
  };

  const handleDiscard = () => {
    formRef.current?.reset();
    setPayment(initialPayment);
    setFulfillment(initialFulfillment);
    setImages(initialImages);
    setDirty(false);
    setLastSaved("Last saved 2 min ago");
  };

  const handlePaymentChange = (nextPayment: PaymentOptions) => {
    setPayment(nextPayment);
    markDirty();
  };

  const handleFulfillmentChange = (
    nextFulfillment: FulfillmentOptions
  ) => {
    setFulfillment(nextFulfillment);
    markDirty();
  };

  const handleImagesChange = (nextImages: ShopImages) => {
    setImages(nextImages);
    markDirty();
  };

  return (
    <form
      ref={formRef}
      onChange={markDirty}
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[1440px] px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5 xl:px-8 xl:pt-6"
    >
      <ShopProfileHeader dirty={dirty} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-6">
          <ShopIdentityCard />
          <OperatingHoursCard />
          <ShopAddressCard />
          <BankingCard />
        </div>

        <div className="space-y-6">
          <PaymentOptionsCard
            value={payment}
            onChange={handlePaymentChange}
          />
          <FulfillmentCard
            value={fulfillment}
            onChange={handleFulfillmentChange}
          />
          <ShopImagesCard
            value={images}
            onChange={handleImagesChange}
          />
        </div>
      </div>

      <ShopProfileSaveBar
        dirty={dirty}
        lastSaved={lastSaved}
        onDiscard={handleDiscard}
      />
    </form>
  );
}
