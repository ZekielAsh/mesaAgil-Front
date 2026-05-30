import { getBillRequests } from '@/service/orderService';
import { Order } from '@/types/model/Order';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useBillRequests = () => {
  const { user } = useAuth();
  const [billRequests, setBillRequests] = useState<Order[]>([]);
  const [isLoadingBillRequests, setIsLoadingBillRequests] = useState(true);
  const [billRequestsErrorMessage, setBillRequestsErrorMessage] = useState('');

  const fetchBillRequests = () => {
    setIsLoadingBillRequests(true);
    setBillRequestsErrorMessage('');

    getBillRequests(user?.token ?? '')
      .then(response => {
        setBillRequests(response.data);
      })
      .catch(error => {
        setBillRequestsErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingBillRequests(false);
      });
  };

  useEffect(() => {
    fetchBillRequests();
  }, []);

  return {
    billRequests,
    setBillRequests,
    billRequestsErrorMessage,
    isLoadingBillRequests,
    refreshBillRequests: fetchBillRequests
  };
};
