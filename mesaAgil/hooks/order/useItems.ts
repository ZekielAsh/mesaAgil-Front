import { getItems } from '@/service/itemService';
import { Item } from '@/types/model/Item';
import { useEffect, useState } from 'react';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(undefined);

      const response = await getItems();

      setItems(response);
    } catch (err) {
      setError('Error al cargar comidas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    refetch: fetchItems
  };
};