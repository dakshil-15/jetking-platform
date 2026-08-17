import type { Attachment, AttachmentKind } from '@/features/chat/types';
import { createId } from '@/lib/utils';

const CODE_EXTENSIONS = new Set([
  'ts',
  'tsx',
  'js',
  'jsx',
  'json',
  'py',
  'rb',
  'go',
  'rs',
  'java',
  'cs',
  'php',
  'sh',
  'sql',
  'css',
  'html',
  'yml',
  'yaml',
]);

const DOCUMENT_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'txt', 'md', 'rtf', 'csv', 'xlsx']);

function classify(file: File): AttachmentKind {
  if (file.type.startsWith('image/')) return 'image';

  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (CODE_EXTENSIONS.has(extension)) return 'code';
  if (DOCUMENT_EXTENSIONS.has(extension)) return 'document';
  return 'other';
}

/**
 * Turn picked files into attachment records.
 *
 * Metadata only — this build never reads or uploads file contents, which is
 * why the record carries no blob or URL.
 */
export function toAttachments(files: FileList | readonly File[]): Attachment[] {
  return Array.from(files).map((file) => ({
    id: createId('att'),
    name: file.name,
    size: file.size,
    kind: classify(file),
  }));
}
