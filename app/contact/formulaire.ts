/**
 * Contrat partagé entre le formulaire (client) et l’action serveur.
 *
 * Ce module ne porte pas la directive « use server » : un fichier d’actions ne
 * peut exporter que des fonctions asynchrones, les constantes et les types
 * vivent donc ici.
 */

export type EtatFormulaire = {
  statut: "initial" | "succes" | "erreur" | "non-configure";
  message: string;
  /** Erreurs par champ, pour guider la correction. */
  erreurs: Record<string, string>;
  /** Valeurs saisies, réinjectées pour ne rien faire perdre au visiteur. */
  valeurs: Record<string, string>;
};

export const ETAT_INITIAL: EtatFormulaire = {
  statut: "initial",
  message: "",
  erreurs: {},
  valeurs: {},
};

export const CHAMPS = [
  "structure",
  "nom",
  "fonction",
  "email",
  "telephone",
  "ville",
  "typeDemande",
  "periode",
  "message",
] as const;

export type Champ = (typeof CHAMPS)[number];

export const TYPES_DEMANDE = [
  "Demander une date",
  "Demander un devis",
  "Recevoir le dossier complet",
  "Recevoir les informations techniques",
  "Autre demande",
] as const;

/** Validation d’adresse volontairement permissive : un « @ », un point ensuite. */
const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function valider(valeurs: Record<string, string>): Record<string, string> {
  const erreurs: Record<string, string> = {};

  if (valeurs.structure.length < 2) {
    erreurs.structure = "Indiquez le nom de votre structure.";
  }
  if (valeurs.nom.length < 2) {
    erreurs.nom = "Indiquez votre nom.";
  }
  if (!EMAIL_VALIDE.test(valeurs.email)) {
    erreurs.email = "Indiquez une adresse électronique valide.";
  }
  if (
    valeurs.typeDemande &&
    !TYPES_DEMANDE.includes(valeurs.typeDemande as (typeof TYPES_DEMANDE)[number])
  ) {
    erreurs.typeDemande = "Choisissez un type de demande dans la liste.";
  }
  if (valeurs.message.length < 10) {
    erreurs.message = "Décrivez votre demande en quelques mots (10 caractères minimum).";
  } else if (valeurs.message.length > 5000) {
    erreurs.message = "Le message est trop long (5 000 caractères maximum).";
  }

  return erreurs;
}
