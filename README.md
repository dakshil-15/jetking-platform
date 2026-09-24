# Jetking Unified Platform

One Next.js project containing the complete Jetking adaptive website and the
Jetking AI assistant. The website remains the canonical base at `/`; users can
switch to the assistant at `/chatbot` and return through the Website control.

The original website implementation is preserved, and the original chatbot
features, local knowledge base, embeddings, assets, scripts, and model setup
now run inside the same application and dependency graph.

**Status:** full Phase 1 architecture implemented. CMS = in-repo Admin Panel; Guide = OpenAI embeddings + pgvector/BM25 hybrid + GPT-4o; analytics via `track()` → GA4/GTM + PostHog.

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
# Admin: http://localhost:3000/admin  (ADMIN_PASSWORD or open in local)
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run check` | typecheck + lint + tests (run before every commit) |
| `npm run test` | Vitest — persona rule matrix + guardrail suite + CMS rules |
| `npm run verify:seo -- --base <url>` | The SEO gate. Requires a running server |
| `npm run crawl:legacy -- --base <url>` | Inventory the existing site → `data/legacy-urls.json` |
| `npm run build:redirects` | Propose a redirect map from that inventory |
| `npm run ingest:embeddings` | Chunk CMS content → OpenAI embed → pgvector / local store |
| `npm run migrate:cms` | Seed Admin CMS store from local fixtures |
| `npm run sync:chatbot-content` | Refresh the assistant knowledge content |
| `npm run check:chatbot-answers` | Verify grounded assistant answers |
| `npm run model:setup` / `npm run model:check` | Set up or verify the optional local Ollama model |
| `npm run export:chatbot-content` | Export the active website ContentSource into the assistant corpus |
| `npm run build:chatbot-index` | Export website data and rebuild the unified local embedding index |
| `npm run eval:chatbot-retrieval` | Run exact-answer, grounding, location, and off-topic retrieval checks |

### Keeping Jetking AI trained on current content

Jetking facts use retrieval-augmented generation rather than model fine-tuning.
This keeps fees, courses, centres, placement details, FAQs, and articles
refreshable without teaching stale facts to the model. After publishing CMS or
fixture changes, run:

```bash
npm run build:chatbot-index
npm run eval:chatbot-retrieval
npm run model:check
```

`build:chatbot-index` merges the active website `ContentSource` with the richer
legacy chatbot knowledge base, preserves reusable vectors, and embeds only new
or changed records. The API resolves exact programme and location entities
before letting the local model compose a grounded response.

---

## The one rule that governs the architecture

> **Every indexable page renders one canonical, persona-neutral HTML document — identical for crawlers and for first paint. Adaptation is additive and happens after hydration.**

Personalising server-rendered HTML would mean serving different content to Googlebot than to users (cloaking) and would shatter CDN caching across ~180 ranking pages. So:

- `src/proxy.ts` classifies at the edge and writes a signed cookie. It **never** rewrites HTML.
- Crawlers are skipped entirely — no cookie, no `Set-Cookie` on a cached document.
- Adaptation happens only through the primitives in `src/persona/AdaptiveSlot.tsx`.

---

## Locked stack

| Concern | Choice |
|---|---|
| CMS | In-repo `/admin` → Postgres (or `data/cms` file store) |
| Site reads | `ContentSource` (`CONTENT_SOURCE=local` \| `admin`) |
| Embeddings | OpenAI `text-embedding-3-small` |
| Vectors | Supabase pgvector (hybrid with BM25) |
| Answers | GPT-4o |
| Analytics | `track()` → GTM/GA4 + PostHog |

---

## Layout

```
src/
├─ proxy.ts                  Edge persona classification
├─ persona/                  Adaptive engine + CMS rule matcher + return-visit profile
├─ guide/                    RAG Guide (BM25 + pgvector hybrid, GPT-4o, guardrails)
├─ lib/
│  ├─ content/               CMS-agnostic ContentSource
│  ├─ cms/                   Admin file/Postgres store + publish hooks
│  ├─ supabase.ts            Thin Supabase client
│  ├─ analytics.ts           Vendor-neutral track()
│  ├─ seo.ts
│  └─ site.ts                Site constants, mainNav, coursesMenu
├─ components/home/          Homepage: v2 hero, v3 section stack (see Homepage)
├─ app/
│  ├─ (admin)/admin/         Staff CMS
│  ├─ api/{guide,enquiry,revalidate,ingest}/
│  └─ …                      Public routes
└─ supabase/migrations/      Schema + pgvector
```

---

## Homepage (`/`)

The homepage is a hero followed by a section stack, ending in the normal site footer.
`src/app/page.tsx` loads one `loadHomeData()` (`src/components/home/data.ts`) and renders
`HomeV2` (the original hero) then `HomeSections` (everything below).

| Order | Section | Component (`src/components/home/v3/`) | Data |
|---|---|---|---|
| 0 | Hero: headline, persona chooser, action bar, quick-action rail | `../v2/HomeV2.tsx` | website copy, static |
| 1 | "Trusted by top companies": certification and hiring-partner logos | `CredibilityMarquee.tsx` | `public/logos/`, `HIRING_PARTNERS` |
| 2 | Explore our programmes: technology tabs and carousel | `ProgramShowcase.tsx`, `CardTrack.tsx` | `content.listCourses()` |
| 3 | Build your career, step by step (Learn / Practice / Get certified / Placement support) | `HowItWorks.tsx` | `placements/data.ts`, `explore/content.ts`, course certifications |
| 4 | "Our learners, our pride" red banner with testimonial carousel | `PlacementProof.tsx` | published testimonials in `placements/data.ts` |
| 5 | Recognition and university partners | `Recognitions.tsx` | About timeline, course fixtures, `explore/content.ts` |
| 6 | India centre map with "Find a centre near you" search | `CentreNetwork.tsx`, `india-map.ts` | centres and cities; city coordinates in `india-map.ts` |
| 7 | What makes Jetking different? | `WhyJetking.tsx` | the live site's "reasons" in `explore/content.ts` |
| 8 | Blog teaser | `BlogTeaser.tsx` | latest 3 posts |
| 9 | Franchise band | `FranchiseBand.tsx` | static |
| 10 | Inline callback form | `FinalCta.tsx` | `QuickEnquiryForm` to `/api/enquiry` |

The layout follows the approved design mock and the copy comes from content already on the site (`explore/content.ts` is shared with `/explore`). Claims in the mock that the data does not back
up (for example NASSCOM membership, "100% job guarantee", star ratings) are deliberately
not shown. 
Backgrounds alternate grey (`--dc-surface`) and white section by section; keep that when
adding or reordering sections.

**Design language.** Sections use the shared `.dark-canvas` token layer (`--dc-*`, in
`src/styles/dark-canvas.css`) with `.no-orbs`, and the four global category hues
(`--theme-network|cloud|cyber|ai-ink/tint`, exposed as `HUE_VARS` in `v3/data.ts`) for
per-card icon chips. The hero keeps its own `.home-v2` skin (`src/styles/home.css`).

**Rules specific to this page**
- No unverified numbers or invented quotes. Stats come from `buildFigures()`; the placement
  slider uses only Jetking's own published testimonials and always shows the placement
  disclaimer. There is no placement guarantee claim in the new sections.
- The quick-action rail (`ActionRail`) is `position: fixed`. It is contained to the hero by the `[transform:translateZ(0)] overflow-hidden` wrapper around `HomeV2` in `page.tsx`, so it scrolls away with the hero. Do not reserve a right-hand gutter in the sections.
- The India map outline (`india-map.ts`) is the Datameet `india-composite` boundary
  simplified to one SVG path (islands omitted). The content model has no coordinates, so
  pins use per-city coordinates in `CITY_COORDS`; add an entry when a new city gets a
  centre. Map pins are mouse-only duplicates; the city chips are the accessible control.
- The `/courses` filters read `?tech=` (cloud, cyber-security, networking, data,
  design-gaming, marketing, hardware-os) and `?level=`. Links must use `tech`, not `technology`.

**Header.** From 1024px the header shows About Us, Courses, Centres and Placements as a
link row. Courses has a category dropdown (`src/components/CoursesMenu.tsx`, entries in
`coursesMenu` in `src/lib/site.ts`) that marks the current filter. The full nav stays in the
drawer at every width.

---

## Accessibility and responsive checks

Target: WCAG 2.2 AA. The public routes were scanned with axe-core (tags `wcag2a`, `wcag2aa`,
`wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`) at 1280px and 375px wide, with no
violations and no horizontal overflow (also checked at 320, 768 and 1024px on `/`). The homepage supports both light and dark themes: use theme tokens (`bg-background`, `text-foreground`, `--dc-*`), never hard-coded white.

Conventions that keep it that way:
- Brand red under light text uses `#c7141c` (5.9:1); `#ea1c24` is 4.36:1 and fails. `.dc-cta`
  already does this.
- Scrollable regions need `tabIndex={0}` and an accessible name.
- Avoid `<aside>` inside `<main>`; decorative logos next to a visible caption use `alt=""`.
- Interactive targets are at least 24px (40px for the map pins on touch widths).
- Autoplay and marquees have a pause control and respect `prefers-reduced-motion`.

Re-run the scan by loading axe-core on a page in a browser and calling `axe.run()`; disable
CSS transitions first, or contrast checks can catch a colour mid-animation.

---

## Repository

`origin` is `https://github.com/fe-techTeam/jetking-website-new.git` (the repository moved
from `dakshil-15/jetking-platform`). The working branch for the redesign is `frontend`.

## Environment

See `.env.example`. Critical keys:

- `NEXT_PUBLIC_SITE_URL` — baked into canonicals at build time
- `PERSONA_COOKIE_SECRET` — HMAC for `jk_persona`
- `OPENAI_API_KEY` — Guide + embeddings (absent → degraded citation-only answers)
- `CONTENT_SOURCE=admin` — read published CMS data
- `REVALIDATE_SECRET` — protect publish webhooks
- `ADMIN_PASSWORD` — simple staff gate when Supabase Auth is unset
- `RATE_LIMIT_ALLOW_MEMORY=true` — required for single-instance prod with in-memory limiter

---

## Three invariants worth protecting

1. **Fees are never model-generated** — structured CMS lookup or counsellor handoff only.
2. **`AdaptiveList` reorders, never filters** — indexable links stay in the DOM.
3. **Unverified trust claims cannot render** — filtered at the content source.
