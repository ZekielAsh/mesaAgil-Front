import { LogoutButton } from '@/components/LogOutButtom';
import OrderIcon from '@/components/ui/order-icon';
import PeopleIcon from '@/components/ui/people-icon';
import { Fonts } from '@/constants/fonts';
import { Tabs } from 'expo-router';

export default function StaffLayout() {
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
      <Tabs.Screen
        name="ready"
        options={{
          title: 'ready',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />
        }}
      />
    </Tabs>
  );
}
