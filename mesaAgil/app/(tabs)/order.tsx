import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { Order } from '@/model/Order';
import { getOrderByTableId } from '@/service/orderService';

export default function Orders() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // id hardcodeado para PoC
  useEffect(() => {
    getOrderByTableId(1)
      .then(response => {
        console.log("ORDER COMPLETA:", response.data);
        console.log("ORDER ITEMS:", response.data?.orderItems);
        console.log("ES UNDEFINED?", response.data === undefined);
        console.log("ES NULL?", response.data === null);

        setOrder(response.data);
      })
      .catch(error => {
        // agregar manejar de errores global y modal de errores
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isLoading && order ? (
        <OrderTable orderItems={order?.orderItems ?? []} />
      ) : null}
    </SafeAreaView>
  );
}
