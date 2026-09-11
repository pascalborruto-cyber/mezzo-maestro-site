/**
 * Données structurées JSON-LD.
 *
 * Règle absolue : ne jamais publier une information qui n’est pas confirmée.
 * Les champs dépendant de données manquantes (dates, coordonnées, réseaux
 * sociaux, teaser) ne sont émis que lorsqu’ils existent réellement.
 */
import { absoluteUrl, contact, representations, reseauxSociaux, teaser } from "./site";
import {
  ARTISTES,
  DUO,
  DUO_TITRE,
  DUREE_MINUTES,
  GENRE,
  RESUME_COURT,
  SOUS_TITRE,
  TITRE,
} from "./spectacle";
import { IMAGE_PARTAGE } from "./seo";

type Json = Record<string, unknown>;

const ID_DUO = absoluteUrl("/#duo");
const ID_SITE = absoluteUrl("/#site");
const ID_SPECTACLE = absoluteUrl("/le-spectacle#spectacle");

/** Durée ISO 8601 attendue par schema.org (45 minutes → « PT45M »). */
const DUREE_ISO = `PT${DUREE_MINUTES}M`;

/** Le duo, en tant que groupe d’artistes de spectacle vivant. */
export function duoJsonLd(): Json {
  const sameAs = reseauxSociaux.map((profil) => profil.url);

  return {
    "@context": "https://schema.org",
    "@type": "PerformingGroup",
    "@id": ID_DUO,
    name: DUO,
    alternateName: DUO_TITRE,
    url: absoluteUrl("/"),
    description:
      `Duo de clowns musiciens formé par deux frères, Manu et Pascal. ` +
      `Guitare, percussions et jeu clownesque, en direct sur le plateau.`,
    genre: [GENRE, "Spectacle vivant", "Théâtre musical"],
    logo: absoluteUrl("/logo-mezzo-maestro.svg"),
    image: absoluteUrl(IMAGE_PARTAGE.url),
    member: ARTISTES.map((artiste) => ({
      "@type": "Person",
      name: `${artiste.prenom} — ${artiste.personnage}`,
      givenName: artiste.prenom,
      alternateName: artiste.personnage,
      roleName: artiste.instrument,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.email || contact.telephone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Diffusion et programmation",
            availableLanguage: "fr",
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.telephone ? { telephone: contact.telephone } : {}),
          },
        }
      : {}),
  };
}

/** Le site lui-même. */
export function siteJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID_SITE,
    name: `${DUO_TITRE} — ${TITRE}`,
    url: absoluteUrl("/"),
    inLanguage: "fr-FR",
    description: RESUME_COURT,
    publisher: { "@id": ID_DUO },
  };
}

/**
 * L’œuvre elle-même. `TheaterEvent` exige une date : tant qu’aucune
 * représentation n’est confirmée, le spectacle est décrit comme une création
 * (`CreativeWork`), ce qui reste exact et valide.
 */
export function spectacleJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": ID_SPECTACLE,
    name: TITRE,
    alternativeHeadline: SOUS_TITRE,
    url: absoluteUrl("/le-spectacle"),
    inLanguage: "fr-FR",
    genre: GENRE,
    timeRequired: DUREE_ISO,
    typicalAgeRange: "7-",
    audience: { "@type": "PeopleAudience", audienceType: "Tout public à voir en famille" },
    description: RESUME_COURT,
    image: absoluteUrl(IMAGE_PARTAGE.url),
    creator: { "@id": ID_DUO },
    ...(teaser.pageUrl ? { trailer: { "@type": "VideoObject", url: teaser.pageUrl } } : {}),
  };
}

/**
 * Représentations à venir. Renvoie un tableau vide tant qu’aucune date n’est
 * confirmée : aucune date fictive n’est jamais produite.
 */
export function representationsJsonLd(): Json[] {
  return representations.map((date) => ({
    "@context": "https://schema.org",
    "@type": "TheaterEvent",
    name: `${TITRE} — ${DUO_TITRE}`,
    description: RESUME_COURT,
    startDate: date.debut,
    ...(date.fin ? { endDate: date.fin } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "fr-FR",
    image: absoluteUrl(IMAGE_PARTAGE.url),
    typicalAgeRange: "7-",
    performer: { "@id": ID_DUO },
    organizer: { "@id": ID_DUO },
    workPerformed: { "@id": ID_SPECTACLE },
    location: {
      "@type": "Place",
      name: date.lieu,
      address: {
        "@type": "PostalAddress",
        addressLocality: date.ville,
        addressCountry: "FR",
        ...(date.codePostal ? { postalCode: date.codePostal } : {}),
        ...(date.rue ? { streetAddress: date.rue } : {}),
      },
    },
    ...(date.billetterie
      ? {
          offers: {
            "@type": "Offer",
            url: date.billetterie,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  }));
}

/** Fil d’Ariane, pour les pages autres que l’accueil. */
export function filAriane(elements: { nom: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ nom: "Accueil", href: "/" }, ...elements].map((element, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: element.nom,
      item: absoluteUrl(element.href),
    })),
  };
}
