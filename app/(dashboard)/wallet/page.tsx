import type { Metadata } from "next";

import WalletPage from "@/components/wallet/WalletPage";

export const metadata: Metadata = {
  title: "Wallet & Settlements | Tamil Printers",
  description:
    "Track earnings, manage payout accounts, review settlements, and withdraw your available balance.",
};

export default function WalletRoute() {
  return <WalletPage />;
}
