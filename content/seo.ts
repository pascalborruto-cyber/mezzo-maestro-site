import type { Metadata } from "next";

import { absoluteUrl, domaineAConfigurer, siteOrigin } from "./site";
import { DUO_TITRE, RESUME_COURT, SOUS_TITRE, TITRE } from "./spectacle";

/** Image de partage social générée par `scripts/build-images.mjs`. */
export const IMAGE_PARTAGE = {
  url: "/images/partage-mezzo-maestro-ca-va-commencer.jpg",
  width: 1200,
  height: 630,
  alt: `${DUO_TITRE} — ${TITRE} — ${SOUS_TITRE}`,
} as const;

/** Suffixe ajouté par le gabarit de titre défini dans le gabarit racine. */
const SUFFIXE = ` | ${DUO_TITRE}`;

type PageMetaOptions = {
  /**
   * Titre de l’onglet, court et sans le nom du duo : celui-ci est ajouté
   * automatiquement par le gabarit (`%s | Mezzo & Maestro`).
   */
  title: string;
  /** Titre complet, quand le gabarit ne convient pas (page d’accueil). */
  titreAbsolu?: string;
  description: string;
  /** Chemin absolu commençant par « / ». */
  path: string;
  /** Image de partage spécifique à la page (facultatif). */
  image?: { url: string; width: number; height: number; alt: string };
  /** Retirer la page des résultats de recherche (404, pages techniques). */
  noindex?: boolean;
};

/**
 * Construit des métadonnées cohérentes pour une page : titre unique,
 * description unique, URL canonique, Open Graph et Twitter Card.
 */
export function pageMetadata({
  title,
  titreAbsolu,
  description,
  path,
  image = IMAGE_PARTAGE,
  noindex = false,
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  const titreComplet = titreAbsolu ?? `${title}${SUFFIXE}`;

  return {
    title: titreAbsolu ? { absolute: titreAbsolu } : title,
    description,
    alternates: { canonical: url },
    // Tant que le domaine définitif n’est pas configuré, on n’autorise pas
    // l’indexation : cela évite de publier des URL canoniques inexploitables.
    robots:
      noindex || domaineAConfigurer
        ? { index: false, follow: !noindex }
        : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: `${DUO_TITRE} — ${TITRE}`,
      url,
      title: titreComplet,
      description,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: titreComplet,
      description,
      images: [image.url],
    },
  };
}

/** Métadonnées communes déclarées une seule fois dans le gabarit racine. */
export const metadonneesRacine: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: `${DUO_TITRE} — ${TITRE}`,
    template: `%s${SUFFIXE}`,
  },
  description: RESUME_COURT,
  applicationName: DUO_TITRE,
  authors: [{ name: DUO_TITRE }],
  creator: DUO_TITRE,
  publisher: DUO_TITRE,
  category: "Spectacle vivant",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
};
