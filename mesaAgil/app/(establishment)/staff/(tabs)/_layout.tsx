import { LogoutButton } from '@/components/LogOutButtom';
import PeopleIcon from '@/components/ui/people-icon';
import { Fonts } from '@/constants/fonts';
import { useProfile } from '@/context/ProfileContext';
import { Redirect, Tabs } from 'expo-router';

export default function StaffLayout() {
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
        headerTitle: 'Staff',
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
          title: 'Staff',
          tabBarIcon: ({ color }) => <PeopleIcon color={color} />
        }}
      />
    </Tabs>
  );
}
