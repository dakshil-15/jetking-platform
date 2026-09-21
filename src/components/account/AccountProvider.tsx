'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useChatAccount } from '@/features/jetking-ai/account/use-chat-account';
import type { ChatUser } from '@/lib/chatbot/types';
import { SiteAuthDialog, type AuthMode } from './SiteAuthDialog';

interface AccountContextValue {
  /** The signed-in visitor, or `null` for a guest. */
  user: ChatUser | null;
  /** False until the first "who am I" answer, so callers don't flash a Log in button at a signed-in user. */
  ready: boolean;
  /** Opens the site's Log in / Sign up dialog. */
  openAuth: (mode?: AuthMode) => void;
  logout: () => Promise<void>;
}

const noop: AccountContextValue = {
  user: null,
  ready: true,
  openAuth: () => undefined,
  logout: async () => undefined,
};

const AccountContext = createContext<AccountContextValue>(noop);

/** The site's account state. Outside the provider it reads as a guest, so a component never has to guard for it. */
export function useAccount(): AccountContextValue {
  return useContext(AccountContext);
}

/**
 * One shared account for the whole public site. Inert on /admin and /chatbot: neither
 * shows the site chrome, and the chatbot runs its own instance of the same hook (it
 * also needs the saved-chat list, which the website does not).
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const enabled = !pathname.startsWith('/admin') && !pathname.startsWith('/chatbot');
  const account = useChatAccount({ history: false, enabled });
  const [dialog, setDialog] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: 'login' });

  const { user, ready, logout } = account;
  const openAuth = useCallback((mode: AuthMode = 'login') => setDialog({ open: true, mode }), []);

  const value = useMemo<AccountContextValue>(
    () => ({ user, ready, openAuth, logout }),
    [user, ready, openAuth, logout],
  );

  return (
    <AccountContext.Provider value={value}>
      {children}
      {enabled && dialog.open ? (
        <SiteAuthDialog
          mode={dialog.mode}
          onModeChange={(mode) => setDialog({ open: true, mode })}
          onClose={() => setDialog((d) => ({ ...d, open: false }))}
          account={account}
        />
      ) : null}
    </AccountContext.Provider>
  );
}
