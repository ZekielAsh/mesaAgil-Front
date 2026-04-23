import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { Order } from '@/model/Order';
import { closeOrder, getOrderByTableId } from '@/service/orderService';
import { Pressable, Text, View } from 'react-native';

export default function Orders() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  // TODO: pasarlos a hooks
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

  const onCloseOrder = (id: number) => {
    closeOrder(id)
      .then(() => {
        console.log('request bill made');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // simulamos que se pide la cuenta
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      {!isLoading && order ? <OrderTable orderItems={order.orderItems} /> : null}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!isLoading && order ? (
          <Pressable
            onPress={() => onCloseOrder(order.id)}
            style={{
              backgroundColor: '#007AFF',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Request Bill</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
