export type Locale = 'en' | 'te';

type Dictionary = Record<string, string>;

const en: Dictionary = {
  appName: 'CampusOne',
  students: 'Students',
  attendance: 'Attendance',
  fees: 'Fees',
  messages: 'Messages',
  settings: 'Settings',
  signInTitle: 'Secure Login',
  signInHint: 'Sign in with magic link',
  email: 'Email',
  sendMagicLink: 'Send Magic Link',
  signOut: 'Logout',
  offlineBanner: 'Offline mode. Changes will sync later.',
  loading: 'Loading...',
};

const te: Dictionary = {
  appName: 'క్యాంపస్‌వన్',
  students: 'విద్యార్థులు',
  attendance: 'హాజరు',
  fees: 'ఫీజులు',
  messages: 'సందేశాలు',
  settings: 'సెట్టింగ్స్',
  signInTitle: 'సురక్షిత లాగిన్',
  signInHint: 'మ్యాజిక్ లింక్‌తో లాగిన్ అవ్వండి',
  email: 'ఇమెయిల్',
  sendMagicLink: 'మ్యాజిక్ లింక్ పంపండి',
  signOut: 'లాగ్అవుట్',
  offlineBanner: 'ఆఫ్‌లైన్ మోడ్. కనెక్షన్ వచ్చినప్పుడు సింక్ అవుతుంది.',
  loading: 'లోడింగ్...',
};

const map: Record<Locale, Dictionary> = { en, te };

export const t = (locale: Locale, key: keyof typeof en): string => map[locale][key] ?? key;
