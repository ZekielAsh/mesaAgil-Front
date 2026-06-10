import { Item } from '@/types/model/Item';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { getMenu } from '../../service/menuService';

export const useMenu = () => {
  const [menu, setMenu] = useState<Item[]>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getMenu();

      if (data.message) {
        setMessage(data.message);
        setMenu([]);
      } else {
        setMenu(
          (data.items || []).filter(
            item =>
              item.active !== false
          )
        );
        setMessage('');
      }
    } catch (err) {
      setError('Error al cargar el menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMenu();
    }, [fetchMenu])
  );

  return {
    menu,
    message,
    loading,
    error,
    refetch: fetchMenu
  };
};
