import { updateOrderItemStatus } from '@/service/orderService';
import { useState } from 'react';
import { useAuth } from './useAuth';

export function useUpdateOrderItemStatus() {
  const [loadingUpdateOrderItemStatus, setLoadingUpdateOrderItemStatus] = useState(true);
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const { user } = useAuth();

  async function updateStatus(orderId: number, orderItemId: number, status: string) {
    setLoadingUpdateOrderItemStatus(true);
    setUpdateErrorMessage('');

    updateOrderItemStatus(orderId, orderItemId, status, user?.token ?? '')
      .catch(error => {
        setUpdateErrorMessage(error.message);
      })
      .finally(() => {
        setLoadingUpdateOrderItemStatus(false);
      });
  }

  return {
    loadingUpdateOrderItemStatus,
    updateErrorMessage,
    updateStatus
  };
}
