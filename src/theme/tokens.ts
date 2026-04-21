const common = {
  success: '#2E7D32',
  warning: '#D68910', // Academic Gold
  error: '#C62828',
  neutral: '#64748B',
};

export const themes = {
  light: {
    ...common,
    primary: '#1A365D',
    accent: '#D68910',
    text: '#1F2937',
    textMuted: '#6B7280',
    background: ['#F8FAFC', '#F1F5F9', '#E2E8F0'] as [string, string, ...string[]],
    surface: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.6)',
    glassShadow: 'rgba(26, 54, 93, 0.1)',
  },
  dark: {
    ...common,
    primary: '#60A5FA',
    accent: '#FBBF24',
    text: '#F9FAFB',
    textMuted: '#9CA3AF',
    background: ['#0F172A', '#1E293B', '#334155'] as [string, string, ...string[]],
    surface: 'rgba(30,41,59,0.5)',
    border: 'rgba(255,255,255,0.1)',
    glassShadow: 'rgba(0,0,0,0.4)',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: '700' as const },
  h2: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
  button: { fontSize: 14, fontWeight: '600' as const },
};
