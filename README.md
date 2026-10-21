# flown – Website

Öffentliche Website zur App flown: <https://flown.kippenberger.me>. Statisch gebaut mit [Astro](https://astro.build), gehostet auf Netlify.

## Entwickeln

```bash
nvm use        # Node-Version aus .nvmrc
npm install
npm run dev    # http://localhost:4321
npm run build  # statischer Output in dist/
```

## Aufbau

- `src/config.ts`: Name, Tagline, Domain und Support-Adresse – nur hier pflegen.
- `src/styles/global.css`: Design-Tokens (Werte aus `src/theme.ts` der App), Schriften, Grundstile.
- `src/layouts/`: `Base.astro` (Kopf, Navigation, Fußzeile) und `TextPage.astro` für Markdown-Seiten.
- `src/components/WorldMap.astro`: die Weltkarte als statisches SVG, beim Build aus `src/data/world.json` gerechnet.
- `src/components/BoardingPass.astro`: ein Flug als Bordkarte.
- `src/pages/`: `/`, `/support`, `/datenschutz`, `/impressum`, `404`. Diese URLs sind im App Store hinterlegt und bleiben stabil.
- `public/_headers`: HTTP-Header für Netlify.

Der Pfad `/app/` ist für eine spätere Web-Version der App reserviert.

## Quellen

- Kartendaten: Natural Earth 110m Admin-0 (gemeinfrei), übernommen aus dem App-Repo (`src/data/world.json`).
- Logo: `design/logo/` im App-Repo.
- Schriften: Bricolage Grotesque und Figtree (SIL Open Font License), Latin-Subset als woff2 aus den Fontsource-Paketen; Lizenztexte in `public/fonts/`.
