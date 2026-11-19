"use client";

import DailySettlement from "./DailySettlement";
import LiveOrders from "./LiveOrders";
import PayoutBanner from "./PayoutBanner";
import PickupTokenDesk from "./PickupTokenDesk";
import QuickRateCard from "./QuickRateCard";
import ShopOnboarding from "./ShopOnboarding";
import StatsCards from "./StatsCards";

import Header from "../layout/Header";
import { useMobileNav } from "../layout/MobileNavContext";

export default function DashboardContent() {
  const { openSidebar } = useMobileNav();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-3 p-3 sm:px-2 sm:py-3 xl:space-y-4 xl:py-3 2xl:px-5 2xl:py-4">
      <Header onMenuClick={openSidebar} />

      {/* <ShopOnboarding /> */}

      <StatsCards />

      <LiveOrders />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-6 mt-6">
        <QuickRateCard />

        <DailySettlement />

        <div className="md:col-span-2 xl:col-span-1">
          <PickupTokenDesk />
        </div>
      </div>
    </div>
  );
}
