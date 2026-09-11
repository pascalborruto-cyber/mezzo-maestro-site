import Link from "next/link";

import { documents } from "@/content/site";
import { TITRE } from "@/content/spectacle";

type EncartActionProps = {
  titre?: string;
  texte?: string;
  /** Masquer le lien de téléchargement lorsqu’il est déjà présent sur la page. */
  avecDossier?: boolean;
};

/**
 * Rappel de conversion réutilisé en bas de page.
 * Un seul appel à l’action principal, un secondaire : jamais davantage.
 */
export function EncartAction({
  titre = `Et si le concert commençait chez vous ?`,
  texte = `Saisons culturelles, théâtres, centres culturels, festivals de clown, festivals jeune public et familiaux : ${TITRE} est disponible en tournée. Dates, devis et conditions sur demande.`,
  avecDossier = true,
}: EncartActionProps) {
  return (
    <section className="section" aria-labelledby="encart-action-titre">
      <div className="wrap">
        <div className="encart-action">
          <p className="surtitre">Diffusion</p>
          <h2 id="encart-action-titre">{titre}</h2>
          <p>{texte}</p>
          <div className="boutons">
            <Link className="bouton bouton--principal" href="/contact">
              Demander une date ou un devis
            </Link>
            {avecDossier ? (
              <a className="bouton bouton--secondaire" href={documents.dossierArtistique}>
                Télécharger le dossier artistique (PDF)
              </a>
            ) : (
              <Link className="bouton bouton--secondaire" href="/professionnels">
                Voir les informations professionnelles
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
