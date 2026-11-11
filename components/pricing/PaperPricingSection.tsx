import { FileText } from "lucide-react";

import AddNewButton from "./AddNewButton";
import PaperPricingItem from "./PaperPricingItem";
import PricingSectionHeader from "./PricingSectionHeader";
import type { PaperItem } from "./types";

interface PaperPricingSectionProps {
  items: PaperItem[];
  onToggle: (id: string) => void;
  onPriceChange: (
    id: string,
    field: "bwPrice" | "colorPrice",
    value: string
  ) => void;
  onAdd: () => void;
}

export default function PaperPricingSection({
  items,
  onToggle,
  onPriceChange,
  onAdd,
}: PaperPricingSectionProps) {
  const activeCount = items.filter((item) => item.active).length;

  return (
    <section className="space-y-6">
      <PricingSectionHeader
        icon={FileText}
        title="Paper Types & Pricing"
        subtitle="Manage paper availability, single-sheet B/W and Colour customer pricing"
        activeCount={activeCount}
        totalCount={items.length}
      />

      <div className="space-y-4">
        {items.map((item) => (
          <PaperPricingItem
            key={item.id}
            item={item}
            onToggle={() => onToggle(item.id)}
            onPriceChange={(field, value) =>
              onPriceChange(item.id, field, value)
            }
          />
        ))}

        <AddNewButton onClick={onAdd} />
      </div>
    </section>
  );
}
