import { apiClient } from '@/api/apiClient';
import { Period, StatsSummaryResponse } from '@/types/StatsSummaryResponse';

export function getStatsByPeriod(period: Period) {
  return apiClient.get<StatsSummaryResponse>(`/stats/summary?period=${period}`);
}
