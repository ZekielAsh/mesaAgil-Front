import { deleteItem } from '@/service/itemService';
import { useState } from 'react';

export const useDeleteItem = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const execute = async (
    itemId: number
  ) => {
    try {
      setLoading(true);

      await deleteItem(itemId);
    } catch {
      setError(
        'Error al eliminar comida'
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error
  };
};