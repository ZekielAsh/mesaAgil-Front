import { useAuth } from '@/hooks/useAuth';
import { getKitchenOrderItems } from '@/service/orderService';
import { OrderItem } from '@/types/model/OrderItem';
import { useEffect, useState } from 'react';

export function useOrders() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>();
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersErrorMessage, setOrdersErrorMessage] = useState('');
  const { user } = useAuth();

  const fetchOpenOrders = () => {
    setIsLoadingOrders(true);
    setOrdersErrorMessage('');

    getKitchenOrderItems(user?.token ?? '')
      .then(response => {
        setOrderItems(response.data);
      })
      .catch(error => {
        setOrdersErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingOrders(false);
      });
  };

  useEffect(() => {
    fetchOpenOrders();
  }, []);

  return { orderItems, setOrderItems, isLoadingOrders, ordersErrorMessage, refetch: fetchOpenOrders };
}
