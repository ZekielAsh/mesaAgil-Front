import { apiClient } from '@/api/apiClient';
import { Period, StatsSummaryResponse } from '@/types/StatsSummaryResponse';

export function getStatsByPeriod(period: Period, token: string) {
  return apiClient.get<StatsSummaryResponse>(`/stats/summary?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
