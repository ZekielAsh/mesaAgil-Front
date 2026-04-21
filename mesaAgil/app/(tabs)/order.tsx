import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { mockOrder } from '@/mocks/Order';
import { Order } from '@/model/Order';
import { getOrderByTableId } from '@/service/orderService';
import { Pressable, Text, View } from 'react-native';

export default function Orders() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  // id hardcodeado para PoC
  useEffect(() => {
    console.log(isFocused);
    if (isFocused) {
      getOrderByTableId(1)
        .then(response => {
          console.log(response.data);
          setOrder(response.data);
        })
        .catch(error => {
          // agregar manejar de errores global y modal de errores
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isFocused]);

  // simulamos que se pide la cuenta
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isLoading ? <OrderTable orderItems={mockOrder.orderItems} /> : null}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Pressable
          onPress={() => console.log('request bill made')}
          style={{
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Request Bill</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
