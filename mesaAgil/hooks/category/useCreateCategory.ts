import { createCategory } from '@/service/categoryService';
import { useState } from 'react';

export const useCreateCategory =
  () => {
    const [loading, setLoading] =
      useState(false);

    const [error, setError] =
      useState('');

    const execute = async (
      name: string
    ) => {
      try {
        setLoading(true);

        return await createCategory(
          name
        );
      } catch (err) {
        setError(
          'Error al crear categoría'
        );

        throw err;
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