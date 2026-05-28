import HomeIcon from '@/components/ui/home-icon';
import OrderIcon from '@/components/ui/order-icon';
import { Tabs } from 'expo-router';
import React from 'react';

const ClientTabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />
        }}
      />
    </Tabs>
  );
}

export default ClientTabsLayout;