import type { Metadata } from "next";
import Link from "next/link";

import { EncartAction } from "@/components/EncartAction";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { representationsJsonLd, spectacleJsonLd } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { documents, teaserDisponible } from "@/content/site";
import {
  ACCROCHE_CHIFFREE,
  ARTISTES,
  DUO_TITRE,
  DUREE,
  GENRE,
  PUBLIC_CIBLE,
  PUBLIC_COURT,
  SIGNATURE,
  SIGNATURE_SECONDAIRE,
  SOUS_TITRE,
  STRUCTURES_CIBLES,
  TEXTE_ACCUEIL,
  TITRE,
} from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: TITRE,
  titreAbsolu: `${DUO_TITRE} — ${TITRE} | Clown musical tout public dès 7 ans`,
  description:
    `Ça va commencer ! est un concert clownesque de 45 minutes joué par deux frères musiciens. ` +
    `Guitare et percussions en direct, un spectacle tout public à voir en famille dès 7 ans, disponible en tournée.`,
  path: "/",
});

const REPERES = [
  { valeur: DUREE, precision: "Un format court, dense et sans entracte" },
  { valeur: "Dès 7 ans", precision: PUBLIC_CIBLE },
  { valeur: "100 % live", precision: "Guitare et percussions jouées sur scène" },
  { valeur: "2 artistes", precision: "Deux frères, deux vrais musiciens" },
];

export default function PageAccueil() {
  return (
    <>
      <JsonLd data={[spectacleJsonLd(), ...representationsJsonLd()]} />

      {/* ---------------------------------------------------------------- */}
      <section className="bandeau" aria-labelledby="titre-accueil">
        <div className="bandeau__media">
          <Photo
            visuel={VISUELS.duoConcert}
            sizes="(max-width: 72rem) 100vw, 60vw"
            prioritaire
          />
        </div>

        <div className="wrap">
          <div className="bandeau__contenu">
            <h1 id="titre-accueil">
              <span className="bandeau__duo">{DUO_TITRE}</span>
              <span className="accent">{TITRE}</span>
            </h1>
            <p className="bandeau__soustitre">{SOUS_TITRE}</p>

            <ul className="bandeau__reperes">
              <li>{DUREE}</li>
              <li>{PUBLIC_COURT}</li>
              <li>{GENRE}</li>
            </ul>

            <div className="boutons">
              <Link className="bouton bouton--principal" href="/contact">
                Programmer le spectacle
              </Link>
              <Link className="bouton bouton--secondaire" href="/video">
                Voir le teaser
              </Link>
            </div>

            <p className="bandeau__signature">{SIGNATURE}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="titre-spectacle">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Le spectacle</p>
            <h2 id="titre-spectacle">
              Ils ont tout préparé.
              <br />
              <em className="accent">Enfin… presque.</em>
            </h2>
            {TEXTE_ACCUEIL.map((paragraphe, index) => (
              <p key={paragraphe} className={index === 0 ? "chapeau" : undefined}>
                {paragraphe}
              </p>
            ))}
            <p>
              <Link className="lien-fleche" href="/le-spectacle">
                Découvrir le spectacle en détail
              </Link>
            </p>
          </div>

          <dl className="reperes">
            {REPERES.map((repere) => (
              <div className="repere" key={repere.valeur}>
                <dt>{repere.valeur}</dt>
                <dd>{repere.precision}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="section section--sombre" aria-labelledby="titre-duo">
        <div className="wrap duo-colonnes--inverse duo-colonnes">
          <figure className="figure figure--cadree">
            <Photo
              visuel={VISUELS.duelMusical}
              sizes="(max-width: 56rem) 100vw, 40vw"
            />
            <figcaption className="legende">{VISUELS.duelMusical.legende}</figcaption>
          </figure>

          <div>
            <p className="surtitre">Le duo</p>
            <h2 id="titre-duo">
              Deux frères. Deux logiques.
              <br />
              <em className="accent">Un même rythme.</em>
            </h2>

            <ul className="artistes">
              {ARTISTES.map((artiste) => (
                <li className="artiste" key={artiste.personnage}>
                  <h3>
                    {artiste.prenom} est <em className="accent">{artiste.personnage}</em>
                  </h3>
                  <span className="artiste__role">
                    {artiste.instrument} — {artiste.role}
                  </span>
                  <p>{artiste.portrait}</p>
                </li>
              ))}
            </ul>

            <blockquote>« {SIGNATURE_SECONDAIRE} »</blockquote>
            <p>
              <Link className="lien-fleche" href="/le-duo">
                Faire connaissance avec {DUO_TITRE}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="section section--ivoire" aria-labelledby="titre-video">
        <div className="wrap">
          <div className="mesure">
            <p className="surtitre">La vidéo</p>
            <h2 id="titre-video">
              Le concert va commencer.
              <br />
              <em className="accent">Normalement.</em>
            </h2>
          </div>

          <div className="video-attente">
            <Photo
              visuel={VISUELS.salutDecale}
              sizes="(max-width: 76rem) 100vw, 72rem"
              alt=""
            />
            <p className="video-attente__titre">
              {teaserDisponible ? "Le teaser vous attend" : "Teaser en cours de tournage"}
            </p>
            <p>
              {teaserDisponible
                ? `Un aperçu d’une minute trente pour découvrir le jeu, la musique et les catastrophes.`
                : `Le teaser du spectacle est en cours de réalisation. En attendant, le dossier artistique décrit précisément la forme, le déroulé et les conditions d’accueil.`}
            </p>
            <div className="boutons">
              <Link className="bouton bouton--principal" href="/video">
                {teaserDisponible ? "Voir le teaser" : "Suivre la sortie du teaser"}
              </Link>
              <a className="bouton bouton--secondaire" href={documents.dossierArtistique}>
                Dossier artistique
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="section section--brique" aria-labelledby="titre-photos">
        <div className="wrap">
          <div className="duo-colonnes">
            <div>
              <p className="surtitre">En images</p>
              <h2 id="titre-photos">
                La dignité.
                <br />
                <em>Le désordre.</em>
              </h2>
            </div>
            <p className="chapeau">
              Un concert ambulant légèrement défraîchi, entre musiciens de rue, petit cabaret et
              cirque contemporain. Fond sombre, tapis rouge, bois des instruments : rien de criard,
              tout est joué.
            </p>
          </div>

          <div className="duo-colonnes--egales duo-colonnes">
            <figure className="figure figure--cadree">
              <Photo visuel={VISUELS.salutDecale} sizes="(max-width: 56rem) 100vw, 36vw" />
              <figcaption className="legende">{VISUELS.salutDecale.legende}</figcaption>
            </figure>
            <figure className="figure figure--cadree">
              <Photo visuel={VISUELS.baguetteBlessee} sizes="(max-width: 56rem) 100vw, 36vw" />
              <figcaption className="legende">{VISUELS.baguetteBlessee.legende}</figcaption>
            </figure>
          </div>

          <p>
            <Link className="lien-fleche" href="/photos">
              Voir toutes les photos
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="section" aria-labelledby="titre-pros">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Espace professionnels</p>
            <h2 id="titre-pros">
              Programmer
              <br />
              <em className="accent">{TITRE}</em>
            </h2>
            <p className="chapeau">
              Une forme légère pour deux artistes, de la musique jouée en direct et un plateau
              dépouillé : un spectacle familial conçu pour circuler.
            </p>
            <p>{ACCROCHE_CHIFFREE}.</p>

            <h3>Pour quelles structures ?</h3>
            <ul className="liste-puces">
              {STRUCTURES_CIBLES.map((structure) => (
                <li key={structure}>{structure}</li>
              ))}
            </ul>
          </div>

          <div className="panneau">
            <h3>Documents et contact</h3>
            <p>
              Toutes les informations utiles à une programmation sont rassemblées dans l’espace
              professionnels.
            </p>
            <Link className="bouton bouton--sombre bouton--pleine-largeur" href="/professionnels">
              Informations professionnelles
            </Link>
            <a
              className="bouton bouton--secondaire bouton--pleine-largeur"
              href={documents.dossierArtistique}
            >
              Dossier artistique
            </a>
            <Link className="bouton bouton--principal bouton--pleine-largeur" href="/contact">
              Demander une date
            </Link>
          </div>
        </div>
      </section>

      <EncartAction />
    </>
  );
}
