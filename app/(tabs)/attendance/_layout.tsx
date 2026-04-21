import { Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import { useAppTheme } from '../../../src/components/ui';

export default function Layout() {
    const theme = useAppTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.background[0], paddingTop: Platform.OS === 'web' ? 64 : 0 }}>
            <Stack 
                screenOptions={{ 
                    headerShown: Platform.OS !== 'web',
                    headerTransparent: true,
                    headerTintColor: theme.primary,
                    contentStyle: { backgroundColor: 'transparent' }
                }} 
            />
        </View>
    );
}
