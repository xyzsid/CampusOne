import { useMemo, useState } from 'react';
import { Modal, Text, View, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppButton, AppInput, Badge, Card, ScrollScreen, useAppTheme } from '../../../src/components/ui';
import { students } from '../../../src/data/mockData';
import { typography } from '../../../src/theme/tokens';
import { t } from '../../../src/i18n/strings';
import { useAppContext } from '../../../src/state/appContext';

export default function StudentsScreen() {
    const { locale } = useAppContext();
    const theme = useAppTheme();
    const [query, setQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [newRoll, setNewRoll] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const filtered = useMemo(
        () =>
            students.filter(
                (s) =>
                    s.name.toLowerCase().includes(query.toLowerCase()) ||
                    String(s.rollNo).includes(query)
            ),
        [query]
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: t(locale, 'students'),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { color: theme.primary },
                    headerTitleStyle: { color: theme.primary },
                }}
            />
            <ScrollScreen>
                <AppInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search by name or roll number"
                    clearButtonMode="while-editing"
                />

                {filtered.map((student) => (
                    <Card key={student.id}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...typography.h2, color: theme.text }}>{student.name}</Text>
                            <Badge label={student.active ? 'Active' : 'Inactive'} tone={student.active ? 'success' : 'neutral'} />
                        </View>
                        <Text style={{ ...typography.body, color: theme.textMuted }}>
                            Roll #{student.rollNo} · {student.className}
                        </Text>
                        <Text style={{ ...typography.small, color: theme.textMuted }}>{student.parentEmail}</Text>
                    </Card>
                ))}

                <AppButton label="+ Add Student" onPress={() => setShowModal(true)} />

                <Modal visible={showModal} animationType="slide" transparent presentationStyle="overFullScreen">
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: theme.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 }}>
                            <Text style={{ ...typography.h1, color: theme.text, marginBottom: 4 }}>Add Student</Text>
                            <AppInput placeholder="Full name*" value={newName} onChangeText={setNewName} />
                            <AppInput placeholder="Roll number*" value={newRoll} onChangeText={setNewRoll} keyboardType="number-pad" />
                            <AppInput placeholder="Parent email*" value={newEmail} onChangeText={setNewEmail} keyboardType="email-address" autoCapitalize="none" />
                            <View style={{ gap: 8, marginTop: 4 }}>
                                <AppButton label="Save" onPress={() => setShowModal(false)} />
                                <AppButton label="Cancel" variant="ghost" onPress={() => setShowModal(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollScreen>
        </>
    );
}
