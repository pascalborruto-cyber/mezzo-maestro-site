import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { duoJsonLd, siteJsonLd } from "@/content/donnees-structurees";
import { metadonneesRacine } from "@/content/seo";

import "./globals.css";

export const metadata: Metadata = metadonneesRacine;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f1d1a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="lien-evitement" href="#contenu">
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <JsonLd data={[siteJsonLd(), duoJsonLd()]} />
      </body>
    </html>
  );
}
