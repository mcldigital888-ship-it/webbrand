import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { dictionaries } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";

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
    default: "Webrrand",
    template: "%s | Webrrand",
  },
  description: "AI + data + craft. Built for measurable growth.",
  openGraph: {
    title: "Webrrand",
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
    <html lang="it">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LocaleProvider locale="it" dict={dictionaries.it}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
