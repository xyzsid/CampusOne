import { useState } from 'react';
import { Modal, Text, View, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppButton, AppInput, Badge, Banner, Card, ScrollScreen, useAppTheme } from '../../../src/components/ui';
import { fees } from '../../../src/data/mockData';
import { typography } from '../../../src/theme/tokens';
import { t } from '../../../src/i18n/strings';
import { useAppContext } from '../../../src/state/appContext';

export default function FeesScreen() {
    const { locale } = useAppContext();
    const theme = useAppTheme();
    const [showMarkPaid, setShowMarkPaid] = useState(false);

    const totalExpected = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalCollected = fees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
    const pct = Math.round((totalCollected / totalExpected) * 100);

    return (
        <>
            <Stack.Screen
                options={{
                    title: t(locale, 'fees'),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { color: theme.primary },
                    headerTitleStyle: { color: theme.primary },
                }}
            />
            <ScrollScreen>
                <Card>
                    <Text style={{ ...typography.h2, color: theme.text }}>Monthly Collection</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                        <View>
                            <Text style={{ ...typography.small, color: theme.textMuted }}>Expected</Text>
                            <Text style={{ ...typography.h2, color: theme.text }}>₹{totalExpected.toLocaleString()}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ ...typography.small, color: theme.textMuted }}>Collected</Text>
                            <Text style={{ ...typography.h2, color: theme.success }}>₹{totalCollected.toLocaleString()} ({pct}%)</Text>
                        </View>
                    </View>
                </Card>

                <Banner text="Overdue fees require follow-up reminders." tone="warning" />

                {fees.map((fee) => (
                    <Card key={fee.studentId}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...typography.h2, color: theme.text }}>{fee.studentName}</Text>
                            <Badge
                                label={fee.status.replace('_', ' ')}
                                tone={fee.status === 'paid' ? 'success' : fee.status === 'due_soon' ? 'warning' : 'error'}
                            />
                        </View>
                        <Text style={{ ...typography.body, color: theme.textMuted }}>₹{fee.amount.toLocaleString()}</Text>
                    </Card>
                ))}

                <AppButton label="Collect Fee" onPress={() => setShowMarkPaid(true)} />

                <Modal visible={showMarkPaid} transparent animationType="slide" presentationStyle="overFullScreen">
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: theme.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 }}>
                            <Text style={{ ...typography.h1, color: theme.text, marginBottom: 4 }}>Mark Fee As Paid</Text>
                            <AppInput placeholder="Student name" />
                            <AppInput placeholder="Month (e.g. April 2026)" />
                            <AppInput placeholder="Amount paid (₹)" keyboardType="number-pad" />
                            <AppInput placeholder="Payment method — Cash, Bank, UPI" />
                            <View style={{ gap: 8, marginTop: 4 }}>
                                <AppButton label="Save Payment" onPress={() => setShowMarkPaid(false)} />
                                <AppButton label="Cancel" variant="ghost" onPress={() => setShowMarkPaid(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollScreen>
        </>
    );
}
