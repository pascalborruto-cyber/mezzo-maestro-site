import { technique } from "@/content/site";
import { ARTISTES, DUO, DUREE, GENRE, PUBLIC_CIBLE, TITRE } from "@/content/spectacle";

/** Valeur encore inconnue : affichée comme telle, jamais inventée. */
function AConfirmer({ note }: { note: string }) {
  return <span className="a-confirmer">À confirmer — {note}</span>;
}

type Ligne = { terme: string; valeur: React.ReactNode };

const distribution = ARTISTES.map(
  (artiste) => `${artiste.prenom} (${artiste.personnage}, ${artiste.instrument.toLowerCase()})`,
).join(" • ");

export const LIGNES_FICHE: Ligne[] = [
  { terme: "Titre", valeur: TITRE },
  { terme: "Duo", valeur: DUO },
  { terme: "Genre", valeur: `${GENRE} — spectacle familial tout public` },
  { terme: "Durée", valeur: `${DUREE} environ, sans entracte` },
  { terme: "Public", valeur: PUBLIC_CIBLE },
  { terme: "Artistes au plateau", valeur: "2" },
  { terme: "Distribution", valeur: distribution },
  { terme: "Musique", valeur: "Jouée en direct — guitare et percussions, sans bande-son" },
  { terme: "Langue", valeur: "Très peu de texte : accessible à tous les publics" },
  {
    terme: "Implantation",
    valeur: technique.implantation ?? <AConfirmer note="versions intérieur et extérieur à l’étude" />,
  },
  {
    terme: "Jauge",
    valeur: technique.jauge ?? <AConfirmer note="à définir après les tests au plateau" />,
  },
  {
    terme: "Plateau minimum",
    valeur: technique.plateauMinimum ?? <AConfirmer note="à définir avec la fiche technique" />,
  },
  {
    terme: "Montage",
    valeur: technique.montage ?? <AConfirmer note="à définir avec la fiche technique" />,
  },
  {
    terme: "Démontage",
    valeur: technique.demontage ?? <AConfirmer note="à définir avec la fiche technique" />,
  },
  {
    terme: "Son et lumière",
    valeur: technique.sonLumiere ?? <AConfirmer note="besoins en cours de définition" />,
  },
  {
    terme: "Représentations par jour",
    valeur:
      technique.representationsParJour ?? <AConfirmer note="à définir selon les conditions d’accueil" />,
  },
  {
    terme: "Statut des artistes",
    valeur: "Artistes professionnels du spectacle vivant",
  },
];

/** Fiche d’identité du spectacle, lisible d’un seul coup d’œil. */
export function FicheSpectacle({ lignes = LIGNES_FICHE }: { lignes?: Ligne[] }) {
  return (
    <dl className="fiche">
      {lignes.map((ligne) => (
        <div key={ligne.terme}>
          <dt>{ligne.terme}</dt>
          <dd>{ligne.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}
