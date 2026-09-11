import type { Metadata } from "next";
import Link from "next/link";

import { EntetePage } from "@/components/EntetePage";
import { JsonLd } from "@/components/JsonLd";
import { filAriane } from "@/content/donnees-structurees";
import { pageMetadata } from "@/content/seo";
import { contact, domaineAConfigurer, mentionsLegales, siteOrigin } from "@/content/site";
import { DUO } from "@/content/spectacle";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site du duo de clowns musiciens Mezzo & Maestro : éditeur, directeur de la publication et hébergeur.",
  path: "/mentions-legales",
});

/**
 * A_COMPLETER — cette page ne fabrique aucune mention juridique.
 * Chaque information administrative manquante est signalée telle quelle,
 * afin qu’aucun texte inventé ne soit publié sous une apparence officielle.
 */
function Ligne({ terme, valeur, note }: { terme: string; valeur: string | null; note: string }) {
  return (
    <div>
      <dt>{terme}</dt>
      <dd>{valeur ?? <span className="a-confirmer">À compléter — {note}</span>}</dd>
    </div>
  );
}

export default function PageMentionsLegales() {
  const informationsManquantes = Object.values(mentionsLegales).some((valeur) => valeur === null);

  return (
    <>
      <JsonLd data={filAriane([{ nom: "Mentions légales", href: "/mentions-legales" }])} />

      <EntetePage
        surtitre="Informations légales"
        titre="Mentions légales"
        ariane={[{ nom: "Mentions légales", href: "/mentions-legales" }]}
      />

      <section className="section" aria-labelledby="titre-mentions">
        <div className="wrap mesure">
          <h2 id="titre-mentions" className="visuellement-cache">
            Mentions légales du site
          </h2>

          {informationsManquantes ? (
            <div className="avis">
              <p>
                <strong>Page en cours de constitution.</strong> La structure de production du
                spectacle est en cours de création. Les informations administratives obligatoires
                (raison sociale, adresse, numéro SIRET, licence d’entrepreneur de spectacles,
                hébergeur) seront publiées ici avant la mise en ligne définitive du site. Aucune
                mention n’est inventée en attendant.
              </p>
            </div>
          ) : null}

          <h3>Éditeur du site</h3>
          <dl className="fiche">
            <Ligne terme="Nom du projet" valeur={DUO} note="" />
            <Ligne
              terme="Raison sociale"
              valeur={mentionsLegales.raisonSociale}
              note="structure de production en cours de constitution"
            />
            <Ligne
              terme="Forme juridique"
              valeur={mentionsLegales.formeJuridique}
              note="association, société ou portage à déterminer"
            />
            <Ligne
              terme="Adresse du siège"
              valeur={mentionsLegales.adresse}
              note="adresse administrative à fournir"
            />
            <Ligne terme="SIRET" valeur={mentionsLegales.siret} note="numéro à fournir" />
            <Ligne
              terme="Licence de spectacles"
              valeur={mentionsLegales.licenceSpectacle}
              note="numéro de licence d’entrepreneur de spectacles vivants"
            />
            <Ligne
              terme="Directeur de la publication"
              valeur={mentionsLegales.directeurPublication}
              note="personne responsable de la publication"
            />
            <Ligne
              terme="Contact"
              valeur={contact.email}
              note="adresse électronique de contact à publier"
            />
          </dl>

          <h3>Hébergement</h3>
          <dl className="fiche">
            <Ligne
              terme="Hébergeur"
              valeur={mentionsLegales.hebergeur}
              note="nom, adresse et téléphone de l’hébergeur"
            />
            <Ligne
              terme="Adresse du site"
              valeur={domaineAConfigurer ? null : siteOrigin}
              note="nom de domaine définitif à réserver"
            />
          </dl>

          <h3>Propriété intellectuelle</h3>
          <p>
            Les textes, visuels, logos et éléments graphiques présentés sur ce site sont la
            propriété de leurs auteurs respectifs. Toute reproduction, même partielle, est soumise à
            autorisation préalable. Les visuels destinés à la presse et aux programmateurs sont
            fournis sur demande avec leurs conditions d’utilisation : voir la page{" "}
            <Link href="/credits">crédits</Link>.
          </p>

          <h3>Données personnelles</h3>
          <p>
            Le traitement des données transmises par le formulaire de contact est décrit dans la{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
