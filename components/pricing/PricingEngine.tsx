"use client";

import { useEffect, useState } from "react";

import FinishingPricingSection from "./FinishingPricingSection";
import PaperPricingSection from "./PaperPricingSection";
import PricingHeader from "./PricingHeader";
import {
  initialFinishingItems,
  initialPaperItems,
} from "./pricing-data";
import type { FinishingItem, PaperItem } from "./types";

export default function PricingEngine() {
  const [paperItems, setPaperItems] =
    useState<PaperItem[]>(initialPaperItems);
  const [finishingItems, setFinishingItems] =
    useState<FinishingItem[]>(initialFinishingItems);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPricing() {
      try {
        const response = await fetch("/api/shop/pricing");

        if (!response.ok) {
          throw new Error("Could not load saved pricing.");
        }

        const data = (await response.json()) as {
          paperItems?: PaperItem[];
          finishingItems?: FinishingItem[];
        };

        if (!active) {
          return;
        }

        if (data.paperItems?.length) {
          setPaperItems(data.paperItems);
        }

        if (data.finishingItems?.length) {
          setFinishingItems(data.finishingItems);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load saved pricing."
          );
        }
      }
    }

    loadPricing();

    return () => {
      active = false;
    };
  }, []);

  const handlePaperToggle = (id: string) => {
    setPaperItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    setDirty(true);
  };

  const handlePaperPriceChange = (
    id: string,
    field: "bwPrice" | "colorPrice",
    value: string
  ) => {
    setPaperItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    setDirty(true);
  };

  const handleAddPaper = () => {
    setPaperItems((items) => [
      ...items,
      {
        id: `paper-${Date.now()}`,
        name: `New Paper Type ${items.length + 1}`,
        active: false,
        bwPrice: "0",
        colorPrice: "0",
      },
    ]);
    setDirty(true);
  };

  const handleFinishingToggle = (id: string) => {
    setFinishingItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    setDirty(true);
  };

  const handleFinishingPriceChange = (id: string, value: string) => {
    setFinishingItems((items) =>
      items.map((item) => (item.id === id ? { ...item, price: value } : item))
    );
    setDirty(true);
  };

  const handleAddFinishing = () => {
    setFinishingItems((items) => [
      ...items,
      {
        id: `finishing-${Date.now()}`,
        name: `New Finishing Option ${items.length + 1}`,
        unit: "document set",
        active: false,
        price: "0",
      },
    ]);
    setDirty(true);
  };

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/shop/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperItems, finishingItems }),
      });

      if (!response.ok) {
        throw new Error("Could not save pricing changes.");
      }

      setDirty(false);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save pricing changes."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-2 p-2 sm:px-2 sm:py-3 xl:space-y-2.5 xl:py-3 2xl:px-5 2xl:py-4">
      <p className="sr-only" role="status" aria-live="polite">
        {dirty ? "You have unsaved pricing changes" : "All pricing changes saved"}
      </p>

      {error ? (
        <p
          role="alert"
          className="rounded-xl bg-danger-soft px-4 py-3 text-xs font-semibold text-danger-ink"
        >
          {error}
        </p>
      ) : null}

      <div className="space-y-4">
        <PricingHeader onSave={handleSave} saving={saving} />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <PaperPricingSection
            items={paperItems}
            onToggle={handlePaperToggle}
            onPriceChange={handlePaperPriceChange}
            onAdd={handleAddPaper}
          />

          <FinishingPricingSection
            items={finishingItems}
            onToggle={handleFinishingToggle}
            onPriceChange={handleFinishingPriceChange}
            onAdd={handleAddFinishing}
          />
        </div>
      </div>
    </div>
  );
}
