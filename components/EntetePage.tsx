import Link from "next/link";

type EntetePageProps = {
  surtitre?: string;
  titre: React.ReactNode;
  chapeau?: React.ReactNode;
  /** Fil d’Ariane, hors « Accueil » qui est toujours ajouté en premier. */
  ariane: { nom: string; href: string }[];
};

/** Bandeau court commun aux pages intérieures : fil d’Ariane, h1, chapeau. */
export function EntetePage({ surtitre, titre, chapeau, ariane }: EntetePageProps) {
  const dernier = ariane[ariane.length - 1];

  return (
    <div className="entete-page">
      <div className="wrap">
        <nav className="fil-ariane" aria-label="Fil d’Ariane">
          <ol>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            {ariane.map((element) => (
              <li key={element.href}>
                {element === dernier ? (
                  <span aria-current="page">{element.nom}</span>
                ) : (
                  <Link href={element.href}>{element.nom}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {surtitre ? <p className="surtitre">{surtitre}</p> : null}
        <h1>{titre}</h1>
        {chapeau ? <p className="chapeau">{chapeau}</p> : null}
      </div>
    </div>
  );
}
