import { cancelPendingOrderItem } from '@/service/orderService';
import { OrderItem } from '@/types/model/OrderItem';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

interface OrderTableProps {
  orderItems: OrderItem[];
}

export default function OrderTable({ orderItems }: OrderTableProps) {
  const statusStyles = {
    PENDING: styles.pending,
    IN_PREPARATION: styles.processing,
    READY: styles.ready,
    DELIVERED: styles.delivered,
    CANCELLED: styles.pending
  };

  const statusRename = {
    PENDING: 'Pendiente',
    IN_PREPARATION: 'En proceso',
    READY: 'Listo',
    DELIVERED: 'Entregado',
    CANCELLED: ''
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orderItems}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.productCell, styles.headerText]}>Platos elegidos</Text>
            <Text style={[styles.cell, styles.quantityCell, styles.headerText, styles.center]}>Cantidad</Text>
            <Text style={[styles.cell, styles.priceCell, styles.headerText, styles.center]}>Precio</Text>
            <Text style={[styles.cell, styles.statusCell, styles.headerText, styles.center]}>Estado</Text>
            <Text style={[styles.cell, styles.actionsCell, styles.headerText, styles.center]}>Acciones</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.productCell]} numberOfLines={1}>
              {item.item.name}
            </Text>

            <Text style={[styles.cell, styles.quantityCell, styles.center]}>{item.quantity}</Text>

            <Text style={[styles.cell, styles.priceCell, styles.center]}>
              {formatPrice(Number(item.price * item.quantity))}
            </Text>

            <Text style={[styles.cell, styles.statusCell, styles.center]}>
              <Text style={[statusStyles[item.status], styles.statusBar]}>{statusRename[item.status]}</Text>
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.cell,
                styles.actionsCell,
                item.status !== 'PENDING' && styles.disabledButton,
                pressed && item.status === 'PENDING' && styles.cancelButtonPressed
              ]}
              onPress={() => cancelPendingOrderItem(item.orderId, item.id)}
              disabled={item.status !== 'PENDING'}
            >
              <Text style={[styles.center, styles.cancelButton]}>Cancelar</Text>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6
  },

  header: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd'
  },

  cell: {
    flex: 1,
    fontSize: 14
  },

  productCell: {
    flex: 1.5
  },

  quantityCell: {
    flex: 0.9
  },

  priceCell: {
    flex: 1
  },

  statusCell: {
    flex: 1
  },

  actionsCell: {
    flex: 0.25
  },

  headerText: {
    fontWeight: 'bold'
  },

  right: {
    textAlign: 'right'
  },

  center: {
    textAlign: 'center'
  },

  separator: {
    height: 8
  },
  pending: {
    backgroundColor: '#F97316'
  },
  processing: {
    backgroundColor: '#F59E0B'
  },
  ready: {
    backgroundColor: '#22C55E'
  },
  delivered: {
    backgroundColor: '#3B82F6'
  },
  statusBar: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    color: '#ffffff',
    fontWeight: 500
  },
  cancelButton: {
    backgroundColor: '#f00000',
    padding: 4,
    borderRadius: 8,
    color: '#ffffff',
    fontWeight: 500
  },
  cancelButtonPressed: {
    backgroundColor: '#f000006c'
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
    opacity: 0.6
  }
});
