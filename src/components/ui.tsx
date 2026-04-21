/**
 * Native-only UI component library.
 * No Platform checks, no third-party UI libs — pure React Native + Expo.
 */
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from 'expo-glass-effect';
import { themes, spacing, typography } from '../theme/tokens';

export function useAppTheme() {
  const scheme = useColorScheme();
  return themes[scheme === 'dark' ? 'dark' : 'light'];
}

export function ScrollScreen({ children }: PropsWithChildren) {
  const theme = useAppTheme();
  return (
    <LinearGradient colors={theme.background} style={styles.screen}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
      <GlassView
        glassEffectStyle={(useColorScheme() === 'dark' ? 'dark' : 'regular') as any}
        isInteractive
        pointerEvents="none"
        style={styles.headerGlass}
      />
    </LinearGradient>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children }: PropsWithChildren) {
  const theme = useAppTheme();
  return (
    <GlassView
      glassEffectStyle={{ style: 'regular', animate: true, animationDuration: 0.3 }}
      isInteractive
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: theme.glassShadow,
        },
      ]}
    >
      {children}
    </GlassView>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function AppButton({
  label,
  onPress,
  accessibilityLabel,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  accessibilityLabel?: string;
  variant?: 'primary' | 'ghost';
}) {
  const theme = useAppTheme();
  const isGhost = variant === 'ghost';

  const content = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: isGhost ? 'transparent' : theme.primary, shadowColor: theme.primary },
        isGhost && { borderWidth: 1, borderColor: theme.primary },
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonText, isGhost && { color: theme.primary }]}>
        {label}
      </Text>
    </Pressable>
  );

  if (isGhost) {
    return (
      <GlassView glassEffectStyle="clear" style={styles.buttonGhostContainer} isInteractive>
        {content}
      </GlassView>
    );
  }

  return content;
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function AppInput(props: React.ComponentProps<typeof TextInput>) {
  const theme = useAppTheme();
  return (
    <GlassView glassEffectStyle="clear" style={styles.inputContainer} isInteractive>
      <TextInput
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { borderColor: theme.border, color: theme.text }]}
        {...props}
      />
    </GlassView>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'success' | 'warning' | 'error' | 'neutral';
}) {
  const theme = useAppTheme();

  const backgroundColor = theme[tone] + '20'; // 12% opacity
  const textColor = theme[tone === 'neutral' ? 'text' : tone];

  return (
    <GlassView glassEffectStyle="clear" style={styles.badgeContainer} isInteractive>
      <View style={[styles.badge, { backgroundColor }]}>
        <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
      </View>
    </GlassView>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function LoadingState({ label }: { label: string }) {
  const theme = useAppTheme();
  return (
    <View style={styles.center}>
      <ActivityIndicator color={theme.primary} size="large" />
      <Text style={[styles.loadingText, { color: theme.neutral }]}>{label}</Text>
    </View>
  );
}

export function Banner({
  text,
  tone = 'warning',
}: {
  text: string;
  tone?: 'warning' | 'error' | 'success';
}) {
  const theme = useAppTheme();
  const backgroundColor = theme[tone] + '15'; // ~8% opacity
  const textColor = theme[tone];

  return (
    <View style={[styles.banner, { backgroundColor }]}>
      <Text style={[styles.bannerText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Screen
  screen: {
    flex: 1,
  },
  headerGlass: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    zIndex: 10,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 90,
  },

  // Card
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.sm,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },

  // Button
  button: {
    width: '100%',
    borderRadius: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    ...typography.button,
    color: '#fff',
    letterSpacing: 0.2,
  },

  // Input
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },

  // Badge
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },

  // Containers for glass integration
  buttonGhostContainer: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  badgeContainer: {
    borderRadius: 999,
    overflow: 'hidden',
  },

  // Utilities
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: {
    ...typography.body,
  },
  banner: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bannerText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
