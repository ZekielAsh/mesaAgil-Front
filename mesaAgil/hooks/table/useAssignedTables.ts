import { getAssignedTables } from '@/service/tableService';
import { TableOccupancy } from '@/types/TableOccupancy';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export function useAssignedTables() {
  const [tables, setTables] =
    useState<TableOccupancy[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const fetchTables = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getAssignedTables();

      setTables(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Error al cargar mesas'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTables();
    }, [fetchTables])
  );

  return {
    tables,
    loading,
    error,
    refresh: fetchTables,
    setTables
  };
}