import type { Metadata } from "next";
import Link from "next/link";

import { PAGES_PRINCIPALES } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function PageIntrouvable() {
  return (
    <section className="section">
      <div className="wrap page-404">
        <div>
          <p className="surtitre">Erreur 404</p>
          <h1>
            Ça n’a pas
            <br />
            <em className="accent">commencé.</em>
          </h1>
          <p className="chapeau">
            Cette page n’existe pas, ou plus. Quelque chose est tombé en coulisses.
          </p>

          <nav aria-label="Pages principales">
            <ul className="liste-puces page-404__liens">
              {PAGES_PRINCIPALES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href}>{page.titre}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="boutons page-404__actions">
            <Link className="bouton bouton--principal" href="/">
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
