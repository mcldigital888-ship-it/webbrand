import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/components/LangToggle";
import TrackingClient from "@/components/TrackingClient";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Webbrand",
    template: "%s | Webbrand",
  },
  description: "AI + data + craft. Built for measurable growth.",
  openGraph: {
    title: "Webbrand",
    description: "AI + data + craft. Built for measurable growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LanguageProvider>
          <TrackingClient />
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-14">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
