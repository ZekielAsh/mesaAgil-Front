import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { useGetOrderById } from '@/hooks/useOrderById';
import { closeOrder } from '@/service/orderService';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

export default function Orders() {
  const activeOrderId = 6;
  const { order, isLoadingOrder, orderErrorMessage, refetch } = useGetOrderById(activeOrderId);
  const insets = useSafeAreaInsets();
  const orderTotal =
    order?.orderItems.reduce((total, orderItem) => total + Number(orderItem.price * orderItem.quantity), 0) ?? 0;

  // TODO: pasar a hook y componente
  const onCloseOrder = (id: number) => {
    closeOrder(id)
      .then(() => {
        console.log('request bill made');
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (isLoadingOrder) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
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
            <Text style={styles.title}>Orden de Mesa {order.id}</Text>
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
    alignItems: 'center'
  }
});
