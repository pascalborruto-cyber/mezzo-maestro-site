import type { Metadata } from "next";
import Link from "next/link";

import { EncartAction } from "@/components/EncartAction";
import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { GALERIE, estPortrait } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: "Photos du spectacle",
  description:
    `Les images du spectacle de clown musical Ça va commencer ! : le duo au complet, le duel musical, ` +
    `le salut décalé et la baguette blessée. Visuels destinés aux programmateurs et à la presse.`,
  path: "/photos",
});

export default function PagePhotos() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Photos", href: "/photos" }])} />

      <EntetePage
        surtitre="En images"
        titre={
          <>
            La dignité.
            <br />
            <em className="accent">Le désordre.</em>
          </>
        }
        chapeau="Fond sombre, tapis rouge, bois des instruments : l’univers du spectacle en quelques images."
        ariane={[{ nom: "Photos", href: "/photos" }]}
      />

      <section className="section" aria-labelledby="titre-galerie">
        <div className="wrap">
          <h2 id="titre-galerie" className="visuellement-cache">
            Galerie photographique du spectacle
          </h2>

          <div className="galerie">
            {GALERIE.map((visuel, index) => (
              <figure
                className={estPortrait(visuel) ? "figure figure--portrait" : "figure figure--cadree"}
                key={visuel.slug}
              >
                <Photo
                  visuel={visuel}
                  sizes={
                    estPortrait(visuel)
                      ? "(max-width: 56rem) 100vw, 24vw"
                      : "(max-width: 56rem) 100vw, 48vw"
                  }
                  prioritaire={index === 0}
                />
                <figcaption className="legende">{visuel.legende}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivoire" aria-labelledby="titre-presse">
        <div className="wrap duo-colonnes">
          <div>
            <p className="surtitre">Presse et programmateurs</p>
            <h2 id="titre-presse">
              Besoin d’images
              <br />
              <em className="accent">en haute définition ?</em>
            </h2>
            <p>
              Les fichiers destinés à l’impression (affiche, programme de saison, dossier de
              presse) sont transmis sur demande, accompagnés des crédits à mentionner.
            </p>
            <p>
              <Link className="lien-fleche" href="/contact">
                Demander les visuels haute définition
              </Link>
            </p>
          </div>

          <div className="panneau">
            <h3>Règles d’utilisation</h3>
            <ul className="liste-puces">
              <li>Ne pas recadrer de manière à couper les instruments.</li>
              <li>Ne pas modifier les couleurs ni ajouter de filtre.</li>
              <li>Mentionner le crédit photographique fourni avec les fichiers.</li>
              <li>Conserver la mention « Mezzo & Maestro — Ça va commencer ! ».</li>
            </ul>
          </div>
        </div>
      </section>

      <EncartAction />
    </>
  );
}
