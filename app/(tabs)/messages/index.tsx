import { useState } from 'react';
import { Modal, Text, View, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AppButton, AppInput, Badge, Card, ScrollScreen, useAppTheme } from '../../../src/components/ui';
import { messages } from '../../../src/data/mockData';
import { typography } from '../../../src/theme/tokens';
import { t } from '../../../src/i18n/strings';
import { useAppContext } from '../../../src/state/appContext';

export default function MessagesScreen() {
    const { locale } = useAppContext();
    const theme = useAppTheme();
    const [composeOpen, setComposeOpen] = useState(false);

    return (
        <>
            <Stack.Screen
                options={{
                    title: t(locale, 'messages'),
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { color: theme.primary },
                    headerTitleStyle: { color: theme.primary },
                }}
            />
            <ScrollScreen>
                {messages.map((message) => (
                    <Card key={message.id}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <Text style={{ ...typography.h2, color: theme.text, flex: 1 }}>{message.subject}</Text>
                            <Badge
                                label={message.status}
                                tone={
                                    message.status === 'delivered'
                                        ? 'success'
                                        : message.status === 'pending'
                                            ? 'warning'
                                            : 'error'
                                }
                            />
                        </View>
                        <Text style={{ ...typography.body, color: theme.textMuted }}>To: {message.recipient}</Text>
                        <Text style={{ ...typography.small, color: theme.textMuted }}>{message.timestamp}</Text>
                    </Card>
                ))}

                <AppButton label="+ New Message" onPress={() => setComposeOpen(true)} />

                <Modal visible={composeOpen} transparent animationType="slide" presentationStyle="overFullScreen">
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{ backgroundColor: theme.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 }}>
                            <Text style={{ ...typography.h1, color: theme.text, marginBottom: 4 }}>Compose Message</Text>
                            <AppInput placeholder="Type — Individual or Broadcast" />
                            <AppInput placeholder="Recipients" />
                            <AppInput placeholder="Subject" />
                            <AppInput placeholder="Message body..." multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top' }} />
                            <View style={{ gap: 8, marginTop: 4 }}>
                                <AppButton label="Send Now" onPress={() => setComposeOpen(false)} />
                                <AppButton label="Cancel" variant="ghost" onPress={() => setComposeOpen(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollScreen>
        </>
    );
}
