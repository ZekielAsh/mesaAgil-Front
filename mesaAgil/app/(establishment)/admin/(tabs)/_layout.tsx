import { LogoutButton } from '@/components/LogOutButtom';
import FoodIcon from '@/components/ui/food-icon';
import StatsIcon from '@/components/ui/stats-icon';
import TableIcon from '@/components/ui/table-icon';
import UsersIcon from '@/components/ui/users-icon';
import { Fonts } from '@/constants/fonts';
import { useAuth } from '@/hooks/useAuth';
import { Tabs } from 'expo-router';

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
        headerTitle: `Administrador - ${user?.username}`,
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
          title: 'Items',
          tabBarIcon: ({ color }) => <FoodIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="tables"
        options={{
          title: 'Tables',
          tabBarIcon: ({ color }) => <TableIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) => <UsersIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <StatsIcon color={color} />
        }}
      />
    </Tabs>
  );
}
