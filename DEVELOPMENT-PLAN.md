# Jetking Adaptive Website — Development Plan (Phase 1)

**Source:** Jetking × First Economy — Adaptive AI Website, Phase 1 Proposal
**Commercials:** ₹6,00,000 fixed · 7 weeks · Test → Staging → Production
**Milestones:** 40% kickoff · 30% end Week 2 (persona + design + migration-plan sign-off) · 30% go-live Week 7

---

## 1. What we are actually building

Three products shipping as one site:

| # | Product | Risk profile | Where it lives |
|---|---|---|---|
| A | **Marketing site + CMS** — home, courses, centres, cities, ~136 blog posts, enquiry flow | SEO-critical. Failure = lost rankings = lost revenue | Next.js App Router + headless CMS, SSG/ISR |
| B | **Deterministic persona & nudge engine** — site-wide adaptive layer | Must never misbehave; must never break crawlability | Edge Middleware + client-side slot rendering |
| C | **Grounded AI Guide** — RAG assistant, guardrailed, hands off to counsellor | Reputational. A wrong fee quote is worse than no chatbot | Route handler + pgvector + GPT-4o |

**The definition of done for Phase 1:** production site live on Vercel, every legacy URL 301'd or preserved, Search Console showing no coverage regressions, persona engine live on all templates, AI Guide answering from Jetking content only, counsellor handoff working, marketing team trained on the CMS.

---

## 2. Architecture

### 2.1 The one decision that governs everything: personalisation vs. SEO

Personalising server-rendered HTML is the single biggest technical risk in this project. If Googlebot receives different HTML than a user, that's cloaking. If every persona gets its own SSR render, the CDN cache fragments and TTFB/Core Web Vitals collapse — on ~180 pages that are ranking today.

**The rule we build to:**

> Every indexable page renders one canonical, persona-neutral HTML document — statically generated, identical for crawlers and first-paint users. The adaptive layer is **additive and client-hydrated**: it re-orders, highlights, and injects nudges into pre-declared slots *after* hydration. No persona ever removes indexable content or changes canonical/meta/heading structure.

Consequences we accept and design around:
- Persona-adaptive content is invisible to crawlers **by design** — that is the correct, safe outcome, not a limitation.
- Nudges must not cause layout shift (CLS). Slots are reserved with fixed min-heights; nudges animate in.
- Anything that *must* be indexed (course descriptions, blog body, centre details) is in the static document, always.

**Edge Middleware** does classification only — it reads first-touch signals, writes a signed `jk_persona` cookie, and passes through. It does not rewrite HTML on indexable routes.

### 2.2 Layer diagram

```
                          User
                            │
                            ▼
                   Next.js Website (SSR/ISR)
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     Persona Engine   Admin Panel CMS    AI Guide (RAG)
          │                 │                 │
          ▼                 ▼                 ▼
   Personalization     Website Data     Vector Database
          │                                   │
          └──────────────► LLM ◄──────────────┘
                            │
                            ▼
                      Response to User
```

Detail view (same system, runtime paths):

```
Visitor
  │
  ├─► Edge Middleware ── classify(utm, referrer, geo-IP, existing cookie)
  │        └─► sets  jk_persona = {id, confidence, signals[], ts}   (signed, 30d)
  │
  ├─► Next.js App Router
  │     ├─ Static/ISR page shell  ◄── Admin Panel CMS (via ContentSource) ── indexable document
  │     └─ <AdaptiveSlot> components  ◄── Persona Engine (client) ── nudges, re-ranking, CTA swap
  │
  ├─► /api/guide  ──► retrieve (pgvector + BM25 hybrid) ──► GPT-4o ──► guarded answer + citations
  │                        ▲                                          │
  │                        └── ingest pipeline ◄── CMS publish hook   └─► counsellor handoff
  │
  └─► Event layer ──► GA4/GTM (existing)  +  PostHog (cohorts, A/B)  +  Postgres (engine feedback)
```

**CMS decision (locked):** in-repo Admin Panel at `/admin` — not Strapi, not Sanity. Writes go to Supabase Postgres (or local `data/cms` file store when Supabase is unset). The public site never imports CMS internals; it reads only through `src/lib/content` (`ContentSource`). Publish triggers ISR revalidation + RAG re-ingest.

### 2.3 Stack, locked

| Concern | Choice | Note |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript strict** | RSC for the static shell, client components only inside adaptive slots |
| Styling | **Tailwind CSS v4** + design tokens as CSS variables | Tokens generated from the design system, single source of truth |
| Motion | **Framer Motion** | Restricted to nudges/guide; `prefers-reduced-motion` respected |
| CMS | **Own Admin Panel** (`/admin`, in-repo) | Server Actions → Postgres. Site reads via `CONTENT_SOURCE=admin` |
| Content DB | **Supabase Postgres** | Source of truth for all website entities the admin edits |
| DB / vectors | **Supabase (Postgres + pgvector)** | Event store, guide transcripts, embeddings, persona feedback |
| LLM | **OpenAI GPT-4o** | One vendor with embeddings; guardrails stay model-agnostic |
| Embeddings | **OpenAI `text-embedding-3-small`** | 1536-dim, adequate for ~2k chunks |
| Hosting | **Vercel** | Preview = staging, Production = live. Vercel Analytics for RUM/CWV |
| Analytics | GA4 + GTM (existing, carried over) + **PostHog** | PostHog owns cohorts, funnels, feature flags, A/B |
| Forms/CRM | Existing enquiry → State/Centre routing → counsellor (form + WhatsApp) | **Preserve, do not redesign.** Integration only |

---

## 3. Repository structure

Single Next.js app, no monorepo — 7 weeks does not pay back a Turborepo.

```
jetking-website/
├─ src/
│  ├─ app/
│  │  ├─ (site)/                     # public, indexable
│  │  │  ├─ page.tsx                 # home — adaptive entry
│  │  │  ├─ courses/[slug]/page.tsx
│  │  │  ├─ centres/[city]/[slug]/page.tsx
│  │  │  ├─ [city]/page.tsx          # city landing pages (40+)
│  │  │  ├─ blog/[slug]/page.tsx     # ~136 posts
│  │  │  └─ franchise/page.tsx
│  │  ├─ api/
│  │  │  ├─ guide/route.ts           # RAG chat (streaming)
│  │  │  ├─ enquiry/route.ts         # → CRM + routing
│  │  │  ├─ events/route.ts          # → Postgres event sink
│  │  │  └─ revalidate/route.ts      # Admin CMS publish → ISR
│  │  └─ sitemap.ts, robots.ts, opengraph-image.tsx
│  ├─ middleware.ts                  # persona classification at the edge
│  ├─ persona/
│  │  ├─ rules.ts                    # THE rulebook — versioned, reviewable
│  │  ├─ signals.ts                  # signal extraction + normalisation
│  │  ├─ classify.ts                 # pure fn: signals → {persona, confidence}
│  │  ├─ PersonaProvider.tsx         # client context
│  │  └─ AdaptiveSlot.tsx            # the only way content adapts
│  ├─ guide/
│  │  ├─ retrieve.ts                 # pgvector similarity + reranking
│  │  ├─ guardrails.ts               # pre/post filters, refusal policy
│  │  ├─ prompt.ts                   # system prompt, versioned
│  │  └─ handoff.ts                  # → counsellor / WhatsApp
│  ├─ components/                    # design-system components
│  ├─ lib/{content,supabase,analytics,seo}.ts
│  │  └─ content/sources/{local,admin}.ts   # ContentSource adapters
│  └─ styles/tokens.css
├─ admin/                            # Own Admin Panel CMS (Next.js route group or sibling app)
│  ├─ (auth)/                        # staff login
│  ├─ courses|centres|cities|posts|faqs|nudges/
│  └─ api/publish/                   # webhook → ISR revalidate + embedding ingest
├─ scripts/
│  ├─ crawl-legacy.ts                # inventory every live URL
│  ├─ migrate-blog.ts                # legacy → Admin CMS / Postgres
│  ├─ build-redirects.ts             # 1:1 map generation
│  ├─ verify-redirects.ts            # CI gate: every legacy URL → 200
│  └─ ingest-embeddings.ts           # CMS publish → chunks → pgvector
├─ supabase/migrations/
├─ tests/{e2e,unit,seo}/
└─ redirects.json                    # generated, committed, reviewed
```

---

## 4. The persona engine — specification

### 4.1 Personas (to be confirmed against GA4/lead data in Week 1)

| ID | Persona | Primary goal | Money decision |
|---|---|---|---|
| `student` | School-leaver, post-12th | Degree + early employment, no entrance test | Influenced, doesn't pay |
| `professional` | Working professional | Upskill, certification, salary jump | Pays, self-serve |
| `parent` | Parent, deciding & paying | Trust, placement proof, safety, fees clarity | Pays, decides |
| `franchise` | Franchise investor | ROI, unit economics, brand strength | Investment-scale |
| `unknown` | Cold start | — | Neutral default |

`unknown` is a first-class persona, not an error state. Its treatment is designed explicitly in Week 2 — this is called out as an assumption in the proposal (item 06) and is the most commonly botched part of adaptive sites.

### 4.2 Signal map

**First-touch (edge, zero-cost):**
`utm_campaign` / `utm_source` / `utm_content` → campaign→persona lookup table · referrer host (LinkedIn → professional, Instagram → student) · geo-IP city → nearest centre · landing path (`/franchise*` → franchise, `/bca*` → student) · device class · time of day.

**Behavioural (client, accumulating):**
Course-category views (weighted, decaying) · depth on fee/placement/EMI content → parent signal · centre-locator use → student/parent · repeat visits · scroll depth on ROI content → franchise.

### 4.3 Classification contract

```ts
type Persona = 'student' | 'professional' | 'parent' | 'franchise' | 'unknown';

type Classification = {
  persona: Persona;
  confidence: number;            // 0–1
  signals: SignalHit[];          // audit trail — why this persona
  version: string;               // rulebook version, for A/B + rollback
};
```

Rules are **weighted, additive, and transparent**. `confidence < 0.45` → treated as `unknown`. Every classification is logged with its signal trail so the client can inspect and edit behaviour — this is the "no black box" promise in the proposal, and it must be literally true.

### 4.4 How content adapts — `<AdaptiveSlot>`

Exactly three adaptation primitives. Nothing else is permitted:

1. **`reorder`** — re-rank an already-rendered list (courses, blog cards, CTAs). All items stay in the DOM.
2. **`nudge`** — inject a contextual prompt into a reserved slot.
3. **`emphasise`** — swap CTA copy/priority within a fixed layout.

Never: hide indexable content, change `<h1>`, change canonical/meta, change route.

```tsx
<AdaptiveSlot
  id="home-hero-cta"
  strategy="emphasise"
  variants={{
    student:      { label: 'Find a degree that gets you earning', href: '/courses/bca-cloud-cyber' },
    professional: { label: 'Compare upskilling tracks',           href: '/courses/professional' },
    parent:       { label: 'See placement record & fee options',  href: '/placements' },
    franchise:    { label: 'Franchise unit economics',            href: '/franchise' },
  }}
  fallback={{ label: 'Explore courses', href: '/courses' }}   // rendered server-side & seen by crawlers
/>
```

The `fallback` is what ships in the static HTML. Everything else is a post-hydration swap.

### 4.5 Depth model (matches the proposal's scope wording)

- **Deep personalisation:** home, course-discovery, course detail, enquiry flow, franchise. Bespoke variants per persona.
- **Templated persona-aware nudge layer:** blog, city, centre pages (~180 pages). One nudge component, content driven by CMS rules — e.g. a `student`-classified visitor on a cloud blog post sees "Related: BCA in Cloud & Cyber Security → nearest centre in {city}".

---

## 5. The AI Guide — specification

### 5.1 Pipeline

```
Admin Panel publish / webhook
  → chunk (400–600 tokens, heading-aware, metadata-tagged)
  → embed
  → upsert into  documents(id, source_url, title, type, persona_relevance[], content, embedding)
  ...
User question
  → guardrail: in-scope? (preCheck)
  → embed question → similarity search (pgvector) + BM25 hybrid → top 5
  → GPT-4o, system prompt: answer ONLY from <context>, cite source_url, refuse otherwise
  → post-guardrail: numeric-claim check, banned-topic check
  → stream to client with citation chips + handoff CTA
```

### 5.1b Knowledge base index

Courses · Centres · FAQs · Blogs · News · Policies · Faculty · Placement · Admissions copy — chunked and embedded. **Fees are structured lookup only** and never appear in chunk prose for the model to paraphrase.


### 5.2 Guardrails — non-negotiable

The proposal's core promise is that the Guide cannot quote a wrong fee or invent a course. Prompting alone does not achieve this.

| Risk | Control |
|---|---|
| **Fabricated fees** | Fees are **never** generated as free text. Fee questions route to a deterministic lookup against a structured `Course.fees` CMS field and render as a fixed component. If no structured fee exists → "Fees vary by centre — let me connect you to a counsellor" + handoff. |
| Invented courses/durations | Retrieval-only answering; post-generation check that every course name in the output exists in the course list |
| Numeric hallucination | Post-filter: any number in the answer must appear in retrieved context or be dropped and the answer regenerated once |
| Off-topic / jailbreak | Pre-classifier gate; hard refusal → redirect to counsellor |
| Placement/salary guarantees | Banned-claim list. Never states or implies guaranteed placement or salary |
| Silent failure | Every refusal and every low-confidence retrieval is logged and reviewable in a weekly report |

Every answer carries citations to real Jetking URLs. If retrieval scores below threshold, the Guide says it doesn't know and offers the counsellor — that path is a **feature**, and it is measured as a positive conversion, not a failure.

### 5.3 Handoff

Guide → structured lead (persona, conversation summary, course interest, city) → existing enquiry API → existing State/Centre routing → counsellor. WhatsApp deep-link with pre-filled context. **The existing routing logic is integrated with, not rebuilt.**

---

## 6. SEO migration — the highest-risk workstream

~136 blog + 40+ centre/city pages. This is where the project can fail commercially even if everything else ships perfectly. It gets its own dedicated week (W4) plus a hardening week (W6).

### 6.1 Sequence

1. **Inventory (W1).** Crawl the live site (Screaming Frog + `scripts/crawl-legacy.ts`). Cross-reference with Search Console (top pages by impressions/clicks over 12 months), GA4 landing pages, and the XML sitemap. Output: `legacy-urls.csv` with URL, title, meta, H1, canonical, status, clicks, impressions, backlinks.
2. **Content extraction (W1–W4).** Assess extractability *in Week 1* — this is a stated dependency and a commercial risk. If the legacy platform has no clean API/export, the fallback is HTML-parse-to-portable-text with manual QA on the top 40 pages by traffic, and the timeline impact is raised **in Week 1**, not Week 4.
3. **Redirect map (W1, signed off W2).** 1:1 for every URL. No wildcard-to-homepage redirects. Anything with no destination gets a deliberate decision: keep, redirect to nearest equivalent, or 410.
4. **Migrate (W4).** Scripted, idempotent, re-runnable. Preserve: title, meta description, H1, canonical, publish date, author, images with alt text, internal links (rewritten to new slugs), schema.org markup.
5. **Harden (W6).** Automated verification (below) + manual review of the top 40 pages.

### 6.2 Automated SEO gates — these run in CI and block deploy

```
✓ Every URL in legacy-urls.csv returns 200 or a single-hop 301 to a 200
✓ Zero redirect chains, zero redirect loops
✓ Every migrated page: title, meta description, canonical, H1 present and non-empty
✓ Canonical is self-referential and absolute
✓ sitemap.xml contains every indexable page; contains no redirected/404 URL
✓ No `noindex` on any page that was indexable pre-migration
✓ Rendered HTML (JS disabled) contains full body content — the SSR check
✓ Structured data validates (Course, LocalBusiness for centres, Article for blog, BreadcrumbList)
✓ LCP < 2.5s, CLS < 0.1, INP < 200ms on the 10 highest-traffic templates
```

### 6.3 Launch-day protocol

Pre-launch: DNS TTL lowered; rollback plan documented and rehearsed.
Cutover: deploy → verify redirects on production → submit new sitemap → request indexing for top 20 pages.
Post-launch: Search Console coverage + rankings monitored daily for 14 days; **this window is inside the engagement**, not after it.

---

## 7. Analytics & instrumentation

Event taxonomy defined Week 1, implemented Week 3, validated Week 6. Every event carries `persona`, `confidence`, `rules_version`.

| Event | Purpose |
|---|---|
| `persona_classified` | Distribution, confidence, cold-start rate |
| `persona_changed` | Reclassification during a session — thrash detection |
| `nudge_shown` / `nudge_clicked` / `nudge_dismissed` | Nudge performance per persona per placement |
| `adaptive_slot_rendered` | Did the adaptive layer actually run? |
| `guide_opened` / `guide_message` / `guide_cited` / `guide_refused` / `guide_handoff` | Guide funnel + refusal rate |
| `enquiry_started` / `enquiry_submitted` / `whatsapp_clicked` | The commercial outcome |
| `course_viewed`, `centre_viewed`, `fee_section_viewed` | Behavioural signal inputs |
| `course_clicked` / `apply_clicked` | Catalogue engagement → apply intent |
| `centre_searched` / `phone_clicked` | Local intent |
| `brochure_downloaded` / `video_played` / `scroll_depth` | Content engagement |

**Baseline capture is a Week-1 task.** Current enquiry rate, by source, by landing page — recorded before anything changes. Without it, "enquiry lift" cannot be claimed at the end.

Dashboards: persona distribution · enquiry rate by persona · nudge CTR by placement · Guide funnel + refusal rate · SEO health (indexed pages, top-page rankings).

---

## 8. Week-by-week plan

### Week 0 — pre-kickoff (blocking, chase in parallel with contracting)

Must be in hand before Week 1 Day 1, or Week 1 burns:
- [ ] GA4 + GTM read access · Search Console access · ad-platform (Google/Meta) access
- [ ] Lead/CRM export, 12 months, with source attribution
- [ ] Legacy CMS admin + export/API access
- [ ] Course master data: names, durations, curricula, **structured fees policy**, eligibility
- [ ] Centre list with addresses, cities, contact routing rules
- [ ] Brand assets, logos, photography library, tone-of-voice guidance
- [ ] Named client-side decision-maker with sign-off authority
- [ ] OpenAI API key, Supabase project, Vercel team, Admin Panel auth plan (who can publish)

### Week 1 — Discover
**Build:** repo scaffold, Next.js + TS + Tailwind, Admin CMS data model spike, Supabase project, Vercel envs, CI skeleton.
**Data:** GA4 + lead + ad data stitched; persona hypotheses validated against real behaviour; signal map drafted; **baseline metrics captured**.
**SEO:** full URL inventory; extractability spike on the legacy platform — **go/no-go on scripted migration by Day 4**; redirect map v1.
**Design:** flagship journey locked; moodboards; token direction.
**Analytics:** event taxonomy v1.
→ **Gate: persona model signed off by end of Week 1.** Slippage here moves go-live. Escalate on Day 5 if unsigned.

### Week 2 — Design
Visual language + design system (tokens, type scale, components). Hi-fi adaptive journey for all 4 personas + the `unknown` cold-start. Blog / city / centre templates. Nudge + AI-Guide interaction design. Redirect/migration plan finalised. Admin CMS entity schemas + editorial UX wireframed alongside design.
→ **Gate: design + persona + migration-plan sign-off. Milestone 2 (30%, ₹1,80,000) releases.**

### Week 3 — Build I: platform & engine
App Router shell, routing, layouts. Design system implemented as components. Admin CMS CRUD for core entities + `ContentSource` admin adapter. **Persona engine: middleware, `rules.ts`, `classify.ts`, `PersonaProvider`, `AdaptiveSlot`.** Analytics instrumentation wired. Supabase schema + migrations. CI with the SEO gate suite (initially against a fixture set).

### Week 4 — Migration
Blog (~136) piped into Admin CMS / Postgres. City + centre pages migrated. Templates rendering migrated content. Redirect map wired into `next.config` / middleware. `verify-redirects.ts` green in CI. Metadata + structured data per template. Content-parity spot-check on the top 40 pages by traffic.
→ Internal checkpoint: **is every legacy URL accounted for?** A no here is a schedule event, surfaced immediately.

### Week 5 — Build II: AI Guide & site-wide nudges
Ingest pipeline + embeddings. Retrieval + reranking. Guide route handler with streaming. Guardrails + the deterministic fee path. Guide UI. Counsellor + WhatsApp handoff wired to existing routing. Templated nudge layer across migrated pages. Adversarial red-team of the Guide: fee traps, competitor questions, guarantee-seeking, prompt injection, off-topic.

### Week 6 — Harden
Full assembly. **Redirect validation across every migrated URL.** Metadata + crawl/indexability audit. Structured data validation. Performance tuning to CWV targets. Accessibility pass (WCAG 2.1 AA: keyboard, contrast, focus, reduced-motion, screen-reader on the Guide). Cross-browser. Persona-engine soak test — verify no thrash, no CLS from nudges. Security: rate-limiting on `/api/guide`, input sanitisation, secret audit.
→ Migration risk is retired here, not discovered here.

### Week 7 — Ship
Cross-device QA matrix. UAT with the Jetking team. Staging → production cutover on Vercel. Post-launch redirect verification on live. Sitemap submission + indexing requests. **Team enablement session** (CMS editing, nudge rules, Guide content, dashboards) + recorded walkthrough. Handover documentation. 14-day SEO monitoring begins.
→ **Gate: production go-live. Milestone 3 (30%, ₹1,80,000) releases.**

---

## 9. Quality gates

| Gate | Standard |
|---|---|
| Type safety | TypeScript `strict`, zero `any` in `persona/` and `guide/` |
| Tests | Unit on `classify.ts` (full rule-matrix coverage) and `guardrails.ts`; Playwright E2E on the 4 persona journeys + enquiry + Guide handoff |
| SEO | The Section 6.2 suite, blocking in CI |
| Performance | LCP < 2.5s · CLS < 0.1 · INP < 200ms on top 10 templates |
| Accessibility | WCAG 2.1 AA on all templates and the Guide |
| Review | PR review on every merge; `persona/rules.ts` and `guide/prompt.ts` require explicit sign-off |
| Preview | Every PR gets a Vercel preview URL for client review |

---

## 10. Risk register

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | **Legacy content not cleanly extractable** | Migration weeks stretch; the stated commercial dependency | Extractability spike in **Week 1 Day 1–4**, not Week 4. If manual, scope-change conversation happens in Week 1 with cost/timeline options on the table |
| R2 | **Persona sign-off slips past Week 1** | Everything adaptive is blocked; go-live moves | Persona workshop pre-booked in Week 0. Escalation on Day 5. Named decision-maker required |
| R3 | **Ranking loss post-migration** | Direct revenue loss; the most visible possible failure | 1:1 redirect map + automated CI verification + 14-day monitoring inside the engagement + rehearsed rollback |
| R4 | **AI Guide misstates fees** | Reputational; contradicts the whole positioning | Fees never LLM-generated — deterministic structured lookup only. Adversarial red-team in W5 |
| R5 | **Personalisation harms SEO or CWV** | Rankings + conversion | Neutral canonical document, additive-only adaptation, reserved slots, CI perf gates (Section 2.1) |
| R6 | **CRM/counsellor routing undocumented** | Broken lead flow at launch = worst-case outcome | Integration spike in Week 1. Existing flow is preserved and tested end-to-end, never redesigned |
| R7 | **Content for AI grounding arrives late** | Guide has nothing to answer from | Content checklist issued Week 0; Guide can launch scoped to migrated blog + course pages if bespoke content slips |
| R8 | **Scope creep via revision rounds** | Timeline | One consolidated revision round per stage, per contract. Additional rounds are logged as change requests |
| R9 | **Cold-start experience undesigned** | Most first-time visitors get a worse experience than the old site | `unknown` designed as a first-class persona in Week 2, explicitly reviewed |
| R10 | **LLM cost overrun at real traffic** | Post-launch billing surprise | Rate limiting (`lib/rate-limit.ts` — production boot fails on the in-memory limiter unless explicitly accepted), response caching on common questions, cost dashboard, documented per-1k-session projection at handover |
| R11 | **Unsubstantiated marketing claims published** | Regulatory and reputational exposure on an education site | `TrustSignal.verified` is filtered at the content source; unverified claims are unrenderable by construction. Each needs a named source before it can ship |

---

## 11. Open questions for Jetking

1. Which legacy platform hosts the current site, and does it expose a content API or clean export? *(gates R1 — needed Week 0)*
2. Is there a structured, authoritative fee list per course per centre? *(gates the deterministic fee path — R4)*
3. Which CRM receives enquiries today, and how is State/Centre → counsellor routing configured?
4. Are the 4 personas in the proposal confirmed, or should GA4 data drive the final set?
5. Which domain/subdomain for staging, and who approves the DNS cutover?
6. Is there an existing brand/design guideline to work within, or is the new visual language open?
7. Who is the named decision-maker with sign-off authority for Weeks 1 and 2?
8. WhatsApp: Business API or click-to-chat deep links?

---

## 12. Immediate next actions

| # | Action | Owner |
|---|---|---|
| 1 | Issue the Week-0 access & asset checklist (Section 8) to Jetking | FE — today |
| 2 | Book the Week-1 persona workshop with the named decision-maker | FE |
| 3 | Scaffold repo: Next.js 15 + TS strict + Tailwind + CI | FE Eng |
| 4 | Provision Supabase, Vercel, OpenAI API; scaffold Admin CMS schema | FE Eng |
| 5 | Run the legacy crawl and produce `legacy-urls.csv` (can start pre-kickoff from public pages) | FE SEO |
| 6 | Legacy-platform extractability spike | FE Eng |
| 7 | Capture baseline enquiry metrics from GA4 | FE Data |
