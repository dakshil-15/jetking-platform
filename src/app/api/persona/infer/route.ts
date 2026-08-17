import { NextResponse } from 'next/server';
import { z } from 'zod';
import { inferPersonaWithModel } from '@/persona/infer';
import { PERSONA_IDS } from '@/persona/types';

const BodySchema = z.object({
  signals: z
    .array(
      z.object({
        id: z.string(),
        persona: z.enum(PERSONA_IDS),
        weight: z.number(),
        detail: z.string(),
      }),
    )
    .max(40),
  behaviour: z.object({
    courseViews: z.array(z.string()).max(40),
    levelViews: z.array(z.string()).max(40),
    feeDepthViews: z.number(),
    centreViews: z.number(),
    franchiseViews: z.number(),
    categoryViews: z.array(z.string()).max(40),
    visitCount: z.number(),
    interests: z.array(z.string()).max(40),
  }),
  acquisitionChannel: z
    .enum(['organic_search', 'paid_search', 'social', 'campaign', 'referral', 'direct'])
    .optional(),
  path: z.string().max(200).optional(),
});

/**
 * Silent persona inference — no PII. Called from the client after browsing signals accumulate.
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const result = await inferPersonaWithModel(parsed.data);
  return NextResponse.json(result);
}
