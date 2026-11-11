import type { Metadata } from "next";

import PricingEngine from "@/components/pricing/PricingEngine";

export const metadata: Metadata = {
  title: "Print Services & Pricing | Tamil Printers",
  description:
    "Configure paper inventory, sheet rates, finishing options, and customer pricing.",
};

export default function PricingPage() {
  return <PricingEngine />;
}
