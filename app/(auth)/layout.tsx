import { ClipboardList, SlidersHorizontal, Wallet, Zap } from "lucide-react";

import { Label, ServiceCard } from "@/components/ui";

const services = [
  {
    title: "Live Order Queue",
    description: "Receive print jobs, pick pickup tokens and hand over at the counter.",
    icon: ClipboardList,
  },
  {
    title: "Instant Settlements",
    description: "Track daily earnings and payouts straight from your wallet.",
    icon: Wallet,
  },
  {
    title: "Pricing Control",
    description: "Set paper, colour and finishing rates that work for your shop.",
    icon: SlidersHorizontal,
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-surface p-5 lg:flex-row lg:gap-10 lg:py-10">
      <div className="w-full max-w-2xl hidden sm:block space-y-5 lg:flex-1">
        <Label dot dotColor="bg-brand">
          Tamil Nadu&apos;s Digital Printing Partner Network
        </Label>

        <h2 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-[56px] lg:leading-[62px]">
          Run your print shop.
          <span className="block text-brand">Skip the counter chaos.</span>
        </h2>

        <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Manage incoming print jobs, publish transparent student rates, collect
          payments and keep every order moving from upload to pickup.
        </p>

        <aside className="mt-5 grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon }) => (
            <ServiceCard
              key={title}
              title={title}
              description={description}
              icon={icon}
            />
          ))}
        </aside>

        <div className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-mint-ink">
          <Zap size={14} />
          Built for high-speed Xerox counters
        </div>
      </div>

      <main className="w-full sm:w-2/5">{children}</main>
    </section>
  );
}
