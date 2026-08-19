import type { CounsellingSession } from './session';

/**
 * Builds the text actually sent to semanticSearch().
 *
 * route.ts's existing follow-up heuristic concatenated only the previous
 * user turn ("shorter" -> "Are you looking for a degree or shorter course?
 * shorter"), which loses the subject the moment it's more than one turn
 * back. Pulling the session's lastSubject in fixes that without touching
 * the follow-up detection itself.
 */
export function buildRetrievalQuery(input: {
  message: string;
  isFollowUp: boolean;
  prevUserMessage?: string;
  session: CounsellingSession;
}): string {
  if (!input.isFollowUp) return input.message;

  const parts = [input.session.lastSubject, input.prevUserMessage, input.message].filter(
    (part): part is string => Boolean(part && part.trim()),
  );

  return parts.length ? parts.join(' ') : input.message;
}
