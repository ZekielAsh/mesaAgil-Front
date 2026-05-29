import { updateTable } from '@/service/tableService';
import { TableQrInfo } from '@/types/TableQr';
import { useState } from 'react';

export const useUpdateTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = async (
    tableId: number,
    tableNumber: number
  ): Promise<TableQrInfo> => {
    try {
      setLoading(true);
      setError('');

      return await updateTable(tableId, tableNumber);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al editar la mesa';
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
