import { apiClient } from '@/api/apiClient';
import { Order } from '@/model/Order';
import { OrderItem } from '@/model/OrderItem';

export function getOrderByTableId(orderId: number) {
  return apiClient.get<Order>(`/orders/${orderId}`);
}

export function closeOrder(orderId: number) {
  return apiClient.post(`/orders/${orderId}/close`);
}

export function addItems(orderId: number, orderItemsList: OrderItem[]) {
  return apiClient.post(`/${orderId}/items`, {
    orderItemRequestList: orderItemsList
  });
}
