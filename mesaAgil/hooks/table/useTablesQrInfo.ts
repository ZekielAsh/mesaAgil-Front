import { getTablesQrInfo } from '@/service/tableService';
import { TableQrInfo } from '@/types/TableQr';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export const useTablesQrInfo = () => {
  const [tables, setTables] = useState<TableQrInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTables = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getTablesQrInfo();
      setTables(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar mesas');
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
    refetch: fetchTables
  };
};
