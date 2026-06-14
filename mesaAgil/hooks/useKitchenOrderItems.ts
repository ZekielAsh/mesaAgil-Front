import { getKitchenOrderItems } from '@/service/orderService';
import { OrderItem } from '@/types/model/OrderItem';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export function useKitchenOrderItems() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>();
  const [isLoadingOrderItems, setIsLoadingOrderItems] = useState(true);
  const [orderItemsErrorMessage, setOrderItemsErrorMessage] = useState('');
  const { user } = useAuth();

  const fetchKitchenOrderItems = () => {
    setIsLoadingOrderItems(true);
    setOrderItemsErrorMessage('');

    getKitchenOrderItems(user?.token ?? '')
      .then(response => {
        setOrderItems(response.data);
      })
      .catch(error => {
        setOrderItemsErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingOrderItems(false);
      });
  };

  useEffect(() => {
    fetchKitchenOrderItems();
  }, []);

  return { orderItems, setOrderItems, isLoadingOrderItems, orderItemsErrorMessage, refetch: fetchKitchenOrderItems };
}
