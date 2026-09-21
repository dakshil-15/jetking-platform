# Jetking website — process audit

**As of:** 2026-09-21 · **Branch:** `frontend` · **Method:** static read of the code (every route, form, API handler, the admin panel and the content/chatbot pipelines), plus a live check of the login flow on the running dev server. It is not a penetration test or a load test, and nothing was checked against a production deployment. Where a finding depends on how the site is deployed, it says so.

Findings were spot-checked against the code before being written down. Each one names the file to look at.

---

## 1. Summary

The site is well engineered on the front end (accessible forms, persona adaptation that keeps pages SEO-safe, a real admin panel). The weak point is **what happens after a visitor acts**. Three process gaps matter more than everything else:

1. **Website enquiries are not stored by the platform.** They go to an optional external CRM or to a log line, and the visitor is told "that has reached us" either way.
2. **There is no consent, privacy notice or data-deletion process**, while the site sets tracking cookies for every visitor and collects phone numbers in six places.
3. **The admin's content store is a file on disk** (`data/cms/store.json`), which does not survive a serverless deploy such as Vercel.

Everything else (inconsistent validation, dead analytics, stale chatbot knowledge, missing tests) is real but second-order.

| Severity | Count | What it means |
|---|---|---|
| Critical | 3 | Business data can be lost or the process silently does not work |
| High | 6 | Compliance exposure or a control that does not do what people assume |
| Medium | 11 | Inconsistency, wasted conversions, maintainability |
| Low | 6 | Cleanup |

---

## 2. How the site works today

### 2.1 Visitor journey

```
Visit ──► proxy sets jk_visitor_id + classifies persona (student / parent / professional / franchise / unknown)
   │
   ├─► Adaptive pages (client-side only; HTML stays identical for SEO)
   │
   ├─► Convert via one of:
   │      /enquiry           main form              ─┐
   │      exit-intent popup  name / phone / email    │
   │      /explore form      "just exploring"        ├─► POST /api/enquiry ─► CRM_ENDPOINT (optional) or log line
   │      /franchise form    franchise + investment  │
   │      /student wizard    counselling step       ─┘
   │      /student wizard    soft-save (phone)      ───► POST /api/journey/save ─► same CRM or log line
   │      Guide / handoff    AI panel ─► /enquiry?from=guide
   │      /chatbot           Jetking AI ─► WhatsApp link only (no lead captured)
   │
   └─► Optional account (new): log in / sign up ─► pre-fills enquiry, saves chatbot chats
```

### 2.2 Routes

Home `/` · `/student` (5-step wizard) · `/parent` · `/professional` · `/franchise` · `/explore` · `/courses` + `/courses/[slug]` · `/centres` + city + centre pages · `/placements` · `/about-us` · `/investors` · `/faq` · `/blog` · `/enquiry` (noindex) · `/chatbot` (own app shell, no site header) · `/account` (new, noindex) · `/admin/*`. Legacy URLs redirect via `src/lib/legacy-routes.ts` and `redirects.json`.

### 2.3 Conversion paths

| Path | Fields | Client validation | Lands in | Analytics |
|---|---|---|---|---|
| Main enquiry | name, phone, email, city, centre, programme, message | native `required`/`pattern` | `/api/enquiry` | `enquiry_started` on mount |
| Exit-intent popup | name, phone, email | `minLength` only | `/api/enquiry` | no `enquiry_started` |
| Explore | name, phone, email, city (free text) | `minLength` only | `/api/enquiry` | on first focus |
| Franchise | name, phone, email, location (free text), investment | `minLength` only | `/api/enquiry` | on first focus |
| Student counselling | name, phone, email, message | none (`noValidate`) | `/api/enquiry` | `journey_counsel_submitted`, not `enquiry_submitted` |
| Student soft-save | phone, first name | phone pattern | `/api/journey/save` | `journey_soft_save` |
| Chatbot | none | — | WhatsApp link only | none |

### 2.4 Back office

- **Admin panel** (`src/app/(admin)`): dashboard, CMS editors (courses, centres, posts, FAQs, policies, faculty, rules, variants), leads board, team & access, audit log. Roles: `admin`, `editor`, `centre_staff` (leads only, by city). Login is per-user with PBKDF2 when `DATABASE_URL` is set, otherwise one shared `ADMIN_PASSWORD`.
- **Content:** `CONTENT_SOURCE=local` (repo fixtures) or `admin` (CMS store). Saves are also published and re-indexed for the Guide.
- **Two AI assistants:** the **Guide** (`/api/guide`, OpenAI, citations, handoff to `/enquiry`) and **Jetking AI** at `/chatbot` (`/api/chat`, local index + Ollama or OpenAI). They do not share code, knowledge or analytics.

---

## 3. Login and sign-up (added in this change)

One account covers the website and the chatbot: same table, same cookie, same login.

**Flow**
1. A visitor clicks **Log in** (header on tablet/desktop, menu drawer on mobile, or the link on the enquiry form, or arrives at `/chatbot` where a dialog opens).
2. **Sign up** asks for name, mobile number, state, city, an optional preferred centre, email and password (8+ characters). The mobile is normalised (`+91 98765-43210` becomes `+919876543210`). State, city and centre come from the same content as the centres pages (`/api/locations`) and the server rejects combinations that do not belong together.
3. The server hashes the password (PBKDF2), creates the user, and sets two cookies: `jk_chat_session` (signed, `httpOnly`, 30 days) and `jk_chat_hint` (a non-identifying flag that lets anonymous visitors skip the "who am I" request entirely).
4. Signed-in effects: the enquiry form and the home-page quick-enquiry modal are pre-filled, including state, city and centre; the chatbot greets the visitor by first name, tells the model their city, and answers "Nearest centre" for it straight away; the enquiry POST carries `accountId`; the browser's visitor id is linked to the account's phone and email (same link the enquiry form makes); the header shows the initial and links to `/account`; chatbot chats are saved and can be reopened.
5. **Log out** clears both cookies and resets the chatbot to a fresh chat.

**Guards in place:** rate limits (login 10 per 10 min, signup 10 per hour, chat saves 60 per minute), identical error and timing for "no such email" vs "wrong password", per-user ownership on every chat read and write, signed cookies, `CHATBOT_SESSION_SECRET` required in production.

**Known limits of this first version (all also listed in section 4):** no password reset, no email verification, no way for a user to delete their account or chats, the sign-up phone is not forwarded to the leads pipeline, and without `DATABASE_URL` accounts live in `data/chatbot/store.json` (fine locally, wiped on serverless).

---

## 4. Findings

Severity: **Critical** = data loss or the process silently does not work · **High** = compliance exposure or a control that does not do what people assume · **Medium** = inconsistency or lost conversions · **Low** = cleanup.

### Critical

**C1. Website enquiries are not stored by the platform.** `/api/enquiry` and `/api/journey/save` write nowhere durable. They post to `CRM_ENDPOINT` if set, otherwise `console.warn` (`src/app/api/enquiry/route.ts:96-126`). The `leads` table and the admin Leads board are only filled by the admin's own "+ New lead" button (`createLead` has one caller: `(admin)/admin/leads/actions.ts:99`). `.env.local` sets no `CRM_ENDPOINT` or `DATABASE_URL`.
*Fix:* write every enquiry to the `leads` table first (with `source`, persona, `accountId`, visitor id), then forward to the CRM, then tell the visitor. Add a retry or "unrouted" queue so a CRM outage does not lose leads.

**C2. A lost lead looks like success.** When the CRM is unset, times out (8 s) or returns an error, the API still returns `ok: true` and the form says "that has reached us" (`route.ts:121-125`; the client ignores `routed`). The only copy is a log line containing the full personal data.
*Fix:* alert on `routed:false` (email/Slack), persist the payload (C1), and show honest copy when routing is delayed.

**C3. The CMS store does not persist on serverless hosting.** `data/cms/store.json` is gitignored and read/written on disk (`src/lib/cms/store.ts`); Supabase is written to but never read back. `vercel.json` and `docs/HANDOVER.md` assume Vercel with `CONTENT_SOURCE=admin`. On a read-only filesystem, seeding and every admin save would fail or vanish.
*Fix:* make Postgres (already configured for leads) the CMS store, or run on a host with a persistent disk. Decide before go-live.

### High

**H1. No consent, privacy notice or cookie choice.** No Privacy or Terms page and no footer link. Six forms collect phone numbers; only two show a "we use your details only…" line and none has a consent checkbox. `jk_visitor_id` (1 year) and `jk_persona` (30 days) are set for every non-bot visitor, plus four localStorage tracking keys, and the visitor id is forwarded to the CRM undisclosed. Exposure under India's DPDP Act (and GDPR for any EU traffic).
*Fix:* privacy page + footer link, consent line/checkbox on every lead form, cookie notice with an opt-out, record consent with the lead.

**H2. No retention or deletion process.** Nothing expires leads, chat transcripts, unanswered questions or audit rows. Lead PII is also written to application logs. The new chat accounts have no delete-account or data-export path. Admins hard-delete leads with no trace.

**H3. Admin defaults are open outside `NODE_ENV=production`.** `ADMIN_PASSWORD` defaults to `changeme` and the session secret to a dev string (`admin/actions.ts:50,65`). Any staging deploy that does not set `NODE_ENV=production` is open. The legacy single shared password gives full admin with no per-user audit trail. `HANDOVER.md` tells operators to rotate `ADMIN_PASSWORD`, which does nothing once `DATABASE_URL` is set.

**H4. Admin account hygiene gaps.** No password reset or change, no MFA, no lockout per account, no revocation except rotating the global secret. Login for an unknown email skips the password hash (timing leak; the chatbot login does not have this). Nothing stops demoting or disabling the last admin. Login and logout are not audited.

**H5. Rate limiting is per-instance.** The default limiter counts in memory, so on serverless the limits multiply by the number of instances, and production refuses to boot without `RATE_LIMIT_ALLOW_MEMORY=true`. `clientKey` falls back to a shared `'anonymous'` bucket. Five enquiries per 10 minutes per IP can also block a whole campus or centre behind one address. `/api/ingest` and `/api/revalidate` check their secret before rate limiting and compare it non-constant-time.

**H6. Chat account data on ephemeral storage.** Without `DATABASE_URL`, accounts and transcripts (with password hashes) go to `data/chatbot/store.json`. That is fine for local work and wrong for production. `CHATBOT_SESSION_SECRET` is now documented in `.env.example`, but production throws without it.

### Medium

**M1. Centre context is dropped.** Centre pages link to `/enquiry?centre=<slug>` (`CentreDetail.tsx:186,725,768`), but the form reads only `course` and `city`, and only when `from=guide` (`EnquiryForm.tsx:69-73`). The new centre dropdown therefore starts empty even when the visitor came from a specific centre page. Course pages do not pass a course either. (Quick win: read `centre`, `course` and `city` from the URL.)

**M2. Centre routing does not work end to end.** The form sends `city` as a slug (`navi-mumbai`); centre-staff scoping compares it to the city display name (`src/lib/leads/centre-scope.ts:41-44`). Even after C1 is fixed, a centre-staff user would not see their leads. Leads with no city are invisible to them.

**M3. Phone validation differs by form and is weak on the server.** Main/counselling/soft-save use a `{10,20}` pattern; exit, explore, franchise use `minLength` only; the chatbot signup is stricter. The server accepts `----------` or ten spaces (`enquiry/route.ts:23-27`). Names are not trimmed. Phone formats differ between the identity link (`+919…` vs `9…`), so the same person gets different keys.

**M4. Field errors never reach the user.** The API returns which fields failed; no form reads it. Every failure is "Please check the form and try again." Student counselling has `noValidate`, so `required` and `pattern` do nothing.

**M5. `source` is inconsistent.** The main form sends `window.location.pathname` (always `/enquiry`), losing the page that led there. Others send fixed strings. The leads schema allows `chatbot | form | centre`, which matches none of them.

**M6. Analytics do not run.** `track()` pushes to `window.dataLayer`/`window.posthog` if present, but nothing in `src/` loads GTM or PostHog, so every event goes nowhere. Event meaning is also inconsistent (`enquiry_started` fires on mount, on focus, on click, or never; counselling never fires `enquiry_submitted`; `tel:` and WhatsApp clicks are mostly untracked; the chatbot tracks nothing).

**M7. Chatbot knowledge is stale and cut off from the CMS.** `/api/chat` answers from committed snapshots (embeddings dated Sep 11, KB Aug 20). Admin edits refresh only the separate Guide index. Updating the chatbot needs `npm run build:chatbot-index` by hand. Unanswered questions are logged to the console and, if Supabase is configured, to a table that exists only in a code comment; there is no admin view.

**M8. Two overlapping assistants.** The Guide has handoff and guardrails but almost no entry point (only the parent page button and some nudges). The header's "Jetking AI" opens `/chatbot`, which has no handoff to enquiry: its "Enquire now" chip is a canned reply and its WhatsApp button falls back to the placeholder number `919999999999` when unset.

**M9. Promises the code does not keep.** Soft-save says "We'll text or WhatsApp your matched programmes" but nothing sends anything (`SaveRecommendationsStep.tsx:90`). "Download brochure" appears in four places and no brochure exists. The chatbot sign-up says "A counsellor may call or message you" but the number never reaches the leads pipeline. Explore's success copy says "we'll reach out only if you want us to" straight after the visitor submitted their number.

**M10. Publishing has no safety net.** Save equals publish; there is no draft, approval, version history or rollback. "Reset CMS from fixtures" is a single button available to editors, with no confirmation or backup. Renaming or deleting a slug creates no redirect. 36 legacy URLs in `data/redirect-gaps.json` are still marked "DECIDE".

**M11. Tests and CI.** 81 tests cover the persona engine and content only. Nothing covers API routes, admin auth, lead scoping, the CMS store, rate limits or the chatbot. There is no CI, so `npm run check` and `verify:seo` run only by hand.

### Low

- `tel:` links for centres with several numbers are built wrongly (`CentreDetail.tsx:59`, `CentresIndex.tsx:604` strip `/` before splitting), giving one long invalid number for three centres.
- `/explore` and `/investors` are missing from the sitemap; `robots.ts` blocks `/enquiry`, so crawlers never see its `noindex`.
- `.env.example` and `README` disagree with the code (`NEXT_PUBLIC_SITE_URL` vs `SITE_URL` can put localhost in canonicals; several `JK_*` variables undocumented; three documented variables never read).
- Dead or duplicated code: an unused franchise form and header, `CentreSearch`, `ReturnVisit`, `HeroAdaptivePrompt`, the v1 action rail; two near-identical 190-line franchise forms.
- Focus management and status announcements exist only on the main enquiry form; the exit, explore and franchise success panels do not move focus.
- The exit-intent popup can appear after 45 s on touch devices mid-wizard and on pages that already have a form; the franchise SLA ("24 hours") differs from the rest ("one working day").
- Repo root holds stray files (`dev.log`, `test_theme.js`, theme audit notes) and an orphan `data/cms/store.json.*.tmp`.

---

## 5. Suggested order of work

**Week 1: stop losing data**
1. C1 + C2: persist every enquiry to `leads`, forward to CRM, alert on failure, honest success copy.
2. H1 (minimum): privacy page, consent line on all forms, footer link.
3. Set `CRM_ENDPOINT`, `CHATBOT_SESSION_SECRET`, `ADMIN_SESSION_SECRET`, `DATABASE_URL`; run `npm run db:migrate`.

**Week 2: make it deployable**
4. C3: decide the CMS store (Postgres recommended); H3/H4 admin hardening; H5 shared rate-limit store.
5. M1 (URL prefill), M3/M4 (one shared phone/name validator and field-level errors across all forms), M5 (one `source` scheme).

**Week 3: make it measurable and connected**
6. M6: load GTM/PostHog, define one event contract; M8: give `/chatbot` a real lead handoff and reconcile the two assistants.
7. Account follow-ups: password reset, email verification, delete-account, forward the sign-up phone to `leads` (`source: 'account'`).
8. M11: tests for enquiry, auth and lead scoping; add CI running `npm run check` and `verify:seo`.

---

## 6. What is working well

- Forms are accessible by design (visible labels, `aria-describedby` wiring, focus management on the main form, a shared dialog hook with focus trap).
- Persona adaptation is genuinely SEO-safe: the server always returns one canonical document, and adaptation happens after hydration.
- The admin panel has real roles, per-user login, centre-scoped access, an audit log and honest documentation of its own gaps (`docs/ADMIN_PANEL.md`).
- The enquiry API deliberately never tells a visitor to resubmit and logs the payload when the CRM is down. The intent is right; C1/C2 finish the job.
- The chatbot refuses to invent answers (retrieval gate, sensitive-claim checks) and degrades to verified passages when no LLM is reachable.

---

## Appendix A. Cookies and storage

| Name | Kind | Lifetime | Purpose |
|---|---|---|---|
| `jk_visitor_id` | cookie, JS-readable | 1 year | anonymous visitor id, sent to CRM |
| `jk_persona` | cookie, signed, JS-readable | 30 days | persona classification |
| `jk_admin_session` | cookie, `httpOnly` | 12 h | admin login |
| `jk_chat_session` | cookie, `httpOnly`, signed | 30 days | visitor account login (new) |
| `jk_chat_hint` | cookie, JS-readable | 30 days | "a session probably exists" flag (new) |
| `jk_behaviour_v2`, `jk_identity_link_v1`, `jk_user_profile_v1`, `jk_student_journey_v1`, `jk_intent_lock_v1`, `jk_visitor_id_v1` | localStorage | persistent | persona behaviour, identity link, journey state |
| `jk_exit_intent_shown`, `jk_guide_handoff`, `jk_welcome_dismissed_v1`, `jk_session_v1` | sessionStorage | tab | popup shown, Guide handoff, welcome |

## Appendix B. Public API surface

| Route | Auth | Limit | Persists |
|---|---|---|---|
| `POST /api/enquiry` | none | 5 / 10 min / IP | CRM or log only |
| `POST /api/journey/save` | none | 8 / 10 min | CRM or log only |
| `POST /api/chat` | none | 20 / min | logs unanswered questions |
| `POST /api/guide` | none | 12 / min | nothing |
| `POST /api/persona/infer` | none | 20 / min | nothing |
| `/api/chatbot/auth` | none / session | login 10 per 10 min, signup 10 per hour | `chat_users` |
| `/api/chatbot/conversations[/id]` | session | 60 saves / min | `chat_conversations` |
| `POST /api/ingest`, `/api/revalidate` | bearer secret | 3 and 10 / min | embeddings file / cache |
