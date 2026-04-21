import { apiClient } from '@/api/apiClient';
import { Order } from '@/model/Order';

export function getOrderByTableId(id: number) {
  return apiClient.get<Order>(`/orders/${id}`);
}
