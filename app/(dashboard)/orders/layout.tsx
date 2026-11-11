import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Tamil Printers",
  description: "Manage the live print queue and fulfillment.",
};

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
