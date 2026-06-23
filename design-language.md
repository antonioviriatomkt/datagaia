# Datagaia — Design Language

**Purpose:** the single visual reference for building the new `datagaia.io`. Lock this before writing components. Every color, type, spacing, and component decision in the new site should trace back to a token here.

**Last updated:** June 2026
**Sources:** current live `datagaia.io` (screenshots in `assets/screenshots/`), the animated wordmark (`assets/LOGO-ANIM_5_smaller.gif`), the build prototype (`index.html`), the build brief (`datagaia-build-brief.md`), and competitor research (CARTO + Galigeo teardown).

---

## 0. The one decision to read first — brand color direction

There is a real tension between two source documents, and the whole file resolves around it:

| | Current live brand (real) | Build prototype (`index.html`) |
|---|---|---|
| Dark | Charcoal `#323232` | Navy `#0a1c2e` |
| Accent | **Bright green `#1DD282`** | Teal→blue gradient `#15bda3 → #2f7df6` |
| Light | `#F5F5F5` | `#f4f8fa` |
| Feel | Stark, minimal, "viewfinder" | Premium SaaS, gradient-forward |

The team asked to **stay close to the current brand guidelines.** So this document **anchors on the real brand**: charcoal + bright Gaia green + the grid/viewfinder motif + the globe mark. We keep the prototype's *structure and layout patterns* (alternating feature blocks, card grids, sticky header, stats band) but re-skin them in the actual brand colors.

**What this means concretely:**
- **Primary accent = Gaia green `#1DD282`**, not the teal→blue gradient.
- **Dark surface = charcoal `#1F2421`/`#323232` family**, evolved slightly toward "ink" for contrast/AA, not the prototype's navy.
- The teal→blue gradient is **demoted to an optional secondary accent** (e.g. data-viz strokes, subtle decorative gradients) — never the dominant brand color.

> ✅ **Confirmed with owner (June 2026):** green-first direction approved. Exact brand hex is not available, so **we build with the sampled values below** and swap later only if a formal brand book differs. These are sampled directly from the live site and logo, so they're accurate to what's shipping today.

---

## 1. Brand essence

**What Datagaia is:** a B2B data-intelligence consultancy. Geomarketing (flagship) + predictive analytics + programmatic advertising. "One partner from insight to activation."

**Brand idea — "Gaia + data":** Earth/geography made legible through data. The visual world is *maps, grids, location, coordinates* — rendered in a precise, technical, slightly futuristic way. The green is the "living earth / signal" color against a neutral technical ground.

**Personality:** precise · confident · technical-but-clear · premium. The opposite of the old site's vague "outstanding, transparent results." Lead with what the client gets.

**Three words to design against:** *Precise. Spatial. Premium.*

---

## 2. Color

All colors as CSS custom properties. These map cleanly into a Tailwind theme (see §9).

### 2.1 Core palette (anchored on the real brand)

```css
:root {
  /* Brand accent — the signature Gaia green (sampled #1DD282) */
  --gaia-green:      #1DD282;  /* primary accent, CTAs, highlights, pings */
  --gaia-green-600:  #15b974;  /* hover / pressed (non-text) */
  --gaia-green-700:  #0f9b60;  /* non-text only: pin fill, focus ring (~3.5:1, NOT AA for text) */
  --gaia-ink:        #0b7a48;  /* AA-safe green TEXT on light (5.40:1 white / 4.95:1 mist) */
  --gaia-green-300:  #6fe3b1;  /* accents on dark surfaces, light strokes */
  --gaia-green-tint: #e7faf1;  /* faint green wash / icon chip backgrounds */

  /* Dark surfaces — charcoal "ink" family (evolved from live #323232) */
  --ink:    #1f2421;  /* primary dark sections, footer, dark hero (deeper than #323232 for AA) */
  --ink-2:  #2a312d;  /* raised dark cards / panels on dark */
  --char:   #323232;  /* the exact legacy charcoal — use for brand-faithful blocks */

  /* Light surfaces */
  --white:  #ffffff;
  --mist:   #f5f5f5;  /* light section background (sampled from live site) */
  --line:   #e4e9e7;  /* hairlines, card borders on light */

  /* Text */
  --text:        #1f2421;  /* body/headings on light */
  --text-muted:  #5d6b66;  /* secondary body grey (green-leaning, on-brand vs blue-grey) */
  --text-invert: #ffffff;  /* text on dark */
  --text-invert-muted: #b7c6c0; /* secondary text on dark */
}
```

### 2.2 Optional secondary accent (bridge to the prototype — use sparingly)

Keep the prototype's gradient available, but only for **decorative / data-viz** moments (chart strokes, route lines, a subtle background sheen) — never as the primary button or dominant brand color.

```css
:root {
  --accent-teal: #15bda3;
  --accent-blue: #2f7df6;
  --grad-data:  linear-gradient(115deg, #15bda3 0%, #2f7df6 100%); /* charts, route lines only */
  --grad-gaia:  linear-gradient(120deg, #1DD282 0%, #0f9b60 100%); /* on-brand green gradient for hero accents */
}
```

**Recommendation:** prefer `--grad-gaia` (green-on-green) anywhere a gradient is wanted, so the brand reads green-first. Reserve `--grad-data` for literal data visuals where two hues aid legibility.

### 2.3 Color roles & usage rules

| Role | Token | Notes |
|---|---|---|
| Page background (light) | `--white` | default |
| Alternating section background | `--mist` | every other `section` for rhythm |
| Dark sections (hero, stats band, footer, CTA) | `--ink` | the "data ground" |
| Primary action (buttons, key links) | `--gaia-green` → `--gaia-green-600` hover | one consistent green CTA everywhere |
| Green text on light | `--gaia-ink` (#0b7a48) | both `#1DD282` (~1.7:1) and `--gaia-green-700` (~3.5:1) fail AA as text; use `--gaia-ink` for eyebrows/links |
| Hairlines / card borders | `--line` | 1px |
| Map/grid overlays | green at low alpha | see §6 |

### 2.4 Contrast / accessibility (WCAG AA — brief requires it)

- **Body text:** `--text` `#1f2421` on `--white`/`--mist` → passes AA/AAA. ✅
- **On dark:** `--white` and `--text-invert-muted` on `--ink` `#1f2421` → AA. ✅ (This is why dark sections use `--ink`, deeper than the legacy `#323232`, which is borderline for muted text.)
- **Green as text:** raw `#1DD282` (≈1.7:1) and `--gaia-green-700` `#0f9b60` (≈3.5:1) both **fail** AA for text. Use **`--gaia-ink` `#0b7a48`** (5.40:1 on white / 4.95:1 on mist) for ALL green text — eyebrows, card links, ghost/nav hovers. Keep `--gaia-green-700` for non-text only (pin fill, focus ring, icon strokes — the 3:1 bar). Never set small grey-on-green or green-on-grey.
- **Green button:** white-on-green is low-contrast — primary buttons use **dark ink text on green** (`--ink` on `--gaia-green` = 7.95:1, passes AA). This is the standard; don't use white-on-green or white-on-`gaia-700` (both fail).
- Always pair color with a non-color cue (icon, underline) for state.

---

## 3. Typography

The live site uses thin, wide-tracked uppercase display type (a "technical instrument" feel). The prototype proposes Manrope + Inter. We **keep Manrope + Inter** (modern, performant, free via `next/font`) but **borrow the legacy uppercase, wide-tracked treatment for eyebrows/labels** so it still feels like Datagaia.

### 3.1 Families

```css
--font-display: 'Manrope', system-ui, sans-serif;  /* headings, eyebrows, buttons, stats */
--font-body:    'Inter', system-ui, sans-serif;    /* body, captions, UI text */
```

Load via `next/font` (self-hosted, no layout shift). Weights: Manrope 400/600/700/800; Inter 400/500/600.

### 3.2 Type scale

| Token | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | 54px / 1.08 | 800 | -0.02em | Hero H1 (desktop) |
| `display-l` | 40px / 1.12 | 800 | -0.02em | Section H2 |
| `display-m` | 30px / 1.15 | 800 | -0.015em | Feature-block H3 |
| `title` | 21px / 1.25 | 700 | -0.01em | Card titles |
| `stat` | 44px / 1.0 | 800 | -0.02em | Stats band numbers |
| `eyebrow` | 13px / 1.2 | 700 | **+0.14em** | UPPERCASE labels (the legacy signature) |
| `lead` | 19px / 1.5 | 400 | normal | Hero/section intro paragraph |
| `body` | 16px / 1.6 | 400 | normal | Default paragraph |
| `body-s` | 14px / 1.55 | 400 | normal | Card body, captions |
| `link` | inherits | 600 | normal | Inline links |

**Responsive:** clamp the display sizes — e.g. `clamp(34px, 6vw, 54px)` for H1; H2 `clamp(28px, 4vw, 40px)`. Mobile floor matches prototype's `@media(max-width:880px)` values.

### 3.3 Rules

- **Eyebrows are the brand fingerprint:** Manrope 700, UPPERCASE, `+0.14em` tracking, in `--gaia-ink` (light bg) or `--gaia-green-300` (dark bg). Use above every section H2 and feature H3.
- **One `<h1>` per page** (SEO/AEO requirement). Logical heading order.
- Headings in `--font-display` with negative tracking; body in `--font-body`.
- Body measure: max ~68ch. Lead paragraphs ~540–680px wide.
- Avoid all-caps for long strings (only eyebrows/labels/nav-overline).

---

## 4. Logo & wordmark

From `assets/LOGO-ANIM_5_smaller.gif` and live screenshots:

- **Mark:** a circular **globe / graticule** (3 vertical meridians + 2 horizontal parallels clipped to a circle) — the core brand icon. On the live site it animates (the grid draws in). **A clean vector now exists:** [`assets/logo-mark.svg`](assets/logo-mark.svg) (traced from the GIF's final frame; 64×64 viewBox, `currentColor`, brand green default).
- **Wordmark:** lowercase `datagaia.io` — keep the `.io` (owner confirmed). Set in the display family (Manrope 700, tight tracking). Full horizontal lockup: [`assets/logo-datagaia.svg`](assets/logo-datagaia.svg) (mark in green + wordmark in `currentColor`).
- **Tagline lockup:** "MAPPING / YOUR CUSTOMER" — small, uppercase, green, set to the right of the wordmark on the live header.

### Usage in the new site (confirmed with owner, June 2026)
- **Vector mark available.** [`assets/logo-mark.svg`](assets/logo-mark.svg) and the lockup [`assets/logo-datagaia.svg`](assets/logo-datagaia.svg) are traced from the GIF — scalable, crisp, tiny, `currentColor`-themeable. Use these for all **static** placements (header default state, footer, favicon, OG image) and as the reduced-motion fallback.
  - The SVG mark uses **brand green** for the globe; the lockup wordmark uses `currentColor` so it renders dark-ink on light and white on dark — set `color:` on the parent.
  - SVG wordmark is set in **Manrope 700** (our display font), reading `datagaia.io`. (The GIF's wordmark uses a different rounded face — the SVG intentionally aligns to our type system.)
- **Animated SVG now available — use it instead of the GIF.** [`assets/logo-mark-animated.svg`](assets/logo-mark-animated.svg) reproduces the GIF's draw-in (ring → 3 meridians → 2 parallels, sequenced via CSS `stroke-dashoffset` with `pathLength="1"`). It's scalable, ~1KB, and **`prefers-reduced-motion`-aware** (snaps to the finished mark, no animation). Plays once on load via `animation-fill-mode: forwards`.
  - To loop like the original GIF: change the `.dg-draw` animation to `infinite` with a longer cycle and add a hold/fade — but a one-shot draw-in is recommended for a header (looping is distracting). Keep it one-shot unless the client specifically wants the loop.
  - CSS-in-SVG animations run when the file is used inline, as `<img src>`, or as a CSS background — all fine for a Next.js header.
  - The plain GIF (`assets/LOGO-ANIM_5_smaller.gif`) can now be retired; keep it only as a reference to the original timing.
- **Globe-graticule mark is the brand fingerprint** — keep it; replace the prototype's generic gradient dot with the real globe mark. Green `--gaia-green` on dark; `--gaia-green-700` or `--ink` on light.
- **Performance/a11y for the GIF:** GIFs are heavy and can't be paused for `prefers-reduced-motion`. Serve `logo-mark.svg`/a static frame for reduced-motion users; keep the GIF lazy-loaded and outside the LCP path; prefer the SVG everywhere it doesn't need to animate.
- Tagline "Mapping your customer" is a strong, ownable line — reuse it (header overline, footer, or OG description).

---

## 5. Layout system

Inherited from the prototype (it's well-judged) — keep these.

```css
--maxw: 1180px;        /* content container */
--gutter: 24px;        /* page side padding */
--radius: 16px;        /* cards, visuals */
--radius-sm: 10px;     /* chips, small cards, buttons are pill (999px) */
--radius-lg: 24px;     /* CTA panel, large feature visuals */
--shadow: 0 18px 50px -20px rgba(31,36,33,.28);  /* soft lift (tuned to ink, not navy) */
```

### Spacing scale (8px base)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 88` px.
- Section vertical padding: **88px** desktop / **56–64px** mobile.
- Card padding: **32px / 28px**.
- Grid gaps: cards **26px**, API grid **18px**, feature columns **60px**.

### Grids
- **Container:** `max-width:1180px; margin:0 auto; padding:0 24px`.
- **Solution cards:** 3-col → 1-col under 880px.
- **Feature blocks:** 2-col (text + visual), alternating left/right (`.rev`), → stacked under 880px.
- **Stats band:** 4-col → 2-col under 880px.
- **API/geoprocessing grid:** 4-col → 1-col.
- **Footer:** 4-col (1.4fr / 1 / 1 / 1) → 2-col.

### Section rhythm
Alternate `--white` and `--mist` backgrounds; punctuate with **one dark `--ink` band** (stats) mid-page and the dark CTA + footer at the end. This matches both the prototype and the live site's "dark frame, light content, green signal" structure.

---

## 6. Signature visual motifs ("gaia + data")

These are what make it *Datagaia* and not a generic SaaS template. They come straight from the live brand (the green viewfinder rectangles over photography) + the prototype (CSS map visuals).

1. **Map graticule / grid overlay.** Faint square grid (`linear-gradient` 1px lines). On dark: green at ~8–10% alpha. On light: green/ink at ~6–8%. Used as section/visual backgrounds. Size ≈ 34–46px cells.
   ```css
   background-image:
     linear-gradient(rgba(29,210,130,.08) 1px, transparent 1px),
     linear-gradient(90deg, rgba(29,210,130,.08) 1px, transparent 1px);
   background-size: 38px 38px;
   ```
2. **Viewfinder rectangles (the legacy signature).** Thin green outlined rectangles overlapping imagery — like a targeting/mapping reticle over a city. **This is the most distinctive legacy element; bring it back** as a framing device over hero/case photography (`1.5px solid var(--gaia-green)`, low opacity, offset/overlapping). Reduced-motion safe.
3. **Location pins & pings.** Small pin (rounded-teardrop) + pulsing ping (expanding ring) in green. Pings animate `pulse 2.4s infinite` — **gate behind `prefers-reduced-motion`**.
4. **Route lines.** Dashed/solid curved `<path>` strokes for logistics/routing visuals — green (or `--grad-data` for two-tone charts).
5. **Data chips & labels.** Small white rounded chips with soft shadow over visuals ("Segment A · 12k", "Best site: 94/100", "Route −22% cost"). These sell the product without screenshots.
6. **Blobs / heat clusters.** Soft blurred green radial shapes at low opacity to suggest customer-density / catchment.

**Production note (from brief §7):** these CSS/SVG visuals are the *fallback/accent*. Where Datagaia supplies real product screenshots or map imagery, use those framed by the viewfinder rectangles; keep the lightweight CSS motifs as accents and below-the-fold fillers.

**Motion:** subtle only. Hover lifts (`translateY(-4px)`), ping pulses, logo draw-in. All animation must respect `@media (prefers-reduced-motion: reduce)` → disable transforms/keyframes.

---

## 7. Components

### Buttons
- **Primary:** `--gaia-green` fill, **`--ink` text** (Manrope 700, 15px), pill `border-radius:999px`, padding `13px 24px`. Hover → `--gaia-green-600`, `translateY(-2px)`, soft green shadow. *(Dark-ink-on-green chosen for AA; see §2.4.)*
- **Secondary (ghost):** transparent, `1.5px solid var(--line)`, `--text`. Hover → green border + `--gaia-ink` text.
- **On-dark (light ghost):** `rgba(255,255,255,.12)` fill, `1.5px solid rgba(255,255,255,.28)`, white text.
- **One primary CTA everywhere:** "Request a demo" / "Talk to an expert" → contact. (Brief + both competitors enforce single-CTA discipline.)

### Cards (solution / service)
- `--white` bg, `1px solid var(--line)`, `--radius` 16px, padding `32px 28px`.
- Hover: `translateY(-4px)`, `--shadow`, border → transparent.
- Anatomy: icon chip (52px, `--mist` or `--gaia-green-tint` bg, green stroke icon) → H3 title → muted intro → green-bulleted list → "See how it works →" link in `--gaia-ink`.
- **Bullets:** small green dot (`--gaia-green`) leading each item.

### Icon chips
- 52×52px, `--radius-sm`, `--gaia-green-tint` background, line icon stroked in `--gaia-green-700` (2px, round caps). Keep icons geometric/cartographic where possible (globe, pins, routes, charts).

### Feature block (alternating)
- 2-col: text (eyebrow → H3 → bold "key" sentence → body → optional contextual link) + visual panel.
- Visual panel: `--radius` 18px, `--mist` bg, `--line` border, `--shadow`, containing grid overlay + pins/chips/routes (§6). Height ≈ 330px desktop.
- Alternate sides every block.

### Stats band
- `--ink` background, white text, 4-col.
- Numbers in `stat` style; **green gradient or solid `--gaia-green-300`** for the figure, muted `--text-invert-muted` for the label.
- Use the brand proof stats: **80%** spatial · **90%** unexploited · **5th P** · **1 partner**.

### Geoprocessing API cards
- 4-col compact cards: `API` tag (green, `--gaia-green-tint` bg) → H4 → one-line description. (Geocoding · Service Area · Routing · VRP.)

### Testimonial / quote
- Centered, large Manrope 600 quote, ~26px, attribution row (avatar + name + role + company). Keep real client logos when supplied (proof is the #1 gap per research).

### Header (nav)
- Sticky, translucent `rgba(255,255,255,.86)` + `backdrop-filter: blur(12px)`, `--line` bottom border, height 70px.
- Globe mark + `datagaia.io` wordmark · nav links (Manrope 500, 15px, hover → `--gaia-ink`) · right: ghost secondary + primary CTA.
- Mobile: hamburger → dropdown panel (this is the one allowed client component).
- *(Consider a dark header variant over the dark hero, like the live site, then sticky-light on scroll — optional polish.)*

### CTA panel
- `--ink` radial-gradient panel, `--radius-lg` 24px, centered headline + sub + primary button. Sits before footer.

### Footer ("fat")
- `--ink` background, 4-col (brand blurb / Solutions / Company / Get in touch) + bottom bar (© + tagline). Links muted, hover → `--gaia-green-300`.

---

## 8. Imagery & iconography

- **Photography:** urban/aerial/cartographic — cities, networks, logistics — treated dark/desaturated with green viewfinder overlays (legacy style). `next/image`, WebP, descriptive `alt` (SEO/a11y).
- **Icons:** line style, 2px, round caps, geometric. Cartographic vocabulary (globe, pin, route, layers, chart). Stroked green on light, green/white on dark.
- **Data visuals:** prefer real product screenshots framed by viewfinder rectangles; fall back to the CSS/SVG map motifs (§6).
- **No stock-photo clichés** (handshakes, generic offices). Stay maps-and-data.

---

## 9. Implementation notes (Tailwind / Next.js)

Map tokens into `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      gaia: { DEFAULT:'#1DD282', 600:'#15b974', 700:'#0f9b60', ink:'#0b7a48', 300:'#6fe3b1', tint:'#e7faf1' },
      ink:  { DEFAULT:'#1f2421', 2:'#2a312d', char:'#323232' },
      mist: '#f5f5f5', line:'#e4e9e7',
      muted:'#5d6b66',
    },
    fontFamily: { display:['var(--font-manrope)'], body:['var(--font-inter)'] },
    borderRadius: { card:'16px', lg:'24px' },
    maxWidth: { content:'1180px' },
    boxShadow: { lift:'0 18px 50px -20px rgba(31,36,33,.28)' },
  }
}
```

- Fonts via `next/font/google` (Manrope, Inter) → CSS vars `--font-manrope`, `--font-inter`.
- Respect `prefers-reduced-motion` globally (disable ping/blur/lift animations).
- Keep motifs as pure CSS/SVG (no JS) so they render server-side and stay crawlable (brief §3).
- All decorative visuals `aria-hidden`; real content stays in semantic HTML.

---

## 10. Do / Don't

**Do**
- Lead with **green-on-charcoal**; let the green be the single signal color.
- Reuse the **globe-graticule mark** and **viewfinder-rectangle** motif — they're the brand's fingerprint.
- Keep eyebrows uppercase + wide-tracked.
- One primary CTA ("Request a demo"). Proof everywhere.
- Benefit-led, concrete copy (per brief tone).

**Don't**
- Don't let the prototype's teal→blue gradient become the dominant brand color — it's a secondary/data accent only.
- Don't use raw `#1DD282` for small text or white-on-green small buttons (fails AA).
- Don't drift to navy — keep the charcoal "ink" family.
- Don't use generic stock photography or hide content behind JS.
- Don't over-build — match Galigeo's restraint, borrow CARTO's section patterns (research §4).

---

## 11. Quick-reference token sheet

```css
:root{
  --gaia-green:#1DD282; --gaia-green-600:#15b974; --gaia-green-700:#0f9b60; --gaia-ink:#0b7a48;
  --gaia-green-300:#6fe3b1; --gaia-green-tint:#e7faf1;
  --ink:#1f2421; --ink-2:#2a312d; --char:#323232;
  --white:#ffffff; --mist:#f5f5f5; --line:#e4e9e7;
  --text:#1f2421; --text-muted:#5d6b66; --text-invert:#ffffff; --text-invert-muted:#b7c6c0;
  --accent-teal:#15bda3; --accent-blue:#2f7df6;
  --grad-gaia:linear-gradient(120deg,#1DD282,#0f9b60);
  --grad-data:linear-gradient(115deg,#15bda3,#2f7df6);
  --font-display:'Manrope',system-ui,sans-serif; --font-body:'Inter',system-ui,sans-serif;
  --maxw:1180px; --gutter:24px;
  --radius:16px; --radius-sm:10px; --radius-lg:24px;
  --shadow:0 18px 50px -20px rgba(31,36,33,.28);
}
```

---

### Decisions confirmed with owner (June 2026)
1. ✅ **Palette:** build with the sampled greens/charcoals now; swap later only if a formal brand book differs. (No exact hex available yet.)
2. ✅ **Green-first** accent — confirmed. Teal→blue gradient stays as a secondary/data-viz accent only.
3. ✅ **Wordmark:** `datagaia.io` (keep the `.io`).
4. ✅ **Logo animation:** keep the GIF for animated contexts. **Clean SVGs now traced from the GIF:** [`assets/logo-mark.svg`](assets/logo-mark.svg) (globe) + [`assets/logo-datagaia.svg`](assets/logo-datagaia.svg) (lockup).

### Still open (follow-ups, not blockers)
- ~~Animated SVG version of the mark~~ ✅ done — [`assets/logo-mark-animated.svg`](assets/logo-mark-animated.svg) (reduced-motion-aware draw-in; GIF can be retired).
- Confirm the SVG wordmark face: it uses **Manrope** (our system font), which differs from the GIF's rounded face — fine per the type system, but flag if the team wants the original face vectorized instead.
- Real client logos, case studies w/ metrics, team bios, testimonial, contact-routing email (per brief §13).
- Reconcile sampled hex against a formal brand book if one surfaces.
