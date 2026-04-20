import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { Order, OrderStatus } from '@/model/Order';
import { OrderItemStatus } from '@/model/OrderItem';
import { getOrderByTableId } from '@/service/orderService';

export default function Orders() {
  const [order, setOrder] = useState<Order>();

  // id hardcodeado para PoC
  useEffect(() => {
    getOrderByTableId(1)
      .then(response => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch(error => {
        // agregar manejar de errores global y modal de errores
        console.log(error);
      });
  }, []);

  // mock luego borrar cuando hayan items
  const mockOrder: Order = {
    id: 1,
    tableId: 10,
    status: OrderStatus.OPEN,
    createdAt: new Date('2026-04-18T12:00:00'),
    closedAt: null as unknown as Date,

    orderItems: [
      {
        id: 1,
        orderId: 1,
        quantity: 2,
        price: 2000,
        status: OrderItemStatus.PENDING,
        createdAt: new Date('2026-04-18T12:01:00'),
        item: {
          id: 1,
          name: 'Hamburguesa Clásica',
          description: 'Carne, lechuga, tomate y queso',
          imageUrl: 'https://via.placeholder.com/150',
          price: 1000
        }
      },
      {
        id: 2,
        orderId: 1,
        quantity: 1,
        price: 1500,
        status: OrderItemStatus.IN_PREPARATION,
        createdAt: new Date('2026-04-18T12:02:00'),
        item: {
          id: 2,
          name: 'Papas Fritas',
          description: 'Papas crocantes',
          imageUrl: 'https://via.placeholder.com/150',
          price: 1500
        }
      },
      {
        id: 3,
        orderId: 1,
        quantity: 1,
        price: 3000,
        status: OrderItemStatus.DELIVERED,
        createdAt: new Date('2026-04-18T12:03:00'),
        item: {
          id: 3,
          name: 'Pizza Muzzarella',
          description: 'Pizza clásica con muzzarella',
          imageUrl: 'https://via.placeholder.com/150',
          price: 3000
        }
      }
    ]
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderTable order={mockOrder} />
    </SafeAreaView>
  );
}
