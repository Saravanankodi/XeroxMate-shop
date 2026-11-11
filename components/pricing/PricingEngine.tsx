"use client";

import { useState } from "react";

import FinishingPricingSection from "./FinishingPricingSection";
import PaperPricingSection from "./PaperPricingSection";
import PricingHeader from "./PricingHeader";
import {
  initialFinishingItems,
  initialPaperItems,
} from "./pricing-data";
import type {
  FinishingItem,
  PaperItem,
} from "./types";

export default function PricingEngine() {
  const [paperItems, setPaperItems] =
    useState<PaperItem[]>(initialPaperItems);
  const [finishingItems, setFinishingItems] =
    useState<FinishingItem[]>(initialFinishingItems);
  const [dirty, setDirty] = useState(false);

  const handlePaperToggle = (id: string) => {
    setPaperItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
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
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
    setDirty(true);
  };

  const handleFinishingPriceChange = (
    id: string,
    value: string
  ) => {
    setFinishingItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, price: value } : item
      )
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

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 sm:py-5 xl:px-8 xl:py-6">
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {dirty
          ? "You have unsaved pricing changes"
          : "All pricing changes saved"}
      </p>

      <div className="space-y-8">
        <PricingHeader onSave={() => setDirty(false)} />

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
