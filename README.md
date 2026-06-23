# Datagaia

Marketing website for **Datagaia** — geomarketing, predictive analytics & programmatic advertising.

## Stack

- **Next.js 16** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config — design tokens live in [`app/globals.css`](app/globals.css))
- **Sanity** (headless CMS) — _planned, Phase 5_
- **Vercel** hosting

All indexable content is server-rendered (SSG/ISR) so the site is crawlable by both Google and AI answer-engines (GPTBot, ClaudeBot, PerplexityBot). See `datagaia-build-brief.md` §3.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (static export of pages)
npm run start    # serve the production build
npx eslint .     # lint
```

## Project structure

```
app/                 # routes, layout, global styles, favicon (app/icon.svg)
components/
  brand/             # GlobeMark, Logo (the animated graticule mark)
  ui/                # Button, Card, Section, Eyebrow, Chip, IconChip, StatBand
  layout/            # Header, MobileMenu (client), Footer
  sections/          # FeatureBlock (alternating)
  visuals/           # map motifs: pins, pings, routes, viewfinder, panels
lib/                 # site config (nav/CTA), cn() helper
public/              # logo SVGs + static assets
reference/           # original HTML prototype (design reference only)
assets/              # source brand assets (logos, screenshots)
```

## Design

The visual system is documented in [`design-language.md`](design-language.md) — brand green `#1DD282` on charcoal ink, Manrope + Inter, the globe-graticule mark, and the "gaia + data" map motifs. Brand colors are sampled from the current live site (exact hex to be confirmed with the owner).

## Build plan

Phased task map (with the 1-week client-demo milestone) lives in the team's Notion **Build Tasks** page.
