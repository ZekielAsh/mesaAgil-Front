import { Fonts } from '@/constants/fonts';
import { useAuth } from '@/hooks/useAuth';
import { useBillRequests } from '@/hooks/useBillRequests';
import { useWebSocket } from '@/hooks/useWebSocket';
import { closeOrder } from '@/service/orderService';
import { stompClient } from '@/service/websocket';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RequestsScreen() {
  const { user } = useAuth();
  const { billRequests, setBillRequests, billRequestsErrorMessage, isLoadingBillRequests, refreshBillRequests } =
    useBillRequests();
  const { connected } = useWebSocket();

  useEffect(() => {
    if (!connected) {
      return;
    }

    const subscription = stompClient.subscribe(`/room/staff/${user?.username}`, (message: any) => {
      const event = JSON.parse(message.body);

      if (event.type !== 'BILL_REQUESTED') {
        return;
      }

      const newOrderRequestBill = event.payload;

      setBillRequests(current => {
        const list = current ?? [];
        const exists = list.some(order => order.id === newOrderRequestBill.id);

        if (exists) {
          return list;
        }

        return [...list, newOrderRequestBill];
      });
    }
  );

    return () => {
      subscription.unsubscribe();
    };
  }, [connected, setBillRequests]);

  const handleCloseOrder = (orderId: number) => {
    closeOrder(orderId, user?.token ?? '')
      .then(() => {
        setBillRequests(prev =>
          prev.filter(
            billRequest => billRequest.id !== orderId
          )
        );
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1:
            error?.response?.data?.message ??
            'Error al cerrar la cuenta'
        });
      });
  };

  if (isLoadingBillRequests) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: 50
        }}
      />
    );
  }

  if (billRequestsErrorMessage) {
    return (
      <View style={styles.center}>
        <Text>{billRequestsErrorMessage}</Text>
        <Button title="Reintentar" onPress={refreshBillRequests} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={billRequests ?? []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay solicitudes de cuenta pendientes
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>
              Solicitudes de cuenta
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.tableLabel}>
                Pedido de cuenta de:
              </Text>

              <Text style={styles.tableNumber}>
                MESA {item.tableId}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed
              ]}
              onPress={() => handleCloseOrder(item.id)}
            >
              <Text style={styles.closeButtonText}>
                Cerrar cuenta
              </Text>
            </Pressable>
          </View>
        )}
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
  tableLabel: {
    fontSize: 14,
    color: '#666'
  },
  tableNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222'
  },
  closeButton: {
    backgroundColor: '#f00000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },
  closeButtonPressed: {
    backgroundColor: '#f000006c'
  },
  closeButtonText: {
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
  topActions: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  managementButton: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center'
  },
  managementButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16
  },
});
