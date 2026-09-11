# Site officiel — MEZZO & MAESTRO / « ÇA VA COMMENCER ! »

Site de diffusion du spectacle de clown musical **ÇA VA COMMENCER !**, porté par
le duo **MEZZO & MAESTRO** (Manu / Mezzo aux percussions, Pascal / Maestro à la
guitare).

Le site poursuit deux objectifs : donner envie au grand public de découvrir le
spectacle, et donner aux programmateurs tout ce qu’il leur faut pour le
programmer. La conversion visée est la **demande de date, de devis ou de
renseignements**.

## Démarrer

```bash
npm install
npm run dev
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement (http://localhost:3000) |
| `npm run build` | Compilation de production |
| `npm start` | Serveur de production local |
| `npm run lint` | ESLint (dont `jsx-a11y`) |
| `npm test` | Compile puis exécute les contrôles de qualité du HTML rendu |

Technique : React 19 + routeur applicatif de Next.js, exécuté par
[vinext](https://github.com/cloudflare/vinext) sur Cloudflare Workers.

## À COMPLÉTER avant publication

Tout ce qui n’est pas encore connu est **signalé**, jamais inventé : ni date, ni
coordonnée, ni caractéristique technique. Pour retrouver tous les points
ouverts :

```bash
grep -rn "A_COMPLETER" content app
```

Les valeurs manquantes se règlent par variables d’environnement. Copier
`.env.example` en `.env.local` et compléter au fur et à mesure :

1. **`NEXT_PUBLIC_SITE_URL` — indispensable.** Tant qu’il est vide, les URL
   canoniques pointent vers un domaine d’exemple et `robots.txt` interdit
   l’indexation (voir `app/robots.ts`). C’est un garde-fou volontaire.
2. **Coordonnées de diffusion** (`NEXT_PUBLIC_CONTACT_EMAIL`, `…_TELEPHONE`,
   `…_STRUCTURE`). Sans elles, le site affiche « coordonnées en cours de
   finalisation » plutôt qu’une adresse fictive.
3. **Acheminement du formulaire** (`CONTACT_WEBHOOK_URL`, ou `RESEND_API_KEY` +
   `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`). Sans canal configuré, le
   formulaire répond explicitement qu’il n’est pas encore raccordé et
   **n’affirme jamais** avoir envoyé le message.
4. **Teaser** (`NEXT_PUBLIC_TEASER_EMBED_URL`) : dès qu’il est renseigné, la
   page `/video` affiche le lecteur à la place de l’état d’attente.
5. **Données techniques** (jauge, implantation, montage…) : chaque valeur
   remplace une mention « à confirmer » sur la page professionnels.
6. **Mentions légales** : la page reste explicitement incomplète tant que la
   structure de production n’existe pas.

### Dates de représentation

Le tableau `representations` de `content/site.ts` est volontairement vide.
Ajouter une entrée suffit à faire apparaître l’agenda sur la page
professionnels **et** à produire des données structurées `TheaterEvent` valides.

## Organisation

```
app/                pages (une URL française courte par page), sitemap, robots
  contact/          formulaire : action serveur + composant client + validation
components/         briques d’interface réutilisées par les pages
content/            source unique de vérité éditoriale et de configuration
  site.ts           configuration et informations à compléter
  spectacle.ts      textes actés (référence maîtresse)
  visuels.ts        visuels, textes alternatifs, légendes
  seo.ts            fabrique de métadonnées
  donnees-structurees.ts   JSON-LD
  navigation.ts     arborescence, utilisée par le menu, le pied et le sitemap
public/images/      dérivés AVIF / WebP / JPEG générés
scripts/            outils hors compilation
tests/              contrôles de qualité sur le HTML réellement rendu
```

Les textes marqués « acté » dans `content/spectacle.ts` proviennent de
`../Reference_maitresse_Mezzo_et_Maestro.md` et ne doivent pas être réécrits
sans décision explicite. Il en va de même pour l’attribution des rôles : **Manu
est Mezzo, percussionniste, à gauche ; Pascal est Maestro, guitariste, à
droite.**

## Images

`next/image` n’est pas utilisé : sous vinext, la configuration `images` est lue
mais n’optimise rien. Les dérivés sont donc produits à l’avance et versionnés.

```bash
node scripts/build-images.mjs
```

À relancer après la séance photographique, une fois les chemins sources mis à
jour dans le script. Penser ensuite à passer `visuelDePreparation` à `false`
dans `content/visuels.ts` et à compléter les crédits photographiques.

> ⚠ Les visuels actuellement en ligne sont des **visuels de préparation**, pas
> des photographies du spectacle. Ils sont signalés comme tels sur les pages
> Photos et Crédits.

## Choix techniques

- **Aucune police distante ni bibliothèque CSS** : piles système et feuille de
  style écrite à la main (environ 20 Ko), donc aucune requête bloquante et
  aucun décalage de mise en page au chargement.
- **JavaScript client réduit au minimum** : un seul composant client pour
  l’en-tête (indication de la page courante) et un pour le formulaire. Le menu
  mobile est un `<details>` natif, il fonctionne sans JavaScript.
- **Formulaire progressif** : action serveur avec `useActionState`, donc
  fonctionnel même sans JavaScript, avec piège à robots et messages d’état
  annoncés aux lecteurs d’écran.
- **Contrastes vérifiés** : les rapports WCAG sont documentés en tête de
  `app/globals.css`. La moutarde n’est jamais employée comme couleur de texte
  sur fond clair.
- **En-têtes de sécurité** déclarés dans `next.config.ts`.
- **Aucun cookie, aucun traceur.**
