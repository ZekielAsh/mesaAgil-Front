import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getTableRevenue } from '@/service/statsService';

import {
  Period,
  TableRevenueResponse,
} from '@/types/StatsResponses';

export function useTableRevenue(
  period: Period
) {
  const [data, setData] = useState<TableRevenueResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTableRevenue(
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