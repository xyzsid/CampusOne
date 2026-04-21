import { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppButton, Card, ScrollScreen, useAppTheme } from '../../../src/components/ui';
import { students } from '../../../src/data/mockData';
import { typography } from '../../../src/theme/tokens';
import { t } from '../../../src/i18n/strings';
import { useAppContext } from '../../../src/state/appContext';

export default function AttendanceScreen() {
    const { locale } = useAppContext();
    const theme = useAppTheme();
    const [presentMap, setPresentMap] = useState<Record<string, boolean>>(
        Object.fromEntries(students.map((s) => [s.id, true]))
    );
    const presentCount = useMemo(() => Object.values(presentMap).filter(Boolean).length, [presentMap]);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const toggle = (id: string) =>
        setPresentMap((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <>
            <Stack.Screen
                options={{
                    title: t(locale, 'attendance'),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { color: theme.primary },
                    headerTitleStyle: { color: theme.primary },
                }}
            />
            <ScrollScreen>
                <Card>
                    <Text style={{ ...typography.body, color: theme.textMuted }}>
                        Default all present — tap a student to mark absent.
                    </Text>
                    <Text style={{ ...typography.h2, color: theme.text }}>
                        {presentCount} / {students.length} present
                    </Text>
                </Card>

                {students.map((student) => {
                    const isPresent = presentMap[student.id];
                    return (
                        <Pressable
                            key={student.id}
                            onPress={() => toggle(student.id)}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isPresent }}
                        >
                            <Card>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ ...typography.h2, color: theme.text }}>{student.name}</Text>
                                    <View style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 14,
                                        backgroundColor: isPresent ? theme.success : 'rgba(100,116,139,0.15)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 14, color: isPresent ? '#fff' : theme.neutral }}>
                                            {isPresent ? '✓' : '✗'}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{ ...typography.small, color: theme.textMuted }}>Roll #{student.rollNo}</Text>
                            </Card>
                        </Pressable>
                    );
                })}

                <AppButton label="Submit Attendance" onPress={() => setConfirmOpen(true)} />

                <Modal visible={confirmOpen} transparent animationType="fade" presentationStyle="overFullScreen">
                    <View style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: theme.surface, borderRadius: 20, padding: 24, gap: 12 }}>
                            <Text style={{ ...typography.h1, color: theme.text }}>Confirm Submission</Text>
                            <Text style={{ ...typography.body, color: theme.textMuted }}>
                                Submit attendance for {presentCount} of {students.length} students?
                            </Text>
                            <AppButton label="Confirm & Submit" onPress={() => setConfirmOpen(false)} />
                            <AppButton label="Cancel" variant="ghost" onPress={() => setConfirmOpen(false)} />
                        </View>
                    </View>
                </Modal>
            </ScrollScreen>
        </>
    );
}
