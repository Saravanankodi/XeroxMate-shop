"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { ShopOverview, ShopProfile, WithdrawalAccount } from "@/types/shop";

import BankingCard from "./BankingCard";
import {
  defaultImages,
  defaultPayment,
  defaultShopProfile,
} from "./defaults";
import FulfillmentCard from "./FulfillmentCard";
import OperatingHoursCard from "./OperatingHoursCard";
import PaymentOptionsCard from "./PaymentOptionsCard";
import ShopAddressCard from "./ShopAddressCard";
import ShopIdentityCard from "./ShopIdentityCard";
import ShopImagesCard from "./ShopImagesCard";
import ShopProfileHeader from "./ShopProfileHeader";
import ShopProfileSaveBar from "./ShopProfileSaveBar";
import type {
  ProfileChangeHandler,
  ShopImages,
  VerificationStatus,
} from "./types";
import VerificationStatusCard from "./VerificationStatusCard";

export default function ShopProfileForm() {
  const [profile, setProfile] = useState<ShopProfile>(defaultShopProfile);
  const [savedProfile, setSavedProfile] = useState(defaultShopProfile);
  const [accounts, setAccounts] = useState<WithdrawalAccount[]>([]);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("pending");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState("Not saved yet");

  useEffect(() => {
    let active = true;

    async function loadShop() {
      try {
        const response = await fetch("/api/shop");

        if (!response.ok) {
          throw new Error("Could not load your shop profile.");
        }

        const data = (await response.json()) as ShopOverview;

        if (!active) {
          return;
        }

        setProfile(data.profile);
        setSavedProfile(data.profile);
        setAccounts(data.withdrawalAccounts);
        setVerificationStatus(data.verificationStatus);
        setLastSaved("All changes saved");
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load your shop profile."
          );
        }
      }
    }

    loadShop();

    return () => {
      active = false;
    };
  }, []);

  const handleProfileChange: ProfileChangeHandler = useCallback(
    (field, value) => {
      setProfile((current) => ({ ...current, [field]: value }));
      setDirty(true);
    },
    []
  );

  const handlePaymentChange = (nextPayment: typeof profile.payment) => {
    handleProfileChange("payment", nextPayment);
  };

  const handleAdvancePercentChange = (value: number) => {
    handleProfileChange("advancePercent", value);
  };

  const handleImagesChange = (nextImages: ShopImages) => {
    handleProfileChange("images", nextImages);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile.images?.frontImage || !profile.images?.interiorImage) {
      setError("Upload both shop front and interior images before saving.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/shop", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = (await response.json()) as {
        profile?: ShopProfile;
        error?: string;
      };

      if (!response.ok || !data.profile) {
        throw new Error(data.error ?? "Could not save your shop profile.");
      }

      setProfile(data.profile);
      setSavedProfile(data.profile);
      setDirty(false);
      setLastSaved("Just now");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save your shop profile."
      );
    } finally {
      setSaving(false);
    }
  }

  const handleDiscard = () => {
    setProfile(savedProfile);
    setDirty(false);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-7xl space-y-2 p-2 sm:px-2 sm:py-3 xl:space-y-2.5 xl:py-3 2xl:px-5 2xl:py-4"
    >
      <ShopProfileHeader />

      {error ? (
        <p
          role="alert"
          className="rounded-xl bg-danger-soft px-4 py-3 text-xs font-semibold text-danger-ink"
        >
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="space-y-6">
          <ShopIdentityCard value={profile} onChange={handleProfileChange} />
          <OperatingHoursCard value={profile} onChange={handleProfileChange} />
          <ShopAddressCard value={profile} onChange={handleProfileChange} />
          <BankingCard accounts={accounts} onChange={setAccounts} />
          <VerificationStatusCard status={verificationStatus} />
        </div>

        <div className="space-y-6">
          <PaymentOptionsCard
            value={profile.payment ?? defaultPayment}
            advancePercent={profile.advancePercent}
            onChange={handlePaymentChange}
            onAdvancePercentChange={handleAdvancePercentChange}
          />
          <FulfillmentCard value={profile} onChange={handleProfileChange} />
          <ShopImagesCard
            value={profile.images ?? defaultImages}
            onChange={handleImagesChange}
          />
        </div>
      </div>

      <ShopProfileSaveBar
        dirty={dirty}
        lastSaved={lastSaved}
        saving={saving}
        onDiscard={handleDiscard}
      />
    </form>
  );
}
