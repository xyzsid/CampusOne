import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { supabase } from '../src/lib/supabase';
import { getAuthRedirectUrl } from '../src/core/authLinks';
import { AppButton, AppInput, Card, useAppTheme } from '../src/components/ui';
import { t } from '../src/i18n/strings';
import { useAppContext } from '../src/state/appContext';
import { spacing, typography } from '../src/theme/tokens';

export default function AuthScreen() {
    const { locale } = useAppContext();
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const sendMagicLink = async () => {
        if (!email) {
            setStatus('Email is required');
            return;
        }
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: getAuthRedirectUrl(),
            },
        });
        setStatus(error ? error.message : 'Magic link sent. Check your email.');
    };

    return (
        <LinearGradient
            colors={theme.background}
            style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: spacing.xl,
                    gap: spacing.lg,
                }}
            >
                <Text style={{ ...typography.h1, color: theme.primary }}>{t(locale, 'signInTitle')}</Text>
                <Text style={{ ...typography.body, color: theme.neutral }}>{t(locale, 'signInHint')}</Text>
                <Card>
                    <AppInput
                        accessibilityLabel={t(locale, 'email')}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        placeholder={t(locale, 'email')}
                        value={email}
                    />
                    <View style={{ marginTop: 8 }}>
                        <AppButton label={t(locale, 'sendMagicLink')} onPress={sendMagicLink} />
                    </View>
                    {!!status && <Text style={{ color: theme.neutral, textAlign: 'center', marginTop: 8 }}>{status}</Text>}
                </Card>
            </View>
        </LinearGradient>
    );
}
