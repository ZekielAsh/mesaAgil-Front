import { createTable } from '@/service/tableService';
import { TableQrInfo } from '@/types/TableQr';
import { useState } from 'react';

export const useCreateTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = async (
    tableNumber: number
  ): Promise<TableQrInfo> => {
    try {
      setLoading(true);
      setError('');

      return await createTable(tableNumber);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear mesa';
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
