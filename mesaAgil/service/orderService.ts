import { apiClient } from '@/api/apiClient';
import { BillSummary } from '@/types/BillResponses';
import { CreateOrderItem } from '@/types/CreateOrderItem';
import { Order } from '@/types/model/Order';
import { OrderItem } from '@/types/model/OrderItem';

export function getOrderById(orderId: number) {
  return apiClient.get<Order>(`/orders/${orderId}`);
}

export function requestBill(orderId: number) {
  return apiClient.patch(`/orders/${orderId}/request-bill`);
}

export function getBillRequests(token: string) {
  return apiClient.get(`/orders/bill-requests`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function closeOrder(orderId: number, token: string) {
  return apiClient.patch(
    `/orders/${orderId}/close`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function cancelBillRequest(orderId: number, token: string) {
  return apiClient.patch(
    `/orders/${orderId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export const getBillSummary = async (orderId: number) => {
  const response = await apiClient.get<BillSummary>(`/orders/${orderId}/bill-summary`);

  return response.data;
};

export async function addItems(orderId: number, orderItemsList: CreateOrderItem[]) {
  return apiClient.post(`/orders/${orderId}/items`, {
    orderItemRequestList: orderItemsList
  });
}

export function getKitchenOrderItems(token: string) {
  return apiClient.get<OrderItem[]>('/orderItems/kitchen', {
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

export function getReadyOrderItems(token: string) {
  return apiClient.get<OrderItem[]>('/orderItems/ready', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function cancelPendingOrderItem(orderId: number, orderItemId: number) {
  return apiClient.delete(`orders/${orderId}/items/${orderItemId}`);
}

export function downloadBillSummary(orderId: number) {
  return apiClient.get<Blob>(
    `/orders/${orderId}/bill-summary/pdf`,
    {
      responseType: 'blob'
    }
  );
}