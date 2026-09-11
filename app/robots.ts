import type { MetadataRoute } from "next";

import { absoluteUrl, domaineAConfigurer } from "@/content/site";

/**
 * Tant que `NEXT_PUBLIC_SITE_URL` n’est pas renseigné, le site est publié sur un
 * domaine encore inconnu : indexer des URL canoniques inexploitables ferait plus
 * de mal que de bien. L’indexation n’est donc ouverte qu’une fois le nom de
 * domaine définitif configuré.
 */
export default function robots(): MetadataRoute.Robots {
  if (domaineAConfigurer) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
