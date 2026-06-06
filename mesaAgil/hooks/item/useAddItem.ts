import { addItems } from '@/service/orderService';
import { CreateOrderItem } from '@/types/CreateOrderItem';
import { useState } from 'react';

export const useAddItems = () => {
  const [loadingAddingItems, setLoadingAddingItems] = useState(false);

  const execute = async (orderId: number, orderItemsList: CreateOrderItem[]) => {
    try {
      setLoadingAddingItems(true);

      // del back devuelve Order actualizada, pensarlo mejor luego del PoC
      return await addItems(orderId, orderItemsList);
    } finally {
      setLoadingAddingItems(false);
    }
  };

  return {
    loadingAddingItems,
    execute
  };
};
