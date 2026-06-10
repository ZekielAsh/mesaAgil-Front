import { enableTable } from '@/service/tableService';
import { TableQrInfo } from '@/types/TableQr';
import { useState } from 'react';

export const useEnableTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = async (
    tableId: number
  ): Promise<TableQrInfo> => {
    try {
      setLoading(true);
      setError('');

      return await enableTable(tableId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al habilitar la mesa';
      setError(errorMessage);

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
