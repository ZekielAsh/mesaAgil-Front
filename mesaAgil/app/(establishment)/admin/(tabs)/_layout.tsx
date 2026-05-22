import FoodIcon from '@/components/ui/food-icon';
import StatsIcon from '@/components/ui/stats-icon';
import TableIcon from '@/components/ui/table-icon';
import { useProfile } from '@/context/ProfileContext';
import { Redirect, Tabs } from 'expo-router';

export default function AdminLayout() {
  const { mode } = useProfile();

  if (mode !== 'ESTABLISHMENT') {
    return <Redirect href="/(client)/(tabs)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000'
      }}
    >
      <Tabs.Screen
        name="items"
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
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <StatsIcon color={color} />
        }}
      />
    </Tabs>
  );
}
