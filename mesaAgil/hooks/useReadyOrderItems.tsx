import { getReadyOrderItems } from '@/service/orderService';
import { OrderItem } from '@/types/model/OrderItem';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useReadyOrderItems = () => {
  const { user } = useAuth();
  const [readyOrderItems, setReadyOrderItems] = useState<OrderItem[]>([]);
  const [isLoadingReadyOrderItems, setIsLoadingReadyOrderItems] = useState(true);
  const [readyOrderItemsErrorMessage, setReadyOrderItemsErrorMessage] = useState('');

  const fetchReadyOrderItems = () => {
    setIsLoadingReadyOrderItems(true);
    setReadyOrderItemsErrorMessage('');

    getReadyOrderItems(user?.token ?? '')
      .then(response => {
        setReadyOrderItems(response.data);
      })
      .catch(error => {
        setReadyOrderItemsErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingReadyOrderItems(false);
      });
  };

  useEffect(() => {
    fetchReadyOrderItems();
  }, []);

  return {
    readyOrderItems,
    setReadyOrderItems,
    readyOrderItemsErrorMessage,
    isLoadingReadyOrderItems,
    refreshReadyOrderItems: fetchReadyOrderItems
  };
};
