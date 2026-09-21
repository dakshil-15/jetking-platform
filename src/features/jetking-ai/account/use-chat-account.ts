'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type {
  ChatUser,
  ConversationRecord,
  ConversationSummary,
  SaveConversationInput,
} from '@/lib/chatbot/types';

type AuthResult = { ok: true; user: ChatUser } | { ok: false; error: string };

interface AuthResponse {
  ok?: boolean;
  error?: string;
  user?: ChatUser;
}

export interface SignupInput {
  name: string;
  phone: string;
  email: string;
  password: string;
  state: string;
  city: string;
  centre?: string;
}

const NETWORK_ERROR = 'We could not reach the server. Please check your connection and try again.';

/** Mirrors `HINT_COOKIE` in `src/lib/chatbot/session.ts`: present only while a session probably exists. */
function hasSessionHint(): boolean {
  return document.cookie.split('; ').includes('jk_chat_hint=1');
}

interface ChatAccountOptions {
  /** Load the saved-chat list for a signed-in user. The main website only needs to know who's signed in. */
  history?: boolean;
  /** `false` makes the hook inert (no requests) — for routes where the account UI isn't shown. */
  enabled?: boolean;
}

/**
 * Client side of the optional Jetking account, shared by the website and /chatbot:
 * who is signed in, their saved chats, and the calls that sign in / out and save /
 * open / delete a chat. Guests get `user: null` and everything else is inert.
 */
export function useChatAccount({ history: withHistory = true, enabled = true }: ChatAccountOptions = {}) {
  const [user, setUser] = useState<ChatUser | null>(null);
  /** False until the first "who am I" answer lands, so the UI doesn't flash a Log in button at a signed-in user. */
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<ConversationSummary[]>([]);
  const historyRequest = useRef(0);

  const refreshHistory = useCallback(async () => {
    if (!withHistory) return;
    const request = ++historyRequest.current;
    try {
      const res = await fetch('/api/chatbot/conversations');
      if (!res.ok) return;
      const data: { conversations?: ConversationSummary[] } = await res.json();
      // A slower, older response must not overwrite a newer one.
      if (request === historyRequest.current) setHistory(data.conversations ?? []);
    } catch {
      /* History is a convenience; a failed refresh just leaves the last list in place. */
    }
  }, [withHistory]);

  useEffect(() => {
    let cancelled = false;
    // No hint cookie means no session, so an anonymous visitor makes no request at all.
    const lookup: Promise<{ user?: ChatUser | null }> =
      enabled && hasSessionHint()
        ? fetch('/api/chatbot/auth').then((r) => r.json())
        : Promise.resolve({ user: null });
    lookup
      .then((data) => {
        if (cancelled) return;
        setUser(data.user ?? null);
        setReady(true);
        if (data.user) void refreshHistory();
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, refreshHistory]);

  const authenticate = useCallback(
    async (body: Record<string, string>): Promise<AuthResult> => {
      try {
        const res = await fetch('/api/chatbot/auth', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data: AuthResponse = await res.json();
        if (!res.ok || !data.ok || !data.user) {
          return { ok: false, error: data.error ?? 'Something went wrong. Please try again.' };
        }
        setUser(data.user);
        void refreshHistory();
        return { ok: true, user: data.user };
      } catch {
        return { ok: false, error: NETWORK_ERROR };
      }
    },
    [refreshHistory],
  );

  const login = useCallback(
    (email: string, password: string) => authenticate({ action: 'login', email, password }),
    [authenticate],
  );

  const signup = useCallback(
    (input: SignupInput) =>
      authenticate({
        action: 'signup',
        name: input.name,
        phone: input.phone,
        email: input.email,
        password: input.password,
        state: input.state,
        city: input.city,
        // Optional: an empty string means "no preference" and is simply not sent.
        ...(input.centre ? { centre: input.centre } : {}),
      }),
    [authenticate],
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/api/chatbot/auth', { method: 'DELETE' });
    } finally {
      setUser(null);
      setHistory([]);
    }
  }, []);

  const saveConversation = useCallback(
    async (input: SaveConversationInput) => {
      try {
        const res = await fetch('/api/chatbot/conversations', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (res.ok) void refreshHistory();
        return res.ok;
      } catch {
        return false;
      }
    },
    [refreshHistory],
  );

  const openConversation = useCallback(async (id: string): Promise<ConversationRecord | null> => {
    try {
      const res = await fetch(`/api/chatbot/conversations/${id}`);
      if (!res.ok) return null;
      const data: { conversation?: ConversationRecord } = await res.json();
      return data.conversation ?? null;
    } catch {
      return null;
    }
  }, []);

  const deleteConversation = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/chatbot/conversations/${id}`, { method: 'DELETE' });
        if (res.ok) setHistory((h) => h.filter((c) => c.id !== id));
        return res.ok;
      } catch {
        return false;
      }
    },
    [],
  );

  return {
    user,
    ready,
    history,
    login,
    signup,
    logout,
    saveConversation,
    openConversation,
    deleteConversation,
  };
}

export type ChatAccount = ReturnType<typeof useChatAccount>;
