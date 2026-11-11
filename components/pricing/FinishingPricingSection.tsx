import { Layers } from "lucide-react";

import AddNewButton from "./AddNewButton";
import FinishingPricingItem from "./FinishingPricingItem";
import PricingSectionHeader from "./PricingSectionHeader";
import type { FinishingItem } from "./types";

interface FinishingPricingSectionProps {
  items: FinishingItem[];
  onToggle: (id: string) => void;
  onPriceChange: (id: string, value: string) => void;
  onAdd: () => void;
}

export default function FinishingPricingSection({
  items,
  onToggle,
  onPriceChange,
  onAdd,
}: FinishingPricingSectionProps) {
  const activeCount = items.filter((item) => item.active).length;

  return (
    <section className="space-y-6">
      <PricingSectionHeader
        icon={Layers}
        title="Binding & Finishing"
        subtitle="Post-print add-ons and finishing fees"
        activeCount={activeCount}
        totalCount={items.length}
      />

      <div className="space-y-4">
        {items.map((item) => (
          <FinishingPricingItem
            key={item.id}
            item={item}
            onToggle={() => onToggle(item.id)}
            onPriceChange={(value) =>
              onPriceChange(item.id, value)
            }
          />
        ))}

        <AddNewButton onClick={onAdd} />
      </div>
    </section>
  );
}
