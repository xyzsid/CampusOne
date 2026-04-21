import { Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppButton, Badge, Card, ScrollScreen, useAppTheme } from '../../../src/components/ui';
import { t } from '../../../src/i18n/strings';
import { useAppContext } from '../../../src/state/appContext';
import { typography } from '../../../src/theme/tokens';

export default function SettingsScreen() {
    const { locale, setLocale } = useAppContext();
    const theme = useAppTheme();

    return (
        <>
            <Stack.Screen
                options={{
                    title: t(locale, 'settings'),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { color: theme.primary },
                    headerTitleStyle: { color: theme.primary },
                }}
            />
            <ScrollScreen>
                {/* Language */}
                <Card>
                    <Text style={{ ...typography.h2, color: theme.text }}>Language</Text>
                    <Text style={{ ...typography.small, color: theme.textMuted }}>
                        Choose your preferred language for the interface.
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                        <View style={{ flex: 1 }}>
                            <AppButton
                                label="English"
                                variant={locale === 'en' ? 'primary' : 'ghost'}
                                onPress={() => setLocale('en')}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <AppButton
                                label="తెలుగు"
                                variant={locale === 'te' ? 'primary' : 'ghost'}
                                onPress={() => setLocale('te')}
                            />
                        </View>
                    </View>
                </Card>

                {/* Security */}
                <Card>
                    <Text style={{ ...typography.h2, color: theme.text }}>Security</Text>
                    <Text style={{ ...typography.body, color: theme.textMuted }}>
                        Signed in with magic link. No password stored.
                    </Text>
                    <Text style={{ ...typography.small, color: theme.textMuted }}>
                        Two-factor authentication and session management coming soon.
                    </Text>
                </Card>

                {/* Teachers */}
                <Card>
                    <Text style={{ ...typography.h2, color: theme.text, marginBottom: 4 }}>Manage Teachers</Text>
                    {[
                        { name: 'Rohit Kumar', email: 'rohit@school.com', role: 'Admin', tone: 'success' as const },
                        { name: 'Maya Devi', email: 'maya@school.com', role: 'Teacher', tone: 'neutral' as const },
                    ].map((teacher) => (
                        <View
                            key={teacher.email}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}
                        >
                            <View>
                                <Text style={{ ...typography.body, color: theme.text, fontWeight: '600' }}>{teacher.name}</Text>
                                <Text style={{ ...typography.small, color: theme.textMuted }}>{teacher.email}</Text>
                            </View>
                            <Badge label={teacher.role} tone={teacher.tone} />
                        </View>
                    ))}
                </Card>

                {/* Sign out */}
                <AppButton label={t(locale, 'signOut')} variant="ghost" onPress={() => { }} />
            </ScrollScreen>
        </>
    );
}
