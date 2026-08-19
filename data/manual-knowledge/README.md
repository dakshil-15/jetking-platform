# Manual knowledge

Additional Jetking knowledge that isn't on the live site and isn't in the CMS
— for facts you want to hand the assistant directly. Everything here is
optional; a fresh clone with nothing in this folder ingests zero manual items.

The chatbot answers **only** from the local knowledge base
(`JK_ALLOW_GENERAL_ANSWERS=false`) — this folder is how you expand what that
knowledge base contains.

## Adding content

Pick whichever of these fits what you have:

### 1. Plain text / FAQs — `entries.json`

Append objects to the array:

```json
[
  {
    "title": "Refund policy for cancelled batches",
    "text": "If a batch is cancelled before it starts, Jetking refunds the full course fee within 15 working days...",
    "tags": ["policy", "fees"]
  }
]
```

`tags` is optional and not used for retrieval yet — free-text notes for now.

### 2. Documents — `documents/`

Drop `.pdf`, `.docx`, `.txt`, or `.md` files in here. The filename becomes the
title unless the file has an obvious heading.

### 3. URLs — `urls.txt`

One URL per line. Lines starting with `#` are ignored. Each page is fetched
and its readable text (not navigation/ads/scripts) is extracted.

## Publishing it to the assistant

```bash
npm run ingest:manual-knowledge      # reads this folder -> src/content/manual-knowledge.json
npm run build:chatbot-index -- --embed   # merges it into the live retrieval index
```

The first command is safe to re-run any time you add something — it fully
regenerates `src/content/manual-knowledge.json` from what's currently in this
folder. The second command re-embeds the whole corpus (reuses unchanged
vectors, so it only costs OpenAI calls for genuinely new/changed text).

Manual knowledge gets the highest authority weight in ranking (same tier as
official policy pages) since it's explicitly vetted, unlike scraped SEO prose.
