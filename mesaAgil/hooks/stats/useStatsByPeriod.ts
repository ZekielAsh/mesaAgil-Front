import { getStatsByPeriod } from '@/service/statsService';
import { Period, StatsSummaryResponse } from '@/types/StatsResponses';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useStatsByPeriod(
  period: Period
) {
  const [stats, setStats] = useState<StatsSummaryResponse>();
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsErrorMessage, setStatsErrorMessage] = useState('');
  const { user } = useAuth();

  const fetchStats = () => {
    setIsLoadingStats(true);
    setStatsErrorMessage('');

    getStatsByPeriod(
      period,
      user?.token ?? ''
    )
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        setStatsErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingStats(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, [period, user?.token]);

  return { stats, isLoadingStats, statsErrorMessage };
}
