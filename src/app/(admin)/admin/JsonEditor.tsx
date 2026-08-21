'use client';

import { useState, useTransition } from 'react';
import { saveCollectionItem, removeCollectionItem } from './actions';
import type { CmsCollection } from '@/lib/cms/types';

export function JsonEditor({
  collection,
  idKey,
  initial,
  title,
}: {
  collection: CmsCollection;
  idKey: string;
  initial: unknown[];
  title: string;
}) {
  const firstId = (initial[0] as Record<string, unknown> | undefined)?.[idKey];
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState(JSON.stringify(initial[0] ?? {}, null, 2));
  /**
   * The id the currently-loaded draft was opened under. Passed back on save so
   * changing the id field in the textarea renames that row instead of forking a
   * duplicate — `undefined` means "this is a new record", set explicitly via
   * "+ New record" rather than inferred, since inferring it from whether the id
   * changed would make the existing "clone by editing the id" workflow silently
   * rename the record you copied from instead of creating a new one.
   */
  const [originalId, setOriginalId] = useState<string | undefined>(
    firstId !== undefined ? String(firstId) : undefined,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div className="max-w-6xl">
      <p className="label-mono text-[var(--accent-ink)]">{collection}</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">{title}</h1>
      <p className="lede mt-4">
        Edit the record as JSON and save. Set <code className="text-foreground">status</code>{' '}
        to <code className="text-foreground">published</code> or{' '}
        <code className="text-foreground">draft</code>.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        {/* ── Record list ─────────────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h2 className="label-mono">Records</h2>
            <span className="label-mono numeral">{items.length}</span>
          </div>

          <ul className="max-h-[32rem] overflow-auto">
            {items.map((item, i) => {
              const row = item as Record<string, unknown>;
              const id = String(row[idKey] ?? i);
              const status = String(row.status ?? 'unknown');

              return (
                <li key={id} className="flex items-center gap-2 border-b border-border">
                  <button
                    type="button"
                    className="min-w-0 flex-1 cursor-pointer py-3 text-left transition-colors hover:text-jk-400"
                    onClick={() => {
                      setDraft(JSON.stringify(item, null, 2));
                      setOriginalId(id);
                      setMessage(null);
                      setError(null);
                    }}
                  >
                    <span className="block truncate font-mono text-sm text-foreground">
                      {id}
                    </span>
                    <span
                      className={
                        status === 'published'
                          ? 'label-mono text-growth-600'
                          : 'label-mono'
                      }
                    >
                      {status}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={pending}
                    /*
                     * Every row rendered a button reading just "Delete". Pulled up in
                     * a screen reader's control list they are indistinguishable, and
                     * there is no way to tell which record a given one destroys
                     * (WCAG 2.4.6). The visible label stays short; the accessible
                     * name carries the record id.
                     */
                    aria-label={`Delete ${id}`}
                    className="shrink-0 cursor-pointer rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground-muted transition-colors hover:border-jk-500 hover:text-jk-400 disabled:opacity-45"
                    onClick={() => {
                      // Irreversible, and one row away from the row you meant.
                      if (!window.confirm(`Delete "${id}" from ${collection}? This cannot be undone.`)) {
                        return;
                      }
                      start(async () => {
                        await removeCollectionItem(collection, idKey, id);
                        setItems((prev) =>
                          prev.filter((p) => (p as Record<string, unknown>)[idKey] !== id),
                        );
                        setOriginalId((prev) => (prev === id ? undefined : prev));
                        setMessage(`Deleted ${id}.`);
                      });
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Editor ──────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <label htmlFor="record-json" className="label-mono block border-b border-border pb-3">
            Record JSON
          </label>
          <textarea
            id="record-json"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            rows={24}
            className="mt-3 w-full rounded-[var(--radius-input)] border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground transition-colors hover:border-border-medium focus:border-jk-400 focus:ring-2 focus:ring-jk-400/25 focus:outline-none"
          />

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              disabled={pending}
              className="inline-flex h-12 cursor-pointer items-center rounded-full bg-jk-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-jk-500 disabled:opacity-45"
              onClick={() =>
                start(async () => {
                  setMessage(null);
                  setError(null);

                  let parsed: Record<string, unknown>;
                  try {
                    parsed = JSON.parse(draft) as Record<string, unknown>;
                  } catch {
                    setError('Invalid JSON.');
                    return;
                  }

                  const result = await saveCollectionItem(collection, idKey, draft, originalId);
                  if (!result.ok) {
                    setError(result.error);
                    return;
                  }

                  setItems((prev) => {
                    const next = [...prev];
                    const renamedFromIdx =
                      originalId !== undefined
                        ? next.findIndex(
                            (p) => (p as Record<string, unknown>)[idKey] === originalId,
                          )
                        : -1;
                    if (renamedFromIdx >= 0) {
                      next[renamedFromIdx] = parsed;
                      return next;
                    }
                    const idx = next.findIndex(
                      (p) => (p as Record<string, unknown>)[idKey] === parsed[idKey],
                    );
                    if (idx >= 0) next[idx] = parsed;
                    else next.push(parsed);
                    return next;
                  });
                  setOriginalId(String(parsed[idKey]));
                  setMessage('Saved. Revalidation and Guide re-ingest hooks fired.');
                })
              }
            >
              {pending ? 'Saving…' : 'Save'}
            </button>

            <button
              type="button"
              disabled={pending}
              className="inline-flex h-12 cursor-pointer items-center rounded-full border border-border px-6 text-sm font-semibold text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-45"
              onClick={() => {
                setDraft(JSON.stringify({ status: 'draft' }, null, 2));
                setOriginalId(undefined);
                setMessage(null);
                setError(null);
              }}
            >
              + New record
            </button>

            {error ? (
              <p role="alert" className="text-sm font-medium text-jk-400">
                {error}
              </p>
            ) : null}
            {message ? (
              <p aria-live="polite" className="text-sm text-growth-600">
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
