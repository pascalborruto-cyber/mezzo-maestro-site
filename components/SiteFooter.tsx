import Link from "next/link";

import { PAGES_LEGALES, PAGES_PRINCIPALES } from "@/content/navigation";
import { contact, documents, mailtoDiffusion, reseauxSociaux } from "@/content/site";
import { ACCROCHE_CHIFFREE, DUO, SIGNATURE, TITRE } from "@/content/spectacle";

export function SiteFooter() {
  const annee = new Date().getFullYear();

  return (
    <footer className="pied">
      <div className="wrap">
        <div className="pied__grille">
          <div>
            <h2>{DUO}</h2>
            <p>
              {TITRE} — {ACCROCHE_CHIFFREE}
            </p>
            <p className="pied__signature">{SIGNATURE}</p>
          </div>

          <nav aria-label="Plan du site">
            <h2>Le site</h2>
            <ul>
              {PAGES_PRINCIPALES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href}>{page.titre}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Diffusion</h2>
            <ul>
              {contact.email ? (
                <li>
                  <a href={mailtoDiffusion ?? `mailto:${contact.email}`}>{contact.email}</a>
                </li>
              ) : null}
              {contact.telephone ? (
                <li>
                  <a href={`tel:${contact.telephone.replace(/\s/g, "")}`}>{contact.telephone}</a>
                </li>
              ) : null}
              {!contact.email && !contact.telephone ? (
                <li>
                  <span className="a-confirmer">Coordonnées à compléter avant publication</span>
                </li>
              ) : null}
              <li>
                <Link href="/contact">Demander une date ou un devis</Link>
              </li>
              <li>
                <a href={documents.dossierArtistique}>Dossier artistique (PDF)</a>
              </li>
              {reseauxSociaux.map((profil) => (
                <li key={profil.nom}>
                  <a href={profil.url} rel="me noopener">
                    {profil.nom}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pied__bas">
          <p>
            © {annee} {DUO}. Tous droits réservés.
          </p>
          <nav aria-label="Informations légales">
            <ul className="pied__liens">
              {PAGES_LEGALES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
