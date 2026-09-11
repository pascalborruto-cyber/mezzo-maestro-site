import type { Metadata } from "next";
import Link from "next/link";

import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { contact } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment les données transmises par le formulaire de contact du site Mezzo & Maestro sont traitées : aucune publicité, aucun suivi, aucun cookie de mesure.",
  path: "/confidentialite",
});

export default function PageConfidentialite() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: "Confidentialité", href: "/confidentialite" }])} />

      <EntetePage
        surtitre="Informations légales"
        titre="Politique de confidentialité"
        chapeau="Ce site ne dépose aucun cookie publicitaire et n’installe aucun outil de suivi."
        ariane={[{ nom: "Confidentialité", href: "/confidentialite" }]}
      />

      <section className="section" aria-labelledby="titre-confidentialite">
        <div className="wrap mesure">
          <h2 id="titre-confidentialite" className="visuellement-cache">
            Traitement des données personnelles
          </h2>

          <h3>Cookies et mesure d’audience</h3>
          <p>
            Ce site ne dépose aucun cookie sur votre appareil : ni cookie publicitaire, ni cookie de
            mesure d’audience, ni traceur tiers. Aucune bannière de consentement n’est donc
            nécessaire.
          </p>
          <p>
            Si une mesure d’audience est ajoutée un jour, elle sera choisie parmi les solutions
            respectueuses de la vie privée, sans cookie et sans transfert de données personnelles
            hors de l’Union européenne. Cette page sera mise à jour en conséquence.
          </p>

          <h3>Formulaire de contact</h3>
          <p>
            Les informations que vous transmettez par le formulaire (structure, nom, fonction,
            adresse électronique, téléphone, ville, objet et message) servent uniquement à répondre
            à votre demande de programmation. Elles ne sont ni revendues, ni cédées, ni utilisées à
            des fins publicitaires.
          </p>
          <p>
            Elles sont conservées le temps nécessaire au suivi de la demande et de la relation de
            diffusion, puis supprimées. La base légale du traitement est l’intérêt légitime à
            répondre à une sollicitation professionnelle.
          </p>

          <h3>Vos droits</h3>
          <p>
            Conformément au règlement général sur la protection des données, vous disposez d’un
            droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur les
            informations vous concernant. Pour l’exercer, il suffit d’écrire à l’adresse de contact
            du site
            {contact.email ? (
              <>
                {" "}
                (<a href={`mailto:${contact.email}`}>{contact.email}</a>)
              </>
            ) : (
              <>
                {" "}
                <span className="a-confirmer">
                  adresse de contact à publier avant la mise en ligne
                </span>
              </>
            )}
            . Vous pouvez également introduire une réclamation auprès de la CNIL.
          </p>

          <h3>Hébergement et journaux techniques</h3>
          <p>
            L’hébergeur du site peut conserver des journaux de connexion techniques (adresse IP,
            date, page consultée) à des fins de sécurité et de bon fonctionnement du service. Ces
            journaux ne sont pas exploités à des fins commerciales. Les coordonnées de l’hébergeur
            figurent dans les <Link href="/mentions-legales">mentions légales</Link>.
          </p>

          <h3>Contenus tiers</h3>
          <p>
            Lorsque le teaser du spectacle sera mis en ligne, il pourra être intégré depuis une
            plateforme vidéo. Cette plateforme est susceptible de déposer ses propres traceurs au
            moment de la lecture. Le lecteur sera alors chargé de manière différée et cette page
            précisera la plateforme retenue.
          </p>
        </div>
      </section>
    </>
  );
}
