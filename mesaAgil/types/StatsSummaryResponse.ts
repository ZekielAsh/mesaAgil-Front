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
