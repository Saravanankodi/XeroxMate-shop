import LedgerSection from "./LedgerSection";
import PayoutDestinationCard from "./PayoutDestinationCard";
import SettlementStrip from "./SettlementStrip";
import WalletHeader from "./WalletHeader";
import WalletKpiGrid from "./WalletKpiGrid";
import { walletTransactions } from "./wallet-data";

export default function WalletPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6">
      <WalletHeader />
      <SettlementStrip />
      <WalletKpiGrid />
      <PayoutDestinationCard />
      <LedgerSection transactions={walletTransactions} />
    </div>
  );
}
