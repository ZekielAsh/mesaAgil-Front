import { getTableOccupancy } from '@/service/tableService';
import { TableOccupancy } from '@/types/TableOccupancy';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export function useTableOccupancy() {
  const [tables, setTables] = useState<TableOccupancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOccupancy = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getTableOccupancy();

      setTables(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Error al cargar ocupación'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOccupancy();
    }, [fetchOccupancy])
  );

  return {
    tables,
    loading,
    error,
    refresh: fetchOccupancy,
    setTables
  };
}