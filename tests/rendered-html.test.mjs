/**
 * Contrôles de qualité du site rendu.
 *
 * Ces tests s'exécutent sur le *worker de production* réellement construit
 * (`dist/server/index.js`), et non sur les composants isolés : ils vérifient
 * donc le HTML que recevra un visiteur ou un robot d'indexation.
 *
 * Ils protègent quatre choses :
 *   1. le respect de la référence maîtresse (noms, rôles, formulations) ;
 *   2. la promesse SEO (titre unique, canonique, données structurées) ;
 *   3. l'accessibilité de base (un seul h1, images décrites, langue) ;
 *   4. l'honnêteté du contenu (aucune coordonnée ni date inventée).
 */
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const racine = new URL("../", import.meta.url);

const ROUTES = [
  "/",
  "/le-spectacle",
  "/le-duo",
  "/video",
  "/photos",
  "/professionnels",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
  "/credits",
];

let worker;

async function chargerWorker() {
  if (!worker) {
    const url = new URL("dist/server/index.js", racine);
    url.searchParams.set("test", `${process.pid}-${Date.now()}`);
    worker = (await import(url.href)).default;
  }
  return worker;
}

async function demander(chemin, accept = "text/html") {
  const serveur = await chargerWorker();
  return serveur.fetch(
    new Request(`http://localhost${chemin}`, { headers: { accept } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function html(chemin) {
  const reponse = await demander(chemin);
  return { reponse, corps: await reponse.text() };
}

/** Toutes les pages, rendues une seule fois et réutilisées par les tests. */
const pages = new Map();
for (const route of ROUTES) {
  pages.set(route, await html(route));
}

const attributs = (balise, attribut) => {
  const motif = new RegExp(`<${balise}\\b[^>]*\\b${attribut}=["']([^"']*)["']`, "gi");
  return (corps) => [...corps.matchAll(motif)].map((resultat) => resultat[1]);
};

const hrefs = attributs("a", "href");

/** React insère « <!-- --> » entre une expression et le texte qui la suit. */
const sansSeparateurs = (corps) => corps.replace(/<!-- -->/g, "");

function jsonLd(corps) {
  const motif = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  return [...corps.matchAll(motif)].map((resultat) => JSON.parse(resultat[1].replace(/\\u003c/g, "<")));
}

/* ------------------------------------------------------------------ */
/* Rendu et structure                                                  */
/* ------------------------------------------------------------------ */

test("chaque page se rend en HTML avec un statut 200", () => {
  for (const [route, { reponse }] of pages) {
    assert.equal(reponse.status, 200, `statut inattendu pour ${route}`);
    assert.match(reponse.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
});

test("le document est déclaré en français", () => {
  for (const [route, { corps }] of pages) {
    assert.match(corps, /<html[^>]+lang="fr"/, route);
  }
});

test("chaque page porte exactement un h1", () => {
  for (const [route, { corps }] of pages) {
    const nombre = (corps.match(/<h1\b/g) ?? []).length;
    assert.equal(nombre, 1, `${route} devrait avoir un seul h1, il en a ${nombre}`);
  }
});

test("la hiérarchie des titres ne saute pas de niveau", () => {
  for (const [route, { corps }] of pages) {
    const niveaux = [...corps.matchAll(/<h([1-6])\b/g)].map((r) => Number(r[1]));
    for (let index = 1; index < niveaux.length; index += 1) {
      assert.ok(
        niveaux[index] <= niveaux[index - 1] + 1,
        `${route} : saut de h${niveaux[index - 1]} à h${niveaux[index]}`,
      );
    }
  }
});

test("le lien d'évitement et le repère principal sont présents", () => {
  for (const [route, { corps }] of pages) {
    assert.match(corps, /href="#contenu"/, route);
    assert.match(corps, /<main id="contenu">/, route);
  }
});

/* ------------------------------------------------------------------ */
/* Référencement                                                       */
/* ------------------------------------------------------------------ */

test("chaque page a un titre et une description uniques", () => {
  const titres = new Set();
  const descriptions = new Set();

  for (const [route, { corps }] of pages) {
    const titre = corps.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const description = corps.match(/<meta name="description" content="([^"]*)"/)?.[1];

    assert.ok(titre && titre.length > 10, `titre manquant ou trop court sur ${route}`);
    assert.ok(description && description.length > 50, `description trop courte sur ${route}`);
    assert.ok(!titres.has(titre), `titre dupliqué sur ${route} : ${titre}`);
    assert.ok(!descriptions.has(description), `description dupliquée sur ${route}`);

    titres.add(titre);
    descriptions.add(description);
  }
});

test("chaque page déclare une URL canonique correspondant à sa route", () => {
  for (const [route, { corps }] of pages) {
    const canonique = corps.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    assert.ok(canonique, `canonique manquante sur ${route}`);
    // Next normalise l'accueil sans barre oblique finale (trailingSlash: false).
    const attendu = route === "/" ? "" : route;
    assert.ok(
      canonique.endsWith(attendu),
      `canonique incohérente sur ${route} : ${canonique}`,
    );
  }
});

test("les métadonnées de partage social sont complètes", () => {
  for (const [route, { corps }] of pages) {
    assert.match(corps, /property="og:title"/, route);
    assert.match(corps, /property="og:description"/, route);
    assert.match(corps, /property="og:image"/, route);
    assert.match(corps, /property="og:locale" content="fr_FR"/, route);
    assert.match(corps, /name="twitter:card" content="summary_large_image"/, route);
  }
});

test("le plan du site et robots.txt répondent", async () => {
  const plan = await demander("/sitemap.xml", "application/xml");
  assert.equal(plan.status, 200);
  const xml = await plan.text();
  for (const route of ROUTES) {
    assert.match(xml, new RegExp(route === "/" ? "<loc>[^<]*/</loc>" : route.replace("/", "\\/")));
  }

  const robots = await demander("/robots.txt", "text/plain");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /User-Agent/i);
});

/* ------------------------------------------------------------------ */
/* Données structurées                                                 */
/* ------------------------------------------------------------------ */

test("les données structurées sont valides et décrivent le duo", () => {
  const accueil = jsonLd(pages.get("/").corps);
  const types = accueil.map((graphe) => graphe["@type"]);

  assert.ok(types.includes("PerformingGroup"), "PerformingGroup absent de l'accueil");
  assert.ok(types.includes("WebSite"), "WebSite absent de l'accueil");
  assert.ok(types.includes("CreativeWork"), "le spectacle n'est pas décrit");

  const duo = accueil.find((graphe) => graphe["@type"] === "PerformingGroup");
  assert.equal(duo.name, "MEZZO & MAESTRO");
  const membres = duo.member.map((membre) => membre.name);
  assert.deepEqual(membres, ["Manu — Mezzo", "Pascal — Maestro"]);
});

test("aucune date de représentation n'est inventée", () => {
  for (const [route, { corps }] of pages) {
    for (const graphe of jsonLd(corps)) {
      assert.notEqual(graphe["@type"], "TheaterEvent", `date fictive publiée sur ${route}`);
      assert.ok(!("startDate" in graphe), `startDate inattendu sur ${route}`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* Fidélité à la référence maîtresse                                   */
/* ------------------------------------------------------------------ */

test("aucune ancienne appellation ne subsiste", () => {
  const interdits = [/Fr[eè]res\s+Tempo/i, /Maestro\s*&(amp;)?\s*Mezzo/i, /a-completer\.fr/i];

  for (const [route, { corps }] of pages) {
    for (const motif of interdits) {
      assert.doesNotMatch(corps, motif, `appellation abandonnée trouvée sur ${route}`);
    }
  }
});

test("le duo est toujours nommé Mezzo & Maestro dans cet ordre", () => {
  for (const [route, { corps }] of pages) {
    assert.match(corps, /MEZZO|Mezzo/, route);
  }
  assert.match(pages.get("/").corps, /Mezzo &amp; Maestro/);
});

test("les rôles et les places restent conformes à la référence", () => {
  const duo = sansSeparateurs(pages.get("/le-duo").corps);
  assert.match(duo, /Manu est <em class="accent">Mezzo<\/em>/);
  assert.match(duo, /Pascal est <em class="accent">Maestro<\/em>/);
  assert.match(duo, /Percussions — Le frère instinctif — gauche du plateau/);
  assert.match(duo, /Guitare — Le frère organisé — droite du plateau/);
});

test("le spectacle n'est jamais présenté comme un spectacle pour enfants", () => {
  for (const [route, { corps }] of pages) {
    assert.doesNotMatch(corps, /spectacle pour enfants/i, route);
  }
  assert.match(pages.get("/").corps, /Tout public/);
});

test("aucune coordonnée factice n'est présentée comme réelle", () => {
  for (const [route, { corps }] of pages) {
    const adresses = [...corps.matchAll(/mailto:([^"?]+)/g)].map((r) => r[1]);
    for (const adresse of adresses) {
      assert.doesNotMatch(adresse, /completer|exemple|example|test|todo/i, `${route} : ${adresse}`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* Accessibilité et médias                                             */
/* ------------------------------------------------------------------ */

/** Les pages légales sont volontairement sans illustration. */
const PAGES_LEGALES = ["/mentions-legales", "/confidentialite", "/credits"];

test("toutes les images portent un texte alternatif et des dimensions", () => {
  for (const [route, { corps }] of pages) {
    const balises = corps.match(/<img\b[^>]*>/g) ?? [];
    if (!PAGES_LEGALES.includes(route)) {
      assert.ok(balises.length > 0, `aucune image sur ${route}`);
    }

    for (const balise of balises) {
      assert.match(balise, /\salt="/, `alt manquant sur ${route} : ${balise}`);
      assert.match(balise, /\swidth="\d+"/, `width manquante sur ${route} : ${balise}`);
      assert.match(balise, /\sheight="\d+"/, `height manquante sur ${route} : ${balise}`);
    }
  }
});

test("les formats modernes sont proposés avant le JPEG", () => {
  const { corps } = pages.get("/");
  assert.match(corps, /type="image\/avif"/);
  assert.match(corps, /type="image\/webp"/);
});

test("le formulaire de contact est correctement étiqueté", () => {
  const { corps } = pages.get("/contact");
  const identifiants = [...corps.matchAll(/<(?:input|textarea|select)\b[^>]*\sid="([^"]+)"/g)].map(
    (resultat) => resultat[1],
  );
  const etiquettes = [...corps.matchAll(/<label[^>]*\sfor="([^"]+)"/g)].map((r) => r[1]);

  assert.ok(identifiants.length >= 8, "champs manquants dans le formulaire");
  for (const identifiant of identifiants) {
    assert.ok(etiquettes.includes(identifiant), `champ « ${identifiant} » sans étiquette`);
  }
  assert.match(corps, /role="status"/, "zone de statut accessible manquante");
});

/* ------------------------------------------------------------------ */
/* Liens et fichiers                                                   */
/* ------------------------------------------------------------------ */

test("aucun lien interne ne pointe vers une page inexistante", () => {
  for (const [route, { corps }] of pages) {
    for (const lien of hrefs(corps)) {
      if (!lien.startsWith("/") || lien.startsWith("//")) continue;
      const chemin = lien.split(/[?#]/)[0];
      if (chemin.includes(".")) continue; // fichier statique, vérifié plus bas
      assert.ok(ROUTES.includes(chemin), `${route} pointe vers une page inconnue : ${chemin}`);
    }
  }
});

test("tous les fichiers liés existent réellement dans public/", async () => {
  const fichiers = new Set();

  for (const { corps } of pages.values()) {
    for (const lien of hrefs(corps)) {
      if (lien.startsWith("/") && /\.(pdf|svg|jpg|png|webp|avif)$/i.test(lien)) fichiers.add(lien);
    }
    for (const source of attributs("img", "src")(corps)) fichiers.add(source);
    for (const jeu of attributs("source", "srcSet")(corps)) {
      for (const entree of jeu.split(",")) fichiers.add(entree.trim().split(/\s+/)[0]);
    }
  }

  assert.ok(fichiers.size > 5, "trop peu de fichiers détectés");
  for (const fichier of fichiers) {
    const chemin = fileURLToPath(new URL(`public${fichier}`, racine));
    await access(chemin).catch(() => {
      assert.fail(`fichier manquant dans public/ : ${fichier}`);
    });
  }
});

test("les en-têtes de sécurité sont appliqués", async () => {
  const reponse = await demander("/");
  const attendus = {
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-frame-options": "SAMEORIGIN",
  };
  for (const [nom, valeur] of Object.entries(attendus)) {
    assert.equal(reponse.headers.get(nom), valeur, `en-tête ${nom} manquant ou incorrect`);
  }
  assert.match(reponse.headers.get("permissions-policy") ?? "", /geolocation=\(\)/);
});

test("une page inconnue renvoie un statut 404", async () => {
  const reponse = await demander("/une-page-qui-nexiste-pas");
  assert.equal(reponse.status, 404);
});

/* ------------------------------------------------------------------ */
/* Signalement des informations manquantes                             */
/* ------------------------------------------------------------------ */

test("les informations manquantes sont signalées, jamais inventées", () => {
  const pro = pages.get("/professionnels").corps;
  assert.match(pro, /class="a-confirmer"/, "aucun marqueur « à confirmer » sur la page pros");
  assert.match(pro, /Jauge/);
  assert.match(pages.get("/mentions-legales").corps, /À compléter/);
});
