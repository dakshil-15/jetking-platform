/**
 * Environment variables this app reads.
 *
 * Declaring them as real properties (rather than leaning on ProcessEnv's index
 * signature) does two things: `process.env.NEXT_PUBLIC_SITE_URL` becomes legal
 * under `noPropertyAccessFromIndexSignature`, and Next can statically find and
 * inline the NEXT_PUBLIC_* reads into the client bundle. Bracket access is not
 * reliably inlined, so a client component would silently fall back to defaults.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    /* ---- Public: safe to expose, inlined into the browser bundle ---------- */

    /** Public origin of the Jetking website that answers link to. */
    NEXT_PUBLIC_SITE_URL?: string;
    /** WhatsApp contact number in international format, digits only. */
    NEXT_PUBLIC_WHATSAPP_NUMBER?: string;
    /** Pre-filled WhatsApp message. */
    NEXT_PUBLIC_WHATSAPP_MESSAGE?: string;

    /* ---- Server only ------------------------------------------------------ */

    /** Base URL of the local Ollama server. */
    OLLAMA_BASE_URL?: string;
    /** Ollama model used to write the final answer. */
    OLLAMA_MODEL?: string;
    /** Let Ollama answer questions outside the Jetking knowledge base. */
    JK_ALLOW_GENERAL_ANSWERS?: string;

    /** Minimum cosine similarity before the assistant will answer at all. */
    JK_ANSWER_GATE?: string;
    /** Sentence-transformer used for both indexing and querying. */
    JK_EMBED_MODEL?: string;
    /** How far the BM25 signal may move a dense result. */
    JK_LEXICAL_WEIGHT?: string;
    /** Lexical hits past this rank contribute nothing. */
    JK_LEXICAL_DEPTH?: string;
    /** Boost for a centre row whose city the question names. */
    JK_CITY_BOOST?: string;
    /** 'auto' | 'dense' | 'lexical' — see env.server.ts. */
    JK_RETRIEVAL_MODE?: string;
    /** BM25 half-saturation constant used when there is no model. */
    JK_LEXICAL_SATURATION?: string;
    /** Confidence floor for an exact city match in lexical mode. */
    JK_CITY_MATCH_FLOOR?: string;
    /** Absolute path to the embedding index, if not under the project root. */
    JK_INDEX_PATH?: string;
    /** Abort the local LLM call after this many milliseconds. */
    OLLAMA_TIMEOUT_MS?: string;

    /* ---- Build scripts ---------------------------------------------------- */

    /** Origin the crawler reads from. */
    JK_ORIGIN?: string;
    JK_CONCURRENCY?: string;
    JK_DELAY_MS?: string;
    JK_TIMEOUT_MS?: string;
    JK_MAX_ATTEMPTS?: string;
    JK_CACHE_TTL_MS?: string;
    JK_REGRESSION_TOLERANCE?: string;
    JK_EMBED_DIM?: string;
    JK_EMBED_BATCH?: string;
  }
}
