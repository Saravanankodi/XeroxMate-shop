"use client";

import DailySettlement from "./DailySettlement";
import LiveOrders from "./LiveOrders";
import PayoutBanner from "./PayoutBanner";
import PickupTokenDesk from "./PickupTokenDesk";
import QuickRateCard from "./QuickRateCard";
import StatsCards from "./StatsCards";

import Header from "../layout/Header";
import { useMobileNav } from "../layout/MobileNavContext";

export default function DashboardContent() {
  const { openSidebar } = useMobileNav();

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-5 xl:space-y-6 xl:py-4 2xl:px-8 2xl:py-6">
      <Header onMenuClick={openSidebar} />

      <PayoutBanner />

      <StatsCards />

      <LiveOrders />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-6">
        <QuickRateCard />

        <DailySettlement />

        <div className="md:col-span-2 xl:col-span-1">
          <PickupTokenDesk />
        </div>
      </div>
    </div>
  );
}
