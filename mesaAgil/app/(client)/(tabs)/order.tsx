import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { useGetOrderById } from '@/hooks/useOrderById';
import { useTableSession } from '@/hooks/useTableSession';
import { closeOrder } from '@/service/orderService';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

export default function Orders() {
  const { session, loading: loadingSession } = useTableSession();
  const { order, isLoadingOrder, orderErrorMessage, refetch } = useGetOrderById(session?.orderId ?? undefined);
  const insets = useSafeAreaInsets();
  const orderTotal =
    order?.orderItems.reduce((total, orderItem) => total + Number(orderItem.price * orderItem.quantity), 0) ?? 0;

  // TODO: pasar a hook y componente
  const onCloseOrder = (id: number) => {
    closeOrder(id)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Cuenta solicitada'
        });
        refetch();
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error instanceof Error ? error.message : 'Error al pedir cuenta'
        });
      });
  };

  if (isLoadingOrder || loadingSession) {
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
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Orden de {session.tableLabel}</Text>
          </View>
          <OrderTable orderItems={order.orderItems} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total de la orden</Text>
            <Text style={styles.totalValue}>{formatPrice(orderTotal)}</Text>
          </View>
        </>
      ) : null}
      <View style={styles.buttonsContainer}>
        {!isLoadingOrder && order ? (
          <Pressable onPress={() => onCloseOrder(order.id)} style={styles.button}>
            <Text style={styles.buttonText}>Pedir cuenta</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
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
    marginHorizontal: 12,
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
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
  }
});
