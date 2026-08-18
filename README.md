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
│  └─ seo.ts
├─ app/
│  ├─ (admin)/admin/         Staff CMS
│  ├─ api/{guide,enquiry,revalidate,ingest}/
│  └─ …                      Public routes
└─ supabase/migrations/      Schema + pgvector
```

---

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
