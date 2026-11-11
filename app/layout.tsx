import type { Metadata } from "next";
import {
  Space_Grotesk,
  Hanuman,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const hanuman = Hanuman({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanuman",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Tamil Printers | Dashboard",
  description: "Tamil Printers merchant dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${hanuman.variable} ${plusJakarta.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
