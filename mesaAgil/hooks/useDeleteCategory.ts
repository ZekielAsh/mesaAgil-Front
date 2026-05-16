import { deleteCategory } from '@/service/categoryService';
import { useState } from 'react';

export const useDeleteCategory =
  () => {
    const [loading, setLoading] =
      useState(false);

    const [error, setError] =
      useState('');

    const execute = async (
      categoryId: number
    ) => {
      try {
        setLoading(true);

        await deleteCategory(
          categoryId
        );
      } catch (err) {
        setError(
          'Error al eliminar categoría'
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