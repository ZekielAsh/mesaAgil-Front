import { useProfile } from '@/context/ProfileContext';
import StatsIcon from '@/components/ui/stats-icon';
import {
  Redirect,
  Tabs,
  usePathname
} from 'expo-router';

const EstablishmentTabsLayout =
  () => {
    const { mode, role } =
      useProfile();

    const pathname = usePathname();

    if (mode !== 'ESTABLISHMENT') {
      return (
        <Redirect href="/(client)/(tabs)" />
      );
    }

    if (
      role === 'KITCHEN' &&
      pathname !== '/kitchen'
    ) {
      return (
        <Redirect href="/(establishment)/(tabs)/kitchen" />
      );
    }

    if (
      role === 'EMPLOYEE' &&
      pathname !== '/tables'
    ) {
      return (
        <Redirect href="/(establishment)/(tabs)/tables" />
      );
    }

    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor:
            '#007AFF'
        }}
      >
        <Tabs.Screen
          name="items"
          options={{
            title: 'Items',
            href:
              role === 'ADMIN'
                ? '/items'
                : null,

            tabBarIcon: ({
              color
            }) => (
              <StatsIcon
                color={color}
              />
            )
          }}
        />

        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            href:
              role === 'ADMIN'
                ? '/stats'
                : null,

            tabBarIcon: ({
              color
            }) => (
              <StatsIcon
                color={color}
              />
            )
          }}
        />

        <Tabs.Screen
          name="kitchen"
          options={{
            title: 'Kitchen',
            href:
              role === 'ADMIN' ||
              role === 'KITCHEN'
                ? '/kitchen'
                : null,

            tabBarIcon: ({
              color
            }) => (
              <StatsIcon
                color={color}
              />
            )
          }}
        />

        <Tabs.Screen
          name="tables"
          options={{
            title: 'Tables',
            href:
              role === 'ADMIN' ||
              role === 'EMPLOYEE'
                ? '/tables'
                : null,

            tabBarIcon: ({
              color
            }) => (
              <StatsIcon
                color={color}
              />
            )
          }}
        />
      </Tabs>
    );
  };

export default EstablishmentTabsLayout;
