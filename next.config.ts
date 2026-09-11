import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués à toutes les réponses.
 * Volontairement minimalistes : le site ne charge aucun script tiers, aucune
 * police distante et aucun traceur, il n’a donc pas besoin d’une politique
 * plus permissive.
 */
const enTetesSecurite = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: enTetesSecurite }];
  },
};

export default nextConfig;
