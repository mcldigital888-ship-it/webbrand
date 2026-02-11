import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { dictionaries } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Webrrand",
    template: "%s | Webrrand",
  },
  description: "AI + data + craft. Built for measurable growth.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Webrrand",
    description: "AI + data + craft. Built for measurable growth.",
    type: "website",
    url: absoluteUrl("/"),
    siteName: "Webrrand",
    images: [{ url: absoluteUrl("/window.svg") }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webrrand",
    description: "AI + data + craft. Built for measurable growth.",
    images: [absoluteUrl("/window.svg")],
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
