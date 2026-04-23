import { addItems } from '@/service/orderService';
import { CreateOrderItem } from '@/types/CreateOrderItem';
import { useState } from 'react';

export const useAddItems = () => {
  const [loadingAddingItems, setLoadingAddingItems] = useState(false);
  const [errorAddingItems, setErrorAddingItems] = useState<string | null>(null);

  const execute = async (orderId: number, orderItemsList: CreateOrderItem[]) => {
    try {
      console.log('Enviando items...');

      setLoadingAddingItems(true);

      // del back devuelve Order actualizada, pensarlo mejor luego del PoC
      const response = await addItems(orderId, orderItemsList);

      console.log('Respuesta recibida:', response);

      return response;
    } catch (err) {
      console.log('Error al agregar items:', err);
      setErrorAddingItems('Error al agregar items');
      throw err;
    } finally {
      setLoadingAddingItems(false);
    }
  };

  return {
    loadingAddingItems,
    errorAddingItems,
    execute
  };
};
