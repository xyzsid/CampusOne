import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LoadingState } from '../components/ui';
import { t } from '../i18n/strings';
import { RootNavigator } from '../navigation/RootNavigator';
import { AppProvider, useAppContext } from '../state/appContext';

function AppShell() {
  const [ready, setReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { locale, setSession } = useAppContext();

  useEffect(() => {
    setSession({} as never);
    setReady(true);
  }, [setSession]);

  useEffect(() => {
    const timer = setTimeout(() => setIsOnline(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <LoadingState label={t(locale, 'loading')} />;
  }

  return (
    <>
      {!isOnline ? (
        <View style={{ padding: 8, backgroundColor: 'rgba(255,193,7,0.15)' }}>
          <Text style={{ color: '#E65100', fontSize: 13 }}>{t(locale, 'offlineBanner')}</Text>
        </View>
      ) : null}
      <RootNavigator />
      <StatusBar style="dark" />
    </>
  );
}

export function AppRoot() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
