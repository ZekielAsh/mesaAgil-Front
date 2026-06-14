import { createItem } from '@/service/itemService';
import { useState } from 'react';

export const useCreateItem = () => {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const execute = async (
    values: any
  ) => {
    try {
      setLoading(true);

      return await createItem(values);
    } catch {
      setError(
        'Error al crear comida'
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