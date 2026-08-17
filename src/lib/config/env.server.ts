import 'server-only';

import { envBoolean, envNumber, envText, stripTrailingSlash } from '@/lib/config/env';

/**
 * Server-only environment configuration: retrieval tuning and the local model
 * endpoint.
 *
 * `server-only` makes an accidental import from a client component a build
 * error rather than a silent leak of configuration into the browser bundle.
 */

function retrievalMode(): 'auto' | 'dense' | 'lexical' {
  const raw = envText(process.env.JK_RETRIEVAL_MODE, 'auto').toLowerCase();
  return raw === 'dense' || raw === 'lexical' ? raw : 'auto';
}

const siteUrl = stripTrailingSlash(
  envText(process.env.SITE_URL, 'https://www.jetking.com'),
);

const ollamaBaseUrl = stripTrailingSlash(
  envText(process.env.OLLAMA_BASE_URL, 'http://localhost:11434'),
);

export const serverEnv = {
  /** Origin of the Jetking website that answers link out to. */
  siteUrl,
  /** Host only, for display: "jetking.com". */
  siteHost: siteUrl.replace(/^https?:\/\/(www\.)?/, ''),
  ollamaBaseUrl,
  /** Chat completion endpoint, derived so only the base URL is configured. */
  ollamaChatUrl: `${ollamaBaseUrl}/api/chat`,
  // Reproducible Jetking profile created from models/jetking-assistant.Modelfile.
  // Facts still come from RAG; the profile controls grounded answer behaviour.
  ollamaModel: envText(process.env.OLLAMA_MODEL, 'jetking-assistant'),
  /** Let the local model answer non-Jetking questions when retrieval has no match. */
  allowGeneralAnswers: envBoolean(process.env.JK_ALLOW_GENERAL_ANSWERS, true),

  /** Below this cosine similarity the assistant refuses rather than guesses. */
  answerGate: envNumber(process.env.JK_ANSWER_GATE, 0.42),

  /** Must match the model the index was built with, or vectors are meaningless. */
  embedModel: envText(process.env.JK_EMBED_MODEL, 'Xenova/paraphrase-multilingual-MiniLM-L12-v2'),
  lexicalWeight: envNumber(process.env.JK_LEXICAL_WEIGHT, 0.08),
  lexicalDepth: envNumber(process.env.JK_LEXICAL_DEPTH, 25),
  cityBoost: envNumber(process.env.JK_CITY_BOOST, 0.2),

  /**
   * 'auto' (default) uses the embedding model when it loads and silently
   * degrades to BM25 when it does not — which is what serverless needs, since
   * the weights are far too large to deploy. 'dense' refuses to degrade, so a
   * missing model is a loud error; 'lexical' skips the model entirely.
   */
  retrievalMode: retrievalMode(),

  /** BM25 score that maps to 0.5 once saturated; sets where the gate bites. */
  lexicalSaturation: envNumber(process.env.JK_LEXICAL_SATURATION, 6),
  /** Confidence floor for a row whose city the question names, lexical mode. */
  cityMatchFloor: envNumber(process.env.JK_CITY_MATCH_FLOOR, 0.6),

  /** Give up on the local LLM quickly; a hung request would burn the whole
   *  serverless budget waiting for a host that is not there. */
  /** Absolute override for the embedding index location. */
  indexPath: envText(process.env.JK_INDEX_PATH, ''),

  ollamaTimeoutMs: envNumber(process.env.OLLAMA_TIMEOUT_MS, 20_000),
} as const;
