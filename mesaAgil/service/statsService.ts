import { apiClient } from '@/api/apiClient';

import { 
  Period, 
  StatsSummaryResponse, 
  RevenuePointResponse, 
  CategoryRevenueResponse, 
  TableOrdersResponse, 
  TableRevenueResponse, 
  TopRevenueItemResponse,
  TopItemResponse
} from '@/types/StatsResponses';

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export function getStatsByPeriod(
  period: Period,
  token: string
) {
  return apiClient.get<StatsSummaryResponse>(
    `/stats/summary?period=${period}`,
    authHeader(token)
  );
}

export function getRevenueTimeline(
  period: Period,
  token: string
) {
  return apiClient.get<RevenuePointResponse[]>(
    `/stats/revenue-timeline?period=${period}`,
    authHeader(token)
  );
}

export function getCategoryRevenue(
  period: Period,
  token: string
) {
  return apiClient.get<CategoryRevenueResponse[]>(
    `/stats/categories?period=${period}`,
    authHeader(token)
  );
}

export function getTableOrders(
  period: Period,
  token: string
) {
  return apiClient.get<TableOrdersResponse[]>(
    `/stats/tables/orders?period=${period}`,
    authHeader(token)
  );
}

export function getTableRevenue(
  period: Period,
  token: string
) {
  return apiClient.get<TableRevenueResponse[]>(
    `/stats/tables/revenue?period=${period}`,
    authHeader(token)
  );
}

export function getTopProducts(
  period: Period,
  token: string
) {
  return apiClient.get<TopItemResponse[]>(
    `/stats/items/quantity?period=${period}`,
    authHeader(token)
  );
}

export function getTopRevenueProducts(
  period: Period,
  token: string
) {
  return apiClient.get<TopRevenueItemResponse[]>(
    `/stats/items/revenue?period=${period}`,
    authHeader(token)
  );
}