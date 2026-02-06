import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Webrrand builds revenue systems that turn visitors into paying customers — automatically.",
  openGraph: {
    title: "Webrrand",
    description:
      "Webrrand builds revenue systems that turn visitors into paying customers — automatically.",
    type: "website",
  },
};

export default function Home() {
  redirect("/it");
}
