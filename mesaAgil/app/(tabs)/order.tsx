import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OrderTable from '@/components/OrderTable';
import { useGetOrderById } from '@/hooks/useOrderById';
import { closeOrder } from '@/service/orderService';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Orders() {
  const { order, isLoadingOrder, orderErrorMessage, refetch } = useGetOrderById(6);
  const insets = useSafeAreaInsets();

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
      {!isLoadingOrder && order ? <OrderTable orderItems={order.orderItems} /> : null}
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
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
