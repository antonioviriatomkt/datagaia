# Datagaia Website — Build Brief

**For:** the engineering agent (Claude Code) building the new datagaia.io site.
**Status:** Greenfield rebuild. A design prototype already exists (`datagaia-prototype.html`) — use it as the visual/structural reference, not as production code.
**Last updated:** June 2026.

---

## 1. Goal & non-negotiables

Build a fast, modern marketing website for **Datagaia**, a data-intelligence consultancy. The site replaces a dated 2018 WordPress site at `datagaia.io`.

Two outcomes matter above all:

1. **Search + answer-engine visibility.** The site MUST rank on Google AND be citable by AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews). This drives the rendering architecture — see §3. Treat this as a hard requirement, not a nice-to-have.
2. **Room to grow.** The owner may expand this from a brochure site into something larger (interactive maps, gated content, data-driven pages). Architecture should not box that in.

Secondary: clean, premium look (the company sells "cutting-edge data" — the site must look the part); easy-ish content editing for a non-technical team via CMS.

---

## 2. Tech stack (decided)

- **Framework:** Next.js (App Router, latest stable). React Server Components.
- **Hosting:** Vercel.
- **CMS:** Sanity (headless). Content fetched **server-side only**.
- **Styling:** Tailwind CSS (matches the prototype's utility approach; swap in if you prefer, but keep it lean — no heavy UI kit).
- **Language:** TypeScript.
- **Package manager:** pnpm (or npm — be consistent).

Rationale: the team already knows this stack; it scales beyond a brochure site; and rendered correctly (§3) it has no SEO/AEO disadvantage versus static HTML.

---

## 3. CRITICAL — Rendering & crawlability rules

This is the most important section. Get it wrong and the whole SEO/AEO goal fails.

**Why it matters:** Google renders JavaScript, but AI answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot) **fetch raw HTML and do NOT execute JS**. Any content that only appears after client-side hydration is invisible to them.

**Rules:**

1. **All indexable content renders on the server.** Use **SSG or ISR** (static generation, optionally revalidated on a timer) for every public page. Default to static; use ISR only where content changes often.
2. **Fetch Sanity data in Server Components** at build/request time. NEVER fetch content client-side (`useEffect`, client-side SWR/fetch) for anything that should be indexed.
3. **Minimize `'use client'`.** Only interactive leaf components (mobile menu toggle, form, any future map widget) may be client components. No page text lives inside client components.
4. **No content gated behind JS interaction** (tabs/accordions are fine ONLY if the content is present in the DOM on load and just visually toggled).
5. Verify by viewing **page source** (not the inspector): all headline/body copy must be present in the raw HTML.

---

## 4. SEO / AEO requirements (acceptance criteria)

- **Metadata API:** unique `<title>`, meta description, canonical URL, and Open Graph/Twitter tags per route. Use Next.js Metadata API.
- **Structured data (JSON-LD), server-rendered:**
  - `Organization` (site-wide) — name, logo, url, sameAs (social), contactPoint.
  - `Service` for each of the three services.
  - `FAQPage` on any page with an FAQ block.
  - `BreadcrumbList` where there's a hierarchy.
  - Validate against Google Rich Results Test before considering a page done.
- **`sitemap.xml`** — generate via Next's native `sitemap.ts` (include all CMS-driven routes).
- **`robots.txt`** via Next's native `robots.ts`. Explicitly **allow** `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, plus standard bots. Point to the sitemap.
- **`llms.txt`** at site root — concise description of the company + key page links for AI discoverability.
- **Semantic HTML:** exactly one `<h1>` per page; logical heading order; `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` where appropriate; descriptive `alt` on all images.
- **AEO content shape:** question-style subheadings, an FAQ section per service, concise declarative answer paragraphs, and visible "last updated" dates on articles/cases. Answer engines lift well-structured, dated, factual text.
- **Performance (Core Web Vitals green):** `next/image` for all imagery, font optimization via `next/font`, lazy-load below-the-fold media, keep LCP/CLS in the green. Edge-served from Vercel.
- **Accessibility:** WCAG AA color contrast, keyboard-navigable, focus states, reduced-motion support for the animated visuals.

---

## 5. The company — content source of truth

Datagaia is a B2B data consultancy. Three services; geomarketing is the flagship and gets the most depth. Use this as the factual basis for all copy. (Owner to supply real client names, logos, case studies, and team bios — leave clearly-marked placeholders until then.)

**Tagline direction:** "Turn the *where* in your data into your next decision."

**Elevator pitch:** 80% of business data carries a location, yet most of it goes unused. Datagaia puts customers on the map, predicts what they'll do next, and activates the right message in the right place — one partner from insight to activation.

### Service 1 — Geomarketing (flagship)
Location intelligence: combine the client's business intelligence with demographic, socioeconomic and mobility data to see and act on customers in space. Positioned as "the 5th P of the marketing mix."
- **Visualize & model:** geocode customer data, enrich with demographics/spend to see where value concentrates.
- **Plan & expand:** site selection for new outlets; sales-territory design (balance workload, potential, drive time); catchment/service-area analysis avoiding overlap & cannibalisation.
- **Operate & deliver:** location-based services; fleet logistics; route optimisation.
- **Geoprocessing APIs (developer-facing):** web services returning JSON/XML, built on ESRI/ArcGIS:
  - **Geocoding** — addresses → lat/long.
  - **Service Area** — population within X minutes of a location.
  - **Routing** — optimal path customer → store.
  - **VRP (Vehicle Routing Problem)** — delivery routing minimising cost & time.

### Service 2 — Predictive Analytics & Sentiment Analysis
Analyse historical + live data to build statistical models predicting customer behaviour and sentiment. Use cases: churn prediction, demand forecasting, lifetime-value scoring, customer sentiment analysis. Models built on the client's own data.

### Service 3 — Programmatic Advertising
Activate insight with personalised, automated ad campaigns. Translate geomarketing + predictive models into precise audiences and geofencing strategies; deliver personalised ads programmatically with transparent, measurable reporting.

### Key proof stats (already public-facing brand messaging)
- 80% of business data contains a spatial component.
- 90% of that location data sits unexploited.
- Location = "the 5th P" of the marketing mix.

---

## 6. Information architecture

Start as a small multi-page site (better for SEO than one long page — more indexable URLs, each targeting distinct queries):

- `/` — Home (overview, all three services teased, proof, CTA).
- `/geomarketing` — flagship deep dive (the meatiest page; alternating feature blocks + geoprocessing APIs + FAQ).
- `/predictive-analytics` — service page + FAQ.
- `/programmatic-advertising` — service page + FAQ.
- `/cases` — case studies index (CMS collection). Individual: `/cases/[slug]`.
- `/clients` — logo wall + testimonials.
- `/about` (or `/team`) — company + team.
- `/contact` — contact form + demo request.
- `/blog` (optional, recommended for AEO/SEO) — `/blog/[slug]`.

Primary conversion goal across the whole site: **"Request a demo / Talk to an expert"** → contact form. Keep one clear primary CTA everywhere.

---

## 7. Design direction

Mirror the prototype (`datagaia-prototype.html`). Key tokens:

- **Palette:** deep navy ink `#0a1c2e` (dark sections/text), teal→blue gradient accent `linear-gradient(115deg,#15bda3,#2f7df6)`, light mist background `#f4f8fa`, body grey `#5a7184`, hairline `#e3ecf1`.
- **Type:** Manrope (headings, 700–800, tight letter-spacing) + Inter (body). Load via `next/font`.
- **Components:** sticky translucent header w/ blur; pill buttons (gradient primary, ghost secondary); rounded cards (16px radius, lift on hover); alternating two-column feature blocks (text + visual); dark stats band; fat footer.
- **Visual style:** "gaia/earth + data" — subtle map-grid backgrounds, map pins, pulsing location pings, route lines. In the prototype these are pure CSS/SVG; in production, replace with real product screenshots / map imagery where available, but keep the lightweight CSS visuals as fallback/accent. Respect `prefers-reduced-motion`.
- **Tone:** confident, benefit-led, concrete. Avoid the old site's vague "outstanding, transparent results." Lead with what the client gets.

The prototype contains finished, drafted copy for the home and service sections — reuse it. Don't regress to placeholder lorem.

---

## 8. Drafted copy (reuse from prototype)

The prototype file has production-ready copy for: hero, the three solution cards, the three geomarketing feature blocks (Visualize / Plan / Operate), the geoprocessing API cards, the stats band, predictive and programmatic sections, and CTA. Lift this copy directly. Expand each service page with a short intro + an FAQ (3–5 Q&As) written in the same voice for AEO.

Placeholders to keep until the owner supplies real assets: client logos, the testimonial quote/author, case-study content, team bios. Mark them clearly (e.g. `{/* PLACEHOLDER: real client logo */}`).

---

## 9. Sanity CMS schema

Model content so the team can edit without touching code. Suggested document types:

- **`service`** — title, slug, summary, hero copy, ordered list of feature blocks (each: eyebrow, heading, key sentence, body, optional image), FAQ array (question, answer), SEO fields (metaTitle, metaDescription, ogImage).
- **`caseStudy`** — title, slug, client, industry, challenge, solution, results (array of metric + label), body (portable text), heroImage, publishedAt, updatedAt, SEO fields.
- **`client`** — name, logo, website, isFeatured, testimonial (quote, authorName, authorRole, authorPhoto).
- **`teamMember`** — name, role, photo, bio, order.
- **`post`** (if blog) — title, slug, excerpt, body (portable text), author (ref), publishedAt, updatedAt, tags, SEO fields.
- **`siteSettings`** (singleton) — logo, nav, footer links, social URLs, default SEO, contact email, Organization JSON-LD fields.

Fetch via GROQ in Server Components. Use Sanity's `@sanity/image-url` with `next/image`. Set up Sanity Studio (embedded at `/studio` or separate) for the team.

---

## 10. Build sequence (suggested)

1. Scaffold Next.js (App Router, TS, Tailwind). Configure `next/font` (Manrope + Inter), color tokens in Tailwind config.
2. Build shared layout: header (with client-component mobile menu), footer, button/card primitives, section wrappers.
3. Build the Home page with the prototype copy, fully server-rendered.
4. Build `/geomarketing` (alternating feature blocks, geoprocessing API grid, FAQ).
5. Build `/predictive-analytics` and `/programmatic-advertising`.
6. Wire Sanity: schemas, Studio, GROQ queries; drive `/cases`, `/clients`, `/about` from CMS.
7. Contact form (client component) → email/CRM endpoint (e.g. Resend, or Vercel serverless route). Validate + spam-protect.
8. SEO layer: Metadata API per route, JSON-LD components, `sitemap.ts`, `robots.ts`, `llms.txt`.
9. Performance + a11y pass. Validate structured data. Check raw page source for content presence (§3.5).
10. Deploy to Vercel; connect `datagaia.io`.

---

## 11. Definition of done

- [ ] Every public page ships full content in raw HTML (verified via View Source, JS disabled).
- [ ] All three services + home have unique metadata + valid JSON-LD (passes Rich Results Test).
- [ ] `sitemap.xml`, `robots.txt` (AI bots allowed), and `llms.txt` present and correct.
- [ ] Core Web Vitals green on mobile (Lighthouse ≥ 90 Performance & SEO).
- [ ] WCAG AA contrast; keyboard nav; reduced-motion respected.
- [ ] Content editable in Sanity Studio without code changes.
- [ ] Contact form delivers and is spam-protected.
- [ ] Deployed on Vercel at the production domain with SSL.

---

## 12. Reference sites (for structure & patterns — do not copy assets)

- **Galigeo** (galigeo.com) — closest analog in scale/offer. Steal: use-case-led nav, 3-card solutions grid, named testimonials with company logos, concrete outcome metrics. Stack: Next.js + Vercel + BaseHub CMS.
- **CARTO** (carto.com, /solutions/geomarketing) — category leader. Steal: benefit-led/loss-framed headlines, alternating feature blocks to explain complex services, proof everywhere (logo walls, quote carousels → case studies), one persistent "Request a demo" CTA.

Datagaia is far smaller than CARTO — match Galigeo's restraint, borrow CARTO's section patterns. Don't over-build.

---

## 13. Open items for the owner (flag, don't block)

- Real client names, logos, and permission to display them.
- 1–3 case studies with concrete results/metrics.
- Team member names, roles, photos, bios.
- A real testimonial quote + attribution.
- Confirm contact email / where demo requests should route.
- Confirm brand assets (logo files, exact brand colors) — prototype palette is an informed guess.
