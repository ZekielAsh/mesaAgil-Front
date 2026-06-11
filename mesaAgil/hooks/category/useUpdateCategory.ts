import { updateCategory } from '@/service/categoryService';
import { useState } from 'react';

export const useUpdateCategory =
  () => {
    const [loading, setLoading] =
      useState(false);

    const [error, setError] =
      useState('');

    const execute = async (
      categoryId: number,
      name: string
    ) => {
      try {
        setLoading(true);

        return await updateCategory(
          categoryId,
          name
        );
      } catch (err) {
        setError(
          'Error al actualizar categoría'
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