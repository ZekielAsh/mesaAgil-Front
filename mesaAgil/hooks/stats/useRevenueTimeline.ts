import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRevenueTimeline } from '@/service/statsService';
import { Period, RevenuePointResponse } from '@/types/StatsResponses';

export function useRevenueTimeline(
  period: Period
) {
  const [data, setData] = useState<RevenuePointResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getRevenueTimeline(
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
  }, [period]);

  return {
    data,
    loading,
    errorMessage,
  };
}