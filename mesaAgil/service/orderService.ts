import { apiClient } from '@/api/apiClient';
import { CreateOrderItem } from '@/types/CreateOrderItem';
import { Order } from '@/types/model/Order';
import { OrderItem } from '@/types/model/OrderItem';

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

export function getKitchenOrderItems(token: string) {
  return apiClient.get<OrderItem[]>('/orderItems', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateOrderItemStatus(orderItemId: number, status: string, token: string) {
  return apiClient.patch(
    `/orderItems/${orderItemId}/status`,
    {
      status: status
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
