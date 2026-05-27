import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrderItems';
import { updateOrderItemStatus } from '@/service/orderService';
import { OrderItem, OrderItemStatus } from '@/types/model/OrderItem';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function KitchenScreen() {
  const { user } = useAuth();
  const { orderItems, setOrderItems, isLoadingOrders, ordersErrorMessage, refetch } = useOrders();

  if (isLoadingOrders || orderItems === undefined) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (ordersErrorMessage) {
    return (
      <View style={styles.center}>
        <Text>{ordersErrorMessage}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );
  }

  const handleUpdateOrderItem = (orderItemId: number, status: OrderItemStatus) => {
    updateOrderItemStatus(orderItemId, status, user?.token ?? '').then(() => {
      setOrderItems(prevOrderItems => {
        if (!prevOrderItems) return prevOrderItems;

        if (status === OrderItemStatus.DELIVERED) {
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

  const renderOrder = (orderItem: OrderItem) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.tableText}>Mesa {orderItem.tableNumber}</Text>

          <View
            style={[
              styles.statusBadge,
              orderItem.status === OrderItemStatus.PENDING ? styles.pendingBadge : styles.preparingBadge
            ]}
          >
            <Text style={styles.statusText}>{orderItem.status}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.itemName}>
            {orderItem.quantity}x {orderItem.item.name}
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
            onPress={() => handleUpdateOrderItem(orderItem.id, OrderItemStatus.DELIVERED)}
          >
            <Text style={styles.buttonText}>Marcar listo</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
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

  content: {
    marginBottom: 18
  },

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
  }
});
