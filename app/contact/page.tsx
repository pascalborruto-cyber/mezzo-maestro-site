import type { Metadata } from "next";
import Link from "next/link";

import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { contact, contactRenseigne, documents, mailtoDiffusion } from "@/content/site";
import { DUO, DUO_TITRE, TITRE } from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

import { FormulaireContact } from "./FormulaireContact";

export const metadata: Metadata = pageMetadata({
  title: "Contact et diffusion",
  description:
    `Contacter Mezzo & Maestro pour programmer Ça va commencer ! : demande de date, de devis, du dossier complet ` +
    `ou des informations techniques. Spectacle de clown musical disponible en tournée.`,
  path: "/contact",
});

export default function PageContact() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Contact", href: "/contact" }])} />

      <EntetePage
        surtitre="Diffusion et contact"
        titre={
          <>
            Et si le concert
            <br />
            <em className="accent">commençait chez vous ?</em>
          </>
        }
        chapeau="Une date, un devis, le dossier complet ou les informations techniques : une seule demande suffit."
        ariane={[{ nom: "Contact", href: "/contact" }]}
      />

      <section className="section" aria-labelledby="titre-formulaire">
        <div className="wrap duo-colonnes">
          <div>
            <h2 id="titre-formulaire">Formulaire de demande</h2>
            <p>
              Décrivez brièvement votre projet : période envisagée, type de séance, jauge et
              contraintes de lieu. Vous recevez en retour le dossier complet, les informations
              techniques disponibles et une proposition chiffrée.
            </p>
            <FormulaireContact />
          </div>

          <div className="panneau">
            <h2>Contact direct</h2>

            {contactRenseigne ? (
              <ul className="liste-puces">
                {contact.structure ? <li>{contact.structure}</li> : null}
                {contact.email ? (
                  <li>
                    <a href={mailtoDiffusion ?? `mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                ) : null}
                {contact.telephone ? (
                  <li>
                    <a href={`tel:${contact.telephone.replace(/\s/g, "")}`}>{contact.telephone}</a>
                  </li>
                ) : null}
                {contact.villeDepart ? <li>Départ en tournée : {contact.villeDepart}</li> : null}
                {contact.zoneTournee ? <li>Zone de tournée : {contact.zoneTournee}</li> : null}
              </ul>
            ) : (
              <div className="avis">
                <p>
                  <strong>Coordonnées en cours de finalisation.</strong> L’adresse électronique et
                  le téléphone de diffusion seront publiés ici dès que la structure de production
                  sera constituée. Aucune coordonnée provisoire n’est affichée pour ne pas vous
                  faire écrire dans le vide.
                </p>
              </div>
            )}

            <h3>Ce que vous pouvez demander</h3>
            <ul className="liste-puces">
              <li>Une date ou une option sur une période.</li>
              <li>Un devis adapté à votre configuration.</li>
              <li>Le dossier artistique complet.</li>
              <li>Les informations techniques et la fiche technique.</li>
              <li>Les visuels en haute définition pour vos supports.</li>
            </ul>

            <a
              className="bouton bouton--sombre bouton--pleine-largeur"
              href={documents.dossierArtistique}
            >
              Dossier artistique ({documents.dossierArtistiqueTaille})
            </a>
            <Link className="bouton bouton--secondaire bouton--pleine-largeur" href="/professionnels">
              Informations professionnelles
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--sombre" aria-labelledby="titre-rappel">
        <div className="wrap duo-colonnes--inverse duo-colonnes">
          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.duoEnPied} sizes="(max-width: 56rem) 100vw, 40vw" />
            <figcaption className="legende">{VISUELS.duoEnPied.legende}</figcaption>
          </figure>

          <div>
            <p className="surtitre">Rappel</p>
            <h2 id="titre-rappel">{TITRE}</h2>
            <p>
              {DUO} — clown musical, 45 minutes, tout public à voir en famille dès 7 ans. Deux
              artistes au plateau, guitare et percussions jouées en direct.
            </p>
            <p>
              <Link className="lien-fleche" href="/le-spectacle">
                Revoir la présentation du spectacle
              </Link>
            </p>
            <p className="legende">
              {DUO_TITRE} traite les informations transmises par ce formulaire uniquement pour
              répondre aux demandes de programmation. Voir la{" "}
              <Link href="/confidentialite">politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
