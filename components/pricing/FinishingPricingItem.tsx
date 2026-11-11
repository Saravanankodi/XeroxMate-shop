import PriceInput from "./PriceInput";
import PricingCard from "./PricingCard";
import PricingToggle from "./PricingToggle";
import type { FinishingItem } from "./types";

interface FinishingPricingItemProps {
  item: FinishingItem;
  onToggle: () => void;
  onPriceChange: (value: string) => void;
}

export default function FinishingPricingItem({
  item,
  onToggle,
  onPriceChange,
}: FinishingPricingItemProps) {
  return (
    <PricingCard
      muted={!item.active}
      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <PricingToggle
          checked={item.active}
          onChange={onToggle}
          label={item.name}
        />

        <div className="min-w-0 space-y-0.5">
          <h3 className="font-heading text-base font-bold leading-[22px] text-ink">
            {item.name}
          </h3>

          <p
            className={
              item.active
                ? "text-[11px] font-semibold leading-[14px] text-muted"
                : "text-[11px] font-semibold leading-[14px] text-[#757682]"
            }
          >
            Charged per {item.unit} - ₹{item.price || "0"}
          </p>
        </div>
      </div>

      <PriceInput
        label="PRICE"
        ariaLabel={`${item.name} price`}
        value={item.price}
        muted={!item.active}
        align="right"
        onChange={onPriceChange}
      />
    </PricingCard>
  );
}
