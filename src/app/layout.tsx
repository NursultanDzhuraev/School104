import type { Metadata } from "next";
import "@/styles/globals.css";
import { school } from "@/data/site";
export const metadata: Metadata = {
  metadataBase: new URL(school.siteUrl),
  title: { default: school.name.kg, template: "%s — №104 ЖББМ" },
  description: "№104 жалпы билим берүүчү мектептин сайты",
  robots: school.demoMode
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ky">
      <body>{children}</body>
    </html>
  );
}
