import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getCategoryRevenue } from '@/service/statsService';

import {
  CategoryRevenueResponse,
  Period,
} from '@/types/StatsResponses';

export function useCategoryRevenue(
  period: Period
) {
  const [data, setData] = useState<CategoryRevenueResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getCategoryRevenue(
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