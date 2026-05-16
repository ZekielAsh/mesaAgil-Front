import { useProfile } from '@/context/ProfileContext';
import StatsIcon from '@/components/ui/stats-icon';
import { Tabs } from 'expo-router';

const EstablishmentTabsLayout =
  () => {
    const { role } =
      useProfile();

    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor:
            '#007AFF'
        }}
      >
        {role === 'ADMIN' && (
          <>
            <Tabs.Screen
              name="items"
              options={{
                title: 'Items',

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

                tabBarIcon: ({
                  color
                }) => (
                  <StatsIcon
                    color={color}
                  />
                )
              }}
            />
          </>
        )}

        {role === 'KITCHEN' && (
          <Tabs.Screen
            name="kitchen"
            options={{
              title: 'Kitchen',

              tabBarIcon: ({
                color
              }) => (
                <StatsIcon
                  color={color}
                />
              )
            }}
          />
        )}

        {role === 'EMPLOYEE' && (
          <Tabs.Screen
            name="tables"
            options={{
              title: 'Tables',

              tabBarIcon: ({
                color
              }) => (
                <StatsIcon
                  color={color}
                />
              )
            }}
          />
        )}
      </Tabs>
    );
  };

export default EstablishmentTabsLayout;