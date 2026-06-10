import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getTopProducts } from '@/service/statsService';

import {
  Period,
  TopProductsResponse,
} from '@/types/StatsResponses';

export function useTopProducts(
  period: Period
) {
  const [data, setData] = useState<TopProductsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTopProducts(
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