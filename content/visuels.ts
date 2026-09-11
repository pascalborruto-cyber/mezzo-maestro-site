/**
 * Visuels du site.
 *
 * Photographies de la séance en studio 2026, © Borruto. Les dérivés
 * (AVIF, WebP, JPEG) sont produits par `scripts/build-images.mjs` et
 * versionnés dans `public/images/`.
 *
 * Placement conforme à la référence maîtresse : Mezzo (Manu, percussions) à
 * gauche, Maestro (Pascal, guitare) à droite.
 *
 * Les fichiers sources sont les tirages pleine résolution du photographe
 * (environ 4 725 px de large). Les largeurs et les dimensions ci-dessous
 * reflètent `public/images/manifest.json` : les deux se régénèrent ensemble
 * en relançant `node scripts/build-images.mjs`.
 */
export type Visuel = {
  slug: string;
  /** Largeurs réellement générées, de la plus petite à la plus grande. */
  largeurs: number[];
  /** Dimensions intrinsèques de l’image d’origine, pour réserver la place. */
  largeur: number;
  hauteur: number;
  /** Texte alternatif : décrit précisément la scène et la place de chacun. */
  alt: string;
  /** Légende affichée sous l’image. */
  legende: string;
  /** Crédit photographique, affiché sur la page dédiée. */
  credit: string;
  /**
   * Ancrage vertical du recadrage en `.figure--cadree` (0–100, du haut vers
   * le bas de la photographie source). Par défaut, le CSS ancre haut (22 %)
   * pour préserver les visages ; à surcharger uniquement quand cette valeur
   * coupe les pieds des artistes sur cette photographie précise.
   */
  cadrageVertical?: number;
};

const AP = "’";
const CREDIT = "Borruto";

export const VISUELS = {
  /** Bandeau d’accueil et carte de partage social. */
  duoConcert: {
    slug: "mezzo-maestro-clown-musical-concert",
    largeurs: [640, 1024, 1536, 2048],
    largeur: 4724,
    hauteur: 4098,
    alt: `Mezzo et Maestro en pied face à l${AP}objectif : Mezzo, à gauche, lève ses baguettes au-dessus de son tambourin ; Maestro, à droite, en costume sombre et cravate rouge, tient sa guitare contre lui. Tous deux chantent, très sérieusement.`,
    legende: `Le concert peut commencer. En principe.`,
    credit: CREDIT,
    /* S'applique uniquement à l'usage en `.figure--cadree` (galerie) : le
       bandeau d'accueil (`.bandeau__media`) a son propre cadrage, non
       affecté par ce champ. */
    cadrageVertical: 43,
  },
  duoEnPied: {
    slug: "mezzo-maestro-clown-musical-duo",
    largeurs: [640, 1024, 1536],
    largeur: 4724,
    hauteur: 4117,
    alt: `Le duo de clowns musiciens Mezzo & Maestro sur scène : Mezzo, à gauche, casquette plate et bretelles, chante en tenant un tambourin ; Maestro, à droite, en costume sombre et cravate rouge, lève le manche de sa guitare. Grosse caisse, cymbale et cajón posés à leurs pieds, sur un plateau sombre.`,
    legende: `Mezzo aux percussions, Maestro à la guitare : le duo au complet.`,
    credit: CREDIT,
    cadrageVertical: 50,
  },
  duelMusical: {
    slug: "mezzo-maestro-clown-musical-duel",
    largeurs: [640, 1024, 1536],
    largeur: 4725,
    hauteur: 4158,
    alt: `Duel musical entre les deux frères : Mezzo, à gauche, brandit ses deux baguettes ; Maestro, à droite, plie les genoux et attaque un accord de guitare. Les regards se croisent.`,
    legende: `Le duel musical : chacun veut avoir le dernier mot, et personne ne parle.`,
    credit: CREDIT,
    cadrageVertical: 44,
  },
  baguetteBlessee: {
    slug: "mezzo-maestro-clown-musical-baguette-blessee",
    largeurs: [640, 1024, 1536],
    largeur: 4724,
    hauteur: 4495,
    alt: `Scène de la baguette blessée : Mezzo, assis sur son cajón, tend une baguette de percussion avec précaution ; Maestro, guitare au ventre, se penche pour la soigner avec un mouchoir blanc. Une seconde baguette est tombée au sol.`,
    legende: `La baguette blessée : le moment le plus grave du spectacle, et le plus tendre.`,
    credit: CREDIT,
    cadrageVertical: 92,
  },
  salutDecale: {
    slug: "mezzo-maestro-clown-musical-salut",
    largeurs: [640, 1024, 1536],
    largeur: 4725,
    hauteur: 4238,
    alt: `Salut décalé : Maestro, à droite, s${AP}incline profondément avec sa guitare et tend la main vers son frère, tandis que Mezzo, à gauche, est resté parfaitement droit, baguette à la main. Une baguette gît au sol entre eux.`,
    legende: `Le salut parfaitement synchronisé, deuxième tentative.`,
    credit: CREDIT,
    cadrageVertical: 40,
  },
  portraitMezzo: {
    slug: "mezzo-clown-musicien-percussions-portrait",
    largeurs: [480, 768, 1024, 1536],
    largeur: 4464,
    hauteur: 4725,
    alt: `Portrait de Manu en Mezzo : casquette plate, chemise ivoire aux manches retroussées, bretelles de cuir, mains sur les hanches, debout à côté de son cajón, de sa grosse caisse et de sa cymbale.`,
    legende: `Manu est Mezzo, le percussionniste.`,
    credit: CREDIT,
  },
  portraitMaestro: {
    slug: "maestro-clown-musicien-guitare-portrait",
    largeurs: [480, 768, 1024, 1536],
    largeur: 3590,
    hauteur: 4725,
    alt: `Portrait de Pascal en Maestro : costume sombre, chemise blanche et cravate rouge brique, guitare tenue contre lui, une main ouverte vers le public et des chaussettes rouges qui dépassent du pantalon.`,
    legende: `Pascal est Maestro, le guitariste.`,
    credit: CREDIT,
  },
} satisfies Record<string, Visuel>;

/** Ordre d’affichage de la galerie de la page Photos. */
export const GALERIE: Visuel[] = [
  VISUELS.portraitMezzo,
  VISUELS.duoEnPied,
  VISUELS.duelMusical,
  VISUELS.salutDecale,
  VISUELS.baguetteBlessee,
  VISUELS.portraitMaestro,
  VISUELS.duoConcert,
];

/** Crédits photographiques distincts, pour la page dédiée. */
export const CREDITS_PHOTOGRAPHIQUES = [...new Set(GALERIE.map((visuel) => visuel.credit))];

/** Une image est en orientation portrait lorsqu’elle est plus haute que large. */
export const estPortrait = (visuel: Visuel) => visuel.hauteur > visuel.largeur;
