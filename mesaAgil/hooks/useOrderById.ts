import { getOrderByTableId } from '@/service/orderService';
import { Order } from '@/types/model/Order';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export function useGetOrderById(id?: number) {
  const [order, setOrder] = useState<Order>();
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [orderErrorMessage, setOrderErrorMessage] = useState('');
  const isFocused = useIsFocused();

  const fetchOrder = () => {
    if (!id) {
      setOrder(undefined);
      setIsLoadingOrder(false);
      return;
    }

    setIsLoadingOrder(true);
    setOrderErrorMessage('');

    getOrderByTableId(id)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        setOrderErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingOrder(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchOrder();
    }
  }, [id, isFocused]);

  return { order, setOrder, isLoadingOrder, orderErrorMessage, refetch: fetchOrder };
}
