'use client';

import { useState, useTransition } from 'react';
import { saveCollectionItem, removeCollectionItem } from './actions';
import type { CmsCollection } from '@/lib/cms/types';
import { ADMIN_FORM_CONFIG } from '@/lib/cms/admin-form-config';
import { ValueEditor, humanize } from './ValueEditor';
import { AdminConfirmDialog } from './AdminConfirmDialog';

type Rec = Record<string, unknown>;
type PendingSwitch = { kind: 'record'; item: Rec } | { kind: 'new' };

export function RecordEditor({
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
  // Looked up here rather than passed as a prop: a Server Component page can't
  // hand a Client Component a config object whose `blank` field is a function —
  // React Server Components can only serialize plain data across that boundary.
  const config = ADMIN_FORM_CONFIG[collection];
  const initialRecords = initial as Rec[];
  const firstRecord = initialRecords[0];
  const firstDraft = { ...config.blank(), ...(firstRecord ?? {}) };

  const [items, setItems] = useState<Rec[]>(initialRecords);
  const [draft, setDraft] = useState<Rec>(firstDraft);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(firstDraft));
  const [originalId, setOriginalId] = useState<string | undefined>(
    firstRecord ? String(firstRecord[idKey]) : undefined,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingSwitch, setPendingSwitch] = useState<PendingSwitch | null>(null);
  const [search, setSearch] = useState('');

  const isDirty = JSON.stringify(draft) !== savedSnapshot;
  const query = search.trim().toLowerCase();
  const visibleItems = query ? items.filter((item) => String(item[idKey]).toLowerCase().includes(query)) : items;

  function confirmDelete(id: string) {
    start(async () => {
      await removeCollectionItem(collection, idKey, id);
      setItems((prev) => prev.filter((p) => p[idKey] !== id));
      if (originalId === id) applyNew();
      setMessage(`Deleted ${id}.`);
      setPendingDeleteId(null);
    });
  }

  const published = draft.status === 'published';
  const fieldKeys = Object.keys(draft).filter((k) => k !== 'status');

  const sections = config.sections
    ? [
        ...config.sections.map((s) => ({
          title: s.title,
          fields: s.fields.filter((f) => fieldKeys.includes(f)),
        })),
        {
          title: 'More',
          fields: fieldKeys.filter((f) => !config.sections!.some((s) => s.fields.includes(f))),
        },
      ].filter((s) => s.fields.length > 0)
    : [{ title: null, fields: fieldKeys }];

  function applyRecord(item: Rec) {
    const next = { ...config.blank(), ...item };
    setDraft(next);
    setSavedSnapshot(JSON.stringify(next));
    setOriginalId(String(item[idKey]));
    setMessage(null);
    setError(null);
  }

  function applyNew() {
    const next = config.blank();
    setDraft(next);
    setSavedSnapshot(JSON.stringify(next));
    setOriginalId(undefined);
    setMessage(null);
    setError(null);
  }

  function loadRecord(item: Rec) {
    if (isDirty) {
      setPendingSwitch({ kind: 'record', item });
      return;
    }
    applyRecord(item);
  }

  function startNew() {
    if (isDirty) {
      setPendingSwitch({ kind: 'new' });
      return;
    }
    applyNew();
  }

  function confirmSwitch() {
    if (!pendingSwitch) return;
    if (pendingSwitch.kind === 'record') applyRecord(pendingSwitch.item);
    else applyNew();
    setPendingSwitch(null);
  }

  function save() {
    start(async () => {
      setMessage(null);
      setError(null);
      const result = await saveCollectionItem(collection, idKey, JSON.stringify(draft), originalId);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setItems((prev) => {
        const next = [...prev];
        const renamedFromIdx =
          originalId !== undefined ? next.findIndex((p) => p[idKey] === originalId) : -1;
        if (renamedFromIdx >= 0) {
          next[renamedFromIdx] = draft;
          return next;
        }
        const idx = next.findIndex((p) => p[idKey] === draft[idKey]);
        if (idx >= 0) next[idx] = draft;
        else next.push(draft);
        return next;
      });
      setOriginalId(String(draft[idKey]));
      setSavedSnapshot(JSON.stringify(draft));
      setMessage('Saved. Revalidation and Guide re-ingest hooks fired.');
    });
  }

  return (
    <div>
      <p className="label-mono text-[var(--accent-ink)]">{collection}</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">{title}</h1>
      <p className="lede mt-4">Edit as a form and save — no JSON required.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        {/* ── Record list ─────────────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="rounded-[var(--radius-card)] border border-border bg-background">
            <div className="flex items-baseline justify-between gap-4 border-b border-border px-4 py-3">
              <h2 className="label-mono">Records</h2>
              <span className="label-mono numeral">
                {query ? `${visibleItems.length} / ${items.length}` : items.length}
              </span>
            </div>

            {items.length > 8 ? (
              <div className="border-b border-border p-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search records…"
                  aria-label="Search records"
                  className="admin-input h-9 text-sm"
                />
              </div>
            ) : null}

            <ul className="max-h-[36rem] overflow-auto">
              {visibleItems.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-foreground-muted">
                  {query ? 'No records match your search.' : 'No records yet — add one below.'}
                </li>
              ) : null}
              {visibleItems.map((item, i) => {
                const id = String(item[idKey] ?? i);
                const status = String(item.status ?? 'unknown');
                const isActive = originalId === id;

                return (
                  <li
                    key={id}
                    className={`flex items-center gap-2 border-b border-border px-3 last:border-none ${
                      isActive ? 'bg-[var(--accent-soft)]' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="min-w-0 flex-1 cursor-pointer py-3 text-left"
                      onClick={() => loadRecord(item)}
                    >
                      <span className={`block text-sm break-words ${isActive ? 'font-semibold text-[var(--accent)]' : 'text-foreground'}`}>
                        {id}
                      </span>
                      <span
                        className={status === 'published' ? 'label-mono text-growth-600' : 'label-mono'}
                      >
                        {status}
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={pending}
                      aria-label={`Delete ${id}`}
                      className="shrink-0 cursor-pointer rounded-[var(--admin-radius)] border border-border px-3 py-1 text-xs font-semibold text-foreground-muted transition-colors hover:border-[var(--color-error-600)] hover:text-[var(--color-error-600)] disabled:opacity-45"
                      onClick={() => setPendingDeleteId(id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={startNew}
            className="mt-3 w-full cursor-pointer rounded-[var(--admin-radius)] border border-dashed border-border-medium px-4 py-2.5 text-sm font-semibold text-foreground-secondary transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            + New record
          </button>
        </div>

        {/* ── Form ────────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <div className="rounded-[var(--radius-card)] border border-border bg-background p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-foreground">
                <span
                  role="switch"
                  aria-checked={published}
                  onClick={() => setDraft((prev) => ({ ...prev, status: published ? 'draft' : 'published' }))}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                    published ? 'bg-growth-600' : 'bg-border-medium'
                  }`}
                >
                  <span
                    className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform ${
                      published ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </span>
                {published ? 'Published' : 'Draft'}
              </label>

              <div className="flex items-center gap-3">
                {error ? (
                  <p role="alert" className="text-sm font-medium text-[var(--color-error-600)]">
                    {error}
                  </p>
                ) : null}
                {message ? (
                  <p aria-live="polite" className="text-sm text-growth-600">
                    {message}
                  </p>
                ) : null}
                <button
                  type="button"
                  disabled={pending}
                  onClick={save}
                  className="inline-flex h-10 cursor-pointer items-center rounded-[var(--admin-radius)] bg-[var(--accent)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-45"
                >
                  {pending ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-6">
              {sections.map((section, i) => (
                <div key={section.title ?? 'flat'} className={i > 0 ? 'border-t border-border pt-6' : ''}>
                  {section.title ? (
                    <h3 className="mb-4 text-sm font-semibold text-foreground">{section.title}</h3>
                  ) : null}
                  <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                    {section.fields.map((key) => {
                      const value = draft[key];
                      const isWide = Array.isArray(value) || (typeof value === 'object' && value !== null);
                      return (
                        <div key={key} className={isWide ? 'sm:col-span-2' : ''}>
                          <label className="mb-1.5 block text-xs font-semibold text-foreground-secondary">
                            {config.selectFields?.[key]?.label ?? humanize(key)}
                          </label>
                          <ValueEditor
                            fieldKey={key}
                            value={value}
                            config={config}
                            onChange={(next) => setDraft((prev) => ({ ...prev, [key]: next }))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticks to the bottom of the viewport on a long form, so Save is
             never more than one glance away without scrolling back to the top. */}
          <div className="sticky bottom-4 z-10 mt-4 flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-border bg-background/95 px-4 py-3 shadow-[var(--shadow-lg)] backdrop-blur-sm">
            <span className="text-xs font-medium text-foreground-muted">
              {isDirty ? 'Unsaved changes' : 'All changes saved'}
            </span>
            <button
              type="button"
              disabled={pending}
              onClick={save}
              className="inline-flex h-9 cursor-pointer items-center rounded-[var(--admin-radius)] bg-[var(--accent)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-45"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <AdminConfirmDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
        title="Delete record"
        description={
          <>
            Delete <span className="font-semibold text-foreground">{pendingDeleteId}</span> from{' '}
            {collection}? This cannot be undone.
          </>
        }
        pending={pending}
        onConfirm={() => pendingDeleteId && confirmDelete(pendingDeleteId)}
      />

      <AdminConfirmDialog
        open={pendingSwitch !== null}
        onOpenChange={(open) => !open && setPendingSwitch(null)}
        title="Discard unsaved changes?"
        description="You've edited this record without saving. Switching now discards those changes."
        confirmLabel="Discard"
        onConfirm={confirmSwitch}
      />
    </div>
  );
}
