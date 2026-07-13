import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BillSummaryModal from '@/components/BillSummaryModal';
import OrderTable from '@/components/OrderTable';
import { Fonts } from '@/constants/fonts';
import { useBillSummary } from '@/hooks/order/useBillSummary';
import { useDownloadBillSummary } from '@/hooks/order/useDownloadBillSummary';
import { useGetOrderById } from '@/hooks/order/useOrderById';
import { useTableSession } from '@/hooks/table/useTableSession';
import { useWebSocket } from '@/hooks/useWebSocket';
import { requestBill } from '@/service/orderService';
import { stompClient } from '@/service/websocket';
import { OrderStatus } from '@/types/model/Order';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

export default function Orders() {
  const { session, clearSession } = useTableSession();
  const { order, setOrder, isLoadingOrder, orderErrorMessage, refetch } = useGetOrderById(
    session?.orderId ?? undefined
  );
  const { billSummary, loading: loadingBillSummary, fetchBillSummary } = useBillSummary();
  const [showBillSummary, setShowBillSummary] = useState(false);
  const { download, isDownloading, downloadErrorMessage } = useDownloadBillSummary();
  const insets = useSafeAreaInsets();
  const { connected } = useWebSocket();

  useEffect(() => {
    if (!session) {
      return;
    }

    if (session.tableEnabled === false) {
      clearSession();
      return;
    }

    if (!session.activeSession || !session.orderId) {
      clearSession();
    }
  }, [session, clearSession]);

  useEffect(() => {
    if (downloadErrorMessage) {
      Toast.show({
        type: 'error',
        text1: downloadErrorMessage
      });
    }
  }, [downloadErrorMessage]);

  useEffect(() => {
    if (!connected) {
      return;
    }

    const orderSubscription = stompClient.subscribe(`/room/order/${session?.orderId}`, (message: any) => {
      const event = JSON.parse(message.body);

      if (event.type === 'ORDER_CLOSED' || event.type === 'ORDER_CANCELLED') {
        clearSession();
      }
      if (event.type === 'ORDER_REOPEN') {
        setOrder(prevOrder => (prevOrder ? { ...prevOrder, billRequested: false } : prevOrder));
      }
    });

    const orderItemsSubscription = stompClient.subscribe(`/room/orderItems`, (message: any) => {
      const event = JSON.parse(message.body);

      if (event.type === 'ORDER_ITEM_STATUS_UPDATED') {
        const updatedOrderItem = event.payload;

        setOrder(current => {
          if (!current) {
            return current;
          }

          if (updatedOrderItem.status === 'CANCELLED') {
            return {
              ...current,
              orderItems: current.orderItems.filter(item => item.id !== updatedOrderItem.id)
            };
          }

          return {
            ...current,
            orderItems: current.orderItems.map(item => (item.id === updatedOrderItem.id ? updatedOrderItem : item))
          };
        });
      } else if (event.type === 'ORDER_ITEM_CANCELED') {
        const deletedOrderItemId = event.payload;

        setOrder(current => {
          if (!current) {
            return current;
          }
          return {
            ...current,
            orderItems: current.orderItems.filter(item => item.id !== deletedOrderItemId)
          };
        });
      }
    });

    return () => {
      orderSubscription.unsubscribe();
      orderItemsSubscription.unsubscribe();
    };
  }, [connected]);

  const orderTotal =
    order?.orderItems.reduce((total, orderItem) => total + Number(orderItem.price * orderItem.quantity), 0) ?? 0;

  const onRequestBill = (id: number) => {
    requestBill(id)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Cuenta solicitada'
        });
        setOrder(prevOrder => (prevOrder ? { ...prevOrder, billRequested: true } : prevOrder));
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.response.data.message
        });
      });
  };

  const openBillSummary = async (orderId: number) => {
    try {
      setShowBillSummary(true);
      await fetchBillSummary(orderId);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'No se pudo obtener el resumen.'
      });
    }
  };

  const confirmBillRequest = () => {
    if (!order) {
      return;
    }

    setShowBillSummary(false);
    onRequestBill(order.id);
  };

  if (isLoadingOrder) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!session) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Escanea el QR de tu mesa</Text>
        <Text style={styles.emptyDescription}>Cuando ingreses por QR vas a ver aca tu pedido activo.</Text>
      </View>
    );
  }

  if (session.tableEnabled === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>{session.tableLabel}</Text>
        <Text style={styles.emptyDescription}>La mesa se encuentra cerrada.</Text>
      </View>
    );
  }

  if (!session.activeSession || !session.orderId) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>{session.tableLabel}</Text>
        <Text style={styles.emptyDescription}>La mesa no tiene una orden abierta en este momento.</Text>
      </View>
    );
  }

  if (order?.status === OrderStatus.CLOSED) {
    return <Redirect href="/waitingScreen" />;
  }

  if (orderErrorMessage) {
    return (
      <View style={styles.center}>
        <Text>{orderErrorMessage}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      {!isLoadingOrder && order ? (
        <View style={styles.container}>
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionLabel}>Resumen de orden</Text>
            <Text style={styles.sessionTitle}>{session.tableLabel}</Text>
          </View>
          <OrderTable orderItems={order.orderItems} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total de la orden</Text>
            <Text style={styles.totalValue}>{formatPrice(orderTotal)}</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.buttonsContainer}>
        {!isLoadingOrder && order ? (
          <Pressable
            style={({ pressed }) => [
              styles.cardButton,
              {
                backgroundColor: order?.billRequested ? '#a94700' : pressed ? '#a94700' : '#F06400',
                transform: [
                  {
                    scale: pressed ? 0.95 : 1
                  }
                ]
              }
            ]}
            disabled={order?.billRequested}
            onPress={() => openBillSummary(order.id)}
          >
            <Text style={styles.buttonText}> Pedir cuenta </Text>
          </Pressable>
        ) : null}
        {order?.billRequested && (
          <>
            <Text style={styles.emptyDescription}>Esperando al mozo...</Text>

            <Pressable
              style={({ pressed }) => [
                styles.downloadButton,
                {
                  opacity: pressed ? 0.8 : 1
                }
              ]}
              onPress={() => download(order.id)}
              disabled={isDownloading}
            >
              <Text style={styles.buttonText}>{isDownloading ? 'Descargando...' : 'Descargar resumen'}</Text>
            </Pressable>
          </>
        )}
      </View>

      <BillSummaryModal
        visible={showBillSummary}
        loading={loadingBillSummary}
        bill={billSummary}
        onClose={() => setShowBillSummary(false)}
        onConfirm={confirmBillRequest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12
  },
  buttonText: { color: '#fff', fontFamily: Fonts.bold },
  titleContainer: {
    paddingTop: 16,
    paddingHorizontal: 12
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0'
  },
  totalLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600'
  },
  totalValue: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 8
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  emptyDescription: {
    color: '#6B7280',
    fontSize: 15,
    textAlign: 'center'
  },
  cardButton: {
    height: 36,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12
  },
  downloadButton: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  sessionHeader: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    marginBottom: 4
  },
  sessionLabel: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Fonts.bold
  },
  sessionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
    fontFamily: Fonts.bold
  }
});
