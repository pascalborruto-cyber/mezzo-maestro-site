import type { Metadata } from "next";
import Link from "next/link";

import { EncartAction } from "@/components/EncartAction";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { documents, teaser, teaserDisponible } from "@/content/site";
import { DUO_TITRE, TITRE } from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: "Teaser vidéo du spectacle",
  description:
    `Le teaser du spectacle de clown musical Ça va commencer ! : deux frères, une guitare, des percussions ` +
    `et beaucoup de catastrophes. Un aperçu vidéo pour les programmateurs et le public.`,
  path: "/video",
});

/** Ce que le teaser montrera, tiré du plan de tournage du projet. */
const CONTENU_TEASER = [
  "Un départ de concert interrompu par un fracas hors scène.",
  "De la vraie musique jouée en direct, guitare et percussions.",
  "Les accidents transformés en jeu, et le duel entre les deux frères.",
  "Le public transformé en orchestre.",
  "Le format, le public visé et les coordonnées de diffusion en carton final.",
];

export default function PageVideo() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Vidéo", href: "/video" }])} />

      <EntetePage
        surtitre="Vidéo"
        titre={
          <>
            Le teaser de
            <br />
            <em className="accent">{TITRE}</em>
          </>
        }
        chapeau="Une minute trente pour comprendre le spectacle : le jeu, la musique et les catastrophes."
        ariane={[{ nom: "Vidéo", href: "/video" }]}
      />

      <section className="section" aria-labelledby="titre-teaser">
        <div className="wrap">
          <h2 id="titre-teaser" className="visuellement-cache">
            Teaser du spectacle
          </h2>

          {teaserDisponible && teaser.embedUrl ? (
            <div className="video-cadre">
              <iframe
                src={teaser.embedUrl}
                title={`Teaser du spectacle ${TITRE} par ${DUO_TITRE}`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <div className="video-attente">
              <Photo
                visuel={VISUELS.duelMusical}
                sizes="(max-width: 76rem) 100vw, 72rem"
                alt=""
                prioritaire
              />
              <p className="video-attente__titre">Le teaser est en cours de tournage</p>
              <p>
                Nous préférons ne rien mettre en ligne plutôt qu’une vidéo qui ne rendrait pas
                justice au spectacle. Le teaser sera publié ici dès qu’il sera prêt.
              </p>
              <div className="boutons">
                <a className="bouton bouton--principal" href={documents.dossierArtistique}>
                  Dossier artistique ({documents.dossierArtistiqueTaille})
                </a>
                <Link className="bouton bouton--secondaire" href="/contact">
                  Être prévenu de sa sortie
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {!teaserDisponible ? (
        <section className="section section--ivoire" aria-labelledby="titre-contenu-teaser">
          <div className="wrap duo-colonnes">
            <div>
              <p className="surtitre">En préparation</p>
              <h2 id="titre-contenu-teaser">
                Ce que vous verrez
                <br />
                <em className="accent">dans le teaser.</em>
              </h2>
              <ul className="liste-puces">
                {CONTENU_TEASER.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
              <p>
                En attendant, les photos et le dossier artistique donnent déjà une idée précise de
                l’univers, du jeu et de la forme.
              </p>
              <p>
                <Link className="lien-fleche" href="/photos">
                  Voir les photos du spectacle
                </Link>
              </p>
            </div>

            <figure className="figure figure--cadree">
              <Photo visuel={VISUELS.salutDecale} sizes="(max-width: 56rem) 100vw, 32vw" />
              <figcaption className="legende">{VISUELS.salutDecale.legende}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <EncartAction
        titre="Programmer le spectacle"
        texte="Le teaser n’est pas indispensable pour engager la discussion : le dossier artistique décrit précisément la forme, le déroulé et les conditions d’accueil."
      />
    </>
  );
}
