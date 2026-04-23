import { Item } from '@/types/model/Item';
import { useEffect, useState } from 'react';
import { getMenu } from '../services/menuService';

export const useMenu = () => {
  const [menu, setMenu] = useState<Item[]>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchMenu = async () => {
    try {
      console.log('🔵 Iniciando fetch...');

      setLoading(true);
      setError('');

      const data = await getMenu();

      console.log('🟢 Respuesta recibida:', data);

      if (data.message) {
        setMessage(data.message);
        setMenu([]);
      } else {
        setMenu(data.items || []);
        setMessage('');
      }
    } catch (err) {
      console.log('🔴 Error en fetch:', err);
      setError('Error al cargar el menú');
    } finally {
      console.log('🟡 Finalizando fetch');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    menu,
    message,
    loading,
    error,
    refetch: fetchMenu
  };
};
