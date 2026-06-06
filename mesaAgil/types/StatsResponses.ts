export interface StatsSummaryResponse {
  totalRevenue: number;
  totalOrders: number;
  avgTicket: number;
  topItemName: string;
  topItemQuantity: number;
  topRevenueItemName: string;
  topRevenueItemAmount: number;
}

export type Period = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH';

export interface RevenuePointResponse {
  label: string;
  revenue: number;
}

export interface CategoryRevenueResponse {
  category: string;
  revenue: number;
}

export interface TableOrdersResponse {
  tableNumber: number;
  totalOrders: number;
}

export interface TableRevenueResponse {
  tableNumber: number;
  revenue: number;
}