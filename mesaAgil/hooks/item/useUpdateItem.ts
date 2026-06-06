import { updateItem } from '@/service/itemService';
import { useState } from 'react';

export const useUpdateItem = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const execute = async (
    itemId: number,
    values: any
  ) => {
    try {
      setLoading(true);

      return await updateItem(
        itemId,
        values
      );
    } catch {
      setError(
        'Error al actualizar comida'
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