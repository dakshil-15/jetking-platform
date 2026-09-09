import 'server-only';
import { desc, eq } from 'drizzle-orm';
import { getDb, isDatabaseConfigured } from '@/lib/db/client';
import { leadActivities, leads, type Lead, type LeadActivity } from '@/lib/db/schema';
import type { leadInputSchema, LEAD_STATUSES } from './schema';
import type { z } from 'zod';

export { isDatabaseConfigured };

type LeadInput = z.infer<typeof leadInputSchema>;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error('DATABASE_URL is not set — the leads database is not configured.');
  }
  return db;
}

export async function listLeads(): Promise<Lead[]> {
  const db = requireDb();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLead(id: string): Promise<Lead | undefined> {
  const db = requireDb();
  const [row] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return row;
}

export async function listLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const db = requireDb();
  return db
    .select()
    .from(leadActivities)
    .where(eq(leadActivities.leadId, leadId))
    .orderBy(desc(leadActivities.createdAt));
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const db = requireDb();
  const [row] = await db
    .insert(leads)
    .values({
      name: input.name,
      phone: input.phone || null,
      email: input.email || null,
      courseInterest: input.courseInterest || null,
      city: input.city || null,
      source: input.source,
      persona: input.persona || null,
      notes: input.notes || null,
    })
    .returning();
  if (!row) throw new Error('Insert did not return a row.');
  await db.insert(leadActivities).values({
    leadId: row.id,
    kind: input.source === 'chatbot' ? 'chatbot' : 'note',
    body: input.source === 'chatbot' ? 'Handed off from a chatbot conversation.' : 'Lead created.',
  });
  return row;
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | undefined> {
  const db = requireDb();
  const [row] = await db
    .update(leads)
    .set({ status, updatedAt: new Date() })
    .where(eq(leads.id, id))
    .returning();
  if (row) {
    await db.insert(leadActivities).values({
      leadId: id,
      kind: 'status_change',
      body: `Status changed to "${status}".`,
    });
  }
  return row;
}

export async function addLeadNote(id: string, note: string): Promise<void> {
  const db = requireDb();
  await db.insert(leadActivities).values({ leadId: id, kind: 'note', body: note });
  await db.update(leads).set({ notes: note, updatedAt: new Date() }).where(eq(leads.id, id));
}

export async function deleteLead(id: string): Promise<void> {
  const db = requireDb();
  await db.delete(leads).where(eq(leads.id, id));
}

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
}

export async function getLeadStats(): Promise<LeadStats> {
  const db = requireDb();
  const rows = await db.select({ status: leads.status }).from(leads);
  const byStatus: Record<string, number> = { new: 0, contacted: 0, enrolled: 0, lost: 0 };
  for (const r of rows) byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
  return { total: rows.length, byStatus: byStatus as LeadStats['byStatus'] };
}
