import { Bm25Index } from '@/features/knowledge/lib/bm25';
import type {
  CentreRecord,
  Chunk,
  CourseRecord,
  FaqRecord,
  KnowledgeBase,
  SourcePage,
} from '@/features/knowledge/types';

/**
 * Three separate indexes rather than one.
 *
 * Courses, FAQs, and prose chunks are ranked against each other only inside
 * their own kind; mixing them in a single index lets a 1500-document chunk
 * corpus drown out the 17 course records that usually *are* the answer.
 */
export interface KnowledgeIndex {
  base: KnowledgeBase;
  chunks: Bm25Index;
  courses: Bm25Index;
  faqs: Bm25Index;
  centres: Bm25Index;
  chunkById: Map<string, Chunk>;
  courseById: Map<string, CourseRecord>;
  faqById: Map<string, FaqRecord>;
  centreById: Map<string, CentreRecord>;
  pageById: Map<string, SourcePage>;
}

export function buildIndex(base: KnowledgeBase): KnowledgeIndex {
  const chunks = new Bm25Index();
  const courses = new Bm25Index();
  const faqs = new Bm25Index();
  const centres = new Bm25Index();

  for (const chunk of base.chunks) {
    chunks.add(chunk.id, [
      { text: chunk.heading ?? '', boost: 2 },
      { text: chunk.text, boost: 1 },
    ]);
  }

  for (const course of base.courses) {
    courses.add(course.id, [
      { text: course.name, boost: 4 },
      { text: course.topics.join(' '), boost: 2 },
      { text: course.outcomes.join(' '), boost: 2 },
      { text: course.summary, boost: 1 },
      { text: course.highlights.join(' '), boost: 1 },
      { text: `${course.category} ${course.durationLabel} ${course.eligibility}`, boost: 1 },
    ]);
  }

  for (const centre of base.centres) {
    centres.add(centre.id, [
      { text: centre.city, boost: 5 },
      { text: centre.locations.map((l) => `${l.name} ${l.locality}`).join(' '), boost: 3 },
      { text: centre.summary, boost: 1 },
      { text: centre.programmes.join(' '), boost: 1 },
    ]);
  }

  for (const faq of base.faqs) {
    faqs.add(faq.id, [
      { text: faq.question, boost: 3 },
      { text: faq.answer, boost: 1 },
    ]);
  }

  return {
    base,
    chunks,
    courses,
    faqs,
    centres,
    chunkById: new Map(base.chunks.map((c) => [c.id, c])),
    courseById: new Map(base.courses.map((c) => [c.id, c])),
    faqById: new Map(base.faqs.map((f) => [f.id, f])),
    centreById: new Map(base.centres.map((c) => [c.id, c])),
    pageById: new Map(base.pages.map((p) => [p.id, p])),
  };
}
