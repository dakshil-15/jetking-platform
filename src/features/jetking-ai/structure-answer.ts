/**
 * Normalize any assistant reply (KB markdown or LLM prose) into consistent
 * structured markdown that the chat UI turns into real HTML.
 */

function cleanSpace(s: string): string {
  return s.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

function sentenceSplit(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9“"'])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Turn a dense prose blob into bullets when it looks like a list of points. */
function proseToBullets(text: string): string[] {
  const sentences = sentenceSplit(text);
  if (sentences.length < 3) return [];
  // Prefer bullets when most sentences are short "points"
  const short = sentences.filter((s) => s.length <= 140).length;
  if (short / sentences.length < 0.6) return [];
  return sentences.map((s) => s.replace(/\.$/, '')).filter((s) => s.length >= 12);
}

function looksStructured(text: string): boolean {
  return (
    /^#{1,3}\s/m.test(text) ||
    /^[-*•]\s/m.test(text) ||
    /^\d{1,2}[.)]\s/m.test(text) ||
    /^\*\*[^*]+\*\*:/m.test(text)
  );
}

/**
 * Lift common Jetking answer shapes out of run-on prose.
 */
function promotePatterns(text: string): string {
  let t = text;

  // "What will I learn? Answer…"
  t = t.replace(
    /^(What (?:will|do|can) (?:I|you|we|students?)[^?]{0,80}\?)\s+/im,
    '### $1\n\n',
  );

  // Fee / duration / payment facts in prose → Label: value lines
  // Allow decimals in durations (1.5 months) — never cut on "."
  t = t.replace(
    /\bCourse fee:\s*([^.\n]+)\.?/gi,
    '\n- **Course fee:** $1\n',
  );
  t = t.replace(/\bPayment:\s*([^.\n]+)\.?/gi, '\n- **Payment:** $1\n');
  t = t.replace(
    /\bruns for\s+([\d.]+\s*(?:months?|years?|weeks?))/gi,
    '\n- **Duration:** $1\n',
  );
  t = t.replace(
    /\bDuration:\s*([\d.]+\s*(?:months?|years?|weeks?)|[^.\n]+)\.?/gi,
    '\n- **Duration:** $1\n',
  );
  t = t.replace(/\bEligibility:\s*([^.\n]+)\.?/gi, '\n- **Eligibility:** $1\n');

  // "Fees for X" opener → heading (only when not already headed)
  if (!/^##\s/m.test(t)) {
    t = t.replace(/^Fees for\s+(.+?)(?=\s+Course fee:|\s+-\s+\*\*Course fee:|\n)/im, '## Fees — $1\n\n');
  }

  return t;
}

/**
 * Ensure the reply has headings / lists / short paragraphs — never one blob.
 */
export function structureAnswerText(raw: string, title?: string): string {
  let   text = cleanSpace(raw ?? '');
  if (!text) return text;

  // Strip accidental code fences the model may wrap around markdown
  text = text.replace(/^```(?:markdown|md|text)?\s*/i, '').replace(/\s*```$/i, '');

  const alreadyStructured = looksStructured(text);
  // Pattern promotion is for plain LLM prose — skip when KB/formatter already structured it
  if (!alreadyStructured) {
    text = promotePatterns(text);
  }

  if (looksStructured(text)) {
    // Still break any leftover mega-paragraphs that aren't lists/headings
    const lines = text.split('\n');
    const out: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (
        !trimmed ||
        /^#{1,3}\s/.test(trimmed) ||
        /^[-*•]\s/.test(trimmed) ||
        /^\d{1,2}[.)]\s/.test(trimmed) ||
        /^_.*_$/u.test(trimmed)
      ) {
        out.push(line);
        continue;
      }
      if (trimmed.length > 280) {
        const bullets = proseToBullets(trimmed);
        if (bullets.length >= 3) {
          for (const b of bullets) out.push(`- ${b}`);
          continue;
        }
        // Soft paragraph breaks on sentence boundaries
        const parts = sentenceSplit(trimmed);
        if (parts.length >= 2) {
          out.push('');
          for (const p of parts) out.push(p, '');
          continue;
        }
      }
      out.push(line);
    }
    text = out.join('\n');
  } else {
    // Fully unstructured LLM / plain prose
    const bullets = proseToBullets(text);
    const lines: string[] = [];
    if (title?.trim()) lines.push(`## ${title.trim()}`, '');
    if (bullets.length >= 3) {
      for (const b of bullets) lines.push(`- ${b}`);
    } else {
      const paras = sentenceSplit(text);
      if (paras.length >= 2 && text.length > 220) {
        for (const p of paras) {
          lines.push(p);
          lines.push('');
        }
      } else {
        lines.push(text);
      }
    }
    text = lines.join('\n');
  }

  // Guarantee at least one heading when we have a title and none in body
  if (title?.trim() && !/^#{1,3}\s/m.test(text)) {
    text = `## ${title.trim()}\n\n${text}`;
  }

  return cleanSpace(text);
}
