/**
 * Génération des visuels optimisés du site (AVIF + WebP + JPEG) à partir des
 * fichiers sources du projet, ainsi que de l'image de partage social.
 *
 * Les fichiers produits sont versionnés dans `public/images/` : ce script n'est
 * donc pas exécuté pendant `npm run build`. Le relancer uniquement lorsque les
 * photographies sources changent (par exemple après la séance photo).
 *
 *   node scripts/build-images.mjs
 *
 * Dépendance : `sharp` (outil de préparation d'assets, non embarqué dans le site).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const projectRoot = resolve(siteRoot, "..");
const outDir = join(siteRoot, "public", "images");

const PALETTE = { ink: "#1f1d1a", ivory: "#f4eddf", brick: "#b74732", mustard: "#d3a33d" };

/**
 * Sources : séance photographique en studio 2026, © Borruto.
 *
 * Fichiers maîtres pleine résolution (≈ 4 725 px), recadrés par le
 * photographe. Le numéro de prise est conservé comme nom de fichier ; le rôle
 * de chaque image sur le site est porté par son `slug`.
 *
 * Placement conforme à la référence maîtresse — Mezzo (percussions) à gauche,
 * Maestro (guitare) à droite.
 *
 * Les aperçus basse définition de la séance complète (17 fichiers, ≈ 1 300 px)
 * restent archivés dans `Photos/Seance_2026/_apercus_basse_definition/`.
 */
const SEANCE = join(projectRoot, "Photos", "Seance_2026");
const master = (prise) => join(SEANCE, `Mezzo et Maestro${prise}.tif`);

/**
 * Paliers de largeur. Le bandeau d'accueil est servi en pleine largeur de
 * fenêtre : il monte jusqu'à 2048 px pour rester net sur grand écran retina.
 * Les autres visuels occupent au plus 40 % de la largeur sur grand écran et la
 * totalité sur mobile — 1536 px couvrent le cas le plus exigeant (téléphone de
 * 430 px à 3× de densité).
 */
const sources = [
  {
    // Bandeau d’accueil : la prise où les deux frères chantent de face, choisie
    // pour que les deux visages soient lisibles derrière le titre.
    slug: "mezzo-maestro-clown-musical-concert",
    input: master("00112"),
    widths: [640, 1024, 1536, 2048],
  },
  {
    slug: "mezzo-maestro-clown-musical-duo",
    input: master("00102"),
    widths: [640, 1024, 1536],
  },
  {
    slug: "mezzo-maestro-clown-musical-duel",
    input: master("00117"),
    widths: [640, 1024, 1536],
  },
  {
    slug: "mezzo-maestro-clown-musical-baguette-blessee",
    input: master("00124"),
    widths: [640, 1024, 1536],
  },
  {
    slug: "mezzo-maestro-clown-musical-salut",
    input: master("00135"),
    widths: [640, 1024, 1536],
  },
  {
    slug: "mezzo-clown-musicien-percussions-portrait",
    input: master("00216"),
    widths: [480, 768, 1024, 1536],
  },
  {
    slug: "maestro-clown-musicien-guitare-portrait",
    input: master("00158"),
    widths: [480, 768, 1024, 1536],
  },
];

async function emit(pipeline, slug, width, ext) {
  const target = join(outDir, `${slug}-${width}.${ext}`);
  const image = pipeline.clone().resize({ width, withoutEnlargement: true });
  const encoded =
    ext === "avif"
      ? image.avif({ quality: 52, effort: 6 })
      : ext === "webp"
        ? image.webp({ quality: 72, effort: 6 })
        : image.jpeg({ quality: 76, progressive: true, mozjpeg: true });
  const { size } = await encoded.toFile(target);
  return { target, size };
}

async function buildSource({ slug, input, widths }) {
  const pipeline = sharp(input).rotate();
  const meta = await pipeline.metadata();

  // Les largeurs demandées sont ramenées à la taille réelle de la source :
  // on ne sur-échantillonne jamais, mais on ne perd pas non plus un palier
  // parce qu'il dépasse la source de quelques pixels.
  const largeurs = [...new Set(widths.map((width) => Math.min(width, meta.width)))].sort(
    (a, b) => a - b,
  );

  const results = [];
  for (const width of largeurs) {
    for (const ext of ["avif", "webp", "jpg"]) {
      results.push(await emit(pipeline, slug, width, ext));
    }
  }

  console.log(
    `${slug} — source ${meta.width}×${meta.height} → ${results.length} fichiers ` +
      `(${largeurs.join(", ")} px), ` +
      `${(results.reduce((total, r) => total + r.size, 0) / 1024) | 0} Ko au total`,
  );
  return { slug, largeurs, width: meta.width, height: meta.height };
}

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Image de partage social 1200×630, composée à partir de la photo du duo. */
async function buildSocialCard(input) {
  const width = 1200;
  const height = 630;
  const base = await sharp(input)
    .rotate()
    .resize({ width, height, fit: "cover", position: "right top" })
    .toBuffer();

  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${PALETTE.ink}" stop-opacity="0.96"/>
      <stop offset="0.42" stop-color="${PALETTE.ink}" stop-opacity="0.88"/>
      <stop offset="0.74" stop-color="${PALETTE.ink}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${PALETTE.ink}" stop-opacity="0.14"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#shade)"/>
  <rect x="0" y="0" width="${width}" height="10" fill="${PALETTE.brick}"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="72" y="176" fill="${PALETTE.mustard}" font-size="25" letter-spacing="6.5" font-weight="bold">MEZZO &amp; MAESTRO</text>
    <text x="72" y="290" fill="${PALETTE.ivory}" font-size="96" font-weight="bold" letter-spacing="-1">${escapeXml("ÇA VA")}</text>
    <text x="72" y="386" fill="${PALETTE.mustard}" font-size="96" font-weight="bold" letter-spacing="-1">${escapeXml("COMMENCER !")}</text>
    <text x="72" y="452" fill="${PALETTE.ivory}" font-size="31" font-style="italic">${escapeXml("Un concert clownesque pour deux frères")}</text>
    <text x="72" y="494" fill="${PALETTE.ivory}" font-size="31" font-style="italic">${escapeXml("et quelques catastrophes.")}</text>
    <rect x="72" y="530" width="120" height="3" fill="${PALETTE.brick}"/>
    <text x="72" y="578" fill="${PALETTE.ivory}" font-size="23" letter-spacing="2.6">${escapeXml("45 min • Tout public dès 7 ans • Clown musical")}</text>
  </g>
</svg>`);

  const card = sharp(base).composite([{ input: overlay, top: 0, left: 0 }]);
  await card.clone().jpeg({ quality: 84, progressive: true, mozjpeg: true }).toFile(
    join(outDir, "partage-mezzo-maestro-ca-va-commencer.jpg"),
  );
  console.log("carte de partage social 1200×630 générée");
}

await mkdir(outDir, { recursive: true });
const manifest = [];
for (const source of sources) manifest.push(await buildSource(source));
await buildSocialCard(sources[0].input);

await writeFile(
  join(outDir, "manifest.json"),
  `${JSON.stringify(
    Object.fromEntries(
      manifest.map(({ slug, largeurs, width, height }) => [slug, { largeurs, width, height }]),
    ),
    null,
    2,
  )}\n`,
  "utf8",
);
console.log("terminé");
