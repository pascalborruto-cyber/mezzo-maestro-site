import type { Metadata } from "next";
import Link from "next/link";

import { EncartAction } from "@/components/EncartAction";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import {
  ARTISTES,
  BIOGRAPHIE,
  DUO,
  DUO_TITRE,
  SIGNATURE_SECONDAIRE,
  TITRE,
} from "@/content/spectacle";
import { VISUELS } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: "Le duo de clowns musiciens",
  description:
    `Mezzo & Maestro, duo de clowns musiciens formé par deux vrais frères. Manu est Mezzo aux percussions, ` +
    `Pascal est Maestro à la guitare. Deux musiciens professionnels du spectacle vivant.`,
  path: "/le-duo",
});

/** Chaque personnage a son portrait de studio. */
const PORTRAITS: Record<string, (typeof VISUELS)[keyof typeof VISUELS]> = {
  Mezzo: VISUELS.portraitMezzo,
  Maestro: VISUELS.portraitMaestro,
};

export default function PageDuo() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Le duo", href: "/le-duo" }])} />

      <EntetePage
        surtitre="Le duo"
        titre={
          <>
            {DUO_TITRE},
            <br />
            <em className="accent">un duo de clowns musiciens</em>
          </>
        }
        chapeau="Deux vrais frères, deux musiciens professionnels, et une très longue habitude de ne pas être d’accord."
        ariane={[{ nom: "Le duo", href: "/le-duo" }]}
      />

      <section className="section" aria-labelledby="titre-bio">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Parcours</p>
            <h2 id="titre-bio">
              Frères depuis toujours.
              <br />
              <em className="accent">Musiciens presque autant.</em>
            </h2>
            {BIOGRAPHIE.map((paragraphe, index) => (
              <p key={paragraphe} className={index === 0 ? "chapeau" : undefined}>
                {paragraphe}
              </p>
            ))}
            <blockquote>« {SIGNATURE_SECONDAIRE} »</blockquote>
          </div>

          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.duoEnPied} sizes="(max-width: 56rem) 100vw, 32vw" />
            <figcaption className="legende">{VISUELS.duoEnPied.legende}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--sombre" aria-labelledby="titre-personnages">
        <div className="wrap">
          <div className="mesure">
            <p className="surtitre">Les personnages</p>
            <h2 id="titre-personnages">
              Deux logiques
              <br />
              <em className="accent">qui ne peuvent pas s’entendre.</em>
            </h2>
            <p className="chapeau">
              Aucun des deux n’est le sage, aucun n’est l’idiot. Le rapport de force s’inverse sans
              arrêt, et c’est de cette bascule permanente que naît le comique.
            </p>
          </div>

          <ul className="artistes espace-avant">
            {ARTISTES.map((artiste) => (
              <li className="artiste" key={artiste.personnage}>
                <div className="artiste__photo figure figure--portrait">
                  <Photo
                    visuel={PORTRAITS[artiste.personnage]}
                    sizes="(max-width: 56rem) 100vw, 42vw"
                  />
                </div>
                <h3>
                  {artiste.prenom} est <em className="accent">{artiste.personnage}</em>
                </h3>
                <span className="artiste__role">
                  {artiste.instrument} — {artiste.role} — {artiste.cote} du plateau
                </span>
                <p>{artiste.portrait}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-univers">
        <div className="wrap duo-colonnes--inverse duo-colonnes">
          <figure className="figure figure--cadree">
            <Photo visuel={VISUELS.duelMusical} sizes="(max-width: 56rem) 100vw, 40vw" />
            <figcaption className="legende">{VISUELS.duelMusical.legende}</figcaption>
          </figure>

          <div>
            <p className="surtitre">L’univers</p>
            <h2 id="titre-univers">
              Un concert ambulant
              <br />
              <em className="accent">légèrement défraîchi.</em>
            </h2>
            <p>
              Entre musiciens de rue, petit cabaret et cirque contemporain. Chemise blanche et
              petite cravate d’un côté, bretelles et manches retroussées de l’autre. Le bois des
              instruments, un tapis rouge, une lumière chaude : l’élégance un peu fatiguée de gens
              qui ont beaucoup joué.
            </p>
            <p>
              Pas de nez rouge, pas de confettis, pas de couleurs criardes. Le rire vient du jeu, de
              la musique et du sérieux avec lequel les deux frères traitent des problèmes minuscules.
            </p>
            <p>
              <Link className="lien-fleche" href="/le-spectacle">
                Découvrir {TITRE}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <EncartAction
        titre={`Inviter ${DUO} dans votre saison`}
        texte="Deux artistes, une forme légère, de la musique jouée en direct. Dates, devis et conditions sur demande."
      />
    </>
  );
}
