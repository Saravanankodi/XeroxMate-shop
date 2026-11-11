import { Pencil } from "lucide-react";
import Card from "../ui/Card";

const rates = [
  { name: "A4 B&W (Single side)", price: "₹0.77 / page" },
  { name: "A4 B&W (Back-to-Back)", price: "₹1.10 / sheet" },
  { name: "Color Laser Gloss", price: "₹5.00 / page" },
  { name: "Spiral Comb Binding", price: "₹25.00 / book" },
];

export default function QuickRateCard() {
  return (
    <Card className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-base font-semibold leading-[22px] text-ink">
          Quick Rate Card
        </h3>

        <button className="flex items-center gap-1 text-xs font-semibold leading-[14px] text-brand-strong transition hover:text-brand">
          <Pencil size={11} />
          Edit Rates
        </button>
      </div>

      <div className="mt-1 space-y-2">
        {rates.map((rate) => (
          <div
            key={rate.name}
            className="flex items-center justify-between gap-2 rounded-lg bg-lilac px-2 py-1"
          >
            <span className="truncate text-xs leading-4 text-ink">
              {rate.name}
            </span>

            <span className="shrink-0 text-xs font-semibold leading-4 text-navy">
              {rate.price}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
