import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

export function getAuthRedirectUrl() {
  if (Platform.OS === 'web') {
    return (globalThis as { location?: { origin?: string } }).location?.origin;
  }
  return Linking.createURL('auth/callback');
}

export function parseOtpParamsFromUrl(url: string) {
  const parsed = Linking.parse(url);
  const query = parsed.queryParams ?? {};
  const tokenHash = typeof query.token_hash === 'string' ? query.token_hash : undefined;
  const type = typeof query.type === 'string' ? query.type : undefined;
  return { tokenHash, type };
}
