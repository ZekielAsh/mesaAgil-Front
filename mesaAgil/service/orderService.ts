import { apiClient } from '@/api/apiClient';
import { CreateOrderItem } from '@/types/CreateOrderItem';
import { Order } from '@/types/model/Order';

export function getOrderByTableId(orderId: number) {
  return apiClient.get<Order>(`/orders/${orderId}`);
}

export function closeOrder(orderId: number) {
  return apiClient.post(`/orders/${orderId}/close`);
}

export async function addItems(orderId: number, orderItemsList: CreateOrderItem[]) {
  return apiClient.post(`/orders/${orderId}/items`, {
    orderItemRequestList: orderItemsList
  });
}
