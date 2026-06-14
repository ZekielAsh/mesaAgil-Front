import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getTableOrders } from '@/service/statsService';

import {
  Period,
  TableOrdersResponse,
} from '@/types/StatsResponses';

export function useTableOrders(
  period: Period
) {
  const [data, setData] = useState<TableOrdersResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTableOrders(
      period,
      user?.token ?? ''
    )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [period, user?.token]);

  return {
    data,
    loading,
    errorMessage,
  };
}