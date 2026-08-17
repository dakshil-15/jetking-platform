import { centrePath } from '@/lib/centre-path';
import { EMPTY_BEHAVIOUR, type BehaviourInput } from './types';

export type { BehaviourInput };

/**
 * Client-side behaviour store (return-visit profile).
 *
 * Lives in localStorage rather than the cookie because it is only ever read by the
 * client engine — keeping it out of the cookie avoids sending a growing payload on
 * every request, including requests for static assets.
 */

const STORAGE_KEY = 'jk_behaviour_v2';
const SESSION_KEY = 'jk_session_v1';

/** Caps prevent unbounded growth in a long-lived browser profile. */
const MAX_TRACKED = 40;
const MAX_PAGES = 20;

function safeRead(): BehaviourInput {
  if (typeof window === 'undefined') return { ...EMPTY_BEHAVIOUR };
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem('jk_behaviour_v1');
    if (!raw) return { ...EMPTY_BEHAVIOUR };
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return { ...EMPTY_BEHAVIOUR };
    const b = parsed as Partial<BehaviourInput>;
    return {
      courseViews: Array.isArray(b.courseViews) ? b.courseViews.slice(-MAX_TRACKED) : [],
      levelViews: Array.isArray(b.levelViews) ? b.levelViews.slice(-MAX_TRACKED) : [],
      categoryViews: Array.isArray(b.categoryViews) ? b.categoryViews.slice(-MAX_TRACKED) : [],
      feeDepthViews: typeof b.feeDepthViews === 'number' ? b.feeDepthViews : 0,
      centreViews: typeof b.centreViews === 'number' ? b.centreViews : 0,
      franchiseViews: typeof b.franchiseViews === 'number' ? b.franchiseViews : 0,
      visitCount: typeof b.visitCount === 'number' ? b.visitCount : 1,
      lastCourse: typeof b.lastCourse === 'string' ? b.lastCourse : undefined,
      lastCentre:
        b.lastCentre && typeof b.lastCentre === 'object'
          ? (b.lastCentre as BehaviourInput['lastCentre'])
          : undefined,
      formAttempts: Array.isArray(b.formAttempts) ? b.formAttempts.slice(-MAX_TRACKED) : [],
      visitedPages: Array.isArray(b.visitedPages) ? b.visitedPages.slice(-MAX_PAGES) : [],
      interests: Array.isArray(b.interests) ? b.interests.slice(-MAX_TRACKED) : [],
      geoCity: typeof b.geoCity === 'string' ? b.geoCity : undefined,
    };
  } catch {
    return { ...EMPTY_BEHAVIOUR };
  }
}

function safeWrite(behaviour: BehaviourInput): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(behaviour));
  } catch {
    // Quota exceeded or storage disabled — the engine simply learns nothing new.
  }
}

export function readBehaviour(): BehaviourInput {
  return safeRead();
}

export type BehaviourEvent =
  | { kind: 'course-view'; slug: string; level: string; title?: string }
  | { kind: 'fee-depth' }
  | { kind: 'centre-view'; citySlug: string; slug: string; name?: string }
  | { kind: 'franchise-view' }
  | { kind: 'article-view'; category: string; path?: string; title?: string }
  | { kind: 'page-view'; path: string; title?: string }
  | { kind: 'form'; formId: string; status: 'started' | 'completed' }
  | { kind: 'interest'; tag: string }
  | { kind: 'geo'; city: string };

function inferInterests(slug: string): string[] {
  const tags: string[] = [];
  const lower = slug.toLowerCase();
  if (/ai|ml|machine/.test(lower)) tags.push('AI');
  if (/cloud/.test(lower)) tags.push('cloud');
  if (/cyber|security/.test(lower)) tags.push('cyber');
  return tags;
}

export function recordBehaviour(event: BehaviourEvent): BehaviourInput {
  const current = safeRead();
  const now = new Date().toISOString();

  switch (event.kind) {
    case 'course-view':
      current.courseViews = [...current.courseViews, event.slug].slice(-MAX_TRACKED);
      current.levelViews = [...current.levelViews, event.level].slice(-MAX_TRACKED);
      current.lastCourse = event.slug;
      current.visitedPages = [
        ...current.visitedPages,
        { path: `/courses/${event.slug}`, title: event.title, at: now },
      ].slice(-MAX_PAGES);
      for (const tag of inferInterests(event.slug)) {
        if (!current.interests.includes(tag)) current.interests.push(tag);
      }
      current.interests = current.interests.slice(-MAX_TRACKED);
      break;
    case 'fee-depth':
      current.feeDepthViews += 1;
      break;
    case 'centre-view':
      current.centreViews += 1;
      current.lastCentre = {
        citySlug: event.citySlug,
        slug: event.slug,
        name: event.name,
      };
      current.visitedPages = [
        ...current.visitedPages,
        {
          path: centrePath(event.slug),
          title: event.name,
          at: now,
        },
      ].slice(-MAX_PAGES);
      break;
    case 'franchise-view':
      current.franchiseViews += 1;
      break;
    case 'article-view':
      current.categoryViews = [...current.categoryViews, event.category].slice(-MAX_TRACKED);
      if (event.path) {
        current.visitedPages = [
          ...current.visitedPages,
          { path: event.path, title: event.title, at: now },
        ].slice(-MAX_PAGES);
      }
      break;
    case 'page-view':
      current.visitedPages = [
        ...current.visitedPages,
        { path: event.path, title: event.title, at: now },
      ].slice(-MAX_PAGES);
      break;
    case 'form':
      current.formAttempts = [
        ...current.formAttempts,
        { formId: event.formId, status: event.status, at: now },
      ].slice(-MAX_TRACKED);
      break;
    case 'interest':
      if (!current.interests.includes(event.tag)) {
        current.interests = [...current.interests, event.tag].slice(-MAX_TRACKED);
      }
      break;
    case 'geo':
      current.geoCity = event.city;
      break;
  }

  safeWrite(current);
  return current;
}

/** Increments the visit counter once per browser session. */
export function markVisit(): BehaviourInput {
  const current = safeRead();
  if (typeof window === 'undefined') return current;
  try {
    if (!window.sessionStorage.getItem(SESSION_KEY)) {
      window.sessionStorage.setItem(SESSION_KEY, '1');
      current.visitCount += 1;
      safeWrite(current);
    }
  } catch {
    // Session storage unavailable — visit count stays flat.
  }
  return current;
}

/** Clears everything the site has inferred. Wired to the "reset" control in the debug panel. */
export function clearBehaviour(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem('jk_behaviour_v1');
    window.localStorage.removeItem('jk_visitor_id_v1');
    window.localStorage.removeItem('jk_identity_link_v1');
    window.localStorage.removeItem('jk_intent_lock_v1');
    window.localStorage.removeItem('jk_user_profile_v1');
    window.localStorage.removeItem('jk_student_journey_v1');
    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem('jk_welcome_dismissed_v1');
    document.cookie = 'jk_persona=; Max-Age=0; path=/';
    document.cookie = 'jk_visitor_id=; Max-Age=0; path=/';
  } catch {
    // Nothing to do — the control is best-effort by nature.
  }
}
