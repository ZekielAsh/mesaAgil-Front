import { closeTable } from '@/service/tableService';
import { TableQrInfo } from '@/types/TableQr';
import { useState } from 'react';

export const useCloseTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = async (
    tableId: number
  ): Promise<TableQrInfo> => {
    try {
      setLoading(true);
      setError('');

      return await closeTable(tableId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cerrar la mesa';
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
