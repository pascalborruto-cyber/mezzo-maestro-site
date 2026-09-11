/** Arborescence du site : URL françaises, courtes et stables. */
export type Page = {
  href: string;
  /** Intitulé affiché dans la navigation. */
  label: string;
  /** Intitulé long, utilisé pour les fils d’Ariane et les liens internes. */
  titre: string;
  /** Priorité dans le plan du site. */
  priorite: number;
};

export const PAGES_PRINCIPALES: Page[] = [
  { href: "/", label: "Accueil", titre: "Accueil", priorite: 1 },
  { href: "/le-spectacle", label: "Le spectacle", titre: "Le spectacle", priorite: 0.9 },
  { href: "/le-duo", label: "Le duo", titre: "Le duo", priorite: 0.8 },
  { href: "/video", label: "Vidéo", titre: "Vidéo", priorite: 0.6 },
  { href: "/photos", label: "Photos", titre: "Photos", priorite: 0.6 },
  {
    href: "/professionnels",
    label: "Professionnels",
    titre: "Espace professionnels",
    priorite: 0.9,
  },
  { href: "/contact", label: "Contact", titre: "Contact", priorite: 0.8 },
];

export const PAGES_LEGALES: Page[] = [
  { href: "/mentions-legales", label: "Mentions légales", titre: "Mentions légales", priorite: 0.2 },
  {
    href: "/confidentialite",
    label: "Confidentialité",
    titre: "Politique de confidentialité",
    priorite: 0.2,
  },
  { href: "/credits", label: "Crédits", titre: "Crédits photographiques", priorite: 0.2 },
];

export const TOUTES_LES_PAGES: Page[] = [...PAGES_PRINCIPALES, ...PAGES_LEGALES];
