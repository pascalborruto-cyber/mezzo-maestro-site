import type { Metadata } from "next";
import Link from "next/link";

import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { DUO } from "@/content/spectacle";
import { CREDITS_PHOTOGRAPHIQUES, GALERIE } from "@/content/visuels";

export const metadata: Metadata = pageMetadata({
  title: "Crédits photographiques",
  description:
    "Origine et conditions d’utilisation des photographies du spectacle Ça va commencer !, ainsi que des polices et des outils employés pour concevoir le site.",
  path: "/credits",
});

export default function PageCredits() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Crédits", href: "/credits" }])} />

      <EntetePage
        surtitre="Informations légales"
        titre="Crédits photographiques"
        chapeau="Origine des photographies, conditions d’utilisation et conception du site."
        ariane={[{ nom: "Crédits", href: "/credits" }]}
      />

      <section className="section" aria-labelledby="titre-credits">
        <div className="wrap mesure">
          <h2 id="titre-credits" className="visuellement-cache">
            Crédits et conditions d’utilisation
          </h2>

          <p className="chapeau">
            L’ensemble des photographies publiées sur ce site provient de la séance en studio
            réalisée en 2026, et sont créditées{" "}
            {CREDITS_PHOTOGRAPHIQUES.map((credit) => `© ${credit}`).join(", ")}.
          </p>

          <h3>Photographies publiées</h3>
          <dl className="fiche">
            {GALERIE.map((visuel) => (
              <div key={visuel.slug}>
                <dt>{visuel.legende}</dt>
                <dd>© {visuel.credit}</dd>
              </div>
            ))}
          </dl>

          <h3>Conditions d’utilisation par la presse et les programmateurs</h3>
          <p>
            Les photographies peuvent être utilisées pour annoncer une représentation ou présenter
            le spectacle, à condition de ne pas les recadrer de façon à couper les instruments, de
            ne pas en modifier les couleurs, et de faire figurer le crédit{" "}
            <strong>© {CREDITS_PHOTOGRAPHIQUES[0]}</strong> ainsi que la mention « Mezzo &amp;
            Maestro — Ça va commencer&#8239;! ». Les fichiers en haute définition sont transmis sur
            simple demande via la page <Link href="/contact">contact</Link>.
          </p>

          <h3>Identité visuelle</h3>
          <p>
            Logo, palette et principes graphiques : charte visuelle du projet {DUO}. Palette noir
            charbon, ivoire, rouge brique, jaune moutarde et bois brun.
          </p>

          <h3>Conception du site</h3>
          <p>
            Site développé avec React et le routeur applicatif de Next.js, exécuté par vinext sur
            Cloudflare Workers. Aucune bibliothèque graphique tierce, aucune police distante :
            l’ensemble de la mise en forme est écrit à la main et les polices sont celles du système
            du visiteur, afin de réduire au maximum le poids des pages et de préserver la vie
            privée.
          </p>
        </div>
      </section>
    </>
  );
}
