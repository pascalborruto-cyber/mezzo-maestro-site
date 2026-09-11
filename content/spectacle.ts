/**
 * Contenu éditorial de référence.
 *
 * Les textes marqués « acté » proviennent de la référence maîtresse du projet
 * (`Reference_maitresse_Mezzo_et_Maestro.md`) et ne doivent pas être réécrits
 * sans décision explicite.
 */

/** Espace fine insécable : typographie française avant « ! » et « ? ». */
const FINE = " ";
/** Espace insécable. */
const NBSP = " ";
/** Apostrophe typographique française. */
const AP = "’";

export const DUO = "MEZZO & MAESTRO";
export const DUO_TITRE = "Mezzo & Maestro";
/** Acté. */
export const TITRE = `ÇA VA COMMENCER${FINE}!`;
/** Acté. */
export const SOUS_TITRE =
  "Un concert clownesque pour deux frères et quelques catastrophes.";
/** Acté. */
export const SIGNATURE = "Deux frères. Un concert. Beaucoup de problèmes.";
/** Acté. */
export const SIGNATURE_SECONDAIRE = `Ils sont frères. Ils sont musiciens. Ça n${AP}aide pas.`;

export const GENRE = "Clown musical";
export const DUREE_MINUTES = 45;
export const DUREE = `45${NBSP}min`;
/** Formulation officielle : jamais « spectacle pour enfants ». */
export const PUBLIC_CIBLE = `Tout public à voir en famille, dès 7${NBSP}ans`;
export const PUBLIC_COURT = `Tout public dès 7${NBSP}ans`;
export const ACCROCHE_CHIFFREE = `${DUREE} • ${PUBLIC_COURT} • ${GENRE}`;

/** Résumé court réutilisé dans les méta-descriptions et le partage social. */
export const RESUME_COURT =
  `Clown musical pour deux frères musiciens, guitare et percussions jouées en direct. ` +
  `Un spectacle tout public à voir en famille dès 7${NBSP}ans, d${AP}une durée de 45${NBSP}minutes.`;

/** Texte d’accueil acté. */
export const TEXTE_ACCUEIL = [
  `Pascal et Manu sont frères. Ils sont aussi musiciens. L${AP}un a une guitare. L${AP}autre des percussions. Ce soir, ils ont décidé de donner un concert. Ils ont tout préparé. Enfin… presque.`,
  `Un salut qui refuse de fonctionner, une guitare impossible à accorder, des baguettes indisciplinées, un solo qui n${AP}en est plus un et une vieille question${FINE}: qui est le chef${FINE}? Entre clown, musique live et complicité fraternelle, Mezzo & Maestro transforment chaque catastrophe en musique.`,
  `Un spectacle drôle, visuel et généreux où petits et grands découvrent qu${AP}à force de jouer à contretemps, deux frères peuvent finir par trouver le même rythme.`,
];

/** Biographie actée. */
export const BIOGRAPHIE = [
  `Pascal et Manu sont frères depuis toujours. Musiciens depuis presque aussi longtemps. L${AP}un joue de la guitare, l${AP}autre des percussions.`,
  `Au fil des concerts, des répétitions et des années passées à jouer ensemble, ils ont découvert une évidence${FINE}: leur rapport de frères était déjà une matière de spectacle. Celui qui veut avoir raison. Celui qui prétend n${AP}avoir rien fait. Celui qui compte. Celui qui part avant le quatre.`,
  `Les rivalités, les réflexes, la mauvaise foi et cette capacité qu${AP}ont deux frères à se comprendre sans parler sont devenus le terrain de jeu de Mezzo & Maestro.`,
  `Musiciens et artistes professionnels du spectacle vivant, Pascal et Manu mêlent musique live et langage clownesque pour créer un spectacle destiné à toutes les générations.`,
];

export type Artiste = {
  prenom: string;
  personnage: string;
  instrument: string;
  role: string;
  cote: "gauche" | "droite";
  portrait: string;
};

/**
 * Attribution définitivement confirmée : Manu est Mezzo, le percussionniste,
 * placé à gauche sur les visuels ; Pascal est Maestro, le guitariste, à droite.
 */
export const ARTISTES: Artiste[] = [
  {
    prenom: "Manu",
    personnage: "Mezzo",
    instrument: "Percussions",
    role: "Le frère instinctif",
    cote: "gauche",
    portrait: `Enthousiaste, curieux, organique. Il veut sincèrement bien faire, mais chaque consigne déclenche une idée nouvelle ou un accident. Il peut transformer une chaise, une bouteille ou un vêtement en instrument. Son désordre apparent cache une véritable intelligence du rythme.`,
  },
  {
    prenom: "Pascal",
    personnage: "Maestro",
    instrument: "Guitare",
    role: "Le frère organisé",
    cote: "droite",
    portrait: `Il rêve d${AP}un concert élégant, propre et parfaitement maîtrisé. Il explique, place, compte et corrige. Quand tout dérape, il prétend que c${AP}était prévu. Chemise blanche, petite cravate et dignité tenace${FINE}: plus il cherche à contrôler la situation, plus elle lui échappe.`,
  },
];

/** Note d’intention publique, dérivée du principe dramaturgique acté. */
export const NOTE_INTENTION = [
  `Deux frères veulent donner le plus grand concert de leur vie. Ils passent presque tout le spectacle à essayer de commencer correctement.`,
  `La musique provoque les conflits, transforme les accidents en jeu, puis finit par les réunir. Le texte est rare${FINE}: tout passe par le corps, les regards, les silences, le rythme et les vraies catastrophes musicales.`,
  `Les personnages ne jouent jamais « pour les enfants ». Ils prennent leurs problèmes très au sérieux, et c${AP}est précisément ce sérieux qui fait rire toute la salle. Le rapport de force s${AP}inverse sans cesse${FINE}: aucun des deux frères n${AP}est le sage, aucun n${AP}est l${AP}idiot.`,
  `Sous le comique, une histoire simple et universelle${FINE}: apprendre à jouer ensemble.`,
];

export type Moment = {
  numero: string;
  titre: string;
  texte: string;
};

/** Aperçu du déroulé — assez concret pour informer, sans dévoiler les chutes. */
export const MOMENTS: Moment[] = [
  {
    numero: "01",
    titre: `L${AP}entrée impossible`,
    texte: `Le guitariste entre solennellement. Un fracas hors scène annonce déjà autre chose. Le percussionniste arrive beaucoup trop chargé et reste coincé${FINE}: chaque tentative d${AP}aide aggrave la situation.`,
  },
  {
    numero: "02",
    titre: `Le salut parfait`,
    texte: `Avant de jouer, il faut saluer. Correctement. Ensemble. Départs décalés, regards dans la mauvaise direction, baguette tombée${FINE}: le salut devient une épreuve de haute précision.`,
  },
  {
    numero: "03",
    titre: `L${AP}accordage`,
    texte: `Le guitariste exige le silence absolu. Un tic, un toc, un grelot, un pied qui bat. La chasse au bruit parasite se transforme peu à peu en véritable groove guitare et percussions.`,
  },
  {
    numero: "04",
    titre: `Qui est le chef${FINE}?`,
    texte: `L${AP}un compte quatre, l${AP}autre attend cinq. Jeux de volumes, gestes inversés, rôles échangés${FINE}: les deux frères finissent par inventer un langage commun, et en font une composition.`,
  },
  {
    numero: "05",
    titre: `Le public devient l${AP}orchestre`,
    texte: `Trois groupes, trois sons simples, une minute de vraie musique collective. Le guitariste dirige très sérieusement. Le percussionniste dirige en secret dès que son frère tourne le dos.`,
  },
  {
    numero: "06",
    titre: `Enfin le concert`,
    texte: `Un vrai morceau, beau et énergique, presque sans gag, qui révèle les deux musiciens. Les accidents du début sont devenus la composition. Et puis, une dernière fois, ce bruit dans les coulisses.`,
  },
];

/** Ce que le spectacle apporte concrètement à une programmation. */
export const ARGUMENTS_PROGRAMMATION = [
  {
    titre: `Un vrai concert, joué en direct`,
    texte: `Guitare et percussions sont réellement jouées sur scène. Aucune bande-son, aucun playback${FINE}: la musique est produite devant le public, y compris pendant les catastrophes.`,
  },
  {
    titre: `Un spectacle qui réunit les générations`,
    texte: `Le jeu clownesque, le burlesque visuel et la musique fonctionnent presque sans texte. Les enfants dès 7${NBSP}ans suivent l${AP}histoire, les adultes lisent le rapport de force fraternel. Personne n${AP}est infantilisé.`,
  },
  {
    titre: `Une forme légère et mobile`,
    texte: `Deux artistes, un plateau dépouillé, quelques objets sonores. Une forme conçue pour circuler${FINE}: salles de spectacle, saisons culturelles, festivals, centres culturels et médiathèques équipées.`,
  },
  {
    titre: `Un moment participatif maîtrisé`,
    texte: `Une séquence fait de la salle un orchestre, sans mise en danger du public et sans rupture de la dramaturgie. Elle laisse un souvenir collectif fort à la sortie.`,
  },
];

/** Structures visées par la diffusion (référence maîtresse). */
export const STRUCTURES_CIBLES = [
  "Théâtres et salles de spectacle",
  "Saisons culturelles municipales et services culturels",
  "Centres culturels et centres sociaux",
  "Festivals de clown et arts de la rue",
  "Festivals jeune public et familiaux",
  "Médiathèques équipées et associations culturelles",
  "Comités des fêtes et événements familiaux",
];

/** Plateau et accessoires, tels qu’actés. */
export const PLATEAU =
  `Guitare, petit dispositif de percussions (cajón, caisse claire ou équivalent), cloche, shaker, wood-block, ` +
  `deux baguettes, chaise, petit tapis et quelques objets sonores. Un univers de concert ambulant légèrement ` +
  `défraîchi, entre musiciens de rue, petit cabaret et cirque contemporain.`;
