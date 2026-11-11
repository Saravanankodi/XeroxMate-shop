import type { Metadata } from "next";

import ShopProfileForm from "@/components/profile/ShopProfileForm";

export const metadata: Metadata = {
  title: "Shop Profile & Location | Tamil Printers",
  description:
    "Manage your storefront information, operating hours, banking details, and customer-facing photos.",
};

export default function ShopProfilePage() {
  return <ShopProfileForm />;
}
