import { useState } from 'react';

import { getBillSummary } from '@/service/orderService';
import { BillSummary } from '@/types/BillResponses';

export function useBillSummary() {
  const [billSummary, setBillSummary] = useState<BillSummary>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const fetchBillSummary = async (orderId: number) => {
    setLoading(true);
    setErrorMessage(undefined);

    try {
      const response = await getBillSummary(orderId);
      setBillSummary(response);
      return response;
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message ?? 'No se pudo obtener el resumen.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    billSummary,
    loading,
    errorMessage,
    fetchBillSummary
  };
}