import { getCategories } from '@/service/itemService';
import { Category } from '@/types/model/Category';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const response = await getCategories();

      setCategories(response);
    } catch (err) {
      setError('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
};