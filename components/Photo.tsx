/*
 * Composant image du site.
 *
 * `next/image` n’est volontairement pas utilisé : sous vinext, la
 * configuration `images` est lue mais n’effectue aucune optimisation
 * (cf. tableau de compatibilité de vinext). Les dérivés AVIF / WebP / JPEG sont
 * donc produits à l’avance par `scripts/build-images.mjs`, et servis ici en
 * `<picture>` avec `srcset` + `sizes`. Les dimensions intrinsèques sont
 * toujours transmises pour éviter tout décalage de mise en page (CLS).
 */
import type { CSSProperties } from "react";
import type { Visuel } from "@/content/visuels";

type PhotoProps = {
  visuel: Visuel;
  /** Attribut `sizes` : décrit la largeur d’affichage réelle de l’image. */
  sizes: string;
  /** Image au-dessus de la ligne de flottaison : chargement prioritaire. */
  prioritaire?: boolean;
  className?: string;
  /** Remplace le texte alternatif de référence (rare, à justifier). */
  alt?: string;
};

const srcSet = (slug: string, largeurs: number[], extension: string) =>
  largeurs.map((largeur) => `/images/${slug}-${largeur}.${extension} ${largeur}w`).join(", ");

export function Photo({ visuel, sizes, prioritaire = false, className, alt }: PhotoProps) {
  const { slug, largeurs, largeur, hauteur, cadrageVertical } = visuel;
  const plusGrande = largeurs[largeurs.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(slug, largeurs, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(slug, largeurs, "webp")} sizes={sizes} />
      <img
        src={`/images/${slug}-${plusGrande}.jpg`}
        srcSet={srcSet(slug, largeurs, "jpg")}
        sizes={sizes}
        width={largeur}
        height={hauteur}
        alt={alt ?? visuel.alt}
        className={className}
        loading={prioritaire ? "eager" : "lazy"}
        decoding={prioritaire ? "sync" : "async"}
        fetchPriority={prioritaire ? "high" : "auto"}
        style={cadrageVertical !== undefined ? ({ "--cadrage-y": `${cadrageVertical}%` } as CSSProperties) : undefined}
      />
    </picture>
  );
}
