"use client";

/**
 * En-tête du site.
 *
 * Seul composant client du site, et pour une seule raison : signaler la page
 * courante (`aria-current="page"`) aux personnes qui naviguent au clavier ou
 * au lecteur d’écran. Le menu mobile est un `<details>` natif — aucune
 * bibliothèque, aucun gestionnaire d’évènement, et il fonctionne même si le
 * JavaScript ne se charge pas.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PAGES_PRINCIPALES } from "@/content/navigation";
import { DUO_TITRE } from "@/content/spectacle";

function Marque() {
  return (
    <Link className="marque" href="/">
      <span>MEZZO</span>
      <span className="marque__esperluette" aria-hidden="true">
        &amp;
      </span>
      <span>MAESTRO</span>
      <span className="visuellement-cache">— retour à l’accueil</span>
    </Link>
  );
}

export function SiteHeader() {
  const chemin = usePathname();
  const estCourante = (href: string) => (href === "/" ? chemin === "/" : chemin.startsWith(href));

  return (
    <header className="entete">
      <div className="wrap entete__barre">
        <Marque />

        <nav className="nav" aria-label="Navigation principale">
          <ul className="nav__liste">
            {PAGES_PRINCIPALES.filter((page) => page.href !== "/").map((page) => (
              <li key={page.href}>
                <Link
                  className="nav__lien"
                  href={page.href}
                  aria-current={estCourante(page.href) ? "page" : undefined}
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="bouton bouton--principal entete__cta" href="/contact">
          Programmer le spectacle
        </Link>

        <details className="menu-mobile">
          <summary className="menu-mobile__bouton">
            Menu<span className="visuellement-cache"> de navigation</span>
          </summary>
          <div className="menu-mobile__panneau">
            <nav aria-label="Navigation principale (mobile)">
              <ul>
                {PAGES_PRINCIPALES.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      aria-current={estCourante(page.href) ? "page" : undefined}
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link className="bouton bouton--principal bouton--pleine-largeur" href="/contact">
              Programmer {DUO_TITRE}
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
