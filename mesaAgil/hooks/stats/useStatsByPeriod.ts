import { getStatsByPeriod } from '@/service/statsService';
import { Period, StatsSummaryResponse } from '@/types/StatsSummaryResponse';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useStatsByPeriod(initialPeriod: Period) {
  const [stats, setStats] = useState<StatsSummaryResponse>();
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsErrorMessage, setStatsErrorMessage] = useState('');
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const { user } = useAuth();

  const fetchStats = (newPeriod?: Period) => {
    const periodToUse = newPeriod ?? period;

    setIsLoadingStats(true);
    setStatsErrorMessage('');

    getStatsByPeriod(periodToUse, user?.token ?? '')
      .then(response => {
        setStats(response.data);
        setPeriod(periodToUse);
      })
      .catch(error => {
        setStatsErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingStats(false);
      });
  };

  useEffect(() => {
    fetchStats(period);
  }, []);

  return { stats, isLoadingStats, statsErrorMessage, refetch: fetchStats };
}
