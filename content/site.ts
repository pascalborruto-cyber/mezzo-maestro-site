/**
 * Configuration du site MEZZO & MAESTRO.
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  À COMPLÉTER AVANT PUBLICATION                                            │
 * │  Rechercher « A_COMPLETER » dans le projet pour retrouver tous les        │
 * │  points d'information encore manquants.                                   │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * Tout se règle par variables d'environnement (fichier `.env.local`, ou
 * variables du service d'hébergement). Tant qu'une valeur n'est pas fournie,
 * le site n'invente rien : il affiche un état « à confirmer » explicite et
 * n'émet aucune donnée structurée mensongère.
 *
 * Voir `.env.example` pour la liste complète.
 */

/**
 * Marqueur unique des informations manquantes.
 * Le domaine `.example` est réservé par l'IANA : il ne peut correspondre à
 * aucun site réel, ce qui rend une publication mal configurée immédiatement
 * détectable (et non indexable, cf. `app/robots.ts`).
 */
export const A_COMPLETER_ORIGIN = "https://domaine-a-definir.example";

const readEnv = (value: string | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const rawOrigin = readEnv(process.env.NEXT_PUBLIC_SITE_URL) ?? A_COMPLETER_ORIGIN;

/** Origine canonique du site, sans barre oblique finale. */
export const siteOrigin = rawOrigin.replace(/\/+$/, "");

/** `true` tant que le nom de domaine définitif n'a pas été renseigné. */
export const domaineAConfigurer = siteOrigin === A_COMPLETER_ORIGIN;

export const absoluteUrl = (path: string): string =>
  `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;

/** Coordonnées de diffusion — A_COMPLETER tant que `null`. */
export const contact = {
  /** Adresse électronique publique de diffusion. */
  email: readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** Téléphone au format international, ex. « +33 6 12 34 56 78 ». */
  telephone: readEnv(process.env.NEXT_PUBLIC_CONTACT_TELEPHONE),
  /** Nom de la structure de production (association, compagnie…). */
  structure: readEnv(process.env.NEXT_PUBLIC_CONTACT_STRUCTURE),
  /** Ville de départ, utilisée plus tard pour le référencement local. */
  villeDepart: readEnv(process.env.NEXT_PUBLIC_VILLE_DEPART),
  /** Zone de tournée annoncée, ex. « Occitanie et régions limitrophes ». */
  zoneTournee: readEnv(process.env.NEXT_PUBLIC_ZONE_TOURNEE),
} as const;

export const contactRenseigne = contact.email !== null || contact.telephone !== null;

/** Lien `mailto:` prêt à l'emploi, ou `null` si l'adresse n'est pas connue. */
export const mailtoDiffusion = contact.email
  ? `mailto:${contact.email}?subject=${encodeURIComponent(
      "Programmation — Mezzo & Maestro / Ça va commencer !",
    )}`
  : null;

/**
 * Teaser vidéo. Renseigner `NEXT_PUBLIC_TEASER_EMBED_URL` avec l'URL
 * d'intégration (YouTube « /embed/… » ou Vimeo « player.vimeo.com/video/… »)
 * une fois le teaser tourné et mis en ligne.
 */
export const teaser = {
  embedUrl: readEnv(process.env.NEXT_PUBLIC_TEASER_EMBED_URL),
  /** Page publique de la vidéo, pour les données structurées et le partage. */
  pageUrl: readEnv(process.env.NEXT_PUBLIC_TEASER_PAGE_URL),
} as const;

export const teaserDisponible = teaser.embedUrl !== null;

/** Réseaux sociaux — laisser `null` tant qu'un profil n'existe pas réellement. */
export const reseauxSociaux = [
  { nom: "Instagram", url: readEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
  { nom: "Facebook", url: readEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL) },
  { nom: "YouTube", url: readEnv(process.env.NEXT_PUBLIC_YOUTUBE_URL) },
].filter((profil): profil is { nom: string; url: string } => profil.url !== null);

/** Documents téléchargeables réellement présents dans `public/`. */
export const documents = {
  dossierArtistique: "/dossier-artistique-mezzo-maestro-ca-va-commencer.pdf",
  /** Poids indiqué aux visiteurs ; à réactualiser si le PDF est remplacé. */
  dossierArtistiqueTaille: "PDF, 493 Ko",
  /** A_COMPLETER : déposer le PDF dans `public/` puis renseigner le chemin. */
  ficheTechnique: readEnv(process.env.NEXT_PUBLIC_FICHE_TECHNIQUE_URL),
} as const;

/**
 * Données techniques et conditions d’accueil.
 *
 * A_COMPLETER : ces éléments seront figés après les tests au plateau et la
 * rédaction de la fiche technique. Tant qu’une valeur vaut `null`, le site
 * affiche « à confirmer » plutôt qu’une caractéristique inventée.
 */
export const technique = {
  /** Jauge maximale conseillée, ex. « 300 personnes ». */
  jauge: readEnv(process.env.NEXT_PUBLIC_JAUGE),
  /** Implantation, ex. « Salle et extérieur (sol plat, sans vent) ». */
  implantation: readEnv(process.env.NEXT_PUBLIC_IMPLANTATION),
  /** Ouverture et profondeur minimales du plateau. */
  plateauMinimum: readEnv(process.env.NEXT_PUBLIC_PLATEAU_MINIMUM),
  /** Temps de montage, ex. « 1 h 30 ». */
  montage: readEnv(process.env.NEXT_PUBLIC_MONTAGE),
  /** Temps de démontage. */
  demontage: readEnv(process.env.NEXT_PUBLIC_DEMONTAGE),
  /** Besoins son et lumière. */
  sonLumiere: readEnv(process.env.NEXT_PUBLIC_SON_LUMIERE),
  /** Nombre de représentations possibles par jour. */
  representationsParJour: readEnv(process.env.NEXT_PUBLIC_REPRESENTATIONS_PAR_JOUR),
} as const;

/**
 * Représentations à venir.
 *
 * Ce tableau est volontairement vide : aucune date n'est confirmée à ce jour.
 * Ajouter une entrée suffit à faire apparaître l'agenda sur le site et à
 * produire des données structurées `TheaterEvent` valides.
 *
 * @example
 * export const representations: Representation[] = [
 *   {
 *     debut: "2027-03-14T20:30:00+01:00",
 *     lieu: "Théâtre municipal",
 *     ville: "Toulouse",
 *     codePostal: "31000",
 *     rue: "1 place du Théâtre",
 *     billetterie: "https://exemple.fr/billetterie",
 *   },
 * ];
 */
export type Representation = {
  /** Date et heure de début au format ISO 8601, avec fuseau horaire. */
  debut: string;
  /** Date et heure de fin ISO 8601 (facultatif). */
  fin?: string;
  lieu: string;
  ville: string;
  codePostal?: string;
  rue?: string;
  billetterie?: string;
};

export const representations: Representation[] = [];

/**
 * Mentions légales — informations administratives à obtenir avant publication.
 * Tant qu'une valeur est `null`, la page affiche un encadré « à compléter »
 * plutôt qu'un texte juridique inventé.
 */
export const mentionsLegales = {
  raisonSociale: readEnv(process.env.NEXT_PUBLIC_RAISON_SOCIALE),
  formeJuridique: readEnv(process.env.NEXT_PUBLIC_FORME_JURIDIQUE),
  adresse: readEnv(process.env.NEXT_PUBLIC_ADRESSE_STRUCTURE),
  siret: readEnv(process.env.NEXT_PUBLIC_SIRET),
  licenceSpectacle: readEnv(process.env.NEXT_PUBLIC_LICENCE_SPECTACLE),
  directeurPublication: readEnv(process.env.NEXT_PUBLIC_DIRECTEUR_PUBLICATION),
  hebergeur: readEnv(process.env.NEXT_PUBLIC_HEBERGEUR),
} as const;
