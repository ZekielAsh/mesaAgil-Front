import { EstablishmentRole } from '@/constants/mockProfile';

import { Tabs } from 'expo-router';

interface Props {
  role: EstablishmentRole;
}

const EstablishmentTabs = ({
  role
}: Props) => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      {role === 'ADMIN' && (
        <>
          <Tabs.Screen
            name="items"
            options={{
              title: 'Items'
            }}
          />

          <Tabs.Screen
            name="stats"
            options={{
              title: 'Stats'
            }}
          />
        </>
      )}

      {role === 'KITCHEN' && (
        <Tabs.Screen
          name="kitchen"
          options={{
            title: 'Kitchen'
          }}
        />
      )}

      {role === 'EMPLOYEE' && (
        <Tabs.Screen
          name="tables"
          options={{
            title: 'Tables'
          }}
        />
      )}
    </Tabs>
  );
};

export default EstablishmentTabs;