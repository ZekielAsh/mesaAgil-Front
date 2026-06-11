import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getTopRevenueProducts } from '@/service/statsService';

import {
  Period,
  TopRevenueItemResponse,
} from '@/types/StatsResponses';

export function useTopRevenueProducts(
  period: Period
) {
  const [data, setData] = useState<TopRevenueItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTopRevenueProducts(
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