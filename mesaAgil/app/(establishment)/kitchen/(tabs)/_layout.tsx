import { LogoutButton } from '@/components/LogOutButtom';
import FlameIcon from '@/components/ui/flame-icon';
import { Fonts } from '@/constants/fonts';
import { useProfile } from '@/context/ProfileContext';
import { Redirect, Tabs } from 'expo-router';

export default function KitchenLayout() {
  const { mode } = useProfile();

  if (mode !== 'ESTABLISHMENT') {
    return <Redirect href="/(client)/(tabs)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
        headerTitle: 'Cocina',
        headerStyle: {
          backgroundColor: '#111827'
        },

        headerTintColor: '#ffffff',

        headerTitleStyle: {
          fontSize: 20,
          fontFamily: Fonts.bold
        },
        headerRight: () => <LogoutButton />
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Kitchen',
          tabBarIcon: ({ color }) => <FlameIcon color={color} />
        }}
      />
    </Tabs>
  );
}
