import { useColorScheme } from 'react-native';
import { NativeTabs, NativeTabTrigger as Trigger, Label, Icon } from 'expo-router/unstable-native-tabs';
import { t } from '../../src/i18n/strings';
import { useAppContext } from '../../src/state/appContext';

export default function TabLayout() {
    const { locale } = useAppContext();
    const colorScheme = useColorScheme();

    return (
        <NativeTabs
            backgroundColor={null}
            blurEffect={colorScheme === 'dark' ? 'dark' : 'regular'}
        >
            <Trigger name="students">
                <Label>{t(locale, 'students')}</Label>
                <Icon sf={{ default: 'person.2', selected: 'person.2.fill' }} />
            </Trigger>

            <Trigger name="attendance">
                <Label>{t(locale, 'attendance')}</Label>
                <Icon sf={{ default: 'checkmark.circle', selected: 'checkmark.circle.fill' }} />
            </Trigger>

            <Trigger name="fees">
                <Label>{t(locale, 'fees')}</Label>
                <Icon sf={{ default: 'indianrupeesign.circle', selected: 'indianrupeesign.circle.fill' }} />
            </Trigger>

            <Trigger name="messages">
                <Label>{t(locale, 'messages')}</Label>
                <Icon sf={{ default: 'bubble.left.and.bubble.right', selected: 'bubble.left.and.bubble.right.fill' }} />
            </Trigger>

            <Trigger name="settings">
                <Label>{t(locale, 'settings')}</Label>
                <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} />
            </Trigger>
        </NativeTabs>
    );
}
