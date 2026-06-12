import { updateOrderItemStatus } from '@/service/orderService';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useUpdateOrderItemStatus() {
  const [loadingUpdateOrderItemStatus, setLoadingUpdateOrderItemStatus] = useState(false);
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const { user } = useAuth();

  async function updateStatus(orderItemId: number, status: string) {
    setLoadingUpdateOrderItemStatus(true);
    setUpdateErrorMessage('');

    updateOrderItemStatus(orderItemId, status, user?.token ?? '')
      .catch(error => {
        setUpdateErrorMessage(error.message);
        throw error;
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
