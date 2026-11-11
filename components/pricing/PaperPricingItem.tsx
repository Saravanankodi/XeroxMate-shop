import PriceInput from "./PriceInput";
import PricingCard from "./PricingCard";
import PricingToggle from "./PricingToggle";
import type { PaperItem } from "./types";

interface PaperPricingItemProps {
  item: PaperItem;
  onToggle: () => void;
  onPriceChange: (
    field: "bwPrice" | "colorPrice",
    value: string
  ) => void;
}

export default function PaperPricingItem({
  item,
  onToggle,
  onPriceChange,
}: PaperPricingItemProps) {
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
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-bold leading-[22px] text-ink">
              {item.name}
            </h3>

            {item.active ? (
              <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-bold leading-[14px] text-[#00201D]">
                Active
              </span>
            ) : null}
          </div>

          <p
            className={
              item.active
                ? "text-xs font-medium leading-[14px] text-brand-strong"
                : "text-xs font-medium leading-[14px] text-[#757682]"
            }
          >
            {item.active
              ? "Available to customers"
              : "Hidden from customers"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <PriceInput
          label="B/W PRICE"
          ariaLabel={`${item.name} black and white price`}
          value={item.bwPrice}
          muted={!item.active}
          onChange={(value) => onPriceChange("bwPrice", value)}
        />

        <PriceInput
          label="COLOUR PRICE"
          ariaLabel={`${item.name} colour price`}
          value={item.colorPrice}
          muted={!item.active}
          onChange={(value) =>
            onPriceChange("colorPrice", value)
          }
        />
      </div>
    </PricingCard>
  );
}
