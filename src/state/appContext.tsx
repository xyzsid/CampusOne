import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { Locale } from '../i18n/strings';

type AppContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>('en');
  const [session, setSession] = useState<Session | null>(null);
  const value = useMemo(() => ({ locale, setLocale, session, setSession }), [locale, session]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
