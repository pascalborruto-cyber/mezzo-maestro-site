import type { Metadata } from "next";
import Link from "next/link";

import { EntetePage } from "@/components/EntetePage";
import { FicheSpectacle } from "@/components/FicheSpectacle";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane, representationsJsonLd, spectacleJsonLd } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import {
  contact,
  documents,
  mailtoDiffusion,
  representations,
  teaserDisponible,
} from "@/content/site";
import {
  ARGUMENTS_PROGRAMMATION,
  DUO,
  PLATEAU,
  STRUCTURES_CIBLES,
  TITRE,
} from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: "Programmer le spectacle — espace pros",
  description:
    `Toutes les informations pour programmer Ça va commencer ! : genre, durée, public, plateau, musique live, ` +
    `conditions d’accueil, dossier artistique et demande de devis. Spectacle familial à programmer en saison ou en festival.`,
  path: "/professionnels",
});

/** Éléments facturés ou pris en charge séparément (usage courant du secteur). */
const FRAIS_ANNEXES = [
  "Transport aller-retour depuis la ville de départ, péages et stationnement.",
  "Deux repas, ou prise en charge directe par l’organisateur.",
  "Hébergement lorsque le retour le soir même n’est pas raisonnablement possible.",
  "Droits d’auteur (SACEM / SACD) selon le contrat, généralement à la charge de l’organisateur.",
];

export default function PageProfessionnels() {
  return (
    <>
      <JsonLd
        data={[
          spectacleJsonLd(),
          ...representationsJsonLd(),
          filAriane([{ nom: "Espace professionnels", href: "/professionnels" }]),
        ]}
      />

      <EntetePage
        surtitre="Espace professionnels"
        titre={
          <>
            Programmer
            <br />
            <em className="accent">{TITRE}</em>
          </>
        }
        chapeau="Une forme légère pour deux artistes et de la musique jouée en direct. Toutes les informations utiles à une programmation sont réunies ici."
        ariane={[{ nom: "Espace professionnels", href: "/professionnels" }]}
      />

      <section className="section" aria-labelledby="titre-fiche">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Fiche d’identité</p>
            <h2 id="titre-fiche">Le spectacle en un coup d’œil</h2>
            <FicheSpectacle />
            <p className="legende">
              Les mentions « à confirmer » seront figées après les premiers tests au plateau et la
              rédaction de la fiche technique. Elles ne sont volontairement pas estimées ici.
            </p>

            <h3 className="espace-avant">Le plateau</h3>
            <p>{PLATEAU}</p>
          </div>

          <div className="panneau">
            <h2>Documents</h2>
            <a
              className="bouton bouton--sombre bouton--pleine-largeur"
              href={documents.dossierArtistique}
            >
              Dossier artistique ({documents.dossierArtistiqueTaille})
            </a>

            {documents.ficheTechnique ? (
              <a
                className="bouton bouton--secondaire bouton--pleine-largeur"
                href={documents.ficheTechnique}
              >
                Télécharger la fiche technique (PDF)
              </a>
            ) : (
              <p className="legende">
                <span className="a-confirmer">Fiche technique en cours de rédaction</span> — elle
                sera téléchargeable ici, et peut être demandée dès maintenant par courriel.
              </p>
            )}

            <Link className="bouton bouton--secondaire bouton--pleine-largeur" href="/video">
              {teaserDisponible ? "Voir le teaser" : "Suivre la sortie du teaser"}
            </Link>

            <Link className="bouton bouton--principal bouton--pleine-largeur" href="/contact">
              Demander un devis ou une date
            </Link>

            {contact.email ? (
              <p className="legende">
                Contact direct :{" "}
                <a href={mailtoDiffusion ?? `mailto:${contact.email}`}>{contact.email}</a>
                {contact.telephone ? (
                  <>
                    {" "}
                    — <a href={`tel:${contact.telephone.replace(/\s/g, "")}`}>{contact.telephone}</a>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="legende">
                <span className="a-confirmer">
                  Coordonnées de diffusion à compléter avant publication
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section section--sombre" aria-labelledby="titre-structures">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Diffusion</p>
            <h2 id="titre-structures">
              Un spectacle familial
              <br />
              <em className="accent">conçu pour circuler.</em>
            </h2>
            <p className="chapeau">
              {TITRE} s’adresse aux structures qui cherchent une proposition visuelle, musicale et
              intergénérationnelle, portée par deux artistes professionnels et une forme scénique
              légère.
            </p>
            <ul className="liste-puces">
              {STRUCTURES_CIBLES.map((structure) => (
                <li key={structure}>{structure}</li>
              ))}
            </ul>
          </div>

          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.duoEnPied} sizes="(max-width: 56rem) 100vw, 32vw" />
            <figcaption className="legende">{VISUELS.duoEnPied.legende}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-arguments">
        <div className="wrap">
          <div className="mesure">
            <p className="surtitre">Pourquoi le programmer</p>
            <h2 id="titre-arguments">Quatre bonnes raisons</h2>
          </div>
          <ul className="grille-cartes">
            {ARGUMENTS_PROGRAMMATION.map((argument) => (
              <li className="carte" key={argument.titre}>
                <h3>{argument.titre}</h3>
                <p>{argument.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ivoire" aria-labelledby="titre-conditions">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Conditions</p>
            <h2 id="titre-conditions">Cession et frais annexes</h2>
            <p>
              Le prix de cession est communiqué sur demande : il dépend du nombre de
              représentations, de la distance et du cadre contractuel (contrat de cession ou
              embauche directe au GUSO). Une proposition chiffrée est envoyée sous quelques jours.
            </p>
            <h3>Pris en charge séparément</h3>
            <ul className="liste-puces">
              {FRAIS_ANNEXES.map((frais) => (
                <li key={frais}>{frais}</li>
              ))}
            </ul>
            <p className="legende">
              Le régime de TVA applicable dépend de la structure de production, encore en cours de
              constitution. Il est précisé sur chaque devis.
            </p>
          </div>

          <div>
            <h2>Dates de tournée</h2>
            {representations.length === 0 ? (
              <>
                <p>
                  Aucune date publique n’est confirmée à ce jour. {DUO} est disponible en tournée et
                  construit actuellement son calendrier.
                </p>
                <p className="legende">
                  <span className="a-confirmer">
                    Les dates confirmées apparaîtront ici automatiquement
                  </span>
                </p>
              </>
            ) : (
              <ul className="liste-puces">
                {representations.map((date) => (
                  <li key={`${date.debut}-${date.lieu}`}>
                    <strong>
                      {new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                        timeZone: "Europe/Paris",
                      }).format(new Date(date.debut))}
                    </strong>{" "}
                    — {date.lieu}, {date.ville}
                    {date.billetterie ? (
                      <>
                        {" "}
                        — <a href={date.billetterie}>Billetterie</a>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}

            <h3 className="espace-avant">Accueil du public scolaire et périscolaire</h3>
            <p>
              La forme se prête aux séances en temps scolaire comme aux séances tout public. Les
              conditions précises (jauge, nombre de séances par jour) seront confirmées avec la
              fiche technique.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-action-pro">
        <div className="wrap">
          <div className="encart-action">
            <p className="surtitre">Passer à l’action</p>
            <h2 id="titre-action-pro">Demander une date, un devis ou la fiche technique</h2>
            <p>
              Une seule demande suffit : indiquez votre structure, la période envisagée et le type
              de séance. Vous recevez le dossier complet, les informations techniques disponibles et
              une proposition chiffrée.
            </p>
            <div className="boutons">
              <Link className="bouton bouton--principal" href="/contact">
                Formulaire de demande
              </Link>
              <a className="bouton bouton--secondaire" href={documents.dossierArtistique}>
                Dossier artistique
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
