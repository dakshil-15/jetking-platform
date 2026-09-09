import 'server-only';
import { desc } from 'drizzle-orm';
import { getDb, isDatabaseConfigured } from '@/lib/db/client';
import { adminAuditLog, type AdminAuditLogEntry } from '@/lib/db/schema';

/**
 * Records who did what — every mutating admin action (CMS save/delete, lead
 * status change, team invite/role change/removal) calls this after the
 * action succeeds. Best-effort by design: a failed audit write must never
 * fail the action it's describing, so this only logs to the server console
 * on error rather than throwing. No-ops entirely when `DATABASE_URL` isn't
 * set — same degrade-gracefully rule as leads and team accounts, since there
 * is nowhere to durably keep history without a database.
 */
export async function recordAudit(
  actor: { id: string; name: string },
  action: string,
  targetType: string,
  targetId: string | null,
  summary: string,
): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db.insert(adminAuditLog).values({
      actorId: actor.id === 'local-admin' ? null : actor.id,
      actorName: actor.name,
      action,
      targetType,
      targetId,
      summary,
    });
  } catch (e) {
    console.error('Failed to record audit log entry:', e);
  }
}

export async function listAuditLog(limit = 200): Promise<AdminAuditLogEntry[]> {
  const db = getDb();
  if (!db) return [];
  return db.select().from(adminAuditLog).orderBy(desc(adminAuditLog.createdAt)).limit(limit);
}

export { isDatabaseConfigured };
