import type { MetadataRoute } from "next";

import { TOUTES_LES_PAGES } from "@/content/navigation";
import { absoluteUrl } from "@/content/site";

/** Plan du site, généré à partir de l’arborescence déclarée une seule fois. */
export default function sitemap(): MetadataRoute.Sitemap {
  const derniereModification = new Date();

  return TOUTES_LES_PAGES.map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: derniereModification,
    changeFrequency: page.priorite >= 0.8 ? "monthly" : "yearly",
    priority: page.priorite,
  }));
}
