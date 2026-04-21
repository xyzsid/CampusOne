import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { GlassContainer } from 'expo-glass-effect';
import { AppProvider } from '../src/state/appContext';

export default function RootLayout() {
    return (
        <AppProvider>
            <StatusBar style="auto" />
            <GlassContainer spacing={30} style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="auth" />
                </Stack>
            </GlassContainer>
        </AppProvider>
    );
}
