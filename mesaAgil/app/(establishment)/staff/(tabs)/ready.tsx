import { Fonts } from '@/constants/fonts';
import { useUpdateOrderItemStatus } from '@/hooks/order/useUpdateOrderItemStatus';
import { useReadyOrderItems } from '@/hooks/useReadyOrderItems';
import { useWebSocket } from '@/hooks/useWebSocket';
import { stompClient } from '@/service/websocket';
import { OrderItem, OrderItemStatus } from '@/types/model/OrderItem';
import { useEffect } from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ReadyScreen() {
  const { updateStatus, loadingUpdateOrderItemStatus, updateErrorMessage } = useUpdateOrderItemStatus();
  const {
    readyOrderItems,
    setReadyOrderItems,
    readyOrderItemsErrorMessage,
    isLoadingReadyOrderItems,
    refreshReadyOrderItems
  } = useReadyOrderItems();
  const { connected } = useWebSocket();

  useEffect(() => {
    if (!connected) {
      return;
    }

    const subscription = stompClient.subscribe('/room/orderItems', message => {
      const event = JSON.parse(message.body);

      if (event.type !== 'ORDER_ITEM_STATUS_UPDATED') {
        return;
      }

      const updatedOrderItem = event.payload;

      setReadyOrderItems(current => {
        const filtered = current.filter(item => item.id !== updatedOrderItem.id);

        if (updatedOrderItem.status === OrderItemStatus.READY) {
          filtered.push(updatedOrderItem);
        }

        return filtered;
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [connected]);

  if (isLoadingReadyOrderItems || readyOrderItems === undefined) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (readyOrderItemsErrorMessage) {
    return (
      <View style={styles.center}>
        <Text>{readyOrderItemsErrorMessage}</Text>
        <Button title="Reintentar" onPress={refreshReadyOrderItems} />
      </View>
    );
  }

  const handleUpdateOrderItem = async (orderItemId: number, status: OrderItemStatus) => {
    try {
      await updateStatus(orderItemId, status);

      setReadyOrderItems(prevOrderItems => {
        if (!prevOrderItems) return prevOrderItems;

        if (status === OrderItemStatus.DELIVERED) {
          return prevOrderItems.filter(item => item.id !== orderItemId);
        }

        return prevOrderItems.map(orderItem => (orderItem.id === orderItemId ? { ...orderItem, status } : orderItem));
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: updateErrorMessage
      });
    }
  };

  const renderOrder = (orderItem: OrderItem) => {
    return (
      <View style={styles.card}>
        <Text style={styles.tableNumber}>MESA {orderItem.tableNumber}</Text>

        <View style={styles.content}>
          <Text style={styles.itemName}>
            <Text style={styles.itemQuantity}>{orderItem.quantity}</Text>x {orderItem.item.name}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.deliverButton, pressed && styles.deliverButtonPressed]}
          onPress={() => handleUpdateOrderItem(orderItem.id, OrderItemStatus.DELIVERED)}
          disabled={loadingUpdateOrderItemStatus}
        >
          <Text style={styles.deliverButtonText}>Marcar entregado</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={readyOrderItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay ordenes listas</Text>}
        ListHeaderComponent={
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Comandas listas</Text>
          </View>
        }
        renderItem={({ item }) => renderOrder(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  listContent: {
    padding: 16
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 12
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)',
    marginBottom: 12
  },
  tableNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    paddingRight: 12,
    borderRightWidth: 1.5
  },
  deliverButton: {
    backgroundColor: '#F06400',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },
  deliverButtonPressed: {
    backgroundColor: '#a94700'
  },
  deliverButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 8
  },
  itemName: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '500'
  },
  itemQuantity: {
    color: '#000',
    fontSize: 20,
    fontWeight: 700
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 8
  }
});
