# SEO & routing audit — new site vs. live jetking.com

Audited 21 Sep 2026 against `https://www.jetking.com` (live) and the dev build on `localhost:3001`.

## Status after fixes (re-run against all 521 live URLs)

| Live URL outcome | Before | After |
| --- | --- | --- |
| Same URL, page exists (200) | 448 | 460 |
| Redirect (308), every target returns 200, no chains | 12 | 55 |
| **404, no page and no redirect** | **60** | **5** |

Fixed: legacy redirects (A3), the nine blog slugs kept as on live (A3), `/centres/prayagraj` (B1), default social image (B2), investors board link (B5), the three legal pages (A2).
Still open: A1 (set the production host — an environment setting, not code), B3 (title rewrites), B4/B6 (content decisions), and the five URLs below.

**Still 404 — need a client decision:** `/career`, `/life-at-jetkings`, `/jetking-jets`, `/centres/sewri` (the centre is not in the new content). `/blockchain-basics` is a "Page not found" page on live itself and is left as a 404.

## How this was checked

| Check | Coverage |
| --- | --- |
| Every URL in the live `sitemap.xml` requested against the new site (no redirect following) | **521 of 521** live URLs |
| New-site `<head>` tags, canonical, robots, H1, lang, JSON-LD | 101 pages: all static routes, all 18 courses, all 39 centres, 26 of 416 blog posts |
| Every internal link found on those 101 pages requested | 157 unique links |
| Side-by-side title / description / canonical | 15 matching pairs (home, courses, centres, placements, about, investors, faq, blog, 3 courses, 3 centres, franchise) |
| Live host behaviour (http, non-www, trailing slash, case) | `curl` against live |

Not checked: Search Console data, backlinks, anything only visible on the production host (CDN/host redirects), and the 390 blog posts not sampled.

## Result at a glance

| Live URL outcome on the new site | Count |
| --- | --- |
| Same URL, page exists (200) | 448 |
| Redirects (308) | 12 — 11 correct, **1 wrong** (`/centres/prayagraj`) |
| **404 — no page and no redirect** | **60** → 57 after the legal pages were added |
| 500 | 1 — dev-server cold-compile hiccup; retried 12× concurrently, all 200. Not reproducible. |

The 60 are the SEO risk. On cutover each one loses whatever ranking and backlinks it has.

---

## A. Launch blockers

### A1. Canonical host is the Vercel preview, not `www.jetking.com`
`NEXT_PUBLIC_SITE_URL` (in `.env.local`) is `https://jetking-panel.vercel.app`. Everything that builds an absolute URL uses it: canonical tags, `og:url`, `sitemap.xml` `<loc>`s, `robots.txt` `Sitemap:`/`Host:`, JSON-LD.
**Fix:** set `SITE_URL` and `NEXT_PUBLIC_SITE_URL` to `https://www.jetking.com` in the production environment. Live uses the `www` host.

### A2. Privacy policy, terms and enrollment terms — done
These three pages were missing. They now exist at the live paths (`/privacy-policy`, `/terms-conditions`, `/enrollment-terms-and-conditions`), built from the live wording, linked from the footer and listed in `sitemap.xml`. Open item: the wording is the live text, which predates the new site — it says nothing about accounts, saved chats or the city/centre details the new forms collect — so have it reviewed before launch.

### A3. Live URLs with no page and no redirect — fixed except 5
See section D for the full list with proposed targets. Grouped:

| Group | Count | Note |
| --- | --- | --- |
| Blog: same post, different slug | 9 | New slugs were truncated to 80 characters and `--xxxxx` became `-xxxxx`. **Best fix: keep the live slug** so the URL doesn't change at all. |
| Blog: category archives (`/blog/blockchain`, `/blog/technology` …) | 7 | New blog has one category, `Guidance`, for 410 of 416 posts, so these archives don't exist. Redirect to `/blog`. |
| Blog: `/blog/getting-started-with-your-blog` | 1 | A default WordPress-style post; safe to redirect to `/blog`. |
| Course landing / brochure-signup pages at the root | 18 | Most map cleanly to an existing course page. |
| `/courses/…` old slugs | 8 | Same. |
| `/program/…` | 2 | BCA Data Science and BCA Multimedia. |
| Company pages | 10 | career, life-at-jetkings, jetking-reviews, corporate-training, etc. |
| Legal / utility | 1 | `sitemap-html` (the three legal pages now exist). |
| Centre | 1 | `/centres/sewri` — not in the new content. |

---

## B. Important

### B1. `/centres/prayagraj` — fixed (redirects to `/centres/allahabad`)
The centre exists, but the new slug is `allahabad` (name "Jetking Prayagraj"). Because `prayagraj` is also a city slug, the request falls into the city rule and lands on `/centres?q=Prayagraj`. The live page is a real centre page.
**Fix:** rename the slug to `prayagraj` (matches live) or add `/centres/prayagraj → /centres/allahabad`.

### B2. Default social image — fixed (`public/og-default.png`, used by `buildMetadata`)
`og:image` and `twitter:image` are missing on every page except blog posts that have a cover (180 of 416 posts have one). `twitter:card` is `summary_large_image` with no image, so shares render as a plain link.
**Fix:** add a default image and fall back to it in `buildMetadata` (`src/lib/seo.ts`).

### B3. Titles and descriptions differ from live
Centre titles are identical to live and centre descriptions nearly so (the live "100% job placement" wording was softened to "strong placement support"). Course, section and home titles are all rewritten, e.g.

| Page | Live | New |
| --- | --- | --- |
| AWS course | Best AWS Solution Architect Training and Courses in India | AWS Solution Specialist — 2 Months \| Jetking |
| Ethical hacking | Certified Ethical Hacking Courses & Training Institute | Ethical Hacking Specialist (CEH v12) — 2 Months \| Jetking |
| Courses | IT Career Courses \| Cloud Computing & Ethical Hacking Course | IT Courses — Cloud, Cyber Security & DevOps \| Jetking |
| Home | Jetking | Jetking — Cloud, Cyber Security & IT Courses |

Some new titles are clearer; but rewriting a ranking title can move rankings. Worth deciding per page rather than by default. Length: 39 of 101 titles are over 60 characters and 47 descriptions over 160 (e.g. `/franchise` title is 77), so they will be cut off in results.

### B4. Six posts exist only on the new site
`cloud-computing-career-after-12th`, `cyber-security-vs-cloud-computing`, `switching-to-it-career-at-30`, `what-parents-should-ask-it-institute`, `devops-skills-in-demand`, `it-training-franchise-india`. They are in the sitemap, each about 1,000 characters long. Confirm they are intended content and not seed data.

### B5. `/investors` board link — fixed (now points to `/about-us#about-leaders`)
"Board of directors" links to `https://www.jetking.com/board-of-directors`, whose heading on live is "Lorem ipsum dolor sit amet, elit". Link to `/about-us` (leadership section) instead.

### B6. Centres present on one site only
Live has `/centres/sewri` (in no new content). The new site has `/centres/laxminagar` (not in the live sitemap). Confirm both are intended.

---

## C. Minor

- `/Courses` (capital C) is a 404; live redirects it. Mixed-case requests are rare.
- `/blog?page=2` and `?category=…` canonicalise to `/blog`. Fine while all posts are in the sitemap, but page 2+ contribute nothing themselves.
- `robots.txt` contains a `Host:` line (ignored by Google). `/enquiry` is both disallowed and `noindex`; the disallow stops crawlers seeing the noindex. Pick one: with only the disallow, a crawler that finds the linked URL may still list it without a snippet.
- `sitemap.xml` uses "now" as `lastmod` for the static pages, so every build says everything changed. Live gives real dates.
- No `WebSite`/`SearchAction` JSON-LD on the home page.
- Live also has `http → https` and `non-www → www` redirects (301). Confirm the new host does the same.

---

## D. Redirect table (live → new)

### Clear 1:1 matches
| Live URL | New URL |
| --- | --- |
| `/bca-degree-in-cloud-computing-cyber-security` | `/courses/bca-cloud-cyber-security` |
| `/bca-cloud-computing-cyber-security-brochure-signup` | `/courses/bca-cloud-cyber-security` |
| `/bca-cloud-computing-cyber-security-brochure-mumbai-signup` | `/courses/bca-cloud-cyber-security` |
| `/mca-in-cloud-computing-cyber-security-master-degree` | `/courses/mca-cloud-cyber-security` |
| `/mca-in-cloud-computing-cyber-security-brochure-signup` | `/courses/mca-cloud-cyber-security` |
| `/program/bca-in-multimedia-and-animation` | `/courses/bca-multimedia-animation` |
| `/bca-multimedia-animation-brochure-signup-page` | `/courses/bca-multimedia-animation` |
| `/animation-graphics-metaverse-design-course` | `/courses/gaming-metaverse-design` |
| `/courses/masters-in-gaming-metaverse` | `/courses/gaming-metaverse-design` |
| `/metaverse-course--67d25` | `/courses/gaming-metaverse-design` |
| `/metaverse-course-brochure-signup` | `/courses/gaming-metaverse-design` |
| `/courses/networking-essentials-specialist` | `/courses/networking-essentials` |
| `/networking-essentials-specialist` | `/courses/networking-essentials` |
| `/courses/digital-marketing-training` | `/courses/digital-marketing` |
| `/courses/best-data-analytics-course` | `/courses/data-analyst` |
| `/data-analyst-professional-program` | `/courses/data-analyst` |
| `/franchise-opportunities` | `/franchise` |
| `/board-of-directors` | `/about-us` |
| `/jetking-reviews` | `/placements` |
| `/sitemap-html` | `/sitemap` |
| `/blog/{9 slugs below}` | same post, live slug (see next table) |
| `/blog/{uncategorized, blockchain, cloud-computing, digital-marketing, ethical-hacking, emerging-technology, technology, getting-started-with-your-blog}` | `/blog` |
| `/centres/prayagraj` | `/centres/allahabad` (or rename the slug) |
| `/privacy-policy`, `/terms-conditions`, `/enrollment-terms-and-conditions` | done — pages added |

### Blog slug mismatches (keep the live slug)
| Live slug (full) | New slug |
| --- | --- |
| `indispensable-engineers--e3158` | `indispensable-engineers-e3158` |
| `evolution-of-the-metaverse-from-concept-to-reality--0af65` | `evolution-of-the-metaverse-from-concept-to-reality-0af65` |
| `best-data-analyst-course-institute-in-mumbai-and-navi-mumbai--0f4a2` | `…-navi-mumbai-0f4a2` |
| `safeguarding-your-identity-5-essentials-to-protect-your-personal-information-online` | truncated at 80 characters |
| `advantages-and-best-practices-of-implementing-business-analytics-in-your-organization` | truncated |
| `role-of-zero-trust-architecture-in-creating-a-robust-cyber-security-mechanism-for-your-organization` | truncated |
| `master-your-future-with-jetking-india-best-it-training-institute-for-digital-skills` | truncated |
| `kcet-result-2026-out-now-check-kea-result-rank-explore-top-career-options-after-kcet` | truncated |
| `top-50-interview-questions-for-it-freshers-a-complete-guide-to-crack-your-first-it-interview` | truncated |

### Needs a decision (closest match is a judgement call)
| Live URL | Suggested | Why unsure |
| --- | --- | --- |
| `/masters-in-cloud-computing-cyber-security-brochure-signup` | `/courses/cloud-cyber-security-engineer` | same |
| `/courses/master-cloud-computing-cyber-security` | `/courses/cloud-cyber-security-engineer` | live "Masters"; new catalogue has no "Masters" level for it |
| `/courses/masters-cloud-computing-artificial-intelligence-course` | `/courses/cloud-computing-engineer-ai` | same |
| `/courses/cloud-computing-and-cloud-ai-certification-training` | `/courses/cloud-computing-professional-ai` | same |

### No equivalent in the new catalogue — send to `/courses`, or add the programme
`/program/bca-in-data-science-degree`, `/bca-data-science-brochure-signup-page`, `/courses/best-semiconductor-chip-design-courses`, `/diploma-in-fintech`, `/graphics-design-and-audio-video-editor`, `/motion-graphics-and-animation-professional`, `/masters-in-blockchain-development--5da35`.
`/blockchain-basics` is a "Page not found" page on live itself; leave it as a 404.

### No equivalent page — needs a client decision (redirect, or build the page)
`/career`, `/life-at-jetkings`, `/jetking-jets`, `/core-plus`, `/coreplus-brochure-signup`, `/corporate-training`, `/institution-alliance`, `/centres/sewri`.
Three of these (`core-plus`, `corporate-training`, `institution-alliance`) are titled "Get a Franchise" on live; `/franchise` is the likely target.

---

## E. What already matches or works

- All 157 internal links on the crawled pages return 200; no broken internal links.
- The 12 existing redirects are permanent (308) and 11 are correct.
- Every crawled page has a title, a description, one `<h1>`, `lang="en-IN"` and a self-referencing canonical. Only `/chatbot` has no canonical (it's `noindex`).
- Non-content pages are `noindex`: `/enquiry`, `/chatbot`, `/account`, `/admin/*`. Unknown URLs return a real 404 with `noindex`.
- Trailing-slash URLs 308 to the slash-less URL.
- Centre pages keep the live title and (nearly) the live description. City URLs redirect to the filtered directory (they no longer render near-empty pages).
- Structured data: `EducationalOrganization` everywhere, `BreadcrumbList` on inner pages, `Course` on course pages, `LocalBusiness` on centres, `FAQPage` on /faq, `Article` on posts.
- The new sitemap contains only indexable URLs (no `/enquiry`, no redirects).
