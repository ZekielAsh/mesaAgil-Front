import { Fonts } from '@/constants/fonts';
import { useAuth } from '@/hooks/useAuth';
import { useKitchenOrderItems } from '@/hooks/useKitchenOrderItems';
import { useWebSocket } from '@/hooks/useWebSocket';
import { updateOrderItemStatus } from '@/service/orderService';
import { stompClient } from '@/service/websocket';
import { OrderItem, OrderItemStatus } from '@/types/model/OrderItem';
import { useEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function KitchenScreen() {
  const { user } = useAuth();
  const { orderItems, setOrderItems, isLoadingOrderItems, orderItemsErrorMessage, refetch } = useKitchenOrderItems();
  const { connected } = useWebSocket();

  useEffect(() => {
    if (!connected) {
      return;
    }

    const subscription = stompClient.subscribe('/room/kitchen', message => {
      const event = JSON.parse(message.body);

      if (event.type === 'ORDER_ITEMS_ADDED') {
        refetch();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [connected]);

  if (isLoadingOrderItems) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (orderItemsErrorMessage) {
    return (
      <View style={styles.center}>
        <Text>{orderItemsErrorMessage}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );
  }

  const handleUpdateOrderItem = (orderItemId: number, status: OrderItemStatus) => {
    updateOrderItemStatus(orderItemId, status, user?.token ?? '').then(() => {
      setOrderItems(prevOrderItems => {
        if (!prevOrderItems) return prevOrderItems;

        if (status === OrderItemStatus.READY || status === OrderItemStatus.DELIVERED) {
          return prevOrderItems.filter(item => item.id !== orderItemId);
        }

        return prevOrderItems.map(orderItem => {
          if (orderItem.id !== orderItemId) {
            return orderItem;
          }

          return {
            ...orderItem,
            status
          };
        });
      });
    });
  };

  const formatHourMinute = (dateString: string): string => {
    const date = new Date(`${dateString}Z`);

    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const renderOrder = (orderItem: OrderItem) => {
    return (
      <View style={styles.card}>
        <Text style={styles.time}>{formatHourMinute(orderItem.createdAt.toString())}</Text>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.tableText}>Mesa {orderItem.tableNumber}</Text>

            <View
              style={[
                styles.statusBadge,
                orderItem.status === OrderItemStatus.PENDING ? styles.pendingBadge : styles.preparingBadge
              ]}
            >
              <Text style={styles.statusText}>
                {orderItem.status === OrderItemStatus.PENDING ? 'PENDIENTE' : 'PREPARANDO'}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.itemName}>
              <Text style={styles.itemQuantity}>{orderItem.quantity}</Text>x {orderItem.item.name}
            </Text>
          </View>

          {orderItem.status === OrderItemStatus.PENDING && (
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={() => handleUpdateOrderItem(orderItem.id, OrderItemStatus.IN_PREPARATION)}
            >
              <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
          )}

          {orderItem.status === OrderItemStatus.IN_PREPARATION && (
            <TouchableOpacity
              style={[styles.button, styles.readyButton]}
              onPress={() => handleUpdateOrderItem(orderItem.id, OrderItemStatus.READY)}
            >
              <Text style={styles.buttonText}>Marcar listo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orderItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => renderOrder(item)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay comandas pendientes</Text>}
        ListHeaderComponent={
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Comandas</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  list: {
    padding: 16,
    paddingBottom: 100
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,

    boxShadow: '2px 2px 4px rgba(0,0,0,0.25)'
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 8,
    marginRight: 12
  },
  body: {
    flex: 1,
    gap: 12,
    marginLeft: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tableText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827'
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7'
  },
  preparingBadge: {
    backgroundColor: '#DBEAFE'
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#111827'
  },
  content: {},
  itemName: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '500'
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: '#2563EB'
  },
  readyButton: {
    backgroundColor: '#16A34A'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666'
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
  time: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    alignContent: 'center',
    paddingRight: 12,
    borderRightWidth: 1.5,
    borderColor: '#666'
  },
  itemQuantity: {
    color: '#000',
    fontSize: 20,
    fontWeight: 700
  }
});
