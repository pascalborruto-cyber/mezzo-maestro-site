import type { Metadata } from "next";
import Link from "next/link";

import { EncartAction } from "@/components/EncartAction";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane, spectacleJsonLd } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import {
  ARGUMENTS_PROGRAMMATION,
  DUREE,
  GENRE,
  MOMENTS,
  NOTE_INTENTION,
  PLATEAU,
  PUBLIC_CIBLE,
  SIGNATURE,
  TEXTE_ACCUEIL,
  TITRE,
} from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: `Le spectacle : ${TITRE}`,
  description:
    `Synopsis, note d’intention et déroulé de Ça va commencer !, spectacle de clown musical de 45 minutes ` +
    `avec guitare et percussions jouées en direct. Un spectacle familial tout public dès 7 ans.`,
  path: "/le-spectacle",
});

export default function PageSpectacle() {
  return (
    <>
      <JsonLd
        data={[spectacleJsonLd(), filAriane([{ nom: "Le spectacle", href: "/le-spectacle" }])]}
      />

      <EntetePage
        surtitre="Clown musical • 45 minutes • Dès 7 ans"
        titre={
          <>
            <span className="titre-oeuvre">{TITRE}</span>
            un concert clownesque
            <br />
            <em className="accent">pour deux frères et quelques catastrophes</em>
          </>
        }
        ariane={[{ nom: "Le spectacle", href: "/le-spectacle" }]}
      />

      <section className="section" aria-labelledby="titre-synopsis">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Synopsis</p>
            <h2 id="titre-synopsis">
              Un concert.
              <br />
              <em className="accent">Deux frères.</em>
            </h2>
            {TEXTE_ACCUEIL.map((paragraphe, index) => (
              <p key={paragraphe} className={index === 0 ? "chapeau" : undefined}>
                {paragraphe}
              </p>
            ))}
          </div>

          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.duoEnPied} sizes="(max-width: 56rem) 100vw, 32vw" />
            <figcaption className="legende">{VISUELS.duoEnPied.legende}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--sombre" aria-labelledby="titre-intention">
        <div className="wrap duo-colonnes--inverse duo-colonnes">
          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.baguetteBlessee} sizes="(max-width: 56rem) 100vw, 40vw" />
            <figcaption className="legende">{VISUELS.baguetteBlessee.legende}</figcaption>
          </figure>

          <div>
            <p className="surtitre">Note d’intention</p>
            <h2 id="titre-intention">
              Essayer de commencer,
              <br />
              <em className="accent">pendant 45 minutes.</em>
            </h2>
            {NOTE_INTENTION.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
            <blockquote>« {SIGNATURE} »</blockquote>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-deroule">
        <div className="wrap">
          <div className="mesure">
            <p className="surtitre">Le déroulé</p>
            <h2 id="titre-deroule">
              Six tentatives
              <br />
              <em className="accent">avant le vrai concert.</em>
            </h2>
            <p className="chapeau">
              Le spectacle avance par situations courtes et lisibles. Chaque tentative de commencer
              échoue d’une manière nouvelle, et chaque échec laisse derrière lui un motif musical
              qui reviendra à la fin.
            </p>
          </div>

          <ol className="deroule">
            {MOMENTS.map((moment) => (
              <li key={moment.numero}>
                <span className="deroule__numero" aria-hidden="true">
                  {moment.numero}
                </span>
                <div>
                  <h3>{moment.titre}</h3>
                  <p>{moment.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ivoire" aria-labelledby="titre-atouts">
        <div className="wrap">
          <div className="mesure">
            <p className="surtitre">Ce que vit la salle</p>
            <h2 id="titre-atouts">
              Un spectacle familial
              <br />
              <em className="accent">qui n’infantilise personne.</em>
            </h2>
          </div>

          <ul className="grille-cartes">
            {ARGUMENTS_PROGRAMMATION.map((argument) => (
              <li className="carte" key={argument.titre}>
                <h3>{argument.titre}</h3>
                <p>{argument.texte}</p>
              </li>
            ))}
          </ul>

          <h3 className="espace-avant">Le plateau</h3>
          <p className="mesure">{PLATEAU}</p>

          <p>
            <Link className="lien-fleche" href="/professionnels">
              Voir les informations techniques et professionnelles
            </Link>
          </p>
        </div>
      </section>

      <EncartAction
        titre={`${TITRE}`}
        texte={`${GENRE} • ${DUREE} • ${PUBLIC_CIBLE}. Le spectacle est disponible en tournée : dates, devis et conditions sur demande.`}
      />
    </>
  );
}
